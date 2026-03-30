# 🚀 AdFlow Pro — Sponsored Listing Marketplace

> **A production-grade, full-stack SaaS ad marketplace** built with Next.js 14, Supabase, TanStack Query, Zustand, and Tailwind CSS. Sellers can post & boost listings, buyers can discover them, and admins/moderators can manage the entire platform from role-specific dashboards.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Live Demo & Screenshots](#-live-demo--screenshots)
3. [Tech Stack](#-tech-stack)
4. [Architecture Diagram](#-architecture-diagram)
5. [Project Structure](#-project-structure)
6. [Pages & Routes](#-pages--routes)
7. [Authentication & RBAC](#-authentication--rbac)
8. [Core Systems Deep Dive](#-core-systems-deep-dive)
   - [Ad Ranking Algorithm](#ad-ranking-algorithm)
   - [Supabase Integration](#supabase-integration)
   - [UI Component Library](#ui-component-library)
   - [Dashboard Sidebar](#dashboard-sidebar)
   - [Pricing Packages](#pricing-packages)
9. [Database Schema (Supabase)](#-database-schema-supabase)
10. [Environment Variables](#-environment-variables)
11. [Getting Started](#-getting-started)
12. [Scripts](#-scripts)
13. [Key Files Reference](#-key-files-reference)
14. [Roadmap / TODO](#-roadmap--todo)

---

## 🌟 Project Overview

**AdFlow Pro** is a premium classified-ad SaaS platform that bridges **verified sellers** with **serious buyers**. The platform supports:

| Feature | Description |
|---|---|
| 🏠 **Marketplace Homepage** | Hero section, featured listings, and tiered pricing plans |
| 🔍 **Explore / Browse** | Full browsable listing directory (filterable by category & city) |
| 📝 **Post Ad** | Authenticated sellers create and publish listings |
| 💳 **Package Boosting** | Sellers pay for visibility tiers (Basic / Standard / Premium) that control ranking score and featured status |
| 📊 **Seller Dashboard** | Personal ad management, views analytics, payment history |
| 🛡️ **Moderation Queue** | Moderators approve/reject submitted ads |
| ⚙️ **Admin Control Center** | Admins verify payments, view platform analytics, manage users |
| 🔒 **Role-Based Access Control** | Four roles (`client`, `moderator`, `admin`, `super_admin`) enforced at the middleware level |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | Server/Client components, routing, middleware |
| **Language** | TypeScript 5 | Type safety across the entire codebase |
| **Database & Auth** | [Supabase](https://supabase.com/) | PostgreSQL backend + magic-link / OAuth auth |
| **Server State** | [TanStack Query v5](https://tanstack.com/query) | Data fetching, caching, and synchronization |
| **Client State** | [Zustand v5](https://zustand-demo.pmnd.rs/) | Lightweight global UI state (modals, filters, etc.) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first CSS with custom design tokens |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) | Accessible, headless component primitives |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, stroke-based icon set |
| **Form Validation** | [Zod v4](https://zod.dev/) | Schema-driven form validation |
| **Charts** | [Recharts v3](https://recharts.org/) | Analytics charts in the admin dashboard |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Toast notifications (top-right, rich colors) |
| **Animations** | `tailwindcss-animate` + `tw-animate-css` | Smooth micro-animations throughout the UI |
| **Fonts** | Inter (Google Fonts via `next/font`) | Clean, modern typography |

---

## 🗂️ Architecture Diagram

```
Browser Request
      │
      ▼
 middleware.ts  ←── Supabase Session Check + RBAC Route Guard
      │
      ▼
 Next.js App Router
  ├── /                    ← Public landing page
  ├── /explore             ← Public listing browser
  ├── /ad/[slug]           ← Public ad detail page
  ├── /auth/login          ← Auth pages (Supabase)
  ├── /auth/register
  ├── /auth/callback       ← OAuth redirect handler
  ├── /dashboard/*         ← Protected: role ≥ 'client'
  ├── /moderator/*         ← Protected: role ≥ 'moderator'
  └── /admin/*             ← Protected: role ≥ 'admin'
                                                    │
                                                    ▼
                                            Supabase
                                      ┌─────────────────────┐
                                      │  PostgreSQL Database │
                                      │  ├── users           │
                                      │  ├── ads             │
                                      │  ├── categories      │
                                      │  ├── cities          │
                                      │  ├── packages        │
                                      │  └── payments        │
                                      └─────────────────────┘
```

---

## 📁 Project Structure

```
adflow-pro/
│
├── app/                          # Next.js App Router (all pages & API routes)
│   ├── layout.tsx                # Root layout: Inter font, QueryProvider, Toaster
│   ├── globals.css               # Tailwind base + CSS custom properties (design tokens)
│   ├── page.tsx                  # 🏠 Public landing page (Hero, Features, Featured Ads, Pricing)
│   │
│   ├── explore/                  # 🔍 Public browse/search page
│   │
│   ├── ad/
│   │   └── [slug]/               # 📄 Dynamic public ad detail page
│   │
│   ├── auth/
│   │   ├── login/                # 🔑 Login page (Supabase email/OAuth)
│   │   ├── register/             # 📝 Registration page
│   │   └── callback/             # 🔄 Supabase OAuth callback handler
│   │
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard shell with collapsible sidebar
│   │   ├── page.tsx              # 📊 Overview: KPI cards + recent activity
│   │   ├── ads/                  # 📋 My active/pending/expired ads list
│   │   ├── create/               # ✏️ Post a new ad form
│   │   ├── payments/             # 💳 My payment history & package purchases
│   │   ├── profile/              # 👤 User profile editor
│   │   └── settings/             # ⚙️ Account settings (notifications, security)
│   │
│   ├── moderator/
│   │   ├── layout.tsx            # Moderator shell (same sidebar, different role filter)
│   │   ├── page.tsx              # 🛡️ Moderator overview with queue stats
│   │   └── queue/                # ✅ Review queue: approve or reject submitted ads
│   │
│   ├── admin/
│   │   ├── layout.tsx            # Admin shell
│   │   ├── page.tsx              # ⚙️ Admin Control Center with platform-wide KPIs
│   │   ├── payments/             # 💰 Verify manual payment proofs
│   │   ├── analytics/            # 📈 Revenue & ad performance charts (Recharts)
│   │   └── users/                # 👥 User management & role assignment (super_admin only)
│   │
│   └── api/
│       ├── ai/                   # 🤖 AI-powered features (ad description generator, etc.)
│       └── cron/                 # ⏰ Cron job endpoints (ad expiry, ranking refresh)
│
├── components/
│   ├── layouts/
│   │   ├── dashboard-sidebar.tsx # Collapsible sidebar with RBAC-filtered nav links
│   │   ├── dashboard-shell.tsx   # Wrapper that pairs sidebar + page content
│   │   └── main-nav.tsx          # Public top navigation bar with logo + CTA
│   │
│   ├── providers/
│   │   └── query-provider.tsx    # TanStack Query QueryClient provider (client component)
│   │
│   └── ui/                       # shadcn/ui component library (all customized)
│       ├── button.tsx            # Button with variants: default, outline, ghost, etc.
│       ├── card.tsx              # Card, CardHeader, CardContent, CardFooter
│       ├── badge.tsx             # Badge with variants: default, secondary, outline
│       ├── input.tsx             # Styled text input
│       ├── textarea.tsx          # Multi-line textarea
│       ├── label.tsx             # Form label
│       ├── select.tsx            # Accessible dropdown select
│       ├── dialog.tsx            # Modal dialog (Base UI powered)
│       ├── dropdown-menu.tsx     # Context / action menus
│       ├── sheet.tsx             # Side drawer / sheet
│       ├── popover.tsx           # Floating popover
│       ├── tabs.tsx              # Tabbed navigation
│       ├── table.tsx             # Data table (thead, tbody, tr, td)
│       ├── avatar.tsx            # User avatar with fallback initials
│       ├── switch.tsx            # Toggle switch
│       ├── separator.tsx         # Horizontal/vertical divider
│       ├── skeleton.tsx          # Loading skeleton placeholder
│       ├── ad-skeleton.tsx       # Ad-card-specific loading skeleton
│       └── sonner.tsx            # Toaster component (wraps Sonner library)
│
├── lib/
│   ├── utils.ts                  # cn() helper: merges clsx + tailwind-merge
│   ├── dummy-data.ts             # Dev/demo seed data (ads, categories, cities, packages)
│   ├── ranking-system.ts         # 📐 Ad ranking score algorithm (see deep dive below)
│   ├── media-normalization.ts    # Utility to normalize media URLs (YouTube, images)
│   └── supabase/
│       ├── client.ts             # createBrowserClient() — for use in Client Components
│       └── server.ts             # createServerClient() — for use in Server Components & API routes
│
├── types/                        # (Empty — TypeScript types planned here)
├── hooks/                        # (Empty — custom React hooks planned here)
├── services/                     # (Empty — API service functions planned here)
├── features/                     # (Empty — feature-sliced modules planned here)
│
├── middleware.ts                  # 🔒 Auth guard + RBAC enforcement (runs on every request)
├── next.config.mjs               # Next.js config: allowed image hostnames (Unsplash, YouTube)
├── tailwind.config.ts            # Tailwind theme: custom colors, fonts, animations
├── components.json               # shadcn/ui CLI configuration
├── tsconfig.json                 # TypeScript path aliases (@/ → project root)
└── .env.local                    # Environment secrets (not committed to git)
```

---

## 🌐 Pages & Routes

### Public Routes (no login required)

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Landing page with hero, feature highlights, featured ad cards, and pricing table |
| `/explore` | `app/explore/` | Browse all live listings — filterable by category and city |
| `/ad/[slug]` | `app/ad/[slug]/` | Full detail view of a single listing including seller info and contact CTA |
| `/auth/login` | `app/auth/login/` | Supabase-powered login (email magic-link or OAuth) |
| `/auth/register` | `app/auth/register/` | New account registration |
| `/auth/callback` | `app/auth/callback/` | Server-side callback route that exchanges an OAuth code for a session |

### Protected: Client Role

| Route | Description |
|---|---|
| `/dashboard` | KPI overview: active ads, total views, CTR, lifetime spend + recent activity feed |
| `/dashboard/ads` | List of all your posted ads with status badges (pending / live / expired) |
| `/dashboard/create` | Multi-step form to create and submit a new ad for moderation |
| `/dashboard/payments` | Payment history and ability to purchase/upgrade listing packages |
| `/dashboard/profile` | Edit display name, avatar, contact info, and verification status |
| `/dashboard/settings` | Toggle notification preferences, manage connected accounts |

### Protected: Moderator Role

| Route | Description |
|---|---|
| `/moderator` | Overview of the moderation queue with pending counts |
| `/moderator/queue` | Review each submitted ad: approve (publish) or reject with reason |

### Protected: Admin Role

| Route | Description |
|---|---|
| `/admin` | Platform Command Center with revenue, active ads, users, and pending payment KPIs |
| `/admin/payments` | List of manual payment proofs requiring admin verification |
| `/admin/analytics` | Revenue trends & ad performance charts using Recharts |
| `/admin/users` | (`super_admin` only) Full user table with role editor |

### API Routes

| Route | Description |
|---|---|
| `/api/ai/` | AI endpoint(s) — e.g., auto-generating ad descriptions with an LLM |
| `/api/cron/` | Cron endpoints called by a scheduler to expire old ads and refresh ranking scores |

---

## 🔒 Authentication & RBAC

### How It Works

Authentication is handled entirely by **Supabase Auth** (server-side session cookies via `@supabase/ssr`).

Every HTTP request (except static assets) passes through **`middleware.ts`**, which:

1. **Refreshes** the Supabase session from cookies.
2. **Reads** the current user from `supabase.auth.getUser()`.
3. **Redirects** unauthenticated users trying to access protected routes → `/auth/login`.
4. **Queries** the `users` table for the user's `role` field.
5. **Enforces** role-based access:

```typescript
// From middleware.ts (simplified)

// Public routes — always allowed
if (pathname === '/' || pathname.startsWith('/explore') || pathname.startsWith('/auth')) {
  return supabaseResponse
}

// Must be logged in for everything else
if (!user) redirect('/auth/login')

// Role checks — redirect down if insufficient role
if (pathname.startsWith('/admin') && !['admin', 'super_admin'].includes(role)) {
  redirect('/dashboard')
}

if (pathname.startsWith('/moderator') && !['moderator', 'admin', 'super_admin'].includes(role)) {
  redirect('/dashboard')
}
```

### Role Hierarchy

```
super_admin  ─┐
              ├── Can do everything
admin        ─┤   + access /admin/* routes
              │   + manage users (super_admin only)
moderator    ─┤   + access /moderator/* routes
              │
client       ─┘   + access /dashboard/* routes only
```

### Sidebar Navigation (RBAC in the UI)

The `DashboardSidebar` component also filters its nav links client-side using the current role, so users only see links they can access:

```typescript
// From components/layouts/dashboard-sidebar.tsx
const allLinks = [
  { name: 'My Ads',       href: '/dashboard/ads',    roles: ['client'] },
  { name: 'Review Queue', href: '/moderator/queue',  roles: ['moderator', 'admin', 'super_admin'] },
  { name: 'Manage Users', href: '/admin/users',      roles: ['super_admin'] },
  // ...
]

const filteredLinks = allLinks.filter(link => link.roles.includes(role))
```

---

## 🔬 Core Systems Deep Dive

### Ad Ranking Algorithm

**File:** `lib/ranking-system.ts`

Every ad gets a dynamic **rank score** whenever it is displayed in search/browse results. Higher score = shown first.

```typescript
export function calculateRankScore({
  isFeatured,     // boolean  — did user buy a featured package?
  packageWeight,  // number   — 0 (Basic), 5 (Standard), 10 (Premium)
  publishedAt,    // Date     — when was this ad published?
  adminBoost,     // number   — manual score bump set by admin
  isSellerVerified // boolean — is this a verified seller?
}): number {
  let score = 0

  // --- COMPONENT 1: Featured Bonus (+500) ---
  // Ads marked as featured jump to the top immediately.
  if (isFeatured) score += 500

  // --- COMPONENT 2: Package Weight (+0 to +500) ---
  // Premium package (weight=10) → +500 pts
  // Standard package (weight=5) → +250 pts
  // Basic package (weight=0)    → +0 pts
  score += packageWeight * 50

  // --- COMPONENT 3: Verified Seller Bonus (+100) ---
  // Promotes trust — verified sellers get a small permanent boost.
  if (isSellerVerified) score += 100

  // --- COMPONENT 4: Admin Manual Boost (+N) ---
  // Admins can manually boost specific high-quality listings.
  score += (adminBoost || 0)

  // --- COMPONENT 5: Freshness Decay (0 to +200) ---
  // A brand-new ad starts at +200 freshness points and loses 1 point per hour.
  // This keeps the feed dynamic and favors recently updated listings.
  // Formula: max(0, 200 - hoursSincePublished)
  const hoursSince = (Date.now() - new Date(publishedAt).getTime()) / 3_600_000
  score += Math.max(0, 200 - hoursSince)

  return Math.round(score)
}
```

**Score Breakdown Example:**

| Scenario | Featured | Package | Verified | Fresh (0h) | Total |
|---|---|---|---|---|---|
| New Premium Featured | +500 | +500 | +100 | +200 | **1,300** |
| New Standard Verified | 0 | +250 | +100 | +200 | **550** |
| Old Basic Unverified (200h) | 0 | 0 | 0 | +0 | **0** |

---

### Supabase Integration

There are **two distinct Supabase clients** depending on rendering context.

#### Browser Client — `lib/supabase/client.ts`

```typescript
// Used inside 'use client' components
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Reads env vars at runtime in the browser
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```
**When to use:** Client Components (`'use client'`) that need to make real-time queries or perform auth actions like login/logout.

#### Server Client — `lib/supabase/server.ts`

```typescript
// Used in Server Components, Server Actions, and Route Handlers
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Reads from the incoming HTTP request cookie header
        getAll() { return cookieStore.getAll() },
        // Sets cookies on the HTTP response (for session refresh)
        setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        )},
      },
    }
  )
}
```
**When to use:** Server Components, `page.tsx` files that fetch data, API route handlers, and `middleware.ts`.

> **Why two clients?** Next.js has strict rules about cookie access. Server-side code uses `next/headers` to read/write cookies directly in the response. Browser-side code uses the document's cookie store. `@supabase/ssr` provides separate factory functions for each context.

---

### UI Component Library

All UI components live in `components/ui/` and are based on **shadcn/ui** with **Base UI** primitives underneath. They are **copy-owned** — meaning you own the source code and can customize them freely.

| Component | Used For |
|---|---|
| `Button` | CTA buttons, form submit, icon actions. Variants: `default`, `outline`, `ghost`, `destructive` |
| `Card` | Every dashboard panel, listing card, pricing tier |
| `Badge` | Status indicators (`published`, `pending`), `Featured` label, `URGENT` flag |
| `Dialog` | Confirmation modals, quick edit forms, image lightbox |
| `Sheet` | Mobile sidebar drawer, quick-edit panels |
| `Select` | Category picker, city filter, role selector |
| `Tabs` | Dashboard sub-navigation (e.g., Active / Pending / Expired ads) |
| `Table` | Admin payment list, user management table |
| `Avatar` | User profile picture with initial fallback |
| `Skeleton` | Loading placeholders while data is fetching |
| `AdSkeleton` | Specialized card skeleton for the listing grid |
| `Sonner` | Toast notifications (success, error, info) — appears top-right |

---

### Dashboard Sidebar

**File:** `components/layouts/dashboard-sidebar.tsx`

The sidebar is a `'use client'` component with two key states:

1. **Collapsed** (`w-[68px]`): Shows only icons. Labels slide out with a CSS width/opacity transition.
2. **Expanded** (`w-64`): Full icon + label display.

It also handles **mobile** with a drawer overlay:

```
Desktop:            Mobile:
┌────┬──────────┐   ┌─────────────────────┐
│ 🔵 │  AdFlow  │   │  [☰ hamburger btn]  │
│ ─  │  ──────  │   │                     │
│ 🏠 │  Home    │   │  [Overlay + Drawer] │
│ 📊 │  Overview│   └─────────────────────┘
│ 📋 │  My Ads  │
└────┴──────────┘
```

**Key implementation details:**
- `usePathname()` determines the active link — exact match for `/dashboard`, prefix match for sub-routes
- Active links get an indigo highlight + a small dot indicator on the right
- The `chevron` toggle button collapses/expands with smooth CSS transitions
- Section headers (e.g., "Moderation", "Administration") only appear for elevated roles

---

### Pricing Packages

**File:** `lib/dummy-data.ts` (will migrate to Supabase `packages` table)

| Package | Price | Duration | Rank Weight | Featured Badge |
|---|---|---|---|---|
| Basic | $9.99 | 7 days | 0× | ❌ |
| Standard | $19.99 | 15 days | 5× | ❌ |
| **Premium** ⭐ | $49.99 | 30 days | 10× | ✅ + Priority Approval |

The **Standard** package is highlighted as "Most Popular" in the pricing grid and is vertically elevated with a shadow treatment.

When a seller purchases a package, the `packageWeight` and `is_featured` values are stored against their ad in Supabase and fed into `calculateRankScore()`.

---

## 🗄️ Database Schema (Supabase)

The following tables power the platform (to be created in your Supabase project):

```sql
-- Users (extends Supabase Auth users)
CREATE TABLE public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id),
  role        TEXT NOT NULL DEFAULT 'client',  -- client | moderator | admin | super_admin
  name        TEXT,
  avatar_url  TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE public.categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  slug  TEXT NOT NULL UNIQUE,
  icon  TEXT
);

-- Cities
CREATE TABLE public.cities (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  state TEXT
);

-- Packages
CREATE TABLE public.packages (
  id             SERIAL PRIMARY KEY,
  name           TEXT NOT NULL,
  price          NUMERIC(10, 2) NOT NULL,
  duration_days  INTEGER NOT NULL,
  weight         INTEGER NOT NULL DEFAULT 0,
  is_featured    BOOLEAN DEFAULT false
);

-- Ads
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
  status       TEXT DEFAULT 'pending',   -- pending | published | rejected | expired
  is_featured  BOOLEAN DEFAULT false,
  admin_boost  INTEGER DEFAULT 0,
  rank_score   INTEGER DEFAULT 0,
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE public.payments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES public.users(id),
  ad_id        UUID REFERENCES public.ads(id),
  package_id   INTEGER REFERENCES public.packages(id),
  amount       NUMERIC(10, 2) NOT NULL,
  status       TEXT DEFAULT 'pending',  -- pending | verified | rejected
  proof_url    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root with the following:

```bash
# Required: Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co

# Required: Your Supabase anonymous/public API key
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE


-...
```

> **Security:** Never commit `.env.local` to git. The `.gitignore` already excludes it.
> Only `NEXT_PUBLIC_*` variables are exposed to the browser — the rest are server-only.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (or pnpm/yarn)
- A **Supabase** project (free tier works fine)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/adflow-pro.git
cd adflow-pro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
# Then fill in your Supabase URL and anon key
```

### 4. Set up the Supabase database

1. Go to [supabase.com](https://supabase.com) → your project → **SQL Editor**
2. Copy and run the SQL from the [Database Schema](#-database-schema-supabase) section above
3. Seed some initial categories, cities, and packages (or use the dummy data in `lib/dummy-data.ts` for local dev)

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload on `http://localhost:3000` |
| `npm run build` | Build optimized production bundle (runs type-check + lint) |
| `npm start` | Start production server (requires `npm run build` first) |
| `npm run lint` | Run ESLint across the entire project |

---

## 📌 Key Files Reference

| File | Purpose |
|---|---|
| `middleware.ts` | Route guard — runs before EVERY page request. Handles auth + RBAC redirects. |
| `app/layout.tsx` | Root HTML shell: sets Inter font, wraps in `QueryProvider`, mounts `Toaster` |
| `app/page.tsx` | Public landing page: Hero → Features → Featured Ads → Pricing |
| `lib/ranking-system.ts` | Pure function that scores an ad for search ranking. No side effects. |
| `lib/dummy-data.ts` | Hardcoded seed data for local development (replaces live DB calls) |
| `lib/supabase/client.ts` | Supabase client for `'use client'` components |
| `lib/supabase/server.ts` | Supabase client for Server Components, API routes, middleware |
| `components/layouts/dashboard-sidebar.tsx` | Responsive, collapsible, role-filtered sidebar navigation |
| `components/providers/query-provider.tsx` | Wraps app in `QueryClientProvider` for TanStack Query |
| `tailwind.config.ts` | Custom design tokens: colors, border-radius, animations |
| `next.config.mjs` | Allows external images from `images.unsplash.com` and `img.youtube.com` |

---

## 🗺️ Roadmap / TODO

- [ ] Connect all pages to live Supabase data (replace dummy data)
- [ ] Build out `/explore` with real filtering (category, city, price range)
- [ ] Implement the `/dashboard/create` multi-step ad form with image upload
- [ ] Complete `/moderator/queue` with approve/reject actions
- [ ] Build `/admin/payments` with payment proof image viewer
- [ ] Build `/admin/analytics` with real Recharts charts
- [ ] Build `/admin/users` user table with role editing
- [ ] Implement real-time ranking refresh via `/api/cron/` endpoint
- [ ] Wire up `/api/ai/` for AI ad description generation (OpenAI)
- [ ] Add dark mode toggle to `main-nav.tsx`
- [ ] Replace hardcoded `role = 'client'` in sidebar with live Supabase session
- [ ] Add Row Level Security (RLS) policies to all Supabase tables
- [ ] Deploy to Vercel with production environment variables

---

## 📄 License

MIT © AdFlow Pro — built with ❤️ using Next.js and Supabase.
