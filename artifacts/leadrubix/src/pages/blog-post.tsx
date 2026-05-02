import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  publishedAt: string | null;
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useSEO({
    title: post ? `${post.title} — Leads Rubix Blog` : "Loading…",
    description: post?.excerpt,
    canonical: post ? `https://leadsrubix.com/blog/${post.slug}` : undefined,
  });

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d?.ok) setPost(d.post);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  return (
    <Layout>
      <article className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <Button asChild variant="ghost" size="sm" className="mb-6" data-testid="btn-back-blog">
            <Link href="/blog">
              <ArrowLeft className="size-4 mr-1" /> All posts
            </Link>
          </Button>

          {notFound ? (
            <p className="text-muted-foreground">This post no longer exists.</p>
          ) : !post ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <>
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt=""
                  className="rounded-lg mb-6 aspect-[16/9] object-cover w-full"
                />
              ) : null}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
              {post.publishedAt ? (
                <p className="text-sm text-muted-foreground mt-3">
                  Published {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              ) : null}
              <div
                className="prose prose-slate max-w-none mt-8 whitespace-pre-wrap leading-relaxed"
                data-testid="text-post-body"
              >
                {post.body}
              </div>
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}
