import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, ListTree } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { extractToc, readingTimeMinutes, type TocHeading } from "@/lib/readingTime";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  tags: string[] | null;
  publishedAt: string | null;
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  tags?: string[] | null;
  publishedAt: string | null;
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<RelatedPost[]>([]);

  const toc: TocHeading[] = useMemo(() => (post ? extractToc(post.body) : []), [post]);
  const minutes = useMemo(() => (post ? readingTimeMinutes(post.body) : 0), [post]);

  useSEO({
    title: post ? `${post.title} — Leads Rubix Blog` : "Loading…",
    description: post?.metaDescription || post?.excerpt,
    canonical: post ? `https://leadsrubix.com/blog/${post.slug}` : undefined,
    ogImage: post?.ogImage || post?.coverImage || undefined,
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            image: post.ogImage || post.coverImage || undefined,
            datePublished: post.publishedAt ?? undefined,
            dateModified: post.publishedAt ?? undefined,
            author: { "@type": "Organization", name: "Leads Rubix" },
            publisher: {
              "@type": "Organization",
              name: "Leads Rubix",
              logo: { "@type": "ImageObject", url: "https://leadsrubix.com/icon-512.png" },
            },
            mainEntityOfPage: `https://leadsrubix.com/blog/${post.slug}`,
            keywords: (post.tags ?? []).join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://leadsrubix.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://leadsrubix.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://leadsrubix.com/blog/${post.slug}` },
            ],
          },
        ]
      : undefined,
  });

  useEffect(() => {
    if (!slug) return;
    setPost(null);
    setNotFound(false);
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

  // Fetch related posts (same first tag, excluding current).
  useEffect(() => {
    if (!post) return;
    const firstTag = (post.tags ?? [])[0];
    const url = firstTag
      ? `/api/posts?pageSize=6&tag=${encodeURIComponent(firstTag)}`
      : `/api/posts?pageSize=6`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => {
        const items: RelatedPost[] = (d.posts ?? []).filter((p: RelatedPost) => p.slug !== post.slug);
        setRelated(items.slice(0, 3));
      })
      .catch(() => setRelated([]));
  }, [post]);

  // Recursively flatten React node trees (handles inline markdown like **bold**) so the
  // anchor id matches what extractToc() computes from raw markdown.
  function nodeToText(node: React.ReactNode): string {
    if (node === null || node === undefined || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(nodeToText).join("");
    if (typeof node === "object" && "props" in (node as { props?: unknown })) {
      const props = (node as { props?: { children?: React.ReactNode } }).props ?? {};
      return nodeToText(props.children);
    }
    return "";
  }

  // Inject heading anchors so TOC links work.
  const components = {
    h2: ({ children }: { children?: React.ReactNode }) => {
      const id = slugify(nodeToText(children));
      return (
        <h2 id={id} className="scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children }: { children?: React.ReactNode }) => {
      const id = slugify(nodeToText(children));
      return (
        <h3 id={id} className="scroll-mt-24">
          {children}
        </h3>
      );
    },
  } as const;

  return (
    <Layout>
      <article className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
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
                    loading="eager"
                  />
                ) : null}
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
                <div className="flex flex-wrap gap-3 mt-3 items-center">
                  {post.publishedAt ? (
                    <p className="text-sm text-muted-foreground">
                      Published {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  ) : null}
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground" data-testid="text-reading-time">
                    <Clock className="h-3.5 w-3.5" /> {minutes} min read
                  </span>
                  {(post.tags ?? []).map((t) => (
                    <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
                      <Badge variant="outline" className="cursor-pointer">
                        {t}
                      </Badge>
                    </Link>
                  ))}
                </div>

                {/* Mobile-only inline TOC */}
                {toc.length > 1 ? (
                  <details className="mt-8 lg:hidden border rounded-lg p-4" data-testid="toc-mobile">
                    <summary className="cursor-pointer font-semibold flex items-center gap-2">
                      <ListTree className="h-4 w-4" /> Table of contents
                    </summary>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {toc.map((h) => (
                        <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                          <a href={`#${h.id}`} className="text-muted-foreground hover:text-foreground hover:underline">
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}

                <div
                  className="prose prose-slate dark:prose-invert max-w-none mt-8 leading-relaxed"
                  data-testid="text-post-body"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                    components={components}
                  >
                    {post.body}
                  </ReactMarkdown>
                </div>

                {related.length > 0 ? (
                  <section className="mt-16 pt-10 border-t" data-testid="related-posts">
                    <h2 className="text-2xl font-bold mb-6">Related reads</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {related.map((r) => (
                        <Card key={r.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-5">
                            {r.coverImage ? (
                              <img
                                src={r.coverImage}
                                alt=""
                                className="rounded-md mb-3 aspect-[16/9] object-cover w-full"
                                loading="lazy"
                              />
                            ) : null}
                            <Link
                              href={`/blog/${r.slug}`}
                              className="font-semibold hover:underline"
                              data-testid={`link-related-${r.slug}`}
                            >
                              {r.title}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{r.excerpt}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                ) : null}
              </>
            )}
          </div>

          {/* Desktop sticky TOC */}
          {post && toc.length > 1 ? (
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24" data-testid="toc-desktop">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-3 flex items-center gap-2">
                  <ListTree className="h-3.5 w-3.5" /> On this page
                </div>
                <ul className="space-y-1.5 text-sm border-l">
                  {toc.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-7" : "pl-3"}>
                      <a
                        href={`#${h.id}`}
                        className="text-muted-foreground hover:text-foreground hover:underline block py-0.5"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>
      </article>
    </Layout>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
