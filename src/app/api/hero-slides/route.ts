import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/hero-slides
// Query params: published
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const published = searchParams.get('published')

    const where = {
      ...(published !== null ? { published: published === 'true' } : {}),
    }

    const data = await prisma.heroSlide.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[GET /api/hero-slides]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/hero-slides
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, labelVi, labelEn, order, published } = body

    if (!url || !labelVi || !labelEn) {
      return NextResponse.json(
        { error: 'url, labelVi, and labelEn are required' },
        { status: 400 }
      )
    }

    const slide = await prisma.heroSlide.create({
      data: {
        url,
        labelVi,
        labelEn,
        order: order ?? 0,
        published: published ?? true,
      },
    })

    return NextResponse.json(slide, { status: 201 })
  } catch (error) {
    console.error('[POST /api/hero-slides]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
