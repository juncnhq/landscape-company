import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

// GET /api/timeline/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const item = await prisma.timelineItem.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Timeline item not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (error) {
    console.error('[GET /api/timeline/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/timeline/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()
    const { year, title, titleEn, description, descriptionEn, order } = body

    const existing = await prisma.timelineItem.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Timeline item not found' }, { status: 404 })

    const item = await prisma.timelineItem.update({
      where: { id },
      data: {
        ...(year !== undefined && { year }),
        ...(title !== undefined && { title }),
        ...(titleEn !== undefined && { titleEn }),
        ...(description !== undefined && { description }),
        ...(descriptionEn !== undefined && { descriptionEn }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('[PUT /api/timeline/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/timeline/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = await prisma.timelineItem.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Timeline item not found' }, { status: 404 })

    await prisma.timelineItem.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE /api/timeline/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
