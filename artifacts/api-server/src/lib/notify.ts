import type { Logger } from "pino";

// New-lead notifier. Configure any of:
//   LEAD_NOTIFICATION_WEBHOOK    — JSON webhook (Slack, Zapier, custom).
//   GOOGLE_SHEETS_WEBHOOK_URL    — Google Apps Script /exec endpoint that
//                                  appends a row to a sheet (same shape the
//                                  static popup.js uses, so /demo + /contact
//                                  submissions land in the same Excel sheet).
//
// All are best-effort — we never block the API response on them.

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

function sendToGoogleSheet(lead: LeadPayload, log: Logger): void {
  const sheetUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!sheetUrl) return;
  void (async () => {
    try {
      const now = new Date(lead.createdAt);
      const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
      // Strip leading + and any non-digits from a phone like "+91 98765 43210"
      // so the Apps Script can split country code from local number cleanly.
      const phoneDigits = lead.phone.replace(/[^0-9]/g, "");
      // Heuristic: if the original starts with "+" and is >10 digits, treat
      // the leading 1–3 digits as the country code; otherwise default to 91.
      let countryCode = "91";
      let localPhone = phoneDigits;
      if (lead.phone.trim().startsWith("+") && phoneDigits.length > 10) {
        const cc = phoneDigits.length - 10;
        countryCode = phoneDigits.slice(0, cc);
        localPhone = phoneDigits.slice(cc);
      }
      const interest = lead.utm?.campaign || lead.source || "Demo Request";
      const payload = {
        // Apps-script-friendly keys (same as popup.js)
        name: lead.name,
        countrycode: countryCode,
        phone: localPhone,
        email: lead.email,
        website: "leadsrubix.com",
        contactfor: interest,
        ip: "",
        Date: dateStr,
        Name: lead.name,
        "country-code": countryCode,
        Phone: localPhone,
        Email: lead.email,
        Website: "leadsrubix.com",
        ContactFor: interest,
        Ip: "",
        Taken: "No",
        "Taken on Date": "",
        // Extra context unique to the demo / contact flow
        company: lead.company,
        teamSize: lead.teamSize ?? "",
        leadId: lead.id,
        score: lead.score ?? "",
        scoreBand: lead.scoreBand ?? "",
      };
      const res = await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // Apps Script returns text/html; allow redirects (default).
      });
      if (!res.ok) {
        log.warn({ status: res.status, leadId: lead.id }, "notify: google sheet returned non-2xx");
      }
    } catch (err) {
      log.warn({ err, leadId: lead.id }, "notify: google sheet delivery failed");
    }
  })();
}

export function notifyNewLead(lead: LeadPayload, log: Logger): void {
  // Fan out to the Google Sheet first (independent of the JSON webhook).
  sendToGoogleSheet(lead, log);

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
