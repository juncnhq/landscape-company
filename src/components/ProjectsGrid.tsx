'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Project = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  location: string;
  image: string;
  year: string;
};

const categories = ['All', 'Golf', 'Resort', 'Urban', 'Construction', 'Artwork'];

export default function ProjectsGrid() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (active !== 'All') params.set('category', active);
    fetch(`/api/projects?${params}`)
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); });
  }, [active]);

  return (
    <section className="pt-4 pb-0">
      {/* Minimal filter tabs */}
      <div className="flex flex-wrap gap-4 md:gap-8 mb-8 md:mb-10 px-4 sm:px-8 lg:px-12 border-b border-green-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActive(cat); setLoading(true); }}
            className={`pb-4 text-xs tracking-widest uppercase font-medium transition-colors relative ${
              active === cat ? 'text-green-700' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            {cat}
            {active === cat && (
              <motion.span
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-600 to-green-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tight image grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[8px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[8px]">
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link href={`/${locale}/projects/${project.slug}`} className="group block relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
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
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
