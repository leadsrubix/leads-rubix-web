import { Link, useRoute, Redirect } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Quote,
  Plug,
  Users,
  Radio,
  X,
  Minus,
  Calendar,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
import { InlineLeadForm } from "@/components/marketing/InlineLeadForm";
import {
  DEFAULT_INDUSTRIES,
  getIndustryIcon,
  type IndustriesContent,
} from "@/lib/industryIcons";

export default function IndustryDetail() {
  const [, params] = useRoute<{ slug: string }>("/industries/:slug");
  const slug = params?.slug ?? "";
  const data = useContent<IndustriesContent>("industries", DEFAULT_INDUSTRIES);
  const items = data.items ?? [];
  const item = items.find((i) => i.slug === slug);
  const others = items.filter((i) => i.slug !== slug).slice(0, 4);

  useSEO({
    title: item
      ? `${item.name} CRM — Leads Rubix | ${item.tagline}`
      : "Industry — Leads Rubix CRM",
    description: item?.description ?? "",
    canonical: `https://leadsrubix.com/industries/${slug}`,
    jsonLd: item
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://leadsrubix.com/" },
              { "@type": "ListItem", position: 2, name: "Industries", item: "https://leadsrubix.com/industries" },
              { "@type": "ListItem", position: 3, name: item.name, item: `https://leadsrubix.com/industries/${slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: `${item.name} CRM`,
            provider: { "@type": "Organization", name: "Leads Rubix", url: "https://leadsrubix.com" },
            areaServed: { "@type": "Country", name: "India" },
            description: item.description,
            url: `https://leadsrubix.com/industries/${slug}`,
          },
          ...(item.faq && item.faq.length > 0
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: item.faq.slice(0, 20).map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
                },
              ]
            : []),
        ]
      : undefined,
  });

  if (!item) {
    if (items.length === 0) {
      return (
        <Layout>
          <section className="py-32 text-center">
            <p className="text-muted-foreground">Loading industries…</p>
          </section>
        </Layout>
      );
    }
    return <Redirect to="/industries" />;
  }

  const Icon = getIndustryIcon(item.icon);
  const ctaLabel = item.ctaLabel?.trim() || "Book a Demo";
  const ctaHref = item.ctaHref?.trim() || "/demo";
  const ctaIsExternal = /^https?:\/\//i.test(ctaHref);
  const industryDemoHref =
    !ctaIsExternal && (ctaHref === "/demo" || ctaHref.startsWith("/demo"))
      ? `/demo?industry=${encodeURIComponent(slug)}`
      : ctaHref;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/industries" className="hover:text-[#252140]" data-testid="link-back-industries">
              Industries
            </Link>
            <span>/</span>
            <span className="text-[#252140] font-medium">{item.name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-[#252140] text-white flex items-center justify-center shrink-0">
                  <Icon size={32} />
                </div>
                <span className="inline-block bg-[#252140]/5 text-[#252140] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-[#252140] leading-[1.1]">
                {item.tagline}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>
              {item.longDescription ? (
                <p className="text-base text-foreground/80 mb-8 leading-relaxed">
                  {item.longDescription}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" data-testid="btn-industry-cta">
                  {ctaIsExternal ? (
                    <a href={industryDemoHref} target="_blank" rel="noopener noreferrer">
                      {ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  ) : (
                    <Link href={industryDemoHref}>
                      {ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  )}
                </Button>
                <Button asChild size="lg" variant="outline" data-testid="btn-industry-pricing">
                  <Link href="/pricing">See Pricing</Link>
                </Button>
              </div>
            </div>
            {item.heroStat ? (
              <div className="lg:col-span-4">
                <Card className="border-2 border-[#252140]/15 bg-white shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                      Headline result
                    </div>
                    <div className="text-6xl font-extrabold text-[#252140] tabular-nums leading-none">
                      {item.heroStat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-3">
                      {item.heroStat.label}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* KPIs */}
      {item.kpis?.length ? (
        <section className="py-12 md:py-16 bg-white border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {item.kpis.map((k, i) => (
                <Card key={i} className="text-center border-[#252140]/10">
                  <CardContent className="p-8">
                    <div className="text-5xl font-extrabold text-[#252140] tabular-nums">
                      {k.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">{k.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Lead sources + Roles two-up */}
      {item.leadSources?.length || item.roles?.length ? (
        <section className="py-16 md:py-20 bg-slate-50 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {item.leadSources?.length ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-10 w-10 rounded-lg bg-[#252140]/5 text-[#252140] flex items-center justify-center">
                        <Radio size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#252140]">
                        Where your leads come from
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {item.leadSources.map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#252140] shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : null}
              {item.roles?.length ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-10 w-10 rounded-lg bg-[#252140]/5 text-[#252140] flex items-center justify-center">
                        <Users size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#252140]">
                        Who uses Leads Rubix
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {item.roles.map((r, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#252140] shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Workflow */}
      {item.workflow?.length ? (
        <section className="py-16 md:py-20 bg-white border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#252140]/5 text-[#252140] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                The workflow
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#252140]">
                How {item.name} teams sell with Leads Rubix
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A simple, repeatable process that scales from a 5-person team to 500.
              </p>
            </div>
            <div className="space-y-5">
              {item.workflow.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-5 p-6 md:p-8 rounded-2xl border border-[#252140]/10 bg-gradient-to-br from-white to-slate-50/50 hover:border-[#252140]/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-[#252140] text-white flex items-center justify-center text-lg font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[#252140]">
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Use cases */}
      {item.useCases?.length ? (
        <section className="py-16 md:py-20 bg-slate-50 border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#252140]">
              Day-to-day workflows we automate
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Every one of these is configurable from the admin panel — no consultants required.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {item.useCases.map((u, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 rounded-xl bg-white border border-[#252140]/10"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#252140] shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">{u}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Pain points */}
      {item.painPoints?.length ? (
        <section className="py-16 md:py-20 bg-white border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#252140]">
              The problems we eliminate
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Sound familiar? Every {item.name.toLowerCase()} sales leader tells us about these.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.painPoints.map((p, i) => (
                <Card key={i} className="border-amber-200 bg-amber-50/40">
                  <CardContent className="p-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">{p}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Features */}
      {item.features?.length ? (
        <section className="py-16 md:py-20 bg-slate-50 border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#252140]">
              What you get out of the box
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Pre-configured for {item.name.toLowerCase()} — switch on and start selling.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {item.features.map((f, i) => (
                <Card key={i} className="bg-white">
                  <CardContent className="p-5 flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-[#252140] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{f}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Integrations */}
      {item.integrations?.length ? (
        <section className="py-16 md:py-20 bg-white border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-[#252140]/5 text-[#252140] flex items-center justify-center">
                <Plug size={20} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#252140]">
                Connects with your stack
              </h2>
            </div>
            <p className="text-muted-foreground mb-10 text-lg">
              Pre-built integrations for {item.name.toLowerCase()} teams. Plus a REST API for anything else.
            </p>
            <div className="flex flex-wrap gap-3">
              {item.integrations.map((g, i) => (
                <span
                  key={i}
                  className="px-4 py-2.5 rounded-full bg-slate-50 border border-[#252140]/15 text-sm font-medium text-[#252140]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Comparison table */}
      {item.comparison?.length ? (
        <section className="py-16 md:py-20 bg-white border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#252140]/5 text-[#252140] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Why Leads Rubix
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#252140]">
                Leads Rubix vs spreadsheets vs generic CRM
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                What changes when you move from where you are today to a CRM built for {item.name.toLowerCase()}.
              </p>
            </div>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#252140]/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#252140]/10">
                    <th className="text-left p-5 font-semibold text-[#252140] w-1/3">
                      Capability
                    </th>
                    <th className="text-left p-5 font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-slate-400" />
                        Spreadsheets
                      </div>
                    </th>
                    <th className="text-left p-5 font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-slate-400" />
                        Generic CRM
                      </div>
                    </th>
                    <th className="text-left p-5 font-bold text-[#252140] bg-[#252140]/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#252140]" />
                        Leads Rubix
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.comparison.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#252140]/5 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-5 font-medium text-[#252140]">{row.capability}</td>
                      <td className="p-5 text-muted-foreground">{row.spreadsheet}</td>
                      <td className="p-5 text-muted-foreground">{row.genericCrm}</td>
                      <td className="p-5 font-medium text-[#252140] bg-[#252140]/5">
                        {row.leadsRubix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {item.comparison.map((row, i) => (
                <Card key={i} className="border-[#252140]/10">
                  <CardContent className="p-5">
                    <div className="font-bold text-[#252140] mb-3">{row.capability}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Minus className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground font-medium">
                            Spreadsheets:
                          </span>{" "}
                          <span className="text-muted-foreground">{row.spreadsheet}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground font-medium">
                            Generic CRM:
                          </span>{" "}
                          <span className="text-muted-foreground">{row.genericCrm}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 pt-2 border-t border-[#252140]/10 mt-2">
                        <CheckCircle2 className="h-4 w-4 text-[#252140] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[#252140] font-bold">Leads Rubix:</span>{" "}
                          <span className="text-[#252140]">{row.leadsRubix}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Implementation timeline */}
      {item.timeline?.length ? (
        <section className="py-16 md:py-20 bg-slate-50 border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#252140]/5 text-[#252140] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                <Calendar className="h-3.5 w-3.5" />
                Go-live in 4 weeks
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#252140]">
                Your implementation timeline
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A predictable, week-by-week rollout for {item.name.toLowerCase()} teams. Most customers are fully live in under 30 days.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {item.timeline.map((w, i) => (
                <div
                  key={i}
                  className="relative p-6 rounded-2xl border border-[#252140]/10 bg-white hover:border-[#252140]/30 hover:shadow-lg transition-all"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#252140]/60 mb-2">
                    {w.week}
                  </div>
                  <h3 className="text-lg font-bold text-[#252140] mb-3 leading-tight">
                    {w.title}
                  </h3>
                  <ul className="space-y-2">
                    {w.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-[#252140] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Case study */}
      {item.caseStudy ? (
        <section className="py-16 md:py-24 bg-gradient-to-br from-white to-slate-50 border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="rounded-3xl bg-white border border-[#252140]/10 shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-[#252140]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#252140]/70">
                    Customer story
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#252140] mb-3 leading-tight">
                  {item.caseStudy.company}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                  {item.caseStudy.context}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {item.caseStudy.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[#252140]/10 p-5 bg-slate-50/50"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {m.label}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-slate-400 line-through tabular-nums">
                          {m.before}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#252140]/50 shrink-0" />
                      </div>
                      <div className="text-2xl md:text-3xl font-extrabold text-[#252140] tabular-nums mt-1">
                        {m.after}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-[#252140]/5 border border-[#252140]/10">
                  <Sparkles className="h-5 w-5 text-[#252140] shrink-0 mt-0.5" />
                  <p className="text-base text-[#252140] font-medium leading-relaxed">
                    {item.caseStudy.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Testimonial */}
      {item.testimonial ? (
        <section className="py-16 md:py-24 bg-[#252140] text-white border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col items-start gap-6">
              <Quote className="h-10 w-10 text-white/40" />
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed">
                "{item.testimonial.quote}"
              </blockquote>
              <div className="pt-4 border-t border-white/15 w-full">
                <div className="font-semibold text-lg">{item.testimonial.author}</div>
                <div className="text-white/70 text-sm">
                  {item.testimonial.role} · {item.testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {item.faq?.length ? (
        <section className="py-16 md:py-20 bg-slate-50 border-b">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#252140] text-center">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground mb-10 text-lg text-center">
              Specific to {item.name.toLowerCase()} teams.
            </p>
            <Accordion type="single" collapsible className="space-y-3">
              {item.faq.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-[#252140]/10 rounded-xl bg-white px-5"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-[#252140] hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ) : null}

      {/* Glossary - "We speak your language" */}
      {item.glossary?.length ? (
        <section className="py-16 md:py-20 bg-white border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-[#252140]/5 text-[#252140] flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#252140]">
                We speak your language
              </h2>
            </div>
            <p className="text-muted-foreground mb-10 text-lg">
              The terms your team uses every day are the terms you'll see in Leads Rubix — not generic CRM-speak.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.glossary.map((g, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-[#252140]/10 bg-slate-50/50 hover:border-[#252140]/30 transition-colors"
                >
                  <div className="font-bold text-[#252140] text-lg mb-2">{g.term}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {g.definition}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Other industries */}
      {others.length ? (
        <section className="py-16 md:py-20 bg-white border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#252140]">
                  Other industries we serve
                </h2>
                <p className="text-muted-foreground mt-1">
                  Same platform, configured for different sales motions.
                </p>
              </div>
              <Link
                href="/industries"
                className="text-sm font-semibold text-[#252140] inline-flex items-center gap-1 hover:underline"
                data-testid="link-other-industries-all"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {others.map((o) => {
                const OIcon = getIndustryIcon(o.icon);
                return (
                  <Link
                    key={o.slug}
                    href={`/industries/${o.slug}`}
                    className="group p-5 rounded-xl border border-[#252140]/10 hover:border-[#252140]/40 hover:shadow-md transition-all"
                    data-testid={`link-other-industry-${o.slug}`}
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#252140]/5 text-[#252140] flex items-center justify-center mb-3 group-hover:bg-[#252140] group-hover:text-white transition-colors">
                      <OIcon size={20} />
                    </div>
                    <div className="font-semibold text-[#252140] text-sm">{o.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {o.tagline}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Inline lead capture — placement-tagged per industry so admin
          analytics can split conversion by vertical. */}
      <section className="py-16 md:py-20 bg-white border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <InlineLeadForm
            placement={`industry-${slug}`}
            title={`See Leads Rubix configured for ${item.name.toLowerCase()}`}
            subtitle={`Tell us where to reach you — a specialist who knows ${item.name.toLowerCase()} workflows will set up a 20-minute walkthrough on your data.`}
            ctaLabel="Book my walkthrough"
            message={`Inline enquiry from /industries/${slug} — please contact me about Leads Rubix for ${item.name}.`}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#252140] to-[#16142B] text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to see it for {item.name.toLowerCase()}?
          </h2>
          <p className="text-white/80 mb-8 text-lg leading-relaxed">
            We'll walk you through a live demo configured for your industry workflows — no slides,
            just the product.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" variant="secondary" data-testid="btn-industry-demo-bottom">
              <Link href="/demo">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
              data-testid="btn-industry-contact-bottom"
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
