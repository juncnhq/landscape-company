import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/jobs
// Query params: published
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const published = searchParams.get('published')

    const where = {
      ...(published !== null ? { published: published === 'true' } : {}),
    }

    const data = await prisma.jobPosition.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[GET /api/jobs]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/jobs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { titleVi, titleEn, typeVi, typeEn, locationVi, locationEn, descVi, descEn, order, published } = body

    if (!titleVi || !titleEn || !typeVi || !typeEn || !locationVi || !locationEn || !descVi || !descEn) {
      return NextResponse.json(
        { error: 'titleVi, titleEn, typeVi, typeEn, locationVi, locationEn, descVi, descEn are required' },
        { status: 400 }
      )
    }

    const job = await prisma.jobPosition.create({
      data: {
        titleVi, titleEn, typeVi, typeEn,
        locationVi, locationEn, descVi, descEn,
        order: order ?? 0,
        published: published ?? true,
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('[POST /api/jobs]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
