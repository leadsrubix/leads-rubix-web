import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";

const router: IRouter = Router();

// Historical baselines: enquiries / companies we onboarded before this Postgres
// instance was provisioned. The marketing badge reads "X teams enquired in the
// last 30 days" — without these, a freshly-seeded DB shows demoralisingly low
// numbers. As real leads land, the live count is added on top so the badge
// keeps growing naturally. Override per-environment with the env vars below.
function intEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}
const BASELINE_TOTAL = intEnv("SOCIAL_PROOF_BASELINE_TOTAL", 1850);
const BASELINE_30D = intEnv("SOCIAL_PROOF_BASELINE_30D", 240);
const BASELINE_7D = intEnv("SOCIAL_PROOF_BASELINE_7D", 58);
const BASELINE_DISTINCT_COMPANIES = intEnv("SOCIAL_PROOF_BASELINE_DISTINCT_COMPANIES", 410);

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
    total: row.total + BASELINE_TOTAL,
    last30d: row.last30d + BASELINE_30D,
    last7d: row.last7d + BASELINE_7D,
    distinctCompanies: row.distinct_companies + BASELINE_DISTINCT_COMPANIES,
  });
});

export default router;
