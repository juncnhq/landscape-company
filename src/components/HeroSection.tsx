'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type HeroSlide = { url: string; labelVi: string; labelEn: string };

export default function HeroSection({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <motion.div
          key={slide.url}
          className="absolute inset-0"
          initial={{ opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.05 }}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.05 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          <Image src={slide.url} alt={slide.labelEn} fill className="object-cover" priority={i === 0} />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      {/* Center content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-green-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Landscape Design & Construction
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight mb-4 md:mb-6">
            {t('title')}
          </h1>
          <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              href={`/${locale}/projects`}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 transition-all hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              {t('cta')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/70 text-white font-semibold rounded-full hover:bg-white hover:text-green-700 transition-all hover:scale-105 text-sm sm:text-base"
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
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden sm:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1"
      >
        <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
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
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <span className="w-8 h-px bg-white/30" />
          <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase font-medium">
            {locale === 'vi' ? slides[current].labelVi : slides[current].labelEn}
          </span>
        </motion.div>

        {/* Dot indicators — py-3 gives 28px tap height on mobile without changing visuals */}
        <div className="flex gap-2 items-center">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}: ${slide.labelEn}`}
              className="py-3 flex items-center"
            >
              <span className={`block h-1 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-green-400' : 'w-2 bg-white/30 hover:bg-white/60'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
