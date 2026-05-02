import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, BarChart3, Users, PhoneCall, Building, Lock } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Purpose-built for Indian Real Estate
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Stop losing leads in <span className="text-primary relative whitespace-nowrap">
                <span className="relative z-10">WhatsApp.</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-10 -rotate-1"></span>
              </span><br />
              Start closing them.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Leads Rubix is the serious CRM for property developers and brokerages. Capture Facebook leads instantly, rotate them automatically, and track every call your team makes.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8" asChild data-testid="btn-hero-cta">
                <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8" asChild data-testid="btn-hero-demo">
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Setup in 10 mins</div>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] blur-3xl opacity-50"></div>
            <img src="/hero-dashboard.png" alt="Leads Rubix Dashboard Preview" className="relative rounded-[2rem] shadow-2xl border border-border bg-card w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y bg-slate-50/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Trusted by 500+ Indian Real Estate Teams</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {/* Placeholders for logos */}
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Rustomjee</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Lodha</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Godrej</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> DLF</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Prestige</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run a high-performance sales floor</h2>
            <p className="text-lg text-muted-foreground">We built Leads Rubix specifically for the chaos of Indian real estate sales. No generic features, just tools that drive bookings.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Automated Lead Rotation", desc: "Round-robin assignment ensures no lead is left unattended. Assign instantly to the next available agent." },
              { icon: PhoneCall, title: "Call Log Tracking", desc: "Every outbound call is logged automatically with duration, timestamp, and GPS coordinates." },
              { icon: BarChart3, title: "Real-time Analytics", desc: "Dashboards for stage distribution, calling reports, and sales category breakdowns." },
              { icon: Building, title: "Bookings & Payments", desc: "Capture property bookings, integrate Razorpay, and generate professional PDF invoices." },
              { icon: Lock, title: "Role-Based Access", desc: "Six tailored roles from Super Admin to Sales Agent to maintain data privacy and hierarchy." },
              { icon: CheckCircle2, title: "Multi-Source Capture", desc: "Facebook & Instagram Lead Ads webhooks, bulk CSV import, and manual entry in one place." }
            ].map((feature, i) => (
              <Card key={i} className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to organize your pipeline?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">Join hundreds of real estate teams across India using Leads Rubix to capture more leads and close more bookings.</p>
          <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold" asChild data-testid="btn-bottom-cta">
            <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
              Start Free Trial Now
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
