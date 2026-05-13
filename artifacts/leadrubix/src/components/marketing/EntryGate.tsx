import { useEffect, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { useBrand } from "@/components/layout/Brand";
import { buildLeadContext } from "@/lib/utm";
import { trackEvent } from "@/lib/ab";

const STORAGE_KEY = "lr_entry_gate_done_v1";

const INTEREST_OPTIONS = [
  "I'm a real-estate developer",
  "I run a brokerage / channel partner",
  "I'm a sales / lead manager",
  "I'm a solo property agent",
  "Just exploring",
];

const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+971", "+65", "+92"];

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
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (!dismissed) {
      setOpen(true);
      document.body.classList.add("lr-no-scroll");
    }
    return () => {
      document.body.classList.remove("lr-no-scroll");
    };
  }, [paths]);

  function close(skip = false) {
    setOpen(false);
    document.body.classList.remove("lr-no-scroll");
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    if (skip) trackEvent("entry_gate_skip");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!consent) {
      setError("Please accept the consent to continue.");
      return;
    }
    setError(null);
    setSubmitting(true);
    trackEvent("form_submit", { form_placement: "entry_gate" });
    const ctx = buildLeadContext();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || `noemail+${Date.now()}@leadsrubix.local`,
          company: interest || "Not specified",
          phone: `${country} ${mobile.trim()}`,
          message: `Entry-gate signup. Interest: ${interest || "n/a"}.`,
          source: "entry_popup",
          teamSize: undefined,
          utm: ctx.utm,
          referrer: ctx.referrer ?? undefined,
          landingPath: ctx.landingPath ?? undefined,
          website: "",
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }
      trackEvent("form_submit_success", { form_placement: "entry_gate" });
      close(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not submit. Please try again.";
      setError(msg);
      trackEvent("form_submit_error", { form_placement: "entry_gate" });
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

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
          {brand.logoImageUrl ? (
            <img
              src={brand.logoImageUrl}
              alt={brand.brandName}
              className="size-12 rounded-md object-contain"
              data-testid="entry-gate-logo"
            />
          ) : null}
          <div className="mt-2 text-xs font-semibold tracking-[0.18em] text-[#252140] uppercase">
            {brand.brandName ?? "Leads Rubix"}
          </div>
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
              className="px-2 py-2.5 rounded-md border border-slate-300 text-sm bg-white"
              aria-label="Country code"
              data-testid="entry-gate-country"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="tel"
              required
              inputMode="numeric"
              pattern="[0-9]{10,15}"
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
            <Link
              href="/privacy"
              className="font-semibold text-[#252140] underline"
              onClick={() => close(true)}
            >
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

          <button
            type="button"
            onClick={() => close(true)}
            className="w-full mt-1 text-xs text-slate-500 hover:text-slate-700 py-1"
            data-testid="entry-gate-skip"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
}
