import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import sitemapRouter from "./routes/sitemap";
import { logger } from "./lib/logger";
import { sessionMiddleware } from "./lib/session";

const app: Express = express();

// Required so secure cookies work behind Replit's proxy.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Sitemap is served at the root (/sitemap.xml) so search engines find it at
// the canonical location. Mounted BEFORE sessionMiddleware so crawler hits
// don't churn the session store. The artifact's path config claims
// /sitemap.xml so proxy traffic reaches this server.
app.use("/", sitemapRouter);

app.use(sessionMiddleware);

app.use("/api", router);

export default app;
