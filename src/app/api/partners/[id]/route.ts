import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

// GET /api/partners/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const partner = await prisma.partner.findUnique({ where: { id } })

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
    }

    return NextResponse.json(partner)
  } catch (error) {
    console.error('[GET /api/partners/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/partners/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()
    const {
      name,
      sector,
      sectorEn,
      descVi,
      descEn,
      founded,
      hq,
      statLabelVi,
      statLabelEn,
      statValue,
      projectsVi,
      projectsEn,
      highlightVi,
      highlightEn,
      order,
      published,
    } = body

    const existing = await prisma.partner.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
    }

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(sector !== undefined && { sector }),
        ...(sectorEn !== undefined && { sectorEn }),
        ...(descVi !== undefined && { descVi }),
        ...(descEn !== undefined && { descEn }),
        ...(founded !== undefined && { founded }),
        ...(hq !== undefined && { hq }),
        ...(statLabelVi !== undefined && { statLabelVi }),
        ...(statLabelEn !== undefined && { statLabelEn }),
        ...(statValue !== undefined && { statValue }),
        ...(projectsVi !== undefined && { projectsVi }),
        ...(projectsEn !== undefined && { projectsEn }),
        ...(highlightVi !== undefined && { highlightVi }),
        ...(highlightEn !== undefined && { highlightEn }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    })

    return NextResponse.json(partner)
  } catch (error) {
    console.error('[PUT /api/partners/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/partners/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = await prisma.partner.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
    }

    await prisma.partner.delete({ where: { id } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE /api/partners/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
