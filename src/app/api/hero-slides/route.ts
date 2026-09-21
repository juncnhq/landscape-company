import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseHeroSlide } from '@/lib/entityInput'

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(slides)
  } catch (err) {
    return handleApiError(err, 'GET /api/hero-slides error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await readJson(request)
    const item = await prisma.heroSlide.create({ data: parseHeroSlide(body) })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/hero-slides error:')
  }
}
