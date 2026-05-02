import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, CheckCircle2, BarChart3, Users, PhoneCall, Building, 
  Lock, Calendar, Share2, Smartphone, CreditCard, XCircle, Clock, 
  AlertCircle, ChevronRight, Facebook, Instagram, Mail, MessageSquare, Database
} from "lucide-react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Rustomjee</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Lodha</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Godrej</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> DLF</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building className="h-6 w-6"/> Prestige</div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">500+</div>
              <div className="text-primary-foreground/80 font-medium">Real Estate Teams</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">2M+</div>
              <div className="text-primary-foreground/80 font-medium">Leads Tracked</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">50+</div>
              <div className="text-primary-foreground/80 font-medium">Lead Fields Captured</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">6</div>
              <div className="text-primary-foreground/80 font-medium">Roles, One Pipeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why traditional sales floors leak revenue</h2>
            <p className="text-lg text-muted-foreground">The Indian real estate market moves fast. If your process is slow, you lose the booking.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-destructive/20 bg-destructive/5 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-bold text-lg mb-2">Data Chaos</h3>
                <p className="text-muted-foreground">Leads scattered across WhatsApp, Excel sheets, and Facebook inboxes. No single source of truth.</p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-bold text-lg mb-2">Zero Accountability</h3>
                <p className="text-muted-foreground">Sales managers can't see who's actually following up, leading to dropped balls and lost deals.</p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-bold text-lg mb-2">Slow Response Times</h3>
                <p className="text-muted-foreground">Unattended leads go cold within hours while agents manually assign and distribute data.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Pipeline Visualization */}
      <section className="py-24 bg-slate-50 border-y overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The ultimate real estate pipeline</h2>
            <p className="text-lg text-muted-foreground">Drive every prospect through a rigid, configurable flow designed specifically for property sales.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 max-w-6xl mx-auto relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0"></div>
            
            {[
              { stage: "FRESH", desc: "New lead captured. Auto-assigned to next available agent." },
              { stage: "CALLBACK", desc: "Agent reached prospect, needs follow-up at a specific time." },
              { stage: "INTERESTED", desc: "Prospect engaged. Site visits and meetings scheduled." },
              { stage: "BOOKED", desc: "Property booked. Payment captured, invoice generated." },
              { stage: "LOST", desc: "Lead disqualified with exact reason logged for analysis." }
            ].map((item, i) => (
              <div key={item.stage} className="relative z-10 w-full lg:w-1/5 flex flex-col items-center">
                <div className="w-full bg-card border border-border shadow-sm rounded-xl p-5 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="text-xs font-bold tracking-widest text-primary/60 mb-2">STAGE 0{i+1}</div>
                  <h3 className="font-bold text-lg mb-2">{item.stage}</h3>
                  <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                </div>
                {i < 4 && (
                  <div className="lg:hidden my-4 text-border">
                    <ArrowRight className="h-6 w-6 rotate-90" />
                  </div>
                )}
              </div>
            ))}
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
              { icon: PhoneCall, title: "Call Log Tracking", desc: "Every outbound call is logged automatically with duration, timestamp, and current stage." },
              { icon: BarChart3, title: "Real-time Analytics", desc: "Dashboards for stage distribution, calling reports, and sales category breakdowns." },
              { icon: CreditCard, title: "Bookings & Payments", desc: "Capture property bookings, integrate Razorpay, and generate professional PDF invoices." },
              { icon: Lock, title: "Role-Based Access", desc: "Six tailored roles from Super Admin to Sales Agent to maintain data privacy and hierarchy." },
              { icon: Share2, title: "Multi-Source Capture", desc: "Facebook & Instagram Lead Ads webhooks, bulk CSV import, and manual entry in one place." },
              { icon: Calendar, title: "Task Management", desc: "Schedule calls, meetings, and site visits with calendar views and overdue detection." },
              { icon: Building, title: "Multi-Org Support", desc: "Manage multiple developer projects or brokerage branches under one Super Admin." },
              { icon: Smartphone, title: "GPS Call Tracking", desc: "Verify agent location during calls with precise GPS coordinate logging." }
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

      {/* Automated Lead Rotation Deep-dive */}
      <section className="py-24 bg-slate-900 text-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6">
                Key Differentiator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Automated Lead Rotation</h2>
              <p className="text-xl text-slate-400 mb-8">
                Never let a lead go cold. Our Bull & Redis-backed job queue automatically reassigns untouched leads based on your strict rules.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Lead Arrives", desc: "Instantly captured via webhook or import." },
                  { title: "Response Window", desc: "Agent has configurable minutes to respond." },
                  { title: "Auto-Reassignment", desc: "If untouched, round-robin routes to the next agent." },
                  { title: "Schedule Aware", desc: "Respects working hours and holiday calendars." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{step.title}</h4>
                      <p className="text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-2xl blur-3xl opacity-50"></div>
              <img 
                src="/lead-rotation.png" 
                alt="Lead Rotation Diagram" 
                className="relative rounded-2xl border border-slate-700 shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Six Roles */}
      <section className="py-24 bg-background border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Six roles for real teams</h2>
            <p className="text-lg text-muted-foreground">Rigid, hierarchical access control matching how Indian brokerages actually operate.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { role: "Super Admin", desc: "Full access across all organizations, manages system configuration" },
              { role: "Organization", desc: "Admin for a single organization, manages users and settings" },
              { role: "Operation Manager", desc: "Cross-team visibility within an organization" },
              { role: "Team Lead", desc: "Sees own leads plus leads of all agents reporting to them" },
              { role: "Lead Manager", desc: "Manages a subset of agents with a dedicated panel" },
              { role: "Sales (Agent)", desc: "Sees and actions only leads assigned to them" }
            ].map((item, i) => (
              <Card key={i} className="bg-slate-50 border-border">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-primary">{item.role}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Connects with your stack</h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-xl shadow-sm font-semibold text-slate-700">
              <Facebook className="text-blue-600 h-5 w-5" /> Facebook
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-xl shadow-sm font-semibold text-slate-700">
              <Instagram className="text-pink-600 h-5 w-5" /> Instagram
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-xl shadow-sm font-semibold text-slate-700">
              <MessageSquare className="text-green-500 h-5 w-5" /> WhatsApp
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-xl shadow-sm font-semibold text-slate-700">
              <CreditCard className="text-blue-800 h-5 w-5" /> Razorpay
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-xl shadow-sm font-semibold text-slate-700">
              <Mail className="text-slate-600 h-5 w-5" /> SMTP
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-xl shadow-sm font-semibold text-slate-700">
              <Smartphone className="text-slate-600 h-5 w-5" /> SMS & FCM
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-xl shadow-sm font-semibold text-slate-700">
              <Database className="text-slate-600 h-5 w-5" /> REST API
            </div>
          </div>
          <Link href="/features" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Explore all capabilities <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for closing</h2>
            <p className="text-lg text-muted-foreground">Hear from the teams tracking millions of leads through Leads Rubix.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-50 border-border">
              <CardContent className="p-8">
                <div className="mb-6 text-secondary flex gap-1">
                  {[1,2,3,4,5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-lg italic mb-6">"The automated lead rotation completely changed our response times. We used to lose Facebook leads because they sat in a sheet for hours. Now agents get them instantly."</p>
                <div>
                  <div className="font-bold">Rohan Mehta</div>
                  <div className="text-sm text-muted-foreground">Sales Head</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-border">
              <CardContent className="p-8">
                <div className="mb-6 text-secondary flex gap-1">
                  {[1,2,3,4,5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-lg italic mb-6">"Having every outbound call logged automatically with GPS coordinates gives me peace of mind. I know exactly what my team is doing and where they are."</p>
                <div>
                  <div className="font-bold">Priya Sharma</div>
                  <div className="text-sm text-muted-foreground">CRM Lead at a Mumbai brokerage</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-border">
              <CardContent className="p-8">
                <div className="mb-6 text-secondary flex gap-1">
                  {[1,2,3,4,5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-lg italic mb-6">"Generating invoices and capturing Razorpay payments directly inside the lead's profile saves us hours of reconciliation. A serious upgrade."</p>
                <div>
                  <div className="font-bold">Vikram Singh</div>
                  <div className="text-sm text-muted-foreground">Director - Channel Sales</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="mb-8 bg-card border rounded-xl overflow-hidden shadow-sm">
            <AccordionItem value="item-1" className="px-6">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">Is there a free trial?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, we offer a 7-day free trial with full feature access. It's auto-enforced and you'll be prompted to upgrade once it expires, with a brief grace period to ensure no data is lost.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="px-6">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">Does it integrate with Facebook Lead Ads?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, Leads Rubix features zero-latency webhook endpoints that connect directly to your Facebook and Instagram campaigns to capture leads the second they are submitted.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="px-6">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">Can I manage multiple projects or branches?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Absolutely. Our multi-tenant structure allows a single Super Admin to oversee multiple organizations or branches, while strictly segmenting data visibility for operations managers and agents.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="text-center">
            <Link href="/contact" className="text-primary font-medium hover:underline inline-flex items-center gap-2">
              Have more questions? Contact us <ChevronRight className="h-4 w-4" />
            </Link>
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
