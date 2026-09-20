import { NextResponse } from 'next/server'
import { ValidationError } from '@/lib/validate'

export const unauthorized = () =>
  NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export const badRequest = (message: string) =>
  NextResponse.json({ error: message }, { status: 400 })

/** Tên field hiển thị cho người dùng khi vi phạm ràng buộc unique. */
const FIELD_LABELS: Record<string, string> = {
  slug: 'Slug',
  key: 'Key',
}

type PrismaKnownError = { code?: string; meta?: { target?: unknown } }

/**
 * Chuyển lỗi Prisma thành HTTP status + thông báo người dùng đọc được.
 *
 * Trước đây mọi lỗi đều rơi vào 500 "Internal server error", nên admin gặp
 * trùng slug chỉ thấy "Lưu thất bại" và không có cách nào tự xử lý.
 */
export function handleApiError(err: unknown, label: string) {
  // Lỗi validate là lỗi của người nhập, không phải lỗi hệ thống → 400 kèm
  // message tiếng Việt để admin biết sửa ô nào.
  if (err instanceof ValidationError) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  const e = err as PrismaKnownError

  // P2002 — vi phạm ràng buộc unique
  if (e?.code === 'P2002') {
    const target = e.meta?.target
    const fields = Array.isArray(target) ? target.map(String) : [String(target ?? '')]
    const label0 = FIELD_LABELS[fields[0]] ?? fields[0] ?? 'Giá trị'
    return NextResponse.json(
      { error: `${label0} đã tồn tại, vui lòng dùng giá trị khác.` },
      { status: 409 }
    )
  }

  // P2025 — bản ghi cần update/delete không tồn tại
  if (e?.code === 'P2025') {
    return NextResponse.json({ error: 'Không tìm thấy bản ghi.' }, { status: 404 })
  }

  console.error(label, err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
