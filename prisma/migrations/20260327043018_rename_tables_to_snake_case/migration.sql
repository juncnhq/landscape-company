/*
  Warnings:

  - You are about to drop the `HeroSlide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPosition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimelineItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectImage" DROP CONSTRAINT "ProjectImage_projectId_fkey";

-- DropTable
DROP TABLE "HeroSlide";

-- DropTable
DROP TABLE "JobPosition";

-- DropTable
DROP TABLE "NewsArticle";

-- DropTable
DROP TABLE "Partner";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectImage";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "TimelineItem";

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "category" "Category" NOT NULL,
    "location" TEXT,
    "area" TEXT,
    "duration" TEXT,
    "client" TEXT,
    "year" TEXT,
    "image" TEXT,
    "description" TEXT,
    "descriptionEn" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "project_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_slides" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "labelVi" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descVi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "iconSvg" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "sectorEn" TEXT NOT NULL,
    "descVi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "founded" INTEGER NOT NULL,
    "hq" TEXT NOT NULL,
    "statLabelVi" TEXT NOT NULL,
    "statLabelEn" TEXT NOT NULL,
    "statValue" TEXT NOT NULL,
    "projectsVi" TEXT[],
    "projectsEn" TEXT[],
    "highlightVi" TEXT,
    "highlightEn" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_items" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_positions" (
    "id" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "typeVi" TEXT NOT NULL,
    "typeEn" TEXT NOT NULL,
    "locationVi" TEXT NOT NULL,
    "locationEn" TEXT NOT NULL,
    "descVi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_articles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "summaryVi" TEXT,
    "summaryEn" TEXT,
    "contentVi" TEXT,
    "contentEn" TEXT,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "news_articles_slug_key" ON "news_articles"("slug");

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
