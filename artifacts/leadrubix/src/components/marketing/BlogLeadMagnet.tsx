import { InlineLeadForm } from "./InlineLeadForm";

interface BlogLeadMagnetProps {
  /** Slug of the post the magnet is mounted on, used as the placement tag. */
  slug: string;
  /** Headline shown on the card. */
  title?: string;
  /** Sub-headline / value proposition. */
  subtitle?: string;
  /** Button label. */
  ctaLabel?: string;
}

/**
 * In-article lead-magnet card. Wraps `InlineLeadForm` with a softer,
 * "download the playbook" framing rather than the booking-a-demo framing.
 * Placement is tagged so admin analytics can attribute conversions to a
 * specific blog post.
 */
export function BlogLeadMagnet({
  slug,
  title = "Get the WhatsApp + lead-routing playbook",
  subtitle = "We'll email you the templates and rule examples we set up with our highest-converting Indian customers.",
  ctaLabel = "Email me the playbook",
}: BlogLeadMagnetProps) {
  return (
    <div className="not-prose my-10 rounded-xl border bg-gradient-to-br from-[#252140]/[0.04] to-transparent p-6 md:p-8">
      <InlineLeadForm
        placement={`blog-${slug}`}
        title={title}
        subtitle={subtitle}
        ctaLabel={ctaLabel}
        message={`Lead magnet request from /blog/${slug}. Please send the playbook.`}
      />
    </div>
  );
}
