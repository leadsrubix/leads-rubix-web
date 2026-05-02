import { Router, type IRouter } from "express";
import { z } from "zod";
import { requirePasswordOk } from "../../middlewares/auth";
import { getUploadUrl } from "../../lib/objectStorage";

const router: IRouter = Router();

const RequestBody = z.object({
  contentType: z.string().min(1).max(200).optional(),
  size: z.number().int().positive().max(20 * 1024 * 1024).optional(),
  name: z.string().max(300).optional(),
});

// POST /admin/uploads — admin requests a presigned URL; client PUTs file
// bytes directly to GCS, then stores the returned objectPath in the DB.
router.post("/", requirePasswordOk, async (req, res) => {
  const parsed = RequestBody.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid upload request" });
    return;
  }
  try {
    const { uploadURL, objectPath } = await getUploadUrl();
    res.json({ ok: true, uploadURL, objectPath, url: objectPath });
  } catch (err) {
    req.log.error({ err }, "failed to sign upload URL");
    res.status(500).json({ ok: false, error: "Could not generate upload URL" });
  }
});

export default router;
