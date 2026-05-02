import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, contentSectionsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/content/:key", async (req, res) => {
  const [row] = await db
    .select()
    .from(contentSectionsTable)
    .where(eq(contentSectionsTable.key, req.params.key!))
    .limit(1);
  if (!row) {
    res.status(404).json({ ok: false, error: "Section not found" });
    return;
  }
  res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
  res.json({ ok: true, key: row.key, value: row.value, updatedAt: row.updatedAt });
});

export default router;
