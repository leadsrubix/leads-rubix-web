import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Clock, Headphones, PlayCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/lib/useSEO";
import { annotateSource } from "@/lib/utm";

const INDUSTRY_LABELS: Record<string, string> = {
  "real-estate": "real estate",
  "education": "education",
  "healthcare": "healthcare",
  "automotive": "automotive",
  "financial-services": "financial services",
  "travel": "travel",
  "saas": "SaaS",
  "manufacturing": "manufacturing",
};

function readIndustryFromQuery(): string | null {
  if (typeof window === "undefined") return null;
  const sp = new URLSearchParams(window.location.search);
  const raw = (sp.get("industry") ?? "").toLowerCase().trim();
  if (!raw) return null;
  return INDUSTRY_LABELS[raw] ? raw : null;
}

const demoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  teamSize: z.string().min(1, "Please select a team size"),
  message: z.string().min(10, "Tell us a bit about your sales process"),
  website: z.string().max(0).optional(),
});

const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"];

export default function Demo() {
  useSEO({
    title: "Book a Demo — Leads Rubix CRM",
    description:
      "See Leads Rubix in action. Book a 30-minute personalised demo with our India team — we'll walk through lead capture, routing, calling, payments and pricing configured for your industry.",
    canonical: "https://leadsrubix.com/demo",
  });

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [industrySlug] = useState<string | null>(readIndustryFromQuery);
  const industryLabel = useMemo(
    () => (industrySlug ? INDUSTRY_LABELS[industrySlug] ?? null : null),
    [industrySlug],
  );

  const defaultMessage = industryLabel
    ? `We run a ${industryLabel} sales team and want to see how Leads Rubix would handle our lead intake, routing and follow-up cadence.`
    : "";

  const form = useForm<z.infer<typeof demoSchema>>({
    resolver: zodResolver(demoSchema),
    defaultValues: { name: "", email: "", company: "", phone: "", teamSize: "", message: defaultMessage, website: "" },
  });

  useEffect(() => {
    if (defaultMessage && !form.getValues("message")) {
      form.setValue("message", defaultMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: z.infer<typeof demoSchema>) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: annotateSource(industrySlug ? `demo-page-${industrySlug}` : "demo-page"),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
      toast({
        title: "Demo request received",
        description: "Our team will reach out within one business day to schedule.",
      });
      form.reset();
    } catch {
      toast({
        title: "Couldn't send your request",
        description: "Please email hello@leadsrubix.com and we'll set up the demo.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const expect = [
    { icon: PlayCircle, title: "30-minute live walkthrough", desc: "We screen-share the actual product configured for your industry, not slides — pipeline, routing, calling, payments." },
    { icon: Headphones, title: "Tailored to your sales process", desc: "Tell us your lead sources and team structure; we'll show how Leads Rubix maps to them." },
    { icon: CalendarCheck, title: "Pricing & next steps", desc: "We'll recommend a plan, scope onboarding, and answer security & compliance questions." },
    { icon: Clock, title: "No obligation", desc: "Walk away with a free trial set up — or just the answers you came for." },
  ];

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6" data-testid="demo-pill">
            <CalendarCheck className="h-3.5 w-3.5" />
            {industryLabel ? `Personalised demo for ${industryLabel} teams` : "Personalised live demo"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" data-testid="demo-h1">
            {industryLabel ? `See Leads Rubix for ${industryLabel}` : "See Leads Rubix in action"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {industryLabel
              ? `A real product walkthrough configured for ${industryLabel} sales teams. Tell us about your pipeline and we'll tailor the demo to your workflows.`
              : "A real product walkthrough with our India team. Tell us a little about your team and we'll set up a 30-minute call within one business day."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Form */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12" data-testid="demo-success">
                      <div className="mx-auto w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="h-7 w-7 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-3">Got it — talk soon</h2>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        {industryLabel
                          ? `Our team will reach out within one business day to schedule a walkthrough tailored to ${industryLabel} sales teams.`
                          : "Our team will reach out within one business day to confirm a slot. In the meantime, you can start exploring the product."}
                      </p>
                      <Button asChild data-testid="btn-demo-trial">
                        <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
                          Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Request your demo slot</h2>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="name" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input placeholder="Your name" autoComplete="name" {...field} data-testid="input-demo-name" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Work Email</FormLabel>
                                <FormControl><Input type="email" placeholder="you@company.com" autoComplete="email" {...field} data-testid="input-demo-email" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="company" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl><Input placeholder="Your company name" autoComplete="organization" {...field} data-testid="input-demo-company" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone (with country code)</FormLabel>
                                <FormControl><Input type="tel" placeholder="+91 ..." autoComplete="tel" {...field} data-testid="input-demo-phone" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="teamSize" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sales team size</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-demo-team-size"><SelectValue placeholder="Select team size" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {TEAM_SIZES.map((size) => (
                                    <SelectItem key={size} value={size}>{size} agents</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel>What would you like to see?</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Your industry, lead sources you use (Meta, Google, aggregators, walk-ins, partners…), what's broken today, what you'd like to evaluate." className="min-h-[120px]" {...field} data-testid="input-demo-message" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          {/* honeypot */}
                          <div className="hidden" aria-hidden="true">
                            <label>Website (leave blank)
                              <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
                            </label>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            By requesting a demo you agree to our{" "}
                            <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and{" "}
                            <Link href="/terms" className="underline hover:text-foreground">Terms</Link>. We will only use your details to schedule and follow up on this demo.
                          </p>
                          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={submitting} data-testid="btn-demo-submit">
                            {submitting ? "Sending..." : "Request Demo"}
                          </Button>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Aside */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">What to expect</h3>
              {expect.map((item) => (
                <Card key={item.title} className="border-border/60">
                  <CardContent className="p-5 flex gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                Prefer to skip the call? <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Start a 7-day free trial</a> — no credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
