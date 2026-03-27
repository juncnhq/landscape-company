'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

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

const CATEGORIES = ['GOLF', 'RESORT', 'URBAN', 'GARDEN', 'ARTWORK'];

export default function SeekProjectClient({
  projects,
  query,
  category,
}: {
  projects: Project[];
  query: string;
  category: string;
}) {
  const t = useTranslations('seekProject');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div>
      {/* Search + filter bar */}
      <div className="px-4 sm:px-8 lg:px-12 mb-10 space-y-5">
        {/* Search input */}
        <div className="relative max-w-xl">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            defaultValue={query}
            placeholder={t('searchPlaceholder')}
            onChange={(e) => updateParams('q', e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 bg-white"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParams('cat', '')}
            className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest uppercase font-medium transition-colors border ${
              !category
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            }`}
          >
            {t('all')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => updateParams('cat', cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest uppercase font-medium transition-colors border ${
                category === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 sm:px-8 lg:px-12 mb-6">
        <p className="text-xs text-gray-400 tracking-wide">
          {projects.length} {projects.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="px-4 sm:px-8 lg:px-12 py-24 text-center">
          <p className="text-2xl font-light text-gray-300 mb-2">{t('noResults')}</p>
          <p className="text-sm text-gray-400">{t('noResultsHint')}</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[8px]"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block relative overflow-hidden aspect-[4/3] bg-gray-100"
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs tracking-widest uppercase">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                    <span className="text-white/60 text-[10px] tracking-widest uppercase mb-2">
                      {String(i + 1).padStart(2, '0')} — {project.category}
                    </span>
                    <h3 className="text-white text-lg font-light tracking-wide leading-snug">
                      {locale === 'vi' ? project.title : (project.titleEn ?? project.title)}
                    </h3>
                    {(project.location || project.year) && (
                      <p className="text-white/50 text-xs mt-1 tracking-wide">
                        {[project.location, project.year].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
