'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    titleVi: 'Thiết kế & Thi công',
    titleEn: 'Garden Design',
    descVi: 'Kiến tạo không gian xanh hoàn hảo từ sân vườn đến nội thất xanh.',
    descEn: 'Crafting perfect green spaces for your home, indoors and out.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
  },
  {
    titleVi: 'Tuyển chọn cây xanh',
    titleEn: 'Plants & Trees',
    descVi: 'Tuyển chọn và cung cấp cây xanh, thảm cỏ chất lượng cao.',
    descEn: 'Selecting perfect plants and greenery for every project.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png',
  },
  {
    titleVi: 'Cảnh quan cứng',
    titleEn: 'Hard Scaping',
    descVi: 'Thiết kế lối đi, sân đá, hồ nước, tiểu cảnh nghệ thuật.',
    descEn: 'Pathways, stone patios, water features and art installations.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
  },
  {
    titleVi: 'Cảnh quan công cộng',
    titleEn: 'Public Garden',
    descVi: 'Cảnh quan cho công viên, khu đô thị và không gian công cộng.',
    descEn: 'Parks, urban developments and public green spaces.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
  },
  {
    titleVi: 'Bảo dưỡng cảnh quan',
    titleEn: 'Maintenance',
    descVi: 'Dịch vụ bảo dưỡng định kỳ để không gian xanh luôn tươi đẹp.',
    descEn: 'Regular maintenance to keep green spaces vibrant year-round.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg',
  },
  {
    titleVi: 'Sân Golf & Resort',
    titleEn: 'Golf & Resort',
    descVi: 'Thiết kế sân golf và cảnh quan resort 5 sao đẳng cấp quốc tế.',
    descEn: 'World-class golf course and luxury resort landscape design.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
  },
  {
    titleVi: 'Nội thất xanh',
    titleEn: 'Indoor Green',
    descVi: 'Giải pháp cây xanh trong nhà, văn phòng và không gian thương mại.',
    descEn: 'Indoor plant solutions for homes, offices and commercial spaces.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png',
  },
  {
    titleVi: 'Hệ thống tưới tiêu',
    titleEn: 'Irrigation Systems',
    descVi: 'Thiết kế và lắp đặt hệ thống tưới tiêu thông minh, tiết kiệm nước.',
    descEn: 'Smart irrigation design and installation for efficient water use.',
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
  },
];

export default function OurServicesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="absolute inset-0 pointer-events-none select-none" style={{ backgroundImage: 'url(/images/shapes/service-bg-shape.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover', opacity: 0.35 }} />
      {/* Decorative background text */}
      <div
        className="absolute top-0 right-0 font-display font-bold select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(8rem, 18vw, 18rem)',
          color: 'rgba(130,180,64,0.06)',
          lineHeight: 1,
          top: '-2rem',
          right: '-2rem',
        }}
      >
        GREEN
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Giải pháp cảnh quan' : 'Our Solutions'}
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi
                ? <>Giải pháp cho cảnh quan<br />dân dụng và thương mại</>
                : <>Solutions for Residential<br />and Commercial Landscaping</>
              }
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:gap-3"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dịch vụ' : 'View All Services'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service, i) => (
            <ScrollReveal key={service.titleEn} delay={i % 4} duration={650}>
              <Link
                href={`/${locale}/services`}
                className="group block bg-white overflow-hidden transition-all duration-300 h-full"
                style={{ borderRadius: '30px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(130,180,64,0.22)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={isVi ? service.titleVi : service.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: 'rgba(130,180,64,0.3)' }}
                  />
                </div>

                {/* Body */}
                <div style={{ padding: '35px 30px' }}>
                  <h3
                    className="font-display font-bold text-base mb-2 transition-colors duration-200 group-hover:text-[var(--color-brand)]"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {isVi ? service.titleVi : service.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {isVi ? service.descVi : service.descEn}
                  </p>

                  {/* Arrow button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>
                      {isVi ? 'Xem chi tiết' : 'View Details'}
                    </span>
                    <div
                      className="w-8 h-8 flex items-center justify-center text-white transition-all duration-200 group-hover:scale-110"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA text */}
        <ScrollReveal delay={2} className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {isVi
              ? 'Chúng tôi là công ty cảnh quan độc lập lớn nhất · '
              : 'We Are the Largest Independent Landscaping Company · '}
            <Link
              href={`/${locale}/services`}
              className="font-bold transition-colors duration-200"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dịch vụ →' : 'View All Services →'}
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
