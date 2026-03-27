# FAM Landscape — REST API Reference

Base URL: `/api`

---

## Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List projects (paginated) |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects/[id]` | Get project by id or slug |
| PUT | `/api/projects/[id]` | Update project |
| DELETE | `/api/projects/[id]` | Delete project |

### GET /api/projects

Query params:
- `category` — `GOLF | RESORT | URBAN | GARDEN | ARTWORK`
- `published` — `true | false`
- `search` — searches title, titleEn, location, client
- `page` — default `1`
- `limit` — default `20`, max `100`

Response:
```json
{
  "data": [...],
  "meta": { "total": 50, "page": 1, "limit": 20, "totalPages": 3 }
}
```

### POST /api/projects

Required: `slug`, `title`, `category`

```json
{
  "slug": "danang-golf-club",
  "title": "Danang Golf Club",
  "titleEn": "Danang Golf Club",
  "category": "GOLF",
  "location": "Đà Nẵng",
  "area": "50 ha",
  "duration": "18 tháng",
  "client": "VinaCapital",
  "year": "2022",
  "image": "https://...",
  "description": "...",
  "descriptionEn": "...",
  "published": true,
  "images": ["https://...", "https://..."]
}
```

---

## Hero Slides

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hero-slides` | List all hero slides |
| POST | `/api/hero-slides` | Create a hero slide |
| GET | `/api/hero-slides/[id]` | Get slide by id |
| PUT | `/api/hero-slides/[id]` | Update slide |
| DELETE | `/api/hero-slides/[id]` | Delete slide |

### GET /api/hero-slides

Query params:
- `published` — `true | false`

Response:
```json
{ "data": [...] }
```

### POST /api/hero-slides

Required: `url`, `labelVi`, `labelEn`

```json
{
  "url": "https://images.unsplash.com/...",
  "labelVi": "Cảnh quan nghỉ dưỡng",
  "labelEn": "Resort Landscape",
  "order": 0,
  "published": true
}
```

---

## Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services |
| POST | `/api/services` | Create a service |
| GET | `/api/services/[id]` | Get service by id |
| PUT | `/api/services/[id]` | Update service |
| DELETE | `/api/services/[id]` | Delete service |

### GET /api/services

Query params:
- `published` — `true | false`

Response:
```json
{ "data": [...] }
```

### POST /api/services

Required: `number`, `titleVi`, `titleEn`, `descVi`, `descEn`, `tag`

```json
{
  "number": "01",
  "titleVi": "Tư vấn & Quản lý cảnh quan",
  "titleEn": "Landscape Consulting & Management",
  "descVi": "Quy trình thiết kế, sáng tạo, tư vấn...",
  "descEn": "Full-cycle process: design, consulting...",
  "tag": "Consulting",
  "iconSvg": "<path stroke-linecap='round' ... />",
  "order": 0,
  "published": true
}
```

Note: `iconSvg` stores just the SVG `<path>` elements as a string (no outer `<svg>` wrapper).

---

## Partners

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/partners` | List all partners |
| POST | `/api/partners` | Create a partner |
| GET | `/api/partners/[id]` | Get partner by id |
| PUT | `/api/partners/[id]` | Update partner |
| DELETE | `/api/partners/[id]` | Delete partner |

### GET /api/partners

Query params:
- `published` — `true | false`

Response:
```json
{ "data": [...] }
```

### POST /api/partners

Required: `name`, `sector`, `sectorEn`, `descVi`, `descEn`, `founded`, `hq`, `statLabelVi`, `statLabelEn`, `statValue`

