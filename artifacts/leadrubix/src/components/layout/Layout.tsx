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

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    captureUtmFromUrl();
    captureLandingContext();
  }, []);

  // Scroll to top on route change so footer / nav links don't keep the
  // previous page's scroll offset (a common SPA gotcha). If the URL contains
  // a hash, jump to that element instead.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
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
