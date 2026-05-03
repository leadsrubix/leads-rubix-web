import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Building2,
  Home as HomeIcon,
  Briefcase,
  Network,
  Users,
  Check,
  ArrowRight,
  Database,
  UserX,
  Clock,
  RefreshCw,
  PhoneCall,
  BarChart3,
  CreditCard,
  Shield,
  Search,
  CheckSquare,
  Globe,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  MessageSquare,
  Plus,
  Minus,
} from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
import { SocialProofTicker } from "@/components/marketing/SocialProofTicker";

interface HomeHero {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  body: string;
}

const DEFAULT_HERO: HomeHero = {
  eyebrow: "Purpose-built for India's high-velocity sales teams",
  headline: "Stop losing leads in WhatsApp. Start closing them.",
  subheadline:
    "The CRM built for how India actually sells — across real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing. Automate lead routing, track team performance, and respond in seconds.",
  primaryCtaLabel: "Start Free Trial",
  secondaryCtaLabel: "Book a Demo",
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajeev K.",
    role: "VP Sales",
    company: "Horizon Developers",
    body: "Before Leads Rubix, we were losing 30% of our Facebook leads just because agents didn't check the sheet in time. Now every lead is called within 5 minutes — our site visits have doubled.",
  },
  {
    name: "Anuradha S.",
    role: "Director of Admissions",
    company: "Tier-1 Management Institute",
    body: "Counsellor response time dropped from 2.4 hours to 8 minutes. Application volume nearly tripled in one cycle — without adding a single counsellor. Cadence automation effectively replaced four FTEs.",
  },
  {
    name: "Vikram M.",
    role: "Head of Sales Ops",
    company: "Series-B SaaS",
    body: "We replaced HubSpot Sales Hub plus a tangle of Notion docs. Forecast accuracy went from ±32% to ±9% in one quarter. The stakeholder map and per-stage confidence are killer features.",
  },
];

function splitHeadline(headline: string): { lead: string; accent: string | null } {
  const idx = headline.lastIndexOf(". ");
  if (idx === -1) return { lead: headline, accent: null };
  return {
    lead: headline.slice(0, idx + 1).trim(),
    accent: headline.slice(idx + 2).trim(),
  };
}

const DASHBOARD_VALUES = [7.3, 0.5, 3.6];
const PIPELINE_COUNTS = [12, 8, 24, 6, 3];

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Leads Rubix",
  url: "https://leadsrubix.com",
  logo: "https://leadsrubix.com/favicon.svg",
  description:
    "CRM purpose-built for India's high-velocity sales teams across real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing.",
  sameAs: [
    "https://www.linkedin.com/company/leadsrubix",
    "https://twitter.com/leadsrubix",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lower Parel",
    addressLocality: "Mumbai",
    addressRegion: "MH",
    postalCode: "400013",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@leadsrubix.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@leadsrubix.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
};

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://leadsrubix.com/#localbusiness",
  name: "Leads Rubix Technologies Pvt. Ltd.",
  url: "https://leadsrubix.com",
  image: "https://leadsrubix.com/opengraph.jpg",
  telephone: "+91-22-0000-0000",
  email: "hello@leadsrubix.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lower Parel",
    addressLocality: "Mumbai",
    addressRegion: "MH",
    postalCode: "400013",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.076,
    longitude: 72.8777,
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Delhi" },
    { "@type": "City", name: "Bengaluru" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Pune" },
    { "@type": "City", name: "Kolkata" },
    { "@type": "City", name: "Ahmedabad" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/leadsrubix",
    "https://twitter.com/leadsrubix",
  ],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Leads Rubix",
  url: "https://leadsrubix.com",
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://leadsrubix.com/blog?tag={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const SPEAKABLE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://leadsrubix.com/#webpage",
  url: "https://leadsrubix.com/",
  name: "Leads Rubix — The CRM for India's high-velocity sales teams",
  inLanguage: "en-IN",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", '[data-speakable="hero-sub"]', '[data-speakable="value-prop"]'],
  },
  isPartOf: { "@id": "https://leadsrubix.com/#localbusiness" },
};

