import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Building2, GraduationCap, Stethoscope, Banknote, Server, Factory, Car, Plane, Briefcase, TrendingUp, Clock, Users } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
import { buildCaseStudySlugs } from "@/lib/slug";

function iconForTag(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes("educat")) return GraduationCap;
  if (t.includes("health") || t.includes("clinic") || t.includes("hospital")) return Stethoscope;
  if (t.includes("bfsi") || t.includes("financ") || t.includes("nbfc") || t.includes("bank") || t.includes("insur")) return Banknote;
  if (t.includes("saas") || t.includes("software")) return Server;
  if (t.includes("manufactur") || t.includes("industrial")) return Factory;
  if (t.includes("auto")) return Car;
  if (t.includes("travel") || t.includes("tourism")) return Plane;
  if (t.includes("real estate") || t.includes("property") || t.includes("brokerage") || t.includes("developer")) return Building2;
  return Briefcase;
}

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
}

export default function CaseStudies() {
  const cms = useContent<CaseStudyItem[]>("case_studies", []);
  useSEO({
    title: "Case Studies — Leads Rubix | Sales teams winning across industries",
    description:
      "How Indian sales teams across real estate, education, healthcare, BFSI, SaaS, automotive and manufacturing use Leads Rubix to capture leads instantly, route them automatically and close more revenue.",
    canonical: "https://leadsrubix.com/case-studies",
  });

  const stories = [
    {
      icon: Building2,
      tag: "Real estate · multi-branch brokerage",
      headline: "Cutting first-touch time from hours to under 60 seconds",
      summary:
        "A residential brokerage with branches in Mumbai and Pune was losing Facebook leads because they were downloaded as a CSV every morning. Auto-rotation now pings the next available agent within seconds of submission.",
      metrics: [
        { icon: Clock, label: "First-touch time", value: "−93%" },
        { icon: TrendingUp, label: "Lead-to-meeting rate", value: "+38%" },
        { icon: Users, label: "Agents managed", value: "42" },
      ],
    },
    {
      icon: GraduationCap,
      tag: "Education · Tier-1 management institute",
      headline: "From 720 to 2,140 applications in a single intake",
      summary:
        "A Pune-based management institute was losing 40% of admissions enquiries between form-fill and first counsellor call. Cadence automation and program-wise routing tripled application volume — without adding counsellors.",
      metrics: [
        { icon: TrendingUp, label: "Enquiry-to-application", value: "+142%" },
        { icon: Clock, label: "Counsellor response time", value: "8 min" },
        { icon: Users, label: "Counsellors enabled", value: "8" },
      ],
    },
    {
      icon: Stethoscope,
      tag: "Healthcare · multi-specialty clinic chain",
      headline: "No-shows cut in half, IVF conversions doubled",
      summary:
        "A 12-centre clinic chain had patient enquiries scattered across phone, WhatsApp and Practo. Procedure-specific nurture journeys and automated reminders cut no-show rate from 22% to 10% and doubled IVF package conversions.",
      metrics: [
        { icon: TrendingUp, label: "Package conversion", value: "+111%" },
        { icon: Clock, label: "No-show rate", value: "−55%" },
        { icon: Users, label: "Centres unified", value: "12" },
      ],
    },
    {
      icon: Banknote,
      tag: "BFSI · mid-sized NBFC",
      headline: "100% audit-trail coverage, 23% cross-sell attach",
      summary:
        "A ₹2,000 Cr-book NBFC closed every regulator-flagged audit gap with immutable advisor logs. Native Aadhaar e-KYC and bureau pulls cut KYC turnaround by a third, and product-graph cross-sell turned 4% attach into 23%.",
      metrics: [
        { icon: TrendingUp, label: "Audit coverage", value: "100%" },
        { icon: Clock, label: "KYC turnaround", value: "−33%" },
        { icon: Users, label: "Advisor productivity", value: "+79%" },
      ],
    },
    {
      icon: Server,
      tag: "SaaS · Series-B B2B SaaS",
      headline: "Forecast accuracy from ±32% to ±9% in one quarter",
      summary:
        "A $14M ARR SaaS replaced HubSpot Sales Hub plus a tangle of Notion docs. Stakeholder maps, per-stage confidence scoring and a proactive renewal motion took inbound-to-demo from 31% to 58% and net renewal to 92%.",
      metrics: [
        { icon: TrendingUp, label: "Inbound demos held", value: "+87%" },
        { icon: Clock, label: "Avg deal velocity", value: "−37%" },
        { icon: Users, label: "Net renewal rate", value: "92%" },
      ],
    },
    {
      icon: Factory,
      tag: "Manufacturing · industrial fasteners",
      headline: "Lost zero deals on rep attrition; RFQ-to-quote 2.2×",
      summary:
        "A ₹450 Cr fasteners manufacturer lost three field reps in 2024 and with them, years of context. Now every RFQ, plant visit and conversation lives in the system — RFQ-to-quote rate doubled and 100% of pipeline survived team changes.",
      metrics: [
        { icon: TrendingUp, label: "RFQ-to-quote rate", value: "+118%" },
        { icon: Clock, label: "Sample dispatch cycle", value: "−44%" },
        { icon: Users, label: "Pipeline retained", value: "100%" },
      ],
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Customer outcomes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Sales teams winning with Leads Rubix</h1>
          <p className="text-xl text-muted-foreground">Representative outcomes from real estate, education, healthcare, BFSI, SaaS, automotive and manufacturing teams who switched from spreadsheets and generic CRMs to Leads Rubix.</p>
          <p className="text-xs text-muted-foreground mt-4">Customer names are anonymised by request. Detailed named case studies are published with permission.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          {(() => {
            const cmsSlugs = buildCaseStudySlugs(cms.map((s) => s.tag));
            const fallbackSlugs = buildCaseStudySlugs(stories.map((s) => s.tag));
            return cms.length > 0
            ? cms.map((s, i) => {
                const TagIcon = iconForTag(s.tag);
                const slug = cmsSlugs[i]!;
                return (
                <Card key={i} className="border-border overflow-hidden hover:shadow-md transition-shadow" data-testid={`case-cms-${i}`}>
                  <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TagIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-xs font-bold tracking-wider uppercase text-primary">{s.tag}</span>
                      </div>
                      <Link href={`/case-studies/${slug}`} className="hover:underline" data-testid={`link-case-${slug}`}>
                        <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
                      </Link>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap line-clamp-4">{s.body}</p>
                      <Link href={`/case-studies/${slug}`} className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:underline" data-testid={`link-case-read-${slug}`}>
                        Read full story <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                    <div className="md:w-1/3 grid grid-cols-3 md:grid-cols-1 gap-4 md:border-l md:border-border md:pl-8">
                      {[s.metric1, s.metric2, s.metric3]
                        .filter((m): m is CaseStudyMetric => Boolean(m && m.value))
                        .map((m, j) => (
                          <div key={j} className="text-center md:text-left">
                            <div className="text-2xl font-extrabold text-primary mb-1">{m.value}</div>
                            <div className="text-xs text-muted-foreground leading-tight">{m.label}</div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                );
              })
            : stories.map((s, i) => {
              const slug = fallbackSlugs[i]!;
              return (
            <Card key={s.headline} className="border-border overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-primary">{s.tag}</span>
                  </div>
                  <Link href={`/case-studies/${slug}`} className="hover:underline" data-testid={`link-case-${slug}`}>
                    <h2 className="text-2xl font-bold mb-3">{s.headline}</h2>
                  </Link>
                  <p className="text-muted-foreground leading-relaxed">{s.summary}</p>
                  <Link href={`/case-studies/${slug}`} className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:underline" data-testid={`link-case-read-${slug}`}>
                    Read full story <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="md:w-1/3 grid grid-cols-3 md:grid-cols-1 gap-4 md:border-l md:border-border md:pl-8">
                  {s.metrics.map((m) => (
                    <div key={m.label} className="text-center md:text-left">
                      <div className="text-2xl font-extrabold text-primary mb-1">{m.value}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
              );
            });
          })()}
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t text-center" data-testid="case-cta">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Want a story like this for your team?</h2>
          <p className="text-lg text-muted-foreground mb-8">Book a demo and we'll show you how teams in your segment use Leads Rubix.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="btn-cases-demo">
              <Link href="/demo">Book a Demo <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="btn-cases-trial">
              <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">Start Free Trial</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
