import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "per user/month",
      desc: "Perfect for small brokerages getting started with structured sales.",
      features: [
        "Up to 5 Users",
        "Facebook & Instagram Webhooks",
        "Basic Call Logging",
        "Standard Pipeline",
        "Email Support",
      ],
      cta: "Start Free Trial",
      href: "https://app.leadsrubix.com/",
      highlight: false
    },
    {
      name: "Growth",
      price: "₹1,499",
      period: "per user/month",
      desc: "For growing teams that need automation and deep analytics.",
      features: [
        "Up to 20 Users",
        "Automated Lead Rotation",
        "GPS Call Tracking",
        "Custom Lead Pipeline",
        "Booking & Razorpay Integration",
        "Priority Support",
      ],
      cta: "Start Free Trial",
      href: "https://app.leadsrubix.com/",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "billed annually",
      desc: "For large developers needing multi-org structure and dedicated support.",
      features: [
        "Unlimited Users",
        "Multi-Organization Support",
        "Custom Role Definitions",
        "Advanced Analytics & API Access",
        "Dedicated Account Manager",
        "On-premise deployment options",
      ],
      cta: "Contact Sales",
      href: "/contact",
      highlight: false
    }
  ];

  return (
    <Layout>
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing</h1>
            <p className="text-xl text-muted-foreground">No hidden fees. No complicated tiers. Just pure value for your sales team.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-2xl border ${plan.highlight ? 'border-primary shadow-xl bg-primary text-primary-foreground' : 'border-border bg-card shadow-sm'}`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.highlight ? 'text-secondary' : 'text-primary'}`} />
                      <span className={plan.highlight ? 'text-primary-foreground/90' : 'text-muted-foreground'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  className="w-full h-12 text-lg" 
                  variant={plan.highlight ? "secondary" : "default"}
                  data-testid={`btn-pricing-${plan.name.toLowerCase()}`}
                >
                  {plan.href.startsWith('http') ? (
                    <a href={plan.href} target="_blank" rel="noopener noreferrer">{plan.cta}</a>
                  ) : (
                    <Link href={plan.href}>{plan.cta}</Link>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
