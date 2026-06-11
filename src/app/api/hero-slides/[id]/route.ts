import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const slide = await prisma.heroSlide.findUnique({ where: { id } })
  if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(slide)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const slide = await prisma.heroSlide.update({
    where: { id },
    data: {
      order: body.order,
      image: body.image,
      labelVi: body.labelVi,
      labelEn: body.labelEn,
      published: body.published,
    },
  })
  return NextResponse.json(slide)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.heroSlide.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
