import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const adminUsersTable = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  mustChangePassword: boolean("must_change_password").notNull().default(false),
  lastPasswordChangeAt: timestamp("last_password_change_at", { withTimezone: true }),
  failedLoginAttempts: integer("failed_login_attempts").notNull().default(0),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  // Per-user TOTP 2FA. `totpSecret` is the base32 shared secret (only set
  // once a user has confirmed enrollment). `totpRecoveryCodes` stores bcrypt
  // hashes of one-time recovery codes — never the plaintext codes.
  totpEnabled: boolean("totp_enabled").notNull().default(false),
  totpSecret: text("totp_secret"),
  totpRecoveryCodes: jsonb("totp_recovery_codes").$type<string[]>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AdminUser = typeof adminUsersTable.$inferSelect;
export type InsertAdminUser = typeof adminUsersTable.$inferInsert;
