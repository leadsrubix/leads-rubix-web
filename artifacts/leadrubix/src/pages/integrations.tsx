import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  BellRing, 
  CreditCard, 
  FileText, 
  Key, 
  Database, 
  Globe, 
  ArrowRight,
  Blocks,
  FileDown,
  Building,
  Home,
  Phone,
  Search,
  Briefcase
} from "lucide-react";
import { useSEO } from "@/lib/useSEO";

export default function Integrations() {
  useSEO({
    title: "Integrations — Leads Rubix | Facebook, Instagram, Razorpay & more",
    description:
      "Native integrations with Facebook & Instagram Lead Ads, Razorpay payments, SMTP & SMS gateways, REST API, Socket.IO, and Firebase Cloud Messaging push notifications.",
    canonical: "https://leadsrubix.com/integrations",
  });
  const categories = [
    {
      title: "Lead Sources",
      description: "Capture leads automatically with zero-latency webhooks.",
      items: [
        { name: "Facebook Lead Ads", icon: Facebook, status: "live", desc: "Direct webhook endpoint integration" },
        { name: "Instagram Lead Ads", icon: Instagram, status: "live", desc: "Unified social media pipeline" },
        { name: "99 Acres", icon: Building, status: "live", desc: "Real estate property leads from 99Acres" },
        { name: "MagicBricks", icon: Building, status: "live", desc: "Residential & commercial property leads" },
        { name: "Housing.com", icon: Home, status: "live", desc: "Property marketplace lead integration" },
        { name: "JustDial", icon: Phone, status: "live", desc: "Local business directory leads" },
        { name: "Sulekha", icon: Search, status: "live", desc: "Service provider lead marketplace" },
        { name: "Website", icon: Globe, status: "live", desc: "Leads from contact forms on your website" },
        { name: "CSV Import", icon: FileDown, status: "live", desc: "Bulk import thousands of leads at once" },
        { name: "Webhook API", icon: Blocks, status: "live", desc: "Custom endpoints for any source" },
        { name: "LinkedIn Lead Ads", icon: Linkedin, status: "coming soon", desc: "Professional network capture" },
        { name: "WhatsApp Business", icon: MessageSquare, status: "coming soon", desc: "Direct chat integration" },

      ]
    },
    {
      title: "Communications",
      description: "Reach your prospects where they are.",
      items: [
        { name: "SMS Gateway", icon: MessageSquare, status: "live", desc: "Configurable per organization" },
        { name: "SMTP Email", icon: Mail, status: "live", desc: "Powered by Nodemailer" },
        { name: "FCM Push", icon: Smartphone, status: "live", desc: "Mobile notifications for agents" },
        { name: "In-app Alerts", icon: BellRing, status: "live", desc: "Real-time socket notifications" },
      ]
    },
    {
      title: "Payments",
      description: "Secure property bookings and transactions.",
      items: [
        { name: "Razorpay Checkout", icon: CreditCard, status: "live", desc: "UPI, cards, and net banking" },
        { name: "Server Signatures", icon: Key, status: "live", desc: "HMAC-SHA256 verification" },
        { name: "PDF Invoices", icon: FileText, status: "live", desc: "Automated document generation" },
      ]
    },
    {
      title: "Developer & Custom",
      description: "Extend Leads Rubix to fit your unique needs.",
      items: [
        { name: "API Tokens", icon: Key, status: "live", desc: "Secure third-party access" },
        { name: "Custom Fields", icon: Database, status: "live", desc: "Industry-specific column headers" },
        { name: "Master Data", icon: Globe, status: "live", desc: "Country/State/City routing" },
        { name: "REST API", icon: Blocks, status: "live", desc: "Comprehensive programmatic access" },
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Connects to the tools your sales floor already uses</h1>
          <p className="text-xl text-muted-foreground">10+ integrations with real-time data flow. Capture leads, send communications, and process payments without leaving your CRM.</p>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col gap-20">
            {categories.map((category, idx) => (
              <div key={idx} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                  <p className="text-lg text-muted-foreground">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, i) => (
                    <Card key={i} className="border border-border/60 hover:shadow-md transition-shadow relative overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/5 border flex items-center justify-center">
                            <item.icon className="h-6 w-6 text-foreground" />
                          </div>
                          {item.status === "coming soon" && (
                            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none hover:bg-secondary/20 font-medium">Coming Soon</Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50 border-y">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How integrations work</h2>
            <p className="text-lg text-muted-foreground">Set up in minutes. Let automation handle the rest.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-border z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-background border-4 border-slate-50 flex items-center justify-center text-2xl font-bold shadow-sm mb-6 text-primary">1</div>
              <h3 className="text-xl font-bold mb-2">Configure</h3>
              <p className="text-muted-foreground">Add your API keys or webhook URLs in the Integration panel.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-background border-4 border-slate-50 flex items-center justify-center text-2xl font-bold shadow-sm mb-6 text-primary">2</div>
              <h3 className="text-xl font-bold mb-2">Receive</h3>
              <p className="text-muted-foreground">Webhooks instantly receive events and parse data into MongoDB.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-background border-4 border-slate-50 flex items-center justify-center text-2xl font-bold shadow-sm mb-6 text-primary">3</div>
              <h3 className="text-xl font-bold mb-2">Automate</h3>
              <p className="text-muted-foreground">Leads enter the pipeline and automated round-robin rotation kicks in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to connect your stack?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Get access to all our live integrations and start organizing your pipeline today.</p>
          <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold" asChild data-testid="btn-integrations-cta">
            <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
