import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, MinusCircle, ArrowRight, Trophy } from "lucide-react";
import { Fragment } from "react";
import { useSEO } from "@/lib/useSEO";
import { ExitIntentModal } from "@/components/marketing/ExitIntentModal";

export default function Compare() {
  useSEO({
    title: "Leads Rubix vs Sell.do, LeadSquared & Generic CRMs — Honest Comparison",
    description:
      "How Leads Rubix compares to Sell.do, LeadSquared and generic CRMs (Zoho, Freshsales) for India's high-velocity sales teams across real estate, education, healthcare, BFSI and more. Honest, feature-by-feature breakdown.",
    canonical: "https://leadsrubix.com/compare",
  });

  type Cell = boolean | "partial" | string;
  const cols = ["Leads Rubix", "Sell.do", "LeadSquared", "Generic CRM (Zoho/Freshsales)"];

  const sections: { group: string; rows: { feature: string; values: Cell[] }[] }[] = [
    {
      group: "Built for India",
      rows: [
        { feature: "Industry-specific playbooks (real estate, education, healthcare, BFSI, …)", values: [true, "partial", "partial", false] },
        { feature: "INR pricing with GST handling", values: [true, true, true, "partial"] },
        { feature: "Razorpay-native bookings, fees & invoices", values: [true, "partial", "partial", false] },
        { feature: "Indian working hours & holiday awareness", values: [true, "partial", "partial", false] },
      ],
    },
    {
      group: "Lead capture",
      rows: [
        { feature: "Facebook Lead Ads webhook (zero-latency)", values: [true, true, true, "partial"] },
        { feature: "Instagram Lead Ads webhook", values: [true, true, true, "partial"] },
        { feature: "Bulk CSV import", values: [true, true, true, true] },
        { feature: "Custom webhook for any source", values: [true, true, true, true] },
      ],
    },
    {
      group: "Lead routing & accountability",
      rows: [
        { feature: "Automated round-robin rotation", values: [true, true, true, "partial"] },
        { feature: "Auto re-assignment of untouched leads", values: [true, true, true, false] },
        { feature: "GPS-verified call tracking", values: [true, false, false, false] },
        { feature: "Branch-level permissions", values: [true, true, true, "partial"] },
        { feature: "6-role hierarchy out of the box", values: [true, "partial", true, "partial"] },
      ],
    },
    {
      group: "Bookings, fees & money",
      rows: [
        { feature: "Bookings / fees / premium / EMI module", values: [true, "partial", "partial", false] },
        { feature: "Server-verified Razorpay payments", values: [true, "partial", "partial", false] },
        { feature: "Auto-generated GST invoices", values: [true, true, true, "partial"] },
      ],
    },
    {
      group: "Pricing & ownership",
      rows: [
        { feature: "Starts under ₹1,000 / user / month", values: [true, false, false, "partial"] },
        { feature: "Transparent public pricing", values: [true, false, false, true] },
        { feature: "7-day free trial, no credit card", values: [true, "partial", "partial", true] },
        { feature: "You own and can export your data anytime", values: [true, true, true, true] },
      ],
    },
  ];

  function renderCell(v: Cell, isHero: boolean) {
    if (typeof v === "boolean") {
      return v ? (
        <CheckCircle2 className={`h-5 w-5 mx-auto ${isHero ? "text-primary" : "text-foreground/70"}`} aria-label="Yes" />
      ) : (
        <MinusCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" aria-label="No" />
      );
    }
    if (v === "partial") {
      return <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Limited</span>;
    }
    return <span className="text-sm">{v}</span>;
  }

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Trophy className="h-3.5 w-3.5" />
            Honest comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How Leads Rubix compares</h1>
          <p className="text-xl text-muted-foreground">A fair, feature-by-feature look at how Leads Rubix stacks up against other CRMs Indian sales teams evaluate — across real estate, education, healthcare, BFSI and more.</p>
          <p className="text-xs text-muted-foreground mt-4">Comparisons reflect publicly available product information at the time of writing. Competitor capabilities may change — please verify directly with each vendor.</p>
        </div>
      </section>

      {/* Quick takes */}
      <section className="py-16 bg-background border-b">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-3 gap-6">
          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">vs Sell.do</h3>
              <p className="text-muted-foreground text-sm">Sell.do is a strong incumbent for large real-estate developers with enterprise budgets. Leads Rubix offers transparent INR pricing, multi-industry playbooks beyond real estate, GPS-verified calling, and an easier first 30 days for mid-market teams.</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">vs LeadSquared</h3>
              <p className="text-muted-foreground text-sm">LeadSquared is a horizontal sales execution platform. Leads Rubix ships pre-configured per industry — real estate, education, healthcare, BFSI, automotive, travel, SaaS, manufacturing — so pipelines, payment flows and reports work on day one without consultants.</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">vs Zoho / Freshsales</h3>
              <p className="text-muted-foreground text-sm">Generic CRMs are flexible but require months of customisation to model your industry. Leads Rubix ships with industry-specific defaults on day one — Razorpay payments, Meta lead ads, GPS calling, vertical aggregator integrations and KYC workflows.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Matrix */}
      <section className="py-20 bg-background border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Feature-by-feature</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-semibold w-2/5">Capability</th>
                  {cols.map((c, i) => (
                    <th key={c} className={`p-4 font-semibold text-center ${i === 0 ? "text-primary" : ""}`}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sections.map((sec) => (
                  <Fragment key={sec.group}>
                    <tr className="bg-slate-50/50">
                      <td colSpan={cols.length + 1} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{sec.group}</td>
                    </tr>
                    {sec.rows.map((row) => (
                      <tr key={row.feature} className="border-t border-border">
                        <td className="p-4 text-foreground">{row.feature}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="p-4 text-center">{renderCell(v, i === 0)}</td>
                        ))}
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
          <p className="text-lg text-muted-foreground mb-8">The fastest way to compare is to actually use the product. Start a 7-day free trial — no credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="btn-compare-trial">
              <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="btn-compare-demo">
              <Link href="/demo">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
      <ExitIntentModal
        storageKey="leadsrubix-exit-intent-compare"
        title="Still comparing? Skip the spreadsheet"
        body="Get a side-by-side walkthrough of Leads Rubix vs your current CRM in a 15-minute personalised demo."
      />
    </Layout>
  );
}
