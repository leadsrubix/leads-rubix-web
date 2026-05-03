import { z } from "zod";

// Server-side schema for each KNOWN content key. Unknown keys still pass
// through (they fall back to the JSON editor in the admin UI).
//
// Keep this in sync with admin/lib/contentSchemas.ts on the frontend.

const HomeHero = z.object({
  eyebrow: z.string().max(200).default(""),
  headline: z.string().min(1).max(200),
  subheadline: z.string().max(600).default(""),
  primaryCtaLabel: z.string().max(60).default(""),
  secondaryCtaLabel: z.string().max(60).default(""),
});

const HomeAnnouncement = z.object({
  text: z.string().max(300).default(""),
  linkLabel: z.string().max(60).default(""),
  linkHref: z.string().max(500).default(""),
});

const FooterContact = z.object({
  legalEntity: z.string().max(200).default(""),
  addressLine: z.string().max(300).default(""),
  supportEmail: z.string().max(200).default(""),
  salesEmail: z.string().max(200).default(""),
  hours: z.string().max(200).default(""),
  // Phone in international E.164-ish format (e.g. "+91-22-XXXX-XXXX"). Used in
  // LocalBusiness JSON-LD on home + contact pages. Leave blank to omit.
  phone: z.string().max(40).default(""),
  // WhatsApp number in digits-only international form (e.g. "919876543210").
  // Used by the floating WhatsApp button. Leave blank to hide the button.
  whatsapp: z
    .string()
    .max(20)
    .regex(/^[0-9]*$/, "whatsapp must be digits only (no + or spaces)")
    .default(""),
});

const FaqItem = z.object({
  question: z.string().min(1).max(300),
  answer: z.string().min(1).max(2000),
});

const Testimonial = z.object({
  name: z.string().min(1).max(120),
  role: z.string().max(120).default(""),
  company: z.string().max(120).default(""),
  body: z.string().min(1).max(800),
});

const CaseStudy = z.object({
  tag: z.string().max(120).default(""),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(1200),
  metric1: z.object({ value: z.string().max(40), label: z.string().max(120) }).optional(),
  metric2: z.object({ value: z.string().max(40), label: z.string().max(120) }).optional(),
});

// Tracking pixels — IDs are constrained to harmless characters and short lengths
// so they can't be abused to inject script payloads even if the public CMS
// ever exposed them. Empty string disables that pixel.
const TrackingPixels = z.object({
  ga4MeasurementId: z
    .string()
    .max(40)
    .regex(/^(|G-[A-Z0-9]{4,20})$/i, "ga4MeasurementId must look like 'G-XXXXXXXX' or be blank")
    .default(""),
  fbPixelId: z
    .string()
    .max(40)
    .regex(/^[a-zA-Z0-9_-]{0,40}$/, "fbPixelId must be alphanumeric (digits, letters, _ or -)")
    .default(""),
  taboolaAccountId: z
    .string()
    .max(40)
    .regex(
      /^[a-zA-Z0-9_-]{0,40}$/,
      "taboolaAccountId must be alphanumeric (digits, letters, _ or -)",
    )
    .default(""),
  clarityProjectId: z
    .string()
    .max(20)
    .regex(
      /^[a-zA-Z0-9]{0,20}$/,
      "clarityProjectId must be alphanumeric",
    )
    .default(""),
});

const SCHEMAS: Record<string, z.ZodTypeAny> = {
  home_hero: HomeHero,
  home_announcement: HomeAnnouncement,
  footer_contact: FooterContact,
  faq_items: z.array(FaqItem).max(100),
  testimonials: z.array(Testimonial).max(60),
  case_studies: z.array(CaseStudy).max(40),
  tracking_pixels: TrackingPixels,
};

export function validateContent(
  key: string,
  value: unknown,
):
  | { ok: true; value: unknown }
  | { ok: false; error: string } {
  const schema = SCHEMAS[key];
  if (!schema) {
    // Unknown keys pass through unvalidated (they use the raw JSON editor).
    return { ok: true, value };
  }
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const path = first?.path.join(".") ?? "";
    return {
      ok: false,
      error: path ? `${path}: ${first?.message}` : first?.message ?? "Invalid value",
    };
  }
  return { ok: true, value: parsed.data };
}
