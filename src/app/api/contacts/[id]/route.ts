import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, badRequest, handleApiError } from '@/lib/apiError'

const STATUSES = ['new', 'contacted', 'done'] as const

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    const body = await request.json()

    const data: { status?: string; note?: string } = {}

    if (body.status !== undefined) {
      if (!STATUSES.includes(body.status)) {
        return badRequest(`Trạng thái không hợp lệ: ${body.status}`)
      }
      data.status = body.status
    }
    if (body.note !== undefined) {
      data.note = typeof body.note === 'string' ? body.note.slice(0, 5000) : ''
    }

    const item = await prisma.contactRequest.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (err) {
    return handleApiError(err, 'PUT /api/contacts/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.contactRequest.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/contacts/[id] error:')
  }
}
