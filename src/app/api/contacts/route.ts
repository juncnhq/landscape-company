import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, badRequest, handleApiError } from '@/lib/apiError'

/** Giới hạn độ dài để một form public không thể nhồi dữ liệu rác cỡ lớn vào DB. */
const MAX = {
  firstName: 100,
  lastName: 100,
  email: 200,
  phone: 30,
  company: 200,
  address: 300,
  service: 100,
  message: 5000,
}

const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

/** GET — danh sách lead, chỉ admin. Đây là dữ liệu cá nhân của khách. */
export async function GET(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const status = request.nextUrl.searchParams.get('status')
    const where: Record<string, unknown> = {}
    if (status && status !== 'all') where.status = status

    const items = await prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (err) {
    return handleApiError(err, 'GET /api/contacts error:')
  }
}

/** POST — form liên hệ công khai, không cần session. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot: field ẩn mà người thật không bao giờ điền. Bot điền vào thì
    // trả 201 như bình thường để nó không biết đã bị chặn, nhưng không lưu.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 201 })
    }

    const firstName = str(body.firstName, MAX.firstName)
    const lastName = str(body.lastName, MAX.lastName)
    const email = str(body.email, MAX.email)
    const phone = str(body.phone, MAX.phone)

    if (!firstName) return badRequest('Vui lòng nhập Họ.')
    if (!lastName) return badRequest('Vui lòng nhập Tên.')
    if (!email) return badRequest('Vui lòng nhập Email.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest('Email không hợp lệ.')
    if (!phone) return badRequest('Vui lòng nhập Số điện thoại.')

    await prisma.contactRequest.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company: str(body.company, MAX.company),
        address: str(body.address, MAX.address),
        service: str(body.service, MAX.service),
        message: str(body.message, MAX.message),
      },
    })

    // Chỉ trả success — không trả lại bản ghi để tránh lộ id cho người lạ.
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/contacts error:')
  }
}
