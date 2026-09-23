import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseAboutPage } from '@/lib/entityInput'

/** Trang /about chỉ có một bản ghi nội dung duy nhất. */
const ID = 'main'

export async function GET() {
  try {
    const page = await prisma.aboutPage.findUnique({ where: { id: ID } })
    // Chưa seed thì trả object rỗng thay vì 404: trang public tự fallback sang
    // chuỗi rỗng, còn form admin vẫn mở được để nhập lần đầu.
    return NextResponse.json(page ?? {})
  } catch (err) {
    return handleApiError(err, 'GET /api/about-page error:')
  }
}

export async function PUT(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await readJson(request)
    const data = parseAboutPage(body)
    // upsert: bản ghi có thể chưa tồn tại nếu bỏ qua bước seed.
    const page = await prisma.aboutPage.upsert({
      where: { id: ID },
      update: data,
      create: { id: ID, ...data },
    })
    return NextResponse.json(page)
  } catch (err) {
    return handleApiError(err, 'PUT /api/about-page error:')
  }
}
