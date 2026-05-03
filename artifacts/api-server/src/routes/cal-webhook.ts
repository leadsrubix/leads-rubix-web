import { Router, type IRouter } from "express";
import { z } from "zod";
import { db, leadsTable, leadActivitiesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import crypto from "node:crypto";

const router: IRouter = Router();

/**
 * Cal.com booking webhook. Bumps lead score (+20), flips status to
 * `demo_booked`, and writes a lead_activities row. Verifies HMAC signature
 * via CAL_WEBHOOK_SECRET when present (Cal sends `x-cal-signature-256`).
 */
const eventSchema = z.object({
  triggerEvent: z.string(),
  payload: z
    .object({
      attendees: z
        .array(z.object({ email: z.string().email().optional(), name: z.string().optional() }))
        .optional(),
      startTime: z.string().optional(),
      title: z.string().optional(),
      uid: z.string().optional(),
    })
    .passthrough(),
});

function verifySignature(secret: string, raw: string, sig: string | string[] | undefined): boolean {
  if (!sig || Array.isArray(sig)) return false;
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(sig, "hex"));
  } catch {
    return false;
  }
}

router.post("/cal/webhook", async (req, res) => {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (secret) {
    const raw = (req as typeof req & { rawBody?: Buffer }).rawBody;
    if (!raw || !verifySignature(secret, raw.toString("utf8"), req.header("x-cal-signature-256"))) {
      req.log.warn("Cal webhook signature mismatch");
      return res.status(401).json({ error: "invalid_signature" });
    }
  }
  const parsed = eventSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_payload" });

  const event = parsed.data;
  if (!event.triggerEvent.startsWith("BOOKING_")) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  const email = event.payload.attendees?.[0]?.email?.toLowerCase().trim();
  if (!email) return res.status(200).json({ ok: true, no_email: true });

  const [lead] = await db.select().from(leadsTable).where(eq(leadsTable.email, email)).limit(1);
  if (!lead) {
    req.log.info({ email, trigger: event.triggerEvent }, "Cal booking with no matching lead");
    return res.status(200).json({ ok: true, matched: false });
  }

  const isCancel = event.triggerEvent === "BOOKING_CANCELLED";
  const newStatus = isCancel ? lead.status : "demo_booked";
  const scoreDelta = isCancel ? -10 : 20;
  await db
    .update(leadsTable)
    .set({
      status: newStatus,
      score: sql`GREATEST(0, COALESCE(${leadsTable.score}, 0) + ${scoreDelta})`,
      lastActivityAt: new Date(),
    })
    .where(eq(leadsTable.id, lead.id));

  await db.insert(leadActivitiesTable).values({
    leadId: lead.id,
    kind: isCancel ? "demo_cancelled" : "demo_booked",
    payload: {
      source: "cal_webhook",
      title: event.payload.title ?? event.triggerEvent,
      uid: event.payload.uid,
      startTime: event.payload.startTime,
    },
  });

  req.log.info({ leadId: lead.id, trigger: event.triggerEvent }, "Cal webhook applied");
  return res.json({ ok: true, matched: true });
});

export default router;
