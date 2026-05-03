import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";

const router: IRouter = Router();

// Returns lightweight, public-safe social-proof numbers we can render on the
// marketing site (e.g. "X teams onboarded this month"). Only aggregate counts
// are exposed — never any lead PII.
router.get("/stats/social-proof", async (_req, res) => {
  const rows = await db.execute<{
    total: number;
    last30d: number;
    last7d: number;
    distinct_companies: number;
  }>(sql`
    SELECT
      coalesce(count(*), 0)::int                                                      AS total,
      coalesce(sum(case when created_at >= now() - interval '30 days' then 1 else 0 end), 0)::int AS last30d,
      coalesce(sum(case when created_at >= now() - interval '7 days'  then 1 else 0 end), 0)::int AS last7d,
      coalesce(count(distinct nullif(trim(coalesce(company, '')), '')), 0)::int       AS distinct_companies
    FROM leads
    WHERE status <> 'spam'
  `);
  const row = rows.rows[0]!;

  res.setHeader("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
  res.json({
    ok: true,
    total: row.total,
    last30d: row.last30d,
    last7d: row.last7d,
    distinctCompanies: row.distinct_companies,
  });
});

export default router;
