import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
import { adminUsersTable } from "./admin-users";

export const contentSectionsTable = pgTable("content_sections", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  updatedBy: uuid("updated_by").references(() => adminUsersTable.id, { onDelete: "set null" }),
});

export type ContentSection = typeof contentSectionsTable.$inferSelect;
export type InsertContentSection = typeof contentSectionsTable.$inferInsert;
