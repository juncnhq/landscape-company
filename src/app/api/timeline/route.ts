import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/timeline
export async function GET() {
  try {
    const data = await prisma.timelineItem.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ data })
  } catch (error) {
    console.error('[GET /api/timeline]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/timeline
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { year, title, titleEn, description, descriptionEn, order } = body

    if (!year || !title || !titleEn || !description || !descriptionEn) {
      return NextResponse.json(
        { error: 'year, title, titleEn, description, and descriptionEn are required' },
        { status: 400 }
      )
    }

    const item = await prisma.timelineItem.create({
      data: { year, title, titleEn, description, descriptionEn, order: order ?? 0 },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('[POST /api/timeline]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
