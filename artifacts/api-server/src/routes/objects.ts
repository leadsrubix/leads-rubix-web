import { Router, type IRouter } from "express";
import {
  getObjectFile,
  ObjectNotFoundError,
  streamObject,
} from "../lib/objectStorage";

const router: IRouter = Router();

// GET /api/objects/uploads/:id — public proxy for uploaded media so blog
// readers can render images without exposing GCS credentials to the browser.
router.get("/objects/uploads/:id", async (req, res) => {
  const id = req.params.id;
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    res.status(404).json({ ok: false, error: "Not found" });
    return;
  }
  try {
    const file = await getObjectFile(`/objects/uploads/${id}`);
    await streamObject(file, res);
  } catch (err) {
    if (err instanceof ObjectNotFoundError) {
      res.status(404).json({ ok: false, error: "Not found" });
      return;
    }
    req.log.error({ err }, "failed to stream object");
    if (!res.headersSent) res.status(500).json({ ok: false, error: "Stream failed" });
  }
});

export default router;
