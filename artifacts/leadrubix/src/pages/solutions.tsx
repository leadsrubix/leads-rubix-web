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

export default function Solutions() {
  const sections = [
    {
      id: "brokerages",
      title: "For Brokerages",
      icon: Building2,
      description: "Manage high-volume lead pipelines across multiple teams and branches without losing a single prospect.",
      features: [
        "Multi-source lead capture from Facebook, Instagram, and CSV",
        "Automated lead rotation across available agents",
        "Role-based access control for team leads and managers",
        "Comprehensive calling reports and performance tracking",
        "Customizable pipeline stages (FRESH → BOOKED)"
      ],
      image: "/solutions-brokerage.png",
      reversed: false
    },
    {
      id: "developers",
      title: "For Property Developers",
      icon: Construction,
      description: "Track project-level performance, manage bookings, and handle multi-organization structures from a single pane of glass.",
      features: [
        "Project-level lead tracking and attribution",
        "Integrated property bookings with Razorpay",
        "Automated PDF invoice generation",
        "Multi-org and multi-branch support",
        "Complete transaction history and audit trails"
      ],
      image: "/solutions-developer.png",
      reversed: true
    },
    {
      id: "channel-partners",
      title: "For Channel Partners",
      icon: Handshake,
      description: "Seamlessly collaborate with developers while maintaining control over your own lead data and agent permissions.",
      features: [
        "Lead transfer between agents with full history",
        "Branch-level visibility permissions",
        "Custom field mapping for industry-specific data",
        "Drill-down search and advanced filtering",
        "Automated duplicate detection rules"
      ],
      image: "/solutions-channel.png",
      reversed: false
    },
    {
      id: "sales-teams",
      title: "For Sales Teams & Agents",
      icon: UserCircle,
      description: "Focus on closing deals with tools that organize your day, track your calls, and ensure you never miss a follow-up.",
      features: [
        "Task management for calls, meetings, and site visits",
        "Automated call logging with duration and GPS",
        "Clear visibility into your personal pipeline",
        "FCM push notifications on mobile",
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
            Solutions for every part of real estate sales
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Built for the people who actually sell real estate</h1>
          <p className="text-xl text-muted-foreground">From individual agents to enterprise developers, Leads Rubix provides the exact tools you need to organize your pipeline and close more deals.</p>
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
