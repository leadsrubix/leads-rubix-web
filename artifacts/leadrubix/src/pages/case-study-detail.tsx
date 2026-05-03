import { Link, useRoute, Redirect } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
import { buildCaseStudySlugs } from "@/lib/slug";

interface CaseStudyMetric {
  value: string;
  label: string;
}

interface CaseStudyItem {
  tag: string;
  title: string;
  body: string;
  metric1?: CaseStudyMetric;
  metric2?: CaseStudyMetric;
  metric3?: CaseStudyMetric;
  quote?: string;
  quoteAttribution?: string;
  before?: string;
  after?: string;
}

const FALLBACK_STORIES: CaseStudyItem[] = [
  {
    tag: "Real estate · multi-branch brokerage",
    title: "Cutting first-touch time from hours to under 60 seconds",
    body:
      "A residential brokerage with branches in Mumbai and Pune was losing Facebook leads because they were downloaded as a CSV every morning. Auto-rotation now pings the next available agent within seconds of submission.\n\nLeads Rubix replaced their morning-CSV ritual with real-time webhook intake, weighted round-robin across 42 agents, and SLA timers that escalate to a manager if first-touch slips past 5 minutes.",
    metric1: { value: "−93%", label: "First-touch time" },
    metric2: { value: "+38%", label: "Lead-to-meeting rate" },
    metric3: { value: "42", label: "Agents managed" },
    quote: "We used to lose deals to whoever called first. Now we are whoever called first.",
    quoteAttribution: "Sales Director, Mumbai brokerage",
    before: "Daily CSV downloads from Facebook Lead Ads. Agents picking leads manually. No SLA enforcement.",
    after: "Real-time intake. Weighted round-robin by branch + price band. Manager-level SLA escalations. Daily pipeline review on a single screen.",
  },
  {
    tag: "Education · Tier-1 management institute",
    title: "From 720 to 2,140 applications in a single intake",
    body:
      "A Pune-based management institute was losing 40% of admissions enquiries between form-fill and first counsellor call. Cadence automation and program-wise routing tripled application volume — without adding counsellors.",
    metric1: { value: "+142%", label: "Enquiry-to-application" },
    metric2: { value: "8 min", label: "Counsellor response time" },
    metric3: { value: "8", label: "Counsellors enabled" },
    quote: "We tripled application volume without hiring a single counsellor. The cadence does the heavy lifting.",
    quoteAttribution: "Director of Admissions",
    before: "Mixed Excel + WhatsApp + Google Form. No nurture cadence. Counsellors spent 60% of their day chasing dead enquiries.",
    after: "Program-wise routing, 14-day automated nurture cadence, hot-lead dashboard, and counsellor productivity scorecard.",
  },
  {
    tag: "Healthcare · multi-specialty clinic chain",
    title: "No-shows cut in half, IVF conversions doubled",
    body:
      "A 12-centre clinic chain had patient enquiries scattered across phone, WhatsApp and Practo. Procedure-specific nurture journeys and automated reminders cut no-show rate from 22% to 10% and doubled IVF package conversions.",
    metric1: { value: "+111%", label: "Package conversion" },
    metric2: { value: "−55%", label: "No-show rate" },
    metric3: { value: "12", label: "Centres unified" },
    quote: "Our IVF counsellors now spend their time counselling, not chasing missed appointments.",
    quoteAttribution: "Operations Head, clinic chain",
    before: "Patient enquiries siloed by channel. No procedure-level reporting. No-show rate at 22%.",
    after: "Unified inbox across phone, WhatsApp and Practo. Procedure-specific cadences with automated reminders. Real-time centre-level KPIs.",
  },
  {
    tag: "BFSI · mid-sized NBFC",
    title: "100% audit-trail coverage, 23% cross-sell attach",
    body:
      "A ₹2,000 Cr-book NBFC closed every regulator-flagged audit gap with immutable advisor logs. Native Aadhaar e-KYC and bureau pulls cut KYC turnaround by a third, and product-graph cross-sell turned 4% attach into 23%.",
    metric1: { value: "100%", label: "Audit coverage" },
    metric2: { value: "−33%", label: "KYC turnaround" },
    metric3: { value: "+79%", label: "Advisor productivity" },
    quote: "We went from 'show me the audit trail' panic to walking the regulator through it ourselves.",
    quoteAttribution: "Compliance Head, NBFC",
    before: "Spreadsheet-based advisor logs. KYC took 3-5 days. Cross-sell at 4% attach.",
    after: "Immutable advisor activity log. Native Aadhaar e-KYC + bureau pulls. Product-graph driven next-best-offer.",
  },
  {
    tag: "SaaS · Series-B B2B SaaS",
    title: "Forecast accuracy from ±32% to ±9% in one quarter",
    body:
      "A $14M ARR SaaS replaced HubSpot Sales Hub plus a tangle of Notion docs. Stakeholder maps, per-stage confidence scoring and a proactive renewal motion took inbound-to-demo from 31% to 58% and net renewal to 92%.",
    metric1: { value: "+87%", label: "Inbound demos held" },
    metric2: { value: "−37%", label: "Avg deal velocity" },
    metric3: { value: "92%", label: "Net renewal rate" },
    quote: "The board finally trusts the forecast.",
    quoteAttribution: "VP Sales, B2B SaaS",
    before: "HubSpot Sales Hub + Notion stakeholder docs. ±32% forecast accuracy. Renewal as a fire drill.",
    after: "Stakeholder map per opp, per-stage confidence scoring, automated renewal motion 90 days before contract end.",
  },
  {
    tag: "Manufacturing · industrial fasteners",
    title: "Lost zero deals on rep attrition; RFQ-to-quote 2.2×",
    body:
      "A ₹450 Cr fasteners manufacturer lost three field reps in 2024 and with them, years of context. Now every RFQ, plant visit and conversation lives in the system — RFQ-to-quote rate doubled and 100% of pipeline survived team changes.",
    metric1: { value: "+118%", label: "RFQ-to-quote rate" },
    metric2: { value: "−44%", label: "Sample dispatch cycle" },
    metric3: { value: "100%", label: "Pipeline retained" },
    quote: "When the rep left, we kept the customer. That's the whole game.",
    quoteAttribution: "GM Sales, fasteners manufacturer",
    before: "Field reps owned customer context in their heads. RFQ-to-quote ratio at ~25%. Sample dispatch took weeks.",
    after: "Plant-visit logs, RFQ pipeline with stage SLAs, automated sample-dispatch workflow with QC sign-off.",
  },
];

