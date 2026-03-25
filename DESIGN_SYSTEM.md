# FAM Landscape — Design System

> Tài liệu này ghi lại toàn bộ quy tắc UI/UX đang được áp dụng trong dự án.
> Mọi component mới cần tuân theo hướng dẫn này để đảm bảo nhất quán với brand.

---

## 1. Brand Colors

### Primary — Forest Green
| Token | Hex | Dùng cho |
|---|---|---|
| `green-500` | `#328442` | Buttons, badges, active states, icon accents |
| `green-400` | `#48a85a` | Hover states của green-500 |
| `green-600` | `#286b35` | Text on light bg, border accents |
| `green-900` | `#0a1f0f` | Rarely used dark green |

### Secondary — Gold
| Token | Hex | Dùng cho |
|---|---|---|
| `secondary-500` | `#BE7B2B` | Artwork/Labour accent, decorative glows |
| `secondary-400` | `#d4922f` | Hover, gradient end |

### Dark Backgrounds (dark sections)
| Value | Dùng cho |
|---|---|
| `#07130a` | Hero, Stats, Timeline, Footer, dark CTA — tất cả dark section |
| `#0a1f0f` | Thường dùng trong gradient, không dùng standalone |

> ❌ **Không dùng** `bg-black`, `bg-gray-900` cho dark sections — chỉ dùng `bg-[#07130a]`

### Light Backgrounds
| Value | Dùng cho |
|---|---|
| `#f7faf7` | Sections sáng có tinge xanh (Services list, Contact, About overview) |
| `#ffffff` | Cards, modals, panels |
| `#f0fdf4` (green-50) | Card highlight bg, icon bg, bullet list panels |

> ❌ **Không dùng** `bg-gray-50` — thay bằng `bg-[#f7faf7]`

---

## 2. Dark Section Recipe

Mọi section tối (`bg-[#07130a]`) cần có đủ 3 lớp overlay:

```tsx
{/* 1. Dot grid texture */}
<div
  className="absolute inset-0 opacity-[0.06]"
  style={{ backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)', backgroundSize: '32px 32px' }}
/>

{/* 2. Green ambient glow (top/center) */}
<div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-green-500/15 rounded-full blur-[140px] pointer-events-none" />

{/* 3. Gold accent glow (bottom-right, optional) */}
<div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-secondary-500/10 rounded-full blur-[80px] pointer-events-none" />

{/* Content phải có relative z-10 */}
<div className="relative z-10 ...">
```

---

## 3. Light Section Recipe

Sections sáng dùng subtle radial gradient (không cần dot grid):

```tsx
<section className="relative bg-[#f7faf7] overflow-hidden">
  {/* Optional: green glow corner */}
  <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
  ...
</section>
```

---

## 4. Typography

### Eyebrow labels (section sub-headers)
```tsx
// Dark bg
<p className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-3">

// Light bg
<p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-3">
```

### Section headings
```tsx
<h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">  // dark bg
<h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"> // light bg
```

### Body text
```tsx
<p className="text-gray-600 text-base leading-relaxed">  // light bg
<p className="text-gray-400 text-base leading-relaxed">  // dark bg
<p className="text-green-300/70 text-base leading-relaxed"> // dark bg (subtitle near CTA)
```

---

## 5. Buttons

### Primary (CTA chính)
```tsx
<button className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-green-400 transition-colors shadow-xl">
```

### Secondary (CTA trên dark bg)
```tsx
// White pill trên dark section — không còn dùng nữa, thay bằng primary green
```

### Outline (card CTA)
```tsx
<button
  className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2.5 transition-colors"
  style={{ backgroundColor: service.accentLight, color: service.accent, border: `1px solid ${service.accentBorder}` }}
>
```

---

## 6. Cards

### Standard light card
```tsx
<div className="relative rounded-2xl border border-green-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
  {/* Optional top accent bar — slide in on hover */}
  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 via-green-500 to-secondary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  ...
</div>
```

### Dark card (positions, jobs)
```tsx
<div className="bg-green-900/50 border border-green-800/60 hover:border-green-600 rounded-xl overflow-hidden transition-colors">
```

---

## 7. Service Cards (ServicesPageContent)

Mỗi service dùng 1 trong 2 màu brand:

| Services | accent | accentLight | accentBorder |
|---|---|---|---|
| Consulting, Construction, Golf, Materials | `#328442` | `#f0fdf4` | `#86efac` |
| Artwork, Labour | `#BE7B2B` | `#fdf8f0` | `#f0c87a` |

Top bar dùng gradient: `from: accent → to: accentBorder`

---

## 8. Animations (Framer Motion)

### Scroll-triggered fade-up (standard)
```tsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 32 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
```

### Staggered children
```tsx
transition={{ duration: 0.6, delay: index * 0.1 }}
```

### Clip-path wipe (ProjectsSection style — more dramatic)
```tsx
initial={{ clipPath: 'inset(100% 0 0 0)' }}
animate={{ clipPath: 'inset(0% 0 0 0)' }}
transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
```

### Hover lift (social icons, small cards)
```tsx
<motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
```

### Pulsing ring (play button, CTA emphasis)
```tsx
animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
```

### useReducedMotion (accessibility)
```tsx
// Luôn dùng trong HeroSection và Navbar
const prefersReduced = useReducedMotion();
const duration = prefersReduced ? 0 : 0.8;
```

---

## 9. Accessibility

- Touch targets: `min-h-[44px]` cho tất cả interactive elements
- Focus rings: `focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2`
- `aria-label` trên icon-only buttons
- `aria-current="page"` trên active nav links
- Skip link trong Navbar: `<a href="#main-content">`
- `useReducedMotion()` hook để disable animation khi user prefer

---

## 10. Page Hero Pattern

Tất cả inner pages (About, Services, Careers, News, Projects) dùng cùng hero pattern:

```tsx
<section className="relative bg-[#07130a] pt-36 md:pt-48 pb-20 md:pb-28 overflow-hidden">
  {/* Dot grid */}
  <div className="absolute inset-0 opacity-[0.07]"
    style={{ backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
  {/* Green glow */}
  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-green-500/15 rounded-full blur-[140px] pointer-events-none" />
  {/* Gold accent */}
  <div className="absolute bottom-0 right-0 w-[400px] h-[250px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
      <p className="text-green-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6">EYEBROW</p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">Title</h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Subtitle</p>
    </motion.div>
    {/* Scroll indicator line */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-16 flex justify-center">
      <div className="w-px h-16 bg-gradient-to-b from-green-500/70 to-transparent" />
    </motion.div>
  </div>
</section>
```

---

## 11. Section Spacing

| Context | Classes |
|---|---|
| Standard section | `py-16 md:py-24` |
| Hero-sized section | `py-20 md:py-32` |
| Compact section | `py-12 md:py-20` |
| Container max-width | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Narrow content (forms, articles) | `max-w-3xl` hoặc `max-w-5xl` |

---

## 12. Component Checklist (khi tạo section mới)

- [ ] Dark bg → dùng `#07130a` + 3 overlay layers (dot grid, green glow, gold glow)
- [ ] Light bg → dùng `#f7faf7` (không phải `bg-gray-50`)
- [ ] Eyebrow label → `text-green-400` (dark) hoặc `text-green-600` (light)
- [ ] Scroll animation → `useInView` + `once: true`
- [ ] Cards → `border-green-100` + hover top accent bar gradient
- [ ] Buttons → `bg-green-500` primary, gold only cho special contexts
- [ ] Accessibility → `aria-label`, focus ring, min touch 44px
- [ ] `useReducedMotion()` nếu có auto-play hoặc continuous animation
