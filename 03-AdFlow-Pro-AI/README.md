# AdFlow Pro

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Sponsored listing marketplace: sellers post and boost ads, buyers browse and contact sellers, moderators review submissions, and admins verify payments and view analytics. Built with **Next.js 14 (App Router)**, **Supabase**, **TanStack Query**, and **Tailwind CSS**.

---

## Table of contents

| | |
|--|--|
| 1 | [Overview](#overview) |
| 2 | [Features](#features) |
| 3 | [UI and design system](#ui-and-design-system) |
| 4 | [Technology stack](#technology-stack) |
| 5 | [Architecture](#architecture) |
| 6 | [Repository layout](#repository-layout) |
| 7 | [Routes](#routes) |
| 8 | [Authentication and RBAC](#authentication-and-rbac) |
| 9 | [Core systems](#core-systems) |
| 10 | [Database schema](#database-schema) |
| 11 | [Environment variables](#environment-variables) |
| 12 | [Getting started](#getting-started) |
| 13 | [Scripts](#scripts) |
| 14 | [Important files](#important-files) |
| 15 | [Roadmap](#roadmap) |
| 16 | [License](#license) |

---

## Overview

AdFlow Pro is a full-stack SaaS-style web application for classified and sponsored listings. Public visitors see a marketing landing page, marketplace browse, and ad detail views. Authenticated users get role-specific dashboards (`client`, `moderator`, `admin`, `super_admin`). Session handling and route protection are implemented in `middleware.ts` with Supabase.

---

## Features

| Area | Description |
|------|-------------|
| Marketplace | Landing page with hero, featured listings, and pricing tiers |
| Explore | Browse listings with filters (category, location, price UI) |
| Ad detail | Gallery, description, seller card, and contact actions |
| Post ad | Seller flow to create listings (dashboard) |
| Packages | Tiered visibility tied to ranking logic |
| Dashboard | Seller KPIs, campaigns table, activity feed |
| Moderation | Queue for approve / reject workflows |
| Admin | Payments verification, analytics, user management (elevated roles) |

---

## UI and design system

The product UI uses a **dark, Material-inspired** palette: deep navy surfaces, indigo primary (`#4f46e5`), cyan accent, and high-contrast text on surfaces.

| Concern | Location |
|---------|----------|
| Design tokens (CSS variables) | `app/globals.css` — `--background`, `--card`, `--primary`, etc.; utilities such as `.af-glass-header`, `.af-gradient`, `.af-hero-gradient` |
| Tailwind aliases | `tailwind.config.ts` — `surface`, `surface-container`, `surface-container-low`, `on-surface`, `on-surface-variant` |
| Typography | [Inter](https://fonts.google.com/specimen/Inter) via `next/font/google` in `app/layout.tsx` |
| Public navigation and footer | `components/layouts/main-nav.tsx`, `components/layouts/site-footer.tsx` |
| Authenticated shell | `components/layouts/dashboard-shell.tsx`, `components/layouts/dashboard-sidebar.tsx` |

---

## Technology stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript 5 |
| Backend / Auth | Supabase (PostgreSQL, Auth, SSR cookies) |
| Data fetching | TanStack Query v5 |
| Client state | Zustand |
| Styling | Tailwind CSS v3, custom tokens |
| Components | shadcn/ui patterns, Base UI primitives |
| Icons | Lucide React |
| Validation | Zod |
| Charts | Recharts (admin analytics) |
| Toasts | Sonner |

---

## Architecture

```
Client
   │
   ▼
middleware.ts  ── Session refresh, auth, RBAC (route prefixes)
   │
   ▼
Next.js App Router (Server + Client Components)
   │
   ├── Public: /, /explore, /ad/[slug], /auth/*
   ├── Protected: /dashboard/*  (client+)
   ├── Protected: /moderator/* (moderator+)
   └── Protected: /admin/*      (admin / super_admin)
   │
   ▼
Supabase ── PostgreSQL (users, ads, categories, cities, packages, payments)
```

---

## Repository layout

```
03-AdFlow-Pro-AI/
├── app/
│   ├── layout.tsx              Root: fonts, providers, toaster
│   ├── globals.css             Design tokens and global utilities
│   ├── page.tsx                Landing
│   ├── explore/page.tsx        Marketplace grid + filters
│   ├── ad/[slug]/page.tsx      Listing detail
│   ├── auth/                   Login, register, callback
│   ├── dashboard/              Seller area
│   ├── moderator/              Review workflows
│   ├── admin/                  Admin tools
│   └── api/                    AI helpers, cron endpoints
├── components/
│   ├── layouts/                main-nav, site-footer, dashboard-shell, dashboard-sidebar
│   ├── providers/              auth, theme, query
│   └── ui/                     shadcn-style primitives
├── lib/
│   ├── supabase/               browser + server clients
│   ├── dummy-data.ts           Demo seed data
│   ├── ranking-system.ts       Listing rank score
│   └── utils.ts
├── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## Routes

### Public

| Path | Purpose |
|------|---------|
| `/` | Marketing and pricing |
| `/explore` | Browse listings |
| `/ad/[slug]` | Single listing |
| `/auth/login`, `/auth/register`, `/auth/callback` | Authentication |

### Authenticated (examples)

| Path | Role |
|------|------|
| `/dashboard`, `/dashboard/ads`, `/dashboard/create`, … | `client` and above |
| `/moderator`, `/moderator/queue` | `moderator` and above |
| `/admin`, `/admin/payments`, `/admin/analytics`, … | `admin` / `super_admin` |

### API (examples)

| Prefix | Purpose |
|--------|---------|
| `/api/ai/*` | Optional AI-assisted copy |
| `/api/cron/*` | Scheduled maintenance (expiry, ranking) |

---

## Authentication and RBAC

- **Supabase Auth** issues sessions; **`@supabase/ssr`** syncs cookies on server and client.
- **`middleware.ts`** refreshes the session, resolves the user, loads `role` from `public.users`, and redirects when a route requires a higher role than the current user.
- **`DashboardSidebar`** (`components/layouts/dashboard-sidebar.tsx`) shows navigation based on the active route prefix (`/admin` vs `/dashboard` vs `/moderator`) so admins and clients see appropriate items.

Simplified guard pattern:

```typescript
// Illustrative — see middleware.ts for the real implementation
if (!user && isProtectedPath(pathname)) redirect('/auth/login')
if (pathname.startsWith('/admin') && !isAdminRole(role)) redirect('/dashboard')
```

Role order (highest capability first): `super_admin` → `admin` → `moderator` → `client`.

---

## Core systems

### Listing rank score

**File:** `lib/ranking-system.ts`

Score combines featured flag, package weight, verified seller bonus, optional admin boost, and freshness decay. Higher score appears earlier in browse results when wired to real data.

### Supabase clients

| File | Use |
|------|-----|
| `lib/supabase/client.ts` | Client Components (`'use client'`), browser-only APIs |
| `lib/supabase/server.ts` | Server Components, route handlers, `middleware.ts` |

### UI components

Reusable primitives live under `components/ui/` (buttons, cards, dialogs, tables, etc.), styled with the same tokens as the rest of the app.

---

## Database schema

Create the following (or equivalent) in Supabase SQL. Adjust types and RLS to your security model.

```sql
CREATE TABLE public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id),
  role        TEXT NOT NULL DEFAULT 'client',
  name        TEXT,
  avatar_url  TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  slug  TEXT NOT NULL UNIQUE,
  icon  TEXT
);

CREATE TABLE public.cities (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  state TEXT
);

CREATE TABLE public.packages (
  id             SERIAL PRIMARY KEY,
  name           TEXT NOT NULL,
  price          NUMERIC(10, 2) NOT NULL,
  duration_days  INTEGER NOT NULL,
  weight         INTEGER NOT NULL DEFAULT 0,
  is_featured    BOOLEAN DEFAULT false
);

CREATE TABLE public.ads (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id    UUID REFERENCES public.users(id),
  category_id  INTEGER REFERENCES public.categories(id),
  city_id      INTEGER REFERENCES public.cities(id),
  package_id   INTEGER REFERENCES public.packages(id),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  description  TEXT,
  price        NUMERIC(12, 2) NOT NULL,
  thumbnail    TEXT,
  status       TEXT DEFAULT 'pending',
  is_featured  BOOLEAN DEFAULT false,
  admin_boost  INTEGER DEFAULT 0,
  rank_score   INTEGER DEFAULT 0,
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.payments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES public.users(id),
  ad_id        UUID REFERENCES public.ads(id),
  package_id   INTEGER REFERENCES public.packages(id),
  amount       NUMERIC(10, 2) NOT NULL,
  status       TEXT DEFAULT 'pending',
  proof_url    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Environment variables

Create `.env.local` in the project root (never commit secrets):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Optional
# OPENAI_API_KEY=
# CRON_SECRET=
```

Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Getting started

**Requirements:** Node.js 18.17+, npm 9+ (or pnpm / yarn), a Supabase project.

```bash
git clone <your-repo-url>
cd 03-AdFlow-Pro-AI
npm install
```

Copy environment template if present, or create `.env.local` as above. Apply the SQL schema in the Supabase SQL editor, then seed categories and cities as needed (or rely on `lib/dummy-data.ts` for local UI).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (includes lint) |
| `npm start` | Run production server after `build` |
| `npm run lint` | ESLint |

---

## Important files

| File | Role |
|------|------|
| `middleware.ts` | Auth session + RBAC for protected routes |
| `app/layout.tsx` | Root layout, Inter font, providers |
| `app/globals.css` | CSS variables and global UI utilities |
| `lib/ranking-system.ts` | Ranking helper for listings |
| `lib/supabase/client.ts` / `server.ts` | Supabase for client vs server |
| `components/layouts/dashboard-sidebar.tsx` | Role-aware sidebar + mobile drawer |

---

## Roadmap

- [ ] Replace remaining dummy data with Supabase queries
- [ ] End-to-end explore filters (category, city, price)
- [ ] Image upload and media pipeline for new ads
- [ ] Moderator approve/reject persistence
- [ ] Admin payment verification workflow
- [ ] RLS policies on all tables
- [ ] Production deployment (e.g. Vercel) with env configuration

---

## License

MIT. Add a `LICENSE` file in the repo root if you need a formal copy for submission or open source distribution.

---

## Author

**Muhammad Arslan** — FA23-BCS-030 · Web technologies / AdFlow Pro coursework repository.

For issues and contributions, use GitHub Issues and Pull Requests against your fork.
