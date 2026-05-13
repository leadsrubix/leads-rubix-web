# v2 — Logo CMS + Sheets fan-out + Entry-gate + UX polish (May 13, 2026)

Released on top of **v1** (post-rollback baseline). Use this version to deploy
the v3.8 product release on Hostinger Shared.

## Contents

| File                          | What it is                                          |
| ----------------------------- | --------------------------------------------------- |
| `v2-leadrubix-deploy.zip`     | Hostinger Shared `public_html/` SPA bundle          |
| `v2-leadrubix-db.dump`        | `pg_dump --format=custom` (preferred for restore)   |
| `v2-leadrubix-db.sql`         | `pg_dump --format=plain` (human-readable backup)    |
| `v2-leadrubix-db.zip`         | Both DB dumps in one zip                            |

## What's new since v1

1. **Dynamic logo + favicon driven by CMS** (`brand_identity.logoImageUrl`,
   `brand_identity.faviconUrl`). Static fallback is the new
   `/leads-rubix-favicon.png` (43 KB PNG, brand-purple Q monogram).
2. **Footer / nav links scroll-to-top on route change** — wouter `useLocation`
   listener in `Layout` resets `window.scrollTo(0, 0)` on every pathname
   change (skips when URL has `#anchor`).
3. **Entry-gate popup on the homepage** —
   `components/marketing/EntryGate.tsx`. Fields: name, country code +
   mobile, email, "I'm a … (developer / brokerage / sales manager / agent /
   exploring)", consent checkbox. Submits to `POST /api/contact` with
   `source: "entry_popup"`. Dismissal stored in
   `localStorage.lr_entry_gate_done_v1`.
4. **`/demo` form & contact form fan out to Google Sheets** — server reads
   `integrations.googleSheetsWebhookUrl` from CMS (60-s in-memory cache,
   force-invalidated on save). Cleanly maps lead → flat JSON row for
   `sheet.appendRow` in a Google Apps Script Web App.
5. **Google Sheets webhook URL is admin-configurable** — new CMS section
   `integrations` (visible at `/admin/content/integrations`) with two fields:
   `googleSheetsWebhookUrl` and `slackOrZapierWebhookUrl`. The latter
   overrides `LEAD_NOTIFICATION_WEBHOOK` env var when set.
6. **Frontend `API_BASE_URL` constant** in `src/admin/lib/api.ts`. Defaults to
   `https://api.leadsrubix.com`; override for dev with
   `VITE_API_BASE_URL=""` so calls go through the same-origin proxy.
7. **Fixed double-sidebar on `/admin/sources` and `/admin/security`** — both
   pages were wrapping themselves in `<AdminLayout>` while `RequireAuth`
   already wraps. Removed the inner wrapper.

## Post-architect security hardening (also in this build)

- `integrations` is added to `PRIVATE_KEYS` in `routes/content.ts` — the
  public `GET /api/content/:key` endpoint now 404s for it. Webhook URLs are
  only readable through the auth-gated `GET /api/admin/content/integrations`.
- `lib/notify.ts` now SSRF-guards every outbound webhook URL: must be
  `https://`, no embedded credentials, and rejects loopback / RFC1918 /
  link-local / IPv6 ULA hosts. Invalid URLs are logged + skipped instead of
  attempting a fetch.
- `content-validators.ts` gained an `integrations` zod schema that rejects
  non-string or non-`https://` values at admin-save time.
- `notify.ts` reads CMS values defensively via `String(... ?? "").trim()` so a
  legacy malformed row can't crash the notifier.

## How to restore

```bash
# DB
pg_restore --clean --if-exists --no-owner --no-privileges \
  -d "$DATABASE_URL" v2-leadrubix-db.dump

# SPA — upload v2-leadrubix-deploy.zip contents to Hostinger Shared public_html/
unzip v2-leadrubix-deploy.zip -d ./public_html
```

## Deployment env-var checklist (Hostinger Shared)

Required: `DATABASE_URL`, `SESSION_SECRET`, `DEFAULT_OBJECT_STORAGE_BUCKET_ID`,
`PRIVATE_OBJECT_DIR`, `PUBLIC_OBJECT_SEARCH_PATHS`.

Optional: `LEAD_NOTIFICATION_WEBHOOK` (now overridable via CMS),
`CAL_WEBHOOK_SECRET`, `INDEXNOW_KEY`, `MONITOR_WEBHOOK_URL`,
`SOCIAL_PROOF_BASELINE_TOTAL` / `_30D` / `_7D` / `_DISTINCT_COMPANIES`,
`VITE_API_BASE_URL` (build-time, e.g. set to empty for dev).

## Post-deploy admin one-time setup

1. Log into `/admin`, open `/admin/content/integrations`.
2. Paste your Google Apps Script Web App URL into `googleSheetsWebhookUrl`.
   See `deploy/HOSTINGER_SHARED.md` § "Google Sheets fan-out" for the
   ready-to-paste Apps Script.
3. Save. Submit a test lead from `/contact` — the row should appear in your
   sheet within ~10 seconds.
