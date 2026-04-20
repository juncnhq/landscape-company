'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const featured = projects.slice(0, 9);

  return (
    <section ref={ref} className="py-12 md:py-24 bg-white relative overflow-hidden">

      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-widest uppercase text-green-600 mb-2">Portfolio</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{t('title')}</h2>
        </motion.div>
      </div>

      {/* Grid with clip-path reveal animations */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[8px]">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            animate={inView ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/${locale}/projects/${project.slug}`} className="group block relative overflow-hidden aspect-[4/3]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Permanent subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Mobile: bottom info strip */}
              <div className="absolute bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/70 to-transparent pt-8 pb-2 px-2.5">
                <p className="text-white/60 text-[9px] tracking-widest uppercase truncate">{project.category}</p>
                <p className="text-white text-xs font-medium leading-snug truncate">
                  {locale === 'vi' ? project.title : project.titleEn}
                </p>
              </div>

              {/* Desktop: hover overlay with slide-up content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 hidden md:flex flex-col justify-end p-6">
                <motion.div
                  initial={false}
                  className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-4 h-px bg-green-400" />
                    <span className="text-green-400 text-[9px] tracking-widest uppercase">
                      {String(i + 1).padStart(2, '0')} — {project.category}
                    </span>
                  </div>
                  <h3 className="text-white text-lg font-semibold tracking-wide leading-snug">
                    {locale === 'vi' ? project.title : project.titleEn}
                  </h3>
                  <p className="text-white/50 text-xs mt-1 tracking-wide">{project.location} · {project.year}</p>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex justify-center"
      >
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-3 px-8 py-4 border border-green-500/60 text-green-600 font-display text-sm font-semibold hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300 rounded-full group"
        >
          {t('viewAll')}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
