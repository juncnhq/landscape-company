import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { SERVICES as staticServices } from '@/components/ServicesPageContent'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch {
    return NextResponse.json(
      staticServices.map((s, i) => ({
        id: s.id,
        slug: s.id,
        order: i,
        icon: s.icon,
        titleVi: s.titleVi,
        titleEn: s.titleEn,
        subtitleVi: s.subtitleVi,
        subtitleEn: s.subtitleEn,
        descVi: s.descVi,
        descEn: s.descEn,
        tag: '',
        bulletsVi: [...s.bulletsVi],
        bulletsEn: [...s.bulletsEn],
        published: true,
      }))
    )
  }
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
