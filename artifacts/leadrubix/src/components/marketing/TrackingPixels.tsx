import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useContent } from "@/lib/useContent";

export interface TrackingPixelsConfig {
  ga4MeasurementId: string;
  fbPixelId: string;
  taboolaAccountId: string;
  clarityProjectId: string;
}

export const TRACKING_PIXELS_DEFAULT: TrackingPixelsConfig = {
  ga4MeasurementId: "",
  fbPixelId: "",
  taboolaAccountId: "",
  clarityProjectId: "",
};

interface ConsentRecord {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

const CONSENT_STORAGE_KEY = "lr_cookie_consent_v1";
export const CONSENT_CHANGED_EVENT = "lr-cookie-consent-changed";

function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

// Track which pixels are already injected so we never double-fire on re-renders.
const loaded = new Set<string>();

function injectScript(id: string, src?: string, inline?: string): void {
  if (loaded.has(id)) return;
  loaded.add(id);
  if (src) {
    const s = document.createElement("script");
    s.async = true;
    s.src = src;
    s.dataset.lrPixel = id;
    document.head.appendChild(s);
  }
  if (inline) {
    const s = document.createElement("script");
    s.text = inline;
    s.dataset.lrPixel = `${id}-inline`;
    document.head.appendChild(s);
  }
}

function isValidGa4Id(v: string): boolean {
  return /^G-[A-Z0-9]{4,}$/i.test(v.trim());
}

function isValidPixelId(v: string): boolean {
  return /^[a-zA-Z0-9_-]{4,40}$/.test(v.trim());
}

function loadGa4(id: string): void {
  const safe = id.trim();
  if (!isValidGa4Id(safe)) return;
  injectScript(
    `ga4:${safe}`,
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(safe)}`,
  );
  injectScript(
    `ga4-init:${safe}`,
    undefined,
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
      `gtag('js',new Date());gtag('config',${JSON.stringify(safe)},{anonymize_ip:true});`,
  );
}

function loadFbPixel(id: string): void {
  const safe = id.trim();
  if (!isValidPixelId(safe)) return;
  injectScript(
    `fb:${safe}`,
    undefined,
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?` +
      `n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;` +
      `n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;` +
      `t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}` +
      `(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');` +
      `fbq('init',${JSON.stringify(safe)});fbq('track','PageView');`,
  );
}

function loadClarity(id: string): void {
  const safe = id.trim();
  if (!/^[a-zA-Z0-9]{4,20}$/.test(safe)) return;
  const safeJson = JSON.stringify(safe);
  injectScript(
    `clarity:${safe}`,
    undefined,
    `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};` +
      `t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;` +
      `y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${safeJson});`,
  );
}

function loadTaboola(id: string): void {
  const safe = id.trim();
  if (!isValidPixelId(safe)) return;
  const safeJson = JSON.stringify(safe);
  injectScript(
    `taboola:${safe}`,
    undefined,
    `window._tfa=window._tfa||[];window._tfa.push({notify:'event',name:'page_view',id:${safeJson}});` +
      `!function(t,f,a,x){if(!document.getElementById(x)){t.async=1;t.src=a;t.id=x;` +
      `f.parentNode.insertBefore(t,f);}}(document.createElement('script'),` +
      `document.getElementsByTagName('script')[0],` +
      `'https://cdn.taboola.com/libtrc/unip/'+${safeJson}+'/tfa.js','tb_tfa_script');`,
  );
}

/**
 * Loads GA4, Facebook Pixel, and Taboola Pixel based on CMS-configured IDs and
 * the visitor's cookie-consent choice.
 *
 * - GA4 fires when `analytics` consent is granted.
 * - FB Pixel and Taboola fire when `marketing` consent is granted.
 * - Each pixel is injected at most once per page load.
 * - Listens for `CONSENT_CHANGED_EVENT` so the pixels fire as soon as the
 *   visitor clicks Accept in the cookie banner (no reload required).
 */
// Fire a "page_view" event on every SPA route change for pixels that have
// already been initialized. Skips the first call because each loader fires
// its own initial PageView synchronously when injected.
function trackSpaPageview(consent: ConsentRecord, cfg: TrackingPixelsConfig): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _tfa?: Array<Record<string, unknown>>;
  };
  if (consent.analytics && cfg.ga4MeasurementId && typeof w.gtag === "function") {
    w.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
    });
  }
  if (consent.marketing && cfg.fbPixelId && typeof w.fbq === "function") {
    w.fbq("track", "PageView");
  }
  if (consent.marketing && cfg.taboolaAccountId && Array.isArray(w._tfa)) {
    w._tfa.push({ notify: "event", name: "page_view", id: cfg.taboolaAccountId });
  }
}

export function TrackingPixels(): null {
  const cfg = useContent<TrackingPixelsConfig>("tracking_pixels", TRACKING_PIXELS_DEFAULT);
  const [consent, setConsent] = useState<ConsentRecord | null>(() => readConsent());
  const [location] = useLocation();

  useEffect(() => {
    const refresh = () => setConsent(readConsent());
    window.addEventListener("storage", refresh);
    window.addEventListener(CONSENT_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(CONSENT_CHANGED_EVENT, refresh);
    };
  }, []);

  // Initial injection on consent + config (once each).
  useEffect(() => {
    if (!consent) return;
    if (consent.analytics && cfg.ga4MeasurementId) loadGa4(cfg.ga4MeasurementId);
    if (consent.analytics && cfg.clarityProjectId) loadClarity(cfg.clarityProjectId);
    if (consent.marketing && cfg.fbPixelId) loadFbPixel(cfg.fbPixelId);
    if (consent.marketing && cfg.taboolaAccountId) loadTaboola(cfg.taboolaAccountId);
  }, [
    consent,
    cfg.ga4MeasurementId,
    cfg.clarityProjectId,
    cfg.fbPixelId,
    cfg.taboolaAccountId,
  ]);

  // SPA route change → re-fire page_view on each pixel that's already loaded.
  // The initial location render also runs this, but each pixel's own snippet
  // already fired its first PageView, and re-firing a duplicate within the
  // same RAF is harmless for all three vendors.
  useEffect(() => {
    if (!consent) return;
    trackSpaPageview(consent, cfg);
  }, [location, consent, cfg.ga4MeasurementId, cfg.fbPixelId, cfg.taboolaAccountId]);

  return null;
}
