import { useContent } from "@/lib/useContent";
import { ShieldCheck } from "lucide-react";

interface BadgeItem {
  label: string;
  caption?: string;
  src?: string;
  href?: string;
}

interface TrustBadgesContent {
  heading?: string;
  items: BadgeItem[];
}

const DEFAULT: TrustBadgesContent = {
  heading: "Recognised, audited, compliant",
  items: [
    { label: "DPDP 2023", caption: "India data-protection compliant" },
    { label: "PCI-DSS", caption: "Payments via Razorpay (Level 1)" },
    { label: "AWS Hosted", caption: "Elastic Beanstalk · Mumbai region" },
    { label: "MongoDB Atlas", caption: "Encrypted at rest · daily backups" },
  ],
};

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function TrustBadges({ className = "" }: { className?: string }) {
  const cms = useContent<TrustBadgesContent>("trust_badges", DEFAULT);
  const items = (cms.items && cms.items.length > 0 ? cms.items : DEFAULT.items).slice(0, 12);

  return (
    <section className={`py-12 md:py-16 bg-white border-y ${className}`} data-testid="trust-badges">
      <div className="container mx-auto px-4">
        {cms.heading ? (
          <h2 className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 font-semibold">
            {cms.heading}
          </h2>
        ) : null}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {items.map((b, i) => {
            const inner = (
              <div className="h-full p-5 rounded-xl border border-border bg-card hover:border-[#252140]/40 transition-colors flex flex-col items-center text-center gap-2">
                {b.src ? (
                  <img
                    src={b.src}
                    alt={b.label}
                    className="h-10 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-[#252140]/10 text-[#252140] flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                )}
                <div className="font-bold text-sm text-[#252140] mt-1">{b.label}</div>
                {b.caption ? (
                  <div className="text-xs text-muted-foreground leading-snug">{b.caption}</div>
                ) : null}
              </div>
            );
            const testId = `trust-badge-${b.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            if (b.href && b.href.trim()) {
              return (
                <a
                  key={i}
                  href={b.href}
                  target={isExternal(b.href) ? "_blank" : undefined}
                  rel={isExternal(b.href) ? "noopener noreferrer" : undefined}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  data-testid={testId}
                >
                  {inner}
                </a>
              );
            }
            return (
              <div key={i} data-testid={testId}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
