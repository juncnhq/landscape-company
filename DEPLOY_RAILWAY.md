# Deploy lên Railway — Runbook

Tài liệu thao tác cho **mỗi lần deploy**. Đọc mục [Deploy có đổi schema](#2-deploy-có-đổi-schemaprisma)
trước khi động vào `prisma/schema.prisma` — dự án này **không** dùng `prisma migrate deploy`.

> `DEPLOY.md` là hướng dẫn tự host trên VPS (Nginx + PM2) — không phải quy trình đang chạy.
> Production thật chạy trên Railway, theo đúng tài liệu này.

---

## Hạ tầng hiện tại

| Thành phần | Giá trị |
|---|---|
| Railway project | `easygoing-compassion` (`226f5fdc-b1ea-4c93-a955-24d4cb82ce69`) |
| Service | `landscape-company` |
| Environment | `production` |
| Domain | `landscape-company-production.up.railway.app` |
| Database | Railway PostgreSQL — `yamanote.proxy.rlwy.net:58204/railway` |
| Ảnh | Cloudinary (`dg9khx2s7`), upload thẳng từ trình duyệt |
| Git remote | `origin` → `github.com/juncnhq/landscape-company` (nhánh `main`) |

Railway **tự build & deploy mỗi khi push lên nhánh GitHub đã kết nối**. Không cần chạy
`railway up` thủ công.

### Cách Railway build

Builder là Nixpacks, cấu hình tại [`nixpacks.toml`](nixpacks.toml):

```toml
[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = ["npm run build"]
```

Ba điểm cần nhớ:

1. **`npm run build` chỉ là `next build`** — cố ý như vậy. Không thêm `prisma migrate deploy`
   vào đó (xem [Vì sao không dùng migrate](#vì-sao-không-dùng-prisma-migrate-deploy)).
2. **Prisma client sinh ra ở bước install**, qua `postinstall: prisma generate`.
   `src/generated/` nằm trong `.gitignore` nên không có sẵn trong repo — nếu `postinstall`
   hỏng thì build chết ngay ở bước compile.
3. **Start command** không được pin trong repo; Nixpacks tự nhận Next.js và chạy `npm run start`.
   Nếu có ai đó set tay trong Railway → Settings → Deploy, giá trị đó thắng.

---

## Biến môi trường

Set tại **Railway → service `landscape-company` → Variables**. Giá trị thật nằm trong
`railway-env.json` ở máy local (file này đã `.gitignore`, **không commit**).

| Biến | Bắt buộc | Ghi chú |
|---|---|---|
| `DATABASE_URL` | ✅ | Postgres của Railway. Dùng biến tham chiếu `${{Postgres.DATABASE_URL}}` để khỏi sửa tay khi DB đổi |
| `AUTH_SECRET` | ✅ | Ký JWT phiên admin. **App crash lúc khởi động nếu thiếu** (`src/lib/auth.ts` throw). Tạo mới: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | ✅ | Email đăng nhập `/admin/login` |
| `ADMIN_PASSWORD_HASH` | ⬅ nên dùng | Dạng `scrypt$<saltHex>$<keyHex>`. Sinh bằng `npx tsx scripts/hash-password.ts "MatKhauCuaBan"` |
| `ADMIN_PASSWORD` | fallback | Mật khẩu thô. Chỉ dùng khi chưa có hash — có `ADMIN_PASSWORD_HASH` thì biến này bị bỏ qua |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | `dg9khx2s7` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | ✅ | `fam_images` — **phải là preset Unsigned**, preset Signed sẽ trả "Unknown API key" |
| `CLOUDINARY_API_KEY` | ✅ | Từ Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | ✅ | Từ Cloudinary dashboard |

Hai biến `NEXT_PUBLIC_*` được nhúng vào bundle **lúc build**. Đổi chúng thì phải redeploy,
restart service không có tác dụng.

Các biến `RAILWAY_*` trong `.env` local là do Railway tự bơm khi chạy `railway run` —
không cần set thủ công.

---

## 1. Deploy chỉ đổi code (không đụng schema)

Trường hợp thường gặp nhất: sửa UI, thêm component, sửa API logic.

```bash
npm run build && npm test
```

```bash
git add -A && git commit -m "mô tả thay đổi" && git push origin main
```

Railway bắt sự kiện push, build rồi đổi sang bản mới. Theo dõi log:

```bash
railway logs --service landscape-company
```

Xong thì chạy [checklist sau deploy](#checklist-sau-mỗi-lần-deploy).

---

## 2. Deploy có đổi `schema.prisma`

**Thứ tự quan trọng: đẩy schema lên DB _trước_, push code _sau_.** Ngược lại thì bản build
mới sẽ đọc cột chưa tồn tại và toàn bộ API liên quan trả 500.

### Bước 1 — Kiểm tra thay đổi sẽ sinh SQL gì

`DATABASE_URL` trong `.env` **trỏ thẳng vào DB production**. Luôn xem diff trước:

```bash
npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script
```

Đọc kỹ SQL in ra:

- Chỉ có `CREATE TABLE` / `CREATE INDEX` / `ADD COLUMN` → an toàn, chạy tiếp.
- Có `DROP` / `ALTER COLUMN ... SET NOT NULL` / đổi kiểu dữ liệu → **dừng lại**. Backup DB
  và xử lý thủ công, `db push` sẽ làm mất dữ liệu.

### Bước 2 — Đẩy schema lên DB

```bash
npm run db:push
```

### Bước 3 — Sinh lại Prisma client ở local

```bash
npx prisma generate
```

Bỏ bước này thì `tsc` và dev server vẫn chạy client cũ, không thấy model mới.

### Bước 4 — Seed dữ liệu ban đầu (nếu là model mới)

Mỗi model mới nên có script seed riêng trong `prisma/`, tự bỏ qua khi bảng đã có dữ liệu:

```bash
npx tsx prisma/seed-job-positions.ts
```

### Bước 5 — Build, test rồi push

```bash
npm run build && npm test
```

```bash
git add -A && git commit -m "mô tả thay đổi" && git push origin main
```

### Vì sao không dùng `prisma migrate deploy`

`prisma/migrations/` đã bị gitignore và chỉ còn `migration_lock.toml` — các thư mục migration
đã mất. Trong khi đó bảng `_prisma_migrations` của DB vẫn ghi nhận 5 migration đã apply.
Hệ quả: ngay khi có bất kỳ thư mục migration nào xuất hiện, `prisma migrate deploy` sẽ fail
với lỗi history drift *"The migrations from the database are not found locally"* — và vì
lệnh đó nằm trong build command nên **mọi deploy sẽ chết**. Đó là lý do `build` được rút gọn
về `next build` thuần và schema đi qua `db push`.

**Tuyệt đối không chạy `prisma migrate dev`** — `DATABASE_URL` trỏ production, lệnh này có
thể đề nghị reset DB và xoá sạch dữ liệu thật.

Muốn khôi phục migration history về sau thì baseline: sinh `0_init` từ schema hiện tại,
`prisma migrate resolve --applied 0_init`, rồi xoá 5 dòng mồ côi trong `_prisma_migrations`.

---

## Ví dụ đã chạy thật — thêm model `JobPosition` (23/09/2026)

Thêm trang quản trị Tuyển dụng, đúng 5 bước ở trên:

| Bước | Lệnh / thao tác | Kết quả |
|---|---|---|
| 1 | Thêm `model JobPosition` vào `schema.prisma` (có `@@map("job_position")`) | — |
| 2 | `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script` | Chỉ `CREATE TABLE` + `CREATE INDEX` → an toàn |
| 3 | `npm run db:push` | `Your database is now in sync` (9.41s) |
| 4 | `npx prisma generate` | Client nhận `prisma.jobPosition` |
| 5 | `npx tsx prisma/seed-job-positions.ts` | Tạo 5 vị trí tuyển dụng |
| 6 | `npm run build && npm test` | Build pass, 127 test pass |

Dev server local đang chạy từ trước phải **restart** sau bước 4 — nó giữ Prisma client cũ
nên `/api/job-positions` trả 500 cho tới khi khởi động lại.

---

## Checklist sau mỗi lần deploy

- [ ] Railway báo deploy **Success** (không phải Crashed/Removed)
- [ ] `railway logs` không có `AUTH_SECRET env variable is required` hay lỗi Prisma
- [ ] Trang chủ mở được: https://landscape-company-production.up.railway.app/vi
- [ ] `/admin/login` đăng nhập được
- [ ] API của phần vừa sửa trả dữ liệu, ví dụ `/api/job-positions`, `/api/timeline`
- [ ] Trang public đọc DB hiển thị đúng (`/vi/careers`, `/vi/about`, `/vi/projects`)
- [ ] Upload thử 1 ảnh trong `/admin/gallery` (kiểm tra preset Cloudinary còn Unsigned)

Kiểm tra nhanh bằng dòng lệnh:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://landscape-company-production.up.railway.app/vi
```

---

## Rollback

Code rollback được, **schema thì không** — `db push` không có lệnh lùi. Nếu bước 2 đã chạy,
rollback code sẽ để lại bảng/cột thừa trong DB (vô hại với thay đổi thuần thêm mới).

**Cách nhanh** — Railway dashboard → service → tab Deployments → chọn bản chạy tốt gần nhất
→ **Redeploy**.

**Cách qua git:**

```bash
git revert <commit-hash> && git push origin main
```

---

## Sự cố thường gặp

| Triệu chứng | Nguyên nhân | Xử lý |
|---|---|---|
| Deploy crash ngay khi start, log `AUTH_SECRET env variable is required` | Thiếu biến `AUTH_SECRET` | Thêm biến trong Railway → Variables rồi redeploy |
| API mới trả `{"error":"Internal server error"}` | Prisma client chưa biết model mới (bảng chưa push, hoặc process giữ client cũ) | Chạy `npm run db:push` + `npx prisma generate`, restart service |
| Build fail ở bước compile, không tìm thấy `@/generated/prisma` | `postinstall` (`prisma generate`) không chạy được | Kiểm tra `DATABASE_URL` có mặt lúc build; `src/generated/` bị gitignore nên bắt buộc phải generate |
| Build fail: *"The migrations from the database are not found locally"* | Có ai đó thêm lại `prisma migrate deploy` vào build command | Gỡ ra, trả `build` về `next build` thuần |
| Upload ảnh báo *"Unknown API key"* | Upload preset Cloudinary đang ở chế độ Signed | Cloudinary → Settings → Upload → Upload presets → đổi `fam_images` sang **Unsigned** |
| Đổi `NEXT_PUBLIC_*` mà site không nhận | Biến `NEXT_PUBLIC_*` nhúng lúc build | Redeploy, không phải restart |
| Trang public hiện dữ liệu cũ | Trang thiếu `export const dynamic = 'force-dynamic'` | Thêm vào page đọc DB phía server |
| `npm install` fail vì peer deps | Thiếu cờ `--legacy-peer-deps` | Đã set sẵn trong `nixpacks.toml`, kiểm tra file còn nguyên |

Xem log & thao tác service:

```bash
railway logs --service landscape-company
```

```bash
railway status
```

---

## Liên quan

- [`CLAUDE.md`](CLAUDE.md) — kiến trúc, quy ước code, quy trình đổi schema
- [`DEPLOY.md`](DEPLOY.md) — phương án tự host VPS (Nginx + PM2), hiện **không** dùng
- [`railway-setup.sh`](railway-setup.sh) — script setup Railway lần đầu.
  ⚠️ Bước 6 còn gọi `prisma migrate deploy`, đổi thành `npx prisma db push` trước khi chạy lại
