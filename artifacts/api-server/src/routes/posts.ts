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
  const where = tag
    ? and(eq(postsTable.status, "published"), sql`${postsTable.tags}::jsonb ? ${tag}`)
    : eq(postsTable.status, "published");

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

router.get("/posts/:slug", async (req, res) => {
  const [row] = await db
    .select()
    .from(postsTable)
    .where(and(eq(postsTable.slug, req.params.slug!), eq(postsTable.status, "published")))
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
