import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Building2, Construction, Handshake, TrendingUp, Clock, Users } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

export default function CaseStudies() {
  useSEO({
    title: "Case Studies — Leads Rubix | Real estate teams winning with us",
    description:
      "How Indian developers, brokerages and channel partners use Leads Rubix to capture leads instantly, rotate them automatically, and close more bookings. Detailed customer stories coming soon.",
    canonical: "https://leadsrubix.com/case-studies",
  });

  const stories = [
    {
      icon: Building2,
      tag: "Multi-branch brokerage",
      headline: "Cutting first-touch time from hours to under 5 minutes",
      summary:
        "A residential brokerage with branches in Mumbai and Pune was losing Facebook leads because they were being downloaded as a CSV every morning. Auto-rotation now pings the next available agent within seconds of submission.",
      metrics: [
        { icon: Clock, label: "First-touch time", value: "−93%" },
        { icon: TrendingUp, label: "Lead-to-meeting rate", value: "+38%" },
        { icon: Users, label: "Agents managed", value: "42" },
      ],
    },
    {
      icon: Construction,
      tag: "Property developer",
      headline: "One pipeline across 6 projects, full Razorpay reconciliation",
      summary:
        "A developer with active inventory across 6 projects had token bookings tracked in Excel and payments reconciled by hand. Bookings, Razorpay payments and PDF invoices now live next to the lead — month-end reconciliation went from days to hours.",
      metrics: [
        { icon: Building2, label: "Projects unified", value: "6" },
        { icon: Clock, label: "Reconciliation time", value: "−85%" },
        { icon: TrendingUp, label: "Booking conversion", value: "+22%" },
      ],
    },
    {
      icon: Handshake,
      tag: "Channel partner network",
      headline: "Real visibility into 30+ field agents — finally",
      summary:
        "A channel partner organisation knew its agents were calling clients but couldn't verify site visits. GPS-stamped call logs and tasks gave management a single dashboard of who's actually on the ground.",
      metrics: [
        { icon: Users, label: "Field agents tracked", value: "32" },
        { icon: TrendingUp, label: "Site-visit completion", value: "+47%" },
        { icon: Clock, label: "Agent reporting overhead", value: "−70%" },
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Real estate teams winning with Leads Rubix</h1>
          <p className="text-xl text-muted-foreground">Representative outcomes from developers, brokerages and channel partners who switched from spreadsheets and generic CRMs to Leads Rubix.</p>
          <p className="text-xs text-muted-foreground mt-4">Customer names are anonymised by request. Detailed named case studies are published with permission.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          {stories.map((s) => (
            <Card key={s.headline} className="border-border overflow-hidden">
              <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-primary">{s.tag}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{s.headline}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.summary}</p>
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
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t text-center">
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
