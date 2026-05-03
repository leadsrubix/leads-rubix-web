# Overview

This project is a pnpm monorepo using TypeScript, designed to build and manage a real-estate CRM for the Indian market called Leads Rubix. It includes a marketing website, a backend API, and an admin panel. The primary goal is to provide a comprehensive platform for real estate professionals.

The project's vision is to become the leading CRM solution for the Indian real-estate sector, offering tailored features and a robust, scalable architecture. Key capabilities include lead management, content management for the marketing site, user administration, and detailed analytics.

# User Preferences

I prefer to work iteratively. Please ask before making major changes. I value clear and concise explanations.

# System Architecture

## Monorepo Structure

The project is structured as a pnpm workspace monorepo, with each package managing its own dependencies. Key packages include `@workspace/api-server` for the backend, `@workspace/leadrubix` for the frontend, and shared libraries.

## Recent updates (v3.2 — May 2026, pre-launch fixes)

- **CMS-driven phone & WhatsApp** — `footer_contact` content section now carries `phone` (international format, e.g. `+91-9871633838`) and `whatsapp` (digits-only international, e.g. `919871633838`). Both validated server-side in `content-validators.ts` and editable via the admin Content tab. The home + contact `LocalBusiness` JSON-LD now reads the CMS phone via `useContent`; the floating `WhatsAppFab` reads the CMS number and hides itself entirely when blank (no more placeholder `919999999999`). Real Leads Rubix numbers seeded.
- **Real blog content** — Removed 4 leftover E2E/smoke-test posts and seeded 3 production-ready markdown posts (round-robin lead routing, WhatsApp-first capture, GST-compliant pricing) with proper meta descriptions, tags, and back-dated `publishedAt` so the listing is paginated naturally.
- **Lead-notification webhook** — Code path (`notify.ts` + `routes/contact.ts`) was already wired as fire-and-forget; the `LEAD_NOTIFICATION_WEBHOOK` secret will be added later by the team via the Secrets tab when their alerting endpoint is ready.
- Tracking pixel IDs (GA4, Clarity, FB Pixel, Taboola) deferred to admin self-service via the existing `tracking_pixels` Content section.

## Recent updates (v3.1 — May 2026, conversion + perf + admin polish)

- **Microsoft Clarity (4th tracking pixel)** — `tracking_pixels` CMS schema gained `clarityProjectId` (alphanumeric, ≤20 chars). `TrackingPixels.tsx` injects the official Clarity snippet when **analytics** consent is granted, alongside GA4. Same consent-gating + once-per-page-load semantics as the existing pixels.
- **Inline lead capture (`InlineLeadForm`)** — Compact 3-field (name / email / phone) form mounted under the ROI calculator on `/pricing`. Posts to `/api/contact` with a placement-tagged `source` (`inline-pricing`) so future analytics can split conversion by location. Includes honeypot + accessible labels + success state.
- **Live social-proof ticker** — New `GET /api/stats/social-proof` returns aggregate-only lead counts (total / last30d / last7d / distinctCompanies, excluding spam). `SocialProofTicker.tsx` renders an animated "X teams enquired in the last 30 days" badge in the home hero, hidden when last30d < 5 to avoid showing weak numbers.
- **Scheduled & back-dated posts** — Admin Post editor gained a `datetime-local` "Publish date / time" input (next to Status). `POST /admin/posts` and `PATCH /admin/posts/:id` now honor caller-provided `publishedAt` instead of always overwriting it with `now()`. Public `GET /api/posts` and `GET /api/posts/:slug` filter `WHERE publishedAt IS NULL OR publishedAt <= now()`, so future-dated posts stay hidden until their publish time arrives — no schema migration needed.
- **Admin Cmd/Ctrl+K command palette** — New `CommandPalette` component mounted inside `AdminLayout`. Opens with Cmd/Ctrl+K or `/` (when not in a text field), supports keyboard navigation, substring filtering, and Enter-to-run. Shortcuts cover all admin sections + "New post" + "Open public site".
- **Idle WhatsApp FAB** — `WhatsAppFab` now mounts via `requestIdleCallback` (1.5s setTimeout fallback) so the floating button never competes with the LCP image or hero JS for main-thread time.
- **`useContentWithStatus`** — `useContent` was extended with a sibling hook that exposes `{ value, loading }` so callers can render skeletons instead of the brief "default-then-CMS" flash. Existing `useContent` API unchanged.
- **Reduced-motion CSS** — `index.css` honors `@media (prefers-reduced-motion: reduce)` by collapsing animation/transition durations to ~0ms site-wide. Pairs with the `motion-reduce:hidden` ping dot on `SocialProofTicker`.

