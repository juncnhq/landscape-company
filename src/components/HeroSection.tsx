'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=90',
    labelVi: 'Cảnh quan nghỉ dưỡng',
    labelEn: 'Resort Landscape',
  },
  {
    url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1920&q=90',
    labelVi: 'Sân Golf',
    labelEn: 'Golf Course',
  },
  {
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=90',
    labelVi: 'Vườn Biệt Thự',
    labelEn: 'Villa Garden',
  },
  {
    url: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1920&q=90',
    labelVi: 'Công Viên Đô Thị',
    labelEn: 'Urban Park',
  },
  {
    url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=90',
    labelVi: 'Cảnh quan Sinh Thái',
    labelEn: 'Eco Landscape',
  },
];

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {heroSlides.map((slide, i) => (
        <motion.div
          key={slide.url}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.05 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          <Image src={slide.url} alt={slide.labelEn} fill className="object-cover" priority={i === 0} unoptimized />
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
            <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/70 text-white font-semibold rounded-full hover:bg-white hover:text-green-700 transition-all hover:scale-105 text-sm sm:text-base">
              {t('ctaSecondary')}
            </button>
          </div>
        </motion.div>
      </div>

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

        {/* Dot indicators */}
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-green-400' : 'w-2 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
