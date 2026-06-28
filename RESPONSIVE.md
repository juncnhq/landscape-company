# RESPONSIVE — Lapla Landscape

> Tài liệu tham chiếu về responsive: breakpoint, quy tắc scale font, hành vi từng section, các item kích thước cố định, và checklist test.
> Liên quan: `DESIGN_SYSTEM.md` (tokens/typography), `PLAN.md` (changelog + TODO).
> Stack: Next.js 16 · Tailwind v4 · 1 font duy nhất **Be Vietnam Pro** (vi + en).

---

## 1. Breakpoints

| Tên | Min width | Dùng cho |
|---|---|---|
| (base) | 0 | Mobile — layout 1 cột |
| `sm` | 640px | Điện thoại ngang / phablet — bắt đầu 2 cột |
| `md` | 768px | Tablet dọc |
| `lg` | 1024px | Tablet ngang / laptop nhỏ — layout desktop đầy đủ |
| `xl` | 1280px | Laptop |
| `2xl` | 1536px | Desktop lớn |
| **custom `≤768px`** | — | `.leafix-section` giảm padding dọc 120px → 60px |
| **custom `≥1800px`** | 1800px | Màn lớn/4K — bump cỡ chữ (xem §3) |

Container chuẩn **mọi section home** (BẮT BUỘC dùng đúng giá trị này để các section thẳng hàng):
```
max-w-[2240px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-24
```
→ Nội dung cap ở **2240px** (lấp màn 4K nhiều hơn); màn ≤2240px không bị ảnh hưởng. Navbar + Footer cũng cap 2240 để thẳng hàng.

> ✅ Đã đồng nhất: tất cả section home (Hero, About, Services, Process, Projects, Member, Partners, Footer) + Navbar đều cap `2240px`. (Trước đây About lệch `lg:max-w-[80%]` → đã bỏ; Process giữ `lg:max-w-[72%]` là band căn giữa có chủ đích.)
> 📏 **Line-length:** khối chữ dài bên trong đặt `max-w` riêng (vd About desc `max-w-[640px]`, hero desc `560px`) để dòng không quá ~75 ký tự trên màn rộng. Heading/eyebrow cũng nên giới hạn (`max-w-2xl`…).
> Các trang nội dung khác (about/services/team…) cố tình dùng container hẹp hơn (`1400/1760px`) cho dễ đọc — đây là chủ đích, không phải lỗi.

---

## 2. Hành vi grid theo section

| Section | Base (mobile) | `sm` (≥640) | `lg` (≥1024) |
|---|---|---|---|
| About | 1 cột | 1 cột | 2 cột |
| Services | 1 cột | 2 cột | 3 cột |
| Projects | 1 cột | 2 cột | 4 cột |
| Member Companies | 1 cột | 2 cột | 4 cột |
| Process (4 bước) | 1 cột | 2 cột | 4 cột |
| Footer (cột link) | 2 cột | 3 cột | 3 cột |

**Navbar:** menu pill `hidden lg:` (chỉ hiện ≥1024); dưới `lg` dùng hamburger + drawer `w-[300px]`. Chiều cao cố định `76px` (hero `marginTop:-76px` để chui dưới navbar trong suốt).

**Hero:**
- Garden card (góc phải dưới): `hidden lg:flex` → chỉ hiện ≥1024px.
- Nhãn slide-control: `hidden sm:block` → ẩn text trên mobile, chỉ còn thanh progress + số.

---

## 3. Quy tắc scale font

### Heading (dùng `clamp(min, vw, max)` — tự co giãn liên tục)
| Vai trò | clamp | Mobile (≈390) | Cap (màn lớn) |
|---|---|---|---|
| Hero `<h1>` | `clamp(2.15rem, 5.5vw, 6.5rem)` | ~34px | 104px |
| Section `<h2>` (mọi section) | `clamp(1.95rem, 3.5vw, 3.75rem)` | ~31px | 60px |
| Watermark trang trí ("PROJECT", "GREEN") | `clamp(8rem, 18vw, 21.6rem)` | — | 346px |

