import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, X } from "lucide-react";

const DISMISS_KEY = "leadsrubix-sticky-cta-dismissed";

export function StickyDemoCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      /* ignore */
    }
    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function close() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed z-40 bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-md md:left-6 md:translate-x-0 md:w-auto"
      data-testid="sticky-demo-cta"
    >
      <div className="flex items-center gap-3 rounded-full bg-[#252140] dark:bg-[#16142B] text-white pl-4 pr-2 py-2 shadow-2xl border border-white/10">
        <span className="hidden sm:inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
        <span className="text-sm font-medium flex-1 truncate">
          See Leads Rubix live — 15 min demo
        </span>
        <Link
          href="/demo"
          className="inline-flex items-center gap-1 bg-white text-[#252140] hover:bg-[#F1F1F9] text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          data-testid="sticky-demo-cta-link"
        >
          Book <ArrowRight className="h-3 w-3" />
        </Link>
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="h-7 w-7 inline-flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10"
          data-testid="sticky-demo-cta-close"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
