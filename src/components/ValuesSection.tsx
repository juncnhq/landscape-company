'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const values = [
  {
    titleVi: 'Toàn diện & Chất lượng',
    titleEn: 'Comprehensive Quality',
    descVi: 'Lapla mang đến giải pháp cảnh quan toàn diện, sáng tạo và chất lượng cho mọi công trình từ resort đến đô thị.',
    descEn: 'Lapla delivers comprehensive, creative and quality landscape solutions for every project, from resorts to urban developments.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    titleVi: 'Hệ sinh thái chuyên biệt',
    titleEn: 'Specialized Ecosystem',
    descVi: 'Lapla Group — hệ sinh thái gồm các công ty thành viên chuyên biệt, phối hợp đồng bộ từ thiết kế, thi công đến vận hành.',
    descEn: 'Lapla Group — an ecosystem of specialized member companies, collaborating seamlessly from design to operations.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    titleVi: 'Bền vững là nền tảng',
    titleEn: 'Sustainability First',
    descVi: 'Hài hòa giữa thiên nhiên – kiến trúc – con người, xây dựng không gian xanh bền vững theo thời gian.',
    descEn: 'Harmonizing nature, architecture, and people to build green spaces that endure through time.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    titleVi: 'Sáng tạo không giới hạn',
    titleEn: 'Boundless Creativity',
    descVi: 'Từ cảnh quan sân golf đến Artwork biểu tượng — mỗi công trình là một dấu ấn sáng tạo độc đáo.',
    descEn: 'From golf course landscapes to iconic artworks — every project bears the unique creative stamp of Lapla.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
];

export default function ValuesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#f5f9f0' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative rounded overflow-hidden" style={{ height: '500px' }}>
                <Image
                  src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png"
                  alt={isVi ? 'Cảnh quan Lapla' : 'Lapla Landscape'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating stats */}
              <div
                className="absolute bottom-6 right-6 bg-white rounded px-5 py-4"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
              >
                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <p className="font-display font-bold text-2xl" style={{ color: 'var(--color-brand)' }}>17+</p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'Năm KN' : 'Years'}
                    </p>
                  </div>
                  <div className="w-px h-10" style={{ backgroundColor: '#e8e8e8' }} />
                  <div className="text-center">
                    <p className="font-display font-bold text-2xl" style={{ color: 'var(--color-brand)' }}>200+</p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'Dự án' : 'Projects'}
                    </p>
                  </div>
                  <div className="w-px h-10" style={{ backgroundColor: '#e8e8e8' }} />
                  <div className="text-center">
                    <p className="font-display font-bold text-2xl" style={{ color: 'var(--color-brand)' }}>5★</p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'Đánh giá' : 'Rating'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Values */}
          <div>
            <ScrollReveal direction="right">
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Giá trị cốt lõi' : 'Our Core Values'}
              </p>
              <h2
                className="font-display font-bold leading-tight mb-8"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#111111' }}
              >
                {isVi
                  ? <span>Chúng tôi <span style={{ color: 'var(--color-brand)' }}>kiến tạo</span><br />vẻ đẹp xanh bền vững</span>
                  : <span>We Craft <span style={{ color: 'var(--color-brand)' }}>Green Beauty</span><br />That Endures</span>
                }
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <ScrollReveal key={v.titleEn} delay={i % 2} duration={600}>
                  <div
                    className="value-card group p-6 border transition-all duration-300 cursor-default"
                    style={{ borderColor: '#e8e8e8', backgroundColor: 'white' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = 'var(--color-accent)';
                      el.style.borderColor = 'var(--color-accent)';
                      el.querySelectorAll<HTMLElement>('[data-title]').forEach(x => x.style.color = 'white');
                      el.querySelectorAll<HTMLElement>('[data-desc]').forEach(x => x.style.color = 'rgba(255,255,255,0.8)');
                      el.querySelectorAll<HTMLElement>('[data-icon]').forEach(x => {
                        x.style.backgroundColor = 'rgba(255,255,255,0.2)';
                        x.style.color = 'white';
                      });
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = 'white';
                      el.style.borderColor = '#e8e8e8';
                      el.querySelectorAll<HTMLElement>('[data-title]').forEach(x => x.style.color = '#111111');
                      el.querySelectorAll<HTMLElement>('[data-desc]').forEach(x => x.style.color = 'var(--color-text-secondary)');
                      el.querySelectorAll<HTMLElement>('[data-icon]').forEach(x => {
                        x.style.backgroundColor = '#f5f9f0';
                        x.style.color = 'var(--color-text-primary)';
                      });
                    }}
                  >
                    <div
                      data-icon
                      className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300"
                      style={{ backgroundColor: '#f5f9f0', color: 'var(--color-brand)' }}
                    >
                      {v.icon}
                    </div>
                    <h3
                      data-title
                      className="font-bold text-base mb-2 transition-colors duration-300"
                      style={{ color: '#111111' }}
                    >
                      {isVi ? v.titleVi : v.titleEn}
                    </h3>
                    <p
                      data-desc
                      className="text-sm leading-relaxed transition-colors duration-300"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {isVi ? v.descVi : v.descEn}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={3} className="mt-8">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-3 px-7 py-3.5 text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px', }}
              >
                {isVi ? 'Về chúng tôi' : 'About Lapla'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
