import { useState } from "react";
import { apiFetch } from "@/lib/apiUrl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { annotateSource } from "@/lib/utm";
import { trackEvent } from "@/lib/ab";
import { COUNTRY_DIAL_CODES } from "@/lib/countryDialCodes";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  countryCode: z.string().default("+91"),
  mobile: z.string().min(6, "6+ digits"),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface InlineLeadFormProps {
  /** Used as the `source` annotation so admin analytics can split conversion by placement. */
  placement: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  /**
   * Default message sent to /api/contact (used to prefill the message column).
   * Server requires ≥10 chars — keep this in mind when overriding.
   */
  message?: string;
  className?: string;
}

/**
 * Compact 3-field lead capture (name / email / phone) for embedding inside
 * long marketing pages. Posts to the same `/api/contact` endpoint as the full
 * contact form, with a placement tag so we can compare conversion later.
 */
export function InlineLeadForm({
  placement,
  title = "Get a 15-minute walkthrough",
  subtitle = "We'll show you exactly how Leads Rubix fits your team. No credit card needed.",
  ctaLabel = "Book my walkthrough",
  message,
  className = "",
}: InlineLeadFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", countryCode: "+91", mobile: "", website: "" },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    trackEvent("form_submit", { form_placement: placement });
    try {
      // Server requires message ≥ 10 chars — pad short overrides defensively.
      const fallbackMsg = `Inline lead via ${placement} — please contact me.`;
      const finalMsg =
        message && message.trim().length >= 10 ? message.trim() : fallbackMsg;
      const body = {
        name: values.name,
        email: values.email,
        phone: `${values.countryCode}${values.mobile}`,
        company: "(inline form)",
        message: finalMsg,
        source: annotateSource(`inline-${placement}`),
        website: values.website,
      };
      const res = await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("form_submit_success", { form_placement: placement });
      setDone(true);
      toast({
        title: "Got it — talk soon",
        description: "Our team will reach out within one business day.",
      });
      form.reset();
    } catch {
      trackEvent("form_submit_error", { form_placement: placement });
      toast({
        title: "Couldn't submit",
        description: "Please email info@leadsrubix.com and we'll respond shortly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        className={`rounded-2xl border border-border bg-card p-6 md:p-8 text-center ${className}`}
        data-testid={`inline-lead-form-${placement}-success`}
      >
        <CheckCircle2 className="size-10 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold mb-1">Thanks — we&apos;ve got it.</h3>
        <p className="text-sm text-muted-foreground">
          A specialist will be in touch within one business day. Meanwhile, you can{" "}
          <a className="underline" href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
            start a free trial
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 md:p-8 ${className}`}
      data-testid={`inline-lead-form-${placement}`}
    >
      <div className="mb-5">
        <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    autoComplete="name"
                    {...field}
                    data-testid={`input-inline-${placement}-name`}
                  />
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
                <FormLabel className="sr-only">Work email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    {...field}
                    data-testid={`input-inline-${placement}-email`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Country code</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid={`input-inline-${placement}-country`}>
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-72">
                    {COUNTRY_DIAL_CODES.map((c) => (
                      <SelectItem key={`${c.code}-${c.dial}`} value={c.dial}>
                        {c.dial} {c.code}
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
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Mobile number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{6,15}"
                    placeholder="Mobile No"
                    autoComplete="tel"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/[^\d]/g, ""))}
                    data-testid={`input-inline-${placement}-mobile`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input tabIndex={-1} autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="md:col-span-4 flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              data-testid={`btn-inline-${placement}-submit`}
            >
              {submitting ? "Sending…" : ctaLabel}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-xs text-muted-foreground mt-3">
        By submitting you agree to our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        . We&apos;ll only use your details to respond to this enquiry.
      </p>
    </div>
  );
}
