import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { key } = await params
    const { value } = await request.json()
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
    return NextResponse.json(setting)
  } catch (err) {
    return handleApiError(err, 'PUT /api/site-settings/[key] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { key } = await params
    await prisma.siteSetting.deleteMany({ where: { key } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/site-settings/[key] error:')
  }
}
