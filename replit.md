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
- **Routes** (registered in `src/App.tsx`): `/`, `/features`, `/solutions`, `/integrations`, `/pricing`, `/compare`, `/case-studies`, `/demo`, `/security`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund`, `/cookies`, `/blog`, `/blog/:slug`, plus the `/admin/*` panel (see Admin Panel below).
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

**CSRF defence-in-depth**: `requireSameOrigin` middleware (in `middlewares/auth.ts`, mounted on the admin router) rejects any non-GET/HEAD/OPTIONS request whose `Origin`/`Referer` does not match the request host or `REPLIT_DOMAINS`. Add extra trusted origins via `ADMIN_TRUSTED_ORIGINS` (comma-separated full origins, e.g. `https://leadsrubix.com,https://www.leadsrubix.com`) before pointing a custom domain at the API.

**CSV export hardening**: `/api/admin/leads/export.csv` neutralises Excel/Sheets formula-injection by prefixing any cell that begins with `=`, `+`, `-`, `@`, tab or CR with a single quote, in addition to the usual quoting/escaping.

- `POST /api/admin/auth/login` — `{ email, password }` → sets session cookie. Bcrypt-hashed passwords.
- `POST /api/admin/auth/logout`, `GET /api/admin/auth/me`
- `GET /api/admin/leads` (search/filter/paginate), `GET /api/admin/leads/export.csv`, `GET/PATCH/DELETE /api/admin/leads/:id`
- `GET/PUT /api/admin/content[/:key]` — JSON-valued CMS sections keyed by slug.
- `GET/POST /api/admin/posts`, `GET/PATCH/DELETE /api/admin/posts/:id` — blog/news posts with `draft`/`published` status.
- `GET/POST /api/admin/users`, `PATCH/DELETE /api/admin/users/:id` — admin team management; cannot delete self or last admin.
- `GET /api/admin/analytics` — totals, 30-day trend, by-source breakdown, top companies.

#### Public read-only content (`/api/content/*`, `/api/posts*`)

- `GET /api/content/:key` — returns the latest CMS value for a section. 30s public cache.
- `GET /api/posts` — list of published posts (no body). 60s public cache.
- `GET /api/posts/:slug` — full published post by slug. 60s public cache.

#### Database

Schemas live in `lib/db/src/schema/`: `admin-users`, `leads`, `content` (sections), `posts`, `sessions` (connect-pg-simple). Composite lib — run `pnpm run typecheck:libs` (or just rely on the root `pnpm run typecheck`) after schema changes so the api-server picks up the new exports. `pnpm --filter @workspace/db run push` applies schema to the dev DB.

#### Initial admin user

Seeded by `pnpm --filter @workspace/scripts run seed-admin` (script: `scripts/src/seed-admin.ts`). Default credentials: `admin@leadsrubix.com` / `ChangeMe!2026` (role `owner`). Override via `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` env vars. Re-running the script updates the password for the existing email — useful for password resets. **Change the default password before production.**

### Admin Panel UI (`artifacts/leadrubix/src/admin/`)

Mounted at `/admin/*` on the marketing site. Uses the same Vite app + shadcn/ui stack so there is no separate deploy.

- `pages/Login.tsx` — public; redirects to `/admin` once authed.
- `pages/Dashboard.tsx` — Recharts area chart of submissions, stat cards, by-source + top-companies lists.
- `pages/Leads.tsx` + `LeadDetail.tsx` — search, filter, paginate; CSV export; status + notes editor; delete.
- `pages/Content.tsx` + `ContentEdit.tsx` — known sections (`home_hero`, `home_announcement`, `footer_contact`, `faq_items`, `testimonials`, `case_studies`) get an auto-generated structured form (object/array editors, repeatable cards). Unknown keys fall back to a JSON editor. Schema definitions in `admin/lib/contentSchemas.ts`.
- `pages/Posts.tsx` + `PostEdit.tsx` — list + create/edit/publish/delete. Slug auto-derives from title; saving with "Publish" stamps `publishedAt`.
- `pages/Users.tsx` — list admins, invite new admin via dialog (email/name/role/initial password), delete (blocked for self and last admin).
- `components/AdminLayout.tsx` — dark sidebar nav (Dashboard / Leads / Content / Blog / Admins), user info, sign-out, "View site" link, mobile hamburger.
- `components/RequireAuth.tsx` — wraps protected pages; redirects to `/admin/login` when no session.
- `contexts/AuthContext.tsx` — `useAuth()` hook (loading/user/login/logout). `AuthProvider` is mounted at the root of `App.tsx` so admin routes share state across navigations.
- `lib/api.ts` — typed fetch wrapper (`adminApi.*`) with `credentials: "include"` baked in.

### Public CMS hook (`artifacts/leadrubix/src/lib/useContent.ts`)

`useContent<T>(key, defaultValue)` reads `/api/content/:key` lazily and caches in-module, falling back to the supplied default. Use it to make individual marketing sections editable from the admin panel without redeploying. Currently the default copy still lives in JSX — wire `useContent` into specific sections (e.g. `home_hero` for the homepage hero) as you make them editable. The hook is non-blocking: on first load you see the default, then the live value.
