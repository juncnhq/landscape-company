import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { projects } from '../src/lib/data'

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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
