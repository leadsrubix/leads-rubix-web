import type { Logger } from "pino";

const INDEXNOW_HOST = "leadsrubix.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * Best-effort IndexNow ping for newly-published or updated URLs. Requires
 * INDEXNOW_KEY env (also exposed at /<key>.txt at the root). Silent no-op
 * when the key is missing so dev/preview environments don't break.
 */
export async function pingIndexNow(urls: string[], log?: Logger): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key || urls.length === 0) return;
  try {
    const body = {
      host: INDEXNOW_HOST,
      key,
      keyLocation: `https://${INDEXNOW_HOST}/${key}.txt`,
      urlList: urls.slice(0, 10000),
    };
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!res.ok && log) {
      log.warn({ status: res.status, urls: urls.length }, "IndexNow ping non-OK");
    }
  } catch (err) {
    log?.warn({ err }, "IndexNow ping failed");
  }
}
