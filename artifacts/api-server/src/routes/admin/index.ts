import { Router, type IRouter } from "express";
import { requireAdmin, requireSameOrigin } from "../../middlewares/auth";
import authRouter from "./auth";
import leadsRouter from "./leads";
import contentRouter from "./content";
import postsRouter from "./posts";
import usersRouter from "./users";
import analyticsRouter from "./analytics";
import auditRouter from "./audit";
import uploadsRouter from "./uploads";

const router: IRouter = Router();

// CSRF defence-in-depth: refuse cross-origin writes to /admin/*.
router.use(requireSameOrigin);

// /auth handles login (no session) + me/logout/change-password (session).
// It is mounted FIRST so login isn't gated by requireAdmin.
router.use("/auth", authRouter);

// Everything below requires a session.
router.use(requireAdmin);

router.use("/leads", leadsRouter);
router.use("/content", contentRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/analytics", analyticsRouter);
router.use("/audit", auditRouter);
router.use("/uploads", uploadsRouter);

export default router;
