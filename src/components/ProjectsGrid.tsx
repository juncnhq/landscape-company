'use client';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Project = {
  id: string; slug: string; title: string; titleEn: string;
  category: string; location: string; image: string; year: string;
};

const categories: { key: string; labelVi: string; labelEn: string }[] = [
  { key: 'All',          labelVi: 'Tất cả',      labelEn: 'All' },
  { key: 'Golf',         labelVi: 'Sân Golf',    labelEn: 'Golf' },
  { key: 'Resort',       labelVi: 'Resort',      labelEn: 'Resort' },
  { key: 'Urban',        labelVi: 'Đô thị',      labelEn: 'Urban' },
  { key: 'Construction', labelVi: 'Xây dựng',    labelEn: 'Construction' },
  { key: 'Artwork',      labelVi: 'Nghệ thuật',  labelEn: 'And More' },
];

export default function ProjectsGrid() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('published', 'true');
    if (active !== 'All') params.set('category', active); // always the English key
    fetch(`/api/projects?${params}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [active]);

  return (
    <section className="leafix-section" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActive(cat.key); setLoading(true); }}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                backgroundColor: active === cat.key ? 'var(--color-brand)' : 'transparent',
                color: active === cat.key ? '#ffffff' : 'var(--color-text-secondary)',
                border: `1px solid ${active === cat.key ? 'var(--color-brand)' : 'rgba(0,0,0,0.12)'}`,
                borderRadius: 'var(--radius-md)',
              }}
            >
              {isVi ? cat.labelVi : cat.labelEn}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse" style={{ backgroundColor: '#f0f0f0', borderRadius: '20px' }} />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => (
                <motion.div key={project.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Link href={`/${locale}/projects/${project.slug}`} className="group block relative overflow-hidden" style={{ aspectRatio: '4/3', borderRadius: '20px' }}>
                    <Image src={project.image} alt={isVi ? project.title : project.titleEn} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" style={{ background: 'linear-gradient(to top, rgba(10,22,6,0.88) 0%, rgba(10,22,6,0.3) 60%, transparent 100%)' }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--color-accent)' }}>{project.category}</p>
                      <h3 className="text-white font-display font-bold text-base leading-snug">{isVi ? project.title : project.titleEn}</h3>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{project.location} · {project.year}</p>
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100" style={{ backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}>
                      <svg className="w-4 h-4" fill="none" stroke="var(--color-text-primary)" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {projects.length === 0 && !loading && (
          <p className="text-center py-20" style={{ color: 'var(--color-text-secondary)' }}>
            {isVi ? 'Không có dự án nào.' : 'No projects found.'}
          </p>
        )}
      </div>
    </section>
  );
}
