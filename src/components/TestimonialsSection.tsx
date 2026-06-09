'use client';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quoteVi: 'Họ cải tạo bãi cỏ của chúng tôi thật tuyệt vời. Lớp cỏ nhân tạo trông tươi mới, đều và rất chuyên nghiệp. Đội ngũ làm việc tận tâm và luôn cập nhật tiến độ cho chúng tôi. Chúng tôi rất hài lòng với kết quả cuối cùng.',
    quoteEn: "They improved our lawn beautifully. The turfing looks fresh, even, and very professionally done. The team worked with care and kept us updated throughout. We're really happy with the final result.",
    authorVi: 'Nguyễn Minh Tuấn', authorEn: 'Leslie Alexander',
    roleVi: 'Giám đốc dự án cấp cao', roleEn: 'Senior Project Manager',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
    rating: 5,
  },
  {
    quoteVi: 'Họ cải tạo bãi cỏ của chúng tôi thật tuyệt vời. Lớp cỏ nhân tạo trông tươi mới, đều và rất chuyên nghiệp. Đội ngũ làm việc tận tâm và luôn cập nhật tiến độ cho chúng tôi. Chúng tôi rất hài lòng với kết quả cuối cùng.',
    quoteEn: "They improved our lawn beautifully. The turfing looks fresh, even, and very professionally done. The team worked with care and kept us updated throughout. We're really happy with the final result.",
    authorVi: 'Trần Thu Hà', authorEn: 'Jenny Wilson',
    roleVi: 'Giám đốc dự án cấp cao', roleEn: 'Senior Project Manager',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
    rating: 5,
  },
  {
    quoteVi: 'Họ cải tạo bãi cỏ của chúng tôi thật tuyệt vời. Lớp cỏ nhân tạo trông tươi mới, đều và rất chuyên nghiệp. Đội ngũ làm việc tận tâm và luôn cập nhật tiến độ cho chúng tôi. Chúng tôi rất hài lòng với kết quả cuối cùng.',
    quoteEn: "They improved our lawn beautifully. The turfing looks fresh, even, and very professionally done. The team worked with care and kept us updated throughout. We're really happy with the final result.",
    authorVi: 'Lê Hoàng Nam', authorEn: 'Guy Hawkins',
    roleVi: 'Giám đốc dự án cấp cao', roleEn: 'Senior Project Manager',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg',
    rating: 5,
  },
  {
    quoteVi: 'Họ cải tạo bãi cỏ của chúng tôi thật tuyệt vời. Lớp cỏ nhân tạo trông tươi mới, đều và rất chuyên nghiệp. Đội ngũ làm việc tận tâm và luôn cập nhật tiến độ cho chúng tôi. Chúng tôi rất hài lòng với kết quả cuối cùng.',
    quoteEn: "They improved our lawn beautifully. The turfing looks fresh, even, and very professionally done. The team worked with care and kept us updated throughout. We're really happy with the final result.",
    authorVi: 'Vũ Thanh Tùng', authorEn: 'Emily Carter',
    roleVi: 'Giám đốc dự án cấp cao', roleEn: 'Senior Project Manager',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
    rating: 5,
  },
];

function QuoteMark() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" opacity="0.15">
      <path d="M0 32V18.667C0 8.533 5.867 2.667 17.6 0L19.2 2.667C13.333 4.8 10.4 9.067 10.4 13.333h6.933V32H0Zm22.4 0V18.667C22.4 8.533 28.267 2.667 40 0L41.6 2.667C35.733 4.8 32.8 9.067 32.8 13.333H39.733V32H22.4Z" fill="var(--color-brand)"/>
    </svg>
  );
}

export default function TestimonialsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [current, setCurrent] = useState(0);
  const [cols, setCols] = useState(3); // responsive columns

  useEffect(() => {
    const update = () => {
      setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // clamp current when cols change
  useEffect(() => {
    setCurrent(c => Math.min(c, testimonials.length - cols));
  }, [cols]);

  const maxIndex = Math.max(0, testimonials.length - cols);
  const gap = 20;
  const cardWidth = `calc((100% - ${gap * (cols - 1)}px) / ${cols})`;
  const offset = `calc(-${current} * (${cardWidth} + ${gap}px))`;

  return (
    <section className="leafix-section" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
            {isVi ? 'Khách hàng nói gì' : 'Testimonial'}
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: '#0e1a0f' }}>
            {isVi
              ? <>Đánh giá chân thành về các<br />dự án cải tạo vườn</>
              : <>Sincere Evaluations of Garden<br />Renovation Initiatives</>}
          </h2>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ gap: gap, transform: `translateX(${offset})` }}
          >
            {testimonials.map((t, idx) => (
              <div key={idx} className="shrink-0" style={{ width: cardWidth }}>
                <div
                  className="h-full flex flex-col p-6 sm:p-7"
                  style={{ border: '1px solid rgba(0,0,0,0.09)', borderRadius: 16, backgroundColor: '#fff' }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <QuoteMark />
                  </div>
                  <p className="flex-1 leading-relaxed mb-6" style={{ color: '#444', fontSize: '0.9rem', lineHeight: '26px' }}>
                    &ldquo;{isVi ? t.quoteVi : t.quoteEn}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 p-4" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: 10 }}>
                    <div className="relative shrink-0 overflow-hidden" style={{ width: 44, height: 44, borderRadius: '50%' }}>
                      <Image src={t.image} alt={isVi ? t.authorVi : t.authorEn} fill className="object-cover" sizes="44px" />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{isVi ? t.authorVi : t.authorEn}</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? t.roleVi : t.roleEn}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={() => setCurrent(c => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-2 text-sm font-bold transition-all disabled:opacity-30"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {isVi ? 'Trước' : 'Prev'}
          </button>
          <div className="flex-1 h-0.5 overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <div
              className="h-full transition-all duration-500"
              style={{ backgroundColor: 'var(--color-brand)', width: `${((current + 1) / (maxIndex + 1)) * 100}%` }}
            />
          </div>
          <button
            onClick={() => setCurrent(c => Math.min(maxIndex, c + 1))}
            disabled={current >= maxIndex}
            className="flex items-center gap-2 text-sm font-bold transition-all disabled:opacity-30"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {isVi ? 'Tiếp' : 'Next'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
