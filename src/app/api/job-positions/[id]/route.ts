import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseJobPosition } from '@/lib/entityInput'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const position = await prisma.jobPosition.findUnique({ where: { id } })
    if (!position) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(position)
  } catch (err) {
    return handleApiError(err, 'GET /api/job-positions/[id] error:')
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
    const position = await prisma.jobPosition.update({
      where: { id },
      data: parseJobPosition(body),
    })
    return NextResponse.json(position)
  } catch (err) {
    return handleApiError(err, 'PUT /api/job-positions/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.jobPosition.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/job-positions/[id] error:')
  }
}
