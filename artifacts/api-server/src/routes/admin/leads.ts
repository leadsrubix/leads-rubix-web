import { Router, type IRouter } from "express";
import { z } from "zod";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db, leadsTable, LEAD_STATUSES } from "@workspace/db";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();
router.use(requireAdmin);

const ListQuery = z.object({
  q: z.string().optional(),
  status: z.enum(LEAD_STATUSES).optional(),
  source: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
});

router.get("/", async (req, res) => {
  const parsed = ListQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid query" });
    return;
  }
  const { q, status, source, page, pageSize } = parsed.data;
  const conditions = [];
  if (status) conditions.push(eq(leadsTable.status, status));
  if (source) conditions.push(eq(leadsTable.source, source));
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
  const rows = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
  const headers = [
    "id",
    "createdAt",
    "source",
    "status",
    "name",
    "email",
    "company",
    "phone",
    "teamSize",
    "message",
    "notes",
  ];
  // Neutralise CSV/Excel formula injection: any cell whose first non-whitespace
  // character is =, +, -, @, tab or CR can be interpreted as a formula by Excel,
  // Google Sheets, LibreOffice and others. Prefix such cells with a single quote
  // so they are treated as plain text.
  const FORMULA_LEAD = /^[\s\u0000-\u001F]*[=+\-@\t\r]/;
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    let s = String(v).replace(/\r?\n/g, " ").replace(/"/g, '""');
    if (FORMULA_LEAD.test(s)) s = `'${s}`;
    return /[",]/.test(s) ? `"${s}"` : s;
  };
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      r.id,
      r.createdAt.toISOString(),
      r.source,
      r.status,
      r.name,
      r.email,
      r.company,
      r.phone,
      r.teamSize ?? "",
      r.message,
      r.notes ?? "",
    ].map(escape).join(","));
  }
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send(lines.join("\n"));
});

router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(leadsTable).where(eq(leadsTable.id, req.params.id!)).limit(1);
  if (!row) {
    res.status(404).json({ ok: false, error: "Lead not found" });
    return;
  }
  res.json({ ok: true, lead: row });
});

const PatchSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  notes: z.string().max(5000).optional(),
});

router.patch("/:id", async (req, res) => {
  const parsed = PatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid payload" });
    return;
  }
  const updates = { ...parsed.data, updatedAt: new Date() };
  const [row] = await db
    .update(leadsTable)
    .set(updates)
    .where(eq(leadsTable.id, req.params.id!))
    .returning();
  if (!row) {
    res.status(404).json({ ok: false, error: "Lead not found" });
    return;
  }
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
  res.json({ ok: true });
});

export default router;
