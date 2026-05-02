import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, postsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/posts", async (_req, res) => {
  const rows = await db
    .select({
      id: postsTable.id,
      slug: postsTable.slug,
      title: postsTable.title,
      excerpt: postsTable.excerpt,
      coverImage: postsTable.coverImage,
      publishedAt: postsTable.publishedAt,
    })
    .from(postsTable)
    .where(eq(postsTable.status, "published"))
    .orderBy(desc(postsTable.publishedAt));
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.json({ ok: true, posts: rows });
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
      publishedAt: row.publishedAt,
    },
  });
});

export default router;
