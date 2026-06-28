# Lapla Landscape — Design System (Leafix style)

> Tài liệu này ghi lại quy tắc UI/UX **đang được áp dụng thực tế** trong code.
> Style clone từ [Leafix – Landscaping HTML Template](https://nayonacademy.com/html/leafix/index.html).
> Mọi token đều được định nghĩa tại `src/app/globals.css` (`:root`) — luôn dùng CSS variable, không hardcode hex trong component.

---

## 1. Brand Colors

### Core palette
| Token (CSS var) | Hex | Dùng cho |
|---|---|---|
| `--color-brand` | `#0F541E` | Dark green — navbar scrolled, nút primary, filter active |
| `--color-brand-dark` | `#0A3A14` | Hover của brand |
| `--color-accent` | `#C7DC49` | Lime — CTA "Yêu cầu báo giá", link hover, highlight |
| `--color-accent-dark` | `#B0C83A` | Hover của accent |

### Text
| Token | Hex | Dùng cho |
|---|---|---|
| `--color-text-primary` | `#141414` | Headings, strong text |
| `--color-text-secondary` | `#3D4348` | Body text |
| `--color-text-tertiary` | `#FFFFFF` | Text trên nền tối |
| `--color-text-muted` | `#6B7280` | Meta, placeholder |

### Surfaces (nền section)
| Token | Hex | Dùng cho |
|---|---|---|
| `--color-surface-base` | `#FFFFFF` | Nền trang, cards |
| `--color-surface-raised` | `#F8F7F3` | Testimonials, section xen kẽ |
| `--color-surface-alt` | `#F7F8ED` | Services bg |
| `--color-surface-warm` | `#F5F2EB` | Projects bg |
| `--color-surface-dark` | `#0A1606` | Hero overlay, footer, dark CTA |
| `--color-border` | `rgba(0,0,0,0.08)` | Border trên nền sáng |
| `--color-border-dark` | `rgba(255,255,255,0.15)` | Border trên nền tối |

> ❌ **Không dùng** palette cũ (`#328442`, `#07130a`, gold `#BE7B2B`, `#f7faf7`) — đã thay toàn bộ bằng token Leafix ở trên.
> ❌ Không dùng `bg-gray-50` / `bg-black` — dùng surface token tương ứng.

---

## 2. Typography

| Vai trò | Font | Token |
|---|---|---|
| **Toàn site (vi + en), body + heading** | **Be Vietnam Pro** | `--font-sans` / `--font-display` / `var(--font-be-vietnam)` |

> ✅ **Site dùng 1 font duy nhất: Be Vietnam Pro** (hỗ trợ đầy đủ tiếng Việt + Latin). Đã **gỡ Bricolage + Public Sans** (trước đây chỉ hiển thị trên `/en` nhưng vẫn bị tải ở mọi trang → lãng phí). Không còn override `html[lang="vi"]`.

- **Be Vietnam Pro phải nạp đủ weight `300–900`** — UI dùng từ `font-light` (300) → `font-black` (900), cộng hero (800). **Không trim.**
- Body: `16px / 28px`, weight 400. Headings: weight 700, `line-height: 1.2`, `letter-spacing: -0.01em` (vừa phải cho chữ có dấu).
- **Heading H2 mọi section dùng 1 thang chung:** `clamp(1.95rem, 3.5vw, 3.75rem)` (≈31→60px). Chỉ Hero `<h1>` mới to hơn (`clamp(2.5rem, 5.5vw, 6.5rem)`).
- Eyebrow label: uppercase, `text-xs`, `font-bold`, `tracking-widest`, màu `--color-brand` (nền sáng) / `--color-accent` (nền tối).
- Token cỡ chữ (modular ~1.2): `--font-size-xs` 12px → `--font-size-4xl` 36px (xem globals.css).

### Icon
- **Không dùng emoji làm icon** — luôn dùng **SVG** (Heroicons outline, `viewBox 0 0 24 24`). Vd `OurServicesSection` dùng mảng `SERVICE_ICONS`. (Field `icon` dạng emoji trong DB chỉ là dữ liệu cũ, không render.)

---

## 3. Radius & Shadow

| Token | Value | Dùng cho |
|---|---|---|
| `--radius-xs` | 6px | Badge, input nhỏ |
| `--radius-sm` | 8px | Inputs |
| `--radius-md` | 10px | Buttons, filter tabs |
| `--radius-lg` | 50px | Pill (nav pill, tags) |
| `--radius-xl` | 100px | Full pill / circle |
| Cards ảnh (project grid) | `20px` | borderRadius inline |

Shadows: `--shadow-sm/md/lg/brand` — dùng token, không tự chế.

---

## 4. Buttons

### Primary CTA (accent — kiểu "Request A Quote")
```tsx
<Link
  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest hover:opacity-90"
  style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
>
  Yêu cầu báo giá <ArrowIcon />
</Link>
```

### Dark button (trên nền sáng — kiểu "Xem dự án", "Liên hệ tư vấn")
```tsx
style={{ backgroundColor: 'var(--color-brand)', color: '#fff', borderRadius: '10px' }}
// hover → var(--color-brand-dark)
```

Quy tắc chung: label uppercase + tracking rộng, luôn kèm icon mũi tên `→`, transition 250ms (đã set global cho `a, button`).

---

## 5. Sections & Spacing

- Section chuẩn dùng class `.leafix-section` → `padding: 120px 0` (desktop), `60px 0` (mobile).
- Container: `max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14`.
- Nền section xen kẽ: trắng → `--color-surface-alt`/`raised`/`warm` → dark (`--color-surface-dark` cho CTA/footer).
- Trang trí: hoạ tiết lá/leaf pattern mờ, ảnh cây chậu floating (animation `float-bob-y` / `float-bob-x`) — dùng tiết chế.

---

## 6. Navbar & Footer

- Navbar fixed: transparent trên hero (nav pill nền `rgba(0,0,0,0.45)` + blur), chuyển `#0F541E` đặc khi scroll > 60px.
- Logo `/logo.png` là bản chữ tối → **bắt buộc** `filter: brightness(0) invert(1)` khi đặt trên nền tối (đã áp dụng ở Navbar + Footer). Mobile drawer nền trắng dùng logo gốc.
- Link nav: trắng `rgba(255,255,255,0.92)`, hover/active → `--color-accent`; underline animation qua class `.nav-link`.
- Footer: nền ảnh + overlay `rgba(15,84,30,0.9)`, text trắng, accent lime cho giờ làm việc/links hover.

---

## 7. Cards

### Project card (grid + section trang chủ)
- Ảnh `aspect-[4/3]`, `borderRadius: 20px`, hover scale ảnh `1.06`.
- **Tên dự án + địa điểm luôn hiển thị** trên gradient `linear-gradient(to top, rgba(10,22,6,0.85), transparent)` — không được ẩn sau hover (mobile không có hover).
- Category + nút mũi tên tròn accent chỉ hiện khi hover.

### Card nội dung (news, services)
- Nền trắng, border `--color-border`, radius `20px`, hover shadow nhẹ.
- Badge category: pill trắng/brand, uppercase, text-xs.

---

## 8. Animations

- Scroll reveal chuẩn: attribute `data-animate` (globals.css) hoặc Framer Motion `useInView({ once: true })` — fade-up 28px, ~0.7s, ease `cubic-bezier(0.25,0.46,0.45,0.94)`.
- Hero: class `.hero-reveal` (0.85s).
- Stagger: `delay: index * 0.05–0.1`.
- Decorative float: `float-bob-y` / `float-bob-x`.
- Luôn guard bằng `useReducedMotion()` cho animation liên tục/auto-play.

---

## 9. Hình ảnh

- Upload qua Cloudinary (`CloudinaryUpload` / `CloudinaryGalleryUpload` trong admin) — ảnh production phải nằm trên Cloudinary.
- ❌ **Không hotlink ảnh stock (unsplash.com...) trong dữ liệu thật** — chỉ chấp nhận làm placeholder dev. Ảnh dự án phải là ảnh công trình thật, đúng nội dung.
- `next/image` với `sizes` đúng breakpoint; ảnh hero/featured thêm `priority`.
- Luôn có fallback khi ảnh lỗi (placeholder, không để vỡ layout).

---

## 10. Accessibility

- Touch target ≥ 44×44px cho mọi element tương tác.
- Focus visible: `focus-visible:ring-2` màu brand/accent — không bao giờ `outline: none` trần.
- `aria-label` cho icon-only buttons, `aria-current="page"` cho nav active.
- Contrast ≥ 4.5:1 cho body text. Lưu ý: text lime `#C7DC49` chỉ đạt chuẩn trên nền tối; trên nền trắng phải dùng `--color-brand`.
- `prefers-reduced-motion` được tôn trọng.

---

## 11. Checklist khi tạo section/component mới

- [ ] Màu lấy từ CSS var trong `globals.css` — không hardcode hex mới
- [ ] Heading dùng font display (mặc định qua h1–h6), body Public Sans
- [ ] Section bọc `.leafix-section` + container `max-w-[1400px]`
- [ ] Nút theo mẫu mục 4 (uppercase + arrow icon)
- [ ] Card ảnh: title luôn visible, không phụ thuộc hover
- [ ] Ảnh từ Cloudinary, có `sizes`, có fallback
- [ ] Scroll reveal `data-animate` hoặc `useInView once`
- [ ] A11y: focus ring, aria-label, touch 44px, reduced motion
