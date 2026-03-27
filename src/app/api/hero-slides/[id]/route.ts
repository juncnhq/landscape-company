import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

// GET /api/hero-slides/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const slide = await prisma.heroSlide.findUnique({ where: { id } })

    if (!slide) {
      return NextResponse.json({ error: 'Hero slide not found' }, { status: 404 })
    }

    return NextResponse.json(slide)
  } catch (error) {
    console.error('[GET /api/hero-slides/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/hero-slides/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()
    const { url, labelVi, labelEn, order, published } = body

    const existing = await prisma.heroSlide.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Hero slide not found' }, { status: 404 })
    }

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        ...(url !== undefined && { url }),
        ...(labelVi !== undefined && { labelVi }),
        ...(labelEn !== undefined && { labelEn }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    })

    return NextResponse.json(slide)
  } catch (error) {
    console.error('[PUT /api/hero-slides/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/hero-slides/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = await prisma.heroSlide.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json({ error: 'Hero slide not found' }, { status: 404 })
    }

    await prisma.heroSlide.delete({ where: { id } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE /api/hero-slides/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
