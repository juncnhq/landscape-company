'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const leafIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 3 8 3 13c0 4.5 3.5 8 9 9 5.5-1 9-4.5 9-9 0-5-4-10-9-10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
  </svg>
);

export default function AboutSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  const listItems = isVi ? [
    'Đội ngũ cảnh quan chuyên nghiệp',
    'Thực hành bền vững',
    'Giải pháp ngoài trời tùy chỉnh',
    'Dịch vụ đáng tin cậy',
  ] : [
    'Expert Landscaping Team',
    'Sustainable Practices',
    'Custom Outdoor Solutions',
    'Trusted & Reliable Service',
  ];

  const stats = [
    { value: '25k+', label: isVi ? 'Cây đã trồng' : 'Plants Grown' },
    { value: '350+', label: isVi ? 'Vườn thiết kế' : 'Gardens Designed' },
    { value: '100%', label: isVi ? 'Chất lượng cây' : 'Plant Quality' },
  ];

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">

          {/* LEFT — tall image + stats card */}
          <ScrollReveal direction="left">
            <div className="relative" style={{ height: '680px' }}>

              {/* Main tall image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: '20px' }}
              >
                <Image
                  src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png"
                  alt="Landscape garden"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Stats card — absolute bottom-left, overlapping image */}
              <div
                className="absolute"
                style={{
                  bottom: '40px',
                  left: '-24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
                  minWidth: '200px',
                  zIndex: 10,
                }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.value}
                    style={{
                      paddingBottom: i < stats.length - 1 ? '20px' : 0,
                      marginBottom: i < stats.length - 1 ? '20px' : 0,
                      borderBottom: i < stats.length - 1 ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <h3
                      className="font-display font-bold leading-none"
                      style={{ fontSize: '2rem', color: 'var(--color-brand)' }}
                    >
                      {s.value}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — small image + text */}
          <ScrollReveal direction="right" delay={2}>
            <div>
              {/* Small image top-right */}
              <div
                className="overflow-hidden mb-8 ml-auto hidden lg:block"
                style={{
                  width: '220px',
                  height: '160px',
                  borderRadius: '14px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                }}
              >
                <Image
                  src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png"
                  alt="Garden detail"
                  width={220}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Sub-title */}
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Về chúng tôi' : 'Learn about us'}
              </p>

              {/* Heading */}
              <h2
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#111111' }}
              >
                {isVi
                  ? <>Kiến tạo không gian xanh<br />truyền cảm hứng sống</>
                  : <>Crafting Green Spaces<br />That Inspire Living</>
                }
              </h2>

              {/* Body text */}
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)', lineHeight: '28px', fontSize: '15px' }}>
                {isVi
                  ? 'Chúng tôi là công ty cảnh quan chuyên nghiệp, tận tâm biến đổi không gian ngoài trời thành những môi trường đẹp, tiện ích và bền vững.'
                  : 'We are a professional gardening and landscaping company dedicated to transforming outdoor spaces into beautiful, functional, and sustainable environments.'
                }
              </p>

              {/* 2-column feature list with leaf icons */}
              <div
                className="grid grid-cols-2 gap-x-6 gap-y-4 mb-10"
              >
                {listItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="shrink-0 mt-0.5">{leafIcon}</div>
                    <span className="text-sm font-medium" style={{ color: '#333333' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  color: '#ffffff',
                  padding: '15px 32px',
                  borderRadius: '10px',
                }}
              >
                {isVi ? 'Khám phá dự án' : 'Explore Project'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
