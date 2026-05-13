import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Announcement } from "./Announcement";
import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { StickyDemoCTA } from "@/components/marketing/StickyDemoCTA";
import { WhatsAppFab } from "@/components/marketing/WhatsAppFab";
import { CookieConsent } from "@/components/marketing/CookieConsent";
import { TrackingPixels } from "@/components/marketing/TrackingPixels";
import { captureUtmFromUrl, captureLandingContext } from "@/lib/utm";
import { useContent } from "@/lib/useContent";

type BrandIdentity = { faviconUrl?: string };
type SeoGlobal = { themeColor?: string };

function setLink(rel: string, href: string, type?: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
  if (type) link.type = type;
}

function setMetaName(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function Layout({ children }: { children: ReactNode }) {
  const [pathname] = useLocation();

  useEffect(() => {
    captureUtmFromUrl();
    captureLandingContext();
  }, []);

  // Scroll to top on every route change so footer/menu navigation always lands
  // at the top of the new page instead of inheriting the scroll position from
  // the previous page.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return; // honour explicit #anchor jumps
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  const brand = useContent<BrandIdentity>("brand_identity", {});
  const seo = useContent<SeoGlobal>("seo_global", {});

  useEffect(() => {
    if (brand?.faviconUrl) {
      const url = brand.faviconUrl;
      const ext = url.split(".").pop()?.toLowerCase();
      const type =
        ext === "svg" ? "image/svg+xml" :
        ext === "ico" ? "image/x-icon" :
        ext === "png" ? "image/png" :
        ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
        undefined;
      setLink("icon", url, type);
      setLink("apple-touch-icon", url);
    }
  }, [brand?.faviconUrl]);

  useEffect(() => {
    setMetaName("theme-color", seo?.themeColor || "#252140");
  }, [seo?.themeColor]);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        data-testid="link-skip-to-main"
      >
        Skip to main content
      </a>
      <Announcement />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyDemoCTA />
      <WhatsAppFab />
      <CookieConsent />
      <TrackingPixels />
    </div>
  );
}
