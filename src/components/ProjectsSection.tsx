'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
  id: string;
  slug: string;
  title: string;
  titleEn: string | null;
  category: string;
  location: string | null;
  year: string | null;
  image: string | null;
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const t = useTranslations('projects');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-12 md:py-24 bg-white">
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

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[8px]">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link href={`/${locale}/projects/${project.slug}`} className="group block relative overflow-hidden aspect-[4/3] bg-gray-100">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 md:hidden bg-linear-to-t from-black/70 to-transparent pt-6 pb-2 px-2.5">
                <p className="text-white/60 text-[9px] tracking-widest uppercase truncate">{project.category}</p>
                <p className="text-white text-xs font-medium leading-snug truncate">
                  {locale === 'vi' ? project.title : (project.titleEn ?? project.title)}
                </p>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 hidden md:flex flex-col justify-end p-6">
                <span className="text-white/60 text-[10px] tracking-widest uppercase mb-2">
                  {String(i + 1).padStart(2, '0')} — {project.category}
                </span>
                <h3 className="text-white text-lg font-light tracking-wide leading-snug">
                  {locale === 'vi' ? project.title : (project.titleEn ?? project.title)}
                </h3>
                <p className="text-white/50 text-xs mt-1 tracking-wide">
                  {[project.location, project.year].filter(Boolean).join(' · ')}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex justify-center"
      >
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-3 px-8 py-4 border border-gray-900 text-gray-900 text-xs font-semibold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-full group"
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
