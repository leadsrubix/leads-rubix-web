import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { X, ArrowRight, Sparkles } from "lucide-react";

interface ExitIntentModalProps {
  storageKey: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  delayMs?: number;
  /**
   * When provided, swaps the CTA to a free downloadable lead-magnet (e.g. an
   * RFP template). The href should point at a public asset; we set the
   * `download` attribute so browsers save instead of navigating.
   */
  magnet?: { label: string; href: string; downloadAs?: string };
  secondaryLabel?: string;
}

export function ExitIntentModal({
  storageKey,
  title = "Before you go — grab the free RFP template",
  body = "10 questions every Indian real-estate / education / financial-services team should ask their next CRM. Filled-in sample plus a blank Word version. No email required.",
  ctaLabel = "Book a free demo",
  ctaHref = "/demo",
  delayMs = 5000,
  magnet,
  secondaryLabel = "Not now",
}: ExitIntentModalProps) {
  const [open, setOpen] = useState(false);
  const armedRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  function getFocusable(): HTMLElement[] {
    if (!dialogRef.current) return [];
    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      ),
    ).filter((el) => !el.hasAttribute("aria-hidden") && el.offsetParent !== null);
  }

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "1") return;
    } catch {
      /* ignore */
    }

    // Exit-intent (mouse leaving viewport top) only makes sense on devices
    // with a fine pointer. Touch devices have no such gesture and the
    // mouseout event fires noisily during normal scrolling.
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
      }
    }

    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, delayMs);

    function handleMouseOut(e: MouseEvent) {
      if (!armedRef.current) return;
      if (e.relatedTarget || e.clientY > 4) return;
      try {
        if (sessionStorage.getItem(storageKey) === "1") return;
      } catch {
        /* ignore */
      }
      setOpen(true);
    }

    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [storageKey, delayMs]);

  // Lock body scroll while the modal is open so the page behind doesn't shift
  // on mobile when the address bar resizes.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("lr-no-scroll");
    return () => {
      document.body.classList.remove("lr-no-scroll");
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
    if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
      previousFocusRef.current.focus();
    }
  }

  // ESC to close + focus management when modal opens
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    // Initial focus on the primary CTA, then trap simple Tab cycling between CTA and close
    const focusTarget = ctaRef.current ?? closeButtonRef.current;
    focusTarget?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const focusables = getFocusable();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        // If focus is outside the dialog (escaped somehow), pull it back
        if (!active || !dialogRef.current?.contains(active)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
          return;
        }
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-3 sm:px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:pb-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      data-testid="exit-intent-modal"
      onClick={close}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#16142B] dark:border dark:border-white/10 shadow-2xl p-5 sm:p-7 md:p-8 max-h-[90dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="exit-intent-close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="h-12 w-12 rounded-2xl bg-[#252140]/10 dark:bg-white/10 flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-[#252140] dark:text-white" />
        </div>
        <h2
          id="exit-intent-title"
          className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-[#252140] dark:text-white"
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">{body}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {magnet ? (
            <a
              ref={ctaRef as unknown as React.Ref<HTMLAnchorElement>}
              href={magnet.href}
              download={magnet.downloadAs ?? true}
              onClick={() => {
                try {
                  const w = window as unknown as { dataLayer?: unknown[] };
                  w.dataLayer = w.dataLayer || [];
                  w.dataLayer.push({ event: "magnet_download", magnet_href: magnet.href });
                } catch {
                  /* noop */
                }
                close();
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#252140] hover:bg-[#16142B] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              data-testid="exit-intent-cta"
            >
              {magnet.label} <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <Link
              ref={ctaRef as unknown as React.Ref<HTMLAnchorElement>}
              href={ctaHref}
              onClick={close}
              className="inline-flex items-center justify-center gap-2 bg-[#252140] hover:bg-[#16142B] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              data-testid="exit-intent-cta"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground px-5 py-3 rounded-full"
            data-testid="exit-intent-dismiss"
          >
            {secondaryLabel}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          7-day free trial · No credit card · Setup in 24h
        </p>
      </div>
    </div>
  );
}
