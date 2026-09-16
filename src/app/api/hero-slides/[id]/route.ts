import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, toInt } from '@/lib/apiError'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const slide = await prisma.heroSlide.findUnique({ where: { id } })
    if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(slide)
  } catch (err) {
    return handleApiError(err, 'GET /api/hero-slides/[id] error:')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    const body = await request.json()
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        order: toInt(body.order, 0),
        image: body.image,
        labelVi: body.labelVi,
        labelEn: body.labelEn,
        published: body.published,
      },
    })
    return NextResponse.json(slide)
  } catch (err) {
    return handleApiError(err, 'PUT /api/hero-slides/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.heroSlide.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/hero-slides/[id] error:')
  }
}
