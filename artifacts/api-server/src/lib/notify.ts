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
};

export function notifyNewLead(lead: LeadPayload, log: Logger): void {
  const webhook = process.env.LEAD_NOTIFICATION_WEBHOOK;
  if (!webhook) return;
  // fire-and-forget
  void (async () => {
    try {
      const text =
        `New lead from ${lead.name} (${lead.company})\n` +
        `Email: ${lead.email}\nPhone: ${lead.phone}\nSource: ${lead.source}\n` +
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
