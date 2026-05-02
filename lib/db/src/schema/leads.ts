import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const leadsTable = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  source: text("source").notNull().default("contact"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone").notNull(),
  teamSize: text("team_size"),
  message: text("message").notNull(),
  ipHash: text("ip_hash"),
  status: text("status").notNull().default("new"),
  notes: text("notes"),
  messageLength: integer("message_length"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;

export const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
