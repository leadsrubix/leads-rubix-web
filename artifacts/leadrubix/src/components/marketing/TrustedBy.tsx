import { useContent } from "@/lib/useContent";

interface LogoItem {
  name: string;
  /** Optional image URL. If omitted, the company name is rendered as a styled wordmark. */
  src?: string;
}

interface TrustedByContent {
  heading?: string;
  logos: LogoItem[];
}

const DEFAULT_LOGOS: LogoItem[] = [
  { name: "Horizon Developers" },
  { name: "Skyline Realty" },
  { name: "MeritEdu" },
  { name: "WellCare Hospitals" },
  { name: "BlueLeaf Capital" },
  { name: "Vista Motors" },
];

export function TrustedBy({ heading, className = "" }: { heading?: string; className?: string }) {
  const cms = useContent<TrustedByContent>("trusted_by", { heading, logos: DEFAULT_LOGOS });
  const items = (cms.logos && cms.logos.length > 0 ? cms.logos : DEFAULT_LOGOS).slice(0, 8);
  const text = cms.heading ?? heading ?? "Trusted by sales teams across India";

  return (
    <section className={`py-10 md:py-14 border-y border-border bg-slate-50/60 dark:bg-slate-900/30 ${className}`} data-testid="trusted-by">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-semibold">
          {text}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4">
          {items.map((logo) => (
            <div
              key={logo.name}
              className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              data-testid={`trusted-logo-${logo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-7 md:h-8 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="text-base md:text-lg font-bold tracking-tight text-foreground/70">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
