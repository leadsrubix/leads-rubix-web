import { Router, type IRouter, type Request } from "express";
import { z } from "zod";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { db, leadsTable } from "@workspace/db";
import { notifyNewLead } from "../lib/notify";
import { scoreLead } from "../lib/scoring";

const router: IRouter = Router();

const UtmSchema = z
  .object({
    utm_source: z.string().max(120).optional(),
    utm_medium: z.string().max(120).optional(),
    utm_campaign: z.string().max(180).optional(),
    utm_term: z.string().max(180).optional(),
    utm_content: z.string().max(180).optional(),
    gclid: z.string().max(180).optional(),
    fbclid: z.string().max(180).optional(),
  })
  .partial()
  .optional();

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().min(2).max(150),
  phone: z.string().min(10).max(20),
  teamSize: z.string().max(50).optional(),
  message: z.string().min(10).max(5000),
  source: z.string().max(80).optional(),
  utm: UtmSchema,
  referrer: z.string().max(500).optional(),
  landingPath: z.string().max(500).optional(),
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
  // Trust the proxy-validated chain (req.ip) — never raw x-forwarded-for, which
  // would let attackers spoof a fresh IP per request to bypass throttling.
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
    req.log.warn(
      { errorCount: parsed.error.issues.length, ipHash: hashShort(ip) },
      "contact: invalid payload",
    );
    res.status(400).json({ ok: false, error: "Invalid submission." });
    return;
  }

  const { website, utm, referrer, landingPath, ...data } = parsed.data;
  if (website && website.length > 0) {
    res.json({ ok: true, message: "Submission received" });
    return;
  }

  const utmRec = utm ?? {};
  const sourceVal = data.source ?? "contact";

  const { score, band, factors } = scoreLead({
    email: data.email,
    phone: data.phone,
    message: data.message,
    teamSize: data.teamSize ?? null,
    source: sourceVal,
    utm: utmRec,
    landingPath: landingPath ?? null,
  });

  const ipHash = hashShort(ip);
  let id: string;
  try {
    const [row] = await db
      .insert(leadsTable)
      .values({
        source: sourceVal,
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        teamSize: data.teamSize ?? null,
        message: data.message,
        ipHash,
        messageLength: data.message.length,
        utmSource: utmRec.utm_source ?? null,
        utmMedium: utmRec.utm_medium ?? null,
        utmCampaign: utmRec.utm_campaign ?? null,
        utmTerm: utmRec.utm_term ?? null,
        utmContent: utmRec.utm_content ?? null,
        gclid: utmRec.gclid ?? null,
        fbclid: utmRec.fbclid ?? null,
        referrer: referrer ?? null,
        landingPath: landingPath ?? null,
        score,
        scoreBand: band,
      })
      .returning({ id: leadsTable.id });
    id = row!.id;
  } catch (err) {
    req.log.error({ err }, "contact: failed to persist lead to DB");
    res.status(500).json({ ok: false, error: "Could not record submission. Please email us directly." });
    return;
  }

  // Best-effort NDJSON backup; never block the response.
  void (async () => {
    try {
      const submission = {
        id,
        receivedAt: new Date().toISOString(),
        ipHash,
        score,
        band,
        ...data,
        utm: utmRec,
        referrer: referrer ?? null,
        landingPath: landingPath ?? null,
      };
      await mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
      await appendFile(SUBMISSIONS_FILE, JSON.stringify(submission) + "\n", "utf8");
    } catch (err) {
      req.log.warn({ err, id }, "contact: failed to append NDJSON backup");
    }
  })();

  // PII-minimised log: do NOT emit email/phone/message into the log stream.
  req.log.info(
    {
      id,
      source: sourceVal,
      company: data.company,
      teamSize: data.teamSize ?? null,
      messageLen: data.message.length,
      score,
      band,
      utmMedium: utmRec.utm_medium ?? null,
      utmSource: utmRec.utm_source ?? null,
      ipHash,
    },
    "contact: new submission persisted",
  );

  // Fire-and-forget webhook notification — recipients can ack via Slack/etc.
  notifyNewLead(
    {
      id,
      source: sourceVal,
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      teamSize: data.teamSize ?? null,
      messageLen: data.message.length,
      createdAt: new Date().toISOString(),
      score,
      scoreBand: band,
      utm: {
        source: utmRec.utm_source ?? null,
        medium: utmRec.utm_medium ?? null,
        campaign: utmRec.utm_campaign ?? null,
        term: utmRec.utm_term ?? null,
        content: utmRec.utm_content ?? null,
        gclid: utmRec.gclid ?? null,
        fbclid: utmRec.fbclid ?? null,
      },
      referrer: referrer ?? null,
      landingPath: landingPath ?? null,
      factors,
    },
    req.log,
  );

  res.json({ ok: true, message: "Submission received", id });
});

function hashShort(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

export default router;
