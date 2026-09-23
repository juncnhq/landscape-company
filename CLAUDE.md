# FAM Landscape — Project Guide

## UI Reference

Public site UI is a clone of the **Leafix** template: https://nayonacademy.com/html/leafix/
When building/modifying public pages, match this template's layout, spacing, sections, and visual style as closely as possible (colors/fonts follow the Design System section below).

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
npm run db:push                          # Apply schema.prisma to the DB (no migration files)
npm run db:status                        # Inspect migration state
npx prisma generate                      # Regenerate client after schema change
npx tsx prisma/seed.ts                   # Seed database
npx prisma studio                        # Visual DB browser
```

### ⚠️ Migration workflow — read before changing `schema.prisma`

This project does **not** have a usable migration history:

- `prisma/migrations/` is gitignored and contains only `migration_lock.toml` — the
  migration folders were lost.
- The DB's `_prisma_migrations` table still records 5 applied migrations whose
  folders no longer exist locally.

Consequence: as soon as any migration folder is added, `prisma migrate deploy`
**fails** with history drift ("The migrations from the database are not found
locally"). That is why `build` is plain `next build` — running `migrate deploy`
there would break every deploy.

To change the schema:

1. Edit `prisma/schema.prisma`
2. `npm run db:push` — pushes the schema straight to the DB in `DATABASE_URL`
3. `npx prisma generate`
4. Commit `schema.prisma`

**Never run `prisma migrate dev` here.** `DATABASE_URL` in `.env` points at the
**production** Railway database (`yamanote.proxy.rlwy.net`), and `migrate dev`
may offer to reset it — that would wipe live data.

To restore a proper migration history later, baseline it: generate `0_init` from
the current schema, `prisma migrate resolve --applied 0_init`, then remove the 5
orphan rows from `_prisma_migrations`.

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

## Cloudinary Image Upload

Env vars (`.env`):
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dg9khx2s7"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="fam_images"   # must be Unsigned preset
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

Reusable upload components in `src/components/admin/`:
- **`ImageInput.tsx`** — single image. Upload mới + tab "Chọn từ thư viện" (`ImagePickerModal`). Props: `{ value: string, onChange: (url) => void, label? }`
- **`GalleryInput.tsx`** — multi-image, grid preview + chọn từ thư viện. Props: `{ value: string[], onChange: (urls) => void, label? }`
- **`CloudinaryUpload.tsx`** — bản cũ chỉ upload, không có tab thư viện. Chỉ còn `/admin/hero-slides` dùng, vì trang đó đã tự dựng tab thư viện riêng nên dùng `ImageInput` sẽ thành tab lồng tab.
- **`SlugField.tsx`** — ô nhập slug, tự sinh từ tiêu đề khi tạo mới và tự chuẩn hoá khi rời ô.

Upload goes directly from browser to Cloudinary (unsigned). No backend API needed.

> **Gotcha:** Upload preset must be **Unsigned** in Cloudinary dashboard (Settings → Upload → Upload presets). Signed presets will return "Unknown API key".

All admin entity models have `images String[]` field. Use `GalleryInput` for it.

---

## Admin Gallery Page (`/admin/gallery`)

Standalone media library at `/admin/gallery`:
- Upload images directly → saved to `Media` model in DB + Cloudinary
- Shows all images aggregated from every entity (projects, news, services, partners, member-companies, media)
- Filter by source, lightbox viewer, copy URL button
- API: `GET/POST /api/media`, `DELETE /api/media/[id]`

`Media` model:
```prisma
model Media {
  id        String   @id @default(cuid())
  url       String
  filename  String   @default("")
  folder    String   @default("gallery")
  createdAt DateTime @default(now())
  @@map("media")
}
```

---

## Admin UI Patterns

Each admin manager page (`src/app/admin/<entity>/<Entity>Manager.tsx`) follows this pattern:

- Wrap in `AdminShell` in `page.tsx` (provides sidebar layout)
- Action buttons per row: **view** (blue, opens public page in new tab) → **edit** (green) → **delete** (red)
- View button links: Projects → `/vi/projects/[slug]`, News → `/vi/news/[slug]`, Services → `/vi/services`, Partners → `/vi/partners`, About/MemberCompanies → `/vi/about`, Careers → `/vi/careers`
- **Ngoại lệ:** `/admin/about` không phải danh sách — là form một bản ghi duy nhất (`AboutPage`, id `"main"`), lưu bằng `PUT /api/about-page`, không có modal/xoá
- Image fields use `ImageInput` (single) or `GalleryInput` (gallery)
- Text fields use `Field` từ `src/components/admin/Field.tsx` — **không tự khai báo `Field` trong từng manager nữa**. Textarea trong đó tự giãn theo nội dung nên mô tả dài không bị cắt; bo góc `rounded-md` (feedback 22.09).

> **Note:** `/vi/` is hardcoded as the default locale (`defaultLocale: 'vi'` in `src/i18n/routing.ts`, `localePrefix` defaults to `"always"`).

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
│   ├── aboutContent.ts    # Type + hằng số trang /about (KHÔNG import prisma — dùng cả ở client)
│   ├── getAboutContent.ts # Đọc nội dung /about phía server
│   └── data.ts            # Legacy hardcoded data (projects, articles, partners, timeline)
├── components/
│   └── admin/
│       ├── ImageInput.tsx           # Single image + tab thư viện
│       ├── GalleryInput.tsx         # Multi-image + tab thư viện
│       ├── ImagePickerModal.tsx     # Modal chọn ảnh từ Media
│       ├── RichTextEditor.tsx       # Soạn thảo nội dung bài viết
│       ├── SlugField.tsx            # Ô slug tự chuẩn hoá
│       ├── Field.tsx               # Ô nhập dùng chung (input/textarea tự giãn/select)
│       └── CloudinaryUpload.tsx     # Bản cũ, chỉ hero-slides dùng
├── app/
│   ├── admin/
│   │   ├── AdminShell.tsx     # Sidebar layout wrapper
│   │   ├── Sidebar.tsx        # Nav: Dự án, Dịch vụ, Tin tức, Đối tác, Về chúng tôi, Tuyển dụng,
│   │   │                      #      Hệ sinh thái, Hero Slides, Ảnh trang, Yêu cầu tư vấn, Gallery
│   │   ├── gallery/           # Media library
│   │   ├── projects/
│   │   ├── news/
│   │   ├── services/
│   │   ├── partners/
│   │   ├── about/             # Nội dung trang /vi/about (form 1 bản ghi)
│   │   ├── careers/           # Vị trí tuyển dụng của trang /vi/careers
│   │   └── member-companies/
│   ├── api/
│   │   ├── projects/
│   │   ├── news/
│   │   ├── services/
│   │   ├── partners/
│   │   ├── about-page/        # Nội dung trang /vi/about (GET + PUT)
│   │   ├── job-positions/
│   │   ├── member-companies/
│   │   └── media/             # Media library API
│   └── [locale]/              # Public site (i18n)
├── middleware.ts               # i18n routing (excludes /api, /admin)
└── messages/                  # vi.json, en.json
```

