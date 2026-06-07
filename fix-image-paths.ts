import 'dotenv/config'
import { PrismaClient } from './src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  // Find all projects with bad image paths (uppercase or spaces)
  const projects = await prisma.project.findMany({
    select: { id: true, slug: true, image: true, images: true },
  })

  let fixed = 0
  for (const p of projects) {
    const fixes: { image?: string; images?: string[] } = {}

    // Fix main image
    if (p.image && (p.image.includes('HINH') || p.image.match(/\/[A-Z].*\s.*\.(jpg|png|webp)/i))) {
      const cleaned = p.image
        .replace(/HINH (\d+)/gi, (_, n) => `hinh-${n}`)
        .replace(/\s+/g, '-')
      fixes.image = cleaned
      console.log(`[${p.slug}] image: ${p.image} → ${cleaned}`)
    }

    // Fix images array
    if (p.images?.some(img => img.includes('HINH') || img.match(/\/[A-Z].*\s.*\.(jpg|png|webp)/i))) {
      fixes.images = p.images.map(img =>
        img
          .replace(/HINH (\d+)/gi, (_, n) => `hinh-${n}`)
          .replace(/\s+(?=[^/]*\.(jpg|png|webp))/gi, '-')
      )
      console.log(`[${p.slug}] images fixed`)
    }

    if (Object.keys(fixes).length > 0) {
      await prisma.project.update({ where: { id: p.id }, data: fixes })
      fixed++
    }
  }

  console.log(`\nDone. Fixed ${fixed} project(s).`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
