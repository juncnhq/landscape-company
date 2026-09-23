# FAM Landscape — Project Summary & Self-Host Guide

> ⚠️ **Production hiện chạy trên Railway, không phải VPS.** Quy trình deploy đang dùng nằm ở
> **[`DEPLOY_RAILWAY.md`](DEPLOY_RAILWAY.md)**. Tài liệu này giữ lại cho phương án tự host
> (Nginx + PM2) nếu sau này chuyển khỏi Railway.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript + React 19 |
| Styling | Tailwind CSS v4 |
| i18n | next-intl v4 (vi / en) |
| ORM | Prisma 7.7 + driver adapter |
| Database | PostgreSQL |
| Media CDN | Cloudinary (direct browser upload) |
| Animation | Framer Motion |
| Rich text | Tiptap editor |

---

## Deploy Architecture

```
Browser
  │
  ├── Static/SSR ──► Next.js Server (Node.js)
  │                       │
  │                       ├── API Routes (/api/*)
  │                       │       └── Prisma 7 ──► PostgreSQL DB
  │                       │
  │                       └── Pages (SSR + static)
  │
  └── Images ──────► Cloudinary CDN (res.cloudinary.com)
                      (uploaded directly from browser, stored externally)
```

- **Next.js** handles both public site + admin panel in one process (`next start`)
- **PostgreSQL** stores all content (projects, news, services, partners, timeline, media URLs)
- **Cloudinary** stores all images — Next.js never proxies media, only stores URLs in DB
- No separate CDN needed for the app itself (Cloudinary handles image CDN)

---

## Public Pages (`/[locale]/...`)

| Route | Page |
|---|---|
| `/vi` or `/en` | Homepage |
| `/vi/about` | About — timeline + member companies |
| `/vi/services` | Services list |
| `/vi/projects` | Projects list |
| `/vi/projects/[slug]` | Project detail |
| `/vi/projects/flipbook` | PDF flipbook viewer |
| `/vi/news` | News list |
| `/vi/news/[slug]` | News article detail |
| `/vi/partners` | Partners list |
| `/vi/careers` | Careers page |
| `/vi/catalog` | Catalog page |

> All routes duplicated under `/en/...` for English.

---

## Admin Pages (`/admin/...`)

| Route | Manages |
|---|---|
| `/admin/login` | Auth login |
| `/admin/projects` | Projects CRUD |
| `/admin/services` | Services CRUD |
| `/admin/news` | News articles CRUD |
| `/admin/partners` | Partners CRUD |
| `/admin/about` | Về chúng tôi — timeline của trang `/vi/about` |
| `/admin/careers` | Tuyển dụng — vị trí của trang `/vi/careers` |
| `/admin/member-companies` | Member companies CRUD |
| `/admin/hero-slides` | Hero slides trang chủ |
| `/admin/site-settings` | Ảnh hero từng trang |
| `/admin/contacts` | Yêu cầu tư vấn (lead) |
| `/admin/gallery` | Media library (upload + browse all images) |

> `/admin/timeline` chỉ còn redirect sang `/admin/about`.

---

## Database Models

| Model | Table | Key fields |
|---|---|---|
| `Project` | `project` | slug, title/titleEn, category, image, images[] |
| `NewsArticle` | `news_article` | slug, titleVi/En, contentVi/En, image |
| `Service` | `service` | slug, titleVi/En, descVi/En, images[] |
| `Partner` | `partner` | name, images[], sector, highlight |
| `TimelineItem` | `timeline_item` | year, titleVi/En, descVi/En |
| `MemberCompany` | `member_company` | abbr, name, images[] |
| `HeroSlide` | `hero_slide` | image, labelVi/En, order |
| `JobPosition` | `job_position` | titleVi/En, typeVi/En, locationVi/En, descVi/En, order, published |
| `SiteSetting` | `site_setting` | key, value |
| `ContactRequest` | `contact_request` | firstName, lastName, email, phone, status, note |
| `Media` | `media` | url, filename, folder |

---

## Server Deploy Requirements

### Runtime

- **Node.js** >= 18 (required by Next.js 16)
- **PostgreSQL** (any version, port configurable)
- **Cloudinary** account with an Unsigned upload preset

### Environment Variables (`.env`)

```env
DATABASE_URL=postgresql://landscape:landscape123@localhost:5433/landscape_admin

# Admin auth — thiếu AUTH_SECRET là app crash ngay khi khởi động
AUTH_SECRET=...                                   # openssl rand -base64 32
ADMIN_EMAIL=...
ADMIN_PASSWORD_HASH=...                           # npx tsx scripts/hash-password.ts "MatKhau"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dg9khx2s7
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=fam_images   # must be Unsigned preset
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

> Cloudinary upload preset must be set to **Unsigned** in the Cloudinary dashboard
> (Settings → Upload → Upload presets). Signed presets will return "Unknown API key".

### Build & Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Đồng bộ schema lên DB
#    KHÔNG dùng `prisma migrate deploy` — lịch sử migration của repo chưa baseline
#    nên lệnh đó fail vì history drift. Xem DEPLOY_RAILWAY.md.
npx prisma db push

# 4. (Optional) Seed initial data
npx tsx prisma/seed.ts

# 5. Build Next.js
npm run build

# 6. Start server (default port 3000)
npm run start
```

### Minimum Server Spec

| Resource | Minimum |
|---|---|
| CPU | 1 vCPU |
| RAM | 1 GB |
| Disk | 5 GB (no media stored locally — all on Cloudinary) |
| Network | Outbound HTTPS (for Cloudinary uploads) |

### Recommended Production Setup

```
PM2 or systemd  ──► next start (port 3000)
Nginx           ──► reverse proxy → localhost:3000 + SSL termination (Let's Encrypt)
PostgreSQL      ──► same server OR managed DB (Neon, Supabase, RDS, etc.)
Cloudinary      ──► all image storage + CDN (zero local disk for media)
```

**Example Nginx config:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Example PM2 config (`ecosystem.config.js`):**

```js
module.exports = {
  apps: [{
    name: 'fam-landscape',
    script: 'node_modules/.bin/next',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
}
```

Start with: `pm2 start ecosystem.config.js && pm2 save`

---

## Quick Checklist Before Deploy

- [ ] PostgreSQL running and `landscape_admin` database created
- [ ] `.env` file populated with all required variables
- [ ] Cloudinary upload preset set to **Unsigned**
- [ ] `npx prisma db push` run successfully (NOT `migrate deploy`)
- [ ] `npm run build` completes without errors
- [ ] Nginx/reverse proxy configured with SSL
- [ ] PM2 or systemd service configured for auto-restart