## Recent updates (v3.0 — May 2026, marketing pixels)

- **CMS-driven tracking pixels** — New `tracking_pixels` CMS section (admin → Site content → Tracking) lets the team set GA4 (`ga4MeasurementId`, e.g. `G-XXXXXXXX`), Meta Pixel (`fbPixelId`), and Taboola (`taboolaAccountId`) IDs without a code change. Server-side Zod validator (`api-server/src/lib/content-validators.ts`) constrains each ID to a tight char/length set so values can't smuggle script payloads.
- **Consent-gated injection** — `src/components/marketing/TrackingPixels.tsx` is mounted globally in `Layout`. It reads the existing cookie-consent record (`lr_cookie_consent_v1`) and only injects:
  - **GA4** when the visitor granted **analytics** consent;
  - **Facebook Pixel** and **Taboola** when the visitor granted **marketing** consent.
  Each pixel is injected at most once per page load. Empty IDs disable the pixel.
- **Live consent updates** — `CookieConsent` now dispatches a `lr-cookie-consent-changed` window event when the visitor clicks Accept / Reject / Save. `TrackingPixels` listens for it (and `storage` events for cross-tab sync) so pixels fire immediately on consent — no reload required.

## Recent updates (v2.9 — May 2026, dark-mode polish)

- **Comprehensive dark-mode override block** — `src/index.css` now remaps every hardcoded brand color used across the marketing pages (`#252140`, `#F1F1F9`, `#FAF2EE`, `#E8EAF5`, `#E4E4EF`, `#16142B`, `#B8B8D4`, `#FFFFFF`, plus all opacity variants `/5 /10 /20 /25 /30 /40 /50 /60 /70 /80 /90`) to semantic tokens when `.dark` is on `<html>`. Also covers Tailwind named utilities (`bg-gray-50`, `bg-slate-50/100`, `bg-white`, `text-gray-600/900`, `text-slate-500/600/700/900`) and gradient stops (`from-slate-50`, `to-white`, `from-white`, etc.) so hero sections like `/industries/:slug` (which uses `bg-gradient-to-b from-slate-50 to-white`) flip correctly.
- **Brand CTA preserved** — `bg-[#252140]` on the primary CTA button is intentionally left unmapped because `#252140` (~hsl 247 33% 19%) is lighter than `--background` (hsl 222 47% 5%) in dark mode, so the dark-navy button still stands out. White text on it remains legible.
- **Shadow softening** — `.dark .shadow-lg/xl/2xl` now uses `rgba(0,0,0,0.6)` so light-mode shadows aren't too harsh on the dark background.
- **`?theme=light|dark` URL override** — `useTheme.tsx` now reads a `theme` query param before falling back to `localStorage`/system preference. Useful for sharing direct light/dark links and for QA screenshots.

## Recent updates (v2.8 — May 2026, SEO / AEO / GEO batch)

- **Per-page locale + geo meta** — `useSEO` now also sets `<html lang="en-IN">` and emits `geo.region` (`IN-MH`), `geo.placename` (`Mumbai`), `geo.position`, `ICBM`, and `og:locale=en_IN` meta tags on every page. We deliberately do **not** emit self-referential `hreflang` link tags — per Google's guidance, hreflang is only valid when ≥ 2 language/region versions exist, and we are a single-locale (en-IN) site.
- **GEO / Local SEO** — Home page emits a `LocalBusiness` JSON-LD entity (Mumbai HQ with `PostalAddress`, `GeoCoordinates`, `openingHoursSpecification`, and an `areaServed` array covering the eight major Indian metros) plus the existing Organization. Contact page emits `ContactPage` + `LocalBusiness` JSON-LD. Organization JSON-LD now includes `address` and a second `customer support` ContactPoint.
- **AEO / answer-engine schema** — Home now ships `WebSite` (with `SearchAction`), `WebPage` with `SpeakableSpecification` (h1 + speakable selectors), and `FAQPage` (drawn from `home_faq_items` CMS or fallback). `/pricing` emits a `FAQPage` mirroring its visible Pricing-FAQ section (4 questions). `/industries/:slug` emits `BreadcrumbList` + `Service` (provider, areaServed=India) + `FAQPage` (when the industry CMS entry has FAQs).
- **`llms.txt`** — New `/llms.txt` file describing the product, key URLs, industry pages, comparisons, policies, and developer resources for AI crawlers and answer engines.
- **`robots.txt` overhaul** — Explicitly allowed `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`, `anthropic-ai`, and `Applebot-Extended`. Added `Disallow: /admin/`.

