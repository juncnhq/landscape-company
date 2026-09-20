import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseTimelineItem } from '@/lib/entityInput'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await prisma.timelineItem.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (err) {
    return handleApiError(err, 'GET /api/timeline/[id] error:')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    const body = await readJson(request)
    const item = await prisma.timelineItem.update({
      where: { id },
      data: parseTimelineItem(body),
    })
    return NextResponse.json(item)
  } catch (err) {
    return handleApiError(err, 'PUT /api/timeline/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.timelineItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/timeline/[id] error:')
  }
}
