import { Link, useRoute, Redirect } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
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
  const item = (data.items ?? []).find((i) => i.slug === slug);

  useSEO({
    title: item
      ? `${item.name} CRM — Leads Rubix | ${item.tagline}`
      : "Industry — Leads Rubix CRM",
    description: item?.description ?? "",
    canonical: `https://leadsrubix.com/industries/${slug}`,
  });

  if (!item) {
    if ((data.items ?? []).length === 0) {
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
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/industries" className="hover:text-[#252140]" data-testid="link-back-industries">
              Industries
            </Link>
            <span>/</span>
            <span className="text-[#252140] font-medium">{item.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="h-16 w-16 rounded-2xl bg-[#252140] text-white flex items-center justify-center shrink-0">
              <Icon size={32} />
            </div>
            <div className="flex-1">
              <span className="inline-block bg-[#252140]/5 text-[#252140] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                {item.name}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#252140]">
                {item.tagline}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">{item.description}</p>
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
          </div>
        </div>
      </section>

      {/* KPIs */}
      {item.kpis?.length ? (
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {item.kpis.map((k, i) => (
                <Card key={i} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-extrabold text-[#252140] tabular-nums">
                      {k.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{k.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Use cases */}
      {item.useCases?.length ? (
        <section className="py-16 bg-background border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#252140]">
              How {item.name} teams use Leads Rubix
            </h2>
            <p className="text-muted-foreground mb-8">
              The day-to-day workflows we automate for teams in your industry.
            </p>
            <ul className="space-y-4">
              {item.useCases.map((u, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#252140] shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Pain points */}
      {item.painPoints?.length ? (
        <section className="py-16 bg-slate-50 border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#252140]">
              The problems we eliminate
            </h2>
            <p className="text-muted-foreground mb-8">
              Sound familiar? These are the issues every {item.name.toLowerCase()} sales leader tells us about.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.painPoints.map((p, i) => (
                <Card key={i} className="border-amber-200 bg-amber-50/50">
                  <CardContent className="p-5 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                    <span className="text-sm">{p}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Features */}
      {item.features?.length ? (
        <section className="py-16 bg-background border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#252140]">
              What you get out of the box
            </h2>
            <p className="text-muted-foreground mb-8">
              Pre-configured for {item.name.toLowerCase()} — no consultants required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {item.features.map((f, i) => (
                <Card key={i}>
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

      {/* CTA */}
      <section className="py-20 bg-[#252140] text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to see it in action for {item.name.toLowerCase()}?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            We'll walk you through a live demo configured for your industry workflows.
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
