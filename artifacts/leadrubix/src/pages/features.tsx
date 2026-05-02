import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, PhoneCall, BarChart3, Building, Lock, CheckCircle2, ShieldCheck, Mail, Database, CreditCard, Share2, Activity } from "lucide-react";

export default function Features() {
  const capabilityAreas = [
    {
      title: "Lead Management",
      icon: Database,
      description: "Capture leads from anywhere. Support for Facebook & Instagram Lead Ads webhooks, bulk CSV imports, and manual entry. Track up to 50+ built-in fields and 6 custom fields. Automatic duplicate detection prevents data chaos, and detailed transfer history tracks up to 3 prior owners."
    },
    {
      title: "Automated Lead Rotation",
      icon: Users,
      description: "Stop relying on manual distribution. Configure round-robin rules to instantly assign incoming leads to the right agents based on availability. Set thresholds to cap leads per agent, keeping workloads balanced and response times low."
    },
    {
      title: "Task & Follow-up Management",
      icon: Activity,
      description: "Keep the pipeline moving with comprehensive task tracking for calls, meetings, and site visits. Features a built-in calendar view and overdue detection so nothing slips through the cracks."
    },
    {
      title: "Call Log Tracking",
      icon: PhoneCall,
      description: "Maintain complete visibility over your sales floor. Every logged call records the duration, exact timestamp, precise GPS coordinates, and call-back reasons for accountability and performance analysis."
    },
    {
      title: "Real-time Analytics",
      icon: BarChart3,
      description: "Make data-driven decisions instantly. Access dashboards detailing stage counts, team calling reports, customer feedback metrics, and drill-down search capabilities to isolate specific performance data."
    },
    {
      title: "Bookings & Payments",
      icon: CreditCard,
      description: "Convert leads to closed deals seamlessly. Integrated Razorpay support for token and down payments. Automatically generate and distribute professional PDF invoices directly from the CRM."
    },
    {
      title: "Role-based Access",
      icon: Lock,
      description: "Enterprise-grade security built for property teams. Six distinct, customizable roles (from Super Admin to Sales Agent) ensure tight control over data visibility, pipeline access, and administrative functions."
    },
    {
      title: "Integrations",
      icon: Share2,
      description: "Connect your existing stack. Direct integration with Facebook/Instagram Lead Ads for zero-latency capture. Built-in SMS gateways and SMTP email provider connections for unified communications."
    },
    {
      title: "Multi-organization Support",
      icon: Building,
      description: "For large brokerages and developers running multiple projects or offices. Isolate pipelines, restrict user views to specific orgs, and roll up reports to the master level seamlessly."
    }
  ];

  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineered for Real Estate Sales</h1>
          <p className="text-xl text-muted-foreground">Every tool you need to organize your pipeline, enforce accountability, and close properties faster. No generic features—just pure performance.</p>
        </div>
      </div>

      <div className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilityAreas.map((area, i) => (
              <Card key={i} className="border border-border/60 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <area.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}