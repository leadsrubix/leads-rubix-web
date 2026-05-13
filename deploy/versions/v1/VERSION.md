# v1 — Baseline (May 13, 2026)

Snapshot taken at git commit `d713f72` ("Provide database dump for the application").
This is the **stable baseline** the user requested to revert to before any
backend SEO/logo CMS work begins. Restore this if a later version breaks.

## Contents

| File                          | What it is                                          |
| ----------------------------- | --------------------------------------------------- |
| `v1-leadrubix-deploy.zip`     | Hostinger Shared `public_html/` SPA bundle         |
| `v1-leadrubix-db.zip`         | Postgres dump (custom + plain SQL), zipped         |
| `v1-leadrubix-db.dump`        | `pg_dump --format=custom` (preferred for restore)  |
| `v1-leadrubix-db.sql`         | `pg_dump --format=plain` (human-readable backup)   |

## What is shipped at this version

- Full marketing site, admin panel, blog, glossary, /demo + /contact forms
- Admin 2FA (TOTP) with recovery codes
- Lead scoring, UTM capture, Google Analytics 4 dataLayer
- Cal.com webhook, IndexNow on publish
- Hostinger Shared (.htaccess proxy) + VPS deploy guides

## How to restore

```bash
# DB
pg_restore --clean --if-exists -d "$DATABASE_URL" v1-leadrubix-db.dump

# SPA
unzip v1-leadrubix-deploy.zip   # creates public_html/
# upload public_html/* to Hostinger
```
