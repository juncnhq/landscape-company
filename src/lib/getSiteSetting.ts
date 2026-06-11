import { prisma } from './prisma'

export async function getSiteSetting(key: string): Promise<string | null> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key } })
    return setting?.value ?? null
  } catch {
    return null
  }
}
