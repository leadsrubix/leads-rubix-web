# Overview

This project is a pnpm monorepo using TypeScript, designed to build and manage a real-estate CRM for the Indian market called Leads Rubix. It includes a marketing website, a backend API, and an admin panel. The primary goal is to provide a comprehensive platform for real estate professionals. The project's vision is to become the leading CRM solution for the Indian real-estate sector, offering tailored features and a robust, scalable architecture. Key capabilities include lead management, content management for the marketing site, user administration, and detailed analytics.

# User Preferences

I prefer to work iteratively. Please ask before making major changes. I value clear and concise explanations.

# System Architecture

## Monorepo Structure

The project is structured as a pnpm workspace monorepo, with each package managing its own dependencies, including `@workspace/api-server` for the backend and `@workspace/leadrubix` for the frontend.

## Frontend (Leads Rubix Marketing Site & Admin Panel)

- **Stack**: React + Vite, wouter routing, shadcn/ui, Tailwind v4, lucide-react.
- **Design**: Emphasizes a clean, professional UI with consistent branding and no emojis. All interactive elements use `data-testid`.
- **SEO**: Comprehensive SEO via `useSEO` hook (per-page title/description/canonical, OG/Twitter tags, default `og:image`, and JSON-LD). Features sitemap.xml, robots.txt, and manifest.webmanifest. Includes per-page locale and geo meta tags.
- **Conversion Components**: Includes `StickyDemoCTA`, `RoiCalculator`, `ExitIntentModal` (with optional lead-magnet variant pointing to `/leadsrubix-crm-rfp-template.html`), and `WhatsAppFab` for lead generation and user engagement.
- **Analytics & Experimentation**: `src/lib/ab.ts` provides a session-scoped A/B variant assigner and a `trackEvent` helper that pushes GA4 dataLayer events. Lead forms emit `form_submit`, `form_submit_success`, and `form_submit_error` events with a `form_placement` dimension.
- **Dynamic Content**: Industry-aware demo pages, case study detail pages, and enhanced blog features with reading time, table of contents, and related posts.
- **Admin Panel UI**: Integrated within the marketing site with a dark sidebar, structured forms for content editing, and detailed views for leads, posts, and users.
- **Performance**: Route-level code splitting, skeleton loaders, and idle callbacks for non-critical components improve load times and user experience. Tracking pixels are deferred to idle and injected based on user consent.
- **Theming**: `ThemeProvider` supports dark mode, persisting preferences to `localStorage`, and respecting `prefers-color-scheme`.
- **Forms**: Lead-capture forms use `react-hook-form` and `zod` for validation, submitting to `POST /api/contact`.
- **Cookie Consent**: DPDP-style banner captures user preferences for analytics and marketing cookies, persisting choices to `localStorage`.
- **UTM Capture**: Captures UTM parameters and other tracking IDs into `sessionStorage` for lead attribution.
- **Content Management**: `useContent<T>(key, defaultValue)` hook for lazy loading and caching CMS content, supporting versioning and scheduled posts.
- **Internationalization**: Pricing currency switcher for INR, USD, and AED on the pricing page.

## Backend (API Server)

- **Stack**: Node.js 24, Express 5, PostgreSQL, Drizzle ORM, Zod for validation.
- **API Design**: RESTful API with public and authenticated admin routes.
- **Security**:
    - **Authentication**: `express-session` with `connect-pg-simple` for session management (HTTP-only, SameSite=Lax, secure cookies).
    - **CSRF Protection**: `requireSameOrigin` middleware.
    - **Rate Limiting**: Implemented for contact forms and admin login attempts with account lockout.
    - **PII Minimization**: Logs for lead submissions avoid sensitive user data.
