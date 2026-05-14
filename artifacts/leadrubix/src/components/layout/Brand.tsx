import { Building2 } from "lucide-react";
import { useContent } from "@/lib/useContent";
import { useTheme } from "@/lib/useTheme";

export interface BrandIdentity {
  brandName: string;
  /** Default / legacy single-logo URL. Used as fallback when light/dark
   *  variants are not configured. */
  logoImageUrl?: string;
  /** Logo shown in light mode (e.g. dark-coloured logo on white background). */
  logoLightUrl?: string;
  /** Logo shown in dark mode (e.g. light-coloured logo on dark background). */
  logoDarkUrl?: string;
  footerTagline?: string;
  bottomLine?: string;
  appUrl?: string;
  signInLabel?: string;
  ctaLabel?: string;
  /** Cal.com booking URL (e.g. https://cal.com/leadsrubix/30min). When set,
   *  the /demo page swaps the contact form for an embedded calendar. */
  calBookingUrl?: string;
}

export const DEFAULT_BRAND: BrandIdentity = {
  brandName: "Leads Rubix",
  logoImageUrl: "/leads-rubix-favicon.png",
  logoLightUrl: "/leads-rubix-favicon.png",
  logoDarkUrl: "/leads-rubix-favicon.png",
  footerTagline:
    "The purpose-built CRM for India's high-velocity sales teams — across real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing. Capture, manage and convert leads from first contact to closed-won.",
  bottomLine: "Made in India  ·  Built for India's high-velocity sales teams",
  appUrl: "https://app.leadsrubix.com/",
  signInLabel: "Sign In",
  ctaLabel: "Start Free Trial",
};

export function useBrand(): BrandIdentity {
  return useContent<BrandIdentity>("brand_identity", DEFAULT_BRAND);
}

interface LogoProps {
  brand: BrandIdentity;
  variant?: "navbar" | "footer";
  testId?: string;
}

/** Returns the appropriate logo URL for the active theme, falling back to the
 *  legacy single `logoImageUrl` field if the theme-specific one is empty. */
function pickLogoUrl(brand: BrandIdentity, isDark: boolean): string {
  const themed = isDark ? brand.logoDarkUrl : brand.logoLightUrl;
  return (
    (themed && themed.trim()) ||
    (brand.logoImageUrl && brand.logoImageUrl.trim()) ||
    "/leads-rubix-favicon.png"
  );
}

export function LogoMark({ brand, variant = "navbar", testId }: LogoProps) {
  const { theme } = useTheme();
  // The footer always sits on a dark background in this design, so use the
  // dark-mode logo there regardless of the page-level theme.
  const isDark = variant === "footer" ? true : theme === "dark";
  const url = pickLogoUrl(brand, isDark);

  return (
    <span className="flex items-center" data-testid={testId}>
      {url ? (
        <img
          src={url}
          alt={brand.brandName}
          className="h-9 w-auto object-contain"
          style={{ maxHeight: 40 }}
        />
      ) : (
        <Building2 size={28} className={variant === "footer" ? "text-white" : "text-[#252140]"} />
      )}
    </span>
  );
}
