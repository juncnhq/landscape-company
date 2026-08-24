# FAM Landscape (Lapla) — Website

Website giới thiệu & quản trị nội dung cho công ty cảnh quan **Lapla / FAM Landscape**.
Gồm **trang public song ngữ (vi/en)** và **trang quản trị `/admin`** để CRUD toàn bộ nội dung.
Giao diện dựng theo template **Leafix**.

---

## Công nghệ

| Lớp | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Ngôn ngữ | TypeScript + React 19 |
| Styling | Tailwind CSS v4 (PostCSS) |
| Đa ngôn ngữ | next-intl v4 (vi / en) |
| ORM | Prisma 7 + driver adapter (`@prisma/adapter-pg`) |
| Database | PostgreSQL |
| Ảnh / CDN | Cloudinary (upload trực tiếp từ trình duyệt) |
| Animation | Framer Motion + Lenis smooth scroll |
| Rich text | Tiptap editor |

---

## Yêu cầu

- **Node.js** >= 18
- **PostgreSQL** (mặc định dev dùng cổng `5433`)
- Tài khoản **Cloudinary** có **Unsigned upload preset**

---

## Cài đặt & chạy local

```bash
# 1. Cài dependencies (postinstall tự chạy `prisma generate`)
npm install

# 2. Tạo file .env (xem mục Biến môi trường bên dưới)

# 3. Đồng bộ schema vào database
npx prisma db push

# 4. Seed dữ liệu
npx tsx prisma/seed.ts              # projects, news, partners, timeline, member companies
npx tsx prisma/seed-services.ts     # services
npx tsx prisma/seed-hero-slides.ts  # hero slides

# 5. Chạy dev
npm run dev
```

Mở http://localhost:3000/vi (public) và http://localhost:3000/admin (quản trị).

---

## Biến môi trường (`.env`)

```env
# PostgreSQL
DATABASE_URL="postgresql://landscape:landscape123@localhost:5433/landscape_admin?schema=public"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dg9khx2s7"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="fam_images"   # BẮT BUỘC là Unsigned preset
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

> `.env` đã được `.gitignore` — không commit lên repo.
> Upload preset của Cloudinary phải để **Unsigned** (Settings → Upload → Upload presets), nếu để Signed sẽ báo "Unknown API key".

---

## Database (Prisma 7)

Dự án dùng **Prisma 7 + driver adapter**, có vài điểm khác Prisma cũ:

- Connection URL **không** đặt trong `schema.prisma` mà ở `prisma.config.ts` (`datasource.url` + `migrate.url`), nạp qua `import 'dotenv/config'`.
- Client được generate ra `src/generated/prisma/` (không sửa tay), khởi tạo singleton tại `src/lib/prisma.ts` qua `PrismaPg`.
- Script seed cần `import 'dotenv/config'` ở đầu file (Prisma 7 không tự nạp `.env`).

### Cập nhật schema — dùng `db push`

Repo này khởi tạo DB bằng `prisma db push`, thư mục `prisma/migrations/` **chưa có migration khởi tạo (create table)**. Vì vậy:

```bash
npx prisma db push     # ✅ dùng lệnh này để đồng bộ thay đổi schema
# npx prisma migrate dev   # ⚠️ hiện sẽ fail ở shadow DB do thiếu migration init
```

> Nếu muốn chuyển sang dùng migration bài bản: cần **baseline** lại lịch sử migration (`prisma migrate diff` để sinh migration init từ DB hiện tại, rồi `prisma migrate resolve --applied`).

### Các model

| Model | Bảng | Field chính |
|---|---|---|
| `Project` | `project` | slug, title/titleEn, category, image, images[], sketchImage |
| `Service` | `service` | slug, titleVi/En, descVi/En, tag, bullets[], **image**, images[] |
| `NewsArticle` | `news_article` | slug, titleVi/En, contentVi/En, image, newsType |
| `Partner` | `partner` | name, sector, images[], logo, highlight |
| `TimelineItem` | `timeline_item` | year, titleVi/En, descVi/En |
| `MemberCompany` | `member_company` | abbr, name, tagline, descVi/En, images[] |
| `HeroSlide` | `hero_slide` | image, labelVi/En, order |
| `Media` | `media` | url, filename, folder |
| `SiteSetting` | `site_setting` | key, value |

---

## Scripts

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy dev server |
| `npm run build` | `prisma migrate deploy && next build` |
| `npm run start` | Chạy production server |
| `npm run lint` | ESLint |
| `npm run seed:excel` | Seed dự án từ file Excel |

---

## Cấu trúc thư mục

```
prisma/
├── schema.prisma          # Toàn bộ model
├── migrations/            # (chỉ có các ALTER — xem mục Database)
├── seed.ts                # Seed nội dung chính
├── seed-services.ts       # Seed services
└── seed-hero-slides.ts    # Seed hero slides
prisma.config.ts           # Cấu hình Prisma 7 (datasource URL, migrate URL)
src/
├── generated/prisma/      # Prisma client (auto-generate, không sửa)
├── lib/                   # prisma singleton, auth, data
├── components/            # Component public + admin
├── app/
│   ├── [locale]/          # Trang public (i18n vi/en)
│   ├── admin/             # Trang quản trị
│   └── api/               # API routes (CRUD từng model)
├── middleware.ts          # i18n routing (loại trừ /api, /admin)
└── messages/              # vi.json, en.json
```

---

## Trang quản trị (`/admin`)

CRUD đầy đủ cho: Projects, Services, News, Partners, Timeline, Member Companies (Hệ sinh thái), Hero Slides, Site Settings, và Gallery (thư viện media). Ảnh upload trực tiếp lên Cloudinary qua component `CloudinaryUpload` / `CloudinaryGalleryUpload` (không cần backend trung gian).

---

## Deploy lên Railway

Railway tự build & deploy mỗi khi push lên nhánh GitHub được kết nối.

1. Đặt các biến môi trường trên Railway (`DATABASE_URL` trỏ Postgres của Railway + các biến Cloudinary).
2. Build command mặc định: `npm run build` (`prisma migrate deploy && next build`), start: `npm run start`.
3. Deploy bằng cách push code:

```bash
git add -A
git commit -m "..."
git push origin main
```

> Lưu ý: do lịch sử migration chưa baseline, nếu `prisma migrate deploy` trong bước build gặp vấn đề, chạy `npx prisma db push` trực tiếp với `DATABASE_URL` của Railway để đồng bộ schema (ví dụ khi thiếu cột `service.image`), rồi seed lại dữ liệu services.

---

## Tài liệu thêm

- `CLAUDE.md` — hướng dẫn kiến trúc & quy ước code chi tiết
- `DEPLOY.md` — chi tiết deploy
- `DESIGN_SYSTEM.md` — hệ màu, font, token thiết kế (Leafix style)
