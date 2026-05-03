import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSEO } from "@/lib/useSEO";

interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  tags?: string[] | null;
  publishedAt: string | null;
}

const PAGE_SIZE = 12;

function readQuery() {
  if (typeof window === "undefined")
    return { page: 1, tag: undefined as string | undefined, q: "" };
  const sp = new URLSearchParams(window.location.search);
  return {
    page: Math.max(1, Number(sp.get("page")) || 1),
    tag: sp.get("tag") ?? undefined,
    q: sp.get("q") ?? "",
  };
}

export default function Blog() {
  useSEO({
    title: "Blog — Leads Rubix",
    description:
      "Notes on lead management, sales operations and CRM best practices for India's high-velocity sales teams across real estate, education, healthcare, BFSI and more.",
    canonical: "https://leadsrubix.com/blog",
  });

  const [, navigate] = useLocation();
  const [{ page, tag, q }, setQ] = useState(readQuery);
  const [searchInput, setSearchInput] = useState(q);
  const [posts, setPosts] = useState<BlogPostListItem[] | null>(null);
  const [total, setTotal] = useState(0);

  // Sync state when user uses back/forward.
  useEffect(() => {
    const handler = () => {
      const next = readQuery();
      setQ(next);
      setSearchInput(next.q);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    setPosts(null);
    const sp = new URLSearchParams();
    // When a search query is active we fetch a wider page so the client-side
    // filter has enough rows to look across. Server-side full-text search is
    // a future enhancement.
    sp.set("page", String(q ? 1 : page));
    sp.set("pageSize", String(q ? 100 : PAGE_SIZE));
    if (tag) sp.set("tag", tag);
    fetch(`/api/posts?${sp.toString()}`)
      .then((r) => (r.ok ? r.json() : { posts: [], total: 0 }))
      .then((d) => {
        setPosts(d.posts ?? []);
        setTotal(d.total ?? 0);
      })
      .catch(() => {
        setPosts([]);
        setTotal(0);
      });
  }, [page, tag, q]);

  const filtered = useMemo<BlogPostListItem[] | null>(() => {
    if (!posts) return null;
    if (!q.trim()) return posts;
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      const hay = [
        p.title,
        p.excerpt,
        ...(Array.isArray(p.tags) ? p.tags : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [posts, q]);

  function go(nextPage: number, nextTag?: string, nextQ?: string) {
    const sp = new URLSearchParams();
    if (nextPage > 1) sp.set("page", String(nextPage));
    if (nextTag) sp.set("tag", nextTag);
    if (nextQ && nextQ.trim()) sp.set("q", nextQ.trim());
    const suffix = sp.toString();
    navigate(`/blog${suffix ? `?${suffix}` : ""}`);
    setQ({ page: nextPage, tag: nextTag, q: nextQ?.trim() ?? "" });
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    go(1, tag, searchInput);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const showPagination = !q;

  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-foreground text-xs font-medium">
              Blog
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-4">Notes from the team</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Lessons from working with sales teams across real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing in India.
            </p>
            <form
              onSubmit={onSearchSubmit}
              role="search"
              aria-label="Search the blog"
              className="mt-6 flex max-w-lg mx-auto gap-2"
            >
              <Input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles by title, summary or tag…"
                aria-label="Search blog"
                data-testid="input-blog-search"
              />
              <Button type="submit" data-testid="btn-blog-search">Search</Button>
              {q ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSearchInput("");
                    go(1, tag, "");
                  }}
                  data-testid="btn-blog-search-clear"
                >
                  Clear
                </Button>
              ) : null}
            </form>
            {q ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Showing matches for <span className="font-medium text-foreground">"{q}"</span>
                {filtered ? ` · ${filtered.length} result${filtered.length === 1 ? "" : "s"}` : ""}
              </p>
            ) : null}
            {tag ? (
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing posts tagged</span>
                <Badge variant="secondary">{tag}</Badge>
                <button
                  type="button"
                  onClick={() => go(1, undefined, q)}
                  className="underline"
                  data-testid="btn-clear-tag"
                >
                  Clear
                </button>
              </div>
            ) : null}
          </div>

          {filtered === null ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {q
                  ? `No posts matched "${q}". Try fewer words or browse the full archive.`
                  : "No posts yet — check back soon."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card
                    className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    data-testid={`card-blog-${post.slug}`}
                  >
                    {post.coverImage ? (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={post.coverImage}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <CardContent className="p-5">
                      {Array.isArray(post.tags) && post.tags.length > 0 ? (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="secondary" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                      <h2 className="text-lg font-semibold leading-tight text-[#252140] dark:text-white">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      ) : null}
                      {post.publishedAt ? (
                        <p className="mt-3 text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {showPagination && totalPages > 1 && filtered && filtered.length > 0 ? (
            <div className="mt-10 flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => go(page - 1, tag, q)}
                data-testid="btn-blog-prev"
              >
                Previous
              </Button>
              <span className="self-center text-sm text-muted-foreground px-3">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => go(page + 1, tag, q)}
                data-testid="btn-blog-next"
              >
                Next
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}
