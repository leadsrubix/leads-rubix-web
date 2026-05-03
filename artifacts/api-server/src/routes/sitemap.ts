import { Router, type IRouter } from "express";
import { and, desc, eq, sql } from "drizzle-orm";
import { db, postsTable } from "@workspace/db";

const router: IRouter = Router();

const ORIGIN = "https://leadsrubix.com";

const STATIC_URLS: Array<{ loc: string; changefreq: string; priority: string }> = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/features", changefreq: "monthly", priority: "0.9" },
  { loc: "/solutions", changefreq: "monthly", priority: "0.9" },
  { loc: "/integrations", changefreq: "monthly", priority: "0.8" },
  { loc: "/pricing", changefreq: "monthly", priority: "0.95" },
  { loc: "/security", changefreq: "monthly", priority: "0.7" },
  { loc: "/compare", changefreq: "monthly", priority: "0.85" },
  { loc: "/vs/salesforce", changefreq: "monthly", priority: "0.8" },
  { loc: "/vs/hubspot", changefreq: "monthly", priority: "0.8" },
  { loc: "/vs/zoho", changefreq: "monthly", priority: "0.8" },
  { loc: "/vs/sell-do", changefreq: "monthly", priority: "0.8" },
  { loc: "/docs/api", changefreq: "monthly", priority: "0.5" },
  { loc: "/tools/response-time-calculator", changefreq: "monthly", priority: "0.7" },
  { loc: "/case-studies", changefreq: "monthly", priority: "0.8" },
  { loc: "/case-studies/real-estate", changefreq: "monthly", priority: "0.7" },
  { loc: "/case-studies/education", changefreq: "monthly", priority: "0.7" },
  { loc: "/case-studies/healthcare", changefreq: "monthly", priority: "0.7" },
  { loc: "/case-studies/bfsi", changefreq: "monthly", priority: "0.7" },
  { loc: "/case-studies/saas", changefreq: "monthly", priority: "0.7" },
  { loc: "/case-studies/manufacturing", changefreq: "monthly", priority: "0.7" },
  { loc: "/demo", changefreq: "monthly", priority: "0.9" },
  { loc: "/faq", changefreq: "monthly", priority: "0.7" },
  { loc: "/about", changefreq: "monthly", priority: "0.6" },
  { loc: "/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", changefreq: "weekly", priority: "0.8" },
  { loc: "/changelog", changefreq: "weekly", priority: "0.6" },
  { loc: "/status", changefreq: "daily", priority: "0.5" },
  { loc: "/industries", changefreq: "monthly", priority: "0.85" },
  { loc: "/industries/real-estate", changefreq: "monthly", priority: "0.8" },
  { loc: "/industries/education", changefreq: "monthly", priority: "0.8" },
  { loc: "/industries/healthcare", changefreq: "monthly", priority: "0.8" },
  { loc: "/industries/automotive", changefreq: "monthly", priority: "0.8" },
  { loc: "/industries/financial-services", changefreq: "monthly", priority: "0.8" },
  { loc: "/industries/travel", changefreq: "monthly", priority: "0.8" },
  { loc: "/industries/saas", changefreq: "monthly", priority: "0.8" },
  { loc: "/industries/manufacturing", changefreq: "monthly", priority: "0.8" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.4" },
  { loc: "/terms", changefreq: "yearly", priority: "0.4" },
  { loc: "/refund", changefreq: "yearly", priority: "0.4" },
  { loc: "/cookies", changefreq: "yearly", priority: "0.4" },
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

router.get("/sitemap.xml", async (_req, res) => {
  // Pull only published posts whose publishedAt has actually passed (mirrors
  // the public list filter). Hidden / scheduled posts must not be advertised
  // to crawlers, that's how scheduled-content leaks happen.
  const posts = await db
    .select({
      slug: postsTable.slug,
      updatedAt: postsTable.updatedAt,
      publishedAt: postsTable.publishedAt,
    })
    .from(postsTable)
    .where(
      and(
        eq(postsTable.status, "published"),
        sql`(${postsTable.publishedAt} IS NULL OR ${postsTable.publishedAt} <= now())`,
      ),
    )
    .orderBy(desc(postsTable.publishedAt));

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const u of STATIC_URLS) {
    lines.push(
      `<url><loc>${escapeXml(ORIGIN + u.loc)}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
    );
  }

  for (const p of posts) {
    const lastmod = (p.publishedAt ?? p.updatedAt)?.toISOString().split("T")[0];
    const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
    lines.push(
      `<url><loc>${escapeXml(`${ORIGIN}/blog/${p.slug}`)}</loc>${lastmodTag}<changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    );
  }

  lines.push("</urlset>");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=900");
  res.send(lines.join("\n"));
});

export default router;
