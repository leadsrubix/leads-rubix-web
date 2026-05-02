import type { Request } from "express";
import { db, auditEventsTable } from "@workspace/db";

export type AuditWriteInput = {
  action: string;
  entityType: string;
  entityId?: string | null;
  payload?: Record<string, unknown>;
};

export async function writeAudit(req: Request, input: AuditWriteInput): Promise<void> {
  const actorId = req.session?.adminUserId ?? null;
  const actorEmail = req.session?.adminEmail ?? null;
  try {
    await db.insert(auditEventsTable).values({
      actorId,
      actorEmail,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      payload: input.payload ?? {},
    });
  } catch (err) {
    req.log.warn({ err, action: input.action }, "audit: failed to write event");
  }
}
