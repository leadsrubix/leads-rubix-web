import { Router, type IRouter } from "express";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { db, postsTable, POST_STATUSES } from "@workspace/db";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();
router.use(requireAdmin);

const slugRegex = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const UpsertSchema = z.object({
  slug: z.string().min(1).max(120).regex(slugRegex, "Use lowercase letters, numbers and dashes"),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).default(""),
  body: z.string().max(50_000).default(""),
  coverImage: z.string().url().max(500).optional().nullable(),
  status: z.enum(POST_STATUSES).default("draft"),
});

router.get("/", async (_req, res) => {
  const rows = await db.select().from(postsTable).orderBy(desc(postsTable.updatedAt));
  res.json({ ok: true, posts: rows });
});

router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(postsTable).where(eq(postsTable.id, req.params.id!)).limit(1);
  if (!row) {
    res.status(404).json({ ok: false, error: "Post not found" });
    return;
  }
  res.json({ ok: true, post: row });
});

router.post("/", async (req, res) => {
  const parsed = UpsertSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid payload" });
    return;
  }
  try {
    const publishedAt = parsed.data.status === "published" ? new Date() : null;
    const [row] = await db
      .insert(postsTable)
      .values({
        ...parsed.data,
        coverImage: parsed.data.coverImage ?? null,
        authorId: req.session.adminUserId ?? null,
        publishedAt,
      })
      .returning();
    res.json({ ok: true, post: row });
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "23505") {
      res.status(409).json({ ok: false, error: "A post with that slug already exists" });
      return;
    }
    throw err;
  }
});

router.patch("/:id", async (req, res) => {
  const parsed = UpsertSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid payload" });
    return;
  }
  const [existing] = await db.select().from(postsTable).where(eq(postsTable.id, req.params.id!)).limit(1);
  if (!existing) {
    res.status(404).json({ ok: false, error: "Post not found" });
    return;
  }
  const nextStatus = parsed.data.status ?? existing.status;
  let publishedAt = existing.publishedAt;
  if (nextStatus === "published" && !existing.publishedAt) publishedAt = new Date();
  if (nextStatus === "draft") publishedAt = null;

  try {
    const [row] = await db
      .update(postsTable)
      .set({
        ...parsed.data,
        coverImage: parsed.data.coverImage ?? existing.coverImage,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(postsTable.id, req.params.id!))
      .returning();
    res.json({ ok: true, post: row });
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "23505") {
      res.status(409).json({ ok: false, error: "A post with that slug already exists" });
      return;
    }
    throw err;
  }
});

router.delete("/:id", async (req, res) => {
  const result = await db
    .delete(postsTable)
    .where(eq(postsTable.id, req.params.id!))
    .returning({ id: postsTable.id });
  if (result.length === 0) {
    res.status(404).json({ ok: false, error: "Post not found" });
    return;
  }
  res.json({ ok: true });
});

export default router;
