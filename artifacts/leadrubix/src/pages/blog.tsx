import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  if (typeof window === "undefined") return { page: 1, tag: undefined as string | undefined };
  const sp = new URLSearchParams(window.location.search);
  return {
    page: Math.max(1, Number(sp.get("page")) || 1),
    tag: sp.get("tag") ?? undefined,
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
  const [{ page, tag }, setQ] = useState(readQuery);
  const [posts, setPosts] = useState<BlogPostListItem[] | null>(null);
  const [total, setTotal] = useState(0);

  // Sync state when user uses back/forward.
  useEffect(() => {
    const handler = () => setQ(readQuery());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    setPosts(null);
    const sp = new URLSearchParams();
    sp.set("page", String(page));
    sp.set("pageSize", String(PAGE_SIZE));
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
  }, [page, tag]);

  function go(nextPage: number, nextTag?: string) {
    const sp = new URLSearchParams();
    if (nextPage > 1) sp.set("page", String(nextPage));
    if (nextTag) sp.set("tag", nextTag);
    const suffix = sp.toString();
    navigate(`/blog${suffix ? `?${suffix}` : ""}`);
    setQ({ page: nextPage, tag: nextTag });
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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
            {tag ? (
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing posts tagged</span>
                <Badge variant="secondary">{tag}</Badge>
                <button
                  type="button"
                  onClick={() => go(1, undefined)}
                  className="underline"
                  data-testid="btn-clear-tag"
                >
                  Clear
                </button>
              </div>
            ) : null}
          </div>

          {posts === null ? (
            <p className="text-center text-muted-foreground">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {posts.map((p) => (
                  <Card key={p.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      {p.coverImage ? (
                        <img
                          src={p.coverImage}
                          alt=""
                          className="rounded-md mb-4 aspect-[16/9] object-cover w-full"
                          loading="lazy"
                        />
                      ) : null}
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-xl font-semibold hover:underline"
                        data-testid={`link-post-${p.slug}`}
                      >
                        {p.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-3 items-center">
                        {p.publishedAt ? (
                          <p className="text-xs text-muted-foreground">
                            {new Date(p.publishedAt).toLocaleDateString()}
                          </p>
                        ) : null}
                        {(p.tags ?? []).slice(0, 3).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => go(1, t)}
                            data-testid={`btn-tag-${t}`}
                          >
                            <Badge variant="outline" className="text-[10px] cursor-pointer">
                              {t}
                            </Badge>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-between mt-10 text-sm">
                <span className="text-muted-foreground">
                  Page {page} of {totalPages} · {total} post{total === 1 ? "" : "s"}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => go(page - 1, tag)}
                    data-testid="btn-blog-prev"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => go(page + 1, tag)}
                    data-testid="btn-blog-next"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
