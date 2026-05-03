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
} from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
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
                    <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                      {ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  ) : (
                    <Link href={ctaHref}>
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
