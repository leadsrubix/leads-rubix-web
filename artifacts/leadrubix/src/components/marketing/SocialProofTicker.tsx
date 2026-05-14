import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { apiFetch } from "@/lib/apiUrl";

interface SocialProofResponse {
  ok: boolean;
  total: number;
  last30d: number;
  last7d: number;
  distinctCompanies: number;
}

/**
 * Small live "X teams enquired this month" badge powered by real lead counts.
 * Hides itself when the numbers are too small to be persuasive (< 5 in 30 days)
 * or while loading, so we never show "0 teams onboarded".
 */
export function SocialProofTicker({ className = "" }: { className?: string }) {
  const [data, setData] = useState<SocialProofResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    apiFetch("/api/stats/social-proof")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.ok) setData(d);
      })
      .catch(() => {
        /* fail silently — this is decorative */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;
  if (data.last30d < 5) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200 ${className}`}
      data-testid="social-proof-ticker"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <Users className="size-3.5" />
      <span>
        {data.last30d.toLocaleString("en-IN")} teams enquired in the last 30 days
      </span>
    </div>
  );
}
