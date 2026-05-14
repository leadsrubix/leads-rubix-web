import { useEffect, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { useBrand } from "@/components/layout/Brand";
import { buildLeadContext } from "@/lib/utm";
import { trackEvent } from "@/lib/ab";
import { apiFetch } from "@/lib/apiUrl";
import { COUNTRY_DIAL_CODES } from "@/lib/countryDialCodes";

// Stores the unix-ms timestamp of the last successful submission. We re-show
// the popup if more than RESHOW_AFTER_MS has elapsed since then so the user
// gets prompted again on a fresh visit a day later.
const STORAGE_KEY = "lr_entry_gate_submitted_at_v2";
const RESHOW_AFTER_MS = 24 * 60 * 60 * 1000; // 24h

const INTEREST_OPTIONS = ["Digital Service", "Job Interview"];

interface EntryGateProps {
  /** Restrict gate to a list of paths (default: any page that mounts it). */
  paths?: string[];
}

export function EntryGate({ paths }: EntryGateProps) {
  const brand = useBrand();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (paths && !paths.includes(window.location.pathname)) return;
    let lastSubmitted = 0;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      lastSubmitted = raw ? Number(raw) : 0;
      if (Number.isNaN(lastSubmitted)) lastSubmitted = 0;
    } catch {
      /* ignore */
    }
    const stillSuppressed = lastSubmitted && Date.now() - lastSubmitted < RESHOW_AFTER_MS;
    if (!stillSuppressed) {
      setOpen(true);
      document.body.classList.add("lr-no-scroll");
    }
    return () => {
      document.body.classList.remove("lr-no-scroll");
    };
  }, [paths]);

  function close() {
    setOpen(false);
    document.body.classList.remove("lr-no-scroll");
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!consent) {
      setError("Please accept the consent to continue.");
      return;
    }
    if (!interest) {
      setError("Please select an option.");
      return;
    }
    setError(null);
    setSubmitting(true);
    trackEvent("form_submit", { form_placement: "entry_gate" });
    const ctx = buildLeadContext();
    try {
      // Submits directly to the configured Google Sheet via the server's
      // /api/sheets-submit relay (the Sheets URL stays private; we don't
      // persist this row in the leads DB).
      const res = await apiFetch("/api/sheets-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "entry_popup",
          name: name.trim(),
          email: email.trim(),
          phone: `${country} ${mobile.trim()}`,
          interest,
          countryCode: country,
          mobile: mobile.trim(),
          consent,
          utm: ctx.utm,
          referrer: ctx.referrer ?? null,
          landingPath: ctx.landingPath ?? null,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }
      trackEvent("form_submit_success", { form_placement: "entry_gate" });
      close();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not submit. Please try again.";
      setError(msg);
      trackEvent("form_submit_error", { form_placement: "entry_gate" });
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const logoUrl = brand.logoImageUrl?.trim() || "/leads-rubix-favicon.png";

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-gate-title"
      data-testid="entry-gate-overlay"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-auto">
        <div className="flex flex-col items-center text-center">
          <img
            src={logoUrl}
            alt={brand.brandName}
            className="size-12 rounded-md object-contain"
            data-testid="entry-gate-logo"
          />
          <h2 id="entry-gate-title" className="mt-3 text-base font-medium text-slate-900">
            Welcome to {brand.brandName ?? "Leads Rubix"}
          </h2>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#252140]/30"
            data-testid="entry-gate-name"
          />
          <div className="flex gap-2">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-2 py-2.5 rounded-md border border-slate-300 text-sm bg-white max-w-[8rem]"
              aria-label="Country code"
              data-testid="entry-gate-country"
            >
              {COUNTRY_DIAL_CODES.map((c) => (
                <option key={`${c.code}-${c.dial}`} value={c.dial}>
                  {c.dial} {c.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              required
              inputMode="numeric"
              pattern="[0-9]{6,15}"
              placeholder="Mobile No"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/[^\d]/g, ""))}
              className="flex-1 px-4 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#252140]/30"
              data-testid="entry-gate-mobile"
            />
          </div>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#252140]/30"
            data-testid="entry-gate-email"
          />
          <select
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm bg-white"
            data-testid="entry-gate-interest"
          >
            <option value="">Select an option</option>
            {INTEREST_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>

          <p className="text-xs text-center text-slate-600 mt-3">
            By entering the website you accept our{" "}
            <Link href="/privacy" className="font-semibold text-[#252140] underline">
              privacy policy
            </Link>
            .
          </p>
          <label className="flex items-start gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5"
              data-testid="entry-gate-consent"
            />
            <span>
              I authorize this website and its representatives to call, SMS, email or WhatsApp me about
              its products and offers.
            </span>
          </label>

          {error ? (
            <div className="text-xs text-rose-700" data-testid="entry-gate-error">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting || !consent}
            className="w-full mt-2 rounded-full bg-[#252140] text-white py-3 text-sm font-semibold tracking-wider uppercase disabled:opacity-60"
            data-testid="entry-gate-submit"
          >
            {submitting ? "Submitting…" : "Enter Website"}
          </button>
        </form>
      </div>
    </div>
  );
}
