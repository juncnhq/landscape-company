import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(services)
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  const body = await request.json()

  const service = await prisma.service.create({
    data: {
      slug: body.slug,
      order: body.order ?? 0,
      icon: body.icon ?? '',
      titleVi: body.titleVi,
      titleEn: body.titleEn,
      subtitleVi: body.subtitleVi ?? '',
      subtitleEn: body.subtitleEn ?? '',
      descVi: body.descVi,
      descEn: body.descEn,
      tag: body.tag ?? '',
      bulletsVi: body.bulletsVi ?? [],
      bulletsEn: body.bulletsEn ?? [],
      published: body.published ?? true,
    },
  })
  return NextResponse.json(service, { status: 201 })
}
