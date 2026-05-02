import { Router, type IRouter } from "express";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { db, postsTable, POST_STATUSES } from "@workspace/db";
import { requirePasswordOk } from "../../middlewares/auth";
import { writeAudit } from "../../lib/audit";

const router: IRouter = Router();
router.use(requirePasswordOk);

const slugRegex = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

// Accept either a full URL (https://…) or a relative server-side path
// (e.g. "/api/objects/uploads/<uuid>" produced by adminApi.uploadFile).
const optionalUrl = z
  .string()
  .max(500)
  .refine((v) => /^https?:\/\//i.test(v) || v.startsWith("/"), {
    message: "Must be a full URL or a server-relative path",
  })
  .nullable()
  .optional();
const TagsSchema = z.array(z.string().min(1).max(40)).max(20);

const UpsertSchema = z.object({
  slug: z.string().min(1).max(120).regex(slugRegex, "Use lowercase letters, numbers and dashes"),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).default(""),
  body: z.string().max(50_000).default(""),
  coverImage: optionalUrl,
  metaDescription: z.string().max(300).nullable().optional(),
  ogImage: optionalUrl,
  tags: TagsSchema.default([]),
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
        slug: parsed.data.slug,
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        body: parsed.data.body,
        coverImage: parsed.data.coverImage ?? null,
        metaDescription: parsed.data.metaDescription ?? null,
        ogImage: parsed.data.ogImage ?? null,
        tags: parsed.data.tags,
        status: parsed.data.status,
        authorId: req.session.adminUserId ?? null,
        publishedAt,
      })
      .returning();
    await writeAudit(req, {
      action: "post_created",
      entityType: "post",
      entityId: row!.id,
      payload: { slug: row!.slug, status: row!.status },
    });
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

  const updates: Record<string, unknown> = {
    publishedAt,
    updatedAt: new Date(),
  };
  if (parsed.data.slug !== undefined) updates.slug = parsed.data.slug;
  if (parsed.data.title !== undefined) updates.title = parsed.data.title;
  if (parsed.data.excerpt !== undefined) updates.excerpt = parsed.data.excerpt;
  if (parsed.data.body !== undefined) updates.body = parsed.data.body;
  if (parsed.data.status !== undefined) updates.status = parsed.data.status;
  if (parsed.data.coverImage !== undefined) updates.coverImage = parsed.data.coverImage;
  if (parsed.data.metaDescription !== undefined) updates.metaDescription = parsed.data.metaDescription;
  if (parsed.data.ogImage !== undefined) updates.ogImage = parsed.data.ogImage;
  if (parsed.data.tags !== undefined) updates.tags = parsed.data.tags;

  try {
    const [row] = await db
      .update(postsTable)
      .set(updates)
      .where(eq(postsTable.id, req.params.id!))
      .returning();
    await writeAudit(req, {
      action: "post_updated",
      entityType: "post",
      entityId: row!.id,
      payload: { changes: Object.keys(parsed.data) },
    });
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
  await writeAudit(req, {
    action: "post_deleted",
    entityType: "post",
    entityId: req.params.id!,
  });
  res.json({ ok: true });
});

export default router;
