import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/services
// Query params: published
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const published = searchParams.get('published')

    const where = {
      ...(published !== null ? { published: published === 'true' } : {}),
    }

    const data = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[GET /api/services]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/services
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { number, titleVi, titleEn, descVi, descEn, tag, iconSvg, order, published } = body

    if (!number || !titleVi || !titleEn || !descVi || !descEn || !tag) {
      return NextResponse.json(
        { error: 'number, titleVi, titleEn, descVi, descEn, and tag are required' },
        { status: 400 }
      )
    }

    const service = await prisma.service.create({
      data: {
        number,
        titleVi,
        titleEn,
        descVi,
        descEn,
        tag,
        iconSvg,
        order: order ?? 0,
        published: published ?? true,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('[POST /api/services]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
