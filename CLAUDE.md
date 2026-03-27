# FAM Landscape – Project Context for Claude

## What this project is
Company website for FAM Landscape (Công ty TNHH SX-TM-DV Hoa Và Hơn Thế Nữa), a full-service landscape contractor based in Da Nang, Vietnam. The site is bilingual (vi/en), has a public-facing front-end and an internal admin panel.

---

## Tech stack

| Layer | Package | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Animations | Framer Motion | ^12 |
| ORM | Prisma | ^7.5 |
| DB driver | `@prisma/adapter-pg` + `pg` | ^7.5 / ^8 |
| Database | PostgreSQL | (local Docker / Supabase) |
| i18n | next-intl | ^4.8 |
| Auth | next-auth v5 beta | ^5.0.0-beta.30 |
| Admin panel | `@premieroctet/next-admin` | ^8.4.2 |
| React | 19 | 19.2.3 |

---

## Key architecture decisions

### Prisma 7 + PrismaPg adapter
Prisma 7 removed the Rust engine. All DB access uses the adapter pattern:
```ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
```
`src/lib/prisma.ts` exports a singleton `prisma` instance — always import from there.

Prisma 7 removed `@prisma/client/runtime/library`. A shim is in place:
- `src/lib/prisma-runtime-shim.js` re-exports from `@prisma/client`
- `next.config.ts` has a webpack alias pointing to it

### Tailwind v4
- No `tailwind.config.js` — config is entirely in CSS
- `src/app/globals.css` uses `@import "tailwindcss"`, `@theme` for tokens
- `@source` directive scans next-admin dist: `@source "../../node_modules/@premieroctet/next-admin/dist"`
- next-admin theme imported via CSS: `@import "@premieroctet/next-admin/theme"`

### next-admin v8
- `NextAdmin` must be imported from `@premieroctet/next-admin/adapters/next` (not the main package)
- `search` is a list-level array: `list: { search: ["field1", "field2"] }`
- All models need explicit `edit.display` arrays or all fields show (including `id`, timestamps)
- Admin pages live at `src/app/admin/[[...nextadmin]]/page.tsx`
- Admin layout at `src/app/admin/layout.tsx` — keep it as a simple passthrough (no `<body>` class)

### Body class for Tailwind scoping
- `src/app/[locale]/layout.tsx` adds `className="... site"` to `<body>`
- `globals.css` scopes dark-mode background to `body.site` — prevents admin pages from going black

### next-intl v4
- Locale segment: `src/app/[locale]/...`
- Middleware: `src/middleware.ts`
- Translation files: `src/messages/en.json`, `src/messages/vi.json`
- Server components use `getTranslations` / `setRequestLocale`
- Client components use `useTranslations` / `useLocale`

### Data flow pattern (server → client)
All DB fetches happen in **server components** (page files). Data is passed as props to client components. Client components handle animations (Framer Motion), interactivity, and locale switching.

Example:
```tsx
// page.tsx (server)
const items = await prisma.timelineItem.findMany({ orderBy: { order: 'asc' } });
return <TimelineSection items={items} />;

// TimelineSection.tsx (client — 'use client')
export default function TimelineSection({ items }: { items: TimelineItem[] }) { ... }
```

---

## Database models

All models live in `prisma/schema.prisma`. Datasource is `postgresql`.

| Model | Table | Notes |
|---|---|---|
| `Project` | `projects` | Has `Category` enum, `published` flag, related `ProjectImage[]` |
| `ProjectImage` | `project_images` | `url`, `order`, `projectId` FK |
| `HeroSlide` | `hero_slides` | `url`, `labelVi`, `labelEn`, `order`, `published` |
| `Service` | `services` | `number`, `titleVi/En`, `descVi/En`, `tag`, `iconSvg` (SVG path `d` attr), `order` |
| `Partner` | `partners` | `projectsVi/En` are `String[]` arrays, `highlightVi/En` optional |
| `TimelineItem` | `timeline_items` | `year`, `title/titleEn`, `description/descriptionEn`, `order` |
| `JobPosition` | `job_positions` | `titleVi/En`, `typeVi/En`, `locationVi/En`, `descVi/En`, `published` |
| `NewsArticle` | `news_articles` | `slug` unique, `titleVi/En`, `summaryVi/En`, `contentVi/En`, `publishedAt` |

