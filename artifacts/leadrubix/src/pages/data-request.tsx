import { Layout } from "@/components/layout/Layout";
import { apiFetch } from "@/lib/apiUrl";
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
import { useState } from "react";
import { useSEO } from "@/lib/useSEO";
import { ShieldCheck, FileText, Trash2, Edit, BellOff } from "lucide-react";

const REQUEST_TYPES = [
  { value: "export", label: "Export my data", icon: FileText },
  { value: "correction", label: "Correct my data", icon: Edit },
  { value: "deletion", label: "Delete my data", icon: Trash2 },
  { value: "consent_withdrawal", label: "Withdraw consent", icon: BellOff },
] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  type: z.enum(["export", "correction", "deletion", "consent_withdrawal"]),
  details: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
});

export default function DataRequest() {
  useSEO({
    title: "Data Subject Request — Leads Rubix",
    description:
      "Exercise your rights under India's Digital Personal Data Protection Act (DPDP). Request a copy of your data, correct it, delete it, or withdraw consent.",
    canonical: "https://leadsrubix.com/privacy/data-request",
  });

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", type: "export", details: "", website: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setSubmitting(true);
    try {
      const res = await apiFetch("/api/privacy/data-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
      toast({
        title: "Request received",
        description: "We will respond within 30 days as required by the DPDP Act.",
      });
      form.reset();
    } catch {
      toast({
        title: "Couldn't send your request",
        description: "Please email privacy@leadsrubix.com directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <ShieldCheck className="h-3.5 w-3.5" /> DPDP Act 2023, India
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" data-testid="data-request-h1">
            Data subject request
          </h1>
          <p className="text-xl text-muted-foreground">
            Under India's Digital Personal Data Protection Act, 2023, you have the right to access, correct, or delete your personal data, and to withdraw consent at any time. Use this form to file a request.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {submitted ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Request received</h2>
                <p className="text-muted-foreground">
                  Our Data Protection Officer will respond to the email address you provided within 30 days, as required by Section 13 of the DPDP Act.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input data-testid="input-data-request-name" {...field} />
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
                          <FormLabel>Email address (the one we hold for you)</FormLabel>
                          <FormControl>
                            <Input type="email" data-testid="input-data-request-email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Request type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-data-request-type">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {REQUEST_TYPES.map((t) => (
                                <SelectItem key={t.value} value={t.value}>
                                  {t.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional details (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="If correcting data, what should it say? If withdrawing consent, for which processing?"
                              data-testid="input-data-request-details"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <input type="text" {...form.register("website")} className="hidden" tabIndex={-1} aria-hidden="true" />
                    <Button type="submit" size="lg" className="w-full" disabled={submitting} data-testid="button-data-request-submit">
                      {submitting ? "Sending…" : "Submit request"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We may ask you to verify your identity before fulfilling certain requests. Required by DPDP Act, Section 13(2).
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 p-6 rounded-xl bg-slate-50 border">
            <h3 className="font-semibold mb-2">Other ways to reach us</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Email our Data Protection Officer: <a href="mailto:privacy@leadsrubix.com" className="text-primary hover:underline">privacy@leadsrubix.com</a></li>
              <li>Postal: Leads Rubix Software Pvt. Ltd., India (full address on the <a href="/contact" className="text-primary hover:underline">contact page</a>)</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
