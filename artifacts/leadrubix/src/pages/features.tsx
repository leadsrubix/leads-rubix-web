import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Users, PhoneCall, BarChart3, Building, Lock, CheckCircle2, 
  Database, CreditCard, Share2, Activity, ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/lib/useSEO";

export default function Features() {
  useSEO({
    title: "Features — Leads Rubix Real Estate CRM",
    description:
      "Lead capture, automated rotation, GPS-verified calling, bookings & Razorpay payments, role-based access, multi-org support, and analytics — every feature built for Indian real estate.",
    canonical: "https://leadsrubix.com/features",
  });

  return (
    <Layout>
      {/* Hero Section */}
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineered for Real Estate Sales</h1>
          <p className="text-xl text-muted-foreground">Every tool you need to organize your pipeline, enforce accountability, and close properties faster. No generic features—just pure performance.</p>
        </div>
      </div>

      {/* Deep Capability Sections */}
      <div className="py-12 bg-background">
        
        {/* 1. Lead Management */}
        <section className="py-20 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Complete Lead Management</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Capture leads from anywhere, manage extensive details, and completely eliminate data duplication. Keep your pipeline clean and fully actionable.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Multi-source capture:</strong> Zero-latency Facebook & Instagram Lead Ads webhooks, manual entry, or bulk CSV import for thousands at once.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>50+ data fields:</strong> Store contact details, property preferences, budgets, adset data, and 6 custom extension fields tailored to your exact needs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Transfer history:</strong> Track up to 3 previous owners when leads are reassigned, ensuring full accountability.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Configurable duplicate detection:</strong> Enforce strict rules or allow duplicates via organization-level toggles.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl -rotate-3 scale-105 z-0"></div>
                <img src="/feature-pipeline-view.png" alt="Pipeline Management View" className="relative z-10 w-full rounded-2xl shadow-xl border border-border" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Automated Lead Rotation */}
        <section className="py-20 border-b border-border/50 bg-slate-50/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Automated Lead Rotation</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Stop relying on manual distribution. Configure complex round-robin rules to instantly assign incoming leads and reassign those left untouched.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Intelligent routing:</strong> Match by lead source and up to 5 custom filter conditions per rotation rule.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Auto-reassignment:</strong> Leads not contacted within your configurable time window are automatically passed to the next agent.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Schedule-aware:</strong> Delays reassignment outside working hours, fully respecting your organization's holiday calendar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>High reliability:</strong> Powered by a robust Bull + Redis job queue for guaranteed execution.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="bg-card border shadow-lg rounded-2xl p-8 relative z-10">
                  <div className="font-bold text-lg mb-6 border-b pb-4">Rotation Rule Configurator</div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="text-sm font-medium mb-1">Trigger Source</div>
                      <div className="text-primary font-bold">Facebook Ads (Campaign: Mumbai_South)</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="text-sm font-medium mb-1">Time Limit</div>
                      <div className="text-primary font-bold">15 Minutes</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="text-sm font-medium mb-1">Action</div>
                      <div className="text-primary font-bold">Re-assign round-robin to: Group A</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Tasks & Follow-ups */}
        <section className="py-20 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Tasks & Follow-up Management</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Keep the pipeline moving with comprehensive task tracking tailored specifically for real estate workflows.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Dedicated task types:</strong> Schedule and track Calls, Meetings, and Site Visits linked directly to specific leads.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Calendar views:</strong> Visual calendar grouping tasks by date, complete with automatic overdue detection.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Unique flags:</strong> System records unique site-visit and unique meeting flags per lead to prevent metric manipulation.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Deep reporting:</strong> Drill-down task reports with detailed sales category breakdowns.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full">
                <img src="/feature-tasks-calendar.png" alt="Tasks and Calendar Interface" className="w-full rounded-2xl shadow-xl border border-border" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Call Log Tracking */}
        <section className="py-20 border-b border-border/50 bg-slate-50/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <PhoneCall className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Call Log Tracking</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Maintain complete visibility over your sales floor. Every logged call ensures agent accountability and generates data for performance analysis.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Comprehensive logging:</strong> Every outbound call records lead reference, precise duration in seconds, and timestamp.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Location verification:</strong> GPS coordinates are captured upon call logging to verify field agent locations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Callback intelligence:</strong> Mandatory call-back reason tracking integrated with the lead's current pipeline stage.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Aggregated reports:</strong> Filter call logs by agent, date range, stage, and use drill-down search to find specific interactions.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="bg-card border shadow-lg rounded-2xl p-6 relative z-10 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="font-bold text-lg">Recent Calls</div>
                    <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Live</div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Arjun Patil", dur: "1m 45s", stage: "CALLBACK", time: "2 mins ago" },
                      { name: "Neha Gupta", dur: "4m 12s", stage: "INTERESTED", time: "15 mins ago" },
                      { name: "Suresh Kumar", dur: "0m 22s", stage: "FRESH", time: "45 mins ago" }
                    ].map((call, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-bold text-sm">{call.name}</div>
                          <div className="text-xs text-muted-foreground">{call.time} • GPS Verified</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{call.dur}</div>
                          <div className="text-xs bg-slate-100 px-1.5 py-0.5 rounded mt-1">{call.stage}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Real-time Analytics */}
        <section className="py-20 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Real-time Analytics & Reporting</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Make data-driven decisions instantly with beautiful, high-performance dashboards powered by ApexCharts and Chart.js.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Core metrics:</strong> Track Stage Count and Lead Count broken down by source, date, and custom filters.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Deep insights:</strong> Access Feedback Reports, Callback Reason Reports, and Interested/Not Interested breakdowns.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Large dataset optimized:</strong> Proprietary reporting variants designed specifically to aggregate thousands of records instantly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Interactive drill-down:</strong> Click any chart segment (doughnut, bar, or trend line) to view the underlying lead records immediately.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full">
                <img src="/feature-analytics.png" alt="Analytics Dashboard Interface" className="w-full rounded-2xl shadow-xl border border-border" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Bookings & Payments */}
        <section className="py-20 border-b border-border/50 bg-slate-50/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Bookings & Payments</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Convert leads to closed deals seamlessly within the CRM. Manage transactions securely and generate paperwork automatically.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Integrated Razorpay:</strong> Process UPI, cards, and net banking. Automatic order creation and secure payment modals.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Secure verification:</strong> Iron-clad server-side HMAC-SHA256 signature verification for every transaction.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Metadata storage:</strong> Persist Razorpay order IDs, payment IDs, amounts, currencies, and receipt numbers against the booked lead.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Automated invoicing:</strong> Server-side generation of professional PDF invoices via HTML-to-PDF conversion, ready for download.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="bg-card border shadow-lg rounded-2xl p-8 relative z-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Payment Successful</h3>
                  <p className="text-muted-foreground mb-6">INR 5,00,000 Booking Token Captured</p>
                  <div className="border-t border-b py-4 mb-6 text-left space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Order ID</span><span className="font-mono">order_K8gP</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Property</span><span className="font-medium">Tower B, Apt 402</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Lead ID</span><span className="font-medium">#LD-8492</span></div>
                  </div>
                  <Button className="w-full" variant="outline">Download PDF Invoice</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Communications */}
        <section className="py-20 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Unified Communications</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Connect your existing communication stack directly to the pipeline. Trigger messages automatically and keep your team alerted.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Configurable SMS:</strong> Bring your own SMS gateway credentials. Send transactional messages configured per organization.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>SMTP Email integration:</strong> Connect Nodemailer SMTP for reliable delivery of professional HTML templates and password resets.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Mobile push:</strong> Native FCM (Firebase Cloud Messaging) integration pushes critical alerts directly to mobile clients.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>API Access:</strong> Dedicated Token management system for secure third-party integrations and webhooks.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full grid grid-cols-2 gap-4">
                <div className="bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center text-center aspect-square border">
                  <Share2 className="h-8 w-8 text-primary mb-3" />
                  <div className="font-bold">SMS Gateway</div>
                </div>
                <div className="bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center text-center aspect-square border">
                  <Share2 className="h-8 w-8 text-primary mb-3" />
                  <div className="font-bold">SMTP Mail</div>
                </div>
                <div className="bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center text-center aspect-square border">
                  <Share2 className="h-8 w-8 text-primary mb-3" />
                  <div className="font-bold">FCM Push</div>
                </div>
                <div className="bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center text-center aspect-square border">
                  <Share2 className="h-8 w-8 text-primary mb-3" />
                  <div className="font-bold">REST API</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Multi-Org & Security */}
        <section className="py-20 bg-slate-50/50 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Multi-Org & Role-Based Security</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Enterprise-grade security and hierarchical access control. Compliant with the Indian DPDP Act 2023.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Six explicit roles:</strong> Super Admin, Org Admin, Operation Manager, Team Lead, Lead Manager, and Sales Agent.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Multi-tenant architecture:</strong> A single Super Admin can oversee multiple isolated organizations, branches, and teams.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Strict hierarchies:</strong> Reporting hierarchies implicitly drive team-level lead visibility, preventing data theft. Branch-level permissions lock agents to specific locations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                    <span className="text-foreground"><strong>Secure infrastructure:</strong> Firebase Authentication, backend JWT access tokens, HTTPS only, helmet.js, and MongoDB Atlas encrypted at rest.</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="space-y-3">
                  {['Super Admin', 'Organization Admin', 'Operation Manager', 'Team Lead', 'Lead Manager', 'Sales Agent'].map((role, i) => (
                    <div key={role} className="bg-card border rounded-lg p-4 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Lock className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="font-bold flex-1">{role}</div>
                      <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-medium">Level {i+1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* CTA Strip */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">See all of this in action</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg font-bold" asChild data-testid="btn-features-cta">
              <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild data-testid="btn-features-sales">
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
