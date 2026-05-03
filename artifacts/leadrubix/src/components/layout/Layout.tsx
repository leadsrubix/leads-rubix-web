import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Announcement } from "./Announcement";
import { ReactNode, useEffect } from "react";
import { StickyDemoCTA } from "@/components/marketing/StickyDemoCTA";
import { WhatsAppFab } from "@/components/marketing/WhatsAppFab";
import { CookieConsent } from "@/components/marketing/CookieConsent";
import { TrackingPixels } from "@/components/marketing/TrackingPixels";
import { captureUtmFromUrl, captureLandingContext } from "@/lib/utm";

export function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    captureUtmFromUrl();
    captureLandingContext();
  }, []);
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
