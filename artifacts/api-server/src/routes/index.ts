import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import contentRouter from "./content";
import postsRouter from "./posts";
import objectsRouter from "./objects";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(contentRouter);
router.use(postsRouter);
router.use(objectsRouter);
router.use("/admin", adminRouter);

export default router;
