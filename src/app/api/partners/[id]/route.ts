import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const partner = await prisma.partner.findUnique({ where: { id } })
  if (!partner) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(partner)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  const body = await request.json()

  const partner = await prisma.partner.update({
    where: { id },
    data: {
      order: body.order,
      name: body.name,
      sectorVi: body.sectorVi,
      sectorEn: body.sectorEn,
      descVi: body.descVi,
      descEn: body.descEn,
      founded: body.founded,
      hq: body.hq,
      statLabelVi: body.statLabelVi,
      statLabelEn: body.statLabelEn,
      statValue: body.statValue,
      projectsVi: body.projectsVi,
      projectsEn: body.projectsEn,
      highlightVi: body.highlightVi,
      highlightEn: body.highlightEn,
      published: body.published,
    },
  })
  return NextResponse.json(partner)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  await prisma.partner.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
