import type { Logger } from "pino";
import { eq } from "drizzle-orm";
import { db, contentSectionsTable } from "@workspace/db";

// New-lead notifier. The destinations are resolved per-call from:
//   1. CMS  → integrations.googleSheetsWebhookUrl   (Google Apps Script Web App)
//   2. CMS  → integrations.slackOrZapierWebhookUrl  (overrides env if set)
//   3. ENV  → LEAD_NOTIFICATION_WEBHOOK             (Slack/Zapier fallback)
//
// All deliveries are best-effort and never block the API response.

type LeadPayload = {
  id: string;
  source: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string | null;
  messageLen: number;
  createdAt: string;
  score?: number | null;
  scoreBand?: "hot" | "warm" | "cold" | null;
  utm?: {
    source?: string | null;
    medium?: string | null;
    campaign?: string | null;
    term?: string | null;
    content?: string | null;
    gclid?: string | null;
    fbclid?: string | null;
  };
  referrer?: string | null;
  landingPath?: string | null;
  factors?: string[];
};

const BAND_EMOJI: Record<NonNullable<LeadPayload["scoreBand"]>, string> = {
  hot: "🔥",
  warm: "☀️",
  cold: "❄️",
};

// In-memory cache of the integrations CMS section. Refreshed at most once per
// CACHE_TTL_MS so admins flipping a webhook URL see it apply within a minute
// without us querying Postgres on every form submission.
const CACHE_TTL_MS = 60_000;
type IntegrationsCfg = {
  googleSheetsWebhookUrl?: string;
  slackOrZapierWebhookUrl?: string;
};
let cachedCfg: IntegrationsCfg | null = null;
let cachedAt = 0;

async function getIntegrationsConfig(log: Logger): Promise<IntegrationsCfg> {
  const now = Date.now();
  if (cachedCfg && now - cachedAt < CACHE_TTL_MS) return cachedCfg;
  try {
    const [row] = await db
      .select()
      .from(contentSectionsTable)
      .where(eq(contentSectionsTable.key, "integrations"))
      .limit(1);
    cachedCfg = (row?.value ?? {}) as IntegrationsCfg;
  } catch (err) {
    log.warn({ err }, "notify: failed to load integrations CMS, using empty");
    cachedCfg = {};
  }
  cachedAt = now;
  return cachedCfg;
}

/** Force the integrations cache to be re-read on next notify (used by admin
 *  CMS save handler so changes apply immediately, not after the 60s TTL). */
export function invalidateIntegrationsCache(): void {
  cachedCfg = null;
  cachedAt = 0;
}

function buildSlackText(lead: LeadPayload): string {
  const bandIcon = lead.scoreBand ? `${BAND_EMOJI[lead.scoreBand]} ${lead.scoreBand.toUpperCase()}` : "";
  const scoreLine = lead.score != null ? `Score: ${lead.score}/100 ${bandIcon}\n` : "";
  const utmLine =
    lead.utm && (lead.utm.source || lead.utm.medium || lead.utm.campaign)
      ? `UTM: ${[lead.utm.source, lead.utm.medium, lead.utm.campaign].filter(Boolean).join(" / ")}\n`
      : "";
  const landingLine = lead.landingPath ? `Landing: ${lead.landingPath}\n` : "";
  const referrerLine = lead.referrer ? `Referrer: ${lead.referrer}\n` : "";
  return (
    `${scoreLine}New lead from ${lead.name} (${lead.company})\n` +
    `Email: ${lead.email}\nPhone: ${lead.phone}\nSource: ${lead.source}\n` +
    utmLine +
    landingLine +
    referrerLine +
    `Team size: ${lead.teamSize ?? "n/a"}\nMessage length: ${lead.messageLen} chars\n` +
    `Lead id: ${lead.id}`
  );
}

/** Flat shape designed to map cleanly to a Google Sheet row. The Apps Script
 *  Web App on the receiving end can do `e.postData.contents → JSON.parse →
 *  sheet.appendRow([...])`. Field order is intentional and stable. */
function buildSheetsRow(lead: LeadPayload) {
  return {
    receivedAt: lead.createdAt,
    id: lead.id,
    source: lead.source,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    teamSize: lead.teamSize ?? "",
    messageLen: lead.messageLen,
    score: lead.score ?? "",
    scoreBand: lead.scoreBand ?? "",
    utmSource: lead.utm?.source ?? "",
    utmMedium: lead.utm?.medium ?? "",
    utmCampaign: lead.utm?.campaign ?? "",
    utmTerm: lead.utm?.term ?? "",
    utmContent: lead.utm?.content ?? "",
    gclid: lead.utm?.gclid ?? "",
    fbclid: lead.utm?.fbclid ?? "",
    referrer: lead.referrer ?? "",
    landingPath: lead.landingPath ?? "",
  };
}

// SSRF guard. Outbound webhook URLs come from the CMS so a compromised admin
// could otherwise force the server to call internal infrastructure. Reject
// anything that isn't https://, has credentials, or resolves to a private
// host literal (loopback / RFC1918 / link-local / 0.0.0.0).
export function isAllowedWebhookUrl(raw: string): boolean {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if (u.protocol !== "https:") return false;
  if (u.username || u.password) return false;
  const h = u.hostname.toLowerCase();
  if (h === "localhost" || h === "0.0.0.0" || h.endsWith(".localhost")) return false;
  // Reject IPv4 literals in private/loopback/link-local ranges.
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(h);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 10 || a === 127 || a === 0) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
  }
  // Reject IPv6 loopback / link-local / unique-local.
  if (h.startsWith("[")) {
    const lower = h.toLowerCase();
    if (lower.includes("::1") || lower.startsWith("[fc") || lower.startsWith("[fd") || lower.startsWith("[fe80")) {
      return false;
    }
  }
  return true;
}

async function postJson(url: string, body: unknown, label: string, leadId: string, log: Logger) {
  if (!isAllowedWebhookUrl(url)) {
    log.warn({ leadId, label }, "notify: webhook URL rejected by SSRF guard");
    return;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Apps Script tends to 302-redirect to the actual handler; fetch follows
      // by default. Cap the call so a hung Sheets endpoint can't pile up.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      log.warn({ status: res.status, leadId, label }, "notify: webhook returned non-2xx");
    }
  } catch (err) {
    log.warn({ err, leadId, label }, "notify: webhook delivery failed");
  }
}

export function notifyNewLead(lead: LeadPayload, log: Logger): void {
  void (async () => {
    const cfg = await getIntegrationsConfig(log);
    // Coerce to string defensively — if a malformed value somehow slipped past
    // the validator (e.g. legacy row from before the schema), don't crash.
    const sheetsUrl = String(cfg.googleSheetsWebhookUrl ?? "").trim();
    const cmsSlack = String(cfg.slackOrZapierWebhookUrl ?? "").trim();
    const slackUrl = cmsSlack || (process.env.LEAD_NOTIFICATION_WEBHOOK?.trim() ?? "");

    const slackText = buildSlackText(lead);
    const sheetsRow = buildSheetsRow(lead);

    const tasks: Promise<void>[] = [];
    if (sheetsUrl) {
      tasks.push(postJson(sheetsUrl, sheetsRow, "google_sheets", lead.id, log));
    }
    if (slackUrl) {
      tasks.push(postJson(slackUrl, { text: slackText, lead }, "slack_zapier", lead.id, log));
    }
    if (tasks.length === 0) return;
    await Promise.allSettled(tasks);
  })();
}
