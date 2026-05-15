import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { apiFetch } from "@/lib/apiUrl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSEO } from "@/lib/useSEO";
import { useTheme } from "@/lib/useTheme";
import { ArrowLeft, Home, MessageSquare, BookOpen, Search } from "lucide-react";

interface PostStub {
  slug: string;
  title: string;
  excerpt?: string | null;
}

export default function NotFound() {
  const [, navigate] = useLocation();
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [popular, setPopular] = useState<PostStub[]>([]);
  const isDark = theme === "dark";

  const pageShellClass = isDark
    ? "relative overflow-hidden py-14 md:py-20 bg-[#0f1120] text-white"
    : "relative overflow-hidden py-14 md:py-20 bg-slate-50 text-[#252140]";
  const pageGlowClass = isDark
    ? "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.10),transparent_28%)]"
    : "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,33,64,0.08),transparent_38%),linear-gradient(180deg,rgba(37,33,64,0.02),transparent_35%)]";
  const cardClass = isDark
    ? "mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[#16142B]/95 p-5 sm:p-8 md:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm"
    : "mx-auto max-w-5xl rounded-[2rem] border border-slate-200/70 bg-white/90 p-5 sm:p-8 md:p-10 shadow-[0_18px_60px_rgba(37,33,64,0.08)] backdrop-blur-sm";
  const panelClass = isDark ? "rounded-2xl border border-white/10 bg-white/5 p-5" : "rounded-2xl border bg-slate-50 p-5";
  const mutedTextClass = isDark ? "text-white/65" : "text-muted-foreground";
  const titleClass = isDark
    ? "mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white"
    : "mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-[#252140]";
  const inputClass = isDark
    ? "pl-9 h-10 sm:h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
    : "pl-9 h-11 bg-white";
  const searchButtonClass = isDark ? "h-10 sm:h-11 px-5 bg-[#4f46e5] text-white hover:bg-[#4338ca]" : "h-11 px-5";
  const outlineButtonClass = isDark ? "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white" : undefined;

  // Fire-and-forget telemetry so we can see what users are looking for.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = JSON.stringify({
        path: window.location.pathname + window.location.search,
        referrer: document.referrer || null,
      });
      const url = "/api/telemetry/not-found";
      const sent =
        typeof navigator.sendBeacon === "function" &&
        navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
      if (!sent) {
        void fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Pull a small "popular posts" list from the public posts feed. Failing
  // silently is fine — the page works without it.
  useEffect(() => {
    let alive = true;
    apiFetch("/api/posts?limit=4")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        const items: PostStub[] = Array.isArray(data?.posts) ? data.posts : [];
        setPopular(items.slice(0, 4));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useSEO({
    title: "Page not found — Leads Rubix",
    description:
      "The page you were looking for has moved or no longer exists. Browse our product, blog, or contact our India sales team.",
    canonical: "https://leadsrubix.com/404",
  });

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/blog?q=${encodeURIComponent(q)}`);
  }

  return (
    <Layout>
      <section className={pageShellClass}>
        <div className={pageGlowClass} />
        <div className="relative container mx-auto px-4 md:px-8 max-w-6xl">
          <div className={cardClass}>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="text-center lg:text-left">
                <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${mutedTextClass}`}>404</p>
                <h1 className={titleClass}>We couldn't find that page.</h1>
                <p className={`mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${mutedTextClass}`}>
                  The link may be old, the page may have moved, or you may have typed the URL by hand.
                  Search the blog &amp; glossary, or jump to one of the most useful routes below.
                </p>

                <form
                  onSubmit={handleSearch}
                  className="mt-7 flex max-w-xl mx-auto lg:mx-0 gap-2"
                  role="search"
                  aria-label="Search the site"
                >
                  <div className="relative flex-1">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${isDark ? "text-white/45" : "text-muted-foreground"}`} aria-hidden />
                    <Input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search articles, glossary, features…"
                      className={inputClass}
                      aria-label="Search query"
                      data-testid="input-404-search"
                    />
                  </div>
                  <Button type="submit" className={searchButtonClass} data-testid="btn-404-search">Search</Button>
                </form>

                <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
                  <Button asChild size="lg" data-testid="btn-404-home">
                    <Link href="/"><Home className="size-4 mr-2" /> Back to home</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className={outlineButtonClass} data-testid="btn-404-blog">
                    <Link href="/blog"><BookOpen className="size-4 mr-2" /> Read the blog</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className={outlineButtonClass} data-testid="btn-404-contact">
                    <Link href="/contact"><MessageSquare className="size-4 mr-2" /> Talk to sales</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-5">
                <div className={panelClass}>
                  <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${mutedTextClass}`}>
                    Popular reads
                  </h2>
                  {popular.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-3">
                      {popular.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/blog/${p.slug}`}
                            className={isDark ? "block rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/25 transition-colors" : "block rounded-xl border bg-white p-4 hover:border-[#252140] transition-colors"}
                            data-testid={`link-404-post-${p.slug}`}
                          >
                            <p className={isDark ? "font-semibold text-white" : "font-semibold text-[#252140]"}>{p.title}</p>
                            {p.excerpt && <p className={`text-sm mt-1 line-clamp-2 ${mutedTextClass}`}>{p.excerpt}</p>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={`text-sm ${mutedTextClass}`}>Loading useful reads…</p>
                  )}
                </div>

                <div className={isDark ? "rounded-2xl border border-white/10 bg-white/5 p-5" : "rounded-2xl border bg-white p-5"}>
                  <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${mutedTextClass}`}>
                    Quick routes
                  </h2>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { href: "/features", label: "Features" },
                      { href: "/pricing", label: "Pricing" },
                      { href: "/industries", label: "Industries" },
                      { href: "/case-studies", label: "Case studies" },
                      { href: "/integrations", label: "Integrations" },
                      { href: "/glossary", label: "Glossary" },
                      { href: "/about", label: "About" },
                      { href: "/faq", label: "FAQ" },
                    ].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={isDark ? "rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-white/80 hover:border-white/25 hover:text-white transition-colors" : "rounded-lg border bg-slate-50 px-3 py-2 text-center hover:border-[#252140] hover:text-[#252140] transition-colors"}
                        data-testid={`link-404-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className={`mt-8 text-sm inline-flex items-center gap-1 justify-center w-full ${mutedTextClass}`}>
              <ArrowLeft className="size-3.5" />
              Or use your browser's back button to retrace your steps.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
