# Leads Rubix — Hostinger Shared Hosting deploy guide

This bundle deploys to **Hostinger Shared / Premium / Business / Cloud Startup**
with the Node.js App manager enabled in hPanel. Everything you need is in this
zip — no source code or build step required on the server.

## What's in the box

```
leadrubix-deploy/
├── api/                        ← upload to your Node.js App folder
│   ├── index.mjs               ← entry point (set this in hPanel)
│   ├── pino-*.mjs              ← logging worker bundles
│   ├── package.json            ← declares Node 20+
│   └── .env.example            ← copy to .env and fill in
├── public_html/                ← upload to your domain's public_html
│   ├── index.html              ← SPA shell
│   ├── assets/                 ← hashed JS/CSS (cache 1 year)
│   ├── blog-covers/            ← stock blog images
│   ├── *.png, *.svg            ← hero / feature graphics
│   └── .htaccess               ← HTTPS + SPA routing + /api proxy
├── HOSTINGER_SHARED.md         ← this file
└── HOSTINGER.md                ← VPS/Cloud install (advanced, optional)
```

---

## Prerequisites

| Need                  | Where to get it                                            |
| --------------------- | ---------------------------------------------------------- |
| Hostinger plan        | **Business or higher** (Premium can host the SPA but the   |
|                       | Node.js App + mod_proxy combo needs Business+).            |
| Domain                | e.g. `leadsrubix.com`, pointed to Hostinger nameservers    |
| Postgres database     | **External** — Hostinger shared offers MySQL only. Use     |
|                       | [Neon](https://neon.tech) (free tier is fine) or Supabase. |
| Node.js 20+           | Enabled by default on supported plans                      |
| SSL certificate       | Free Let's Encrypt cert from hPanel → SSL                  |

---

## Step 1 — Create the Postgres database

1. Sign up at https://neon.tech (or Supabase / Railway).
2. Create a project named `leadrubix`.
3. Copy the **pooled connection string** — it looks like:
   `postgres://user:pass@ep-xxx.region.aws.neon.tech/leadrubix?sslmode=require`
4. Save it for Step 4.

The schema is auto-pushed on first run via Drizzle, **but** if you want to push
it manually first, you can do it from any machine with Node 20:

```bash
npx -p drizzle-kit@0.31 -p postgres -p drizzle-orm \
  drizzle-kit push --dialect=postgresql --url="<your DATABASE_URL>"
```

(Schema files are not in this bundle since the API is pre-bundled. If you
want manual schema control, clone the repo and run
`pnpm --filter @workspace/db run push`.)

---

## Step 2 — Set up the API subdomain

1. **hPanel → Domains → Subdomains → Create Subdomain**
   - Subdomain: `api`
   - Domain: `leadsrubix.com`
   - Document root: `/home/<user>/api.leadsrubix.com` *(default)*
2. **hPanel → SSL → Install** for `api.leadsrubix.com` (free Let's Encrypt).

---

## Step 3 — Create the Node.js App

1. **hPanel → Advanced → Node.js → Create Application**
   - Node.js version: **20.x** (or higher)
   - Application mode: **Production**
   - Application root: `api.leadsrubix.com` *(matches the subdomain folder)*
   - Application URL: `https://api.leadsrubix.com`
   - Application startup file: `index.mjs`
2. Click **Create**.

---

## Step 4 — Upload the API files

1. **hPanel → File Manager** → open `/home/<user>/api.leadsrubix.com/`.
2. Upload **the contents of the `api/` folder** from this zip (not the folder
   itself — only the files inside).
   You should end up with `index.mjs`, `package.json`, `pino-*.mjs`, etc. at
   the root of `api.leadsrubix.com`.
3. Rename `.env.example` to `.env` and edit it. Fill in at minimum:
   - `DATABASE_URL`     — from Step 1
   - `SESSION_SECRET`   — generate a 64-byte random string
   - `PUBLIC_BASE_URL`  — `https://leadsrubix.com`
   - `ALLOWED_ORIGIN`   — `https://leadsrubix.com`

   The Node.js App manager auto-loads `.env`. *Alternatively* you can paste
   each variable into hPanel → Node.js → Environment Variables.
4. Back in **hPanel → Node.js**, click **Run NPM Install** *(skipped — bundle
   has zero deps, but click it anyway so the manager refreshes its state)*.
5. Click **Restart Application**.

---

## Step 5 — Upload the SPA to the main domain

1. **hPanel → File Manager** → open `/home/<user>/public_html/`.
2. Delete the default Hostinger placeholder files (e.g. `default.php`).
3. Upload **the contents of the `public_html/` folder** from this zip
   (including the hidden `.htaccess` — you may need to enable "Show hidden
   files" in the File Manager view).
4. **hPanel → SSL → Install** for the main domain if you haven't yet.

---

## Step 6 — Verify

Open a browser and check:

| URL                                                  | Expected                        |
| ---------------------------------------------------- | ------------------------------- |
| `https://leadsrubix.com/`                            | Landing page renders            |
| `https://leadsrubix.com/api/healthz`                 | `{"status":"ok"}`               |
| `https://leadsrubix.com/api/stats/social-proof`      | `{"ok":true,"total":...,...}`   |
| `https://api.leadsrubix.com/api/healthz`             | `{"status":"ok"}` (direct)      |
| `https://leadsrubix.com/admin/login`                 | Admin login screen              |

If `/api/healthz` works on the subdomain but **not** through the main domain,
your plan does not have `mod_proxy` enabled. Edit `public_html/.htaccess` and
swap the `<IfModule mod_proxy.c>` block for the `[P,L]` rewrite line below it.
That uses URL rewriting + CORS instead.

---

## Step 7 — Create the first admin user

There is no signup UI. Open the database (Neon SQL editor works) and run:

```sql
INSERT INTO admin_users (id, email, password_hash, role, must_change_password)
VALUES (
  gen_random_uuid(),
  'you@yourdomain.com',
  -- bcrypt hash of 'ChangeMeNow!1' — change immediately on first login
  '$2b$12$LQv3c1yqBwEFiTlt6f7Z0u8qPxJZ8bV0MH8.vYpKJKNKv1qO.5Pjm',
  'admin',
  true
);
```

Sign in at `https://leadsrubix.com/admin/login`. You'll be forced to change
the password before you can do anything else. Then go to
**Security & 2FA** → enable TOTP.

---

## Step 8 — Configure cron jobs (optional but recommended)

**hPanel → Advanced → Cron Jobs**

| Job                      | Schedule          | Command                                                          |
| ------------------------ | ----------------- | ---------------------------------------------------------------- |
| Daily DB backup          | `0 3 * * *`       | `pg_dump "$DATABASE_URL" -Fc > ~/backups/lr-$(date +\%F).dump`   |
| Backup pruning (14 days) | `30 3 * * *`      | `find ~/backups -name 'lr-*.dump' -mtime +14 -delete`            |
| Synthetic monitor        | `*/5 * * * *`     | `curl -fsS https://leadsrubix.com/api/healthz \|\| curl -X POST -H 'Content-Type: application/json' -d '{"text":"Leads Rubix /healthz failed"}' "$LEAD_NOTIFICATION_WEBHOOK"` |

`pg_dump` may not exist on shared hosting; if not, schedule the backup from
your laptop or a separate worker, OR use Neon's built-in PITR (recommended).

---

## Step 9 — Google Sheets fan-out (v2+, optional)

Every contact, demo, and entry-popup submission can be mirrored as a row in a
Google Sheet — handy for sales ops who live in spreadsheets.

1. Open (or create) the Google Sheet you want leads dropped into.
2. **Extensions → Apps Script** and paste:

   ```javascript
   const SHEET_NAME = "Leads"; // tab name
   function doPost(e) {
     const row = JSON.parse(e.postData.contents);
     const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME)
              || SpreadsheetApp.getActive().insertSheet(SHEET_NAME);
     if (sh.getLastRow() === 0) sh.appendRow(Object.keys(row));
     sh.appendRow(Object.keys(row).map((k) => row[k]));
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. **Deploy → New deployment → Web app** → Execute as: **Me**, Who has access:
   **Anyone with the link**. Copy the resulting URL (it ends in `/exec`).
4. In the Leads Rubix admin UI, open
   **`/admin/content/integrations`**, paste the URL into
   `googleSheetsWebhookUrl`, and **Save**.
5. Submit a test lead from `/contact` — the row should appear in the sheet
   within ~10 seconds.

You can also paste a Slack/Zapier webhook into `slackOrZapierWebhookUrl`; that
field overrides the `LEAD_NOTIFICATION_WEBHOOK` env var when set, so you can
flip notifications without restarting the Node app.

---

## Step 10 — Logo & favicon (v2+, optional)

The bundle ships with `public_html/leads-rubix-favicon.png` as the default
brand mark. To replace it without re-uploading the SPA:

1. Sign into `/admin`, open **`/admin/content/brand_identity`**.
2. Click the upload button next to `logoImageUrl` (navbar/footer logo) and
   `faviconUrl` (browser tab icon). Both flow through the existing object
   storage presigned-URL upload.
3. Save. The logo updates within ~30 s of cache TTL; hard-refresh the tab to
   see the favicon update immediately.

To revert to the static default, clear the field (empty string).

---

## Step 11 — IndexNow key (optional)

Bing/Yandex instant indexing:

1. Generate a 32-character hex key:
   `openssl rand -hex 16`
2. Put the key in two places:
   - hPanel → Node.js Env Vars: `INDEXNOW_KEY=<the-hex-string>`
   - File at `public_html/<the-hex-string>.txt` containing only the same string
3. Restart the Node app.

---

## Updating later

When we ship a new version, you'll get a fresh `leadrubix-deploy.zip`.
To update:

1. Upload the new `public_html/*` over the old files (overwrite all).
2. Upload the new `api/*` over the old files (overwrite all).
3. **hPanel → Node.js → Restart Application**.

Database migrations are applied automatically at API startup.

---

## Troubleshooting

| Symptom                                  | Fix                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 502 / 503 on `/api/...`                  | Check hPanel → Node.js → **App Logs**. Most often: bad `DATABASE_URL` or missing `SESSION_SECRET`.   |
| Login says "Invalid email or password"   | Check the `admin_users` row exists; verify the bcrypt hash. Use Step 7's exact INSERT.               |
| `/api/...` returns the SPA `index.html`  | `.htaccess` proxy isn't routing. Verify `mod_proxy` is enabled on your plan, or use the `[P,L]` line. |
| Browser CORS error on `/api/...`         | Set `ALLOWED_ORIGIN=https://leadsrubix.com` in the API env and restart the Node app.                  |
| Admin 2FA QR code doesn't display        | The bundle includes `qrcode` — if blocked, your hPanel may have CSP rules. Check browser console.    |
| Want VPS/Cloud install instead?          | See `HOSTINGER.md` (systemd + Nginx, full control).                                                   |

---

## Support contract values

When asking for help, please share:

- Hostinger plan name
- The exact URL that's failing
- The **App Logs** tail from hPanel → Node.js
- Browser DevTools → Network tab response for the failing request

Do **not** share `SESSION_SECRET`, `DATABASE_URL`, or `LEAD_NOTIFICATION_WEBHOOK`.
