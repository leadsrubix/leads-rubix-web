# Deploying Leads Rubix to Hostinger Cloud Hosting

This guide is specifically for **Hostinger Cloud Hosting** (Startup / Professional / Enterprise) using the **Node.js application** feature in hPanel. Pure Shared / Premium / Business plans (PHP only) cannot host this app — you would need to upgrade to Cloud or VPS.

---

## 1. Prerequisites

| Item | Why | How to get it |
| ---- | --- | -------------- |
| Hostinger Cloud plan with Node.js feature | Runs the Express server | Already arranged. |
| External Postgres database | Hostinger Cloud only ships MySQL; the app uses Postgres | Free tier on **Neon** (`https://neon.tech`) or **Supabase** (`https://supabase.com`). |
| Replit object storage env vars | Lead-magnet uploads, blog images | Already in your Replit secrets — you'll copy them across. |
| Domain pointed at Hostinger | Public access | Manage in Hostinger DNS panel. |
| (Optional) Slack/Make/Zapier webhook URL | Notify on new lead | `LEAD_NOTIFICATION_WEBHOOK` env var. |

---

## 2. One-time setup on the external Postgres

1. Create a new project on Neon / Supabase. Pick the region closest to Mumbai (AWS `ap-south-1`).
2. Copy the **Postgres connection string** — it looks like
   `postgres://USER:PASS@HOST/DB?sslmode=require`.
3. From your laptop (with this repo checked out and the connection string set as `DATABASE_URL`):
   ```bash
   pnpm install
   pnpm --filter @workspace/db run push
   ```
   This creates every table the app needs.
4. Seed the first admin user. From the same shell:
   ```bash
   pnpm --filter @workspace/scripts exec tsx src/seed-admin.ts
   ```
   You'll be prompted for an email + password. Use a strong one — the app has lockout after 5 failed logins.

---

## 3. Build the production bundle

From the repo root on your laptop:

```bash
pnpm install
pnpm --filter @workspace/leadrubix run build       # Vite -> dist/public
pnpm --filter @workspace/api-server run build      # esbuild -> dist/index.mjs
```

After this you have two artifacts you need to upload:

```
artifacts/api-server/dist/        ← Node entry (index.mjs) + bundled deps
artifacts/leadrubix/dist/public/  ← Static SPA (index.html, /assets, etc.)
```

> Note the `/public` suffix on the frontend output — Vite is configured to emit there.

Bundle them into a single deploy folder for upload:

```bash
rm -rf deploy && mkdir -p deploy/public
cp -r artifacts/api-server/dist/* deploy/
cp -r artifacts/leadrubix/dist/public/* deploy/public/
cp artifacts/api-server/package.json deploy/   # for hPanel install step
```

When `NODE_ENV=production`, the bundled Express server (`deploy/index.mjs`) automatically serves `deploy/public` as the SPA with a history-fallback for client-side routes — so a single Node app handles both API and frontend on Hostinger.

---

## 4. Upload to Hostinger

1. **hPanel → File Manager** → navigate to `domains/<your-domain>/public_html` (or a sibling app folder).
2. Upload the contents of your local `deploy/` folder. (You can zip it locally and unzip in hPanel for speed.)
3. **hPanel → Advanced → Node.js** → **Create application**:
   - Node version: **20.x** (or latest LTS Hostinger offers).
   - Application root: the folder you just uploaded.
   - Application URL: your domain.
   - Application startup file: `index.mjs`.
   - Click **Create**.
4. In the same Node.js panel, click **Run NPM Install** so Hostinger installs the few `dependencies` listed in `package.json` (most code is already bundled by esbuild, but `pg`, `drizzle-orm` and a couple of native deps still install at runtime).

---

## 5. Environment variables (hPanel → Node.js → Environment variables)

Add every line below. **Never commit these to git.**

| Variable | Value |
| -------- | ----- |
| `NODE_ENV` | `production` |
| `PORT` | (Hostinger fills this automatically — leave blank) |
| `DATABASE_URL` | The Neon/Supabase Postgres URL from step 2 |
| `SESSION_SECRET` | A long random string (`openssl rand -hex 32`) |
| `DEFAULT_OBJECT_STORAGE_BUCKET_ID` | Copy from Replit secrets |
| `PRIVATE_OBJECT_DIR` | Copy from Replit secrets |
| `PUBLIC_OBJECT_SEARCH_PATHS` | Copy from Replit secrets |
| `LEAD_NOTIFICATION_WEBHOOK` | (Optional) Slack/Make/Zapier incoming-webhook URL |
| `PUBLIC_BASE_URL` | `https://your-domain.com` (used in sitemap + emails) |

Click **Save** then **Restart** the Node application.

---

## 6. Domain + HTTPS

1. **hPanel → Domains → Manage** → point `A` record at the Hostinger Cloud IP (auto-set if domain was bought through Hostinger).
2. **hPanel → Security → SSL** → install the free Let's Encrypt certificate. Force HTTPS redirect on.
3. (Optional but recommended) Enable **Cloudflare proxy** in front for caching of `/assets/*` and DDoS protection.

---

## 7. Smoke test

From any browser:

- `https://your-domain.com/` — homepage loads, fonts render, cookie banner is compact.
- `https://your-domain.com/api/healthz` — returns `{"status":"ok"}`.
- `https://your-domain.com/sitemap.xml` — returns XML.
- `https://your-domain.com/admin/login` — log in with the seeded admin. First login forces a password change.
- Submit `https://your-domain.com/contact` — verify the lead appears in `/admin/leads` and the webhook fires (if configured).

---

## 8. Re-deploying on every change

The simplest loop:

1. Make changes locally, commit.
2. Re-run the two `pnpm build` commands.
3. Re-upload `dist/` (api-server) and `dist/public/*` (leadrubix). Schema changes? Re-run `pnpm --filter @workspace/db run push` against `DATABASE_URL`.
4. **hPanel → Node.js → Restart**.

For a faster loop, set up GitHub Actions or use Hostinger's Git integration to pull on push.

---

## 9. What WON'T work on Hostinger Cloud (and the workaround)

| Feature | Issue | Workaround |
| ------- | ----- | ---------- |
| MySQL bundled with the plan | App needs Postgres | External Neon/Supabase (free tier is enough). |
| Long-running cron jobs | Hostinger Cloud has no native cron for Node apps | Use a free external scheduler (cron-job.org) hitting `https://your-domain.com/api/cron/<name>` with a shared secret. |
| Persistent file uploads to local disk | Disk gets wiped on app restart | Already handled — uploads go to Replit object storage via the env vars above. |
| Real-time websockets | Cloud Node apps may close idle sockets | Not used by this app. |

---

## 10. Rollback

Hostinger keeps the previous Node app version. From hPanel → Node.js → **Restore previous version** if a deploy goes wrong. Database rollback isn't automatic — for risky schema changes, `pg_dump` first:

```bash
pg_dump "$DATABASE_URL" > backup-$(date +%F).sql
```
