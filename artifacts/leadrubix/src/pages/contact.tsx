import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
import { annotateSource, buildLeadContext } from "@/lib/utm";

interface FooterContact {
  phone?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(10, "Please share a few details"),
  website: z.string().max(0).optional(),
});

export default function Contact() {
  const footer = useContent<FooterContact>("footer_contact", {});
  const phone = footer.phone?.trim() ?? "";
  useSEO({
    title: "Contact — Leads Rubix | Talk to our India sales team",
    description:
      "Get in touch with Leads Rubix. Email hello@leadsrubix.com, write to support, or send a message — our India team typically responds within one business day.",
    canonical: "https://leadsrubix.com/contact",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: "https://leadsrubix.com/contact",
        name: "Contact Leads Rubix",
        inLanguage: "en-IN",
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://leadsrubix.com/#localbusiness",
        name: "Leads Rubix Technologies Pvt. Ltd.",
        url: "https://leadsrubix.com",
        email: "hello@leadsrubix.com",
        ...(phone ? { telephone: phone } : {}),
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Lower Parel",
          addressLocality: "Mumbai",
          addressRegion: "MH",
          postalCode: "400013",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 19.076, longitude: 72.8777 },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "19:00",
          },
        ],
        areaServed: { "@type": "Country", name: "India" },
      },
    ],
  });

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", phone: "", message: "", website: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: annotateSource("contact-page"),
          ...buildLeadContext(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast({
        title: "Message received",
        description: "Thanks for reaching out — we'll respond within one business day.",
      });
      form.reset();
    } catch (err) {
      toast({
        title: "Couldn't send your message",
        description: "Please email hello@leadsrubix.com directly and we'll respond shortly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Get in touch</h1>
          <p className="text-xl text-muted-foreground">Have questions about Leads Rubix? Our India team is here to help.</p>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" autoComplete="name" {...field} data-testid="input-contact-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Work Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@company.com" autoComplete="email" {...field} data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company name" autoComplete="organization" {...field} data-testid="input-contact-company" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (with country code)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+91 ..." autoComplete="tel" {...field} data-testid="input-contact-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How can we help?</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Team size, lead sources you use, and what you'd like to solve..."
                                className="min-h-[120px]"
                                {...field}
                                data-testid="input-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* honeypot — hidden from humans, visible to naive bots */}
                      <div className="hidden" aria-hidden="true">
                        <label>Website (leave blank)
                          <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
                        </label>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        By submitting this form you agree to our{" "}
                        <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and{" "}
                        <Link href="/terms" className="underline hover:text-foreground">Terms</Link>. We will only use your details to respond to this enquiry.
                      </p>
                      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={submitting} data-testid="btn-contact-submit">
                        {submitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Reach us directly</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Sales</p>
                          <a href="mailto:hello@leadsrubix.com" className="hover:text-primary">hello@leadsrubix.com</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Support</p>
                          <a href="mailto:support@leadsrubix.com" className="hover:text-primary">support@leadsrubix.com</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Registered office</p>
                          <p>Leads Rubix Technologies Pvt. Ltd.<br />Mumbai, Maharashtra, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Support hours</h3>
                    <p className="text-muted-foreground">
                      Monday – Saturday<br />
                      10:00 AM – 7:00 PM IST
                    </p>
                    <p className="text-muted-foreground text-sm mt-3">We typically reply within one business day.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
