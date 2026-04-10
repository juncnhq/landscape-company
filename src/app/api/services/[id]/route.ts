import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
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
      published: body.published,
    },
  })
  return NextResponse.json(service)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  await prisma.service.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
