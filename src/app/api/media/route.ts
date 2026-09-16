import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, badRequest, missingFields } from '@/lib/apiError'

export async function GET() {
  // Thư viện media chỉ phục vụ admin — không có component public nào gọi.
  if (!(await verifySession())) return unauthorized()
  try {
    const items = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (err) {
    return handleApiError(err, 'GET /api/media error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await request.json()
    const invalid = missingFields(body, ['url'])
    if (invalid) return badRequest(invalid)

    const item = await prisma.media.create({
      data: {
        url: body.url,
        filename: body.filename ?? '',
        folder: body.folder ?? 'gallery',
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/media error:')
  }
}