> Quy ước: **mọi H2 dùng chung 1 thang**; chỉ Hero `<h1>` mới to vượt trội. Khi thêm section mới, dùng đúng `clamp(1.95rem, 3.5vw, 3.75rem)` cho heading.

### Body & tokens
- Body: `16px / line-height 28px`. **≥1800px: `17px / 30px`** (để không bị nhỏ trên 4K).
- Token cỡ chữ (`globals.css`, modular ~1.2): `xs 12 · sm 14 · md 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 · 4xl 36`.
- **≥1800px** còn bump: `xs 12→14`, `sm 14→16`, và label nhỏ `text-[9/10/11px] → 11/12/13px`.
- `≤768px` (trong `.site-body`): các text siêu nhỏ cũng được nâng để giữ đọc được.

---

## 4. Item kích thước cố định (đã/cần lưu ý khi đổi)

| Item | Giá trị | Ghi chú responsive |
|---|---|---|
| About — ảnh chính | `height: clamp(360px, 52vw, 620px)` | ✅ Đã đổi từ `620px` cố định → co theo màn |
| Hero — garden card | `width: 538px` | Chỉ hiện ≥`lg`, không ảnh hưởng mobile |
| Hero — padding dọc | `clamp(112px,20vh,300px)` / `clamp(64px,10vh,110px)` | ✅ Đã giảm để mobile không đẩy chữ quá sâu |
| Navbar | `h-[76px]`, drawer `w-[300px]` | OK |
| Shape trang trí (leaf, shape) | `150–180px` | Trang trí, `pointer-events-none`; OK |
| Stat card (About) | `minWidth: 200px`, absolute | Nằm đè đáy ảnh; kiểm tra trên mobile hẹp |

Nguyên tắc: **tránh `height`/`width` cố định bằng px cho phần tử nội dung** — ưu tiên `clamp()`, `aspect-ratio`, hoặc `%`/`vw`. Chỉ dùng px cố định cho shape trang trí và chrome (navbar).

---

## 5. Checklist test (DevTools → device toolbar)

> Môi trường chụp ảnh của trợ lý khoá ở 1512px nên các mốc dưới đây **cần test thật** bằng DevTools.

**Mobile 375–414px**
- [ ] Hero: heading 4 dòng không tràn ngang; chữ + 2 nút CTA + slide-control không chồng nhau.
- [ ] Tất cả section về 1 cột, card không tràn, ảnh không quá cao.
- [ ] Navbar: hamburger mở drawer `300px` mượt; overlay đóng được.
- [ ] Footer: band CTA xuống dòng gọn; cột link 2 cột đọc được.
- [ ] Không có scroll ngang (overflow-x).

**Tablet 768–1024px**
- [ ] Services/Projects/Process chuyển 2 cột — khoảng cách card đều.
- [ ] Garden card hero chưa hiện (đúng, <lg); bố cục hero không trống bất thường.

**Laptop 1280–1536px**
- [ ] Layout desktop đầy đủ, heading/â body cân đối (mốc đang dùng làm chuẩn).

**Desktop lớn / 4K ≥1800–2560px**
- [ ] Body chữ 17px, không bị nhỏ; heading không bị "lọt thỏm".
- [ ] Cap `max-w-[2240px]`: trên 2560/4K nội dung lấp rộng hơn, lề 2 bên gọn lại; kiểm tra card/ảnh không bị quá to.

---

## 6. Lịch sử thay đổi responsive

**2026-06-28 (đợt 2 — best practice màn lớn)**
- About: bỏ `lg:max-w-[80%]` (hết lệch hàng trên màn to); About desc thêm `max-w-[640px]` khoá line-length.
- **Nâng cap container `1920px → 2240px`** cho toàn bộ section home + Navbar + Footer (lấp màn 4K nhiều hơn; màn ≤2240 không đổi).

**2026-06-28**
- Hero: padding dọc cố định → `clamp()`; h1 min `2.5→2.15rem`.
- About: ảnh `620px` → `clamp(360px, 52vw, 620px)`.
- ≥1800px: base body `16→17px` (line-height 30).
- (Trước đó) Đồng nhất H2 về `clamp(1.95rem, 3.5vw, 3.75rem)`; gỡ Bricolage/Public Sans, dùng 1 font Be Vietnam Pro.
