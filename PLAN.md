# PLAN — Home page UI/UX (bám mẫu Leafix)

> Tài liệu "check nhanh" cho các phiên sau: hiện trạng, đã làm gì, còn gì, và checklist.
> Mẫu tham chiếu: **Leafix** — https://nayonacademy.com/html/leafix/ (home-1).
> Stack: Next.js 16 (App Router) · Tailwind v4 · next-intl (vi/en, **default = vi**).
> Quy ước thiết kế đầy đủ: xem `DESIGN_SYSTEM.md`. Review chi tiết: `REVIEW_UI_UX.md`.

---

## 1. Sự thật quan trọng cần nhớ trước khi sửa font

- **Toàn site (vi + en) dùng 1 font duy nhất: `Be Vietnam Pro`** cho cả body + heading.
  Đã gỡ Bricolage + Public Sans (2026-06-28).
- ⇒ Muốn đổi "cảm giác" font ⇒ sửa **Be Vietnam Pro** trong `layout.tsx` / `globals.css`.
- ⇒ Be Vietnam Pro phải nạp đủ weight 300/400/500/600/700/800/900 (UI dùng từ font-light tới font-black). Đừng trim.

## 2. Bản đồ section home ↔ mẫu Leafix

| Section (component) | Mẫu Leafix | Trạng thái |
|---|---|---|
| Hero (`HeroSection`) | Hero | ✅ Khớp (2 CTA, overlay nhạt, vị trí dọc responsive) |
| Giới thiệu (`AboutSection`) | "Crafting Green Spaces" | ✅ Đã khớp sẵn (stats + checklist + ảnh) |
| Dịch vụ (`OurServicesSection`) | Services | ✅ Khớp (đã đổi icon emoji → SVG) |
| Quy trình (`ProcessSection`) | "How It Work" | ✅ Đã khớp sẵn (4 bước, icon SVG) |
| Dự án (`ProjectsSection`) | Projects | ✅ Đã khớp sẵn (card + badge + hover) |
| Footer (`Footer`) | Footer | ✅ Khớp (đã thêm band CTA "Ready to Transform") |
| Hệ sinh thái (`MemberCompaniesSection`) | — (không có trong mẫu) | ➖ Giữ nguyên, custom |
| Đối tác (`PartnersSection`) | — (không có trong mẫu) | ➖ Giữ nguyên, custom |

## 3. Changelog (2026-06-28)

**Typography (toàn cục)**
- **Gỡ hẳn Bricolage + Public Sans**, thống nhất toàn site dùng **Be Vietnam Pro** (vi + en); bỏ override `html[lang="vi"]`. Tải nhẹ hơn (~10 file font/2 family bị loại khỏi mọi trang).
- Be Vietnam Pro: subset `latin + vietnamese`, weight đủ **300–900**.
- Đồng nhất cỡ heading H2 mọi section → `clamp(1.95rem, 3.5vw, 3.75rem)`.
- Token cỡ chữ (`globals.css`) đổi sang thang modular 12/14/16/18/20/24/30/36 (token này chưa nơi nào dùng).
- (Lịch sử: từng thử rút weight Be Vietnam Pro → gây faux-bold → đã revert; nay là font chính nên giữ full.)

**Hero**
- Thêm CTA phụ "Yêu cầu báo giá" (kiểu glass) → đủ 2 nút như mẫu.
- `paddingTop`/`paddingBottom` cố định → `clamp()` responsive.
- Overlay tối nhẹ đi: 2 lớp gradient (ngang nhạt + scrim đáy) thay vì phẳng 0.50.

**Services**
- Thay icon **emoji → SVG** (Heroicons outline), map theo index (`SERVICE_ICONS`).

**Footer**
- Promote CTA thành **band full-width** (heading + nút báo giá + "Gọi cho chúng tôi").
- Fix typo "fo" lạc trong dòng giờ làm việc.
- Cột 1 đổi thành "Liên hệ" + intro thương hiệu + contact.

