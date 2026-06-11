import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL!
const pool = new pg.Pool({ connectionString })

async function main() {
  // 1. Mark failed migration as applied
  await pool.query(`
    UPDATE _prisma_migrations
    SET finished_at = NOW(), rolled_back_at = NULL, logs = NULL
    WHERE migration_name = '20260408_rename_project_table'
  `)
  console.log('✅ Fixed failed migration')

  // 2. Create hero_slide table if not exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "hero_slide" (
      "id" TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      "image" TEXT NOT NULL,
      "labelVi" TEXT NOT NULL,
      "labelEn" TEXT NOT NULL,
      "published" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "hero_slide_pkey" PRIMARY KEY ("id")
    )
  `)
  await pool.query(`CREATE INDEX IF NOT EXISTS "hero_slide_published_idx" ON "hero_slide"("published")`)
  console.log('✅ Created hero_slide table')

  // 3. Mark new migration as applied in _prisma_migrations
  const { rows: existing } = await pool.query(
    `SELECT id FROM _prisma_migrations WHERE migration_name = '20260611000001_add_hero_slides'`
  )
  if (existing.length === 0) {
    await pool.query(`
      INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
      VALUES (gen_random_uuid()::text, 'manual', NOW(), '20260611000001_add_hero_slides', NULL, NULL, NOW(), 1)
    `)
  }
  console.log('✅ Registered migration in _prisma_migrations')

  // 4. Ensure service table exists (in case original migration is missing)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "service" (
      "id"         TEXT NOT NULL,
      "slug"       TEXT NOT NULL,
      "order"      INTEGER NOT NULL DEFAULT 0,
      "icon"       TEXT NOT NULL DEFAULT '',
      "titleVi"    TEXT NOT NULL,
      "titleEn"    TEXT NOT NULL,
      "subtitleVi" TEXT NOT NULL DEFAULT '',
      "subtitleEn" TEXT NOT NULL DEFAULT '',
      "descVi"     TEXT NOT NULL DEFAULT '',
      "descEn"     TEXT NOT NULL DEFAULT '',
      "tag"        TEXT NOT NULL DEFAULT '',
      "bulletsVi"  TEXT[] NOT NULL DEFAULT '{}',
      "bulletsEn"  TEXT[] NOT NULL DEFAULT '{}',
      "images"     TEXT[] NOT NULL DEFAULT '{}',
      "published"  BOOLEAN NOT NULL DEFAULT true,
      "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "service_pkey" PRIMARY KEY ("id")
    )
  `)
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS "service_slug_key" ON "service"("slug")`)
  await pool.query(`CREATE INDEX IF NOT EXISTS "service_published_idx" ON "service"("published")`)
  console.log('✅ Ensured service table exists')

  // 5. Create site_setting table if not exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "site_setting" (
      "key"       TEXT NOT NULL,
      "value"     TEXT NOT NULL,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "site_setting_pkey" PRIMARY KEY ("key")
    )
  `)
  console.log('✅ Created site_setting table')

  // Register site_setting migration
  const { rows: existingSS } = await pool.query(
    `SELECT id FROM _prisma_migrations WHERE migration_name = '20260611000002_add_site_settings'`
  )
  if (existingSS.length === 0) {
    await pool.query(`
      INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
      VALUES (gen_random_uuid()::text, 'manual', NOW(), '20260611000002_add_site_settings', NULL, NULL, NOW(), 1)
    `)
  }
  console.log('✅ Registered site_settings migration')

  // 5. Seed initial slides if empty
  const { rows } = await pool.query('SELECT COUNT(*) FROM "hero_slide"')
  if (parseInt(rows[0].count) === 0) {
    const slides = [
      { image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png', labelVi: 'Thiết kế cảnh quan', labelEn: 'Landscape Design', order: 0 },
      { image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg', labelVi: 'Thi công chuyên nghiệp', labelEn: 'Professional Build', order: 1 },
      { image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png', labelVi: 'Không gian xanh', labelEn: 'Green Spaces', order: 2 },
    ]
    for (const s of slides) {
      await pool.query(
        `INSERT INTO "hero_slide" (id, "order", image, "labelVi", "labelEn", published, "createdAt", "updatedAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, true, NOW(), NOW())`,
        [s.order, s.image, s.labelVi, s.labelEn]
      )
    }
    console.log('✅ Seeded 3 hero slides')
  } else {
    console.log('ℹ️  Slides already exist, skipping seed')
  }
}

main()
  .catch(e => { console.error('❌', e.message); process.exit(1) })
  .finally(() => pool.end())
