import { Router, type IRouter } from "express";
import { z } from "zod";
import { and, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import {
  db,
  leadsTable,
  leadActivitiesTable,
  adminUsersTable,
  LEAD_STATUSES,
} from "@workspace/db";
import { requirePasswordOk } from "../../middlewares/auth";
import { writeAudit } from "../../lib/audit";

const router: IRouter = Router();
router.use(requirePasswordOk);

const ListQuery = z.object({
  q: z.string().optional(),
  status: z.enum(LEAD_STATUSES).optional(),
  source: z.string().optional(),
  assignedTo: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
});

router.get("/by-source", async (_req, res) => {
  // 30-day cutoff
  const rows = await db
    .select({
      source: leadsTable.source,
      total: sql<number>`count(*)::int`,
      last30: sql<number>`count(*) filter (where ${leadsTable.createdAt} >= now() - interval '30 days')::int`,
      won: sql<number>`count(*) filter (where ${leadsTable.status} = 'won')::int`,
      lost: sql<number>`count(*) filter (where ${leadsTable.status} = 'lost')::int`,
    })
    .from(leadsTable)
    .groupBy(leadsTable.source)
    .orderBy(desc(sql`count(*)`));
  const totalAll = rows.reduce((s, r) => s + Number(r.total ?? 0), 0);
  const total30 = rows.reduce((s, r) => s + Number(r.last30 ?? 0), 0);
  res.json({ rows, totalAll, total30 });
});

router.get("/", async (req, res) => {
  const parsed = ListQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid query" });
    return;
  }
  const { q, status, source, assignedTo, page, pageSize } = parsed.data;
  const conditions = [];
  if (status) conditions.push(eq(leadsTable.status, status));
  if (source) conditions.push(eq(leadsTable.source, source));
  if (assignedTo) {
    if (assignedTo === "unassigned") {
      conditions.push(sql`${leadsTable.assignedTo} IS NULL`);
    } else {
      conditions.push(eq(leadsTable.assignedTo, assignedTo));
    }
  }
  if (q && q.length > 0) {
    const pattern = `%${q}%`;
    conditions.push(
      or(
        ilike(leadsTable.name, pattern),
        ilike(leadsTable.email, pattern),
        ilike(leadsTable.company, pattern),
        ilike(leadsTable.phone, pattern),
        ilike(leadsTable.message, pattern),
      )!,
    );
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(leadsTable)
    .where(where ?? sql`true`);

  const rows = await db
    .select()
    .from(leadsTable)
    .where(where ?? sql`true`)
    .orderBy(desc(leadsTable.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  res.json({ ok: true, total: count ?? 0, page, pageSize, rows });
});

router.get("/export.csv", async (req, res) => {
  const headers = [
    "id",
    "createdAt",
    "source",
    "status",
    "assignedTo",
    "tags",
    "name",
    "email",
    "company",
    "phone",
    "teamSize",
    "message",
    "notes",
  ];
  const FORMULA_LEAD = /^[\s\u0000-\u001F]*[=+\-@\t\r]/;
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    let s = String(v).replace(/\r?\n/g, " ").replace(/"/g, '""');
    if (FORMULA_LEAD.test(s)) s = `'${s}`;
    return /[",]/.test(s) ? `"${s}"` : s;
  };

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
  );
  res.write(headers.join(",") + "\n");

  // Stream in batches so we don't buffer the whole table in memory.
  const BATCH = 500;
  let offset = 0;
  let written = 0;
  while (true) {
    const rows = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt))
      .limit(BATCH)
      .offset(offset);
    if (rows.length === 0) break;
    for (const r of rows) {
      const line = [
        r.id,
        r.createdAt.toISOString(),
        r.source,
        r.status,
        r.assignedTo ?? "",
        Array.isArray(r.tags) ? r.tags.join("|") : "",
        r.name,
        r.email,
        r.company,
        r.phone,
        r.teamSize ?? "",
        r.message,
        r.notes ?? "",
      ]
        .map(escape)
        .join(",");
      res.write(line + "\n");
    }
    written += rows.length;
    if (rows.length < BATCH) break;
    offset += BATCH;
  }
  await writeAudit(req, {
    action: "leads_exported",
    entityType: "lead",
    payload: { count: written },
  });
  res.end();
});

router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(leadsTable).where(eq(leadsTable.id, req.params.id!)).limit(1);
  if (!row) {
    res.status(404).json({ ok: false, error: "Lead not found" });
    return;
  }
  res.json({ ok: true, lead: row });
});

router.get("/:id/activities", async (req, res) => {
  const rows = await db
    .select({
      id: leadActivitiesTable.id,
      leadId: leadActivitiesTable.leadId,
      actorId: leadActivitiesTable.actorId,
      kind: leadActivitiesTable.kind,
      payload: leadActivitiesTable.payload,
      createdAt: leadActivitiesTable.createdAt,
      actorName: adminUsersTable.name,
      actorEmail: adminUsersTable.email,
    })
    .from(leadActivitiesTable)
    .leftJoin(adminUsersTable, eq(adminUsersTable.id, leadActivitiesTable.actorId))
    .where(eq(leadActivitiesTable.leadId, req.params.id!))
    .orderBy(desc(leadActivitiesTable.createdAt))
    .limit(200);
  res.json({ ok: true, activities: rows });
});

const TagsSchema = z.array(z.string().min(1).max(40)).max(20);

