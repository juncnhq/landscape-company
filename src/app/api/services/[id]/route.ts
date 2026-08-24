import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
const serverError = (err: unknown, label: string) => {
  console.error(label, err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    const body = await request.json()
    const service = await prisma.service.update({
      where: { id },
      data: {
        slug: body.slug,
        order: body.order,
        icon: body.icon,
        titleVi: body.titleVi,
        titleEn: body.titleEn,
        subtitleVi: body.subtitleVi,
        subtitleEn: body.subtitleEn,
        descVi: body.descVi,
        descEn: body.descEn,
        tag: body.tag,
        bulletsVi: body.bulletsVi,
        bulletsEn: body.bulletsEn,
        image: body.image ?? '',
        images: body.images ?? [],
        published: body.published,
      },
    })
    return NextResponse.json(service)
  } catch (err) {
    return serverError(err, 'PUT /api/services/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, 'DELETE /api/services/[id] error:')
  }
}
