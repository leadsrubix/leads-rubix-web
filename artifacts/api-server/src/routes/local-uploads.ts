// Local-disk fallback for image uploads when the Replit object-storage
// sidecar isn't available (e.g. on Hostinger, where there is no sidecar).
//
// `POST /admin/uploads/direct` accepts a raw binary body with the file's
// content-type as the request Content-Type and the original filename in the
// `X-Filename` header. Bytes are written to LOCAL_UPLOAD_DIR (defaults to
// `./uploads-local` inside the api-server cwd) under a UUID-prefixed name so
// the original filename can't be used to overwrite anything.
//
// The file is then served back through `GET /api/local-uploads/:filename`
// with a long cache TTL. Files are immutable — admins re-upload to replace.

import { Router, type IRouter, type Request, type Response } from "express";
import express from "express";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { createReadStream, statSync } from "fs";
import { extname, join, basename, resolve } from "path";
import { requirePasswordOk, requireSameOrigin } from "../middlewares/auth";

const router: IRouter = Router();

const LOCAL_UPLOAD_DIR = resolve(
  process.env["LOCAL_UPLOAD_DIR"] ?? "./uploads-local",
);

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB
const ALLOWED_MIME = /^(image\/(png|jpe?g|webp|gif|svg\+xml|x-icon|vnd\.microsoft\.icon))$/i;
// Restrict to a small allowlist of extensions to avoid path/MIME confusion.
const ALLOWED_EXT_RE = /\.(png|jpe?g|webp|gif|svg|ico)$/i;

router.post(
  "/admin/uploads/direct",
  // CSRF parity with the rest of /admin (mounted via routes/admin/index.ts):
  // require an allowed Origin header before accepting any state-changing call.
  requireSameOrigin,
  requirePasswordOk,
  express.raw({ type: "*/*", limit: MAX_BYTES }),
  async (req: Request, res: Response) => {
    const ct = String(req.headers["content-type"] ?? "").split(";")[0]!.trim();
    if (!ALLOWED_MIME.test(ct)) {
      res.status(415).json({ ok: false, error: "Unsupported file type" });
      return;
    }
    const body = req.body as Buffer | undefined;
    if (!Buffer.isBuffer(body) || body.length === 0) {
      res.status(400).json({ ok: false, error: "Empty upload body" });
      return;
    }
    if (body.length > MAX_BYTES) {
      res.status(413).json({ ok: false, error: "File too large" });
      return;
    }

    const rawName = String(req.headers["x-filename"] ?? "upload").slice(0, 200);
    // strip directory components — only keep the basename
    const safeOriginal = basename(rawName).replace(/[^A-Za-z0-9._-]/g, "_");
    let ext = extname(safeOriginal).toLowerCase();
    if (!ALLOWED_EXT_RE.test(ext)) {
      // Derive ext from MIME if filename's ext is missing/disallowed.
      if (ct.includes("png")) ext = ".png";
      else if (ct.includes("jpeg") || ct.includes("jpg")) ext = ".jpg";
      else if (ct.includes("webp")) ext = ".webp";
      else if (ct.includes("gif")) ext = ".gif";
      else if (ct.includes("svg")) ext = ".svg";
      else if (ct.includes("icon")) ext = ".ico";
      else {
        res.status(415).json({ ok: false, error: "Unsupported file extension" });
        return;
      }
    }

    const filename = `${randomUUID()}${ext}`;
    try {
      await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
      await writeFile(join(LOCAL_UPLOAD_DIR, filename), body);
    } catch (err) {
      req.log.error({ err }, "local-uploads: write failed");
      res.status(500).json({ ok: false, error: "Could not save uploaded file" });
      return;
    }

    const url = `/api/local-uploads/${filename}`;
    res.json({ ok: true, url, objectPath: url });
  },
);

router.get("/local-uploads/:filename", (req, res) => {
  const safe = basename(req.params.filename!);
  if (!ALLOWED_EXT_RE.test(safe) || safe.includes("..") || safe.includes("/")) {
    res.status(400).end();
    return;
  }
  const fullPath = join(LOCAL_UPLOAD_DIR, safe);
  let stat;
  try {
    stat = statSync(fullPath);
  } catch {
    res.status(404).end();
    return;
  }
  // Map extension → content-type
  const ext = extname(safe).toLowerCase();
  const ctMap: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };
  res.setHeader("Content-Type", ctMap[ext] ?? "application/octet-stream");
  res.setHeader("Content-Length", String(stat.size));
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  createReadStream(fullPath).pipe(res);
});

export default router;
