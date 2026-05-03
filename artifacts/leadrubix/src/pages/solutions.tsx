import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Building2, 
  Construction, 
  Handshake, 
  UserCircle, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";
import { useSEO } from "@/lib/useSEO";

export default function Solutions() {
  useSEO({
    title: "Solutions — Leads Rubix for sales leaders, ops, frontline & partners",
    description:
      "Whether you're a sales leader, a sales-ops manager, a frontline rep or a partner-channel team, Leads Rubix has a workflow built for you — across every industry we serve.",
    canonical: "https://leadsrubix.com/solutions",
  });
  const sections = [
    {
      id: "sales-leaders",
      title: "For Sales Leaders",
      icon: Building2,
      description: "Run a multi-team, multi-branch sales floor with full visibility — across real estate, education, healthcare, BFSI, automotive, travel, SaaS or manufacturing.",
      features: [
        "Multi-source lead capture from Meta, Google and vertical aggregators",
        "Automated routing by territory, ICP, language or product",
        "Role-based access for team leads, managers and partners",
        "Real-time forecast, productivity and revenue dashboards",
        "Industry-specific pipelines that work on day one"
      ],
      image: "/solutions-brokerage.png",
      reversed: false
    },
    {
      id: "sales-ops",
      title: "For Sales Ops & RevOps",
      icon: Construction,
      description: "Eliminate spreadsheets. Run forecasts, payments, audit trails and integrations from a single pane of glass — configured for your vertical.",
      features: [
        "Source-of-truth pipeline with multi-org and multi-branch support",
        "Razorpay payments for bookings, fees, premiums or EMIs",
        "Auto-generated GST invoices and reconciliation",
        "Server-verified webhooks and immutable audit trails",
        "Open REST API and native integrations with the tools you use"
      ],
      image: "/solutions-developer.png",
      reversed: true
    },
    {
      id: "partner-channels",
      title: "For Partner Channels",
      icon: Handshake,
      description: "Distributors, channel partners, advisor networks and DMCs — collaborate seamlessly while maintaining control over your data and permissions.",
      features: [
        "Branded partner portal for lead submission and tracking",
        "Branch-level and partner-level visibility permissions",
        "Custom field mapping for industry-specific data",
        "Lead transfer with full history and audit log",
        "Automated duplicate detection and attribution"
      ],
      image: "/solutions-channel.png",
      reversed: false
    },
    {
      id: "frontline-reps",
      title: "For Frontline Reps & Agents",
      icon: UserCircle,
      description: "Whether you're an agent, a counsellor, a tele-caller, a sales consultant or a field rep, focus on closing deals with tools designed for how you actually work.",
      features: [
        "Task management for calls, meetings, site visits, demos and follow-ups",
        "Automated call logging with duration and optional GPS",
        "WhatsApp Business templates and one-tap messaging",
        "Mobile-first app with push notifications and offline mode",
        "One-click status updates and stage progression"
      ],
      image: "/solutions-agent.png",
      reversed: true
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-6">
            Solutions for every role on a sales floor
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Built for the people who actually sell</h1>
          <p className="text-xl text-muted-foreground">From individual reps to enterprise sales leaders, Leads Rubix provides the exact tools you need to organise your pipeline and close more revenue — configured for your industry. Looking for industry-specific playbooks? <Link href="/industries" className="underline hover:text-primary">Browse industries →</Link></p>
        </div>
      </section>

      {/* Solutions Sections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col gap-32">
            {sections.map((section, idx) => (
              <div key={section.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${section.reversed ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <section.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{section.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{section.description}</p>
                  
                  <ul className="space-y-4 mt-8">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                        <span className="text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-1 w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted/20 aspect-[4/3] flex items-center justify-center">
                    <img 
                      src={section.image} 
                      alt={`${section.title} Interface`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image generation is delayed
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20text-anchor%3D%22middle%22%20fill%3D%22%2364748b%22%3EInterface%20Preview%3C%2Ftext%3E%3C%2Fsvg%3E';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-slate-50 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Find your fit</h2>
          <p className="text-xl text-muted-foreground mb-10">Whether you're a team of 5 or 500, Leads Rubix scales with your sales floor.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" asChild data-testid="btn-solutions-freetrial">
              <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
                Start free trial <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg bg-background" asChild data-testid="btn-solutions-demo">
              <Link href="/contact">Book a demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
