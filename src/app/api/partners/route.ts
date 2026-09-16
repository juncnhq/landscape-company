import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, badRequest, missingFields, toInt } from '@/lib/apiError'

export async function GET() {
  try {
    const where: Record<string, unknown> = {}
    if (!(await verifySession())) where.published = true

    const partners = await prisma.partner.findMany({
      where,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(partners)
  } catch (err) {
    return handleApiError(err, 'GET /api/partners error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const invalid = missingFields(body, ['name'])
    if (invalid) return badRequest(invalid)

    const partner = await prisma.partner.create({
      data: {
        order: toInt(body.order, 0),
        name: body.name,
        sectorVi: body.sectorVi ?? '',
        sectorEn: body.sectorEn ?? '',
        descVi: body.descVi ?? '',
        descEn: body.descEn ?? '',
        founded: toInt(body.founded, 2000),
        hq: body.hq ?? '',
        statLabelVi: body.statLabelVi ?? '',
        statLabelEn: body.statLabelEn ?? '',
        statValue: body.statValue ?? '',
        projectsVi: body.projectsVi ?? [],
        projectsEn: body.projectsEn ?? [],
        highlightVi: body.highlightVi ?? '',
        highlightEn: body.highlightEn ?? '',
        logo: body.logo ?? '',
        images: body.images ?? [],
        published: body.published ?? true,
      },
    })
    return NextResponse.json(partner, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/partners error:')
  }
}
