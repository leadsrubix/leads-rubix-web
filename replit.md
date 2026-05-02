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
- **SEO**: Comprehensive SEO implementation including `index.html` metadata, `useSEO` hook for per-page SEO, `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`. JSON-LD for Organization and SoftwareApplication is included.
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