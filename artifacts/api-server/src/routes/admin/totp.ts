import { Router, type IRouter } from "express";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, adminUsersTable } from "@workspace/db";
import { writeAudit } from "../../lib/audit";

const router: IRouter = Router();

// Otplib defaults: SHA-1 / 30s window / 6 digits — matches Google Authenticator,
// 1Password, Authy, Microsoft Authenticator out of the box.
authenticator.options = { window: 1, step: 30 };

const ISSUER = "Leads Rubix Admin";

function generateRecoveryCodes(count = 10): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    // 10-char hex chunks, grouped 5-5 for readability ("a1b2c-3d4e5")
    const raw = randomBytes(5).toString("hex");
    out.push(`${raw.slice(0, 5)}-${raw.slice(5)}`);
  }
  return out;
}

// GET /admin/totp/status — does the current user have 2FA enabled?
router.get("/status", async (req, res) => {
  const userId = req.session.adminUserId!;
  const [u] = await db
    .select({ totpEnabled: adminUsersTable.totpEnabled })
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, userId))
    .limit(1);
  res.json({ ok: true, enabled: !!u?.totpEnabled });
});

// POST /admin/totp/setup — generate a fresh secret + QR + plaintext recovery
// codes, but DO NOT enable until /enable confirms a working code. Each call
// rotates the pending secret.
router.post("/setup", async (req, res) => {
  const userId = req.session.adminUserId!;
  const email = req.session.adminEmail!;

  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, userId))
    .limit(1);
  if (!user) {
    res.status(404).json({ ok: false, error: "User not found" });
    return;
  }
  if (user.totpEnabled) {
    res.status(409).json({ ok: false, error: "2FA is already enabled. Disable it first to re-enroll." });
    return;
  }

  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(email, ISSUER, secret);
  const qrDataUrl = await QRCode.toDataURL(otpauth);

  const recoveryCodes = generateRecoveryCodes(10);
  const recoveryHashes = await Promise.all(recoveryCodes.map((c) => bcrypt.hash(c, 10)));

  await db
    .update(adminUsersTable)
    .set({
      totpSecret: secret,
      totpRecoveryCodes: recoveryHashes,
      totpEnabled: false,
      updatedAt: new Date(),
    })
    .where(eq(adminUsersTable.id, userId));

  await writeAudit(req, {
    action: "totp_setup_started",
    entityType: "admin_user",
    entityId: userId,
  });

  res.json({
    ok: true,
    secret,
    otpauth,
    qrDataUrl,
    recoveryCodes,
  });
});

// POST /admin/totp/enable {code} — confirms the user can produce a valid code,
// then flips totpEnabled to true. Recovery codes from /setup are persisted as
// hashes already; we hand them back here only so the UI can re-show them.
const EnableSchema = z.object({ code: z.string().min(6).max(8) });

router.post("/enable", async (req, res) => {
  const parsed = EnableSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid code" });
    return;
  }
  const userId = req.session.adminUserId!;
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, userId))
    .limit(1);
  if (!user || !user.totpSecret) {
    res.status(400).json({ ok: false, error: "No 2FA enrollment in progress. Call /setup first." });
    return;
  }
  if (user.totpEnabled) {
    res.json({ ok: true, alreadyEnabled: true });
    return;
  }
  const valid = authenticator.check(parsed.data.code.replace(/\s+/g, ""), user.totpSecret);
  if (!valid) {
    res.status(401).json({ ok: false, error: "That code didn't match. Try the next code from your authenticator." });
    return;
  }
  await db
    .update(adminUsersTable)
    .set({ totpEnabled: true, updatedAt: new Date() })
    .where(eq(adminUsersTable.id, userId));
  await writeAudit(req, {
    action: "totp_enabled",
    entityType: "admin_user",
    entityId: userId,
  });
  res.json({ ok: true });
});

// POST /admin/totp/disable {password} — wipes secret + recovery codes after
// re-verifying the user's password (to defeat session hijack scenarios).
const DisableSchema = z.object({ password: z.string().min(1).max(200) });

router.post("/disable", async (req, res) => {
  const parsed = DisableSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Password required" });
    return;
  }
  const userId = req.session.adminUserId!;
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, userId))
    .limit(1);
  if (!user) {
    res.status(404).json({ ok: false, error: "User not found" });
    return;
  }
  const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!ok) {
    res.status(401).json({ ok: false, error: "Password incorrect" });
    return;
  }
  await db
    .update(adminUsersTable)
    .set({
      totpEnabled: false,
      totpSecret: null,
      totpRecoveryCodes: null,
      updatedAt: new Date(),
    })
    .where(eq(adminUsersTable.id, userId));
  await writeAudit(req, {
    action: "totp_disabled",
    entityType: "admin_user",
    entityId: userId,
  });
  res.json({ ok: true });
});

// Verifies a TOTP or recovery code against the given user. Recovery codes are
// single-use: matched hashes are removed from the array atomically inside a
// transaction with row-level locking, so two concurrent logins using the same
// recovery code can never both succeed (only the request that wins the
// SELECT...FOR UPDATE will see the code present).
export async function verifyTotpOrRecovery(
  userId: string,
  code: string,
): Promise<boolean> {
  const cleaned = code.replace(/\s+/g, "");

  return await db.transaction(async (tx) => {
    const [user] = await tx
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.id, userId))
      .for("update")
      .limit(1);
    if (!user || !user.totpEnabled || !user.totpSecret) return false;

    // 1. Try TOTP first — pure verification, no DB write.
    if (/^\d{6,8}$/.test(cleaned) && authenticator.check(cleaned, user.totpSecret)) {
      return true;
    }

    // 2. Try recovery codes. Because we hold FOR UPDATE on the row, the
    // remove-matched-hash write is serialised with any other concurrent
    // verifier — single-use is guaranteed.
    const codes = user.totpRecoveryCodes ?? [];
    for (let i = 0; i < codes.length; i++) {
      if (await bcrypt.compare(cleaned, codes[i]!)) {
        const next = [...codes.slice(0, i), ...codes.slice(i + 1)];
        await tx
          .update(adminUsersTable)
          .set({ totpRecoveryCodes: next, updatedAt: new Date() })
          .where(eq(adminUsersTable.id, userId));
        return true;
      }
    }
    return false;
  });
}

export default router;
