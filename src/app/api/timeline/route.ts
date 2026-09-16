import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, badRequest, missingFields, toInt } from '@/lib/apiError'

export async function GET() {
  try {
    const items = await prisma.timelineItem.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (err) {
    return handleApiError(err, 'GET /api/timeline error:')
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body: { id: string; order: number }[] = await request.json()
    await Promise.all(
      body.map(({ id, order }) => prisma.timelineItem.update({ where: { id }, data: { order } }))
    )
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'PATCH /api/timeline error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const invalid = missingFields(body, ['year', 'titleVi', 'titleEn'])
    if (invalid) return badRequest(invalid)

    const item = await prisma.timelineItem.create({
      data: {
        order: toInt(body.order, 0),
        year: body.year,
        titleVi: body.titleVi,
        titleEn: body.titleEn,
        descVi: body.descVi ?? '',
        descEn: body.descEn ?? '',
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/timeline error:')
  }
}
