import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, toInt } from '@/lib/apiError'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(partner)
  } catch (err) {
    return handleApiError(err, 'GET /api/partners/[id] error:')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    const body = await request.json()
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        order: toInt(body.order, 0),
        name: body.name,
        sectorVi: body.sectorVi,
        sectorEn: body.sectorEn,
        descVi: body.descVi,
        descEn: body.descEn,
        founded: toInt(body.founded, 2000),
        hq: body.hq,
        statLabelVi: body.statLabelVi,
        statLabelEn: body.statLabelEn,
        statValue: body.statValue,
        projectsVi: body.projectsVi,
        projectsEn: body.projectsEn,
        highlightVi: body.highlightVi,
        highlightEn: body.highlightEn,
        logo: body.logo ?? '',
        images: body.images ?? [],
        published: body.published,
      },
    })
    return NextResponse.json(partner)
  } catch (err) {
    return handleApiError(err, 'PUT /api/partners/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.partner.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/partners/[id] error:')
  }
}
