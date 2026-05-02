// Per-IP rate limit (sliding window) + per-account lockout for the admin login
// endpoint. In-memory only — sufficient for single-instance deploys; swap for
// Redis if you scale horizontally.

const IP_WINDOW_MS = 15 * 60 * 1000;
const IP_MAX = 10;

const ACCOUNT_LOCK_MS = 30 * 60 * 1000;
const ACCOUNT_MAX_FAILS = 10;

const ipBuckets = new Map<string, number[]>();

export function ipRateLimited(ip: string): { limited: boolean; retryAfterMs: number } {
  const now = Date.now();
  const bucket = (ipBuckets.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
  if (bucket.length >= IP_MAX) {
    ipBuckets.set(ip, bucket);
    const oldest = bucket[0]!;
    return { limited: true, retryAfterMs: IP_WINDOW_MS - (now - oldest) };
  }
  bucket.push(now);
  ipBuckets.set(ip, bucket);
  return { limited: false, retryAfterMs: 0 };
}

export const ACCOUNT_LOCK_THRESHOLD = ACCOUNT_MAX_FAILS;
export const ACCOUNT_LOCK_DURATION_MS = ACCOUNT_LOCK_MS;
