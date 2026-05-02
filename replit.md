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
- **Routes** (registered in `src/App.tsx`): `/`, `/features`, `/solutions`, `/integrations`, `/pricing`, `/security`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund`, `/cookies`
- **Pricing**: INR — Starter ₹999/user/mo, Growth ₹1,499/user/mo, Enterprise Custom
- **Design rules**: NO emojis anywhere in UI. All interactive elements must have `data-testid`. External CTAs use `target="_blank" rel="noopener noreferrer"`. Internal nav uses wouter `<Link>`. Trial period is 7 days (consistent across home, FAQ, and refund pages).
- **Public assets**: `hero-dashboard.png`, `lead-rotation.png`, `feature-pipeline-view.png`, `feature-tasks-calendar.png`, `feature-analytics.png`, `solutions-{brokerage,developer,channel,agent}.png`, `feature-pipeline.png`, `feature-target.png`, `opengraph.jpg`, `favicon.svg`
