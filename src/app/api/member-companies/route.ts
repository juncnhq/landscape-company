import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET() {
  const companies = await prisma.memberCompany.findMany({
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(companies)
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  const body = await request.json()

  const company = await prisma.memberCompany.create({
    data: {
      order: body.order ?? 0,
      abbr: body.abbr,
      name: body.name,
      tagline: body.tagline ?? '',
      descVi: body.descVi ?? '',
      descEn: body.descEn ?? '',
      accent: body.accent ?? '#328442',
      published: body.published ?? true,
    },
  })
  return NextResponse.json(company, { status: 201 })
}
