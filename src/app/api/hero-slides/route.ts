import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(slides)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const slide = await prisma.heroSlide.create({
    data: {
      order: body.order ?? 0,
      image: body.image,
      labelVi: body.labelVi,
      labelEn: body.labelEn,
      published: body.published ?? true,
    },
  })
  return NextResponse.json(slide, { status: 201 })
}
