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
      "Drives /industries (listing) and /industries/:slug (detail). Each entry becomes its own page. slug must be URL-safe (lowercase, hyphens). icon must be one of: Building2, GraduationCap, Stethoscope, Car, Banknote, Plane, Server, Factory, ShoppingBag, Briefcase, HeartPulse, Hammer.",
    defaultValue: {
      eyebrow: "Built for every industry",
      headline: "One CRM. Every team that sells.",
      subheadline:
        "Leads Rubix adapts to the way your industry sells — from real estate site visits to SaaS demos to clinic appointments. Pick your vertical to see how teams like yours win with Leads Rubix.",
      items: [
        {
          slug: "real-estate",
          name: "Real Estate",
          icon: "Building2",
          tagline: "Capture every property enquiry. Close more bookings.",
          description:
            "From Facebook lead ads and 99acres to walk-ins and channel partners — capture every enquiry, route it to the right agent in seconds, and track every site visit through booking and registration.",
          useCases: [
            "Auto-capture leads from Facebook, Instagram, MagicBricks, 99acres and Housing.com",
            "Round-robin distribution to agents based on language, project, or working hours",
            "Site-visit scheduling with GPS-verified check-ins",
            "Booking module with token, agreement, registration and possession tracking",
            "Razorpay-backed token payments with auto-generated GST invoices",
          ],
          painPoints: [
            "Leads lost in WhatsApp groups and personal phones",
            "Channel partner attribution disputes",
            "Agents skipping site-visit logs",
          ],
          kpis: [
            { value: "60%", label: "faster first-touch" },
            { value: "3.2x", label: "site-visits per lead" },
            { value: "27%", label: "more bookings closed" },
          ],
          features: [
            "Project & inventory pipelines",
            "Channel partner portal",
            "Booking & possession workflow",
          ],
          ctaLabel: "See real-estate playbook",
          ctaHref: "/demo",
        },
        {
          slug: "education",
          name: "Education & EdTech",
          icon: "GraduationCap",
          tagline: "From enquiry to enrolment, without losing a single applicant.",
          description:
            "Universities, coaching institutes and EdTech companies use Leads Rubix to manage admissions enquiries, counsellor productivity, and the full applicant journey from form-fill to fee payment.",
          useCases: [
            "Capture admission enquiries from website forms, Meta lead ads and education aggregators",
            "Auto-route by program, campus or course preference",
            "Counsellor calling cadence with course-aware scripts",
            "Application status tracking — enquiry → application → interview → offer → enrolment",
            "Fee collection workflow with payment links and receipts",
          ],
          painPoints: [
            "Drop-offs between enquiry and counsellor follow-up",
            "No single view of applicant across multiple programs",
            "Manual reconciliation of fee payments",
          ],
          kpis: [
            { value: "2.4x", label: "enquiry-to-application" },
            { value: "45%", label: "faster counsellor response" },
            { value: "18%", label: "higher enrolment rate" },
          ],
          features: [
            "Program-wise pipelines",
            "Counsellor performance dashboards",
            "Applicant document tracking",
          ],
          ctaLabel: "See education playbook",
          ctaHref: "/demo",
        },
        {
          slug: "healthcare",
          name: "Healthcare & Clinics",
          icon: "Stethoscope",
          tagline: "Every patient enquiry answered. Every appointment kept.",
          description:
            "Hospitals, multi-specialty clinics and aesthetic centres use Leads Rubix to manage patient enquiries, appointment booking, treatment packages and follow-up cycles — while staying patient-data conscious.",
          useCases: [
            "Capture enquiries from Practo, Justdial, website chat and call ads",
            "Appointment scheduling with doctor availability sync",
            "Treatment-package nurturing for elective procedures",
            "Follow-up reminders for chronic care and post-op",
            "Patient consent and record handling with role-based access",
          ],
          painPoints: [
            "Missed appointments from late follow-ups",
            "Patient enquiries scattered across phone, WhatsApp and email",
            "No visibility into counsellor-to-doctor handoff",
          ],
          kpis: [
            { value: "55%", label: "fewer missed appointments" },
            { value: "2.1x", label: "package conversions" },
            { value: "40%", label: "faster enquiry response" },
          ],
          features: [
            "Doctor & department pipelines",
            "Appointment + reminders",
            "Role-based access for patient data",
          ],
          ctaLabel: "See healthcare playbook",
          ctaHref: "/demo",
        },
        {
          slug: "automotive",
          name: "Automotive & Dealerships",
          icon: "Car",
          tagline: "Showroom visits to test drives to deliveries — tracked end-to-end.",
          description:
            "Car, two-wheeler and commercial-vehicle dealerships use Leads Rubix to manage walk-ins, online enquiries, test-drive scheduling, finance handoffs and delivery follow-up.",
          useCases: [
            "Capture leads from Cars24, CarDekho, OEM portals and showroom walk-ins",
            "Test-drive scheduling with calendar slots",
            "Variant & accessory upsell tracking",
            "Finance & insurance partner handoffs",
            "Delivery, registration and post-sale survey workflows",
          ],
          painPoints: [
            "Test-drive no-shows from late confirmations",
            "Lost cross-sell opportunities for accessories and finance",
            "No view of dealer rep productivity",
          ],
          kpis: [
            { value: "35%", label: "more test drives completed" },
            { value: "22%", label: "higher accessory attach" },
            { value: "50%", label: "faster lead response" },
          ],
          features: [
            "Variant & inventory pipelines",
            "Test-drive scheduler",
            "Finance partner integrations",
          ],
          ctaLabel: "See automotive playbook",
          ctaHref: "/demo",
        },
        {
          slug: "financial-services",
          name: "Banking & Financial Services",
          icon: "Banknote",
          tagline: "Compliant, audit-ready lead flow for loans, insurance and wealth.",
          description:
            "NBFCs, insurance brokers, wealth managers and fintechs use Leads Rubix to capture loan/policy enquiries, run KYC handoffs, and manage advisor productivity — with full audit trail.",
          useCases: [
            "Capture leads from website calculators, partner aggregators and call ads",
            "Auto-assign by product (home loan, personal loan, term insurance, mutual fund)",
            "KYC document checklist tracking",
            "Underwriter / branch handoffs with SLA timers",
            "Audit trail for every state change — required for compliance",
          ],
          painPoints: [
            "Compliance risk from undocumented advisor conversations",
            "Drop-offs at KYC and document upload",
            "Branch escalations without a clear paper trail",
          ],
          kpis: [
            { value: "100%", label: "audit-trail coverage" },
            { value: "30%", label: "faster KYC completion" },
            { value: "1.8x", label: "advisor productivity" },
          ],
          features: [
            "Product-wise pipelines",
            "KYC checklist & SLAs",
            "Full audit log of every action",
          ],
          ctaLabel: "See BFSI playbook",
          ctaHref: "/demo",
        },
        {
          slug: "travel",
          name: "Travel & Hospitality",
          icon: "Plane",
          tagline: "Turn enquiries into itineraries — and itineraries into bookings.",
          description:
            "Travel agencies, DMCs, hotels and resort chains use Leads Rubix to capture trip enquiries, build itineraries, send proposals and close bookings — across phone, WhatsApp and OTA channels.",
          useCases: [
            "Capture leads from website, Meta ads, MakeMyTrip and Booking.com",
            "Itinerary builder with day-wise plans, hotels and inclusions",
            "Quote versioning and approval flow",
            "Group / corporate booking handling",
            "Post-trip review and repeat booking nurture",
          ],
          painPoints: [
            "Lost bookings from slow itinerary turnaround",
            "Discount mistakes from manual quoting",
            "No reactivation of past travellers",
          ],
          kpis: [
            { value: "2.8x", label: "itineraries per agent" },
            { value: "33%", label: "higher repeat bookings" },
            { value: "40%", label: "faster quote turnaround" },
          ],
          features: [
            "Itinerary & quote builder",
            "Group booking pipelines",
            "Past-traveller reactivation",
          ],
          ctaLabel: "See travel playbook",
          ctaHref: "/demo",
        },
        {
          slug: "saas",
          name: "SaaS & IT Services",
          icon: "Server",
          tagline: "From inbound demo request to closed-won — without spreadsheets.",
          description:
            "B2B SaaS companies and IT services firms use Leads Rubix to manage inbound leads, demo scheduling, multi-stakeholder deal cycles and renewals — with API-first integrations into their stack.",
          useCases: [
            "Capture demo requests from website, LinkedIn and content downloads",
            "Auto-assign by territory, vertical or company size",
            "Multi-stakeholder deal tracking with stakeholder map",
            "Quote, e-sign and contract milestones",
            "Renewal & expansion playbooks for customer success",
          ],
          painPoints: [
            "Reps managing pipelines in their head and in spreadsheets",
            "Slow demo scheduling killing inbound conversion",
            "No structured renewal motion",
          ],
          kpis: [
            { value: "40%", label: "more inbound demos held" },
            { value: "1.6x", label: "deal velocity" },
            { value: "92%", label: "renewal rate" },
          ],
          features: [
            "Stakeholder maps",
            "REST API & webhooks",
            "Renewal playbooks",
          ],
          ctaLabel: "See SaaS playbook",
          ctaHref: "/demo",
        },
        {
          slug: "manufacturing",
          name: "Manufacturing & B2B Distribution",
          icon: "Factory",
          tagline: "Long sales cycles, multiple plants, one source of truth.",
          description:
            "Industrial manufacturers, distributors and channel-led B2B businesses use Leads Rubix to manage RFQs, sample requests, plant visits and multi-quarter negotiations across territories.",
          useCases: [
            "Capture RFQs from website, IndiaMART and TradeIndia",
            "Sample dispatch & follow-up tracking",
            "Plant visit scheduling and trip reports",
            "Multi-territory rep ownership with handoffs",
            "Annual contract & rate-card negotiation tracking",
          ],
          painPoints: [
            "RFQ enquiries lost between sales and plant teams",
            "No visibility into long-cycle deals",
            "Rep attrition causing pipeline loss",
          ],
          kpis: [
            { value: "2.2x", label: "RFQ-to-quote rate" },
            { value: "45%", label: "shorter sample cycle" },
            { value: "100%", label: "pipeline retained on rep change" },
          ],
          features: [
            "RFQ & sample tracking",
            "Territory ownership rules",
            "Multi-quarter pipeline views",
          ],
          ctaLabel: "See manufacturing playbook",
          ctaHref: "/demo",
        },
      ],
    },
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
