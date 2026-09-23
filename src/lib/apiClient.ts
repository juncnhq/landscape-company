/**
 * Lớp gọi API dùng chung cho admin.
 *
 * Trước đây mỗi manager tự `fetch` rồi nuốt lỗi vào `console.error`, nên hết
 * phiên hay DB lỗi đều hiện ra thành "danh sách rỗng" — admin tưởng dữ liệu
 * bị xoá. Mọi lời gọi giờ đi qua đây để thông báo lỗi tới được người dùng.
 */

/** Đưa về trang đăng nhập khi phiên hết hạn (bỏ qua nếu đang ở đó). */
function goToLogin() {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin/login')) return
  window.location.href = '/admin/login'
}

/**
 * Đọc thông báo lỗi do API trả về để hiển thị cho admin.
 *
 * Các route trả `{ error: string }` kèm status có ý nghĩa (409 trùng slug,
 * 400 thiếu field, 404 không tìm thấy). Trước đây UI nuốt hết và chỉ hiện
 * "Lưu thất bại", khiến người dùng không biết phải sửa gì.
 *
 * Gặp 401 thì tự chuyển về trang đăng nhập — không có chỗ nào làm việc này
 * nên admin chỉ thấy màn hình trống mà không hiểu vì sao.
 *
 * Lưu ý: trang đăng nhập KHÔNG dùng hàm này. Ở đó 401 nghĩa là sai mật khẩu,
 * không phải hết phiên.
 */
export async function apiErrorMessage(
  res: Response,
  fallback = 'Lưu thất bại. Vui lòng thử lại.'
): Promise<string> {
  if (res.status === 401) {
    goToLogin()
    return 'Phiên đăng nhập đã hết hạn. Đang chuyển về trang đăng nhập…'
  }
  try {
    const data = await res.json()
    if (data && typeof data.error === 'string' && data.error.trim()) {
      return data.error
    }
  } catch {
    // body rỗng hoặc không phải JSON — dùng fallback
  }
  return fallback
}

/** Lỗi mạng (mất kết nối, DNS hỏng) — `fetch` ném TypeError chứ không trả Response. */
const NETWORK_ERROR = 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.'

/**
 * GET + parse JSON. Ném `Error` kèm message đọc được nếu thất bại.
 * Dùng cho mọi hàm tải danh sách trong admin.
 */
export async function fetchJson<T>(
  url: string,
  fallback = 'Không tải được dữ liệu.'
): Promise<T> {
  let res: Response
  try {
    res = await fetch(url)
  } catch {
    throw new Error(NETWORK_ERROR)
  }
  if (!res.ok) throw new Error(await apiErrorMessage(res, fallback))
  return res.json() as Promise<T>
}

/**
 * Gửi request thay đổi dữ liệu (POST/PUT/PATCH/DELETE).
 * Ném `Error` kèm message đọc được nếu thất bại, kể cả khi đứt mạng —
 * trước đây `await fetch(...)` trần khiến lỗi mạng thành unhandled rejection
 * và nút bấm không phản hồi gì.
 */
export async function sendJson<T = unknown>(
  url: string,
  init: { method: string; body?: unknown },
  fallback = 'Thao tác thất bại. Vui lòng thử lại.'
): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, {
      method: init.method,
      headers: { 'Content-Type': 'application/json' },
      ...(init.body !== undefined ? { body: JSON.stringify(init.body) } : {}),
    })
  } catch {
    throw new Error(NETWORK_ERROR)
  }
  if (!res.ok) throw new Error(await apiErrorMessage(res, fallback))
  return res.json().catch(() => ({})) as Promise<T>
}

/** Lấy message từ lỗi bắt được, tránh lặp `e instanceof Error ? ... : ...`. */
export function errMessage(e: unknown, fallback = 'Đã có lỗi xảy ra.'): string {
  return e instanceof Error && e.message ? e.message : fallback
}
