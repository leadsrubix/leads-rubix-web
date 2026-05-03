import { Router, type IRouter, type Request } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { db, adminUsersTable } from "@workspace/db";
import { requireAdmin } from "../../middlewares/auth";
import {
  ipRateLimited,
  ACCOUNT_LOCK_THRESHOLD,
  ACCOUNT_LOCK_DURATION_MS,
} from "../../lib/login-throttle";
import { writeAudit } from "../../lib/audit";
import { verifyTotpOrRecovery } from "./totp";

const router: IRouter = Router();

const LoginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200),
  totpCode: z.string().min(6).max(20).optional(),
});

function getClientIp(req: Request): string {
  // Trust only the proxy-validated chain — raw x-forwarded-for can be spoofed.
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

router.post("/login", async (req, res) => {
  const ip = getClientIp(req);
  const ipLimit = ipRateLimited(ip);
  if (ipLimit.limited) {
    res.status(429).json({
      ok: false,
      error: "Too many login attempts. Please try again later.",
      retryAfterMs: ipLimit.retryAfterMs,
    });
    return;
  }

  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid credentials" });
    return;
  }

  const { email, password, totpCode } = parsed.data;
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

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    req.log.warn({ userId: user.id }, "admin login: account locked");
    res.status(423).json({
      ok: false,
      error: "Account temporarily locked due to too many failed attempts. Try again later.",
    });
    return;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    // Atomic increment + conditional lock — closes the lost-update race when
    // multiple bad-password attempts hit concurrently.
    const lockUntilExpr = sql`CASE WHEN ${adminUsersTable.failedLoginAttempts} + 1 >= ${ACCOUNT_LOCK_THRESHOLD}
      THEN NOW() + (${ACCOUNT_LOCK_DURATION_MS} || ' milliseconds')::interval
      ELSE NULL END`;
    const [updated] = await db
      .update(adminUsersTable)
      .set({
        failedLoginAttempts: sql`${adminUsersTable.failedLoginAttempts} + 1`,
        lockedUntil: lockUntilExpr,
        updatedAt: new Date(),
      })
      .where(eq(adminUsersTable.id, user.id))
      .returning({
        fails: adminUsersTable.failedLoginAttempts,
        lockedUntil: adminUsersTable.lockedUntil,
      });
    req.log.warn(
      { userId: user.id, fails: updated?.fails, locked: !!updated?.lockedUntil },
      "admin login: bad password",
    );
    res.status(401).json({ ok: false, error: "Invalid email or password" });
    return;
  }

  // Password OK. If 2FA is enabled, the request must include a valid TOTP /
  // recovery code before we issue a session. Failed 2FA attempts feed the
  // same per-account lockout counter as bad passwords so brute-forcing the
  // second factor can't bypass account lockout.
  if (user.totpEnabled) {
    if (!totpCode) {
      res.status(401).json({
        ok: false,
        requiresTotp: true,
        error: "Enter the 6-digit code from your authenticator app.",
      });
      return;
    }
    const totpOk = await verifyTotpOrRecovery(user.id, totpCode);
    if (!totpOk) {
      const lockUntilExpr = sql`CASE WHEN ${adminUsersTable.failedLoginAttempts} + 1 >= ${ACCOUNT_LOCK_THRESHOLD}
        THEN NOW() + (${ACCOUNT_LOCK_DURATION_MS} || ' milliseconds')::interval
        ELSE NULL END`;
      const [updated] = await db
        .update(adminUsersTable)
        .set({
          failedLoginAttempts: sql`${adminUsersTable.failedLoginAttempts} + 1`,
          lockedUntil: lockUntilExpr,
          updatedAt: new Date(),
        })
        .where(eq(adminUsersTable.id, user.id))
        .returning({
          fails: adminUsersTable.failedLoginAttempts,
          lockedUntil: adminUsersTable.lockedUntil,
        });
      req.log.warn(
        { userId: user.id, fails: updated?.fails, locked: !!updated?.lockedUntil },
        "admin login: bad totp",
      );
      if (updated?.lockedUntil) {
        res.status(423).json({
          ok: false,
          error: "Account temporarily locked due to too many failed attempts. Try again later.",
        });
        return;
      }
      res.status(401).json({
        ok: false,
        requiresTotp: true,
        error: "That code didn't match. Try a fresh code or a recovery code.",
      });
      return;
    }
  }

  // success — reset failure counter, start session.
  await db
    .update(adminUsersTable)
    .set({ failedLoginAttempts: 0, lockedUntil: null, updatedAt: new Date() })
    .where(eq(adminUsersTable.id, user.id));

  req.session.adminUserId = user.id;
  req.session.adminEmail = user.email;
  req.session.adminName = user.name;
  req.session.adminRole = user.role;

  req.session.save(async (err) => {
    if (err) {
      req.log.error({ err }, "admin login: failed to save session");
      res.status(500).json({ ok: false, error: "Could not start session" });
      return;
    }
    await writeAudit(req, {
      action: "login",
      entityType: "admin_user",
      entityId: user.id,
    });
    res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    });
  });
});

router.post("/logout", async (req, res) => {
  const userId = req.session?.adminUserId;
  if (userId) {
    await writeAudit(req, { action: "logout", entityType: "admin_user", entityId: userId });
  }
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

router.get("/me", requireAdmin, async (req, res) => {
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, req.session.adminUserId!))
    .limit(1);
  if (!user) {
    res.status(401).json({ ok: false, error: "Authentication required" });
    return;
  }
  res.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    },
  });
});

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(8).max(200),
});

router.post("/change-password", requireAdmin, async (req, res) => {
  const parsed = ChangePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid payload",
    });
    return;
  }
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, req.session.adminUserId!))
    .limit(1);
  if (!user) {
    res.status(401).json({ ok: false, error: "Authentication required" });
    return;
  }
  const ok = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!ok) {
    res.status(401).json({ ok: false, error: "Current password is incorrect" });
    return;
  }
  const newHash = await bcrypt.hash(parsed.data.newPassword, 10);
  await db
    .update(adminUsersTable)
    .set({
      passwordHash: newHash,
      mustChangePassword: false,
      lastPasswordChangeAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(adminUsersTable.id, user.id));
  await writeAudit(req, {
    action: "change_password",
    entityType: "admin_user",
    entityId: user.id,
  });
  res.json({ ok: true });
});

export default router;
