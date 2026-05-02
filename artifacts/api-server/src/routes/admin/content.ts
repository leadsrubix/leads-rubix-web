import { Router, type IRouter } from "express";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { db, contentSectionsTable, contentVersionsTable } from "@workspace/db";
import { requirePasswordOk } from "../../middlewares/auth";
import { validateContent } from "../../lib/content-validators";
import { writeAudit } from "../../lib/audit";

const router: IRouter = Router();
router.use(requirePasswordOk);

router.get("/", async (_req, res) => {
  const rows = await db.select().from(contentSectionsTable);
  res.json({ ok: true, sections: rows });
});

router.get("/:key", async (req, res) => {
  const [row] = await db
    .select()
    .from(contentSectionsTable)
    .where(eq(contentSectionsTable.key, req.params.key!))
    .limit(1);
  if (!row) {
    res.status(404).json({ ok: false, error: "Section not found" });
    return;
  }
  res.json({ ok: true, section: row });
});

router.get("/:key/history", async (req, res) => {
  const rows = await db
    .select()
    .from(contentVersionsTable)
    .where(eq(contentVersionsTable.key, req.params.key!))
    .orderBy(desc(contentVersionsTable.savedAt))
    .limit(50);
  res.json({ ok: true, versions: rows });
});

const PutSchema = z.object({ value: z.unknown() });

router.put("/:key", async (req, res) => {
  const parsed = PutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid payload" });
    return;
  }
  const key = req.params.key!;
  const result = validateContent(key, parsed.data.value);
  if (!result.ok) {
    res.status(400).json({ ok: false, error: result.error });
    return;
  }
  const updatedBy = req.session.adminUserId ?? null;

  const [row] = await db
    .insert(contentSectionsTable)
    .values({ key, value: result.value, updatedBy: updatedBy ?? undefined })
    .onConflictDoUpdate({
      target: contentSectionsTable.key,
      set: {
        value: result.value,
        updatedAt: new Date(),
        updatedBy: updatedBy ?? null,
      },
    })
    .returning();

  // Snapshot the new value as a version (best-effort).
  try {
    await db.insert(contentVersionsTable).values({
      key,
      value: result.value as Record<string, unknown>,
      savedBy: updatedBy,
    });
  } catch (err) {
    req.log.warn({ err, key }, "content: failed to write version snapshot");
  }

  await writeAudit(req, {
    action: "content_updated",
    entityType: "content_section",
    entityId: key,
  });

  res.json({ ok: true, section: row });
});

const RestoreSchema = z.object({ versionId: z.string().uuid() });

router.post("/:key/restore", async (req, res) => {
  const parsed = RestoreSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid payload" });
    return;
  }
  const key = req.params.key!;
  const [version] = await db
    .select()
    .from(contentVersionsTable)
    .where(eq(contentVersionsTable.id, parsed.data.versionId))
    .limit(1);
  if (!version || version.key !== key) {
    res.status(404).json({ ok: false, error: "Version not found" });
    return;
  }
  const updatedBy = req.session.adminUserId ?? null;
  const [row] = await db
    .insert(contentSectionsTable)
    .values({ key, value: version.value, updatedBy: updatedBy ?? undefined })
    .onConflictDoUpdate({
      target: contentSectionsTable.key,
      set: { value: version.value, updatedAt: new Date(), updatedBy: updatedBy ?? null },
    })
    .returning();

  await db.insert(contentVersionsTable).values({
    key,
    value: version.value as Record<string, unknown>,
    savedBy: updatedBy,
  });

  await writeAudit(req, {
    action: "content_restored",
    entityType: "content_section",
    entityId: key,
    payload: { restoredFromVersionId: version.id },
  });

  res.json({ ok: true, section: row });
});

export default router;
