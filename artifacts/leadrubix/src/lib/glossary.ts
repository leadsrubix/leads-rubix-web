// Long-tail SEO glossary. Keep entries concise (~250–400 words) and link
// liberally between related terms — internal linking is the whole point.

export interface GlossaryEntry {
  slug: string;
  term: string;
  oneliner: string;
  body: string;
  related?: string[];
  updatedAt: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: "lead-response-time",
    term: "Lead Response Time",
    oneliner:
      "How long a sales team takes to respond to an inbound lead — the single biggest predictor of whether the lead converts.",
    body: `Lead response time is the elapsed time between an inbound enquiry hitting your CRM and a salesperson making first contact (call, WhatsApp, or email).

Why it matters in India: studies consistently show conversion rates drop by **80–90% when response stretches past 5 minutes**, and most Indian buyers fill 3–5 vendor forms in parallel — whoever calls first usually wins.

**Benchmarks (2026, India SaaS/services):**
- Top-quartile teams: under 2 minutes
- Median: 18 minutes
- Bottom-quartile: over 4 hours

**How to improve it:**
1. Auto-route inbound leads to a specific rep (round-robin or by territory)
2. Push a WhatsApp-template message within 30 seconds (auto)
3. Trigger a callback queue with a 5-minute SLA timer
4. Track time-to-first-touch as a leaderboard metric

Leads Rubix tracks this automatically and surfaces SLA breaches on the manager dashboard.`,
    related: ["sla", "lead-routing", "speed-to-lead"],
    updatedAt: "2026-04-15",
  },
  {
    slug: "speed-to-lead",
    term: "Speed to Lead",
    oneliner:
      "Synonym for lead response time, popular among US sales-ops teams. Measures how fast a rep contacts an inbound lead.",
    body: `"Speed to lead" is the same metric as [lead response time](/glossary/lead-response-time) — the time from form fill to first sales contact.

The classic Harvard Business Review study (Oldroyd et al.) found that teams responding within 1 hour were 7× more likely to qualify the lead than those responding in 1–2 hours, and 60× more likely than those responding in 24+ hours. Indian buyer behaviour amplifies this: lower attention spans and parallel vendor sourcing mean the curve is even steeper.

**The honest version:** if you respond in under 5 minutes, you're competing on product. If you respond in over 1 hour, you're competing on price.`,
    related: ["lead-response-time", "lead-routing"],
    updatedAt: "2026-04-15",
  },
  {
    slug: "lead-routing",
    term: "Lead Routing",
    oneliner:
      "The rules a CRM uses to assign inbound leads to specific reps — by territory, product, source, value, or round-robin.",
    body: `Lead routing turns a flat inbound queue into a fair, fast assignment system. Without it, leads sit in a shared inbox until someone notices.

**Common routing strategies:**
- **Round-robin** — fair distribution, good for similar-experience reps
- **By geography / pin code** — best for field-heavy industries (real estate, automotive)
- **By product line** — when reps specialise
- **By lead score** — hot leads to senior reps, cold to SDRs (see [lead scoring](/glossary/lead-scoring))
- **By source** — Google Ads to Team A, organic to Team B (cleaner attribution)

**Indian SMB pitfalls we see often:**
1. Manager hand-assigns leads → bottleneck on weekends
2. WhatsApp DMs bypass the CRM entirely → leaks
3. No fallback when the assigned rep is OOO → leads rot

A well-configured router resolves all three.`,
    related: ["lead-response-time", "lead-scoring", "sla"],
    updatedAt: "2026-04-15",
  },
  {
    slug: "lead-scoring",
    term: "Lead Scoring",
    oneliner:
      "A 0–100 numerical score representing how likely a lead is to convert — used to prioritise sales effort.",
    body: `Lead scoring is a transparent way to rank inbound leads so the sales team works the hottest ones first.

**Two flavours:**
1. **Rule-based** (recommended for SMBs) — explicit weights you can read and tweak. Example: business email +10, team size 50+ +25, message length 500+ chars +15, came from /pricing page +15.
2. **Model-based** — ML on historical conversions. Powerful but opaque; requires 1000+ closed-won deals to be worth the engineering cost.

**A simple Indian-SMB rubric (works for most B2B):**
- Base 30
- Business domain (not gmail/yahoo): +10
- Team size 50+: +25
- High-intent landing page (/demo, /pricing): +15
- Inbound from organic search or referral: +10
- Long thoughtful message (200+ chars): +10
- Phone with country code: +5

Anything 70+ is "hot" — call within 5 minutes. 45–69 "warm" — call within an hour. Below 45 "cold" — drip nurture.

Leads Rubix uses this exact rubric out of the box and writes the contributing factors to every lead so reps can see why.`,
    related: ["lead-response-time", "lead-routing", "icp"],
    updatedAt: "2026-04-15",
  },
  {
    slug: "icp",
    term: "ICP (Ideal Customer Profile)",
    oneliner:
      "A documented description of the company most likely to buy, stay, and refer — the north star for marketing and sales targeting.",
    body: `An ICP is a sharp, opinionated description of the *kind* of customer that should make up 80% of your pipeline.

**A good ICP includes:**
- Industry + sub-industry
- Company size (employees and revenue)
- Geography
- Tech stack signals (e.g. "uses Tally, not SAP")
- Trigger events (e.g. "just raised seed round", "expanded to a second city")
- Anti-ICP — who you explicitly don't sell to

**ICP vs. buyer persona:** ICP describes the *company*, persona describes the *human*. You need both.

**Why it matters for [lead scoring](/glossary/lead-scoring):** the strongest scoring signal is "does this lead match our ICP?" Reps stop chasing tyre-kickers and marketers stop optimising for vanity volume.`,
    related: ["lead-scoring", "lead-routing"],
    updatedAt: "2026-04-15",
  },
  {
    slug: "sla",
    term: "SLA (Service Level Agreement, in sales)",
    oneliner:
      "A formal commitment between marketing and sales — usually that inbound MQLs will be contacted within X minutes/hours.",
    body: `In sales-ops, an SLA is the contract between marketing and sales: marketing commits to deliver N leads of quality Q per month; sales commits to contact each one within T minutes.

**Typical Indian SMB SLA tiers:**
| Lead score | Contact window |
|------------|----------------|
| Hot (70+) | 5 minutes (business hours), WhatsApp template within 60 seconds |
| Warm (45–69) | 60 minutes |
| Cold (<45) | 24 hours, drip sequence acceptable |

**How to enforce it:**
1. Stamp the assigned-at timestamp on every lead
2. Trigger a manager alert when (now − assigned_at) exceeds the SLA
3. Show a leaderboard on the wall

Without enforcement, SLAs are decorative. With enforcement, they're the second-largest lever on conversion (after [response time](/glossary/lead-response-time) itself).`,
    related: ["lead-response-time", "lead-routing"],
    updatedAt: "2026-04-15",
  },
  {
    slug: "whatsapp-business-api",
    term: "WhatsApp Business API",
    oneliner:
      "Meta's official, paid, programmatic WhatsApp interface — required for any business sending automated WhatsApp messages at scale in India.",
    body: `The WhatsApp Business API (often called "WABA") is the paid tier above the free WhatsApp Business app. It's the only legitimate way to send WhatsApp at scale — the free app caps at ~256 contacts and breaks for marketing automation.

**Key concepts:**
- **BSP (Business Solution Provider)** — Meta partners that resell API access (Gupshup, AiSensy, Twilio, Interakt). You can't sign up directly with Meta in India.
- **Template messages** — pre-approved by Meta, the only kind you can send to someone who hasn't messaged you in 24h.
- **Session messages** — free-form, only allowed within 24h of the customer's last message.
- **Conversation pricing** — billed per 24h "conversation" window, not per message. As of 2026, marketing conversations to India are ~₹0.78 each.

**Why Indian B2B teams need it:**
- 90%+ of customers prefer WhatsApp to email
- Read rates are 5–10× higher than SMS or email
- Indian customers expect a WhatsApp option on every form

Leads Rubix integrates with all major BSPs via webhooks — when a lead fills your form, a templated WhatsApp goes out within 60 seconds.`,
    related: ["lead-response-time"],
    updatedAt: "2026-04-15",
  },
];

export function findGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((e) => e.slug === slug);
}
