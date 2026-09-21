import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, badRequest, handleApiError } from '@/lib/apiError'
import { readJson, imageUrl } from '@/lib/validate'

/**
 * Các key được phép ghi — đúng bằng danh sách trang trong SiteSettingsManager.
 * Không có whitelist thì bất kỳ request nào cũng tạo được key rác không giới hạn,
 * và bảng site_setting phình ra không ai dọn.
 */
const ALLOWED_KEYS = [
  'hero_projects',
  'hero_about',
  'hero_news',
  'hero_services',
  'hero_partners',
  'hero_careers',
] as const

const isAllowed = (key: string): boolean =>
  (ALLOWED_KEYS as readonly string[]).includes(key)

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { key } = await params
    if (!isAllowed(key)) return badRequest(`Key không hợp lệ: ${key}`)

    const body = await readJson(request)
    // Mọi key hiện tại đều là ảnh hero, nên validate như URL ảnh.
    const value = imageUrl(body.value, 'Ảnh nền trang', true)

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
    if (!isAllowed(key)) return badRequest(`Key không hợp lệ: ${key}`)

    await prisma.siteSetting.deleteMany({ where: { key } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/site-settings/[key] error:')
  }
}
