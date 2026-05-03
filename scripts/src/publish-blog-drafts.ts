/**
 * One-shot: flips the seeded blog drafts to `published` so the marketing site
 * starts ranking. Idempotent — only touches rows still in `draft`.
 */
import "dotenv/config";
import { db, postsTable } from "@workspace/db";
import { eq, and, inArray } from "drizzle-orm";

const SLUGS = [
  "facebook-lead-ads-india-real-estate",
  "rera-compliance-crm-checklist",
  "whatsapp-business-api-real-estate",
  "lead-rotation-strategies-india",
];

async function run() {
  const now = new Date();
  const result = await db
    .update(postsTable)
    .set({ status: "published", publishedAt: now })
    .where(and(inArray(postsTable.slug, SLUGS), eq(postsTable.status, "draft")))
    .returning({ slug: postsTable.slug });
  console.log(`[publish-blog-drafts] published ${result.length} posts`);
  for (const r of result) console.log(`  - ${r.slug}`);
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[publish-blog-drafts] failed:", err);
    process.exit(1);
  });
