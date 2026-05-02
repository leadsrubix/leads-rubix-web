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
- **Routes** (registered in `src/App.tsx`): `/`, `/features`, `/solutions`, `/integrations`, `/pricing`, `/compare`, `/case-studies`, `/demo`, `/security`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund`, `/cookies`
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
  - Persists submissions as NDJSON to `process.env.LEADS_RUBIX_SUBMISSIONS_FILE` or `/tmp/leads-rubix-submissions.ndjson`. **For production deployment, point that env var at a durable location and wire onward delivery (CRM/email).**
  - Logs are PII-minimised: only `id`, `source`, `company`, `teamSize`, `messageLen`, hashed IP go to `req.log`. Email/phone/message are never logged.
