import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Lock, 
  Server, 
  Database, 
  CreditCard, 
  FileCheck, 
  Users, 
  History,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

import { useSEO } from "@/lib/useSEO";

export default function Security() {
  useSEO({
    title: "Security — Leads Rubix | DPDP-compliant, encrypted, role-aware",
    description:
      "Leads Rubix is built on Firebase Auth, MongoDB Atlas, AWS Elastic Beanstalk, with Razorpay HMAC-SHA256 verified payments, role-based access control, and DPDP 2023 compliance.",
    canonical: "https://leadsrubix.com/security",
  });

  const sections = [
    {
      title: "Authentication & Access",
      icon: Users,
      content: "Powered by Google-grade Firebase Authentication. API calls are secured via JWT auth with x-access-token headers. Our 6-tier role-based access system (Super Admin down to Sales Agent) is enforced strictly on both the frontend and backend, supplemented by branch-level permissions to ensure users only see what they should."
    },
    {
      title: "Data Protection",
      icon: Database,
      content: "Your data is stored securely in MongoDB Atlas, fully encrypted at rest. All data transit happens over HTTPS. We utilize Firebase Storage for secure file handling and provide password resets exclusively via secure, time-limited email links."
    },
    {
      title: "Payment Security",
      icon: CreditCard,
      content: "We process payments via Razorpay with rigorous security. Razorpay key secrets are never exposed to the frontend. Every transaction undergoes server-side HMAC-SHA256 signature verification to prevent tampering. Razorpay ensures complete PCI-DSS compliance."
    },
    {
      title: "Operational Security",
      icon: Shield,
      content: "Our Node.js backend implements Helmet.js for secure HTTP headers and rate limiting to prevent abuse. We enforce strict server-side input validation, use MongoDB parameterized queries to prevent injections, and maintain structured audit logging via Winston."
    },
    {
      title: "Compliance",
      icon: FileCheck,
      content: "Fully compliant with the Digital Personal Data Protection Act (DPDP) 2023. You retain full ownership of your lead data, while Leads Rubix acts as the secure custodian. We ensure data residency within India where required and provide exportable data upon request."
    },
    {
      title: "Reliability",
      icon: Server,
      content: "Built on redundant infrastructure using AWS Elastic Beanstalk for auto-scaling and Firebase Hosting's global CDN. MongoDB Atlas provides managed, automated daily backups to ensure your data is never lost due to hardware failure."
    }
  ];

  const trustSignals = [
    "Encrypted in transit",
    "Role-based access",
    "DPDP 2023 compliant",
    "Daily backups",
    "Server-verified payments",
    "Audit logging"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-6">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Built for trust. Designed for scale.</h1>
          <p className="text-xl text-slate-400">Enterprise-grade security and compliance for Indian real estate data.</p>
        </div>
      </section>

      {/* Trust Signals Row */}
      <section className="py-8 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustSignals.map((signal, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300 font-medium text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <Card key={idx} className="border border-border/60 hover:shadow-md transition-all">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>Our trusted sub-processors include Google Firebase, MongoDB Atlas, Amazon Web Services (AWS), and Razorpay.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Have a security questionnaire?</h2>
          <p className="text-lg text-muted-foreground mb-8">Our enterprise sales and security team is ready to answer any detailed technical or compliance questions you may have.</p>
          <Button size="lg" asChild data-testid="btn-security-contact">
            <Link href="/contact">Talk to our team <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
