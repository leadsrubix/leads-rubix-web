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
- **Conversion Components**: Includes `StickyDemoCTA`, `RoiCalculator`, `ExitIntentModal`, and `WhatsAppFab` for lead generation and user engagement.
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
- **Telemetry**: 404 telemetry pipeline captures pathname and referrer to identify broken links.

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