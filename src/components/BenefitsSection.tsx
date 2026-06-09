'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const CARDS = [
  {
    titleVi: 'Tăng Giá Trị Bất Động Sản',
    titleEn: 'Increase Property Value',
    descVi: 'Cảnh quan chuyên nghiệp có thể tăng giá trị bất động sản lên đến 15–20%, tạo ấn tượng mạnh cho người mua tiềm năng.',
    descEn: 'Professional landscaping can increase property value by up to 15–20%, creating a strong impression for potential buyers.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    titleVi: 'Cải Thiện Chất Lượng Sống',
    titleEn: 'Improve Quality of Life',
    descVi: 'Không gian xanh mang lại sự thư giãn, giảm stress và tạo môi trường sống trong lành, hài hòa với thiên nhiên.',
    descEn: 'Green spaces bring relaxation, reduce stress and create a healthy living environment in harmony with nature.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    titleVi: 'Bảo Vệ Môi Trường',
    titleEn: 'Environmental Protection',
    descVi: 'Giải pháp cảnh quan bền vững giúp giảm nhiệt đô thị, lọc không khí và bảo tồn đa dạng sinh học hiệu quả.',
    descEn: 'Sustainable landscaping helps reduce urban heat, filter air and effectively conserve biodiversity.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
      </svg>
    ),
  },
  {
    titleVi: 'Tối Ưu Hóa Không Gian',
    titleEn: 'Space Optimization',
    descVi: 'Thiết kế thông minh tận dụng tối đa diện tích, biến khoảng trống thành không gian chức năng đẹp và tiện ích.',
    descEn: 'Smart design maximizes space, turning empty areas into beautiful, functional spaces that enhance everyday living.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
];

export default function BenefitsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section
      className="leafix-section overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-surface-alt)' }}
    >
      {/* Faint botanical bg pattern */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10 C60 10 40 30 40 55 C40 70 50 80 60 80 C70 80 80 70 80 55 C80 30 60 10 60 10Z' stroke='%230f541e' stroke-width='0.6' fill='none' opacity='0.15'/%3E%3Cpath d='M60 80 L60 110' stroke='%230f541e' stroke-width='0.6' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-brand)' }}>
            {isVi ? 'Lợi ích' : 'Our Benefits'}
          </p>
          <h2
            className="font-display font-bold mx-auto"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#111111', maxWidth: '640px', lineHeight: 1.15 }}
          >
            {isVi
              ? <>Giải pháp cho cảnh quan<br />dân dụng và thương mại</>
              : <>Solutions for Residential and<br />Commercial Landscaping</>}
          </h2>
        </ScrollReveal>

        {/* 4-col cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <ScrollReveal key={card.titleEn} delay={i % 4} duration={650}>
              <div
                className="group bg-white flex flex-col h-full transition-all duration-300 overflow-hidden relative"
                style={{
                  borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(15,84,30,0.14)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Top: title + icon */}
                <div className="flex items-start justify-between gap-3 p-6 pb-4">
                  <h3
                    className="font-display font-bold leading-snug"
                    style={{ fontSize: '1.05rem', color: '#111111', maxWidth: '75%' }}
                  >
                    {isVi ? card.titleVi : card.titleEn}
                  </h3>
                  <div
                    className="shrink-0 w-11 h-11 flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--color-brand)] group-hover:text-white"
                    style={{
                      backgroundColor: 'rgba(15,84,30,0.07)',
                      color: 'var(--color-brand)',
                      borderRadius: '12px',
                    }}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Image */}
                <div className="relative mx-4 overflow-hidden" style={{ height: '180px', borderRadius: '12px' }}>
                  <Image
                    src={card.image}
                    alt={isVi ? card.titleVi : card.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Description */}
                <p
                  className="px-6 pt-4 pb-4 text-sm leading-relaxed flex-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {isVi ? card.descVi : card.descEn}
                </p>

                {/* Footer: VIEW DETAILS */}
                <div className="px-6 pb-6 flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-accent)', borderRadius: '8px' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="#111" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                  <Link
                    href={`/${locale}/services`}
                    className="text-xs font-black uppercase tracking-widest transition-colors duration-200 group-hover:text-[var(--color-brand)]"
                    style={{ color: '#111111' }}
                  >
                    {isVi ? 'Xem chi tiết' : 'View Details'}
                  </Link>
                </div>

                {/* Decorative leaf bottom-right */}
                <div className="absolute bottom-0 right-0 pointer-events-none" aria-hidden style={{ opacity: 0.06 }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path d="M70 10 C70 10 30 20 20 50 C14 68 25 80 40 75 C60 68 75 45 70 10Z" fill="#0f541e" />
                    <path d="M40 75 L55 40" stroke="#0f541e" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom text */}
        <ScrollReveal delay={2} className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {isVi ? 'Chúng tôi là công ty cảnh quan độc lập lớn nhất · ' : 'We Are the Largest Independent Landscaping Company · '}
            <Link href={`/${locale}/services`} className="font-bold" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Xem tất cả dịch vụ →' : 'View All Services →'}
            </Link>
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
