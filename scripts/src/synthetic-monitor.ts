/**
 * Synthetic monitoring — pings critical Leads Rubix endpoints, asserts
 * 200 + content checks, and POSTs a Slack-compatible alert to
 * MONITOR_WEBHOOK_URL on failure. Designed for cron-job.org / GitHub Actions
 * cron / Hostinger cron at a 5-minute cadence.
 *
 * Usage:
 *   MONITOR_BASE_URL=https://leadsrubix.com \
 *   MONITOR_WEBHOOK_URL=https://hooks.slack.com/services/... \
 *   pnpm --filter @workspace/scripts run synthetic-monitor
 *
 * Exit codes: 0 if all checks pass, 1 if any failed (good for cron alerting).
 */

interface Check {
  name: string;
  path: string;
  expectStatus?: number;
  expectIncludes?: string;
  expectHeader?: { name: string; matches: RegExp };
}

const CHECKS: Check[] = [
  { name: "homepage", path: "/", expectIncludes: "Leads Rubix" },
  { name: "healthz", path: "/api/healthz", expectIncludes: '"ok"' },
  {
    name: "sitemap",
    path: "/sitemap.xml",
    expectHeader: { name: "content-type", matches: /xml/i },
  },
  { name: "pricing", path: "/pricing", expectIncludes: "Pricing" },
  { name: "demo", path: "/demo", expectIncludes: "demo" },
  { name: "blog", path: "/blog", expectIncludes: "Blog" },
];

interface Result {
  name: string;
  path: string;
  ok: boolean;
  status: number | null;
  ms: number;
  reason?: string;
}

async function runOne(baseUrl: string, check: Check): Promise<Result> {
  const url = `${baseUrl.replace(/\/$/, "")}${check.path}`;
  const t0 = Date.now();
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15_000);
    const res = await fetch(url, { signal: ctrl.signal, redirect: "follow" });
    clearTimeout(timer);
    const ms = Date.now() - t0;
    const expectedStatus = check.expectStatus ?? 200;
    if (res.status !== expectedStatus) {
      return { name: check.name, path: check.path, ok: false, status: res.status, ms, reason: `status ${res.status} != ${expectedStatus}` };
    }
    if (check.expectHeader) {
      const got = res.headers.get(check.expectHeader.name) ?? "";
      if (!check.expectHeader.matches.test(got)) {
        return { name: check.name, path: check.path, ok: false, status: res.status, ms, reason: `header ${check.expectHeader.name}=${got}` };
      }
    }
    if (check.expectIncludes) {
      const body = await res.text();
      if (!body.toLowerCase().includes(check.expectIncludes.toLowerCase())) {
        return { name: check.name, path: check.path, ok: false, status: res.status, ms, reason: `body missing "${check.expectIncludes}"` };
      }
    }
    return { name: check.name, path: check.path, ok: true, status: res.status, ms };
  } catch (err) {
    const ms = Date.now() - t0;
    const msg = err instanceof Error ? err.message : String(err);
    return { name: check.name, path: check.path, ok: false, status: null, ms, reason: msg };
  }
}

async function main(): Promise<void> {
  const base = process.env.MONITOR_BASE_URL ?? "https://leadsrubix.com";
  const webhook = process.env.MONITOR_WEBHOOK_URL ?? "";

  const started = new Date().toISOString();
  const results = await Promise.all(CHECKS.map((c) => runOne(base, c)));
  const failures = results.filter((r) => !r.ok);

  for (const r of results) {
    const icon = r.ok ? "✓" : "✗";
    console.log(`${icon} ${r.name.padEnd(10)} ${r.path.padEnd(20)} ${String(r.status ?? "-").padEnd(4)} ${r.ms}ms${r.reason ? "  " + r.reason : ""}`);
  }

  if (failures.length > 0 && webhook) {
    const text =
      `🚨 Leads Rubix synthetic monitor — ${failures.length}/${results.length} failed at ${started}\n` +
      failures.map((f) => `• ${f.name} (${f.path}): ${f.reason ?? "unknown"} [status=${f.status ?? "-"}, ${f.ms}ms]`).join("\n") +
      `\nBase URL: ${base}`;
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, results, base, started }),
      });
    } catch (err) {
      console.error("monitor: failed to deliver alert", err);
    }
  }

  if (failures.length > 0) process.exit(1);
}

void main();
