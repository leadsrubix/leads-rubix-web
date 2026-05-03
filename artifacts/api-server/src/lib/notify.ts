import type { Logger } from "pino";

// New-lead notifier. Configure ONE of:
//   LEAD_NOTIFICATION_WEBHOOK   — JSON webhook (Slack, Zapier, custom).
//
// Both are best-effort — we never block the API response on them.

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

export function notifyNewLead(lead: LeadPayload, log: Logger): void {
  const webhook = process.env.LEAD_NOTIFICATION_WEBHOOK;
  if (!webhook) return;
  // fire-and-forget
  void (async () => {
    try {
      const bandIcon = lead.scoreBand ? `${BAND_EMOJI[lead.scoreBand]} ${lead.scoreBand.toUpperCase()}` : "";
      const scoreLine =
        lead.score != null
          ? `Score: ${lead.score}/100 ${bandIcon}\n`
          : "";
      const utmLine =
        lead.utm && (lead.utm.source || lead.utm.medium || lead.utm.campaign)
          ? `UTM: ${[lead.utm.source, lead.utm.medium, lead.utm.campaign].filter(Boolean).join(" / ")}\n`
          : "";
      const landingLine = lead.landingPath ? `Landing: ${lead.landingPath}\n` : "";
      const referrerLine = lead.referrer ? `Referrer: ${lead.referrer}\n` : "";
      const text =
        `${scoreLine}New lead from ${lead.name} (${lead.company})\n` +
        `Email: ${lead.email}\nPhone: ${lead.phone}\nSource: ${lead.source}\n` +
        utmLine +
        landingLine +
        referrerLine +
        `Team size: ${lead.teamSize ?? "n/a"}\nMessage length: ${lead.messageLen} chars\n` +
        `Lead id: ${lead.id}`;
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          lead,
        }),
      });
      if (!res.ok) {
        log.warn({ status: res.status, leadId: lead.id }, "notify: webhook returned non-2xx");
      }
    } catch (err) {
      log.warn({ err, leadId: lead.id }, "notify: webhook delivery failed");
    }
  })();
}