const PatchSchema = z
  .object({
    status: z.enum(LEAD_STATUSES).optional(),
    notes: z.string().max(5000).optional().nullable(),
    assignedTo: z.string().uuid().nullable().optional(),
    tags: TagsSchema.optional(),
  })
  .refine((d) => Object.keys(d).length > 0, { message: "Empty patch" });

router.patch("/:id", async (req, res) => {
  const parsed = PatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid payload",
    });
    return;
  }
  const [existing] = await db.select().from(leadsTable).where(eq(leadsTable.id, req.params.id!)).limit(1);
  if (!existing) {
    res.status(404).json({ ok: false, error: "Lead not found" });
    return;
  }

  const updates = { ...parsed.data, updatedAt: new Date(), lastActivityAt: new Date() };
  const [row] = await db
    .update(leadsTable)
    .set(updates)
    .where(eq(leadsTable.id, req.params.id!))
    .returning();

  // Activity log entries — one per changed field.
  const actorId = req.session.adminUserId ?? null;
  const activities: { kind: string; payload: Record<string, unknown> }[] = [];
  if (parsed.data.status && parsed.data.status !== existing.status) {
    activities.push({
      kind: "status_changed",
      payload: { from: existing.status, to: parsed.data.status },
    });
  }
  if (parsed.data.notes !== undefined && parsed.data.notes !== existing.notes) {
    activities.push({ kind: "notes_changed", payload: {} });
  }
  if (
    parsed.data.assignedTo !== undefined &&
    parsed.data.assignedTo !== existing.assignedTo
  ) {
    activities.push({
      kind: "assignee_changed",
      payload: { from: existing.assignedTo, to: parsed.data.assignedTo },
    });
  }
  if (
    parsed.data.tags &&
    JSON.stringify(parsed.data.tags) !== JSON.stringify(existing.tags ?? [])
  ) {
    activities.push({
      kind: "tags_changed",
      payload: { from: existing.tags ?? [], to: parsed.data.tags },
    });
  }
  if (activities.length > 0) {
    try {
      await db.insert(leadActivitiesTable).values(
        activities.map((a) => ({
          leadId: row!.id,
          actorId,
          kind: a.kind,
          payload: a.payload,
        })),
      );
    } catch (err) {
      req.log.warn({ err }, "leads: failed to write activities");
    }
  }

  await writeAudit(req, {
    action: "lead_updated",
    entityType: "lead",
    entityId: row!.id,
    payload: { changes: Object.keys(parsed.data) },
  });

  res.json({ ok: true, lead: row });
});

router.delete("/:id", async (req, res) => {
  const result = await db
    .delete(leadsTable)
    .where(eq(leadsTable.id, req.params.id!))
    .returning({ id: leadsTable.id });
  if (result.length === 0) {
    res.status(404).json({ ok: false, error: "Lead not found" });
    return;
  }
  await writeAudit(req, {
    action: "lead_deleted",
    entityType: "lead",
    entityId: req.params.id!,
  });
  res.json({ ok: true });
});

const BulkSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(500),
  action: z.enum(["status", "assign", "delete", "tag_add", "tag_remove"]),
  status: z.enum(LEAD_STATUSES).optional(),
  assignedTo: z.string().uuid().nullable().optional(),
  tag: z.string().min(1).max(40).optional(),
});

router.post("/bulk", async (req, res) => {
  const parsed = BulkSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid payload",
    });
    return;
  }
  const { ids, action } = parsed.data;
  let count = 0;

  if (action === "delete") {
    const r = await db.delete(leadsTable).where(inArray(leadsTable.id, ids)).returning({ id: leadsTable.id });
    count = r.length;
  } else if (action === "status") {
    if (!parsed.data.status) {
      res.status(400).json({ ok: false, error: "status is required" });
      return;
    }
    const r = await db
      .update(leadsTable)
      .set({ status: parsed.data.status, updatedAt: new Date(), lastActivityAt: new Date() })
      .where(inArray(leadsTable.id, ids))
      .returning({ id: leadsTable.id });
    count = r.length;
  } else if (action === "assign") {
    const r = await db
      .update(leadsTable)
      .set({
        assignedTo: parsed.data.assignedTo ?? null,
        updatedAt: new Date(),
        lastActivityAt: new Date(),
      })
      .where(inArray(leadsTable.id, ids))
      .returning({ id: leadsTable.id });
    count = r.length;
  } else if (action === "tag_add" || action === "tag_remove") {
    if (!parsed.data.tag) {
      res.status(400).json({ ok: false, error: "tag is required" });
      return;
    }
    const tag = parsed.data.tag;
    const rows = await db.select().from(leadsTable).where(inArray(leadsTable.id, ids));
    for (const r of rows) {
      const existing = Array.isArray(r.tags) ? r.tags : [];
      const next =
        action === "tag_add"
          ? Array.from(new Set([...existing, tag]))
          : existing.filter((t) => t !== tag);
      await db
        .update(leadsTable)
        .set({ tags: next, updatedAt: new Date(), lastActivityAt: new Date() })
        .where(eq(leadsTable.id, r.id));
    }
    count = rows.length;
  }

  await writeAudit(req, {
    action: `lead_bulk_${action}`,
    entityType: "lead",
    payload: { count, ids: ids.slice(0, 50) },
  });

  res.json({ ok: true, count });
});

export default router;
