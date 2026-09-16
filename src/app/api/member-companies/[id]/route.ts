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
    const company = await prisma.memberCompany.findUnique({ where: { id } })
    if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(company)
  } catch (err) {
    return handleApiError(err, 'GET /api/member-companies/[id] error:')
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
    const company = await prisma.memberCompany.update({
      where: { id },
      data: {
        order: toInt(body.order, 0),
        abbr: body.abbr,
        name: body.name,
        tagline: body.tagline,
        descVi: body.descVi,
        descEn: body.descEn,
        accent: body.accent,
        images: body.images ?? [],
        published: body.published,
      },
    })
    return NextResponse.json(company)
  } catch (err) {
    return handleApiError(err, 'PUT /api/member-companies/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.memberCompany.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/member-companies/[id] error:')
  }
}
