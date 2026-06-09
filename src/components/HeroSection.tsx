'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const heroImage = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png';
const cardThumbImage = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png';

export default function HeroSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      const bg = el.querySelector('.hero-bg') as HTMLElement;
      if (bg) bg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ marginTop: '-82px', minHeight: '100vh' }}
    >
      {/* Background */}
      <div className="hero-bg absolute inset-0 scale-110" style={{ willChange: 'transform' }}>
        <Image
          src={heroImage}
          alt="Landscape background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark overlay — matches Leafix gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(10,22,6,0.92) 0%, rgba(10,22,6,0.75) 55%, rgba(10,22,6,0.35) 100%)' }}
      />

      {/* Content — Leafix: paddingTop 320px, paddingBottom 120px */}
      <div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14"
        style={{ paddingTop: '320px', paddingBottom: '100px' }}
      >
        <div style={{ maxWidth: '720px' }}>

          {/* Eyebrow — Leafix uses var(--color-accent) in hero */}
          <p
            className="hero-reveal text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
            style={{ color: 'var(--color-accent)', animationDelay: '0ms' }}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: 'var(--color-accent)' }} />
            {isVi ? 'Dịch vụ cảnh quan hàng đầu' : 'Trusted Landscaping Professionals'}
          </p>

          {/* Heading — Leafix: 74px, white, Bricolage Grotesque */}
          <h1
            className="hero-reveal font-bold text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.6rem)',
              lineHeight: '1.14',
              letterSpacing: '-0.02em',
              animationDelay: '80ms',
              color: '#ffffff',
            }}
          >
            {isVi ? (
              <>Tạo Ra Những Không Gian<br />Xanh Tuyệt Đẹp, Tự Nhiên</>
            ) : (
              <>Creating Beautiful Outdoor<br />Spaces, Naturally</>
            )}
          </h1>

          {/* Description */}
          <p
            className="hero-reveal mb-8"
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: '16px',
              lineHeight: '28px',
              animationDelay: '160ms',
              maxWidth: '560px',
            }}
          >
            {isVi
              ? 'Trong lĩnh vực cảnh quan, các dịch vụ như tư vấn thiết kế, phân tích địa hình, kiểm soát cây cối và quản lý hệ thống tưới tiêu là không thể thiếu.'
              : 'In the realm of agriculture, services like crop consulting, soil analysis, pest control, and irrigation management are indispensable.'}
          </p>

          {/* CTA Buttons — Leafix exact: height 58px, borderRadius 10px */}
          <div
            className="hero-reveal flex flex-wrap items-center gap-4 mb-10"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-text-primary)',
                height: '58px',
                padding: '0 30px',
                borderRadius: '10px',
              }}
            >
              {isVi ? 'Xem dự án' : 'Explore Project'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-brand)',
                height: '58px',
                padding: '0 30px',
                borderRadius: '10px',
              }}
            >
              {isVi ? 'Yêu cầu báo giá' : 'Request A Quote'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Garden card — Leafix: absolute bottom-right, text LEFT image RIGHT */}
      <div
        className="hero-reveal hidden lg:flex items-center gap-5"
        style={{
          position: 'absolute',
          bottom: '140px',
          right: '56px',
          animationDelay: '320ms',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8.5px)',
          WebkitBackdropFilter: 'blur(8.5px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '10px',
          padding: '10px',
          width: '538px',
          zIndex: 10,
        }}
      >
        {/* Text first (left) */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '24px', padding: '0 10px' }}>
          {isVi
            ? 'Lapla đã trở thành công ty cảnh quan hàng đầu, cung cấp các giải pháp sáng tạo cho mọi không gian xanh.'
            : 'Garden Tree has blossomed into a leading company dedicated to providing innovative solutions for gardening.'}
        </p>
        {/* Thumbnail right */}
        <div className="relative shrink-0" style={{ width: '164px', height: '116px', borderRadius: '6px', overflow: 'hidden' }}>
          <Image
            src={cardThumbImage}
            alt="Garden"
            fill
            className="object-cover"
            sizes="164px"
          />
        </div>
      </div>

      {/* Hero wave shape — bottom, float-bob-x animation like Leafix */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          animation: 'float-bob-x 3s linear infinite',
          lineHeight: 0,
        }}
      >
        <svg viewBox="0 0 1920 173" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '110%', height: '90px', display: 'block', marginLeft: '-5%' }}>
          <path
            d="M0,80 C160,20 320,140 480,100 C640,60 800,120 960,60 C1120,0 1280,100 1440,80 C1560,65 1700,120 1920,80 L1920,173 L0,173 Z"
            fill="rgba(255,255,255,0.18)"
          />
          <path
            d="M0,120 C200,70 400,150 600,110 C800,70 1000,145 1200,100 C1400,55 1650,135 1920,100 L1920,173 L0,173 Z"
            fill="rgba(255,255,255,0.10)"
          />
        </svg>
      </div>

      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-reveal {
          opacity: 0;
          animation: heroReveal 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes float-bob-x {
          0%   { transform: translateX(30px); }
          50%  { transform: translateX(10px); }
          100% { transform: translateX(30px); }
        }
      `}</style>
    </section>
  );
}
