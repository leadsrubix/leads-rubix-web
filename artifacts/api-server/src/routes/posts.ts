import { Router, type IRouter } from "express";
import { z } from "zod";
import { and, desc, eq, sql } from "drizzle-orm";
import { db, postsTable } from "@workspace/db";

const router: IRouter = Router();

const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
  tag: z.string().max(40).optional(),
});

router.get("/posts", async (req, res) => {
  const parsed = ListQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid query" });
    return;
  }
  const { page, pageSize, tag } = parsed.data;
  // Hide scheduled posts (status=published with a future publishedAt) from
  // the public list until their publish time has passed.
  const visible = and(
    eq(postsTable.status, "published"),
    sql`(${postsTable.publishedAt} IS NULL OR ${postsTable.publishedAt} <= now())`,
  );
  const where = tag ? and(visible, sql`${postsTable.tags}::jsonb ? ${tag}`) : visible;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(postsTable)
    .where(where);

  const rows = await db
    .select({
      id: postsTable.id,
      slug: postsTable.slug,
      title: postsTable.title,
      excerpt: postsTable.excerpt,
      coverImage: postsTable.coverImage,
      tags: postsTable.tags,
      publishedAt: postsTable.publishedAt,
    })
    .from(postsTable)
    .where(where)
    .orderBy(desc(postsTable.publishedAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.json({ ok: true, total: count ?? 0, page, pageSize, posts: rows });
});

router.get("/blog/rss.xml", async (_req, res) => {
  const rows = await db
    .select({
      slug: postsTable.slug,
      title: postsTable.title,
      excerpt: postsTable.excerpt,
      publishedAt: postsTable.publishedAt,
    })
    .from(postsTable)
    .where(
      and(
        eq(postsTable.status, "published"),
        sql`(${postsTable.publishedAt} IS NULL OR ${postsTable.publishedAt} <= now())`,
      ),
    )
    .orderBy(desc(postsTable.publishedAt))
    .limit(50);

  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const SITE = "https://leadsrubix.com";
  const lastBuild = rows[0]?.publishedAt ? new Date(rows[0].publishedAt).toUTCString() : new Date().toUTCString();
  const items = rows
    .map((r) => {
      const link = `${SITE}/blog/${r.slug}`;
      const pub = r.publishedAt ? new Date(r.publishedAt).toUTCString() : "";
      return [
        "    <item>",
        `      <title>${escape(r.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        pub ? `      <pubDate>${pub}</pubDate>` : "",
        `      <description>${escape(r.excerpt ?? "")}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Leads Rubix Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/api/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on lead management, sales operations and CRM best practices for India's high-velocity sales teams.</description>
    <language>en-in</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
  res.send(xml);
});

router.get("/posts/:slug", async (req, res) => {
  const [row] = await db
    .select()
    .from(postsTable)
    .where(
      and(
        eq(postsTable.slug, req.params.slug!),
        eq(postsTable.status, "published"),
        sql`(${postsTable.publishedAt} IS NULL OR ${postsTable.publishedAt} <= now())`,
      ),
    )
    .limit(1);
  if (!row) {
    res.status(404).json({ ok: false, error: "Post not found" });
    return;
  }
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.json({
    ok: true,
    post: {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      body: row.body,
      coverImage: row.coverImage,
      metaDescription: row.metaDescription,
      ogImage: row.ogImage,
      tags: row.tags,
      publishedAt: row.publishedAt,
    },
  });
});

export default router;
