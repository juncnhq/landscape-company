import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

const slides = [
  {
    order: 0,
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
    labelVi: 'Thiết kế cảnh quan',
    labelEn: 'Landscape Design',
  },
  {
    order: 1,
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
    labelVi: 'Thi công chuyên nghiệp',
    labelEn: 'Professional Build',
  },
  {
    order: 2,
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
    labelVi: 'Không gian xanh',
    labelEn: 'Green Spaces',
  },
]

async function main() {
  // Clear existing slides first to avoid duplicates
  const existing = await prisma.heroSlide.count()
  if (existing > 0) {
    console.log(`${existing} slides already exist, skipping seed.`)
    return
  }

  for (const slide of slides) {
    await prisma.heroSlide.create({ data: slide })
    console.log(`Created slide: ${slide.labelEn}`)
  }
  console.log('Hero slides seeded!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
