/**
 * Primitives validate dùng chung cho mọi API route.
 *
 * Mọi hàm ở đây throw `ValidationError` khi dữ liệu sai; `handleApiError`
 * bắt lại và trả 400 kèm đúng message tiếng Việt, nên route chỉ cần gọi
 * parser rồi đưa thẳng kết quả xuống Prisma.
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Kiểu phải khai báo trên const thì TypeScript mới coi đây là hàm không bao
// giờ trả về và tự thu hẹp kiểu sau mỗi lần gọi.
const fail: (msg: string) => never = (msg) => {
  throw new ValidationError(msg)
}

/** Chuỗi bắt buộc: phải là string, sau trim không rỗng, không vượt maxLen. */
export function reqStr(v: unknown, label: string, maxLen = 300): string {
  if (typeof v !== 'string') fail(`Vui lòng nhập ${label}.`)
  const s = (v as string).trim()
  if (!s) fail(`Vui lòng nhập ${label}.`)
  if (s.length > maxLen) fail(`${label} tối đa ${maxLen} ký tự (đang ${s.length}).`)
  return s
}

/** Chuỗi tuỳ chọn — rỗng thì trả `fallback`. */
export function optStr(v: unknown, label: string, maxLen = 300, fallback = ''): string {
  if (v === undefined || v === null) return fallback
  if (typeof v !== 'string') fail(`${label} không hợp lệ.`)
  const s = (v as string).trim()
  if (!s) return fallback
  if (s.length > maxLen) fail(`${label} tối đa ${maxLen} ký tự (đang ${s.length}).`)
  return s
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * Slug dùng làm URL công khai (`/vi/projects/[slug]`), nên bắt buộc đúng
 * định dạng — trước đây admin gõ "Dự án Sân Golf" là link public hỏng luôn.
 * Tự hạ chữ thường cho đỡ khó tính, phần còn lại thì báo lỗi rõ ràng.
 */
export function reqSlug(v: unknown, label = 'Slug'): string {
  const s = reqStr(v, label, 160).toLowerCase()
  if (!SLUG_RE.test(s)) {
    fail(
      `${label} chỉ được chứa chữ thường không dấu, số và dấu gạch ngang — ví dụ: du-an-san-golf.`
    )
  }
  return s
}

/** Mảng chuỗi: loại bỏ phần tử rỗng/không phải string, chặn mảng quá dài. */
export function strArray(v: unknown, label: string, maxItems = 60, maxLen = 1000): string[] {
  if (v === undefined || v === null) return []
  if (!Array.isArray(v)) fail(`${label} không hợp lệ.`)
  const arr = v
    .filter((x): x is string => typeof x === 'string' && x.trim() !== '')
    .map((x) => x.trim())
  if (arr.length > maxItems) fail(`${label} tối đa ${maxItems} mục.`)
  for (const s of arr) {
    if (s.length > maxLen) fail(`Mỗi mục trong ${label} tối đa ${maxLen} ký tự.`)
  }
  return arr
}

/**
 * Ép về boolean thật. `body.published ?? true` cũ coi chuỗi "false" là true,
 * nên bỏ publish qua API ngoài UI không có tác dụng.
 */
export function bool(v: unknown, fallback: boolean): boolean {
  if (typeof v === 'boolean') return v
  if (v === undefined || v === null || v === '') return fallback
  if (v === 'true' || v === 1 || v === '1') return true
  if (v === 'false' || v === 0 || v === '0') return false
  return fallback
}

/** Số nguyên trong khoảng cho phép. Ô trống → `fallback`, không phải 0. */
export function intRange(
  v: unknown,
  fallback: number,
  min: number,
  max: number,
  label: string
): number {
  if (v === null || v === undefined) return fallback
  if (typeof v === 'string' && v.trim() === '') return fallback

  const n = typeof v === 'number' ? v : Number(v)
  if (!Number.isFinite(n)) fail(`${label} phải là số.`)
  const i = Math.trunc(n)
  if (i < min || i > max) fail(`${label} phải nằm trong khoảng ${min}–${max}.`)
  return i
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Ngày dạng YYYY-MM-DD. Cột `date` của tin tức là String và được
 * `orderBy: { date: 'desc' }`, nên chỉ cần một bản ghi sai định dạng là
 * thứ tự cả trang tin tức lệch.
 */
export function isoDate(v: unknown, label = 'Ngày đăng'): string {
  if (v === undefined || v === null || v === '') {
    return new Date().toISOString().slice(0, 10)
  }
  if (typeof v !== 'string') fail(`${label} không hợp lệ.`)
  const s = (v as string).trim()
  if (!DATE_RE.test(s)) fail(`${label} phải theo định dạng YYYY-MM-DD (ví dụ 2026-01-20).`)
  const d = new Date(`${s}T00:00:00.000Z`)
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s) {
    fail(`${label} không phải ngày có thật.`)
  }
  return s
}

/** Đường dẫn ảnh: http(s) tuyệt đối hoặc đường dẫn nội bộ bắt đầu bằng "/". */
export function imageUrl(v: unknown, label: string, required = false): string {
  const s = optStr(v, label, 2000)
  if (!s) {
    if (required) fail(`Vui lòng chọn ${label}.`)
    return ''
  }
  if (!/^(https?:\/\/|\/)/i.test(s)) {
    fail(`${label} phải là link http(s) hoặc đường dẫn bắt đầu bằng "/".`)
  }
  return s
}

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

export function hexColor(v: unknown, fallback: string, label = 'Màu nhấn'): string {
  const s = optStr(v, label, 20)
  if (!s) return fallback
  if (!HEX_RE.test(s)) fail(`${label} phải là mã màu hex, ví dụ #328442.`)
  return s
}

/** Giá trị phải nằm trong danh sách cho trước (enum lưu dạng String). */
export function oneOf<T extends string>(
  v: unknown,
  allowed: readonly T[],
  fallback: T,
  label: string
): T {
  if (v === undefined || v === null || v === '') return fallback
  if (typeof v !== 'string' || !allowed.includes(v as T)) {
    fail(`${label} không hợp lệ. Chọn một trong: ${allowed.join(', ')}.`)
  }
  return v as T
}

/** Body request phải là object JSON — tránh `body.x` nổ TypeError → 500. */
export function asObject(v: unknown): Record<string, unknown> {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) {
    fail('Dữ liệu gửi lên không hợp lệ.')
  }
  return v as Record<string, unknown>
}

/** Đọc JSON body an toàn: body rỗng/hỏng → 400 thay vì 500. */
export async function readJson(request: Request): Promise<Record<string, unknown>> {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return fail('Dữ liệu gửi lên không phải JSON hợp lệ.')
  }
  return asObject(raw)
}
