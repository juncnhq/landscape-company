---
name: feedback_ui_v1
description: Feedback UI từ khách hàng FAM - 5 mục cần sửa đã implement
type: feedback
---

Loạt feedback đầu tiên từ khách hàng FAM (2026-03-25):

1. **Màu xanh lá chủ đạo** - Đổi tất cả `bg-gray-950` sang `bg-green-950` trên toàn site để tông màu xanh lá thể hiện rõ hơn.
**Why:** Logo công ty màu xanh lá, muốn website đồng bộ nhận diện thương hiệu.
**How to apply:** Mọi section tối mới thêm dùng `bg-green-950` thay vì `bg-gray-950`. Light sections dùng `bg-green-50` thay `bg-white` hoặc `bg-gray-50`.

2. **Nền tối sáng hơn** - `bg-gray-950` (~#030712, gần đen) → `bg-green-950` (#052e16, tối nhưng rõ màu xanh và sáng hơn).
**Why:** Màu quá tối, muốn sáng hơn và xanh hơn.
**How to apply:** Dùng `bg-green-950` cho dark sections thay vì gray-950.

3. **Thứ tự: Thành viên (MemberCompanies) trên, Đối tác (Partners) dưới** - Đã swap trong `/src/app/[locale]/page.tsx`.

4. **Partners có modal khi bấm** - PartnersSection giờ là button, click hiện modal giữa màn hình với thông tin đối tác. Data partners đã có thêm `descVi`, `descEn`, `sector`, `sectorEn`.
**How to apply:** Nếu thêm partner mới vào `data.ts`, cần thêm đủ 4 fields trên.

5. **Tuyển dụng có accordion mô tả** - CareersPageContent positions giờ có expand/collapse, click để xem mô tả chi tiết và nút Ứng tuyển ngay.
