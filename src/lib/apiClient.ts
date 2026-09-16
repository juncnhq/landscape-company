/**
 * Đọc thông báo lỗi do API trả về để hiển thị cho admin.
 *
 * Các route trả `{ error: string }` kèm status có ý nghĩa (409 trùng slug,
 * 400 thiếu field, 404 không tìm thấy). Trước đây UI nuốt hết và chỉ hiện
 * "Lưu thất bại", khiến người dùng không biết phải sửa gì.
 */
export async function apiErrorMessage(
  res: Response,
  fallback = 'Lưu thất bại. Vui lòng thử lại.'
): Promise<string> {
  if (res.status === 401) {
    return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
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
