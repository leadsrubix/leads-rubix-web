import { Router, type IRouter } from "express";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import { requirePasswordOk } from "../../middlewares/auth";

const router: IRouter = Router();
router.use(requirePasswordOk);

const Query = z.object({
  source: z.string().optional(),
  days: z.coerce.number().int().min(7).max(180).default(30),
});

router.get("/", async (req, res) => {
  const parsed = Query.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid query" });
    return;
  }
  const { source, days } = parsed.data;
  const sourceFilter = source ? sql`AND source = ${source}` : sql``;

  const totalsRows = await db.execute<{
    total: number;
    new_count: number;
    contacted_count: number;
    qualified_count: number;
    won_count: number;
    lost_count: number;
    spam_count: number;
    last7d: number;
    last30d: number;
  }>(sql`
    SELECT
      coalesce(count(*), 0)::int                                                  AS total,
      coalesce(sum(case when status = 'new' then 1 else 0 end), 0)::int           AS new_count,
      coalesce(sum(case when status = 'contacted' then 1 else 0 end), 0)::int     AS contacted_count,
      coalesce(sum(case when status = 'qualified' then 1 else 0 end), 0)::int     AS qualified_count,
      coalesce(sum(case when status = 'won' then 1 else 0 end), 0)::int           AS won_count,
      coalesce(sum(case when status = 'lost' then 1 else 0 end), 0)::int          AS lost_count,
      coalesce(sum(case when status = 'spam' then 1 else 0 end), 0)::int          AS spam_count,
      coalesce(sum(case when created_at >= now() - interval '7 days' then 1 else 0 end), 0)::int  AS last7d,
      coalesce(sum(case when created_at >= now() - interval '30 days' then 1 else 0 end), 0)::int AS last30d
    FROM leads
    WHERE 1=1 ${sourceFilter}
  `);
  const totalsRow = totalsRows.rows[0]!;
  const totals = {
    total: totalsRow.total,
    newCount: totalsRow.new_count,
    contactedCount: totalsRow.contacted_count,
    qualifiedCount: totalsRow.qualified_count,
    wonCount: totalsRow.won_count,
    lostCount: totalsRow.lost_count,
    spamCount: totalsRow.spam_count,
    last7d: totalsRow.last7d,
    last30d: totalsRow.last30d,
  };

  const bySource = await db
    .select({ source: leadsTable.source, count: sql<number>`count(*)::int` })
    .from(leadsTable)
    .groupBy(leadsTable.source);

  const trend = await db.execute<{ day: string; count: number }>(sql`
    SELECT
      to_char(date_trunc('day', d), 'YYYY-MM-DD') AS day,
      coalesce(count(l.id), 0)::int AS count
    FROM generate_series(now()::date - (${days - 1}::int) * interval '1 day', now()::date, interval '1 day') AS d
    LEFT JOIN leads l
      ON date_trunc('day', l.created_at) = d
      ${source ? sql`AND l.source = ${source}` : sql``}
    GROUP BY d
    ORDER BY d ASC
  `);

  const topCompanies = await db
    .select({ company: leadsTable.company, count: sql<number>`count(*)::int` })
    .from(leadsTable)
    .groupBy(leadsTable.company)
    .orderBy(sql`count(*) desc`)
    .limit(10);

  // Period-over-period: this window vs the previous same-length window.
  const periodCompare = await db.execute<{
    current_count: number;
    previous_count: number;
  }>(sql`
    SELECT
      coalesce(sum(case when created_at >= now() - (${days}::int) * interval '1 day' then 1 else 0 end), 0)::int AS current_count,
      coalesce(sum(case when created_at >= now() - (${2 * days}::int) * interval '1 day'
                          and created_at <  now() - (${days}::int) * interval '1 day' then 1 else 0 end), 0)::int AS previous_count
    FROM leads
    WHERE 1=1 ${sourceFilter}
  `);
  const compareRow = periodCompare.rows[0]!;

  // Funnel: sequential lead counts by status (new + everything beyond, etc).
  const funnel = {
    new: totals.total,
    contacted:
      totals.contactedCount + totals.qualifiedCount + totals.wonCount + totals.lostCount,
    qualified: totals.qualifiedCount + totals.wonCount,
    won: totals.wonCount,
  };

  res.json({
    ok: true,
    days,
    source: source ?? null,
    totals,
    bySource,
    trend: trend.rows,
    topCompanies,
    funnel,
    periodCompare: {
      current: compareRow.current_count,
      previous: compareRow.previous_count,
    },
  });
});

export default router;
