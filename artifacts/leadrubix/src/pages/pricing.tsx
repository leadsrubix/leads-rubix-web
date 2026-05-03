import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MinusCircle, ShieldCheck, Receipt, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useState, Fragment } from "react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
import { RoiCalculator } from "@/components/marketing/RoiCalculator";
import { ExitIntentModal } from "@/components/marketing/ExitIntentModal";

type RawPlan = {
  name: string;
  monthly: number;
  annual: number;
  desc: string;
  highlight: boolean;
  cta: string;
  href: string;
  features: string[];
};

type PricingContent = {
  annualDiscount: number;
  plans: RawPlan[];
};

type Plan = {
  name: string;
  monthly: number | null;
  annual: number | null;
  desc: string;
  highlight: boolean;
  cta: string;
  href: string;
  features: string[];
};

const DEFAULT_PRICING: PricingContent = {
  annualDiscount: 0.2,
  plans: [
    {
      name: "Starter",
      monthly: 999,
      annual: 0,
      desc: "Perfect for small teams getting started with structured sales.",
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
      desc: "For large organisations needing multi-org structure and dedicated support.",
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
};

export default function Pricing() {
  useSEO({
    title: "Pricing — Leads Rubix CRM | Plans starting at ₹999/user/month",
    description:
      "Simple, transparent pricing in INR. Starter ₹999/user/month, Growth ₹1,499/user/month, Enterprise custom. 7-day free trial, no credit card, cancel anytime. GST applied at checkout.",
    canonical: "https://leadsrubix.com/pricing",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Leads Rubix CRM",
      description:
        "CRM for India's high-velocity sales teams — Facebook/Instagram lead webhooks, automated rotation, GPS-verified calling, Razorpay bookings.",
      brand: { "@type": "Brand", name: "Leads Rubix" },
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "999",
          priceCurrency: "INR",
          url: "https://leadsrubix.com/pricing",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Growth",
          price: "1499",
          priceCurrency: "INR",
          url: "https://leadsrubix.com/pricing",
          availability: "https://schema.org/InStock",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "120",
      },
    },
  });

  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const pricing = useContent<PricingContent>("pricing_plans", DEFAULT_PRICING);
  const annualDiscount =
    typeof pricing.annualDiscount === "number" && pricing.annualDiscount > 0
      ? pricing.annualDiscount
      : 0.2;

  const plans: Plan[] = (pricing.plans ?? []).map((p) => {
    const isCustom = !p.monthly || p.monthly <= 0;
    const annual =
      isCustom
        ? null
        : p.annual && p.annual > 0
          ? p.annual
          : Math.round(p.monthly * (1 - annualDiscount));
    return {
      name: p.name,
      monthly: isCustom ? null : p.monthly,
      annual,
      desc: p.desc,
      highlight: !!p.highlight,
      cta: p.cta,
      href: p.href,
      features: Array.isArray(p.features) ? p.features : [],
    };
  });

  function priceLabel(plan: Plan): string {
    if (plan.monthly === null) return "Custom";
    return `₹${(billing === "monthly" ? plan.monthly : plan.annual!).toLocaleString("en-IN")}`;
  }

  function priceSubtext(plan: Plan): string {
    if (plan.monthly === null) return "billed annually";
    return billing === "monthly" ? "per user / month" : "per user / month, billed annually";
  }

  // Comparison matrix
  const matrix: { group: string; rows: { feature: string; values: (string | boolean)[] }[] }[] = [
    {
      group: "Capacity",
      rows: [
        { feature: "Users included", values: ["Up to 5", "Up to 20", "Unlimited"] },
        { feature: "Organizations / branches", values: ["1", "Up to 3", "Unlimited"] },
        { feature: "Lead records", values: ["Unlimited", "Unlimited", "Unlimited"] },
      ],
    },
    {
      group: "Lead capture",
      rows: [
        { feature: "Facebook & Instagram webhooks", values: [true, true, true] },
        { feature: "Bulk CSV import & export", values: [true, true, true] },
        { feature: "Custom webhook API for any source", values: [false, true, true] },
        { feature: "REST API & Socket.IO", values: [false, true, true] },
      ],
    },
    {
      group: "Sales workflow",
      rows: [
        { feature: "Default FRESH → BOOKED pipeline", values: [true, true, true] },
        { feature: "Custom pipeline stages", values: [false, true, true] },
        { feature: "6 custom lead fields", values: [false, true, true] },
        { feature: "Automated round-robin rotation", values: [false, true, true] },
        { feature: "Working hours & holiday awareness", values: [false, true, true] },
      ],
    },
    {
      group: "Calling & activity",
      rows: [
        { feature: "Manual call logs", values: [true, true, true] },
        { feature: "Auto call duration & timestamp", values: [true, true, true] },
        { feature: "GPS-verified call tracking", values: [false, true, true] },
        { feature: "Tasks, calendar & overdue detection", values: [true, true, true] },
      ],
    },
    {
      group: "Bookings & money",
      rows: [
        { feature: "Property booking module", values: [false, true, true] },
        { feature: "Razorpay payments (HMAC-SHA256 verified)", values: [false, true, true] },
        { feature: "Auto-generated PDF invoices", values: [false, true, true] },
      ],
    },
    {
      group: "Access control",
      rows: [
        { feature: "6-role hierarchy", values: [true, true, true] },
        { feature: "Branch-level permissions", values: [false, true, true] },
        { feature: "Custom role definitions", values: [false, false, true] },
      ],
    },
    {
      group: "Support",
      rows: [
        { feature: "Email support", values: [true, true, true] },
        { feature: "Priority chat support", values: [false, true, true] },
        { feature: "Dedicated account manager", values: [false, false, true] },
        { feature: "Custom SLA", values: [false, false, true] },
      ],
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing in INR</h1>
            <p className="text-xl text-muted-foreground">No hidden fees. No surprise tier-jumps. Pricing built for Indian sales teams.</p>
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-white border border-border rounded-full p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                data-testid="btn-billing-monthly"
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-2 ${billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                data-testid="btn-billing-annual"
              >
                Annual
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${billing === "annual" ? "bg-secondary text-secondary-foreground" : "bg-secondary/15 text-secondary"}`}>Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-2xl border ${plan.highlight ? 'border-primary shadow-xl bg-primary text-primary-foreground' : 'border-border bg-card shadow-sm'}`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                <h2 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{plan.name}</h2>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{plan.desc}</p>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold">{priceLabel(plan)}</span>
                  <span className={`text-sm ml-2 ${plan.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{priceSubtext(plan)}</span>
                </div>
                <p className={`text-xs mb-8 ${plan.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>+ GST applied at checkout per Indian tax rules</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.highlight ? 'text-secondary' : 'text-primary'}`} />
                      <span className={plan.highlight ? 'text-primary-foreground/90' : 'text-muted-foreground'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full h-12 text-lg"
                  variant={plan.highlight ? "secondary" : "default"}
                  data-testid={`btn-pricing-${plan.name.toLowerCase()}`}
                >
                  {plan.href.startsWith('http') ? (
                    <a href={plan.href} target="_blank" rel="noopener noreferrer">{plan.cta}</a>
                  ) : (
                    <Link href={plan.href}>{plan.cta}</Link>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12">
            <Card className="border-border/60">
              <CardContent className="p-5 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">7-day free trial</p>
                  <p className="text-xs text-muted-foreground">No credit card required.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-5 flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Cancel anytime</p>
                  <p className="text-xs text-muted-foreground">Monthly plans, no lock-in.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-5 flex items-start gap-3">
                <Receipt className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">GST invoice every cycle</p>
                  <p className="text-xs text-muted-foreground">Provide GSTIN for input credit.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section className="py-20 bg-background border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Compare every feature</h2>
            <p className="text-muted-foreground">See exactly what's included in each plan.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-semibold w-2/5">Feature</th>
                  <th className="p-4 font-semibold text-center">Starter</th>
                  <th className="p-4 font-semibold text-center text-primary">Growth</th>
                  <th className="p-4 font-semibold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((group) => (
                  <Fragment key={group.group}>
                    <tr className="bg-slate-50/50">
                      <td colSpan={4} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{group.group}</td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.feature} className="border-t border-border">
                        <td className="p-4 text-foreground">{row.feature}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="p-4 text-center">
                            {typeof v === "boolean" ? (
                              v ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" aria-label="Included" /> : <MinusCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" aria-label="Not included" />
                            ) : (
                              <span className="text-sm">{v}</span>
                            )}
                          </td>
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

      {/* ROI Calculator */}
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <RoiCalculator />
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Pricing questions</h2>
          <div className="space-y-6 text-base">
            <div>
              <h3 className="font-bold mb-2">Is GST included in the listed price?</h3>
              <p className="text-muted-foreground">No. Listed prices are exclusive of GST. The applicable GST is added at checkout based on your billing state per Indian tax regulations. You can supply your GSTIN for input tax credit.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">What's the difference between monthly and annual billing?</h3>
              <p className="text-muted-foreground">Annual plans are billed upfront and save 20% versus the equivalent monthly rate. Monthly plans bill on a recurring monthly cycle and can be cancelled at any time.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I change plans later?</h3>
              <p className="text-muted-foreground">Yes. You can upgrade or downgrade at any time from the in-app billing page. Upgrades are pro-rated; downgrades take effect at the next renewal.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">See our <Link href="/refund" className="text-primary underline">Refund Policy</Link>. In short: monthly plans cancel anytime with no refund for the current cycle; annual plans are refundable on a pro-rated basis within 30 days of purchase.</p>
            </div>
          </div>
        </div>
      </section>
      <ExitIntentModal
        storageKey="leadsrubix-exit-intent-pricing"
        title="Before you compare — see it live"
        body="Watch a 15-minute walkthrough tailored to your team size and industry. No credit card. No commitment."
      />
    </Layout>
  );
}
