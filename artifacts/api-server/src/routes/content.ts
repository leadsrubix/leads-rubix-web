import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, contentSectionsTable } from "@workspace/db";

const router: IRouter = Router();

// Keys whose values contain credentials/webhook URLs and must NEVER be served
// to unauthenticated callers. The admin UI fetches them via the auth-gated
// /api/admin/content/:key endpoint instead.
const PRIVATE_KEYS = new Set(["integrations"]);

router.get("/content/:key", async (req, res) => {
  const key = req.params.key!;
  if (PRIVATE_KEYS.has(key)) {
    res.status(404).json({ ok: false, error: "Section not found" });
    return;
  }
  const [row] = await db
    .select()
    .from(contentSectionsTable)
    .where(eq(contentSectionsTable.key, key))
    .limit(1);
  if (!row) {
    res.status(404).json({ ok: false, error: "Section not found" });
    return;
  }
  res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
  res.json({ ok: true, key: row.key, value: row.value, updatedAt: row.updatedAt });
});

export default router;
