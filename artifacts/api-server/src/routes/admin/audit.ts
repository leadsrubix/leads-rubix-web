import { Router, type IRouter } from "express";
import { z } from "zod";
import { and, desc, eq, sql } from "drizzle-orm";
import { db, auditEventsTable, adminUsersTable } from "@workspace/db";
import { requirePasswordOk } from "../../middlewares/auth";

const router: IRouter = Router();
router.use(requirePasswordOk);

const ListQuery = z.object({
  action: z.string().optional(),
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  actorId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
});

router.get("/", async (req, res) => {
  const parsed = ListQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid query" });
    return;
  }
  const { action, entityType, entityId, actorId, page, pageSize } = parsed.data;
  const conds = [];
  if (action) conds.push(eq(auditEventsTable.action, action));
  if (entityType) conds.push(eq(auditEventsTable.entityType, entityType));
  if (entityId) conds.push(eq(auditEventsTable.entityId, entityId));
  if (actorId) conds.push(eq(auditEventsTable.actorId, actorId));
  const where = conds.length > 0 ? and(...conds) : undefined;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(auditEventsTable)
    .where(where ?? sql`true`);

  const rows = await db
    .select({
      id: auditEventsTable.id,
      actorId: auditEventsTable.actorId,
      actorEmail: auditEventsTable.actorEmail,
      actorName: adminUsersTable.name,
      action: auditEventsTable.action,
      entityType: auditEventsTable.entityType,
      entityId: auditEventsTable.entityId,
      payload: auditEventsTable.payload,
      createdAt: auditEventsTable.createdAt,
    })
    .from(auditEventsTable)
    .leftJoin(adminUsersTable, eq(adminUsersTable.id, auditEventsTable.actorId))
    .where(where ?? sql`true`)
    .orderBy(desc(auditEventsTable.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  res.json({ ok: true, total: count ?? 0, page, pageSize, rows });
});

export default router;
