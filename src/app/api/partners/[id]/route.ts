import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parsePartner } from '@/lib/entityInput'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(partner)
  } catch (err) {
    return handleApiError(err, 'GET /api/partners/[id] error:')
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
    const item = await prisma.partner.update({
      where: { id },
      data: parsePartner(body),
    })
    return NextResponse.json(item)
  } catch (err) {
    return handleApiError(err, 'PUT /api/partners/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.partner.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/partners/[id] error:')
  }
}
