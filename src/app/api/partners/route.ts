import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(partners)
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  const body = await request.json()

  const partner = await prisma.partner.create({
    data: {
      order: body.order ?? 0,
      name: body.name,
      sectorVi: body.sectorVi ?? '',
      sectorEn: body.sectorEn ?? '',
      descVi: body.descVi ?? '',
      descEn: body.descEn ?? '',
      founded: body.founded ?? 2000,
      hq: body.hq ?? '',
      statLabelVi: body.statLabelVi ?? '',
      statLabelEn: body.statLabelEn ?? '',
      statValue: body.statValue ?? '',
      projectsVi: body.projectsVi ?? [],
      projectsEn: body.projectsEn ?? [],
      highlightVi: body.highlightVi ?? '',
      highlightEn: body.highlightEn ?? '',
      published: body.published ?? true,
    },
  })
  return NextResponse.json(partner, { status: 201 })
}
