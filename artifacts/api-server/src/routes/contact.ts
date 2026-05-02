import { Router, type IRouter, type Request } from "express";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const router: IRouter = Router();

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().min(2).max(150),
  phone: z.string().min(10).max(20),
  teamSize: z.string().max(50).optional(),
  message: z.string().min(10).max(5000),
  source: z.string().max(50).optional(),
  // honeypot — must be empty; bots tend to fill every field
  website: z.string().max(0).optional(),
});

const SUBMISSIONS_FILE =
  process.env.LEADS_RUBIX_SUBMISSIONS_FILE ||
  path.resolve("/tmp/leads-rubix-submissions.ndjson");

// Simple in-memory rate limiter — 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const ipBuckets = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0]!.trim();
  }
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

router.post("/contact", async (req, res) => {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    req.log.warn({ ipHash: hashShort(ip) }, "contact: rate limit exceeded");
    res.status(429).json({ ok: false, error: "Too many requests. Please try again later." });
    return;
  }

  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    // Honeypot tripped or invalid — return generic 400 without echoing PII
    req.log.warn(
      { errorCount: parsed.error.issues.length, ipHash: hashShort(ip) },
      "contact: invalid payload",
    );
    res.status(400).json({ ok: false, error: "Invalid submission." });
    return;
  }

  const { website, ...data } = parsed.data;
  // Honeypot non-empty: silently accept and drop. Don't tell bots they failed.
  if (website && website.length > 0) {
    res.json({ ok: true, message: "Submission received" });
    return;
  }

  const id = randomUUID();
  const submission = {
    id,
    receivedAt: new Date().toISOString(),
    ipHash: hashShort(ip),
    ...data,
  };

  try {
    await mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
    await appendFile(SUBMISSIONS_FILE, JSON.stringify(submission) + "\n", "utf8");
  } catch (err) {
    req.log.error({ err, id }, "contact: failed to persist submission");
    res.status(500).json({ ok: false, error: "Could not record submission. Please email us directly." });
    return;
  }

  // PII-minimised log: do NOT emit email/phone/message into the log stream.
  req.log.info(
    {
      id,
      source: data.source ?? "unknown",
      company: data.company,
      teamSize: data.teamSize ?? null,
      messageLen: data.message.length,
      ipHash: hashShort(ip),
    },
    "contact: new submission persisted",
  );

  res.json({ ok: true, message: "Submission received", id });
});

function hashShort(s: string): string {
  // Non-cryptographic, fast: just enough to correlate without storing raw IPs in logs.
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

export default router;
