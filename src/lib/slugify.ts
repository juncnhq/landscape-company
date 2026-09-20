/**
 * Chuyển tiêu đề tiếng Việt thành slug hợp lệ cho URL public.
 *
 * API chỉ nhận slug dạng `^[a-z0-9]+(?:-[a-z0-9]+)*$`, nên admin gõ tay
 * "Dự án Sân Golf" sẽ bị từ chối. Hàm này để UI tự sinh sẵn cho đúng.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    // bỏ dấu thanh + dấu mũ (tổ hợp Unicode)
    .replace(/[̀-ͯ]/g, '')
    // đ/Đ không tách được bằng NFD nên phải xử lý riêng
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160)
    .replace(/-+$/g, '')
}
