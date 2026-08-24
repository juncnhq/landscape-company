import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
const serverError = (err: unknown, label: string) => {
  console.error(label, err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch (err) {
    return serverError(err, 'GET /api/services error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
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
        image: body.image ?? '',
        images: body.images ?? [],
        published: body.published ?? true,
      },
    })
    return NextResponse.json(service, { status: 201 })
  } catch (err) {
    return serverError(err, 'POST /api/services error:')
  }
}