`Category` enum: `GOLF | RESORT | URBAN | GARDEN | ARTWORK`

---

## Seed

```bash
npx tsx prisma/seed.ts
```
Seeds: 24 projects + images, 5 hero slides, 6 services, 5 timeline items, 20 partners, 5 job positions, 3 news articles.
Uses `upsert` for projects/news (keyed on `slug`) and count-guarded `createMany` for the rest (won't duplicate on re-run).

After schema changes, always run:
```bash
npx prisma migrate dev   # or prisma db push for quick iteration
npx prisma generate
```

---

## File structure (key paths)

```
src/
  app/
    [locale]/           ← public locale routes (vi, en)
      page.tsx          ← homepage (fetches hero, services, timeline, partners, projects)
      about/page.tsx    ← fetches timelineItems → AboutPageContent
      careers/page.tsx  ← fetches jobPositions → CareersPageContent
      partners/page.tsx ← fetches partners → PartnersSection
      news/page.tsx     ← fetches articles
      projects/
        page.tsx        ← fetches all published projects
        [slug]/page.tsx ← fetches single project + images
      seekproject/page.tsx ← search page (q + cat URL params)
      catalogue/page.tsx   ← fetches projects → CatalogueFlipbook
    admin/
      [[...nextadmin]]/page.tsx ← next-admin panel
      layout.tsx        ← simple passthrough, NO body class
    api/
      catalogue/page/[num]/route.ts ← generates HTML pages for flipbook
    globals.css         ← Tailwind v4, next-admin theme, body.site scoping
    layout.tsx          ← root layout (no locale)
  components/           ← all React components
  lib/
    prisma.ts           ← singleton PrismaClient
    prisma-runtime-shim.js ← Prisma 7 compat shim
    nextadmin.ts        ← next-admin model config
    data.ts             ← legacy static data (only memberCompanies remains)
  messages/
    en.json             ← English translations
    vi.json             ← Vietnamese translations
  middleware.ts         ← next-intl locale routing
  auth.ts               ← next-auth credentials config
prisma/
  schema.prisma
  seed.ts
```

---

## Component conventions

### Service icons
`iconSvg` in the DB stores the SVG `<path>` `d` attribute string only. Rendered as:
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" d={service.iconSvg} />
</svg>
```

### Locale-aware rendering
```tsx
const locale = useLocale(); // client
// or
const { locale } = await params; // server
const title = locale === 'vi' ? item.titleVi : item.titleEn;
```

### Image component
Always use `next/image` with `fill` + `sizes` prop. External images (Unsplash, Cloudinary) must be in `next.config.ts` `remotePatterns`.

---

## Admin panel

- URL: `/admin`
- Login: `/admin/login` (credentials via next-auth)
- Config: `src/lib/nextadmin.ts`
- All 8 models are visible and editable
- `edit.display` arrays explicitly list fields to show (excludes `id`, `createdAt`, `updatedAt`)

---

## Common commands

```bash
npm run dev              # start dev server
npx tsx prisma/seed.ts   # seed all data
npx prisma generate      # regenerate client after schema change
npx prisma db push       # push schema to DB without migration file
npx prisma migrate dev   # create and apply migration
npx tsc --noEmit         # type-check without building
```

---

## Known gotchas

1. **`@prisma/client/runtime/library` not found** — Prisma 7 removed it. The webpack alias in `next.config.ts` + `prisma-runtime-shim.js` handles this.
2. **Admin pages all black** — body background is scoped to `body.site`. Admin layout must NOT add the `site` class.
3. **next-admin `search` field** — v8 uses `list.search: string[]`, not per-field `search: true`.
4. **`Cannot find module '.prisma/client/default'`** — run `npx prisma generate`.
5. **Tailwind not scanning next-admin** — `@source` directive in globals.css is required.
6. **`RouterAdapterProvider is not initialized`** — import `NextAdmin` from `@premieroctet/next-admin/adapters/next`, not the root package.
7. **Seed script dotenv** — `npm run seed` requires global `dotenv` CLI. Use `npx tsx prisma/seed.ts` directly with a `.env` file present.
