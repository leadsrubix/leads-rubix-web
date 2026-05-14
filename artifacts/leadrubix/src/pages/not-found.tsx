import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { apiFetch } from "@/lib/apiUrl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSEO } from "@/lib/useSEO";
import { ArrowLeft, Home, MessageSquare, BookOpen, Search } from "lucide-react";

interface PostStub {
  slug: string;
  title: string;
  excerpt?: string | null;
}

export default function NotFound() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [popular, setPopular] = useState<PostStub[]>([]);

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
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">404</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-[#252140]">
            We couldn't find that page.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The link may be old, the page may have moved, or you may have typed the URL by hand.
            Search the blog &amp; glossary, or pick one of the routes below.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-md mx-auto gap-2"
            role="search"
            aria-label="Search the site"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, glossary, features…"
                className="pl-9"
                aria-label="Search query"
                data-testid="input-404-search"
              />
            </div>
            <Button type="submit" data-testid="btn-404-search">Search</Button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" data-testid="btn-404-home">
              <Link href="/"><Home className="size-4 mr-2" /> Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="outline" data-testid="btn-404-blog">
              <Link href="/blog"><BookOpen className="size-4 mr-2" /> Read the blog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" data-testid="btn-404-contact">
              <Link href="/contact"><MessageSquare className="size-4 mr-2" /> Talk to sales</Link>
            </Button>
          </div>

          {popular.length > 0 && (
            <div className="mt-12 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center">
                Popular reads
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popular.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block rounded-lg border bg-card p-4 hover:border-[#252140] transition-colors"
                      data-testid={`link-404-post-${p.slug}`}
                    >
                      <p className="font-semibold text-[#252140] dark:text-white">{p.title}</p>
                      {p.excerpt && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.excerpt}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
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
                className="rounded-md border bg-card px-3 py-2 hover:border-[#252140] hover:text-[#252140] transition-colors"
                data-testid={`link-404-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground inline-flex items-center gap-1">
            <ArrowLeft className="size-3.5" />
            Or use your browser's back button to retrace your steps.
          </p>
        </div>
      </section>
    </Layout>
  );
}
