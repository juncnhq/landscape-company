import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/partners
// Query params: published
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const published = searchParams.get('published')

    const where = {
      ...(published !== null ? { published: published === 'true' } : {}),
    }

    const data = await prisma.partner.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[GET /api/partners]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/partners
export async function POST(req: NextRequest) {
  try {
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

    if (!name || !sector || !sectorEn || !descVi || !descEn || !founded || !hq || !statLabelVi || !statLabelEn || !statValue) {
      return NextResponse.json(
        { error: 'name, sector, sectorEn, descVi, descEn, founded, hq, statLabelVi, statLabelEn, and statValue are required' },
        { status: 400 }
      )
    }

    const partner = await prisma.partner.create({
      data: {
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
        projectsVi: projectsVi ?? [],
        projectsEn: projectsEn ?? [],
        highlightVi,
        highlightEn,
        order: order ?? 0,
        published: published ?? true,
      },
    })

    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    console.error('[POST /api/partners]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
