#!/bin/bash
# Fix failed migration trên Railway DB rồi apply hero_slide migration

RAILWAY_URL="postgresql://postgres:RGlMizgerywTIyxFUeyqpTVbGnoKsBvQ@yamanote.proxy.rlwy.net:58204/railway"

echo "▶ Bước 1: Đánh dấu migration lỗi là đã apply..."
DATABASE_URL="$RAILWAY_URL" npx prisma migrate resolve --applied "20260408_rename_project_table"

echo ""
echo "▶ Bước 2: Apply migration hero_slide lên Railway..."
DATABASE_URL="$RAILWAY_URL" npx prisma migrate deploy

echo ""
echo "▶ Bước 3: Seed hero slides vào local DB..."
npx tsx prisma/seed-hero-slides.ts

echo ""
echo "✅ Xong! Giờ có thể deploy lên Railway bình thường."
