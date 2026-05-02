import "dotenv/config";
import bcrypt from "bcryptjs";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@leadsrubix.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe!2026";
  const name = process.env.ADMIN_NAME ?? "Leads Rubix Admin";

  const [existing] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email))
    .limit(1);

  const hash = await bcrypt.hash(password, 10);

  // If the password is the well-known default, force a change on first login.
  const mustChangePassword = password === "ChangeMe!2026";

  if (existing) {
    await db
      .update(adminUsersTable)
      .set({
        passwordHash: hash,
        name,
        mustChangePassword,
        failedLoginAttempts: 0,
        lockedUntil: null,
        updatedAt: new Date(),
      })
      .where(eq(adminUsersTable.id, existing.id));
    console.log(`[seed-admin] Updated existing admin: ${email}`);
  } else {
    await db.insert(adminUsersTable).values({
      email,
      name,
      role: "owner",
      passwordHash: hash,
      mustChangePassword,
    });
    console.log(`[seed-admin] Created admin: ${email}`);
  }
  console.log("");
  console.log("  Email:    " + email);
  console.log("  Password: " + password);
  console.log("");
  console.log("Sign in at /admin/login.");
  process.exit(0);
}

main().catch((err) => {
  console.error("[seed-admin] failed:", err);
  process.exit(1);
});
