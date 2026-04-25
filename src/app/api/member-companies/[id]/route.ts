import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const company = await prisma.memberCompany.findUnique({ where: { id } })
  if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(company)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  const body = await request.json()

  const company = await prisma.memberCompany.update({
    where: { id },
    data: {
      order: body.order,
      abbr: body.abbr,
      name: body.name,
      tagline: body.tagline,
      descVi: body.descVi,
      descEn: body.descEn,
      accent: body.accent,
      published: body.published,
    },
  })
  return NextResponse.json(company)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  await prisma.memberCompany.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
