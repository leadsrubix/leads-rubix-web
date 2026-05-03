import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Announcement } from "./Announcement";
import { ReactNode } from "react";
import { StickyDemoCTA } from "@/components/marketing/StickyDemoCTA";
import { WhatsAppFab } from "@/components/marketing/WhatsAppFab";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Announcement />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyDemoCTA />
      <WhatsAppFab />
    </div>
  );
}
