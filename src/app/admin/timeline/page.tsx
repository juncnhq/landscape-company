import { redirect } from 'next/navigation'

/**
 * Tab "Lịch sử" đã được gộp vào "Về chúng tôi" (feedback 22.09): dòng thời
 * gian chỉ hiển thị trong trang /vi/about chứ không có trang riêng.
 * Giữ route cũ để link/bookmark đã chia sẻ không bị 404.
 */
export default function TimelineRedirect() {
  redirect('/admin/about')
}
