import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notFoundHitsTable = pgTable("not_found_hits", {
  id: uuid("id").defaultRandom().primaryKey(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  ipHash: text("ip_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type NotFoundHit = typeof notFoundHitsTable.$inferSelect;
export type InsertNotFoundHit = typeof notFoundHitsTable.$inferInsert;
