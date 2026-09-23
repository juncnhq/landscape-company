import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, badRequest, handleApiError } from '@/lib/apiError'
import { readJson, asObject, reqStr, intRange } from '@/lib/validate'
import { parseJobPosition } from '@/lib/entityInput'

export async function GET() {
  try {
    // Chưa đăng nhập thì chỉ thấy vị trí đang hiển thị — trang /careers công
    // khai dùng chung route này, admin thì cần thấy cả vị trí đang ẩn.
    const where: Record<string, unknown> = {}
    if (!(await verifySession())) where.published = true

    const positions = await prisma.jobPosition.findMany({
      where,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(positions)
  } catch (err) {
    return handleApiError(err, 'GET /api/job-positions error:')
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const raw = await request.json().catch(() => null)
    if (!Array.isArray(raw)) return badRequest('Dữ liệu sắp xếp không hợp lệ.')

    const updates = raw.map((row, i) => {
      const r = asObject(row)
      return {
        id: reqStr(r.id, `ID vị trí thứ ${i + 1}`, 60),
        order: intRange(r.order, 0, 0, 9999, `Thứ tự vị trí thứ ${i + 1}`),
      }
    })

    // Transaction: reorder dở dang sẽ để danh sách tuyển dụng sai thứ tự.
    await prisma.$transaction(
      updates.map(({ id, order }) =>
        prisma.jobPosition.update({ where: { id }, data: { order } })
      )
    )
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'PATCH /api/job-positions error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await readJson(request)
    const position = await prisma.jobPosition.create({ data: parseJobPosition(body) })
    return NextResponse.json(position, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/job-positions error:')
  }
}