const SOFTWARE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Leads Rubix CRM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  offers: {
    "@type": "Offer",
    price: "999",
    priceCurrency: "INR",
    url: "https://leadsrubix.com/pricing",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "120",
  },
};

export default function Home() {
  const hero = useContent<HomeHero>("home_hero", DEFAULT_HERO);
  const testimonialsCms = useContent<Testimonial[]>("testimonials", []);
  const testimonials = testimonialsCms.length > 0 ? testimonialsCms : DEFAULT_TESTIMONIALS;
  const usingCmsTestimonials = testimonialsCms.length > 0;
  const faqCms = useContent<Array<{ question: string; answer: string }>>("faq_items", []);
  const HOME_FAQ_FALLBACK = [
    { question: "How long is the free trial?", answer: "We offer a 7-day full-featured free trial. No credit card is required to sign up." },
    { question: "Can I cancel anytime?", answer: "Yes, our subscriptions are month-to-month. You can cancel at any time without penalty." },
    { question: "Do you offer white-labelling?", answer: "Yes, white-labelling is available on our Enterprise plan. You can use your own domain and branding." },
    { question: "Is GST included in the pricing?", answer: "No, the prices listed are exclusive of 18% GST." },
    { question: "Who owns my data?", answer: "You do. We provide easy export tools so you can download your leads and data at any time." },
    { question: "What kind of support do you offer?", answer: "We offer email support for all plans, priority chat support for Growth, and a dedicated manager for Enterprise." },
  ];
  const homeFaqs = faqCms.length > 0 ? faqCms : HOME_FAQ_FALLBACK;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: "Leads Rubix — The CRM for India's high-velocity sales teams",
    description:
      "Purpose-built CRM for Indian sales teams across real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing. Capture leads instantly, route them automatically, and close more revenue. 7-day free trial.",
    canonical: "https://leadsrubix.com/",
    jsonLd: [
      ORGANIZATION_JSONLD,
      LOCAL_BUSINESS_JSONLD,
      SOFTWARE_JSONLD,
      WEBSITE_JSONLD,
      SPEAKABLE_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: homeFaqs.slice(0, 10).map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  });

  const { lead: headlineLead, accent: headlineAccent } = splitHeadline(hero.headline);

  return (
    <Layout>
      <div className="bg-[#F1F1F9] text-[#252140] font-sans selection:bg-[#252140] selection:text-white">
        {/* Hero */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-br from-[#FAF2EE] via-[#F1F1F9] to-[#E8EAF5]">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6B9D]/[0.08] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#252140]/[0.05] rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center flex-wrap gap-3 mb-8">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFFFFF]/50 border border-[#252140]/20 rounded-full text-xs font-semibold tracking-widest uppercase text-[#252140] shadow-sm"
                  data-testid="hero-eyebrow"
                >
                  {hero.eyebrow}
                </div>
                <SocialProofTicker />
              </div>
              <h1
                className="font-['Fraunces'] text-6xl md:text-7xl leading-[1.1] mb-6 font-medium"
                data-testid="hero-headline"
              >
                {headlineLead}
                {headlineAccent ? (
                  <>
                    {" "}
                    <span className="text-[#252140] italic font-light">{headlineAccent}</span>
                  </>
                ) : null}
              </h1>
              <p
                className="text-lg md:text-xl text-[#252140]/70 mb-10 leading-relaxed max-w-xl font-medium"
                data-testid="hero-subheadline"
              >
                {hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <a
                  href="https://app.leadsrubix.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#252140] text-[#FFFFFF] px-8 py-4 rounded-2xl text-base font-medium hover:bg-[#16142B] shadow-lg shadow-[#252140]/20 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center hover:-translate-y-0.5"
                  data-testid="btn-hero-cta"
                >
                  {hero.primaryCtaLabel} <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/demo"
                  className="bg-[#FFFFFF] text-[#252140] border border-[#252140]/20 px-8 py-4 rounded-2xl text-base font-medium hover:border-[#252140]/50 hover:bg-[#E4E4EF] transition-all duration-300 w-full sm:w-auto text-center shadow-sm"
                  data-testid="btn-hero-demo"
                >
                  {hero.secondaryCtaLabel}
                </Link>
              </div>
              <p className="text-sm text-[#252140]/50 flex items-center gap-3 font-medium">
                7-day free trial <span className="w-1.5 h-1.5 rounded-full bg-[#252140]/40"></span> No credit card{" "}
                <span className="w-1.5 h-1.5 rounded-full bg-[#252140]/40"></span> Cancel anytime
              </p>
            </div>

            <div className="relative">
              <div className="bg-[#FFFFFF] rounded-3xl border border-[#252140]/10 p-6 shadow-2xl shadow-slate-900/10 relative z-10 transform translate-x-4 rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                <div className="flex items-center justify-between mb-6 border-b border-[#252140]/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="text-[11px] font-semibold text-[#252140]/50 tracking-widest uppercase">app.leadsrubix.com</div>
                  <div className="w-8" />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Today's Leads", value: "47", trend: "+12%", positive: true },
                    { label: "Avg Response", value: "2m 14s", trend: "−38%", positive: true },
                    { label: "Site Visits", value: "12", trend: "+5", positive: true },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-[#F1F1F9] p-3.5 rounded-xl border border-[#252140]/5">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-[#252140]/50 mb-1.5">{kpi.label}</div>
                      <div className="font-['Fraunces'] text-2xl text-[#252140] leading-none mb-1.5">{kpi.value}</div>
                      <div className="text-[11px] font-semibold text-emerald-600">{kpi.trend}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F1F1F9] rounded-xl border border-[#252140]/5 p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#252140]/60">This Week's Funnel</span>
                    <span className="text-[10px] text-[#252140]/40 font-medium">Updated 2m ago</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { stage: "FRESH", count: 184, width: "100%" },
                      { stage: "CALLBACK", count: 96, width: "62%" },
                      { stage: "INTERESTED", count: 41, width: "32%" },
                      { stage: "BOOKED", count: 14, width: "12%" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="text-[10px] font-bold tracking-widest text-[#252140]/60 w-20">{s.stage}</div>
                        <div className="flex-1 h-2 bg-[#252140]/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#252140] rounded-full transition-all" style={{ width: s.width }} />
                        </div>
                        <div className="text-xs font-semibold text-[#252140] w-8 text-right tabular-nums">{s.count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F1F1F9] p-4 rounded-xl border border-[#252140]/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#252140]/5 flex items-center justify-center shrink-0">
                      <Facebook className="w-4 h-4 text-[#252140]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] text-[#252140]/50 font-medium uppercase tracking-wide">New lead · Facebook Lead Ads</div>
                      <div className="text-sm font-semibold text-[#252140] truncate">Routed via round-robin</div>
                    </div>
                  </div>
                  <div className="bg-[#252140] text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider shrink-0">JUST NOW</div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#252140]/10 to-transparent rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </section>

        {/* Built-for pill strip */}
        <section className="border-y border-[#252140]/10 bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-[#252140]/60 mb-8">
              Built For Sales Teams Across
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { icon: Building2, text: "Real Estate" },
                { icon: HomeIcon, text: "Education" },
                { icon: Briefcase, text: "Financial Services" },
                { icon: Network, text: "Healthcare" },
                { icon: Users, text: "Automotive · Travel · SaaS · Manufacturing" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-[#252140]/80 font-medium bg-slate-50/50 px-5 py-2.5 rounded-full border border-[#252140]/10 shadow-sm"
                >
                  <item.icon className="w-4 h-4 text-[#252140]" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-[#252140] text-[#F1F1F9] py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
            {[
              { label: "Lead Fields Tracked", value: "50+" },
              { label: "Distinct Org Roles", value: "6" },
              { label: "Capture Latency", value: "<1s" },
              { label: "Automated Capture", value: "24/7" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="font-['Fraunces'] text-5xl md:text-6xl text-[#FFFFFF] mb-3 group-hover:scale-105 transition-transform duration-300 font-light italic">
                  {stat.value}
                </div>
                <div className="text-sm tracking-widest uppercase opacity-80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The problem */}
        <section className="py-32 bg-[#F1F1F9] border-b border-[#252140]/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-6 font-medium text-[#252140]">
                Why legacy CRMs fail Indian sales teams.
              </h2>
              <p className="text-lg text-[#252140]/70 font-medium">
                Generic tools weren't built for the scale of WhatsApp-led conversations, regional languages, partner networks, and the sheer speed Indian buyers expect.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Database,
                  title: "Data Chaos",
                  desc: "Leads scattered across Excel sheets, WhatsApp chats, and notebooks. No single source of truth for a buyer's journey.",
                },
                {
                  icon: UserX,
                  title: "Zero Accountability",
                  desc: "Agents cherry-pick leads. No visibility into who called whom, when, and what was discussed.",
                },
                {
                  icon: Clock,
                  title: "Slow Response Times",
                  desc: "Hot leads from your top channels sit untouched for hours while competitors call them in minutes — and win.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FFFFFF] p-10 border border-[#252140]/10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#F1F1F9] rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-[#252140]/10 group-hover:bg-[#252140] transition-colors duration-300">
                    <item.icon className="w-7 h-7 text-[#252140] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-['Fraunces']">{item.title}</h3>
                  <p className="text-[#252140]/70 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline visualization */}
        <section className="py-24 bg-white border-y border-[#252140]/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-['Fraunces'] text-4xl mb-4 font-medium text-[#252140]">
                A pipeline built for how your industry sells
              </h2>
              <p className="text-[#252140]/70 font-medium">Configurable stages that map to your real workflow — site visits, demos, counselling, KYC or RFQs.</p>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-3 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#252140]/20 -translate-y-1/2 z-0" />

              {[
                { name: "FRESH", color: "bg-white text-[#252140] border-[#252140]/15" },
                { name: "CALLBACK", color: "bg-[#E8EAF5] text-[#252140] border-[#252140]/25" },
                { name: "INTERESTED", color: "bg-[#B8B8D4] text-[#252140] border-[#252140]/40" },
                { name: "BOOKED", color: "bg-[#252140] text-white border-[#252140] shadow-lg shadow-[#252140]/30" },
                { name: "LOST", color: "bg-white text-[#252140]/40 border-[#252140]/10 line-through decoration-[#252140]/20" },
              ].map((stage, i) => (
                <div key={i} className="relative z-10 flex-1 group">
                  <div
                    className={`border p-5 rounded-2xl shadow-sm group-hover:-translate-y-1 transition-transform duration-300 ${stage.color}`}
                  >
                    <div className="text-xs font-bold tracking-widest mb-3">{stage.name}</div>
                    <div className="text-3xl font-['Fraunces'] opacity-90 italic">{PIPELINE_COUNTS[i]}</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-70 mt-1 font-semibold">Leads</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-32 bg-[#F1F1F9] border-y border-[#252140]/5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-center mb-24 font-medium text-[#252140]">
              Everything you need to close more deals.
            </h2>

            <div className="grid md:grid-cols-3 gap-x-12 gap-y-20">
              {[
                { icon: RefreshCw, title: "Automated Lead Rotation", desc: "Distribute incoming leads instantly based on rules, availability, and performance." },
                { icon: PhoneCall, title: "Call Log Tracking", desc: "Native integration with telephony providers to log every call duration and recording." },
                { icon: BarChart3, title: "Real-time Analytics", desc: "Dashboards for source ROI, team productivity, conversion rates and revenue attribution — configurable to your industry." },
                { icon: CreditCard, title: "Bookings & Payments", desc: "Generate payment links and track token amounts directly within the deal record." },
                { icon: Shield, title: "Role-Based Access", desc: "Granular permissions ensuring agents only see their leads, while admins see everything." },
                { icon: Search, title: "Multi-Source Capture", desc: "Ingest leads from Meta, Google, your website, vertical aggregators (99acres, Practo, Shiksha, IndiaMART) and any custom webhook." },
                { icon: CheckSquare, title: "Task Management", desc: "Automated follow-up reminders so a hot lead never slips through the cracks." },
                { icon: Globe, title: "Multi-Org Support", desc: "Manage multiple business units, branches, or partner networks from a single master dashboard." },
                { icon: MapPin, title: "GPS Call Tracking", desc: "Verify agent locations during site visits or outdoor meetings for better accountability." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="flex-shrink-0 mt-1 w-12 h-12 bg-[#FFFFFF] rounded-xl flex items-center justify-center border border-[#252140]/10 shadow-sm group-hover:bg-[#252140] group-hover:border-[#252140] transition-all duration-300">
                    <item.icon className="w-6 h-6 text-[#252140] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2.5 text-lg font-['Fraunces'] tracking-wide">{item.title}</h3>
                    <p className="text-[#252140]/70 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-[#252140]/20" />

        {/* Lead Rotation Deep Dive */}
        <section className="py-32 bg-[#252140] text-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-widest uppercase text-white/90 mb-6">
                Core Technology
              </div>
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-8 font-medium">Never let a lead go cold again.</h2>
              <p className="text-[#FFFFFF]/70 text-lg mb-12 font-medium leading-relaxed">
                Our proprietary lead rotation engine ensures every inquiry gets a response within minutes, automatically reassigning leads if an agent is unavailable.
              </p>

              <div className="space-y-10">
                {[
                  { step: "01", title: "Lead Arrives", desc: "Captured instantly from any source via API or Webhook." },
                  { step: "02", title: "Response Window", desc: "Agent has 15 minutes (customizable) to action the lead." },
                  { step: "03", title: "Auto-Reassignment", desc: "If untouched, the lead rotates to the next available agent." },
                  { step: "04", title: "Schedule Aware", desc: "Rotation rules respect agent working hours and leaves." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-[#252140] font-['Fraunces'] text-3xl italic group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1.5 tracking-wide text-[#F1F1F9]">{item.title}</h4>
                      <p className="text-[#FFFFFF]/50 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F1F1F9]/5 rounded-3xl border border-[#F1F1F9]/10 p-8 shadow-2xl backdrop-blur-sm">
              <div className="space-y-5">
                <div className="bg-[#F1F1F9]/10 p-5 rounded-2xl border border-[#F1F1F9]/20 flex justify-between items-center shadow-inner">
                  <div>
                    <div className="text-sm font-semibold mb-1 text-[#F1F1F9]">Incoming: Facebook Ads</div>
                    <div className="text-xs text-[#F1F1F9]/60 font-medium">Project: Horizon Towers</div>
                  </div>
                  <div className="text-xs bg-white text-[#252140] px-3 py-1.5 rounded-full font-semibold shadow-sm">Just Now</div>
                </div>
                <div className="flex justify-center my-3">
                  <ArrowRight className="w-6 h-6 text-[#252140] rotate-90 opacity-80" />
                </div>
                <div className="bg-[#FFFFFF] text-[#252140] p-5 rounded-2xl border border-[#FFFFFF]/20 flex items-center gap-4 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F1F9] flex items-center justify-center text-[#252140] border border-[#252140]/20 shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-wide">Routed to next available agent</div>
                    <div className="text-xs text-[#252140]/60 font-medium mt-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> 15:00 response window started
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Six roles */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-6 font-medium text-[#252140]">
                Built for the entire organization
              </h2>
              <p className="text-[#252140]/70 font-medium text-lg">Specific views and permissions for every role in your company.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Super Admin",
                "Organization Admin",
                "Operation Manager",
                "Team Lead",
                "Lead Manager",
                "Sales Agent",
              ].map((role, i) => (
                <div
                  key={i}
                  className="bg-[#F1F1F9] p-8 border border-[#252140]/10 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] flex items-center justify-center mb-6 shadow-sm border border-[#252140]/5 group-hover:bg-[#252140] transition-colors duration-300">
                    <Shield className="w-6 h-6 text-[#252140] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold mb-3 text-xl font-['Fraunces']">{role}</h3>
                  <p className="text-sm text-[#252140]/60 font-medium leading-relaxed">
                    Customized dashboard and permission set designed specifically for this function.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations strip */}
        <section className="py-20 border-y border-[#252140]/10 bg-[#E8EAF5] overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#252140]">Integrates with your stack</p>
          </div>
          <div className="flex gap-16 items-center justify-center flex-wrap max-w-6xl mx-auto text-[#252140]/60">
            <div className="flex items-center gap-3 font-semibold text-lg hover:text-[#252140] transition-colors"><Facebook className="w-7 h-7" /> Facebook</div>
            <div className="flex items-center gap-3 font-semibold text-lg hover:text-[#252140] transition-colors"><Instagram className="w-7 h-7" /> Instagram</div>
            <div className="flex items-center gap-3 font-semibold text-lg hover:text-[#252140] transition-colors"><MessageCircle className="w-7 h-7" /> WhatsApp</div>
            <div className="flex items-center gap-3 font-semibold text-lg hover:text-[#252140] transition-colors"><CreditCard className="w-7 h-7" /> Razorpay</div>
            <div className="flex items-center gap-3 font-semibold text-lg hover:text-[#252140] transition-colors"><Mail className="w-7 h-7" /> SMTP</div>
            <div className="flex items-center gap-3 font-semibold text-lg hover:text-[#252140] transition-colors"><MessageSquare className="w-7 h-7" /> SMS</div>
            <div className="flex items-center gap-3 font-semibold text-lg hover:text-[#252140] transition-colors"><Database className="w-7 h-7" /> REST API</div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-center mb-20 font-medium text-[#252140]">
              Trusted by leading sales teams across India
            </h2>

            <div
              className="grid md:grid-cols-3 gap-10"
              {...(usingCmsTestimonials ? { "data-testid": "testimonials-cms" } : {})}
            >
              {testimonials.slice(0, 3).map((t, i) => {
                const roleLine = t.company ? `${t.role}, ${t.company}` : t.role;
                return (
                  <div
                    key={i}
                    className="bg-[#F1F1F9] p-10 rounded-3xl border border-[#252140]/10 shadow-sm relative group hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="text-[#252140] font-['Fraunces'] text-7xl absolute top-4 left-6 opacity-20 italic">"</div>
                    <p className="relative z-10 text-lg leading-relaxed mb-8 italic font-medium font-['Fraunces'] text-[#252140]/80">
                      "{t.body}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#E4E4EF] border border-[#252140]/20 flex items-center justify-center font-['Fraunces'] font-bold text-[#252140]">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold tracking-wide text-[#252140]">{t.name}</div>
                        <div className="text-sm text-[#252140]/60 font-medium">{roleLine}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-32 bg-[#F1F1F9] border-y border-[#252140]/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-6 font-medium text-[#252140]">Transparent Pricing</h2>
              <p className="text-[#252140]/70 text-lg font-medium">No hidden fees. Scale as you grow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              <div className="bg-[#FFFFFF] p-10 rounded-3xl border border-[#252140]/10 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-2xl mb-2 font-['Fraunces']">Starter</h3>
                <p className="text-[#252140]/60 text-sm mb-8 font-medium">For small teams getting started</p>
                <div className="mb-10">
                  <span className="text-4xl font-['Fraunces'] italic font-medium">₹999</span>
                  <span className="text-[#252140]/50 text-sm font-medium">/user/mo</span>
                </div>
                <ul className="space-y-5 mb-10 text-sm font-medium text-[#252140]/80">
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-[#252140] shrink-0" /> Up to 5 users</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-[#252140] shrink-0" /> Basic Lead Management</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-[#252140] shrink-0" /> Standard Reports</li>
                </ul>
                <a
                  href="https://app.leadsrubix.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-2xl border-2 border-[#252140]/50 text-[#252140] font-bold hover:bg-[#252140] hover:text-[#FFFFFF] transition-colors text-center"
                >
                  Start Trial
                </a>
              </div>

              <div className="bg-gradient-to-br from-[#252140] to-[#16142B] text-white p-10 rounded-3xl border border-[#252140] relative transform md:-translate-y-4 shadow-2xl shadow-[#252140]/30">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#252140] text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-md">
                  Most Popular
                </div>
                <h3 className="font-bold text-2xl mb-2 font-['Fraunces'] text-white">Growth</h3>
                <p className="text-white/60 text-sm mb-8 font-medium">For growing sales teams</p>
                <div className="mb-10">
                  <span className="text-4xl font-['Fraunces'] text-white italic font-medium">₹1,499</span>
                  <span className="text-white/50 text-sm font-medium">/user/mo</span>
                </div>
                <ul className="space-y-5 mb-10 text-sm font-medium text-white/85">
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-white shrink-0" /> Unlimited users</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-white shrink-0" /> Auto Lead Rotation</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-white shrink-0" /> Call Tracking Integration</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-white shrink-0" /> WhatsApp API</li>
                </ul>
                <a
                  href="https://app.leadsrubix.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-2xl bg-white text-[#252140] font-bold hover:bg-[#F1F1F9] shadow-lg transition-colors text-center"
                >
                  Start Free Trial
                </a>
              </div>

              <div className="bg-[#FFFFFF] p-10 rounded-3xl border border-[#252140]/10 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-2xl mb-2 font-['Fraunces']">Enterprise</h3>
                <p className="text-[#252140]/60 text-sm mb-8 font-medium">For massive scale</p>
                <div className="mb-10">
                  <span className="text-4xl font-['Fraunces'] italic font-medium">Custom</span>
                </div>
                <ul className="space-y-5 mb-10 text-sm font-medium text-[#252140]/80">
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-[#252140] shrink-0" /> Dedicated Account Manager</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-[#252140] shrink-0" /> Custom Integrations</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-[#252140] shrink-0" /> White-labelling</li>
                  <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-[#252140] shrink-0" /> On-premise deployment</li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full py-4 rounded-2xl border-2 border-[#252140]/50 text-[#252140] font-bold hover:bg-[#252140] hover:text-[#FFFFFF] transition-colors text-center"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-center mb-16 font-medium text-[#252140]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4" data-testid="home-faq-list">
              {homeFaqs.map((faq, i) => (
                <div key={i} className="border border-[#252140]/10 bg-[#F1F1F9] rounded-2xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    className="w-full text-left px-8 py-6 font-semibold flex justify-between items-center hover:bg-[#E4E4EF]/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-[15px]">{faq.question}</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === i ? "bg-[#252140] text-[#FFFFFF]" : "bg-[#FFFFFF] text-[#252140] border border-[#252140]/20"}`}
                    >
                      {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-6 text-[#252140]/70 text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-[#252140] text-[#FFFFFF] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl mb-6 font-medium italic">Ready to close more deals?</h2>
            <p className="text-xl md:text-2xl text-[#FFFFFF]/80 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              Join leading Indian sales teams across industries managing their pipeline on Leads Rubix.
            </p>
            <a
              href="https://app.leadsrubix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#252140] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#F1F1F9] shadow-xl shadow-black/30 hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Free Trial
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
