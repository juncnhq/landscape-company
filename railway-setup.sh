#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  Lapla – Railway PostgreSQL Setup Script
#  Chạy từng bước theo thứ tự bên dưới
# ═══════════════════════════════════════════════════════════════

set -e  # dừng nếu có lỗi

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   Lapla Railway PostgreSQL Setup         ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── BƯỚC 1: Cài Railway CLI ──────────────────────────────────
echo "▶ BƯỚC 1: Cài Railway CLI..."
if ! command -v railway &> /dev/null; then
  npm install -g @railway/cli
  echo "✅ Đã cài Railway CLI"
else
  echo "✅ Railway CLI đã có sẵn"
fi

# ── BƯỚC 2: Login Railway ────────────────────────────────────
echo ""
echo "▶ BƯỚC 2: Login Railway (sẽ mở browser)..."
railway login

# ── BƯỚC 3: Tạo project Railway ─────────────────────────────
echo ""
echo "▶ BƯỚC 3: Khởi tạo Railway project..."
railway init

# ── BƯỚC 4: Thêm PostgreSQL database ────────────────────────
echo ""
echo "▶ BƯỚC 4: Thêm PostgreSQL vào Railway project..."
echo "   ⚠️  Vào Railway dashboard → Add service → Database → PostgreSQL"
echo "   Sau đó copy DATABASE_URL từ Variables tab của PostgreSQL service"
echo ""
read -p "   Dán DATABASE_URL của Railway PostgreSQL vào đây: " RAILWAY_DB_URL

if [ -z "$RAILWAY_DB_URL" ]; then
  echo "❌ DATABASE_URL không được để trống. Thoát."
  exit 1
fi

# ── BƯỚC 5: Cập nhật .env với Railway DB ────────────────────
echo ""
echo "▶ BƯỚC 5: Cập nhật .env với Railway PostgreSQL..."
# Backup .env cũ
cp .env .env.supabase.backup
echo "   💾 Đã backup .env cũ → .env.supabase.backup"

# Thay DATABASE_URL trong .env
sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=\"$RAILWAY_DB_URL\"|" .env
rm -f .env.bak
echo "   ✅ .env đã cập nhật"

# ── BƯỚC 6: Chạy Prisma migrate ─────────────────────────────
echo ""
echo "▶ BƯỚC 6: Apply schema lên Railway PostgreSQL..."
# KHÔNG dùng `prisma migrate deploy`: prisma/migrations/ đã bị gitignore và mất thư mục,
# trong khi DB vẫn ghi 5 migration đã apply → lệnh đó fail vì history drift.
npx prisma db push
echo "   ✅ Schema đã được tạo"

# ── BƯỚC 7: Seed data ────────────────────────────────────────
echo ""
echo "▶ BƯỚC 7: Seed dữ liệu Lapla lên Railway PostgreSQL..."
npx tsx prisma/seed.ts
echo "   ✅ Seed hoàn thành"

# ── BƯỚC 8: Deploy app lên Railway ──────────────────────────
echo ""
echo "▶ BƯỚC 8: Deploy Next.js app lên Railway..."
railway up
echo "   ✅ Deploy thành công!"

# ── BƯỚC 9: Set environment variables ───────────────────────
echo ""
echo "▶ BƯỚC 9: Cần set các biến môi trường sau trong Railway dashboard:"
echo "   → Vào Railway → project của bạn → Variables → Add"
echo ""
echo "   Các biến cần thêm:"
echo "   ┌──────────────────────────────────────────────────────────┐"
echo "   │ DATABASE_URL         = \${{Postgres.DATABASE_URL}}         │"
echo "   │ AUTH_SECRET          = (random ≥ 32 ký tự — BẮT BUỘC)    │"
echo "   │ ADMIN_EMAIL          = (email đăng nhập /admin)          │"
echo "   │ ADMIN_PASSWORD_HASH  = (scrypt hash, xem lệnh bên dưới)  │"
echo "   │ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME    = dg9khx2s7         │"
echo "   │ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = fam_images        │"
echo "   │ CLOUDINARY_API_KEY   = (lấy từ Cloudinary dashboard)     │"
echo "   │ CLOUDINARY_API_SECRET = (lấy từ Cloudinary)              │"
echo "   └──────────────────────────────────────────────────────────┘"
echo ""
echo "   ⚠️  Tên biến là AUTH_SECRET (KHÔNG phải NEXTAUTH_SECRET)."
echo "      Thiếu nó thì app crash ngay khi khởi động."
echo ""
echo "   💡 Tạo AUTH_SECRET:"
echo "      openssl rand -base64 32"
echo ""
echo "   💡 Tạo ADMIN_PASSWORD_HASH:"
echo "      npx tsx scripts/hash-password.ts \"MatKhauCuaBan\""
echo ""
echo "   📘 Quy trình deploy hằng ngày: xem DEPLOY_RAILWAY.md"
echo ""

# ── XONG ─────────────────────────────────────────────────────
echo "╔══════════════════════════════════════════╗"
echo "║   ✅ Setup hoàn tất!                     ║"
echo "║   Chạy: railway open  để xem domain      ║"
echo "╚══════════════════════════════════════════╝"
echo ""
