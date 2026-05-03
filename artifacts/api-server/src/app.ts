import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
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

// In production (e.g. on Hostinger Cloud) this single Node app serves both the
// JSON API and the built SPA. The SPA is expected to live next to the bundled
// server entry as `./public`. In development the Vite dev server serves the
// SPA on its own port via the workspace proxy, so we skip this block.
if (process.env["NODE_ENV"] === "production") {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const spaDir = path.resolve(here, "public");

  if (existsSync(spaDir)) {
    app.use(
      express.static(spaDir, {
        index: false,
        maxAge: "1y",
        setHeaders: (res, filePath) => {
          // index.html must always be revalidated so users get the latest
          // bundle hashes; everything else is content-hashed and immutable.
          if (filePath.endsWith("index.html")) {
            res.setHeader("Cache-Control", "no-cache");
          }
        },
      }),
    );

    // SPA history fallback: any non-API, non-asset GET serves index.html so
    // wouter routes resolve on hard refresh / direct link.
    app.get(
      /^(?!\/api\/|\/sitemap\.xml).*/,
      (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== "GET") return next();
        res.sendFile(path.join(spaDir, "index.html"));
      },
    );
  } else {
    logger.warn(
      { spaDir },
      "Production mode but SPA build not found — API will respond but / will 404.",
    );
  }
}

export default app;
