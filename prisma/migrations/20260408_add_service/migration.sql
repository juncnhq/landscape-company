CREATE TABLE "service" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "icon" TEXT NOT NULL,
  "titleVi" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "subtitleVi" TEXT NOT NULL,
  "subtitleEn" TEXT NOT NULL,
  "descVi" TEXT NOT NULL,
  "descEn" TEXT NOT NULL,
  "tag" TEXT NOT NULL,
  "bulletsVi" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "bulletsEn" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "service_slug_key" ON "service"("slug");
CREATE INDEX "service_published_idx" ON "service"("published");
