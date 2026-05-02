import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { adminUsersTable } from "./admin-users";

export const contentVersionsTable = pgTable("content_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").notNull(),
  value: jsonb("value").notNull(),
  savedBy: uuid("saved_by").references(() => adminUsersTable.id, { onDelete: "set null" }),
  savedAt: timestamp("saved_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ContentVersion = typeof contentVersionsTable.$inferSelect;
export type InsertContentVersion = typeof contentVersionsTable.$inferInsert;
