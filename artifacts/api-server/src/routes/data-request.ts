import { Router, type IRouter, type Request } from "express";
import { z } from "zod";
import { db, leadsTable } from "@workspace/db";
import { notifyNewLead } from "../lib/notify";

// DPDP (Digital Personal Data Protection Act, India) data-subject request endpoint.
// Captures an export/correction/deletion request, persists as a tagged lead so
// the team has an audit trail, and pings the operations webhook.

const router: IRouter = Router();

const REQUEST_TYPES = ["export", "correction", "deletion", "consent_withdrawal"] as const;

const RequestSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  type: z.enum(REQUEST_TYPES),
  details: z.string().max(2000).optional(),
  // honeypot
  website: z.string().max(0).optional(),
});

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const ipBuckets = new Map<string, number[]>();

function getClientIp(req: Request): string {
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = (ipBuckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (bucket.length >= MAX_PER_WINDOW) {
    ipBuckets.set(ip, bucket);
    return true;
  }
  bucket.push(now);
  ipBuckets.set(ip, bucket);
  return false;
}

function hashShort(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16);
}

router.post("/privacy/data-request", async (req, res) => {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ ok: false, error: "Too many requests." });
    return;
  }

  const parsed = RequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid submission." });
    return;
  }
  const { website, name, email, type, details } = parsed.data;
  if (website && website.length > 0) {
    res.json({ ok: true });
    return;
  }

  const ipHash = hashShort(ip);
  const message = `[DPDP ${type.toUpperCase()}] ${details ?? "(no additional details provided)"}`;

  let id: string;
  try {
    const [row] = await db
      .insert(leadsTable)
      .values({
        source: `dpdp_${type}`,
        name,
        email,
        company: "(data-subject request)",
        phone: "n/a",
        message,
        messageLength: message.length,
        ipHash,
        tags: ["dpdp", `dpdp:${type}`],
      })
      .returning({ id: leadsTable.id });
    id = row!.id;
  } catch (err) {
    req.log.error({ err }, "data-request: failed to persist");
    res.status(500).json({ ok: false, error: "Could not record request. Please email privacy@leadsrubix.com." });
    return;
  }

  req.log.info({ id, type, ipHash }, "data-request: persisted");

  notifyNewLead(
    {
      id,
      source: `dpdp_${type}`,
      name,
      email,
      company: "(DPDP request)",
      phone: "n/a",
      teamSize: null,
      messageLen: message.length,
      createdAt: new Date().toISOString(),
    },
    req.log,
  );

  res.json({ ok: true, id });
});

export default router;
