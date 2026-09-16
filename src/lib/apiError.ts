import { NextResponse } from 'next/server'

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

/**
 * Kiểm tra các field bắt buộc là chuỗi không rỗng.
 * Trả về message lỗi đầu tiên, hoặc null nếu hợp lệ.
 */
export function missingFields(
  body: Record<string, unknown>,
  required: string[]
): string | null {
  for (const f of required) {
    const v = body[f]
    if (typeof v !== 'string' || v.trim() === '') {
      return `Thiếu trường bắt buộc: ${f}`
    }
  }
  return null
}

/**
 * Ép giá trị về số nguyên. Trả về `fallback` khi không parse được,
 * tránh đẩy NaN xuống Prisma (NaN làm query throw và trả về 500 khó hiểu).
 */
export function toInt(value: unknown, fallback: number): number {
  // Ô nhập bị bỏ trống (''/null/undefined) phải dùng giá trị mặc định,
  // không phải 0 — Number('') === 0 sẽ biến "năm thành lập" rỗng thành năm 0.
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string' && value.trim() === '') return fallback

  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? Math.trunc(n) : fallback
}