- **Data Persistence**: PostgreSQL for primary storage; NDJSON file backup as secondary storage.
- **Content Versioning**: Tracks changes to admin content for history and restoration.
- **Audit Logging**: Records all state-changing admin actions.
- **Image Uploads**: Uses presigned GCS PUT URLs via Replit's App Storage sidecar, with secure public image reads.
- **Streaming Export**: `GET /api/admin/leads/export.csv` streams CSV data for large exports, including Excel formula injection protection.
- **Telemetry**: 404 telemetry pipeline captures pathname and referrer to identify broken links. The 404 page also surfaces a search box (routes to `/blog?q=`) and the four most recent posts.
- **Cal.com Webhook**: `POST /api/cal/webhook` accepts Cal booking events, verifies HMAC via `CAL_WEBHOOK_SECRET` (when set), and on `BOOKING_CREATED`/`BOOKING_RESCHEDULED` flips the matching lead to `demo_booked` (+20 score) and writes a `lead_activities` row. `BOOKING_CANCELLED` deducts 10 points.
- **IndexNow**: `lib/indexnow.ts` posts newly published or slug-changed blog URLs to `api.indexnow.org` (best-effort, requires `INDEXNOW_KEY`).
- **Social-proof baselines**: `GET /api/stats/social-proof` adds historical baselines to the live lead counts so the marketing badge reads believably even on a fresh DB. Override via `SOCIAL_PROOF_BASELINE_TOTAL` / `_30D` / `_7D` / `_DISTINCT_COMPANIES`. Defaults: 1850 / 240 / 58 / 410. Same ticker also renders in `/industries/:slug` hero.
- **Admin 2FA (TOTP)**: `/admin/security` lets each admin enroll a TOTP authenticator. `POST /admin/totp/setup` issues a fresh secret + QR + 10 plaintext recovery codes (only shown once); `/enable` confirms it works; `/disable` requires the current password. Login flow at `POST /admin/auth/login` accepts an optional `totpCode`; if 2FA is enabled and the code is missing/invalid the response is 401 with `{requiresTotp:true}` and `Login.tsx` switches to a 2nd-step code prompt. Recovery codes are bcrypt-hashed and single-use. Powered by `otplib` v12 + `qrcode`.
- **Hostinger deploy guide**: `deploy/HOSTINGER.md` covers Ubuntu prep, systemd units, Nginx + Let's Encrypt, env vars, Slack `LEAD_NOTIFICATION_WEBHOOK`, cron lines for backup + synthetic-monitor, and post-deploy smoke tests.
- **Schema markup**: `BreadcrumbList` + `CollectionPage` JSON-LD now on `/case-studies` (in addition to existing coverage on `/blog/:slug` and `/industries/:slug`).
- **IndexNow on publish**: when a post is published or its slug changes, we ping the post URL **plus** `/sitemap.xml` and `/blog` (and the old slug if it changed) so crawlers re-fetch the index pages too.
- **Pricing add-ons**: `/pricing` includes an India-specific add-ons table (WhatsApp BSP, per-seat overage, GST e-invoicing, dedicated IP, Razorpay routing, on-site implementation).
- **Backups**: `pnpm --filter @workspace/scripts run backup` invokes `pg_dump --format=custom` into `./backups`, prunes older than `RETAIN_DAYS` (default 14). Designed for host cron (Hostinger Cloud).

## Database

- **Technology**: PostgreSQL with Drizzle ORM.
- **Schema**: Includes tables for `admin-users`, `leads`, `content`, `content_versions`, `posts`, `lead_activities`, `audit_events`, and `sessions`.

# External Dependencies

