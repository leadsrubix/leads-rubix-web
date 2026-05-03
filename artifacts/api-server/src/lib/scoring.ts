// Lead scoring — transparent, rule-based, 0–100.
// Tweak weights here; the score and the contributing factors are persisted
// on each lead so the sales team can see why a lead is hot vs cold.

export interface ScoreInput {
  email: string;
  phone: string;
  message: string;
  teamSize: string | null;
  source: string;
  utm: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    gclid?: string;
    fbclid?: string;
  };
  landingPath: string | null;
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "rediffmail.com",
  "icloud.com",
  "ymail.com",
  "protonmail.com",
  "aol.com",
]);

const HIGH_INTENT_PATHS = ["/demo", "/pricing", "/contact"];
const HIGH_INTENT_SOURCE_PREFIXES = ["demo", "pricing", "contact", "industry"];

export type ScoreBand = "hot" | "warm" | "cold";

export function bandFor(score: number): ScoreBand {
  if (score >= 70) return "hot";
  if (score >= 45) return "warm";
  return "cold";
}

export function scoreLead(input: ScoreInput): {
  score: number;
  band: ScoreBand;
  factors: string[];
} {
  let score = 30;
  const factors: string[] = ["base+30"];

  // Business email vs free webmail (signals B2B intent)
  const domain = (input.email.split("@")[1] ?? "").toLowerCase();
  if (domain && !FREE_EMAIL_DOMAINS.has(domain)) {
    score += 10;
    factors.push("business-email+10");
  }

  // Team size — bigger teams = bigger deal size potential
  const ts = (input.teamSize ?? "").trim();
  if (ts === "200+") {
    score += 30;
    factors.push("team-200plus+30");
  } else if (ts === "51–200" || ts === "51-200") {
    score += 25;
    factors.push("team-51to200+25");
  } else if (ts === "21–50" || ts === "21-50") {
    score += 20;
    factors.push("team-21to50+20");
  } else if (ts === "6–20" || ts === "6-20" || ts === "11-50") {
    score += 15;
    factors.push("team-6to20+15");
  } else if (ts === "1–5" || ts === "1-5" || ts === "1-10") {
    score += 5;
    factors.push("team-1to5+5");
  }

  // High-intent page or source
  const src = (input.source ?? "").toLowerCase();
  const land = (input.landingPath ?? "").toLowerCase();
  const highIntentSrc = HIGH_INTENT_SOURCE_PREFIXES.some((p) => src.startsWith(p));
  const highIntentLand = HIGH_INTENT_PATHS.some((p) => land.startsWith(p));
  if (highIntentSrc || highIntentLand) {
    score += 15;
    factors.push("high-intent-page+15");
  }

  // UTM medium quality
  const med = (input.utm.utm_medium ?? "").toLowerCase();
  if (["organic", "referral", "email"].includes(med)) {
    score += 10;
    factors.push(`utm-${med}+10`);
  } else if (med === "cpc" || input.utm.gclid || input.utm.fbclid) {
    score += 5;
    factors.push("utm-paid+5");
  }

  // Message quality (longer = more thoughtful inquiry)
  if (input.message.length >= 500) {
    score += 15;
    factors.push("msg-500+15");
  } else if (input.message.length >= 200) {
    score += 10;
    factors.push("msg-200+10");
  }

  // Phone with country code (international format = more legit)
  if (input.phone.replace(/\D/g, "").length >= 11) {
    score += 5;
    factors.push("phone-intl+5");
  }

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return { score, band: bandFor(score), factors };
}