## Design System (Leafix style)

- **Brand:** `#0F541E` (dark green), hover `#0A3A14`
- **Accent:** `#C7DC49` (lime CTA), hover `#B0C83A`
- **Dark bg:** `#0A1606` (hero overlay, footer, dark CTA)
- **Light bg:** `#FFFFFF` + section xen kẽ `#F8F7F3` / `#F7F8ED` / `#F5F2EB`
- **Fonts:** Be Vietnam Pro duy nhất cho toàn site (heading + body, vi + en) — nạp đủ weight 300–900, không trim. Bricolage/Public Sans đã gỡ.
- Tokens định nghĩa tại `src/app/globals.css` (`:root`) — luôn dùng CSS var
- See `DESIGN_SYSTEM.md` for full details

## Data in `src/lib/data.ts`

| Export | Count | Status |
|---|---|---|
| `projects` | 24 | Migrated to DB |
| `newsArticles` | 30 | Still hardcoded |
| `partners` | 20+ | Still hardcoded |
| `timelineItems` | 10 | Still hardcoded |
| `memberCompanies` | — | Still hardcoded |

> **Vị trí tuyển dụng** từng hardcode trong `src/components/CareersPageContent.tsx`, nay
> nằm trong model `JobPosition` và sửa tại `/admin/careers`. Seed lần đầu:
> `npx tsx prisma/seed-job-positions.ts` (tự bỏ qua nếu bảng đã có dữ liệu).
>
> **Nội dung trang /about** từng hardcode trong `src/components/AboutPageContent.tsx`, nay
> nằm trong model `AboutPage` và sửa tại `/admin/about`. Seed lần đầu:
> `npx tsx prisma/seed-about-page.ts`.
>
> Các danh sách lặp của trang about (tính năng, chỉ số, FAQ, quy trình) lưu dạng **mảng
> song song** (`statValues` ↔ `statLabelsVi`, `faqQuestionsVi` ↔ `faqAnswersVi`). Trang
> public cắt theo mảng ngắn hơn, nên form admin cảnh báo khi số dòng lệch nhau.
>
> `TimelineSection`, `TeamSection`, `TestimonialsSection` đã bị **xoá**: cả ba chỉ được
> import chứ không bao giờ render kể từ ~06/2026. Tab "Lịch sử" trong admin quản lý dữ
> liệu không hiển thị ở đâu, nên đã gỡ cùng `/api/timeline`.

## DB Models & `images` fields

| Model | image | images[] | Notes |
|---|---|---|---|
| Project | ✅ | ✅ | Featured + gallery |
| NewsArticle | ✅ | — | Featured only |
| Service | — | ✅ | Gallery |
| Partner | — | ✅ | Gallery |
| MemberCompany | — | ✅ | Gallery |
| JobPosition | — | — | Vị trí tuyển dụng, VI/EN + `order` + `published` |
| AboutPage | — | ✅ | Nội dung trang /vi/about, **một bản ghi** id `"main"` |
| TimelineItem | — | — | ⚠️ KHÔNG còn dùng — giữ bảng để không mất dữ liệu, không có UI/API |
| Media | — | — | `url` field, standalone uploads |
