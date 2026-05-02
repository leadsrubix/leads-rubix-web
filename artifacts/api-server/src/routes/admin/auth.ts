import { Router, type IRouter } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, adminUsersTable } from "@workspace/db";
import { requireAdmin } from "../../middlewares/auth";

const router: IRouter = Router();

const LoginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200),
});

router.post("/login", async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid credentials" });
    return;
  }

  const { email, password } = parsed.data;
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email.toLowerCase()))
    .limit(1);

  if (!user) {
    req.log.warn({ email }, "admin login: user not found");
    res.status(401).json({ ok: false, error: "Invalid email or password" });
    return;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    req.log.warn({ userId: user.id }, "admin login: bad password");
    res.status(401).json({ ok: false, error: "Invalid email or password" });
    return;
  }

  req.session.adminUserId = user.id;
  req.session.adminEmail = user.email;
  req.session.adminName = user.name;
  req.session.adminRole = user.role;

  req.session.save((err) => {
    if (err) {
      req.log.error({ err }, "admin login: failed to save session");
      res.status(500).json({ ok: false, error: "Could not start session" });
      return;
    }
    res.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      req.log.error({ err }, "admin logout: failed to destroy session");
      res.status(500).json({ ok: false, error: "Could not log out" });
      return;
    }
    res.clearCookie("leadrubix.sid");
    res.json({ ok: true });
  });
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({
    ok: true,
    user: {
      id: req.session.adminUserId!,
      email: req.session.adminEmail!,
      name: req.session.adminName!,
      role: req.session.adminRole!,
    },
  });
});

export default router;
