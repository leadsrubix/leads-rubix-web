// Public, rate-limited relay that forwards a JSON payload directly to the
// Google Sheets webhook URL configured in the `integrations` content section.
//
// Used by the entry-popup form on the marketing site so a submission lands in
// the configured Google Sheet without persisting in the leads DB. The Sheets
// URL stays server-side only — it is never exposed to the browser — and every
// outbound fetch is run through the SSRF guard in lib/notify.ts.

import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { z } from "zod";
import { db, contentSectionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { isAllowedWebhookUrl } from "../lib/notify";

const router: IRouter = Router();

// Tiny in-memory sliding-window rate-limiter so we don't add a new dep just
// for one route. Keyed by client IP. Designed for single-instance deploys
// (Hostinger Cloud); behind a load balancer the cap is per-instance.
const RL_WINDOW_MS = 60 * 60 * 1000;
const RL_MAX = 30;
const rlBuckets = new Map<string, number[]>();
function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = (req.ip ?? req.socket.remoteAddress ?? "unknown").toString();
  const now = Date.now();
  const arr = (rlBuckets.get(key) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  if (arr.length >= RL_MAX) {
    res.status(429).json({ ok: false, error: "Too many submissions, please try again later." });
    return;
  }
  arr.push(now);
  rlBuckets.set(key, arr);
  // Lazy janitor — keep the map from growing unbounded.
  if (rlBuckets.size > 5000) {
    for (const [k, v] of rlBuckets) {
      const live = v.filter((t) => now - t < RL_WINDOW_MS);
      if (live.length === 0) rlBuckets.delete(k);
      else rlBuckets.set(k, live);
    }
  }
  next();
}

// Loose schema — the entry popup is the primary caller but we accept any
// JSON-serialisable bag of fields so future forms don't need a server change
// to fan out. Hard caps prevent payload-of-doom + abuse.
const SubmitBody = z
  .object({
    source: z.string().max(60).default("entry_popup"),
  })
  .catchall(z.unknown());

router.post("/sheets-submit", rateLimiter, async (req, res) => {
  const parsed = SubmitBody.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid submission payload" });
    return;
  }

  // Extra guard against runaway payloads.
  const serialized = JSON.stringify(parsed.data);
  if (serialized.length > 8 * 1024) {
    res.status(413).json({ ok: false, error: "Payload too large" });
    return;
  }

  let webhookUrl = "";
  try {
    const [row] = await db
      .select()
      .from(contentSectionsTable)
      .where(eq(contentSectionsTable.key, "integrations"))
      .limit(1);
    const value = (row?.value ?? {}) as { googleSheetsWebhookUrl?: unknown };
    webhookUrl = String(value.googleSheetsWebhookUrl ?? "").trim();
  } catch (err) {
    req.log.error({ err }, "sheets-submit: failed to read integrations config");
    res.status(503).json({ ok: false, error: "Sheets integration unavailable" });
    return;
  }

  if (!webhookUrl) {
    res.status(503).json({
      ok: false,
      error: "Google Sheets webhook URL is not configured",
    });
    return;
  }

  if (!isAllowedWebhookUrl(webhookUrl)) {
    req.log.warn("sheets-submit: configured webhook URL rejected by SSRF guard");
    res.status(503).json({ ok: false, error: "Sheets integration misconfigured" });
    return;
  }

  // Add a bit of envelope context the Apps Script can use without depending
  // on the form sending it explicitly.
  const payload = {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
    userAgent: String(req.headers["user-agent"] ?? "").slice(0, 300),
  };

  try {
    // redirect:"manual" — the configured URL was vetted, but a 30x to a
    // different host could bypass the SSRF check. Re-validate every hop.
    let attempt = 0;
    let currentUrl = webhookUrl;
    let upstream: globalThis.Response;
    /* eslint-disable no-constant-condition */
    while (true) {
      upstream = await fetch(currentUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "manual",
        signal: AbortSignal.timeout(10_000),
      });
      if (upstream.status >= 300 && upstream.status < 400) {
        const loc = upstream.headers.get("location") ?? "";
        const next = loc ? new URL(loc, currentUrl).toString() : "";
        if (!next || !isAllowedWebhookUrl(next)) {
          req.log.warn({ from: currentUrl }, "sheets-submit: redirect target rejected");
          res.status(502).json({ ok: false, error: "Sheets webhook redirect rejected" });
          return;
        }
        currentUrl = next;
        attempt += 1;
        if (attempt > 5) {
          res.status(502).json({ ok: false, error: "Too many redirects" });
          return;
        }
        continue;
      }
      break;
    }
    if (!upstream.ok) {
      req.log.warn({ status: upstream.status }, "sheets-submit: upstream non-2xx");
      res.status(502).json({ ok: false, error: "Sheets webhook rejected the submission" });
      return;
    }
  } catch (err) {
    req.log.error({ err }, "sheets-submit: upstream fetch failed");
    res.status(502).json({ ok: false, error: "Could not reach Google Sheets" });
    return;
  }

  res.json({ ok: true });
});

export default router;