- **Database**: PostgreSQL
- **ORMs**: Drizzle ORM
- **Validation**: Zod
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Charting**: Recharts
- **Session Management**: `express-session`, `connect-pg-simple`
- **Cloud Storage**: Google Cloud Storage (via Replit's App Storage sidecar)
- **API Codegen**: Orval
- **Markdown Rendering**: `react-markdown`, `remark-gfm`, `rehype-sanitize`
- **Tracking Pixels**: GA4, Meta Pixel, Taboola, Microsoft Clarity
- **OpenAPI Spec Display**: Redoc CDN
## v3.5 — Responsive UX polish + Hostinger deploy prep (May 2026)

- **Cookie banner — compact mobile layout**: previously covered the entire mobile fold; now a slim strip with `Reject` / `Accept all` and a `Customise` toggle on `< sm`, full layout on `≥ sm`. Honors `env(safe-area-inset-bottom)`.
- **Global responsive infra in `src/index.css`**: `html`/`body` get `overflow-x: hidden`, `scroll-behavior: smooth`, `scroll-padding-top: 5rem`, `text-size-adjust: 100%`. Touch devices get `touch-action: manipulation` for snappier taps. New `body.lr-no-scroll` class for modal scroll-lock and `.safe-bottom` utility for fixed bottom UI.
- **ExitIntentModal hardening**: only arms on `(hover: hover) and (pointer: fine)` so touch devices never trigger it; locks body scroll while open via `lr-no-scroll`; bottom-sheet style on mobile (`items-end`) with `max-h-[90dvh]` for safe content overflow.
- **Tables**: added `min-w-[640–720px]` to the 5 horizontally-scrolling tables (industry-detail, compare, pricing, vs, admin/Sources) so they remain readable inside their already-existing `overflow-x-auto` wrappers instead of compressing into illegible columns.
- **Navbar breakpoint**: bumped from `md:` (768) to `lg:` (1024) so tablets now get the hamburger sheet instead of a cramped horizontal nav. Brand text gets `whitespace-nowrap` to prevent two-line wrap.
- **Vite config portability**: `PORT` and `BASE_PATH` are now optional during `vite build` (only required for `dev` / `preview`). Lets the production build run in any CI / Hostinger pipeline.
- **DEPLOY.md**: complete Hostinger Cloud Hosting deployment guide — external Postgres (Neon/Supabase) setup, build commands, Node.js app entry, env vars table, domain + HTTPS, smoke-test checklist, redeploy loop, rollback notes.

### Hostinger deployment constraints (recorded for future agents)
- Hostinger **Shared / Premium / Business** plans are PHP-only and **cannot run this app**. Cloud Hosting (with Node.js app feature) or VPS is required.
- Hostinger Cloud ships **MySQL only**; the app uses **Postgres**, so an external Postgres (Neon free tier recommended) is mandatory.
- **Object storage stays on Replit** via the existing `DEFAULT_OBJECT_STORAGE_BUCKET_ID`, `PRIVATE_OBJECT_DIR`, `PUBLIC_OBJECT_SEARCH_PATHS` env vars copied into hPanel.
- Optional `LEAD_NOTIFICATION_WEBHOOK` for Slack/Make/Zapier notifications.

## v3.6 — Conversion + content + compliance batch (May 2026)

- **Cal.com demo embed**: `/demo` swaps the form for an embedded Cal.com calendar when `brand_identity.calBookingUrl` is set in the admin CMS. Form remains as fallback (one-click toggle below the embed). Hides automatically when no URL configured. WhatsApp FAB already shipped in v3.5; reads `footer_contact.whatsapp` from CMS.
- **UTM capture + lead scoring + structured webhook fire**:
  - Schema: added `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, `referrer`, `landing_path`, `score`, `score_band` columns to `leads` table.
  - Client (`src/lib/utm.ts`): new `captureLandingContext()` (called once in Layout) stores landing path + cross-domain referrer in sessionStorage; new `buildLeadContext()` returns `{ utm, referrer, landingPath }` for the contact + demo form submits.
  - Server (`src/lib/scoring.ts`): rule-based 0–100 scorer. Factors: business email +10, team size 5/15/20/25/30, high-intent landing/source +15, organic/referral/email medium +10 (paid +5), msg ≥200 +10 / ≥500 +15, intl phone +5. Bands: hot ≥70, warm 45–69, cold <45.
  - `routes/contact.ts`: validates UTM struct, persists all new columns, computes score, passes full payload (including factors) to `notifyNewLead`. Slack message includes 🔥/☀️/❄️ band icon and UTM line.
- **Glossary** (`/glossary`, `/glossary/:slug`): 7 SEO-targeted entries (lead-response-time, speed-to-lead, lead-routing, lead-scoring, icp, sla, whatsapp-business-api). Content lives in `src/lib/glossary.ts`. Custom mini-markdown renderer supports paragraphs, **bold**, `[text](url)` internal/external links, `-`/`*`/numbered lists, pipe-tables. Glossary→demo CTA on every detail page. Glossary linked from footer "Company" column.
- **DPDP Act 2023 compliance** — `/privacy/data-request`:
  - Page with form for export / correction / deletion / consent_withdrawal.
  - `POST /api/privacy/data-request` (rate-limited 3/h/IP) persists as a tagged lead (`tags: ["dpdp", "dpdp:<type>"]`, source `dpdp_<type>`), fires the same webhook so Ops sees it instantly.
  - Linked from footer "Legal" column.
- **OG image generator** — `GET /api/og?title=...&category=...&author=...` returns a 1200×630 SVG with brand gradient + accent glow + truncated headline. Cached 1h client / 1d edge. `useSEO` in `blog-post.tsx` falls back to this when a post has no explicit `ogImage` or `coverImage`. Zero new dependencies.
- **Synthetic monitor** (`scripts/src/synthetic-monitor.ts`): pings 6 critical endpoints (homepage, healthz, sitemap, pricing, demo, blog) with content + header assertions; POSTs Slack-shaped alert to `MONITOR_WEBHOOK_URL` on failure; exits non-zero for cron alerting. Run via `pnpm --filter @workspace/scripts run synthetic-monitor`. Designed for cron-job.org / GitHub Actions / Hostinger cron at 5-min cadence.
- **Accessibility**: skip-to-main-content link in Layout (visually-hidden until focused). All admin / form components already use focus-visible rings via shadcn primitives.
- **Blog content seed** (`scripts/src/seed-blog-posts.ts`): 4 long-form draft posts inserted to DB (idempotent on slug):
  - `/blog/crm-for-real-estate-mumbai`
  - `/blog/whatsapp-lead-capture-india-2026`
  - `/blog/lead-response-time-benchmarks-india-2026`
  - `/blog/gst-compliant-crm-india`
  - All `status='draft'` — admin must publish via `/admin/posts/:id` after review.
- **CMS additions**:
  - `brand_identity.calBookingUrl` — Cal.com booking URL (demo page reads).
  - `footer_contact.whatsapp` — already used by WhatsAppFab; FAB hides if blank.

### What's still user-blocked
- Real customer logos (placeholder logos still in place).
- Real G2 / SoftwareSuggest badges.
- 2–3 real customer case studies (`/case-studies/:slug` framework exists, content stubbed).
- Email DNS for `info@leadsrubix.com` / `privacy@leadsrubix.com`.
