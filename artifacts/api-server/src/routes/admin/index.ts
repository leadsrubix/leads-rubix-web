import { Router, type IRouter } from "express";
import { requireSameOrigin } from "../../middlewares/auth";
import authRouter from "./auth";
import leadsRouter from "./leads";
import contentRouter from "./content";
import postsRouter from "./posts";
import usersRouter from "./users";
import analyticsRouter from "./analytics";

const router: IRouter = Router();

// CSRF defence-in-depth: refuse cross-origin writes to /admin/*.
router.use(requireSameOrigin);

router.use("/auth", authRouter);
router.use("/leads", leadsRouter);
router.use("/content", contentRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/analytics", analyticsRouter);

export default router;
