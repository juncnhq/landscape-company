import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { projects, newsArticles, partners, timelineItems, memberCompanies } from '../src/lib/data'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding projects...')
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        title: project.title,
        titleEn: project.titleEn,
        category: project.category,
        location: project.location,
        area: project.area,
        duration: project.duration,
        client: project.client,
        year: project.year,
        image: project.image,
        images: project.images,
        description: project.description,
        descriptionEn: project.descriptionEn,
        published: true,
      },
    })
  }
  console.log(`Seeded ${projects.length} projects.`)

  console.log('Seeding news articles...')
  for (const article of newsArticles) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        titleVi: article.titleVi,
        titleEn: article.titleEn,
        summaryVi: article.summaryVi,
        summaryEn: article.summaryEn,
        contentVi: article.contentVi,
        contentEn: article.contentEn,
        image: article.image,
        categoryVi: article.categoryVi,
        categoryEn: article.categoryEn,
        date: article.date,
        readTime: article.readTime,
        published: true,
      },
    })
  }
  console.log(`Seeded ${newsArticles.length} news articles.`)

  console.log('Seeding partners...')
  for (const [i, partner] of partners.entries()) {
    const existing = await prisma.partner.findFirst({ where: { name: partner.name } })
    if (!existing) {
      await prisma.partner.create({
        data: {
          order: i,
          name: partner.name,
          sectorVi: partner.sector,
          sectorEn: partner.sectorEn,
          descVi: partner.descVi,
          descEn: partner.descEn,
          founded: partner.founded,
          hq: partner.hq,
          statLabelVi: partner.statLabelVi,
          statLabelEn: partner.statLabelEn,
          statValue: partner.statValue,
          projectsVi: partner.projectsVi,
          projectsEn: partner.projectsEn,
          highlightVi: partner.highlightVi,
          highlightEn: partner.highlightEn,
          published: true,
        },
      })
    }
  }
  console.log(`Seeded ${partners.length} partners.`)

  console.log('Seeding timeline...')
  for (const [i, item] of timelineItems.entries()) {
    const existing = await prisma.timelineItem.findFirst({ where: { year: item.year } })
    if (!existing) {
      await prisma.timelineItem.create({
        data: {
          order: i,
          year: item.year,
          titleVi: item.title,
          titleEn: item.titleEn,
          descVi: item.description,
          descEn: item.descriptionEn,
        },
      })
    }
  }
  console.log(`Seeded ${timelineItems.length} timeline items.`)

  console.log('Seeding member companies...')
  for (const [i, company] of memberCompanies.entries()) {
    const existing = await prisma.memberCompany.findFirst({ where: { abbr: company.abbr } })
    if (!existing) {
      await prisma.memberCompany.create({
        data: {
          order: i,
          abbr: company.abbr,
          name: company.name,
          tagline: company.tagline,
          descVi: company.description,
          descEn: company.descriptionEn,
          accent: company.accent,
          published: true,
        },
      })
    }
  }
  console.log(`Seeded ${memberCompanies.length} member companies.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