## Recent updates (v2.7 — May 2026)

- **/vs/:slug competitor pages** — Dedicated head-to-head pages for `salesforce`, `hubspot`, `zoho`, and `sell-do`. Each renders a hero, "in one paragraph" summary, "why teams pick Leads Rubix" cards, when-to-pick split, full feature matrix (with `boolean` / `"partial"` / free-text cells), cross-links to the other comparisons, BreadcrumbList JSON-LD, and an exit-intent modal. Unknown slugs redirect to `/compare`. Data lives in `src/lib/competitors.ts`.
- **Cookie consent banner** — DPDP-style banner with Accept all / Reject non-essential / Customise (Essential always-on, Analytics, Marketing). Persists choice to `localStorage` under `lr_cookie_consent_v1`. Mounted globally via `Layout`.
- **UTM capture** — `src/lib/utm.ts` captures `utm_source/medium/campaign/term/content`, `gclid`, and `fbclid` into `sessionStorage` on first page load (called from `Layout`). `/demo` and `/contact` form submissions append captured UTMs to the lead `source` string (no schema change required).
- **Pricing currency switcher** — `/pricing` now lets visitors view prices in INR (default), USD (~/83), or AED (~/22.6). Indicative-only disclaimer renders alongside the switcher when a non-INR currency is selected. Billing remains INR.
- **Public API reference (`/docs/api`)** — Renders the OpenAPI spec via Redoc CDN. The yaml ships from `artifacts/leadrubix/public/openapi.yaml` (kept in sync with `lib/api-spec/openapi.yaml`).
- **`security.txt`** — RFC 9116-compliant disclosure file at `/.well-known/security.txt` with a 2027-12-31 expiry.
- **`TrustedBy` component** — CMS-driven (`useContent("trusted_by", …)`) wordmark/logo strip available for marketing sections; defaults seeded with placeholder names.
- **Reduced motion + LCP polish** — Global `@media (prefers-reduced-motion: reduce)` rule disables animations and smooth scroll. `index.html` preloads `/hero-dashboard.png` with `fetchpriority="high"` and DNS-prefetches the Redoc CDN.
- **Sitemap** — Added `/vs/{salesforce,hubspot,zoho,sell-do}` and `/docs/api` entries.

## Frontend (Leads Rubix Marketing Site & Admin Panel)

- **Stack**: React + Vite, wouter routing, shadcn/ui, Tailwind v4, lucide-react.
- **Design**: Emphasis on a clean, professional UI with consistent branding. No emojis in the UI. All interactive elements use `data-testid`.
- **SEO**: Comprehensive SEO via `useSEO` hook (per-page title/description/canonical, OG/Twitter tags, default `og:image`, and per-page JSON-LD insertion/cleanup). JSON-LD ships on home (Organization + SoftwareApplication), pricing (Product with offers + aggregateRating), and FAQ (FAQPage with questions). `sitemap.xml` enumerates all public pages including the eight `/industries/*` slugs and `/blog`. `robots.txt` and `manifest.webmanifest` are wired up.
- **Conversion components** (`src/components/marketing/`):
    - `StickyDemoCTA` — floating "Book a demo" pill on every public page after 700px of scroll, dismissable for the session.
    - `RoiCalculator` — interactive calculator on `/pricing` (monthly leads, conversion %, deal value) computing extra annual revenue from a 32% close-rate lift.
    - `ExitIntentModal` — armed after 5s, fires on cursor exiting the top viewport edge, mounted on `/pricing` and `/compare` with sessionStorage gating, full keyboard a11y (Escape to close, focus trap, focus restore on close).
    - `WhatsAppFab` — floating WhatsApp click-to-chat button on every public page (configurable phone + message).
- **Industry-aware demo (`/demo?industry=…`)**: Demo page reads `industry` query param (one of the 8 supported slugs), prefills the message field, personalises the H1, pill, and post-submit thank-you copy, and tags the lead source as `demo-page-<slug>`. Industry detail pages link their primary CTA with the industry slug pre-attached.
- **Case study detail pages (`/case-studies/:slug`)**: Each card on `/case-studies` links to a deep page with metric cards, before/after panels, customer quote, and back-link. Slugs are derived deterministically from the first segment of `tag` and de-duplicated via `buildCaseStudySlugs` to avoid collisions across CMS edits. Renders a `BreadcrumbList` JSON-LD.
- **Status & Changelog**:
    - `/status` shows a 90-day uptime grid per service (Marketing, Admin, API, Lead intake, Object storage), with overall uptime % and per-service uptime %. Incidents are matched per service via `incident.service` so each row reflects its own outages.
    - `/changelog` lists tagged release entries (CMS key `changelog`, default-seeded with the last 4 releases), rendered through the same Markdown pipeline as the blog.
