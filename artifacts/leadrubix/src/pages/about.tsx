import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Compass, Building2, Heart, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

export default function About() {
  useSEO({
    title: "About — Leads Rubix | The CRM for India's high-velocity sales teams",
    description:
      "Leads Rubix is an India-first CRM for high-velocity sales teams across real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing. We're building the operating system for how India actually sells.",
    canonical: "https://leadsrubix.com/about",
  });

  const principles = [
    { icon: Compass, title: "India-first, not India-translated", desc: "Every feature — from GST invoices to WhatsApp Business templates to GPS-verified field activity — is designed for how India actually sells, not retrofitted from a US template." },
    { icon: Heart, title: "Frontline-friendly", desc: "Sales agents won't use a CRM they hate. We obsess over keeping the agent screen fast, mobile-first, and free of busywork." },
    { icon: ShieldCheck, title: "You own your data", desc: "Your leads, your call logs, your bookings — they belong to you. Export anytime, delete anytime, no hostage tactics." },
    { icon: Handshake, title: "Honest pricing", desc: "INR pricing, transparent GST, no per-feature pay walls inside a tier, and human support that picks up the phone." },
  ];

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Our story
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for Indian sales teams, by people who've run them</h1>
          <p className="text-xl text-muted-foreground">Our mission is to bring structure, accountability and speed to sales teams across every industry that powers India's economy.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background border-b">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg prose-slate">
          <h2>The problem we kept seeing</h2>
          <p>
            We started with Indian real estate, where developers and brokerages were running ₹50–500 crore sales operations on top of WhatsApp groups, photocopied Excel sheets, and Facebook inboxes. Leads from a single Saturday's ad spend would scatter across three managers, two interns, and a personal phone.
          </p>
          <p>
            Then we kept hearing the same story from admissions counsellors, hospital appointment desks, NBFC tele-callers, dealership managers, travel agents, SaaS SDRs, and B2B field reps. The setting changed; the chaos didn't. Generic CRMs — built for US-style funnels and dollar invoices — couldn't fix it. They didn't understand WhatsApp-first conversations, regional languages, partner networks, GST, Razorpay, or the simple reality that an Indian sales rep's primary device is a phone.
          </p>

          <h2>What we built</h2>
          <p>
            Leads Rubix is the operating system for high-velocity sales in India. We start the moment a lead is born — a Meta ad, a website form, a Justdial enquiry, a Practo lead, an IndiaMART RFQ, a walk-in — and we don't let it go cold. Routing respects industry rules (territory, language, ICP, product). Every conversation is logged. Bookings, fees, premiums and EMIs flow through Razorpay with server-verified signatures and auto-generated GST invoices.
          </p>
          <p>
            None of that is novel by itself. What's novel is putting all of it in one screen, configured per industry, and designed for the team lead at 11pm trying to figure out where today's leads went.
          </p>

          <h2>Where we're going</h2>
          <p>
            We're investing heavily in WhatsApp Business as a first-class channel, in deeper analytics for marketing ROI, in a native mobile app, and in industry-specific playbooks for every vertical we serve. Our north star: no Indian sales team should lose a lead because of bad software — whether they're selling a flat, a college seat, an IVF package, an auto loan, a test drive, a holiday, a SaaS subscription or a tonne of fasteners.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What we believe</h2>
            <p className="text-muted-foreground">The principles that shape every release.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <Card key={p.title} className="border-border">
                <CardContent className="p-6">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-6">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">A small, senior team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Leads Rubix is built by a focused team of engineers, designers, and sales operators headquartered in Mumbai — with operating experience across real estate, education, BFSI and SaaS. We move fast, we ship weekly, and we're on the phone with our customers more days than not.
          </p>
          <p className="text-sm text-muted-foreground">
            Want to talk to a founder before you trial? <Link href="/demo" className="text-primary underline">Book a demo</Link> and ask for one.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Come build the future of Indian sales with us</h2>
          <p className="text-lg opacity-90 mb-8">Start a 7-day free trial or talk to our team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-12 px-8 font-bold" asChild data-testid="btn-about-trial">
              <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">Start Free Trial</a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 font-bold bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild data-testid="btn-about-demo">
              <Link href="/demo">Book a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
