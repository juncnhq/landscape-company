'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quoteVi: 'Họ cải tạo bãi cỏ của chúng tôi thật tuyệt vời. Lớp cỏ nhân tạo trông tươi mới, đều và rất chuyên nghiệp. Đội ngũ làm việc tận tâm và luôn cập nhật tiến độ cho chúng tôi. Chúng tôi rất hài lòng với kết quả.',
    quoteEn: 'They improved our lawn beautifully. The turfing looks fresh, even, and very professionally done. The team worked with care and kept us updated throughout the process. We\'re really happy with the final result.',
    authorVi: 'Nguyễn Minh Tuấn', authorEn: 'Jacob Jones',
    roleVi: 'Giám đốc dự án', roleEn: 'Senior Project Manager',
    avatar: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
    rating: 5,
  },
  {
    quoteVi: 'Dịch vụ thiết kế cảnh quan của Lapla thực sự ấn tượng. Họ biến khoảng sân trống của chúng tôi thành không gian xanh đẹp mắt, đúng với tầm nhìn chúng tôi mong muốn.',
    quoteEn: 'Lapla\'s landscape design is truly impressive. They transformed our empty yard into a beautiful green space, exactly matching the vision we had in mind.',
    authorVi: 'Trần Thu Hà', authorEn: 'Jenny Wilson',
    roleVi: 'Chủ đầu tư bất động sản', roleEn: 'Real Estate Investor',
    avatar: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
    rating: 5,
  },
  {
    quoteVi: 'Từ tư vấn đến thi công, Lapla luôn chuyên nghiệp và đúng tiến độ. Dự án sân vườn resort hoàn thành vượt kỳ vọng.',
    quoteEn: 'From consultation to construction, Lapla has been professional and on schedule. Our resort garden project was completed beyond expectations.',
    authorVi: 'Lê Hoàng Nam', authorEn: 'Robert Chen',
    roleVi: 'Giám đốc điều hành resort', roleEn: 'Resort General Manager',
    avatar: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg',
    rating: 5,
  },
];

// Two collage images on the left (same as testi-01 / testi-02 in Leafix)
const IMG_TOP    = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg';
const IMG_BOTTOM = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png';

export default function TestimonialsSection() {
  const locale  = useLocale();
  const isVi    = locale === 'vi';
  const [cur, setCur] = useState(0);

  const prev = () => setCur(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCur(c => (c + 1) % testimonials.length);
  const t = testimonials[cur];

  return (
    <section
      className="leafix-section relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface-raised)' }}
    >
      {/* Botanical grass background — testi-shape-01.png */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: 'url(/images/shapes/testi-shape-01.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-[1440px] lg:max-w-[80%] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Rating + D-shape collage ── */}
          <div className="flex flex-col gap-6">

            {/* Rating badge */}
            <div className="flex items-center gap-4">
              <span
                className="font-display font-black"
                style={{ fontSize: '3rem', lineHeight: 1, color: 'var(--color-brand)' }}
              >
                4.8
              </span>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-xs leading-snug" style={{ color: 'var(--color-text-muted)' }}>
                  {isVi ? 'Từ 3k thành viên,\nĐánh giá bởi Google' : 'From 3k Members,\nReviewed by Google'}
                </p>
              </div>
            </div>

            {/* D-shape image collage — flat left, rounded right */}
            <div className="relative" style={{ height: 400 }}>
              {/* Large D-shape container */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: '0 999px 999px 0',
                  maxWidth: '85%',
                }}
              >
                {/* Top image fills top half of D */}
                <div className="absolute inset-0 top-0" style={{ height: '55%' }}>
                  <Image
                    src={IMG_TOP}
                    alt="landscape project"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Bottom image fills bottom half */}
                <div className="absolute bottom-0 left-0 right-0" style={{ top: '55%' }}>
                  <Image
                    src={IMG_BOTTOM}
                    alt="landscape work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Thin divider between two images */}
                <div
                  className="absolute left-0 right-0 z-10"
                  style={{ top: 'calc(55% - 2px)', height: 4, backgroundColor: 'var(--color-surface-raised)' }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Quote content ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <p
              className="font-bold uppercase tracking-[0.3em] mb-4"
              style={{ fontSize: '0.7rem', color: 'var(--color-brand)' }}
            >
              {isVi ? 'Phản hồi khách hàng' : 'Client Feedback'}
            </p>

            {/* Heading */}
            <h2
              className="font-display font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi
                ? <>Khách hàng nói gì về các<br />dự án của <span style={{ color: 'var(--color-brand)' }}>Lapla</span></>
                : <>What the Best Clients Have<br />to Say About <span style={{ color: 'var(--color-brand)' }}>What We Did</span></>
              }
            </h2>

            {/* Quote mark */}
            <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="mb-5 shrink-0">
              <path
                d="M0 40V26.667C0 12 7.333 3.333 22 0L24 3.333C16.667 6 13 11.333 13 16.667H21.333V40H0ZM28 40V26.667C28 12 35.333 3.333 50 0L52 3.333C44.667 6 41 11.333 41 16.667H49.333V40H28Z"
                fill="var(--color-brand)"
                opacity="0.2"
              />
            </svg>

            {/* Quote — animates on change */}
            <div key={cur} style={{ animation: 'tFade 0.4s ease' }}>
              <p
                className="leading-relaxed mb-8 font-medium"
                style={{
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                  lineHeight: '30px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                &ldquo;{isVi ? t.quoteVi : t.quoteEn}&rdquo;
              </p>

              {/* Author + arrows */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="relative overflow-hidden shrink-0"
                    style={{ width: 56, height: 56, borderRadius: '50%' }}
                  >
                    <Image
                      src={t.avatar}
                      alt={isVi ? t.authorVi : t.authorEn}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                      {isVi ? t.authorVi : t.authorEn}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {isVi ? t.roleVi : t.roleEn}
                    </p>
                  </div>
                </div>

                {/* Prev / Next arrows */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      border: '1.5px solid rgba(0,0,0,0.15)',
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-brand)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-brand)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.15)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      border: '1.5px solid rgba(0,0,0,0.15)',
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-brand)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-brand)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.15)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes tFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
