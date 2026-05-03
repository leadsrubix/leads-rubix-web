# Overview

This project is a pnpm monorepo using TypeScript, designed to build and manage a real-estate CRM for the Indian market called Leads Rubix. It includes a marketing website, a backend API, and an admin panel. The primary goal is to provide a comprehensive platform for real estate professionals.

The project's vision is to become the leading CRM solution for the Indian real-estate sector, offering tailored features and a robust, scalable architecture. Key capabilities include lead management, content management for the marketing site, user administration, and detailed analytics.

# User Preferences

I prefer to work iteratively. Please ask before making major changes. I value clear and concise explanations.

# System Architecture

## Monorepo Structure

The project is structured as a pnpm workspace monorepo, with each package managing its own dependencies. Key packages include `@workspace/api-server` for the backend, `@workspace/leadrubix` for the frontend, and shared libraries.

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