const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type UtmRecord = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = "lr_utm";

export function captureUtmFromUrl(): void {
  if (typeof window === "undefined") return;
  try {
    const sp = new URLSearchParams(window.location.search);
    const captured: UtmRecord = {};
    let any = false;
    for (const k of UTM_KEYS) {
      const v = sp.get(k);
      if (v && v.length > 0 && v.length < 256) {
        captured[k] = v;
        any = true;
      }
    }
    if (any) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    }
  } catch {
    /* ignore */
  }
}

export function getUtm(): UtmRecord {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") return parsed as UtmRecord;
  } catch {
    /* ignore */
  }
  return {};
}

/**
 * Append UTM parameters to a `source` string for storage on the lead row.
 * The server validates `source` at max 50 chars (see `routes/contact.ts`),
 * so we use compact key abbreviations and hard-cap the final string.
 * Example: "demo-page-education|s=facebook|m=cpc"
 */
const SOURCE_MAX = 50;
const SHORT_KEYS: Record<string, string> = {
  utm_source: "s",
  utm_medium: "m",
  utm_campaign: "c",
  utm_term: "t",
  utm_content: "n",
  gclid: "g",
  fbclid: "f",
};

/** Capture the page the visitor first landed on this session. */
const LANDING_KEY = "lr_landing";
const REFERRER_KEY = "lr_referrer";

export function captureLandingContext(): void {
  if (typeof window === "undefined") return;
  try {
    if (!sessionStorage.getItem(LANDING_KEY)) {
      sessionStorage.setItem(LANDING_KEY, window.location.pathname + window.location.search);
    }
    if (!sessionStorage.getItem(REFERRER_KEY) && document.referrer) {
      // Don't store our own domain as the referrer.
      try {
        const ref = new URL(document.referrer);
        if (ref.host !== window.location.host) {
          sessionStorage.setItem(REFERRER_KEY, document.referrer.slice(0, 500));
        }
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* ignore */
  }
}

export function getLandingPath(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(LANDING_KEY);
  } catch {
    return null;
  }
}

export function getReferrer(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(REFERRER_KEY);
  } catch {
    return null;
  }
}

/** Build a structured payload to send to /api/contact. */
export function buildLeadContext(): {
  utm: UtmRecord;
  referrer?: string;
  landingPath?: string;
} {
  const referrer = getReferrer();
  const landingPath = getLandingPath();
  return {
    utm: getUtm(),
    ...(referrer != null ? { referrer } : {}),
    ...(landingPath != null ? { landingPath } : {}),
  };
}

export function annotateSource(baseSource: string): string {
  const utm = getUtm();
  // Order keys by signal value so the most useful ones survive truncation.
  const ORDER = ["utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid", "utm_term", "utm_content"];
  let out = baseSource.slice(0, SOURCE_MAX);
  for (const k of ORDER) {
    const raw = (utm as Record<string, string | undefined>)[k];
    if (!raw) continue;
    const shortK = SHORT_KEYS[k] ?? k;
    const cleaned = String(raw).replace(/[^A-Za-z0-9._-]/g, "").slice(0, 16);
    if (!cleaned) continue;
    const candidate = `${out}|${shortK}=${cleaned}`;
    if (candidate.length > SOURCE_MAX) break;
    out = candidate;
  }
  return out;
}
