import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

// GET /api/services/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const service = await prisma.service.findUnique({ where: { id } })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error('[GET /api/services/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/services/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()
    const { number, titleVi, titleEn, descVi, descEn, tag, iconSvg, order, published } = body

    const existing = await prisma.service.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(number !== undefined && { number }),
        ...(titleVi !== undefined && { titleVi }),
        ...(titleEn !== undefined && { titleEn }),
        ...(descVi !== undefined && { descVi }),
        ...(descEn !== undefined && { descEn }),
        ...(tag !== undefined && { tag }),
        ...(iconSvg !== undefined && { iconSvg }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('[PUT /api/services/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/services/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = await prisma.service.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    await prisma.service.delete({ where: { id } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE /api/services/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
