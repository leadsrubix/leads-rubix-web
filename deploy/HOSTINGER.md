# Leads Rubix — Hostinger Cloud deployment guide

Production target: **Hostinger Cloud** with a managed external Postgres instance.
This guide covers OS prep, app install, env vars, reverse proxy, TLS, cron, and
day-2 ops (backups, log rotation, monitoring, Slack alerts).

---

## 1. Server prep

Ubuntu 22.04 LTS recommended.

```bash
# As root
apt update && apt -y upgrade
apt install -y curl git nginx ufw fail2ban postgresql-client-16
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Node 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
corepack enable
corepack prepare pnpm@latest --activate

# Non-root app user
adduser --disabled-password --gecos "" leadrubix
mkdir -p /home/leadrubix/{app,backups,logs}
chown -R leadrubix:leadrubix /home/leadrubix
```

## 2. App install

```bash
sudo -iu leadrubix
git clone <your-repo-url> ~/app
cd ~/app
pnpm install --frozen-lockfile
pnpm --filter @workspace/db run push    # apply schema to prod DB
pnpm run build                          # builds api-server + leadrubix
```

The build produces:
- `artifacts/api-server/dist/index.mjs`            (Node ESM bundle, run by systemd)
- `artifacts/leadrubix/dist/`                      (static SPA — served by Nginx)

## 3. Environment variables

Create `/home/leadrubix/app/.env.production` (mode 600):

```dotenv
NODE_ENV=production
PORT=8080                 # api-server
WEB_PORT=3000             # leadrubix vite preview
DATABASE_URL=postgres://USER:PASS@db.host:5432/leadrubix?sslmode=require
SESSION_SECRET=<64+ random bytes, base64>

# Public site
PUBLIC_BASE_URL=https://leadsrubix.com
# CORS / cookie-Origin verification trusts this exactly
ALLOWED_ORIGIN=https://leadsrubix.com

# Object storage (Replit App Storage compatible OR S3-compatible)
DEFAULT_OBJECT_STORAGE_BUCKET_ID=<bucket>
PRIVATE_OBJECT_DIR=/leadrubix/private
PUBLIC_OBJECT_SEARCH_PATHS=/leadrubix/public

# Cal.com webhook HMAC (paste the exact secret from Cal dashboard)
CAL_WEBHOOK_SECRET=<from cal.com>

# IndexNow (Bing/Yandex/Naver instant indexing)
INDEXNOW_KEY=<32+ hex chars; also drop /<key>.txt at site root>

# Lead notifications — Slack incoming webhook
# Create at https://api.slack.com/apps → "Incoming Webhooks" → channel
LEAD_NOTIFICATION_WEBHOOK=https://hooks.slack.com/services/T.../B.../xxx

# Social-proof baselines (tune over time as real leads accumulate)
SOCIAL_PROOF_BASELINE_TOTAL=1850
SOCIAL_PROOF_BASELINE_30D=240
SOCIAL_PROOF_BASELINE_7D=58
SOCIAL_PROOF_BASELINE_DISTINCT_COMPANIES=410

# GA4 / Meta Pixel
VITE_GA4_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=XXXXXXXXXX
```

> **Slack message format:** `notify.ts` posts `{ text, lead }` to the webhook.
> Slack incoming webhooks render the `text` field directly. Zapier / Make.com
> can subscribe to the same URL and parse the structured `lead` object.

## 4. systemd unit (API only — the SPA is served as static files by Nginx)

`/etc/systemd/system/leadrubix-api.service`

```ini
[Unit]
Description=Leads Rubix API
After=network.target

[Service]
User=leadrubix
WorkingDirectory=/home/leadrubix/app/artifacts/api-server
EnvironmentFile=/home/leadrubix/app/.env.production
# PORT is read by the API process; must match the Nginx upstream below.
Environment=PORT=8080
ExecStart=/usr/bin/node --enable-source-maps ./dist/index.mjs
Restart=on-failure
RestartSec=5
StandardOutput=append:/home/leadrubix/logs/api.log
StandardError=append:/home/leadrubix/logs/api.err.log

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now leadrubix-api
```

