import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, badRequest, missingFields, toInt } from '@/lib/apiError'

export async function GET() {
  try {
    const where: Record<string, unknown> = {}
    if (!(await verifySession())) where.published = true

    const companies = await prisma.memberCompany.findMany({
      where,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(companies)
  } catch (err) {
    return handleApiError(err, 'GET /api/member-companies error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const invalid = missingFields(body, ['abbr', 'name'])
    if (invalid) return badRequest(invalid)

    const company = await prisma.memberCompany.create({
      data: {
        order: toInt(body.order, 0),
        abbr: body.abbr,
        name: body.name,
        tagline: body.tagline ?? '',
        descVi: body.descVi ?? '',
        descEn: body.descEn ?? '',
        accent: body.accent ?? '#328442',
        images: body.images ?? [],
        published: body.published ?? true,
      },
    })
    return NextResponse.json(company, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/member-companies error:')
  }
}
