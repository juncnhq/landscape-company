import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, badRequest, missingFields, toInt } from '@/lib/apiError'

export async function GET() {
  try {
    const where: Record<string, unknown> = {}
    if (!(await verifySession())) where.published = true

    const services = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch (err) {
    return handleApiError(err, 'GET /api/services error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const invalid = missingFields(body, ['slug', 'titleVi', 'titleEn'])
    if (invalid) return badRequest(invalid)

    const service = await prisma.service.create({
      data: {
        slug: body.slug,
        order: toInt(body.order, 0),
        icon: body.icon ?? '',
        titleVi: body.titleVi,
        titleEn: body.titleEn,
        subtitleVi: body.subtitleVi ?? '',
        subtitleEn: body.subtitleEn ?? '',
        descVi: body.descVi,
        descEn: body.descEn,
        tag: body.tag ?? '',
        bulletsVi: body.bulletsVi ?? [],
        bulletsEn: body.bulletsEn ?? [],
        image: body.image ?? '',
        images: body.images ?? [],
        published: body.published ?? true,
      },
    })
    return NextResponse.json(service, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/services error:')
  }
}
