'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { projects } from '@/lib/data';
import ScrollReveal from './ScrollReveal';

const CARD_W = 280;
const GAP = 24;
const STEP = CARD_W + GAP;

const base = projects.slice(0, 8);
// Triple clone for infinite loop: [clone, real, clone]
const slides = [...base, ...base, ...base];
const OFFSET = base.length; // start at middle set

export default function ProjectsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  const [idx, setIdx] = useState(OFFSET);
  const [animated, setAnimated] = useState(true);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isJumping = useRef(false);

  // translate = center active card in viewport
  // offset from left edge: 50vw - CARD_W/2 - idx * STEP
  const getTranslate = (i: number) => `calc(50vw - ${CARD_W / 2}px - ${i * STEP}px)`;

  const goTo = useCallback((i: number, anim = true) => {
    setAnimated(anim);
    setIdx(i);
  }, []);

  // After transition ends, silently jump to real position if on clone
  const handleTransitionEnd = useCallback(() => {
    if (isJumping.current) return;
    setIdx(prev => {
      if (prev >= OFFSET + base.length) {
        isJumping.current = true;
        const target = OFFSET + (prev - OFFSET) % base.length;
        setTimeout(() => {
          setAnimated(false);
          setIdx(target);
          setTimeout(() => { isJumping.current = false; setAnimated(true); }, 50);
        }, 0);
        return prev;
      }
      if (prev < OFFSET) {
        isJumping.current = true;
        const target = OFFSET + base.length - 1 - (OFFSET - 1 - prev) % base.length;
        setTimeout(() => {
          setAnimated(false);
          setIdx(target);
          setTimeout(() => { isJumping.current = false; setAnimated(true); }, 50);
        }, 0);
        return prev;
      }
      return prev;
    });
  }, []);

  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);

  // Auto loop
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setIdx(i => i + 1);
      setAnimated(true);
    }, 3500);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const realIdx = ((idx - OFFSET) % base.length + base.length) % base.length;

  return (
    <section className="leafix-section overflow-hidden relative" style={{ backgroundColor: 'transparent' }}>
      {/* BG shape */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/shapes/project-bg-shape.png)',
          backgroundSize: '80% 80%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 20px rgba(130,180,64,0.08)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Dự án của chúng tôi' : 'Our Project'}
              </p>
              <h2
                className="font-display font-bold leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#111111', maxWidth: '560px' }}
              >
                {isVi
                  ? <>Xem cách chúng tôi biến đổi không gian ngoài trời thành tác phẩm nghệ thuật</>
                  : <>See how we transform outdoor spaces into living works of art</>
                }
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 shrink-0"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', padding: '14px 28px', borderRadius: '999px' }}
              >
                {isVi ? 'Xem tất cả dự án' : 'View All Project'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          style={{ height: `${CARD_W * 1.3 + 80}px` }}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateX(${getTranslate(idx)})`,
              transition: animated ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              willChange: 'transform',
            }}
          >
            {slides.map((project, i) => {
              const isActive = i === idx;
              return (
                <Link
                  key={i}
                  href={`/${locale}/projects/${project.slug}`}
                  className="group shrink-0"
                  style={{
                    width: `${CARD_W}px`,
                    transition: 'opacity 0.4s, transform 0.4s',
                    opacity: 1,
                    transform: 'scale(1)',
                  }}
                >
                  <div className="relative overflow-hidden mb-3" style={{ height: '360px', borderRadius: '20px' }}>
                    <Image
                      src={project.image}
                      alt={isVi ? project.title : project.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      sizes="280px"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(15,84,30,0.35)' }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}>
                        <svg className="w-5 h-5" fill="none" stroke="var(--color-text-primary)" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '0 4px' }}>
                    <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--color-brand)' }}>
                      Landscaping · Lawn Care
                    </p>
                    <h3 className="font-display font-bold leading-snug group-hover:text-[var(--color-brand)] transition-colors" style={{ fontSize: '1rem', color: '#111111' }}>
                      {isVi ? project.title : project.titleEn}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