> **Why no `leadrubix-web` service?** The marketing site is a Vite-built SPA —
> static HTML/CSS/JS. Serving it through `vite preview` in production is
> unsupported and slower; let Nginx serve `artifacts/leadrubix/dist/` directly
> (see section 5).

## 5. Nginx + TLS

`/etc/nginx/sites-available/leadsrubix.conf`

```nginx
upstream lr_api { server 127.0.0.1:8080; keepalive 16; }

server {
  listen 80;
  server_name leadsrubix.com www.leadsrubix.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name leadsrubix.com www.leadsrubix.com;

  ssl_certificate     /etc/letsencrypt/live/leadsrubix.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/leadsrubix.com/privkey.pem;

  client_max_body_size 25m;

  # SPA dist directory — Nginx serves it directly, no Node process needed.
  root  /home/leadrubix/app/artifacts/leadrubix/dist;
  index index.html;

  # API requests pass through to Node.
  location /api/ {
    proxy_pass http://lr_api;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP         $remote_addr;
  }

  # IndexNow key file (must be reachable at site root). Place the file in
  # artifacts/leadrubix/public/<key>.txt — vite copies it to dist/.
  location ~ ^/[a-f0-9]{32,64}\.txt$ {
    try_files $uri =404;
  }

  # Hashed assets — long cache (vite emits content hashes).
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }

  # Everything else: SPA fallback to index.html for client-side routing.
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

```bash
ln -s /etc/nginx/sites-available/leadsrubix.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

apt install -y certbot python3-certbot-nginx
certbot --nginx -d leadsrubix.com -d www.leadsrubix.com --redirect
```

## 6. Cron — backups + synthetic monitor

Run as the `leadrubix` user. `crontab -e -u leadrubix`:

```cron
# Postgres backup nightly at 02:15 IST → ./backups, 14-day retention
15 2 * * *   cd /home/leadrubix/app && RETAIN_DAYS=14 pnpm --filter @workspace/scripts run backup >> /home/leadrubix/logs/backup.log 2>&1

# Synthetic monitor every 10 minutes (hits /api/healthz, /, /pricing, /blog)
*/10 * * * * cd /home/leadrubix/app && pnpm --filter @workspace/scripts run synthetic-monitor >> /home/leadrubix/logs/monitor.log 2>&1

# Weekly logrotate cleanup of .log files older than 30 days
30 3 * * 0   find /home/leadrubix/logs -name "*.log" -mtime +30 -delete
```

> `pnpm run backup` writes `pg_dump --format=custom` files into
> `/home/leadrubix/app/backups`. For off-box durability, add an rclone job to
> sync that directory to S3 / Backblaze / GDrive nightly:
>
> ```cron
> 30 2 * * * rclone copy /home/leadrubix/app/backups remote:lr-backups/ --min-age 5m
> ```

## 7. Day-2 ops

- **Health check**: `curl https://leadsrubix.com/api/healthz` → `{"status":"ok"}`
- **Logs**: `tail -f /home/leadrubix/logs/api.log`
- **Restart API**: `sudo systemctl restart leadrubix-api`
- **Redeploy SPA**: `cd ~/app && git pull && pnpm install --frozen-lockfile && pnpm --filter @workspace/leadrubix run build && sudo systemctl reload nginx`
- **DB shell**: `psql "$DATABASE_URL"`
- **Restore from dump**: `pg_restore -d "$DATABASE_URL" --clean --if-exists ./backups/<file>.dump`

## 8. Post-deploy smoke checklist

```bash
curl -fsS https://leadsrubix.com/api/healthz
curl -fsS https://leadsrubix.com/sitemap.xml | head
curl -fsS https://leadsrubix.com/robots.txt
curl -fsS "https://leadsrubix.com/api/stats/social-proof"
curl -fsS https://leadsrubix.com/leadsrubix-crm-rfp-template.html | head
```

All five must return 200 with non-empty bodies before going live.
