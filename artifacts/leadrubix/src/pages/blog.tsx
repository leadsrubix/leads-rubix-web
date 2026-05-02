import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/lib/useSEO";

interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: string | null;
}

export default function Blog() {
  useSEO({
    title: "Blog — Leads Rubix",
    description: "Notes on lead management, real estate sales operations and CRM best practices for the Indian market.",
    canonical: "https://leadsrubix.com/blog",
  });

  const [posts, setPosts] = useState<BlogPostListItem[] | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-foreground text-xs font-medium">
              Blog
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-4">
              Notes from the team
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Lessons from working with developers, brokerages and channel partners across India.
            </p>
          </div>

          {posts === null ? (
            <p className="text-center text-muted-foreground">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {posts.map((p) => (
                <Card key={p.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt=""
                        className="rounded-md mb-4 aspect-[16/9] object-cover w-full"
                      />
                    ) : null}
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-xl font-semibold hover:underline"
                      data-testid={`link-post-${p.slug}`}
                    >
                      {p.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                      {p.excerpt}
                    </p>
                    {p.publishedAt ? (
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(p.publishedAt).toLocaleDateString()}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
