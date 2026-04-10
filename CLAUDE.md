# FAM Landscape — Project Guide

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **React:** 19.2.3
- **Database:** PostgreSQL 5433 + Prisma 7.7.0 (`@prisma/adapter-pg`)
- **Styling:** Tailwind CSS v4 (PostCSS)
- **i18n:** next-intl v4.8.3 (vi/en)
- **Animations:** Framer Motion

## Database Setup

- **DB name:** `landscape_admin` on `localhost:5433`
- **Credentials:** `landscape:landscape123` (see `.env`)
- **Prisma config:** `prisma.config.ts` (uses `defineConfig` + `dotenv/config`)
- **Schema:** `prisma/schema.prisma`
- **Generated client:** `src/generated/prisma/`
- **Client singleton:** `src/lib/prisma.ts` (uses `PrismaPg` adapter)

### Prisma 7 Gotchas

1. **No `url` in schema.prisma** — connection URL goes in `prisma.config.ts` via `datasource.url` and `migrate.url`
2. **Must use driver adapter** — `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })`
3. **`earlyAccess` flag** — may cause type errors in build, use `as Parameters<typeof defineConfig>[0]` cast
4. **Seed scripts** need `import 'dotenv/config'` at top since Prisma 7 doesn't auto-load `.env`

### Common Commands

```bash
npx prisma migrate dev --name <name>   # Create & apply migration
npx prisma generate                      # Regenerate client after schema change
npx tsx prisma/seed.ts                   # Seed database
npx prisma studio                        # Visual DB browser
```

## Admin System Architecture

Admin panel lives at `/admin` (excluded from i18n middleware in `src/middleware.ts`).

### Pattern: Adding a New Data Model (e.g., NewsArticle, Partner)

Follow these 4 steps to add a new entity to the admin panel:

---

### Step 1: Add Prisma Model

In `prisma/schema.prisma`, add the model:

```prisma
model NewsArticle {
  id         String   @id @default(cuid())
  slug       String   @unique
  titleVi    String
  titleEn    String
  // ... your fields
  published  Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("news_article")  -- always add @@map to force lowercase table name
  @@index([published])
}
```

> **Always add `@@map("snake_case_name")`** — Prisma defaults to the model name as the table name (e.g. `NewsArticle`), which PostgreSQL stores as `"NewsArticle"` (quoted, case-sensitive). Use `@@map` to get clean lowercase table names.

Then run:

```bash
npx prisma migrate dev --name add_news_articles
npx prisma generate
```

---

### Step 2: Create API Routes

**List + Create** — `src/app/api/<entity>/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  // Add filters from searchParams as needed
  const where: Record<string, unknown> = {}

  const items = await prisma.<model>.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const item = await prisma.<model>.create({
    data: {
      // map body fields to model fields
    },
  })

  return NextResponse.json(item, { status: 201 })
}
```

**Get + Update + Delete** — `src/app/api/<entity>/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const item = await prisma.<model>.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const item = await prisma.<model>.update({
    where: { id },
    data: { /* map body fields */ },
  })
  return NextResponse.json(item)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.<model>.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
```

> **Note:** In Next.js 16, `params` is a `Promise` — always `await params`.

---

### Step 3: Create Seed Script

In `prisma/seed.ts` (or a separate file), import existing data and upsert:

```typescript
import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { myData } from '../src/lib/data'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  for (const item of myData) {
    await prisma.<model>.upsert({
      where: { slug: item.slug },
      update: {},
      create: { /* map fields */ },
    })
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run with: `npx tsx prisma/seed.ts`

---

### Step 4: Add Admin UI Page

Create `src/app/admin/<entity>/page.tsx` as a `'use client'` component with:

1. **State:** items list, loading, filter, search, editingItem, isCreating, deleteConfirm
2. **Fetch:** `useEffect` + `useCallback` fetching from `/api/<entity>`
3. **Table:** columns matching model fields, with category badges and status dots
4. **Modal:** form fields for create/edit, with VI/EN bilingual inputs
5. **Delete modal:** confirmation dialog

Key UI patterns:
- Filter buttons: `bg-[#328442] text-white` (active) / `bg-white border` (inactive)
- Input focus: `focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]`
- Save button: `bg-[#328442] hover:bg-[#48a85a]`
- Delete button: `bg-red-600 hover:bg-red-700`
- Table row hover: `hover:bg-green-50/30`

---

## File Structure

```
prisma/
├── schema.prisma          # All models
├── migrations/            # Auto-generated
└── seed.ts                # Data seeder
prisma.config.ts           # Prisma 7 config (datasource URL, migrate URL)
src/
├── generated/prisma/      # Generated Prisma client (don't edit)
├── lib/
│   ├── prisma.ts          # PrismaClient singleton
│   └── data.ts            # Legacy hardcoded data (projects, articles, partners, timeline)
├── app/
│   ├── admin/             # Admin panel (excluded from i18n)
│   │   ├── layout.tsx
│   │   └── page.tsx       # Projects management
│   ├── api/
│   │   └── projects/      # REST API
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   └── [locale]/          # Public site (i18n)
├── components/            # Shared components
├── middleware.ts           # i18n routing (excludes /api, /admin)
└── messages/              # vi.json, en.json
```

## Design System

- **Primary:** `#328442` (green-500), hover `#48a85a`
- **Secondary:** `#BE7B2B` (gold)
- **Dark bg:** `#07130a` (header, hero, footer)
- **Light bg:** `#f7faf7` (page background, NOT gray-50)
- **Fonts:** Geist (sans) + Playfair Display (serif)
- See `DESIGN_SYSTEM.md` for full details

## Data in `src/lib/data.ts`

| Export | Count | Status |
|---|---|---|
| `projects` | 24 | Migrated to DB |
| `newsArticles` | 30 | Still hardcoded |
| `partners` | 20+ | Still hardcoded |
| `timelineItems` | 10 | Still hardcoded |
| `memberCompanies` | — | Still hardcoded |
