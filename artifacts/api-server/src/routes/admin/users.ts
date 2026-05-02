import { Router, type IRouter } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { desc, eq, sql } from "drizzle-orm";
import { db, adminUsersTable } from "@workspace/db";
import { requirePasswordOk } from "../../middlewares/auth";
import { writeAudit } from "../../lib/audit";

const router: IRouter = Router();
router.use(requirePasswordOk);

const CreateSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().min(2).max(120),
  role: z.string().max(40).default("admin"),
  password: z.string().min(8).max(200),
  mustChangePassword: z.boolean().default(true),
});

const PatchSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  role: z.string().max(40).optional(),
  password: z.string().min(8).max(200).optional(),
  mustChangePassword: z.boolean().optional(),
});

function shape(user: typeof adminUsersTable.$inferSelect) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    mustChangePassword: user.mustChangePassword,
    lastPasswordChangeAt: user.lastPasswordChangeAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(adminUsersTable).orderBy(desc(adminUsersTable.createdAt));
  res.json({ ok: true, users: rows.map(shape) });
});

router.post("/", async (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid payload" });
    return;
  }
  const hash = await bcrypt.hash(parsed.data.password, 10);
  try {
    const [row] = await db
      .insert(adminUsersTable)
      .values({
        email: parsed.data.email.toLowerCase(),
        name: parsed.data.name,
        role: parsed.data.role,
        passwordHash: hash,
        mustChangePassword: parsed.data.mustChangePassword,
        lastPasswordChangeAt: new Date(),
      })
      .returning();
    await writeAudit(req, {
      action: "user_created",
      entityType: "admin_user",
      entityId: row!.id,
      payload: { email: row!.email, role: row!.role },
    });
    res.json({ ok: true, user: shape(row) });
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "23505") {
      res.status(409).json({ ok: false, error: "An admin with that email already exists" });
      return;
    }
    throw err;
  }
});

router.patch("/:id", async (req, res) => {
  const parsed = PatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid payload" });
    return;
  }
  const updates: Partial<typeof adminUsersTable.$inferInsert> & { updatedAt: Date } = {
    updatedAt: new Date(),
  };
  if (parsed.data.name) updates.name = parsed.data.name;
  if (parsed.data.role) updates.role = parsed.data.role;
  if (parsed.data.password) {
    updates.passwordHash = await bcrypt.hash(parsed.data.password, 10);
    updates.lastPasswordChangeAt = new Date();
    if (parsed.data.mustChangePassword === undefined && req.params.id !== req.session.adminUserId) {
      updates.mustChangePassword = true;
    }
  }
  if (parsed.data.mustChangePassword !== undefined) {
    updates.mustChangePassword = parsed.data.mustChangePassword;
  }

  const [row] = await db
    .update(adminUsersTable)
    .set(updates)
    .where(eq(adminUsersTable.id, req.params.id!))
    .returning();
  if (!row) {
    res.status(404).json({ ok: false, error: "User not found" });
    return;
  }
  await writeAudit(req, {
    action: "user_updated",
    entityType: "admin_user",
    entityId: row.id,
    payload: { changes: Object.keys(parsed.data) },
  });
  res.json({ ok: true, user: shape(row) });
});

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.session.adminUserId) {
    res.status(400).json({ ok: false, error: "You cannot delete your own account while logged in" });
    return;
  }
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(adminUsersTable);
  if ((count ?? 0) <= 1) {
    res.status(400).json({ ok: false, error: "Cannot delete the last remaining admin" });
    return;
  }
  const result = await db
    .delete(adminUsersTable)
    .where(eq(adminUsersTable.id, req.params.id!))
    .returning({ id: adminUsersTable.id });
  if (result.length === 0) {
    res.status(404).json({ ok: false, error: "User not found" });
    return;
  }
  await writeAudit(req, {
    action: "user_deleted",
    entityType: "admin_user",
    entityId: req.params.id!,
  });
  res.json({ ok: true });
});

export default router;
