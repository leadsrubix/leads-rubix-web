import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.session?.adminUserId) {
    res.status(401).json({ ok: false, error: "Authentication required" });
    return;
  }
  next();
}

// Defence-in-depth against CSRF on top of SameSite=Lax: every state-changing
// admin request must come from the same origin as the API host (or from a
// configured trusted origin). Pure GET/HEAD/OPTIONS are exempt.
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function trustedOrigins(req: Request): string[] {
  const out = new Set<string>();
  // 1. Same-host fallback derived from this very request.
  const host = req.headers.host;
  if (host) {
    out.add(`https://${host}`);
    out.add(`http://${host}`);
  }
  // 2. Replit-provided dev/published domains.
  const replitDomains = process.env.REPLIT_DOMAINS;
  if (replitDomains) {
    for (const d of replitDomains.split(",")) {
      const trimmed = d.trim();
      if (trimmed) out.add(`https://${trimmed}`);
    }
  }
  // 3. Explicit list (comma-separated full origins, e.g. https://leadsrubix.com)
  const explicit = process.env.ADMIN_TRUSTED_ORIGINS;
  if (explicit) {
    for (const o of explicit.split(",")) {
      const trimmed = o.trim();
      if (trimmed) out.add(trimmed);
    }
  }
  return [...out];
}

export function requireSameOrigin(req: Request, res: Response, next: NextFunction): void {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }
  const origin = req.headers.origin || req.headers.referer;
  if (!origin) {
    // No origin header on a state-changing request — refuse rather than guess.
    res.status(403).json({ ok: false, error: "Missing origin on state-changing request" });
    return;
  }
  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    res.status(403).json({ ok: false, error: "Invalid origin" });
    return;
  }
  const allowed = trustedOrigins(req);
  const ok = allowed.some((a) => {
    try {
      const au = new URL(a);
      return au.protocol === originUrl.protocol && au.host === originUrl.host;
    } catch {
      return false;
    }
  });
  if (!ok) {
    req.log.warn({ origin, allowed }, "admin: blocked cross-origin write");
    res.status(403).json({ ok: false, error: "Cross-origin request blocked" });
    return;
  }
  next();
}
