# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### `artifacts/leadrubix` — Leads Rubix CRM marketing site

Marketing website for Leads Rubix, a real-estate CRM purpose-built for the Indian market. The actual product app lives at `https://app.leadsrubix.com` — every external CTA (Sign In, Start Free Trial, Get Started, Login) opens that URL in a new tab.

- **Stack**: React + Vite, wouter routing, shadcn/ui, Tailwind v4, lucide-react, Plus Jakarta Sans font
- **Routes** (registered in `src/App.tsx`): `/`, `/features`, `/solutions`, `/integrations`, `/pricing`, `/compare`, `/case-studies`, `/demo`, `/security`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund`, `/cookies`, `/blog`, `/blog/:slug`, plus the `/admin/*` panel (see Admin Panel below). The admin dashboard component is mounted at `/admin`, `/admin/dashboard`, and `/admin/analytics` (all aliases to the same view, which contains stat cards, period comparison, conversion funnel, source filter, and trend chart).
- **Pricing**: INR — Starter ₹999/user/mo, Growth ₹1,499/user/mo, Enterprise Custom. Annual toggle gives 20% off. GST is shown as exclusive on every plan card.
- **Design rules**: NO emojis anywhere in UI. All interactive elements must have `data-testid`. External CTAs use `target="_blank" rel="noopener noreferrer"`. Internal nav uses wouter `<Link>`. Trial period is 7 days (consistent across home, FAQ, and refund pages).
- **SEO**: `index.html` carries title/meta/OG/Twitter/canonical and a JSON-LD Organization + SoftwareApplication block (no fabricated `aggregateRating`). Per-page SEO is set via the `useSEO` hook in `src/lib/useSEO.ts` (lightweight, no helmet dep). `public/robots.txt` + `public/sitemap.xml` (16 URLs) + `public/manifest.webmanifest` are shipped.
- **Legal entity**: footer + privacy + contact reference Leads Rubix Technologies Pvt. Ltd., Mumbai. Privacy page includes a DPDP Act 2023 Grievance Officer block with email `grievance@leadsrubix.com`, 3-business-day acknowledgement SLA, 30-day resolution SLA.
- **Lead-capture forms** (`/contact`, `/demo`): submit to `POST /api/contact` (api-server). Both forms have a hidden `website` honeypot field, an explicit consent line linking Privacy Policy + Terms, and full client-side validation via react-hook-form + zod. The demo form has a team-size select and shows an in-page success state.
- **Public assets**: `hero-dashboard.png`, `lead-rotation.png`, `feature-pipeline-view.png`, `feature-tasks-calendar.png`, `feature-analytics.png`, `solutions-{brokerage,developer,channel,agent}.png`, `feature-pipeline.png`, `feature-target.png`, `opengraph.jpg`, `favicon.svg`

### `artifacts/api-server` — backend API

- **Routes**: `POST /api/contact` (`src/routes/contact.ts`) accepts contact + demo submissions from the marketing site.
  - Validates payload with Zod; rejects honeypot trips and invalid payloads with a generic 400 (no PII echoed).
  - Per-IP rate limit: 5 submissions per 10-minute window (in-memory, hashed IP only).
  - **Persists each submission to the `leads` table in Postgres** (primary storage). NDJSON file at `process.env.LEADS_RUBIX_SUBMISSIONS_FILE` (default `/tmp/leads-rubix-submissions.ndjson`) is kept as a best-effort backup only — DB write is the source of truth.
  - Logs are PII-minimised: only `id`, `source`, `company`, `teamSize`, `messageLen`, hashed IP go to `req.log`. Email/phone/message are never logged.

#### Admin API (`/api/admin/*`)

Mounted in `src/routes/admin/index.ts`. All routes require an authenticated admin session via the `requireAdmin` middleware (`src/middlewares/auth.ts`). Auth uses `express-session` + `connect-pg-simple` with cookie name `leadrubix.sid` (HTTP-only, SameSite=Lax, secure in production), 30-day rolling expiry, signed with `SESSION_SECRET`.

**CSRF defence-in-depth**: `requireSameOrigin` middleware rejects any non-GET/HEAD/OPTIONS request whose `Origin`/`Referer` does not match the request host or `REPLIT_DOMAINS`. Add extra trusted origins via `ADMIN_TRUSTED_ORIGINS` (comma-separated full origins) before pointing a custom domain at the API.

**Rate-limiting & lockout**: `POST /api/admin/auth/login` is rate-limited to 5 attempts per 15-minute window per (IP, email) pair (in-memory; reset on success). On the **account** side, every 10 cumulative failures triggers a 30-minute hard lockout via `admin_users.locked_until` — even valid credentials are rejected during the lockout. Successful login zeroes `failed_login_attempts` and clears `locked_until`. See `src/lib/rate-limit.ts`.

**Force password change**: when `admin_users.must_change_password = true`, the user can sign in but every admin route except `GET /auth/me` and `PATCH /auth/change-password` returns `409 must-change-password`. The web client (`api.ts`) intercepts this and redirects to `/admin/change-password`. New admins seeded with the default password get the flag set automatically.

**Audit log**: every state-changing admin action (login/logout, content put/restore, lead PATCH/DELETE/bulk, post create/update/delete, user create/update/delete, password change) is recorded to `audit_events` (id, actorId, action, entityType, entityId, payload jsonb, createdAt) by middleware in `src/lib/audit.ts`. Surfaced via `GET /api/admin/audit`.

**Content versioning**: `PUT /api/admin/content/:key` validates the body against the section's Zod schema (mirrored from `admin/lib/contentSchemas.ts` — unknown keys are accepted but unvalidated), inserts a row into `content_versions` (id, key, value jsonb, savedBy, savedAt), and only then upserts the live `content` row. `GET /api/admin/content/:key/history` returns versions newest-first; `POST /api/admin/content/:key/restore/:versionId` re-puts a historical value as the latest.

**Streaming CSV export**: `GET /api/admin/leads/export.csv` writes the header row, then iterates leads in batches of 500 and `res.write()`s each chunk so memory stays bounded at thousands of rows. Excel/Sheets formula-injection is neutralised by prefixing cells starting with `=`, `+`, `-`, `@`, tab or CR with a single quote.

**New-lead webhook**: when `LEAD_NOTIFICATION_WEBHOOK` env var is set, `POST /api/contact` fire-and-forget POSTs `{ id, source, name, company, teamSize, createdAt }` (no email/phone/message) to that URL. Failures are logged at WARN, never thrown. See `src/lib/notify.ts`.

- `POST /api/admin/auth/login`, `POST /logout`, `GET /me`, `PATCH /change-password`
- `GET /api/admin/leads` (search/filter/paginate, also returns `assignedTo`/`tags`)
- `GET /api/admin/leads/export.csv` (streaming)
- `GET/PATCH/DELETE /api/admin/leads/:id` (PATCH accepts `status`, `notes`, `assignedTo`, `tags`)
- `GET /api/admin/leads/:id/activities` — timeline of `lead_activities` rows
- `POST /api/admin/leads/bulk` — `{ ids[], action: "status"|"assign"|"tag"|"delete", status?, assignedTo?, tags? }`
- `GET/PUT /api/admin/content[/:key]`, `GET /content/:key/history`, `POST /content/:key/restore/:versionId`
- `GET/POST /api/admin/posts`, `GET/PATCH/DELETE /api/admin/posts/:id` — body now includes `featuredImage`, `metaDescription`, `ogImage`, `tags`
- `GET/POST /api/admin/users`, `PATCH/DELETE /api/admin/users/:id`
- `GET /api/admin/analytics?source=&days=` — totals, period-comparison (current vs previous N days), trend, by-source, top companies, conversion funnel
- `GET /api/admin/audit?page=&pageSize=&entityType=` — paginated audit log

Image uploads (`POST /admin/uploads`) were intentionally skipped in favour of the simpler **paste-URL** model: editors paste an image URL into the Featured Image / OG Image fields. This avoids running App Storage in dev and keeps the marketing site CDN-friendly.

#### Public read-only content (`/api/content/*`, `/api/posts*`)

- `GET /api/content/:key` — returns the latest CMS value for a section. 30s public cache.
- `GET /api/posts?page=&pageSize=&tag=` — paginated list of published posts (no body), filterable by tag. Returns `{ posts, total, page, pageSize }`. 60s public cache.
- `GET /api/posts/:slug` — full published post by slug, including markdown `body`, `coverImage`, `metaDescription`, `ogImage`, `tags`. 60s public cache.

#### Database

Schemas live in `lib/db/src/schema/`: `admin-users` (with `must_change_password`, `last_password_change_at`, `failed_login_attempts`, `locked_until`), `leads` (with `assigned_to`, `tags`, `last_activity_at`), `content` (sections), `content_versions`, `posts` (with `featured_image`, `meta_description`, `og_image`, `tags`), `lead_activities`, `audit_events`, `sessions` (connect-pg-simple). Composite lib — run `pnpm run typecheck:libs` after schema changes. `pnpm --filter @workspace/db run push` applies schema to the dev DB.

#### Initial admin user

Seeded by `pnpm --filter @workspace/scripts run seed-admin`. Default credentials: `admin@leadsrubix.com` / `ChangeMe!2026` (role `owner`, `must_change_password=true`). Override via `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME`.

### Admin Panel UI (`artifacts/leadrubix/src/admin/`)

Mounted at `/admin/*` on the marketing site. Uses the same Vite app + shadcn/ui + Sonner toast stack so there is no separate deploy.

- `pages/Login.tsx` — sign-in; redirects to `/admin/change-password` when the freshly authed user has `mustChangePassword=true`, otherwise `/admin`.
- `pages/ChangePassword.tsx` — current-password + new-password form, gated by `RequireAuth bare`. Required after first login of a seeded admin and any time the flag is set server-side.
- `pages/Dashboard.tsx` — source filter + days filter (7/14/30/60/90), period-comparison card (current vs previous window with % change), Recharts area trend, conversion funnel bar chart, by-source + top-companies lists.
- `pages/Leads.tsx` — search/filter; bulk-select column with bulk action bar (set status / assign / delete); mobile cards under `md`. Bulk submits via `POST /admin/leads/bulk`.
- `pages/LeadDetail.tsx` — assignee dropdown (lists all admins), tag chip input, internal notes, full submission view, activity timeline (`lead_activities`). Toast feedback on save.
- `pages/Content.tsx` + `ContentEdit.tsx` — known sections get an auto-generated structured form. **History link** opens `pages/ContentHistory.tsx` which lists past `content_versions` with diff-friendly preview and one-click restore.
- `pages/Posts.tsx` + `PostEdit.tsx` — markdown body with Write/Preview tabs (rendered via `react-markdown` + `remark-gfm` + `rehype-sanitize`), featured image URL with live preview, tag chip input, SEO fields (meta description with 300-char counter, OG image URL).
- `pages/Users.tsx` — list/invite/delete admins; toast feedback.
- `pages/Audit.tsx` — paginated audit log table (mobile cards under `md`).
- `components/AdminLayout.tsx` — dark sidebar nav (Dashboard / Leads / Content / Blog / Admins / Audit log) + change-password link + sign-out.
- `components/RequireAuth.tsx` — wraps protected pages. Redirects to `/admin/login` when no session, and to `/admin/change-password` when `mustChangePassword`. The `bare` prop disables the layout (used by the change-password page itself).
- `contexts/AuthContext.tsx` — exposes `loading`, `user`, `login`, `logout`, `changePassword`, and a `mustChangePassword` flag.
- `lib/api.ts` — typed fetch wrapper. A 409 `must-change-password` response from any admin endpoint redirects the browser to `/admin/change-password` automatically.

### Public CMS wiring

`useContent<T>(key, defaultValue)` reads `/api/content/:key` lazily and caches in-module, returning the default until the live value arrives. Currently wired:
- `home_hero` → `pages/home.tsx` hero (eyebrow, headline, subheadline, primary/secondary CTA labels)
- `home_announcement` → `components/layout/Announcement.tsx` (banner above navbar; hides when text is empty)
- `testimonials` → `pages/home.tsx` outcomes section (falls back to hardcoded illustrative scenarios when CMS list is empty)
- `faq_items` → `pages/faq.tsx` (overrides hardcoded categories when any items exist)
- `case_studies` → `pages/case-studies.tsx` (overrides hardcoded stories when any items exist)
- `footer_contact` → `components/layout/Footer.tsx` (legal entity, address, support/sales emails, hours)

### Public blog

- `pages/blog.tsx` — paginated grid (12/page), tag chips that filter via `?tag=`, featured image preview, query-string state synced with browser back/forward.
- `pages/blog-post.tsx` — markdown body via `react-markdown` + `remark-gfm` + `rehype-sanitize`, featured cover image, tag chips that link back to the filtered listing, per-post `useSEO` with `metaDescription` + `ogImage`.
