'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import AnimatedHeading from './AnimatedHeading';

const STATS = [
  { value: '200+', labelVi: 'Dự án hoàn thành',    labelEn: 'Projects Completed' },
  { value: '17+',  labelVi: 'Năm kinh nghiệm',     labelEn: 'Years Experience' },
  { value: '98%',  labelVi: 'Khách hàng hài lòng', labelEn: 'Client Satisfaction' },
];

const IMG_MAIN  = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg';
const IMG_SMALL = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png';

export default function AboutSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  const features = isVi
    ? ['Đội ngũ cảnh quan chuyên nghiệp', 'Giải pháp ngoài trời tùy chỉnh', 'Thực hành bền vững', 'Dịch vụ đáng tin cậy']
    : ['Expert Landscaping Team', 'Custom Outdoor Solutions', 'Sustainable Practices', 'Trusted & Reliable Service'];

  return (
    <section className="leafix-section relative" style={{ backgroundColor: '#ffffff' }}>
      {/* Decorative potted plants — top-right, peeks out like Leafix */}
      <img
        src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1781085045/shapes/about-shape-01.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ top: '-10px', right: '-8px', width: '160px', opacity: 0.85, animation: 'float-bob-y 4s ease-in-out infinite', zIndex: 20 }}
      />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: image collage ── */}
          <ScrollReveal direction="left">
            {/* Outer container: needs pb for the stat card that hangs below */}
            <div className="relative" style={{ paddingBottom: '40px' }}>

              {/* Dashed border shape — offset top-right behind main image */}
              <div
                className="absolute"
                style={{
                  top: '24px',
                  left: '24px',
                  right: '-8px',
                  bottom: '64px',
                  borderRadius: '20px',
                  border: '2px dashed rgba(15,84,30,0.25)',
                  zIndex: 0,
                }}
              />

              {/* Main portrait image */}
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: '20px', zIndex: 1, height: '620px' }}
              >
                <Image
                  src={IMG_MAIN}
                  alt={isVi ? 'Cảnh quan Lapla' : 'Lapla landscaping'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Stat card — overlapping bottom of image */}
              <div
                className="absolute"
                style={{
                  bottom: '80px',
                  left: '36px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px 28px',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                  zIndex: 2,
                  minWidth: '200px',
                }}
              >
                {STATS.map((s, i) => (
                  <div
                    key={s.value}
                    style={{
                      paddingBottom: i < STATS.length - 1 ? '14px' : 0,
                      marginBottom: i < STATS.length - 1 ? '14px' : 0,
                      borderBottom: i < STATS.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    }}
                  >
                    <p
                      className="font-display font-black leading-none"
                      style={{ fontSize: '1.75rem', color: 'var(--color-text-primary)' }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? s.labelVi : s.labelEn}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </ScrollReveal>

          {/* ── RIGHT: small image + text ── */}
          <ScrollReveal direction="right" delay={2}>
            <div className="flex flex-col gap-8">

              {/* Small landscape image — top of right col */}
              <div
                className="relative overflow-hidden w-full"
                style={{ height: '220px', borderRadius: '20px' }}
              >
                <Image
                  src={IMG_SMALL}
                  alt={isVi ? 'Thi công cảnh quan' : 'Landscape construction'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Text content */}
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
                  {isVi ? 'Về chúng tôi' : 'Learn About Us'}
                </p>

                <AnimatedHeading
                  className="font-display font-bold leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: 'var(--color-text-primary)' }}
                >
                  {isVi ? 'Kiến tạo không gian xanh truyền cảm hứng sống' : 'Crafting Green Spaces That Inspire Living'}
                </AnimatedHeading>

                <p className="mb-6 leading-relaxed text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '26px' }}>
                  {isVi
                    ? 'Lapla là đơn vị cảnh quan chuyên nghiệp với hơn 17 năm kinh nghiệm, tận tâm biến mọi không gian ngoài trời thành những môi trường xanh đẹp, tiện ích và bền vững.'
                    : 'We are a professional landscaping company dedicated to transforming outdoor spaces into beautiful, functional, and sustainable environments.'}
                </p>

                {/* 2-col feature list */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {features.map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <img src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1781085048/shapes/leaf-icon.png" alt="" aria-hidden="true" width="20" height="20" style={{ objectFit: 'contain' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <Link
                  href={`/${locale}/projects`}
                  className="inline-flex items-center gap-2.5 text-sm font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-text-primary)',
                    padding: '14px 32px',
                    borderRadius: '8px',
                  }}
                >
                  {isVi ? 'Khám phá dự án' : 'Explore Project'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
