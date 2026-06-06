'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    quoteVi: 'Sự tận tâm của Lapla trong việc hiện thực hóa tầm nhìn của chúng tôi thật đặc biệt. Họ biến khu vườn bình thường thành một ốc đảo yên tĩnh tuyệt vời. Sự chú ý đến từng chi tiết và phương pháp bền vững thực sự gây ấn tượng.',
    quoteEn: "Lapla's dedication to bringing our vision to life was exceptional. They transformed our space into a stunning haven of tranquility. Their attention to detail and sustainable practices impressed us greatly.",
    authorVi: 'Nguyễn Minh Tuấn',
    authorEn: 'Steve Evans',
    roleVi: 'CEO, Tập đoàn Hưng Thịnh',
    roleEn: 'CEO, Helsy Company',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
    rating: 5,
  },
  {
    quoteVi: 'Chúng tôi rất hài lòng với kết quả cuối cùng. Đội ngũ Lapla làm việc chuyên nghiệp, đúng tiến độ và luôn lắng nghe ý kiến trong suốt quá trình thi công.',
    quoteEn: 'We are very satisfied with the final result. The Lapla team worked professionally, on schedule and always listened to our feedback throughout the construction process.',
    authorVi: 'Trần Thu Hà',
    authorEn: 'Tran Thu Ha',
    roleVi: 'Giám đốc, Vingroup',
    roleEn: 'Director, Vingroup',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
    rating: 5,
  },
  {
    quoteVi: 'Khu vườn mà Lapla thiết kế cho khu nghỉ dưỡng đã trở thành điểm nhấn được khách hàng yêu thích nhất. Chuyên nghiệp từ thiết kế đến thi công và bàn giao.',
    quoteEn: 'The garden Lapla designed for our resort has become the most beloved highlight for guests. Professional from design through construction to handover.',
    authorVi: 'Lê Hoàng Nam',
    authorEn: 'Le Hoang Nam',
    roleVi: 'Chủ đầu tư, Fusion Resort',
    roleEn: 'Investor, Fusion Resort',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg',
    rating: 5,
  },
];

const galleryImages = [
  'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
  'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png',
];

export default function TestimonialsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: 'var(--color-surface-raised)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Images + rating */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Two stacked images */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded overflow-hidden" style={{ height: '360px' }}>
                  <Image src={galleryImages[0]} alt="Garden" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="relative rounded overflow-hidden mt-10" style={{ height: '360px' }}>
                  <Image src={galleryImages[1]} alt="Garden" fill className="object-cover" sizes="25vw" />
                </div>
              </div>

              {/* Rating card */}
              <div
                className="absolute -bottom-6 left-6 bg-white rounded px-6 py-5"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
              >
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: '#f59e0b' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-display font-bold text-2xl" style={{ color: 'var(--color-brand)' }}>4.9 / 5.0</p>
                <p className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
                  {isVi ? 'Từ 3k+ khách hàng' : 'From 3k+ Members'}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Quote */}
          <ScrollReveal direction="right" delay={2}>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Khách hàng nói gì' : 'Client Feedback'}
            </p>
            <h2
              className="font-display font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#111111' }}
            >
              {isVi
                ? <>Những gì khách hàng<br /><span style={{ color: 'var(--color-brand)' }}>nói về chúng tôi</span></>
                : <>What Our Clients Say<br /><span style={{ color: 'var(--color-brand)' }}>About Our Work</span></>
              }
            </h2>

            {/* Quote block */}
            <div className="relative">
              {/* Big quote mark */}
              <div
                className="absolute -top-4 -left-2 font-serif font-black leading-none select-none"
                style={{ fontSize: '6rem', color: 'var(--color-brand)', opacity: 0.12 }}
                aria-hidden
              >
                "
              </div>

              <div key={current} style={{ animation: 'fadeSlideUp 0.4s ease forwards' }}>
                <p
                  className="text-base md:text-lg leading-relaxed font-light italic mb-8"
                  style={{ color: 'var(--color-text-secondary)', lineHeight: '30px' }}
                >
                  &ldquo;{isVi ? t.quoteVi : t.quoteEn}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image src={t.image} alt={isVi ? t.authorVi : t.authorEn} fill className="object-cover" sizes="56px" />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: '#111111' }}>
                      {isVi ? t.authorVi : t.authorEn}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-brand)' }}>
                      {isVi ? t.roleVi : t.roleEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" style={{ color: '#f59e0b' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-11 h-11 flex items-center justify-center border transition-all duration-200 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] group"
                style={{ borderColor: '#d0d0d0', color: 'var(--color-text-secondary)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-11 h-11 flex items-center justify-center transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2 ml-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === current ? '28px' : '8px',
                      height: '4px',
                      backgroundColor: i === current ? 'var(--color-accent)' : '#d0d0d0',
                    }}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