## 3b. Responsive review + fixes (2026-06-28)

> Lưu ý môi trường: công cụ chụp ảnh khoá ở 1512px nên mobile/4K được audit qua **code** (breakpoint, clamp, fixed-size), không phải ảnh thật. Nên kiểm tra lại bằng DevTools device toolbar.

**Cấu trúc responsive: OK** — các section stack đúng (`grid-cols-1 lg:grid-cols-2`, services `… sm:grid-cols-2 lg:grid-cols-3`), navbar có drawer mobile (`w-[300px]`, `lg:hidden`), garden card hero ẩn dưới `lg`.

**Đã sửa:**
- **Hero mobile**: `paddingTop` `clamp(150px,30vh,320px)` → `clamp(112px,20vh,300px)` (bớt đẩy chữ xuống sâu); `paddingBottom` nhẹ lại.
- **Hero `<h1>`**: min `2.5rem` → `2.15rem` (34px) để từ tiếng Việt dài không bị chật trên màn hẹp; cap vẫn 6.5rem.
- **About**: ảnh `height: 620px` cố định → `clamp(360px, 52vw, 620px)` (mobile không bị ảnh quá cao).
- **Màn lớn ≥1800px**: base body `16px → 17px` (line-height 30px) để nội dung không bị nhỏ trên 4K (trước chỉ bump label nhỏ).

**Còn theo dõi (cần test thật bằng DevTools):**
- Tablet 768–1024: services/projects chuyển 2 cột — kiểm tra khoảng cách card.
- Hero slide-controls (`bottom:48px left:56px`) trên mobile có thể gần nút CTA — xác nhận không chồng.
- Ultra-wide ≥2560: nội dung cap `max-w-[1920px]` (lề 2 bên rộng) — chấp nhận được; nâng cap nếu muốn lấp.

## 4. Còn lại / nên làm tiếp (ưu tiên giảm dần)

1. **Nhất quán spacing section**: `Partners` dùng `py-20 md:py-32`, lệch `.leafix-section` (120/60). Gom 1 scale.
2. **A11y**: thêm `aria-label` cho nút icon-only (slide controls hero), kiểm tra contrast text muted trên nền kem, `alt` ảnh mô tả.
3. **Navbar**: bỏ chevron ▾ ở menu không có dropdown (tín hiệu sai), hoặc làm mega-menu như mẫu.
4. **ProcessSection**: thay avatar `pravatar.cc` (mặt người ngẫu nhiên) bằng ảnh thật/biểu tượng.
5. **Footer links** Terms/Privacy đang trỏ `/` → tạo trang thật.
6. ~~Quyết định font~~ ✅ **Đã làm (2026-06-28)**: gỡ Bricolage + Public Sans, dùng 1 font Be Vietnam Pro toàn site.
7. **Section mẫu có mà site chưa có** (tùy chọn): Testimonials, Pricing, Team, Blog, form "Request a Quote".
8. **Đồng bộ thương hiệu**: CLAUDE.md còn tên cũ "FAM Landscape"; social footer là "FAM Flower and More" → rà lại theo "Lapla".

## 5. Checklist verify nhanh (chạy `npm run dev` → mở `/vi`)

- [ ] Hero: 2 nút CTA, chữ trắng đọc rõ trên ảnh, ảnh nền hiện rõ (overlay nhẹ).
- [ ] Heading các section cùng cỡ, không "nhảy" cỡ giữa các section.
- [ ] Dấu tiếng Việt đều nét (ệ, ữ, ậ, Đ…), không lệch font trong cùng 1 từ.
- [ ] Services: icon là SVG (không còn emoji), hover đổi nền brand.
- [ ] Footer: có band CTA lớn + "Gọi cho chúng tôi"; dòng giờ làm không còn chữ "fo".
- [ ] Kiểm tra mobile 390px: hero không bị đẩy chữ quá sâu; card 1 cột gọn.
