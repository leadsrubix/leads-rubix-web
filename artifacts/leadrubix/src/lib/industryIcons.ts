import {
  Building2,
  GraduationCap,
  Stethoscope,
  Car,
  Banknote,
  Plane,
  Server,
  Factory,
  ShoppingBag,
  Briefcase,
  HeartPulse,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Building2,
  GraduationCap,
  Stethoscope,
  Car,
  Banknote,
  Plane,
  Server,
  Factory,
  ShoppingBag,
  Briefcase,
  HeartPulse,
  Hammer,
};

export function getIndustryIcon(name?: string): LucideIcon {
  if (name && INDUSTRY_ICONS[name]) return INDUSTRY_ICONS[name];
  return Building2;
}

export interface IndustryKpi {
  value: string;
  label: string;
}

export interface IndustryItem {
  slug: string;
  name: string;
  icon?: string;
  tagline: string;
  description: string;
  useCases: string[];
  painPoints: string[];
  kpis: IndustryKpi[];
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface IndustriesContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  items: IndustryItem[];
}

export const DEFAULT_INDUSTRIES: IndustriesContent = {
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
      features: ["Stakeholder maps", "REST API & webhooks", "Renewal playbooks"],
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
};
