export type CompetitorCell = boolean | "partial" | string;

export interface CompetitorRow {
  feature: string;
  rubix: CompetitorCell;
  rival: CompetitorCell;
}

export interface CompetitorSection {
  group: string;
  rows: CompetitorRow[];
}

export interface CompetitorPage {
  slug: string;
  rivalName: string;
  rivalShort: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSub: string;
  summary: string;
  whyDifferent: string[];
  whenToPick: { rubix: string[]; rival: string[] };
  matrix: CompetitorSection[];
}

const SHARED_OWNERSHIP: CompetitorSection = {
  group: "Pricing & ownership",
  rows: [
    { feature: "Transparent public INR pricing", rubix: true, rival: false },
    { feature: "Starts under ₹1,000 / user / month", rubix: true, rival: false },
    { feature: "7-day free trial, no credit card", rubix: true, rival: "partial" },
    { feature: "Self-serve cancellation, no lock-in", rubix: true, rival: "partial" },
    { feature: "You own and can export your data anytime", rubix: true, rival: true },
  ],
};

export const COMPETITORS: CompetitorPage[] = [
  {
    slug: "salesforce",
    rivalName: "Salesforce",
    rivalShort: "Salesforce",
    metaTitle: "Leads Rubix vs Salesforce — Honest CRM comparison for India",
    metaDescription:
      "How Leads Rubix compares to Salesforce Sales Cloud for Indian sales teams across real estate, education, healthcare, BFSI and more — pricing, time-to-value, GPS calling, Razorpay payments, and more.",
    heroEyebrow: "Comparison",
    heroHeadline: "Leads Rubix vs Salesforce",
    heroSub:
      "Salesforce is the global enterprise standard. Leads Rubix is built for how India actually sells — Razorpay, GST, Meta lead ads, GPS-verified calling and INR-first pricing, ready on day one.",
    summary:
      "Salesforce Sales Cloud is the dominant global CRM and excellent for very large, US-anchored organisations with dedicated admins and integration budgets. Leads Rubix targets the Indian mid-market — vertical-ready playbooks, Razorpay-native bookings, GST invoicing and a 30-minute setup instead of a six-month implementation.",
    whyDifferent: [
      "Pre-configured industry pipelines for real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing — Salesforce ships generic.",
      "Razorpay payments and GST invoices are first-class, not a managed package or AppExchange add-on.",
      "GPS-verified calling out of the box — no third-party telephony integration required.",
      "Transparent INR pricing starting at ₹999/user/month vs ₹1,800–₹15,000+ on Salesforce editions.",
      "30-minute admin onboarding instead of multi-month, partner-led Salesforce implementation.",
    ],
    whenToPick: {
      rubix: [
        "Indian mid-market team (5–500 users)",
        "Need Meta lead ads, Razorpay, GST and GPS calling out of the box",
        "Want to be live in days, not quarters",
        "Want predictable INR billing without per-feature surcharges",
      ],
      rival: [
        "Global enterprise with > 500 users and dedicated Salesforce admins",
        "Already standardised on Salesforce ecosystem (Marketing Cloud, Commerce, etc.)",
        "Heavy AppExchange integration requirements",
      ],
    },
    matrix: [
      {
        group: "Built for India",
        rows: [
          { feature: "Industry-specific playbooks ready on day one", rubix: true, rival: "partial" },
          { feature: "INR pricing with GST handled in checkout", rubix: true, rival: false },
          { feature: "Razorpay-native bookings, fees & invoices", rubix: true, rival: false },
          { feature: "Indian working hours & holiday awareness", rubix: true, rival: false },
        ],
      },
      {
        group: "Lead capture",
        rows: [
          { feature: "Facebook & Instagram Lead Ads webhooks (zero-latency)", rubix: true, rival: "partial" },
          { feature: "Custom webhook for any source", rubix: true, rival: true },
          { feature: "Bulk CSV import", rubix: true, rival: true },
        ],
      },
      {
        group: "Lead routing & accountability",
        rows: [
          { feature: "Automated round-robin rotation", rubix: true, rival: "partial" },
          { feature: "GPS-verified call tracking", rubix: true, rival: false },
          { feature: "Branch-level permissions", rubix: true, rival: true },
          { feature: "Time-to-value (admin live)", rubix: "30 minutes", rival: "weeks–months" },
        ],
      },
      SHARED_OWNERSHIP,
    ],
  },
  {
    slug: "hubspot",
    rivalName: "HubSpot",
    rivalShort: "HubSpot",
    metaTitle: "Leads Rubix vs HubSpot — CRM comparison for Indian teams",
    metaDescription:
      "How Leads Rubix compares to HubSpot CRM and Sales Hub for Indian sales teams — pricing in INR, Razorpay, GST, GPS calling, and vertical-ready playbooks.",
    heroEyebrow: "Comparison",
    heroHeadline: "Leads Rubix vs HubSpot",
    heroSub:
      "HubSpot is a beautifully designed inbound platform. Leads Rubix is built for outbound, high-velocity Indian sales — pre-configured for your industry with INR pricing and Razorpay payments built in.",
    summary:
      "HubSpot CRM is excellent for content-led, inbound, marketing-driven teams. Leads Rubix is purpose-built for outbound, phone-first sales motions in India — Meta lead ads → SDR cadence → site visit → booking, with GST invoicing and Razorpay payments wired in.",
    whyDifferent: [
      "Outbound-first: GPS-verified calling, round-robin rotation and per-rep call SLAs are core features, not bolt-ons.",
      "INR pricing vs USD pricing that shifts with the rupee — predictable invoicing for Indian finance teams.",
      "Razorpay + GST invoices native; HubSpot Payments is US/EU only.",
      "Industry playbooks pre-built — HubSpot starts with a blank pipeline.",
      "Single tier for India mid-market without HubSpot's Marketing/Sales/Service Hub tier upsell.",
    ],
    whenToPick: {
      rubix: [
        "Outbound, phone-heavy sales motion",
        "Indian team that needs INR billing and GST invoices",
        "Want Razorpay payments without third-party add-ons",
        "Need GPS calling and rep accountability",
      ],
      rival: [
        "Inbound, content-led marketing motion",
        "Need a tightly integrated marketing + service + CMS suite",
        "Global team where USD pricing and HubSpot ecosystem fit",
      ],
    },
    matrix: [
      {
        group: "Built for India",
        rows: [
          { feature: "Industry-specific playbooks ready on day one", rubix: true, rival: "partial" },
          { feature: "INR pricing with GST handled in checkout", rubix: true, rival: false },
          { feature: "Razorpay-native bookings, fees & invoices", rubix: true, rival: false },
        ],
      },
      {
        group: "Outbound sales motion",
        rows: [
          { feature: "Automated round-robin rotation", rubix: true, rival: "partial" },
          { feature: "GPS-verified call tracking", rubix: true, rival: false },
          { feature: "Per-rep call SLAs and overdue alerts", rubix: true, rival: "partial" },
          { feature: "Multi-cadence outbound sequences", rubix: true, rival: true },
        ],
      },
      {
        group: "Lead capture",
        rows: [
          { feature: "Facebook & Instagram Lead Ads webhooks", rubix: true, rival: true },
          { feature: "Custom webhook for any source", rubix: true, rival: true },
          { feature: "Form builder for marketing campaigns", rubix: "partial", rival: true },
        ],
      },
      SHARED_OWNERSHIP,
    ],
  },
  {
    slug: "zoho",
    rivalName: "Zoho CRM",
    rivalShort: "Zoho",
    metaTitle: "Leads Rubix vs Zoho CRM — Honest comparison for Indian teams",
    metaDescription:
      "How Leads Rubix compares to Zoho CRM for Indian sales teams — pre-built industry playbooks, GPS calling, Razorpay-native bookings, and faster time-to-value.",
    heroEyebrow: "Comparison",
    heroHeadline: "Leads Rubix vs Zoho CRM",
    heroSub:
      "Zoho is a flexible, generalist CRM. Leads Rubix ships pre-configured for your industry — real estate, education, healthcare, BFSI and more — so you stop configuring and start selling.",
    summary:
      "Zoho CRM is one of the most flexible CRMs available. That flexibility is also its biggest cost — most teams spend weeks customising fields, modules, blueprints and workflows. Leads Rubix gives you the answers, not the toolbox: industry pipelines, role hierarchy, payment flows and reports work on day one.",
    whyDifferent: [
      "Industry-ready instead of build-your-own: pipelines, roles, dashboards and SLAs ship pre-configured.",
      "GPS-verified calling is built in, not a Zoho Phonebridge add-on.",
      "Razorpay-native bookings and PDF GST invoices in core, not a separate Zoho Books integration.",
      "Faster onboarding: most teams are live in 30 minutes — not the typical Zoho 2–4 week setup.",
      "Single, transparent INR price — no Zoho One tier-stacking or per-module upsells.",
    ],
    whenToPick: {
      rubix: [
        "Want a CRM that works on day one for your industry",
        "Need GPS calling, Razorpay and GST out of the box",
        "Prefer one tool over a tightly-coupled Zoho One ecosystem",
        "Don't want to hire a Zoho consultant",
      ],
      rival: [
        "Already deeply invested in the Zoho One ecosystem (Books, Inventory, Desk, Campaigns)",
        "Need extreme customisation (Blueprints, custom Deluge code)",
        "Have a dedicated Zoho admin in-house",
      ],
    },
    matrix: [
      {
        group: "Day-one readiness",
        rows: [
          { feature: "Industry-specific pipelines pre-built", rubix: true, rival: false },
          { feature: "Default lead-to-booking flow", rubix: true, rival: "partial" },
          { feature: "Pre-configured role hierarchy", rubix: true, rival: "partial" },
          { feature: "Time-to-first-lead", rubix: "30 minutes", rival: "1–2 weeks" },
        ],
      },
      {
        group: "Calling & accountability",
        rows: [
          { feature: "GPS-verified call tracking", rubix: true, rival: false },
          { feature: "Auto round-robin rotation", rubix: true, rival: "partial" },
          { feature: "Per-rep daily call quotas", rubix: true, rival: "partial" },
        ],
      },
      {
        group: "Bookings & money",
        rows: [
          { feature: "Razorpay-native bookings", rubix: true, rival: "partial" },
          { feature: "Auto-generated GST invoices", rubix: true, rival: "partial" },
          { feature: "EMI / instalment tracking", rubix: true, rival: false },
        ],
      },
      SHARED_OWNERSHIP,
    ],
  },
  {
    slug: "sell-do",
    rivalName: "Sell.do",
    rivalShort: "Sell.do",
    metaTitle: "Leads Rubix vs Sell.do — Real estate CRM comparison",
    metaDescription:
      "How Leads Rubix compares to Sell.do for Indian real estate teams — and why mid-market developers and brokerages are switching to a multi-industry, transparent-pricing alternative.",
    heroEyebrow: "Comparison",
    heroHeadline: "Leads Rubix vs Sell.do",
    heroSub:
      "Sell.do is a well-known real estate CRM for large Indian developers. Leads Rubix is the multi-industry alternative with transparent pricing, GPS calling, and faster onboarding for mid-market teams.",
    summary:
      "Sell.do is a solid choice for very large real-estate developers with enterprise procurement processes. Leads Rubix is built for mid-market real estate, brokerage, and adjacent industries — same depth on lead capture and routing, with transparent INR pricing, GPS calling, and a 30-minute setup instead of a multi-month implementation.",
    whyDifferent: [
      "Multi-industry: real estate plus education, healthcare, BFSI, automotive, travel, SaaS and manufacturing.",
      "Transparent INR pricing on the website — no quote-only friction.",
      "GPS-verified calling included; no third-party calling integration required.",
      "Razorpay-native bookings with GST invoicing built in.",
      "30-minute admin onboarding instead of weeks of vendor-led implementation.",
    ],
    whenToPick: {
      rubix: [
        "Mid-market team (5–200 users)",
        "Multi-vertical group (e.g. real estate + education + finance arms)",
        "Want transparent self-serve pricing",
        "Want GPS calling and Razorpay built in",
      ],
      rival: [
        "Very large enterprise developer with dedicated procurement",
        "Need on-prem deployment with custom contractual terms",
        "Already standardised on Sell.do across all business units",
      ],
    },
    matrix: [
      {
        group: "Pricing & onboarding",
        rows: [
          { feature: "Transparent public INR pricing", rubix: true, rival: false },
          { feature: "Self-serve sign-up & 7-day free trial", rubix: true, rival: false },
          { feature: "Time-to-first-lead", rubix: "30 minutes", rival: "weeks" },
        ],
      },
      {
        group: "Lead capture & routing",
        rows: [
          { feature: "Facebook & Instagram Lead Ads webhooks", rubix: true, rival: true },
          { feature: "Auto round-robin rotation", rubix: true, rival: true },
          { feature: "GPS-verified call tracking", rubix: true, rival: false },
          { feature: "Multi-industry support beyond real estate", rubix: true, rival: false },
        ],
      },
      {
        group: "Bookings & money",
        rows: [
          { feature: "Razorpay-native bookings", rubix: true, rival: "partial" },
          { feature: "Auto-generated GST invoices", rubix: true, rival: true },
          { feature: "EMI / instalment tracking", rubix: true, rival: true },
        ],
      },
      SHARED_OWNERSHIP,
    ],
  },
];

export function getCompetitor(slug: string): CompetitorPage | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
