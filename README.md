# S.O.U.L Community Platform

**S.O.U.L — Serving Opportunities, Uplifting Lives.** A Nairobi-based community platform for mental wellness, networking, opportunities, and meaningful friendships among young people in Kenya.

Live site: [soul-community.org](https://soul-community.org)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database / Auth:** [Supabase](https://supabase.com) (Postgres + Supabase Auth)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Cloudflare Pages
- **Payments:** M-Pesa (Buy Goods/Till) + PayPal

The app is built as a **static export** (`output: 'export'` in `next.config.ts`) and deployed to Cloudflare Pages — there is no Next.js server in production. All dynamic data (events, announcements, gallery, suggestions, admin content) is read from and written to Supabase directly from the client.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your Supabase project credentials:

```bash
cp .env.example .env.local
```

| Variable | Where it's used | Safe to expose? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client-side Supabase connection | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-side Supabase connection | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Reserved for future serverless use | **No — server-only, do not commit** |

### 3. Set up the database

Run the SQL files in `supabase/` against your Supabase project, starting with `schema.sql`, then the rest in any order (they're additive migrations):

```
supabase/schema.sql                        # Core tables
supabase/add_admin.sql                     # Admin user bootstrap
supabase/fix_admin_users_grant.sql
supabase/add_members_and_suggestions.sql
supabase/add_ticket_phone.sql
supabase/fix_public_insert_constraints.sql
supabase/storage_setup.sql                 # Storage buckets/policies
supabase/seed_events.sql                   # Optional sample data
supabase/seed_gallery_client_photos.sql    # Optional sample data
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # Production build (static export to /out)
npm run start   # Serve a production build locally
npm run lint    # ESLint
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Home
│   ├── about/                # Mission, Vision, Community Objectives,
│   │                         #   About SOUL, Core Values, Constitution
│   ├── the-soul-vibe/        # Community culture / closing statement
│   ├── programmes/           # Our Programmes + Weekly Activities overview
│   ├── team/                 # Founder & Director, Therapists, Suggestion Box
│   ├── weekly-activities/    # Full weekly schedule + per-day detail pages
│   ├── events/                # Events listing, checkout, confirmation
│   ├── gallery/               # Photo gallery
│   ├── announcements/         # Community announcements
│   ├── resources/             # Jobs, scholarships, learning resources, etc.
│   ├── suggestions/            # Suggestion box submission
│   ├── contact/                 # Contact form
│   ├── support/                  # Donations (M-Pesa + PayPal) — formerly /donate
│   ├── donate/                    # Redirect stub -> /support (back-compat)
│   ├── sign-in/, sign-up/          # Member auth
│   └── admin/                      # Admin dashboard (auth-gated)
│       ├── login/
│       └── (dashboard)/
│           ├── events/, gallery/, announcements/, resources/,
│           │   suggestions/, tickets/, messages/, weekly-activities/
│           └── settings/
├── components/
│   ├── layout/                # Navbar, Footer, PageHeader, banners
│   ├── shared/                 # Reusable UI (AnimatedSection, WhatsAppCTA, etc.)
│   ├── marketing/               # Section/Card/Button primitives
│   ├── donate/                   # Donation-specific components
│   └── ui/                        # Base UI primitives (menus, tabs, etc.)
├── lib/
│   ├── constants.ts            # Site copy, nav links, team/program/tier data
│   ├── supabase/                # Supabase client setup
│   └── hooks/                    # Shared React hooks (e.g. useAuthSession)
└── app/globals.css             # Design tokens + Tailwind config

supabase/                       # SQL schema + migrations (see above)
public/                         # Static assets — team photos, program images,
                                 #   donation tier images, PWA icons, documents
```

### Site navigation map

Nav links live in a single source of truth: `NAV_LINKS` in `src/lib/constants.ts`. The Navbar automatically splits this into primary (inline) and secondary ("More" dropdown) links — add/remove/reorder pages by editing that array, not the Navbar component.

## Admin Panel

`/admin` is an authenticated dashboard (Supabase Auth) for managing dynamic content without a redeploy: events, gallery, announcements, resources, suggestions, support tickets, contact messages, weekly activities, and general website settings. Static/editorial copy (About, Team, Programmes, Core Values, Constitution, donation tiers) currently lives in `src/lib/constants.ts` and requires a code change + deploy to update.

## Deployment

Hosted on **Cloudflare Pages** (see `wrangler.toml`):

```bash
npm run build   # outputs static site to /out
```

Cloudflare Pages is configured to build from the `out/` directory. Because this is a static export, **Next.js server features (API routes, `redirects()` in `next.config.ts`, server actions) are not available** — all dynamic behavior goes through Supabase directly from the browser, and redirects (e.g. `/donate` → `/support`) are implemented as client-side redirect pages instead.

## Contributing

- Work happens on feature branches off `master`, merged via pull request.
- Run `npm run lint` and `npx tsc --noEmit` before opening a PR — both should be clean.
- Keep secrets out of the repo and out of commit messages/PR descriptions. If a credential is ever pasted into a chat, PR, or commit by mistake, rotate it immediately in the relevant provider's dashboard.
