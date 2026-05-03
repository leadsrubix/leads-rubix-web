import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Share2, Check } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { RoiCalculator } from "@/components/marketing/RoiCalculator";

const TOOL_URL = "https://leadsrubix.com/tools/response-time-calculator";

export default function ResponseTimeCalculator() {
  useSEO({
    title: "Lead response time ROI calculator — Leads Rubix",
    description:
      "Estimate the revenue lift from cutting your lead response time to under one minute. Free interactive calculator for Indian sales teams across real estate, education, BFSI and more.",
    canonical: TOOL_URL,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Lead Response Time ROI Calculator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: TOOL_URL,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://leadsrubix.com/" },
          { "@type": "ListItem", position: 2, name: "Tools", item: "https://leadsrubix.com/tools" },
          { "@type": "ListItem", position: 3, name: "Response time calculator", item: TOOL_URL },
        ],
      },
    ],
  });

  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title: "Lead response time ROI calculator",
          text: "See how much revenue you're losing to slow lead response.",
          url: TOOL_URL,
        });
        return;
      }
    } catch {
      /* fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(TOOL_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#FAF2EE] via-[#F1F1F9] to-[#E8EAF5] border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#252140]/10 text-[#252140] text-xs font-semibold tracking-wider uppercase">
            Free Tool
          </span>
          <h1 className="mt-5 font-['Fraunces'] text-4xl md:text-6xl leading-tight text-[#252140] font-medium">
            How much revenue is your slow lead response{" "}
            <span className="italic font-light">costing you?</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-[#252140]/70 max-w-2xl mx-auto">
            Plug in your monthly leads, current conversion rate and average deal value. We'll show you the
            annual revenue lift from sub-1-minute response and automated rotation — based on industry
            benchmarks.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button size="lg" onClick={handleShare} variant="outline" data-testid="btn-share-tool">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" /> Link copied
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" /> Share this calculator
                </>
              )}
            </Button>
            <Button size="lg" asChild data-testid="btn-tool-demo">
              <Link href="/demo?source=response-time-calculator">
                Get a tailored projection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <RoiCalculator />
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#252140]">
            Why response time decides who wins the lead
          </h2>
          <div className="prose max-w-none text-muted-foreground leading-relaxed space-y-4">
            <p>
              Across hundreds of Indian sales teams, leads contacted within the first minute close at
              roughly 32% higher rates than those contacted after an hour. Buyers pick the first vendor who
              responds — every minute of delay is a quoted-out lead.
            </p>
            <p>
              Most teams lose response-time minutes to four predictable failures: leads landing in shared
              inboxes, manual round-robin, agents already on calls, and after-hours leads. Round-robin
              auto-rotation, multi-channel alerts (SMS + WhatsApp + email), and after-hours overflow
              eliminate all four.
            </p>
            <p>
              The calculator above uses the conservative 32% close-rate lift figure. In practice, teams
              moving from spreadsheets see lifts of 40–60% in the first quarter — driven mostly by the
              leads that were previously dropped, not slower closes.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-6 rounded-xl border bg-white">
            <p className="text-sm text-muted-foreground">
              Want to see this on your real lead funnel? Book a 15-minute walkthrough.
            </p>
            <Button asChild data-testid="btn-tool-cta-bottom">
              <Link href="/demo?source=response-time-calculator">
                Book a demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
