import { Router, type IRouter } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, contentSectionsTable } from "@workspace/db";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();
router.use(requireAdmin);

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

const PutSchema = z.object({
  value: z.unknown(),
});

router.put("/:key", async (req, res) => {
  const parsed = PutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid payload" });
    return;
  }
  const key = req.params.key!;
  const updatedBy = req.session.adminUserId ?? null;
  const [row] = await db
    .insert(contentSectionsTable)
    .values({ key, value: parsed.data.value, updatedBy: updatedBy ?? undefined })
    .onConflictDoUpdate({
      target: contentSectionsTable.key,
      set: {
        value: parsed.data.value,
        updatedAt: new Date(),
        updatedBy: updatedBy ?? null,
      },
    })
    .returning();
  res.json({ ok: true, section: row });
});

export default router;
