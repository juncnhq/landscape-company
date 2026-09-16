import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, badRequest, missingFields, toInt } from '@/lib/apiError'

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
    const body = await request.json()
    const invalid = missingFields(body, ['image'])
    if (invalid) return badRequest(invalid)

    const slide = await prisma.heroSlide.create({
      data: {
        order: toInt(body.order, 0),
        image: body.image,
        labelVi: body.labelVi,
        labelEn: body.labelEn,
        published: body.published ?? true,
      },
    })
    return NextResponse.json(slide, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/hero-slides error:')
  }
}
