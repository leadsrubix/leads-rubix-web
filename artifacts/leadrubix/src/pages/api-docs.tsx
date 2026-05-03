import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/useSEO";

const REDOC_SRC = "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js";
const SPEC_URL = "/openapi.yaml";

declare global {
  interface Window {
    Redoc?: { init: (specOrUrl: string, options: Record<string, unknown>, element: HTMLElement) => void };
  }
}

export default function ApiDocs() {
  useSEO({
    title: "API Reference — Leads Rubix",
    description:
      "REST API reference for the Leads Rubix CRM platform. Authenticate, manage leads, log activities, and integrate with your stack.",
    canonical: "https://leadsrubix.com/docs/api",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    function init() {
      if (cancelled || !containerRef.current || !window.Redoc) return;
      try {
        window.Redoc.init(
          SPEC_URL,
          {
            scrollYOffset: 64,
            hideDownloadButton: false,
            theme: { colors: { primary: { main: "#252140" } } },
          },
          containerRef.current,
        );
        setLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load API docs");
        setLoading(false);
      }
    }

    if (window.Redoc) {
      init();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${REDOC_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", init, { once: true });
      return () => {
        cancelled = true;
        existing.removeEventListener("load", init);
      };
    }

    const script = document.createElement("script");
    script.src = REDOC_SRC;
    script.async = true;
    script.onload = init;
    script.onerror = () => {
      setError("Could not load the API reference renderer.");
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            Developers
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">API reference</h1>
          <p className="text-muted-foreground text-lg">
            REST endpoints for lead intake, content management, and admin operations. Generated from our OpenAPI spec — always in sync with the production API.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Spec:{" "}
            <a href={SPEC_URL} className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer" data-testid="link-openapi-spec">
              {SPEC_URL}
            </a>
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {error ? (
            <div className="max-w-3xl mx-auto p-6 border border-destructive/30 bg-destructive/5 rounded-xl text-sm">
              <p className="font-semibold mb-2">Unable to render the docs</p>
              <p className="text-muted-foreground">{error}</p>
              <p className="mt-3 text-muted-foreground">
                You can still view the raw spec at{" "}
                <a href={SPEC_URL} className="underline" target="_blank" rel="noopener noreferrer">
                  {SPEC_URL}
                </a>
                .
              </p>
            </div>
          ) : null}
          {loading && !error ? (
            <p className="text-center text-sm text-muted-foreground py-8" data-testid="api-docs-loading">
              Loading API reference…
            </p>
          ) : null}
          <div ref={containerRef} data-testid="redoc-root" />
        </div>
      </section>
    </Layout>
  );
}
