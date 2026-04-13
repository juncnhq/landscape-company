'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
}

const heroSlides = [
  {
    url: '/images/hero/FUSION 1.webp',
    labelVi: 'Cảnh quan nghỉ dưỡng',
    labelEn: 'Resort Landscape',
  },
  {
    url: '/images/hero/FUSION 2.jpg',
    labelVi: 'Sân Golf',
    labelEn: 'Golf Course',
  },
  {
    url: '/images/hero/FUSION 4.png',
    labelVi: 'Vườn Biệt Thự',
    labelEn: 'Villa Garden',
  },
  {
    url: '/images/hero/HÌNH 3.jpg',
    labelVi: 'Công Viên Đô Thị',
    labelEn: 'Urban Park',
  },
  {
    url: '/images/hero/HÌNH 4.jpg',
    labelVi: 'Cảnh quan Sinh Thái',
    labelEn: 'Eco Landscape',
  },
];

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const slideDuration = prefersReducedMotion ? 0.01 : 1.8;
  const entryDuration = prefersReducedMotion ? 0.01 : 1;
  const scrollDuration = prefersReducedMotion ? 0.01 : 1.5;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);


  return (
    <section className="relative h-screen overflow-hidden">
      {heroSlides.map((slide, i) => (
        <motion.div
          key={slide.url}
          className="absolute inset-0"
          initial={{ opacity: i === 0 ? 1 : 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: slideDuration, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              prefersReducedMotion
                ? {}
                : i === current
                  ? { scale: [1, 1.08] }
                  : { scale: 1 }
            }
            transition={
              i === current
                ? { duration: 5.5, ease: 'easeOut' }
                : { duration: slideDuration, ease: 'easeInOut' }
            }
          >
            <Image
              src={slide.url}
              alt={locale === 'vi' ? slide.labelVi : slide.labelEn}
              fill
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      {/* Center content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: entryDuration, delay: prefersReducedMotion ? 0 : 0.3 }}
        >
          <p
            className="text-green-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            role="doc-subtitle"
          >
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight mb-4 md:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t('title')}
          </h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              href={`/${locale}/projects`}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 hover:shadow-2xl transition-all shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-green-700 [@media(hover:hover)]:hover:opacity-90"
            >
              {t('cta')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-700 transition-all shadow-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — sits between CTA and bottom bar, hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: scrollDuration, delay: prefersReducedMotion ? 0 : 1.5 }}
        className="hidden sm:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>

      {/* Bottom bar: slide label left + dots right */}
      <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-10 flex items-center justify-between z-10">
        {/* Current slide label */}
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
            {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
          </span>
          <span className="w-8 h-px bg-white/30" />
          <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase font-medium">
            {locale === 'vi' ? heroSlides[current].labelVi : heroSlides[current].labelEn}
          </span>
        </motion.div>

        {/* Dot indicators — fieldset groups for accessibility */}
        <fieldset className="flex gap-1 items-center border-0 p-0 m-0">
          <legend className="sr-only">Chọn slide</legend>
          {heroSlides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}: ${locale === 'vi' ? slide.labelVi : slide.labelEn}`}
              aria-pressed={i === current}
              className="p-3 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white rounded-full"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-green-400' : 'w-2 bg-white/30 hover:bg-white/60'}`} />
            </button>
          ))}
        </fieldset>
      </div>
    </section>
  );
}
