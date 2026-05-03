// Known content sections + their default values + a friendly description.
// Unknown keys fall back to a JSON editor.

export type SectionDefinition = {
  key: string;
  label: string;
  description: string;
  defaultValue: unknown;
};

export const KNOWN_SECTIONS: SectionDefinition[] = [
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
    description: "Company contact details shown in the footer.",
    defaultValue: {
      legalEntity: "Leads Rubix Technologies Pvt. Ltd.",
      addressLine: "Andheri East, Mumbai 400069, India",
      supportEmail: "support@leadsrubix.com",
      salesEmail: "sales@leadsrubix.com",
      hours: "Mon–Sat, 10:00–19:00 IST",
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
    description: "Quotes shown on the homepage.",
    defaultValue: [
      {
        name: "Priya Sharma",
        role: "Sales Head",
        company: "Skyline Developers",
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
