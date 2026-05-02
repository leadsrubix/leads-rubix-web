import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();
router.use(requireAdmin);

router.get("/", async (_req, res) => {
  const [totals] = await db
    .select({
      total: sql<number>`coalesce(count(*), 0)::int`,
      newCount: sql<number>`coalesce(sum(case when status = 'new' then 1 else 0 end), 0)::int`,
      contactedCount: sql<number>`coalesce(sum(case when status = 'contacted' then 1 else 0 end), 0)::int`,
      qualifiedCount: sql<number>`coalesce(sum(case when status = 'qualified' then 1 else 0 end), 0)::int`,
      wonCount: sql<number>`coalesce(sum(case when status = 'won' then 1 else 0 end), 0)::int`,
      lostCount: sql<number>`coalesce(sum(case when status = 'lost' then 1 else 0 end), 0)::int`,
      last7d: sql<number>`coalesce(sum(case when created_at >= now() - interval '7 days' then 1 else 0 end), 0)::int`,
      last30d: sql<number>`coalesce(sum(case when created_at >= now() - interval '30 days' then 1 else 0 end), 0)::int`,
    })
    .from(leadsTable);

  const bySource = await db
    .select({
      source: leadsTable.source,
      count: sql<number>`count(*)::int`,
    })
    .from(leadsTable)
    .groupBy(leadsTable.source);

  const trend = await db.execute<{ day: string; count: number }>(sql`
    SELECT
      to_char(date_trunc('day', d), 'YYYY-MM-DD') AS day,
      coalesce(count(l.id), 0)::int AS count
    FROM generate_series(now()::date - interval '29 days', now()::date, interval '1 day') AS d
    LEFT JOIN leads l ON date_trunc('day', l.created_at) = d
    GROUP BY d
    ORDER BY d ASC
  `);

  const topCompanies = await db
    .select({
      company: leadsTable.company,
      count: sql<number>`count(*)::int`,
    })
    .from(leadsTable)
    .groupBy(leadsTable.company)
    .orderBy(sql`count(*) desc`)
    .limit(10);

  res.json({
    ok: true,
    totals: totals ?? {
      total: 0,
      newCount: 0,
      contactedCount: 0,
      qualifiedCount: 0,
      wonCount: 0,
      lostCount: 0,
      last7d: 0,
      last30d: 0,
    },
    bySource,
    trend: trend.rows,
    topCompanies,
  });
});

export default router;