function loadAll(cms: CaseStudyItem[]): CaseStudyItem[] {
  return cms.length > 0 ? cms : FALLBACK_STORIES;
}

export default function CaseStudyDetail() {
  const [, params] = useRoute<{ slug: string }>("/case-studies/:slug");
  const slug = params?.slug ?? "";
  const cms = useContent<CaseStudyItem[]>("case_studies", []);
  const items = loadAll(cms);
  const slugs = buildCaseStudySlugs(items.map((it) => it.tag));
  const idx = slugs.indexOf(slug);
  const item = idx >= 0 ? items[idx] : undefined;

  useSEO({
    title: item ? `${item.title} — Leads Rubix Case Study` : "Case Study — Leads Rubix",
    description: item?.body?.split("\n")[0] ?? "",
    canonical: `https://leadsrubix.com/case-studies/${slug}`,
    jsonLd: item
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://leadsrubix.com/" },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://leadsrubix.com/case-studies" },
            { "@type": "ListItem", position: 3, name: item.title, item: `https://leadsrubix.com/case-studies/${slug}` },
          ],
        }
      : undefined,
  });

  if (!item) return <Redirect to="/case-studies" />;

  const metrics = [item.metric1, item.metric2, item.metric3].filter(
    (m): m is CaseStudyMetric => Boolean(m && m.value),
  );

  return (
    <Layout>
      <section className="py-16 md:py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/case-studies" className="hover:text-[#252140]" data-testid="link-back-cases">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-[#252140] font-medium">{item.tag.split("·")[0]?.trim()}</span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4">
            {item.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="text-case-title">{item.title}</h1>
        </div>
      </section>

      {metrics.length > 0 ? (
        <section className="py-10 border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((m, i) => (
                <Card key={i} className="border-2 border-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-extrabold text-primary mb-1">{m.value}</div>
                    <div className="text-sm text-muted-foreground">{m.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
            {item.body}
          </div>

          {item.before || item.after ? (
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {item.before ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">Before</div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{item.before}</p>
                  </CardContent>
                </Card>
              ) : null}
              {item.after ? (
                <Card className="border-primary/30 bg-primary/[0.03]">
                  <CardContent className="p-6">
                    <div className="text-xs uppercase tracking-wider text-primary font-bold mb-2">After</div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{item.after}</p>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          ) : null}

          {item.quote ? (
            <blockquote className="mt-12 border-l-4 border-primary pl-6 py-2">
              <Quote className="h-6 w-6 text-primary/50 mb-2" />
              <p className="text-xl md:text-2xl font-medium italic leading-relaxed">"{item.quote}"</p>
              {item.quoteAttribution ? (
                <footer className="text-sm text-muted-foreground mt-3">— {item.quoteAttribution}</footer>
              ) : null}
            </blockquote>
          ) : null}
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want a story like this for your team?</h2>
          <p className="text-muted-foreground mb-8">Book a 30-minute demo with our India team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="btn-case-detail-demo">
              <Link href="/demo">Book a Demo <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="btn-case-detail-back">
              <Link href="/case-studies"><ArrowLeft className="mr-2 h-5 w-5" /> All case studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
