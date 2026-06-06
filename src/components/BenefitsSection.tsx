'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    titleVi: 'Đội ngũ chuyên gia cảnh quan',
    titleEn: 'Experienced Gardening Experts',
    descVi: 'Đội ngũ của chúng tôi có nhiều năm kinh nghiệm thực tế trong lĩnh vực cảnh quan.',
    descEn: 'Our skilled team brings years of hands-on experience in gardening and landscaping.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    titleVi: 'Vật liệu & công cụ chất lượng',
    titleEn: 'Quality Materials & Tools',
    descVi: 'Chúng tôi sử dụng các vật liệu và công cụ tốt nhất cho mọi dự án cảnh quan.',
    descEn: 'We use only the best materials and tools for every landscaping project.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    titleVi: 'Thiết kế tùy chỉnh',
    titleEn: 'Customized Design Approach',
    descVi: 'Mỗi dự án được thiết kế riêng biệt, phù hợp với nhu cầu và phong cách của khách hàng.',
    descEn: 'Each project is uniquely designed to match your personal style and vision.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    titleVi: 'Đúng hẹn & đáng tin cậy',
    titleEn: 'On-Time & Reliable Service',
    descVi: 'Chúng tôi cam kết hoàn thành dự án đúng tiến độ mà không ảnh hưởng đến chất lượng.',
    descEn: 'We respect your time and deliver projects on schedule without compromise.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

export default function BenefitsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — image + phone card */}
          <ScrollReveal direction="left">
            <div className="relative" style={{ height: '580px' }}>
              <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '20px' }}>
                <Image
                  src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg"
                  alt="Garden expertise"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Phone card — bottom left */}
              <div
                className="absolute"
                style={{
                  bottom: '32px',
                  left: '24px',
                  backgroundColor: 'var(--color-brand)',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  zIndex: 10,
                  minWidth: '220px',
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {isVi ? 'Cần hỗ trợ?' : 'Need Any Help'}
                </p>
                <a href="tel:+84000000000" className="font-display font-bold text-white text-lg hover:opacity-80 transition-opacity">
                  +84 000 000 000
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — heading + CTA + 4 features */}
          <ScrollReveal direction="right" delay={2}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Dịch vụ của chúng tôi' : 'Our Services'}
              </p>
              <h2
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--color-text-primary)' }}
              >
                {isVi
                  ? <>Kiến tạo không gian xanh<br />với tâm huyết & chuyên môn</>
                  : <>Growing Beautiful Spaces with<br />Care & Expertise</>
                }
              </h2>

              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 mb-10"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-xl)',
                }}
              >
                {isVi ? 'Yêu cầu báo giá' : 'Request A Quote'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {/* 4 features */}
              <div className="space-y-6">
                {features.map((f) => (
                  <div key={f.titleEn} className="flex gap-4 items-start">
                    <div
                      className="shrink-0 w-12 h-12 flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--color-surface-alt)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-brand)',
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
                        {isVi ? f.titleVi : f.titleEn}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {isVi ? f.descVi : f.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
