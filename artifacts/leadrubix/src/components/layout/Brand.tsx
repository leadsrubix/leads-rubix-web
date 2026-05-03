import { Building2 } from "lucide-react";
import { useContent } from "@/lib/useContent";

export interface BrandIdentity {
  brandName: string;
  logoImageUrl?: string;
  footerTagline?: string;
  bottomLine?: string;
  appUrl?: string;
  signInLabel?: string;
  ctaLabel?: string;
}

export const DEFAULT_BRAND: BrandIdentity = {
  brandName: "Leads Rubix",
  logoImageUrl: "",
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

export function LogoMark({ brand, variant = "navbar", testId }: LogoProps) {
  const isFooter = variant === "footer";
  const wrapperClass = isFooter
    ? "bg-white text-[#252140] p-1.5 rounded-lg shrink-0 overflow-hidden"
    : "bg-[#252140] text-white p-1.5 rounded-lg shrink-0 overflow-hidden";
  const textClass = isFooter
    ? "font-['Fraunces'] font-medium text-2xl tracking-tight text-white whitespace-nowrap"
    : "font-['Fraunces'] font-medium text-2xl tracking-tight text-[#252140] whitespace-nowrap";

  const url = brand.logoImageUrl?.trim();

  return (
    <span className="flex items-center gap-2" data-testid={testId}>
      <span className={wrapperClass} style={{ width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {url ? (
          <img
            src={url}
            alt={brand.brandName}
            className="w-full h-full object-contain"
          />
        ) : (
          <Building2 size={24} />
        )}
      </span>
      <span className={textClass}>{brand.brandName}</span>
    </span>
  );
}
