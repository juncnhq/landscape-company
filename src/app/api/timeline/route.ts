import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, badRequest, handleApiError } from '@/lib/apiError'
import { readJson, asObject, reqStr, intRange } from '@/lib/validate'
import { parseTimelineItem } from '@/lib/entityInput'

export async function GET() {
  try {
    const items = await prisma.timelineItem.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(items)
  } catch (err) {
    return handleApiError(err, 'GET /api/timeline error:')
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const raw = await request.json().catch(() => null)
    // Trước đây gọi thẳng body.map — body không phải mảng là TypeError → 500.
    if (!Array.isArray(raw)) return badRequest('Dữ liệu sắp xếp không hợp lệ.')

    const updates = raw.map((row, i) => {
      const r = asObject(row)
      return {
        id: reqStr(r.id, `ID mục thứ ${i + 1}`, 60),
        order: intRange(r.order, 0, 0, 9999, `Thứ tự mục thứ ${i + 1}`),
      }
    })

    // Đặt trong transaction: reorder nửa chừng rồi lỗi sẽ để timeline sai thứ tự.
    await prisma.$transaction(
      updates.map(({ id, order }) =>
        prisma.timelineItem.update({ where: { id }, data: { order } })
      )
    )
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'PATCH /api/timeline error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await readJson(request)
    const item = await prisma.timelineItem.create({ data: parseTimelineItem(body) })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/timeline error:')
  }
}
