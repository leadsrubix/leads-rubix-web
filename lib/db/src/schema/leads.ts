import { pgTable, text, timestamp, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { adminUsersTable } from "./admin-users";

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
  assignedTo: uuid("assigned_to").references(() => adminUsersTable.id, { onDelete: "set null" }),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  lastActivityAt: timestamp("last_activity_at", { withTimezone: true }),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  gclid: text("gclid"),
  fbclid: text("fbclid"),
  referrer: text("referrer"),
  landingPath: text("landing_path"),
  score: integer("score"),
  scoreBand: text("score_band"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;

export const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const leadActivitiesTable = pgTable("lead_activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leadsTable.id, { onDelete: "cascade" }),
  actorId: uuid("actor_id").references(() => adminUsersTable.id, { onDelete: "set null" }),
  kind: text("kind").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type LeadActivity = typeof leadActivitiesTable.$inferSelect;
export type InsertLeadActivity = typeof leadActivitiesTable.$inferInsert;

export const LEAD_ACTIVITY_KINDS = [
  "created",
  "status_changed",
  "notes_changed",
  "assignee_changed",
  "tags_changed",
  "deleted",
] as const;
