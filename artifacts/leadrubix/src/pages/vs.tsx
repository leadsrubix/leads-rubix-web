import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useRoute, Redirect } from "wouter";
import { Fragment } from "react";
import { CheckCircle2, MinusCircle, ArrowRight, Trophy, ArrowLeft } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { ExitIntentModal } from "@/components/marketing/ExitIntentModal";
import { COMPETITORS, getCompetitor, type CompetitorCell } from "@/lib/competitors";

function renderCell(v: CompetitorCell, isHero: boolean) {
  if (typeof v === "boolean") {
    return v ? (
      <CheckCircle2 className={`h-5 w-5 mx-auto ${isHero ? "text-primary" : "text-foreground/70"}`} aria-label="Yes" />
    ) : (
      <MinusCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" aria-label="No" />
    );
  }
  if (v === "partial") {
    return (
      <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
        Limited
      </span>
    );
  }
  return <span className="text-sm">{v}</span>;
}

export default function VsPage() {
  const [, params] = useRoute<{ slug: string }>("/vs/:slug");
  const slug = params?.slug ?? "";
  const competitor = getCompetitor(slug);

  // Hooks must run unconditionally — useSEO is called every render with safe fallbacks
  // for unknown slugs. Redirect is rendered after, so hook order is stable across slug changes.
  useSEO({
    title: competitor?.metaTitle ?? "Leads Rubix — Comparison",
    description:
      competitor?.metaDescription ??
      "Compare Leads Rubix to leading CRM platforms for Indian sales teams.",
    canonical: competitor
      ? `https://leadsrubix.com/vs/${competitor.slug}`
      : "https://leadsrubix.com/compare",
    jsonLd: competitor
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://leadsrubix.com/" },
            { "@type": "ListItem", position: 2, name: "Compare", item: "https://leadsrubix.com/compare" },
            {
              "@type": "ListItem",
              position: 3,
              name: `vs ${competitor.rivalShort}`,
              item: `https://leadsrubix.com/vs/${competitor.slug}`,
            },
          ],
        }
      : undefined,
  });

  if (!competitor) {
    return <Redirect to="/compare" />;
  }

  const cols = ["Leads Rubix", competitor.rivalShort];

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/compare" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6" data-testid="link-back-compare">
            <ArrowLeft className="h-4 w-4" /> All comparisons
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Trophy className="h-3.5 w-3.5" />
            {competitor.heroEyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" data-testid="vs-h1">
            {competitor.heroHeadline}
          </h1>
          <p className="text-xl text-muted-foreground">{competitor.heroSub}</p>
          <p className="text-xs text-muted-foreground mt-4">
            Comparisons reflect publicly available product information at time of writing. Vendor capabilities change — please verify directly with each vendor.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">In one paragraph</h2>
          <p className="text-muted-foreground leading-relaxed">{competitor.summary}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-10">Why teams pick Leads Rubix</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {competitor.whyDifferent.map((line, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-5 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">{line}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background border-b">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-6">
          <Card className="border-primary/40 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">Pick Leads Rubix when…</h3>
              <ul className="space-y-2">
                {competitor.whenToPick.rubix.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">Pick {competitor.rivalShort} when…</h3>
              <ul className="space-y-2">
                {competitor.whenToPick.rival.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{line}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-background border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Feature-by-feature</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm min-w-[720px]">
              <thead className="bg-slate-50 dark:bg-slate-900/40">
                <tr>
                  <th className="p-4 font-semibold w-2/5">Capability</th>
                  {cols.map((c, i) => (
                    <th key={c} className={`p-4 font-semibold text-center ${i === 0 ? "text-primary" : ""}`}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitor.matrix.map((sec) => (
                  <Fragment key={sec.group}>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/20">
                      <td colSpan={cols.length + 1} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{sec.group}</td>
                    </tr>
                    {sec.rows.map((row) => (
                      <tr key={row.feature} className="border-t border-border">
                        <td className="p-4 text-foreground">{row.feature}</td>
                        <td className="p-4 text-center">{renderCell(row.rubix, true)}</td>
                        <td className="p-4 text-center">{renderCell(row.rival, false)}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">See it for yourself</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The fastest way to compare is to actually use the product. Start a 7-day free trial — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="btn-vs-trial">
              <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="btn-vs-demo">
              <Link href={`/demo?source=vs-${competitor.slug}`}>Book a Demo</Link>
            </Button>
          </div>
          <div className="mt-10 text-sm text-muted-foreground">
            <p className="mb-3 font-semibold text-foreground">Other comparisons</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {COMPETITORS.filter((c) => c.slug !== competitor.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/vs/${c.slug}`}
                  className="px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                  data-testid={`link-vs-${c.slug}`}
                >
                  vs {c.rivalShort}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ExitIntentModal
        storageKey={`leadsrubix-exit-intent-vs-${competitor.slug}`}
        title="Still comparing?"
        body={`Skip the spreadsheet — get a 15-minute side-by-side walkthrough of Leads Rubix vs ${competitor.rivalShort}, configured for your team.`}
      />
    </Layout>
  );
}