```json
{
  "name": "VinaCapital",
  "sector": "Đầu tư & Bất động sản",
  "sectorEn": "Investment & Real Estate",
  "descVi": "Tập đoàn đầu tư...",
  "descEn": "Leading investment group...",
  "founded": 2003,
  "hq": "TP. Hồ Chí Minh, Việt Nam",
  "statLabelVi": "Tổng tài sản quản lý",
  "statLabelEn": "Assets under management",
  "statValue": "~4 tỷ USD",
  "projectsVi": ["Danang Golf Club – cảnh quan sân golf 36 lỗ"],
  "projectsEn": ["Danang Golf Club – 36-hole golf landscape"],
  "highlightVi": "Chủ đầu tư lớn nhất tại Đà Nẵng...",
  "highlightEn": "Largest investor in Da Nang...",
  "order": 0,
  "published": true
}
```

---

## Timeline (About page)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/timeline` | List all timeline items |
| POST | `/api/timeline` | Create a timeline item |
| GET | `/api/timeline/[id]` | Get item by id |
| PUT | `/api/timeline/[id]` | Update item |
| DELETE | `/api/timeline/[id]` | Delete item |

### POST /api/timeline

Required: `year`, `title`, `titleEn`, `description`, `descriptionEn`

```json
{
  "year": "2007–2008",
  "title": "Khởi nghiệp",
  "titleEn": "Founding",
  "description": "Khởi đầu bằng nhập khẩu và phân phối hoa...",
  "descriptionEn": "Started with flower import/distribution...",
  "order": 0
}
```

---

## Job Positions (Careers page)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List job positions |
| POST | `/api/jobs` | Create a job position |
| GET | `/api/jobs/[id]` | Get position by id |
| PUT | `/api/jobs/[id]` | Update position |
| DELETE | `/api/jobs/[id]` | Delete position |

### GET /api/jobs

Query params:
- `published` — `true | false`

### POST /api/jobs

Required: `titleVi`, `titleEn`, `typeVi`, `typeEn`, `locationVi`, `locationEn`, `descVi`, `descEn`

```json
{
  "titleVi": "Kiến Trúc Sư Cảnh Quan",
  "titleEn": "Landscape Architect",
  "typeVi": "Toàn thời gian",
  "typeEn": "Full-time",
  "locationVi": "Đà Nẵng / Công trường",
  "locationEn": "Da Nang / On-site",
  "descVi": "Chịu trách nhiệm lập hồ sơ thiết kế...",
  "descEn": "Responsible for landscape design documentation...",
  "order": 0,
  "published": true
}
```

---

## News Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | List articles (paginated) |
| POST | `/api/news` | Create an article |
| GET | `/api/news/[id]` | Get article by id or slug |
| PUT | `/api/news/[id]` | Update article |
| DELETE | `/api/news/[id]` | Delete article |

### GET /api/news

Query params:
- `published` — `true | false`
- `search` — searches titleVi, titleEn, summaryVi, summaryEn
- `page` — default `1`
- `limit` — default `20`, max `100`

List response omits `contentVi`/`contentEn` (use GET by id for full content).

### POST /api/news

Required: `slug`, `titleVi`, `titleEn`

```json
{
  "slug": "fam-completes-laguna-golf-2024",
  "titleVi": "FAM hoàn thành dự án Laguna Golf 2024",
  "titleEn": "FAM completes Laguna Golf project 2024",
  "summaryVi": "Tóm tắt ngắn...",
  "summaryEn": "Short summary...",
  "contentVi": "Nội dung đầy đủ (Markdown hoặc HTML)...",
  "contentEn": "Full content (Markdown or HTML)...",
  "image": "https://...",
  "published": false,
  "publishedAt": "2024-06-15T00:00:00Z"
}
```

Note: If `published: true` and no `publishedAt` is provided, `publishedAt` is auto-set to now on create/first-publish.

---

## Common Patterns

- **Partial update**: PUT only sends fields to change; omitted fields are left unchanged.
- **order**: Controls display order (ascending). Default `0`.
- **published**: `false` hides from frontend queries when filtered.
- **204 No Content**: Returned on successful DELETE.
- **409 Conflict**: Returned when slug already exists (projects only).
