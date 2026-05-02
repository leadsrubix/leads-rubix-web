// Object storage helper — wraps Replit's GCS sidecar to issue presigned PUT
// URLs and stream uploaded objects back through this server. Admin-only — no
// per-object ACL framework; access control happens at the route layer.

import { Storage, type File } from "@google-cloud/storage";
import { Readable } from "stream";
import { randomUUID } from "crypto";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

export const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

function parseObjectPath(path: string): { bucketName: string; objectName: string } {
  if (!path.startsWith("/")) path = `/${path}`;
  const parts = path.split("/");
  if (parts.length < 3) throw new Error("Invalid path: missing bucket name");
  return { bucketName: parts[1]!, objectName: parts.slice(2).join("/") };
}

async function signObjectURL(opts: {
  bucketName: string;
  objectName: string;
  method: "GET" | "PUT";
  ttlSec: number;
}): Promise<string> {
  const res = await fetch(`${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bucket_name: opts.bucketName,
      object_name: opts.objectName,
      method: opts.method,
      expires_at: new Date(Date.now() + opts.ttlSec * 1000).toISOString(),
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new Error(`Failed to sign object URL (${res.status})`);
  }
  const { signed_url } = (await res.json()) as { signed_url: string };
  return signed_url;
}

function getPrivateDir(): string {
  const dir = process.env.PRIVATE_OBJECT_DIR;
  if (!dir) throw new Error("PRIVATE_OBJECT_DIR not set");
  return dir;
}

export async function getUploadUrl(): Promise<{ uploadURL: string; objectPath: string }> {
  const dir = getPrivateDir();
  const objectId = randomUUID();
  const fullPath = `${dir}/uploads/${objectId}`;
  const { bucketName, objectName } = parseObjectPath(fullPath);
  const uploadURL = await signObjectURL({
    bucketName,
    objectName,
    method: "PUT",
    ttlSec: 900,
  });
  return { uploadURL, objectPath: `/objects/uploads/${objectId}` };
}

export async function getObjectFile(objectPath: string): Promise<File> {
  if (!objectPath.startsWith("/objects/")) throw new ObjectNotFoundError();
  const entityId = objectPath.slice("/objects/".length);
  let dir = getPrivateDir();
  if (!dir.endsWith("/")) dir += "/";
  const fullPath = `${dir}${entityId}`;
  const { bucketName, objectName } = parseObjectPath(fullPath);
  const file = objectStorageClient.bucket(bucketName).file(objectName);
  const [exists] = await file.exists();
  if (!exists) throw new ObjectNotFoundError();
  return file;
}

// Whitelist of MIME types we are willing to stream back through the public
// proxy. The signed PUT URL itself does not enforce content-type, so an admin
// could (intentionally or not) upload an HTML/SVG/JS file that would otherwise
// execute in users' browsers. Anything outside this list is rejected at read
// time. Plain SVG is excluded because it can carry inline scripts.
const ALLOWED_PUBLIC_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
]);

const MAX_PUBLIC_BYTES = 20 * 1024 * 1024;

export async function streamObject(file: File, res: import("express").Response): Promise<void> {
  const [metadata] = await file.getMetadata();
  const contentType = ((metadata.contentType as string) || "").toLowerCase();
  if (!ALLOWED_PUBLIC_MIME.has(contentType)) {
    res.status(415).json({ ok: false, error: "Unsupported media type" });
    return;
  }
  const size = Number(metadata.size ?? 0);
  if (size > MAX_PUBLIC_BYTES) {
    res.status(413).json({ ok: false, error: "File too large" });
    return;
  }
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Disposition", "inline");
  if (size) res.setHeader("Content-Length", String(size));
  const nodeStream = file.createReadStream();
  nodeStream.on("error", () => {
    if (!res.headersSent) res.status(500).end();
    else res.end();
  });
  Readable.from(nodeStream).pipe(res);
}
