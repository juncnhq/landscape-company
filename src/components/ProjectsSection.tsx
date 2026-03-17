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

  const featured = projects.slice(0, 6);

  return (
    <section ref={ref} className="py-12 md:py-24 bg-white">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight">{t('title')}</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            href={`/${locale}/projects`}
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-0.5"
          >
            {t('viewAll')}
          </Link>
        </motion.div>
      </div>

      {/* Tight grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link href={`/${locale}/projects/${project.slug}`} className="group block relative overflow-hidden aspect-[4/3]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                <span className="text-white/60 text-[10px] tracking-widest uppercase mb-2">
                  {String(i + 1).padStart(2, '0')} — {project.category}
                </span>
                <h3 className="text-white text-lg font-light tracking-wide leading-snug">
                  {locale === 'vi' ? project.title : project.titleEn}
                </h3>
                <p className="text-white/50 text-xs mt-1 tracking-wide">{project.location} · {project.year}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
