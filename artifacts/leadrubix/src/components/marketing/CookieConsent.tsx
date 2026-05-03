import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { X } from "lucide-react";

const STORAGE_KEY = "lr_cookie_consent_v1";

interface ConsentRecord {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(record: ConsentRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* ignore */
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  function decide(a: boolean, m: boolean) {
    writeConsent({ essential: true, analytics: a, marketing: m, decidedAt: new Date().toISOString() });
    try {
      window.dispatchEvent(new Event("lr-cookie-consent-changed"));
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  function acceptAll() {
    decide(true, true);
  }
  function rejectAll() {
    decide(false, false);
  }
  function saveCustom() {
    decide(analytics, marketing);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      data-testid="cookie-consent"
      className="fixed inset-x-0 bottom-0 z-50 px-2 sm:px-4 pb-2 sm:pb-4 pointer-events-none safe-bottom"
    >
      <div className="mx-auto max-w-3xl pointer-events-auto bg-card text-card-foreground border border-border rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-5 md:p-6 relative">
        <button
          type="button"
          aria-label="Dismiss cookie banner"
          className="absolute top-2 right-2 h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
          onClick={rejectAll}
          data-testid="btn-cookie-dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Mobile-compact view — single line + 2 buttons. Visible only on small screens. */}
        <div className="sm:hidden pr-9">
          <p className="text-xs text-muted-foreground leading-snug mb-2.5">
            We use cookies to improve your experience.{" "}
            <Link href="/cookies" className="underline hover:text-foreground">
              Details
            </Link>
            .
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={rejectAll}
              className="flex-1 h-9 text-xs"
              data-testid="btn-cookie-reject"
            >
              Reject
            </Button>
            <Button
              size="sm"
              onClick={acceptAll}
              className="flex-1 h-9 text-xs"
              data-testid="btn-cookie-accept"
            >
              Accept all
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setShowCustom((s) => !s)}
            className="mt-2 text-[11px] text-muted-foreground underline"
            data-testid="btn-cookie-customise"
          >
            {showCustom ? "Hide options" : "Customise"}
          </button>
          {showCustom && (
            <div
              className="mt-3 pt-3 border-t border-border space-y-2"
              data-testid="cookie-custom"
            >
              <label className="flex items-start gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5"
                  data-testid="check-cookie-analytics"
                />
                <span>
                  <span className="block font-semibold">Analytics</span>
                  <span className="block text-muted-foreground">Anonymous usage stats.</span>
                </span>
              </label>
              <label className="flex items-start gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-0.5"
                  data-testid="check-cookie-marketing"
                />
                <span>
                  <span className="block font-semibold">Marketing</span>
                  <span className="block text-muted-foreground">Ad personalisation.</span>
                </span>
              </label>
              <Button
                size="sm"
                onClick={saveCustom}
                className="w-full h-9 text-xs mt-1"
                data-testid="btn-cookie-save"
              >
                Save choices
              </Button>
            </div>
          )}
        </div>

        {/* Tablet & desktop view — full text + inline action row. */}
        <div className="hidden sm:flex sm:flex-col gap-4">
          <div>
            <p className="font-semibold text-base mb-1">We use cookies</p>
            <p className="text-sm text-muted-foreground">
              We use essential cookies to make this site work. With your consent we'll also use
              analytics and marketing cookies to improve our content and measure campaigns. Read
              our <Link href="/cookies" className="underline hover:text-foreground">Cookie Policy</Link>{" "}
              and <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>{" "}
              for details. You can change your choice anytime from the Cookie Policy page.
            </p>
          </div>

          {showCustom && (
            <div className="grid sm:grid-cols-3 gap-3 pt-2 border-t border-border" data-testid="cookie-custom-desktop">
              <label className="flex items-start gap-3 cursor-not-allowed opacity-80">
                <input type="checkbox" checked readOnly className="mt-1" />
                <span>
                  <span className="block font-semibold text-sm">Essential</span>
                  <span className="block text-xs text-muted-foreground">Required for site to function. Always on.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-semibold text-sm">Analytics</span>
                  <span className="block text-xs text-muted-foreground">Anonymous usage stats to help us improve.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-semibold text-sm">Marketing</span>
                  <span className="block text-xs text-muted-foreground">Personalisation and measurement of ad campaigns.</span>
                </span>
              </label>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-end">
            {showCustom ? (
              <Button size="sm" onClick={saveCustom}>
                Save choices
              </Button>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setShowCustom(true)}>
                Customise
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={rejectAll}>
              Reject non-essential
            </Button>
            <Button size="sm" onClick={acceptAll}>
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
