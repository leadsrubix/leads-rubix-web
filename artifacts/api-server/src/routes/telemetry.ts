import { Router, type IRouter } from "express";
import { z } from "zod";
import { createHash } from "crypto";
import { db, notFoundHitsTable } from "@workspace/db";

const router: IRouter = Router();

const NotFoundBody = z.object({
  path: z.string().min(1).max(2048),
  referrer: z.string().max(2048).optional().nullable(),
});

function hashIp(ip: string | undefined): string | null {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

// ---------------------------------------------------------------------------
// Rate limiting + dedup for the public telemetry endpoint.
// This is internet-facing, unauthenticated, and writes to the DB on every
// accepted hit, so we need to bound write volume against bots, crawlers, and
// outright abuse. We use a tiny in-process token bucket per ip-hash plus a
// short TTL dedup window so the same client repeatedly hitting the same path
// does not amplify writes. Both maps are LRU-trimmed to bound memory.
// ---------------------------------------------------------------------------

interface Bucket {
  tokens: number;
  ts: number;
}

const BUCKET_CAPACITY = 6; // burst
const BUCKET_REFILL_PER_SEC = 0.5; // sustained ~30/min
const BUCKETS = new Map<string, Bucket>();
const BUCKETS_MAX = 5000;

const DEDUP = new Map<string, number>(); // key -> expiry ms
const DEDUP_TTL_MS = 60_000;
const DEDUP_MAX = 10_000;

const GLOBAL_PER_MINUTE = 600;
let globalWindowStart = Date.now();
let globalCount = 0;

function trimMap<V>(m: Map<string, V>, max: number) {
  if (m.size <= max) return;
  const drop = m.size - max;
  let i = 0;
  for (const k of m.keys()) {
    if (i++ >= drop) break;
    m.delete(k);
  }
}

function takeToken(key: string): boolean {
  const now = Date.now();
  const b = BUCKETS.get(key);
  if (!b) {
    BUCKETS.set(key, { tokens: BUCKET_CAPACITY - 1, ts: now });
    trimMap(BUCKETS, BUCKETS_MAX);
    return true;
  }
  const elapsed = (now - b.ts) / 1000;
  b.tokens = Math.min(BUCKET_CAPACITY, b.tokens + elapsed * BUCKET_REFILL_PER_SEC);
  b.ts = now;
  if (b.tokens < 1) return false;
  b.tokens -= 1;
  return true;
}

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const exp = DEDUP.get(key);
  if (exp && exp > now) return true;
  DEDUP.set(key, now + DEDUP_TTL_MS);
  trimMap(DEDUP, DEDUP_MAX);
  return false;
}

function globalBudgetOk(): boolean {
  const now = Date.now();
  if (now - globalWindowStart >= 60_000) {
    globalWindowStart = now;
    globalCount = 0;
  }
  if (globalCount >= GLOBAL_PER_MINUTE) return false;
  globalCount++;
  return true;
}

router.post("/telemetry/not-found", async (req, res) => {
  // Always 204 — fire-and-forget for the client. Failures must not be
  // visible to crawlers / bots, otherwise the endpoint becomes a probe.
  const respond = () => res.status(204).end();

  const parsed = NotFoundBody.safeParse(req.body);
  if (!parsed.success) {
    respond();
    return;
  }
  const { path, referrer } = parsed.data;
  if (path.length > 1024 || /\0/.test(path)) {
    respond();
    return;
  }

  const ipHash = hashIp(req.ip);
  const limiterKey = ipHash ?? "anon";

  if (!takeToken(limiterKey)) {
    respond();
    return;
  }
  if (!globalBudgetOk()) {
    respond();
    return;
  }
  if (isDuplicate(`${limiterKey}::${path}`)) {
    respond();
    return;
  }

  try {
    await db.insert(notFoundHitsTable).values({
      path,
      referrer: referrer ?? null,
      ipHash,
    });
  } catch (err) {
    req.log?.warn({ err }, "not-found telemetry insert failed");
  }
  respond();
});

export default router;
