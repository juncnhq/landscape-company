'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';

const heroSlides = [
  {
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
    labelVi: 'Thiết kế cảnh quan',
    labelEn: 'Landscape Design',
  },
  {
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
    labelVi: 'Thi công chuyên nghiệp',
    labelEn: 'Professional Build',
  },
  {
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
    labelVi: 'Không gian xanh',
    labelEn: 'Green Spaces',
  },
];

const cardThumbImage = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png';
const SLIDE_DURATION = 5500;

export default function HeroSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const heroRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(c => {
      setPrev(c);
      return idx;
    });
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % heroSlides.length;
        setPrev(c);
        return next;
      });
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  // Clear prev after transition
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1200);
    return () => clearTimeout(t);
  }, [prev, current]);

  // Parallax
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      const bgs = el.querySelectorAll<HTMLElement>('.hero-bg-img');
      bgs.forEach(bg => { bg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.18}px)`; });
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
      {/* Slide images */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 hero-bg-img"
          style={{
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
            willChange: 'transform',
            opacity: i === current ? 1 : (i === prev ? 0 : 0),
            transition: i === current
              ? 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
              : i === prev
              ? 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
            zIndex: i === current ? 1 : (i === prev ? 0 : -1),
          }}
        >
          <Image
            src={slide.image}
            alt={isVi ? slide.labelVi : slide.labelEn}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(10,22,6,0.92) 0%, rgba(10,22,6,0.75) 55%, rgba(10,22,6,0.35) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14"
        style={{ paddingTop: '320px', paddingBottom: '100px', zIndex: 10 }}
      >
        <div style={{ maxWidth: '720px' }}>

          {/* Eyebrow */}
          <p
            className="hero-reveal text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
            style={{ color: 'var(--color-accent)', animationDelay: '0ms' }}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: 'var(--color-accent)' }} />
            {isVi ? 'Dịch vụ cảnh quan hàng đầu' : 'Trusted Landscaping Professionals'}
          </p>

          {/* Heading */}
          <h1
            className="hero-reveal font-bold mb-6"
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.6rem)',
              lineHeight: '1.14',
              letterSpacing: '-0.02em',
              animationDelay: '80ms',
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
              : 'In the realm of landscaping, services like design consulting, terrain analysis, vegetation control and irrigation management are indispensable.'}
          </p>

          {/* CTA Buttons */}
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
              className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-brand)',
                color: '#ffffff',
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

      {/* Slide controls — bottom left */}
      <div
        className="hero-reveal absolute flex items-center gap-4"
        style={{
          bottom: '48px',
          left: '56px',
          zIndex: 10,
          animationDelay: '320ms',
        }}
      >
        {heroSlides.map((slide, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); startTimer(); }}
            className="flex items-center gap-2.5 group transition-all duration-300"
            style={{ opacity: i === current ? 1 : 0.45 }}
          >
            {/* Progress bar */}
            <div style={{ width: i === current ? '36px' : '20px', height: '2px', backgroundColor: 'var(--color-accent)', transition: 'width 0.3s ease', borderRadius: '2px' }} />
            <span
              className="text-[11px] uppercase tracking-widest font-semibold hidden sm:block"
              style={{ color: i === current ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)' }}
            >
              {isVi ? slide.labelVi : slide.labelEn}
            </span>
          </button>
        ))}
        {/* Slide counter */}
        <span className="ml-2 text-[11px] font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
          0{current + 1} / 0{heroSlides.length}
        </span>
      </div>

      {/* Garden card — desktop only */}
      <div
        className="hero-reveal hidden lg:flex items-center gap-5"
        style={{
          position: 'absolute',
          bottom: '140px',
          right: '56px',
          animationDelay: '400ms',
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
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '24px', padding: '0 10px' }}>
          {isVi
            ? 'Lapla đã trở thành công ty cảnh quan hàng đầu, cung cấp các giải pháp sáng tạo cho mọi không gian xanh.'
            : 'Lapla has blossomed into a leading landscaping company dedicated to providing innovative solutions for every green space.'}
        </p>
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

      {/* Wave shape */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 5,
          animation: 'float-bob-x 3s linear infinite',
          lineHeight: 0,
        }}
      >
        <svg viewBox="0 0 1920 173" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '110%', height: '90px', display: 'block', marginLeft: '-5%' }}>
          <path d="M0,80 C160,20 320,140 480,100 C640,60 800,120 960,60 C1120,0 1280,100 1440,80 C1560,65 1700,120 1920,80 L1920,173 L0,173 Z" fill="rgba(255,255,255,0.18)" />
          <path d="M0,120 C200,70 400,150 600,110 C800,70 1000,145 1200,100 C1400,55 1650,135 1920,100 L1920,173 L0,173 Z" fill="rgba(255,255,255,0.10)" />
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