- **Blog enhancements**: `/blog/:slug` shows reading time (220 wpm), a sticky desktop / collapsible mobile **table of contents** built from `##`/`###` headings (anchor IDs derived via a recursive React node-text extractor so headings with inline markdown still match), three **related posts** by shared first tag, and ships **Article + BreadcrumbList JSON-LD**. The listing page renders a 6-card Skeleton grid while loading. RSS feed at **`/api/blog/rss.xml`** (last 50 published, 5-min cache).
- **Route-level code splitting**: All 13 admin pages are loaded via `React.lazy` with per-route `Suspense` fallbacks, so public visitors no longer pay the cost of the admin bundle.
- **Skeleton loaders**: `/blog`, `/admin/leads` (desktop table + mobile cards), and `/admin/audit` use shadcn `Skeleton` rows instead of a "Loading…" string.
- **Theme**: `ThemeProvider` (`src/lib/useTheme.tsx`) toggles `html.dark`, persists to `localStorage`, respects `prefers-color-scheme` on first load. Toggle button lives in the navbar. CSS includes dark-mode overrides at the bottom of `index.css` for hardcoded brand colors (`#252140`, `#F1F1F9`, slate-50, etc.) so toggling switches the entire site, not just semantic-token sections.
- **Forms**: Lead-capture forms (`/contact`, `/demo`) utilize `react-hook-form` and `zod` for client-side validation. Submissions are sent to `POST /api/contact`.
- **Admin Panel UI**: Integrated within the marketing site, providing a unified deployment. It features a dark sidebar navigation, structured forms for content editing, and detailed views for leads, posts, and users.
- **Content Management**: `useContent<T>(key, defaultValue)` hook for lazy loading and caching CMS content.

## Backend (API Server)

- **Stack**: Node.js 24, Express 5, PostgreSQL, Drizzle ORM, Zod for validation.
- **API Design**: RESTful API with distinct routes for public content and authenticated admin operations.
- **Security**:
    - **Authentication**: Admin routes require `express-session` with `connect-pg-simple` for session management. Cookies are HTTP-only, SameSite=Lax, and secure in production.
    - **CSRF Protection**: `requireSameOrigin` middleware checks `Origin`/`Referer` headers.
    - **Rate Limiting**: Implemented for contact form submissions (5 per 10 min per IP) and admin login attempts (5 per 15 min per IP, email pair). Account lockout after 10 failed login attempts.
    - **Force Password Change**: Admins seeded with default passwords or flagged to `must_change_password` are redirected to change their password upon login.
    - **PII Minimization**: Logs for lead submissions are PII-minimised, avoiding logging sensitive user data.
- **Data Persistence**: Primary storage for lead submissions is PostgreSQL. NDJSON file backup is a best-effort secondary storage.
- **Content Versioning**: Admin content changes are stored in `content_versions` table, allowing for history tracking and restoration.
- **Audit Logging**: All state-changing admin actions are recorded to the `audit_events` table.
- **Image Uploads**: Utilizes presigned GCS PUT URLs via Replit's App Storage sidecar for secure direct uploads. Public image reads are served through a dedicated endpoint with security checks (MIME type whitelisting, size limits, `X-Content-Type-Options: nosniff`).
- **Streaming Export**: `GET /api/admin/leads/export.csv` streams CSV data to maintain bounded memory usage for large exports, with Excel formula injection protection.

## Database

- **Technology**: PostgreSQL with Drizzle ORM.
- **Schema**: Schemas are defined in `lib/db/src/schema/` and include tables for `admin-users`, `leads`, `content`, `content_versions`, `posts`, `lead_activities`, `audit_events`, and `sessions`.

# External Dependencies

- **Database**: PostgreSQL
- **ORMs**: Drizzle ORM
- **Validation**: Zod
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Charting**: Recharts
- **Session Management**: `express-session`, `connect-pg-simple`
- **Cloud Storage**: Google Cloud Storage (via Replit's App Storage sidecar) for image uploads.
- **API Codegen**: Orval (from OpenAPI spec)
- **Markdown Rendering**: `react-markdown`, `remark-gfm`, `rehype-sanitize`