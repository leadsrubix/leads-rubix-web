// Known content sections + their default values + a friendly description.
// Unknown keys fall back to a JSON editor.
import { INDUSTRIES_DEFAULT } from "@/lib/industriesData";

export type SectionDefinition = {
  key: string;
  label: string;
  description: string;
  defaultValue: unknown;
};

export const KNOWN_SECTIONS: SectionDefinition[] = [
  {
    key: "brand_identity",
    label: "Brand — Logo & identity",
    description:
      "Logo and brand identity used in the navbar and footer. Set logoImageUrl to a full https:// URL (e.g. an uploaded image) to replace the default building icon. Leave logoImageUrl empty to use the icon. appUrl is the 'Sign In / Start Free Trial' destination.",
    defaultValue: {
      brandName: "Leads Rubix",
      logoImageUrl: "",
      footerTagline:
        "The purpose-built CRM for Indian real estate sales teams. Capture, manage, and convert leads from first contact through booking.",
      bottomLine: "Made in India  ·  Built for Indian Real Estate",
      appUrl: "https://app.leadsrubix.com/",
      signInLabel: "Sign In",
      ctaLabel: "Start Free Trial",
    },
  },
  {
    key: "industries",
    label: "Industries — Vertical pages",
    description:
      "Drives /industries (listing) and /industries/:slug (detail). Each entry becomes its own page. slug must be URL-safe (lowercase, hyphens). icon must be one of: Building2, GraduationCap, Stethoscope, Car, Banknote, Plane, Server, Factory, ShoppingBag, Briefcase, HeartPulse, Hammer. Each item supports rich fields: tagline, description, longDescription, heroStat, leadSources[], roles[], useCases[], painPoints[], kpis[], features[], workflow[], integrations[], testimonial, faq[].",
    defaultValue: INDUSTRIES_DEFAULT,
  },
  {
    key: "footer_links",
    label: "Footer — Link columns",
    description:
      "Three columns of links shown in the footer. Each item has a label and href. Use a relative path like /pricing for internal links, or full https:// URLs for external links.",
    defaultValue: {
      productHeading: "Product",
      productLinks: [
        { label: "Features", href: "/features" },
        { label: "Industries", href: "/industries" },
        { label: "Solutions", href: "/solutions" },
        { label: "Integrations", href: "/integrations" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/security" },
        { label: "Login", href: "https://app.leadsrubix.com/" },
        { label: "Start Free Trial", href: "https://app.leadsrubix.com/" },
      ],
      companyHeading: "Company",
      companyLinks: [
        { label: "About Us", href: "/about" },
        { label: "Compare", href: "/compare" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Book a Demo", href: "/demo" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Blog", href: "/blog" },
      ],
      legalHeading: "Legal",
      legalLinks: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Refund Policy", href: "/refund" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  },
  {
    key: "home_hero",
    label: "Home — Hero",
    description: "Main headline at the top of the homepage.",
    defaultValue: {
      eyebrow: "Real-estate CRM, built for India",
      headline: "Stop losing leads in WhatsApp",
      subheadline:
        "Capture, distribute and convert every property enquiry — from Facebook, Instagram, MagicBricks and 99acres — without spreadsheets.",
      primaryCtaLabel: "Start Free Trial",
      secondaryCtaLabel: "Book a Demo",
    },
  },
  {
    key: "home_announcement",
    label: "Home — Announcement banner",
    description: "Optional small banner shown above the navbar. Leave text empty to hide.",
    defaultValue: {
      text: "",
      linkLabel: "",
      linkHref: "",
    },
  },
  {
    key: "footer_contact",
    label: "Footer — Contact info",
    description:
      "Company contact details shown in the footer, on the contact page, and in LocalBusiness structured data. `phone` should be in international format like '+91-22-XXXX-XXXX' (or blank to omit). `whatsapp` is digits-only international (e.g. '919876543210') — leave blank to hide the floating WhatsApp button.",
    defaultValue: {
      legalEntity: "Leads Rubix Technologies Pvt. Ltd.",
      addressLine: "Andheri East, Mumbai 400069, India",
      supportEmail: "support@leadsrubix.com",
      salesEmail: "sales@leadsrubix.com",
      hours: "Mon–Sat, 10:00–19:00 IST",
      phone: "",
      whatsapp: "",
    },
  },
  {
    key: "faq_items",
    label: "FAQ — Questions",
    description: "List of question/answer pairs shown on the FAQ page.",
    defaultValue: [
      {
        question: "How does the 7-day free trial work?",
        answer:
          "You can use the full Growth plan for 7 days without entering any payment details. After day 7 you can pick a plan or stop using the product.",
      },
    ],
  },
  {
    key: "testimonials",
    label: "Home — Testimonials",
    description:
      "Quotes shown on the homepage. Optional fields per entry: logo (URL or upload path), city, industry, illustrative (boolean — set true while you're using a placeholder customer name).",
    defaultValue: [
      {
        name: "Priya Sharma",
        role: "Sales Head",
        company: "Skyline Developers",
        city: "Mumbai",
        industry: "Real Estate",
        logo: null,
        illustrative: true,
        body: "Round-robin rotation alone saved us hours every day. We stopped fighting over leads in WhatsApp.",
      },
    ],
  },
  {
    key: "case_studies",
    label: "Case studies",
    description: "Outcome stories shown on the case-studies page.",
    defaultValue: [
      {
        tag: "Multi-branch brokerage",
        title: "Cutting first-touch time from hours to under 5 minutes",
        body: "Auto-rotation and SMS+WhatsApp alerts made sure leads never sat unattended overnight.",
        metric1: { value: "-93%", label: "First-touch time" },
        metric2: { value: "+38%", label: "Site-visit conversion" },
        metric3: { value: "42", label: "Agents managed" },
      },
    ],
  },
  {
    key: "pricing_plans",
    label: "Pricing — Plans",
    description:
      "Plan cards on the /pricing page. Set monthly to 0 for a 'Custom' price (used for Enterprise). Annual discount is auto-calculated from monthly if you leave annual at 0.",
    defaultValue: {
      annualDiscount: 0.2,
      plans: [
        {
          name: "Starter",
          monthly: 999,
          annual: 0,
          desc: "Perfect for small brokerages getting started with structured sales.",
          highlight: false,
          cta: "Start Free Trial",
          href: "https://app.leadsrubix.com/",
          features: [
            "Up to 5 users",
            "Facebook & Instagram lead ads webhooks",
            "FRESH → BOOKED pipeline (default stages)",
            "Basic call logging",
            "CSV import & export",
            "Email support",
          ],
        },
        {
          name: "Growth",
          monthly: 1499,
          annual: 0,
          desc: "For growing teams that need automation and deep analytics.",
          highlight: true,
          cta: "Start Free Trial",
          href: "https://app.leadsrubix.com/",
          features: [
            "Up to 20 users",
            "Automated round-robin lead rotation",
            "GPS-verified call tracking",
            "Custom pipeline stages & 6 custom lead fields",
            "Bookings & Razorpay integration with PDF invoices",
            "Analytics dashboards & calling reports",
            "Priority email + chat support",
          ],
        },
        {
          name: "Enterprise",
          monthly: 0,
          annual: 0,
          desc: "For large developers needing multi-org structure and dedicated support.",
          highlight: false,
          cta: "Contact Sales",
          href: "/contact",
          features: [
            "Unlimited users",
            "Multi-organization & multi-branch support",
            "Custom role definitions & branch-level permissions",
            "REST API access & Socket.IO real-time events",
            "Dedicated account manager & onboarding",
            "Custom SLA & on-premise deployment options",
          ],
        },
      ],
    },
  },
  {
    key: "tracking_pixels",
    label: "Tracking — GA4 / FB Pixel / Taboola",
    description:
      "Marketing & analytics tags fired site-wide. Pixels only load after the visitor accepts cookies in the consent banner: GA4 + Microsoft Clarity fire under 'analytics' consent; Facebook Pixel and Taboola fire under 'marketing' consent. Leave any field blank to disable that pixel. ga4MeasurementId looks like 'G-XXXXXXXX'. fbPixelId is the numeric ID from Meta Events Manager. taboolaAccountId is the account/publisher slug from Taboola Backstage. clarityProjectId is the short alphanumeric ID from clarity.microsoft.com.",
    defaultValue: {
      ga4MeasurementId: "",
      fbPixelId: "",
      taboolaAccountId: "",
      clarityProjectId: "",
    },
  },
  {
    key: "trusted_by",
    label: "Home — Customer logo strip",
    description:
      "Logos shown in the 'Trusted by' strip. `name` is required; `src` is an optional full https:// image URL — if omitted, the company name renders as a styled wordmark. Up to 20 entries (first 8 are shown).",
    defaultValue: {
      heading: "Trusted by sales teams across India",
      logos: [
        { name: "Horizon Developers", src: "" },
        { name: "Skyline Realty", src: "" },
        { name: "MeritEdu", src: "" },
        { name: "WellCare Hospitals", src: "" },
        { name: "BlueLeaf Capital", src: "" },
        { name: "Vista Motors", src: "" },
      ],
    },
  },
  {
    key: "trust_badges",
    label: "Security — Trust badges",
    description:
      "Small badge cards shown on the /security page. Each has a label, optional caption, optional src (https:// image URL — wordmark fallback if blank), and optional href (link). Use for 'DPDP 2023', 'PCI-DSS via Razorpay', 'AWS Hosted', G2 / Capterra ratings, etc.",
    defaultValue: {
      heading: "Recognised, audited, compliant",
      items: [
        { label: "DPDP 2023", caption: "India data-protection compliant", src: "", href: "" },
        { label: "PCI-DSS", caption: "Payments via Razorpay (Level 1)", src: "", href: "" },
        { label: "AWS Hosted", caption: "Elastic Beanstalk · Mumbai region", src: "", href: "" },
        { label: "MongoDB Atlas", caption: "Encrypted at rest · daily backups", src: "", href: "" },
      ],
    },
  },
  {
    key: "social_links",
    label: "Social media links",
    description:
      "Footer social icons. Leave a URL empty to hide that icon. Use full https:// URLs.",
    defaultValue: {
      linkedin: "https://www.linkedin.com/company/leads-rubix",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
  },
];

export function isKnownSection(key: string): boolean {
  return KNOWN_SECTIONS.some((s) => s.key === key);
}
