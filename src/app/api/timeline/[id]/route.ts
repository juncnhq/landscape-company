import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const item = await prisma.timelineItem.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  const body = await request.json()

  const item = await prisma.timelineItem.update({
    where: { id },
    data: {
      order: body.order,
      year: body.year,
      titleVi: body.titleVi,
      titleEn: body.titleEn,
      descVi: body.descVi,
      descEn: body.descEn,
    },
  })
  return NextResponse.json(item)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  await prisma.timelineItem.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
