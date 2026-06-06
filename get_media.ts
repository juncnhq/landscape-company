import 'dotenv/config'
import { PrismaClient } from './src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  const rows = await prisma.media.findMany({ select: { filename: true, url: true }, orderBy: { filename: 'asc' } })
  const groups: Record<string, string[]> = { GOLF:[], RESORT:[], URBAN:[], GARDEN:[], ARTWORK:[] }
  for (const { filename: fn, url } of rows) {
    if (/^(BNH|B[AÀ]|DHAWA|DHW)/.test(fn)) groups.GOLF.push(url)
    else if (/^(NAM HAI|NH |ANATA|ANT|AVN|AVANI|OCE|OCEAN)/.test(fn)) groups.RESORT.push(url)
    else if (/^(SGP|VH |VĨNH|TP |TP1|THE POINT|WTF|WATERFRONT)/.test(fn)) groups.URBAN.push(url)
    else if (/^(MLG|MALAGA|IXR|IXORA)/.test(fn)) groups.GARDEN.push(url)
    else if (/^(ACE|ACIENT)/.test(fn)) groups.ARTWORK.push(url)
  }
  process.stdout.write(JSON.stringify(groups) + '\n')
  await prisma.$disconnect()
}

main().catch(e => { console.error(e.message); process.exit(1) })
