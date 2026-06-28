'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import AnimatedHeading from './AnimatedHeading';

type Project = {
  id: string; slug: string;
  title: string; titleEn: string;
  category: string; location: string;
  image: string; year: string;
};

export default function ProjectsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects?published=true')
      .then(r => r.ok ? r.json() : [])
      .then((data: Project[]) => setProjects(data.slice(0, 8)))
      .catch(() => {});
  }, []);

  return (
    <section className="leafix-section relative" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      {/* Botanical watermark bg */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ backgroundImage: 'url(/images/shapes/project-bg-shape.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center bottom', backgroundSize: 'contain', opacity: 0.18 }} />
      {/* Monstera leaf — bottom-right, like Leafix */}
      <img
        src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1781085047/shapes/team-shape-01.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none hidden md:block"
        style={{ bottom: '30px', right: '0px', width: '160px', opacity: 0.75, animation: 'float-bob-y 4.5s ease-in-out infinite 0.5s', zIndex: 20 }}
      />
      {/* Decorative background text */}
      <div
        className="absolute top-0 right-0 font-display font-bold select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(8rem, 18vw, 21.6rem)',
          color: 'rgba(130,180,64,0.06)',
          lineHeight: 1,
          top: '-2rem',
          right: '0',
        }}
      >
        PROJECT
      </div>

      <div className="relative z-10 max-w-[2240px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Dự án của chúng tôi' : 'Our Projects'}
            </p>
            <AnimatedHeading
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.95rem, 3.5vw, 3.75rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi ? 'Xem cách chúng tôi biến đổi không gian thành tác phẩm xanh' : 'See how we transform spaces into living works of art'}
            </AnimatedHeading>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:gap-4 hover:text-[var(--color-brand)]"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dự án' : 'View All Projects'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(projects.length > 0 ? projects : Array.from({ length: 8 })).map((project, i) => {
            if (!project) {
              // skeleton
              return (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{ borderRadius: '24px', overflow: 'hidden', backgroundColor: '#e8ede8', aspectRatio: '3 / 4' }}
                />
              );
            }
            const p = project as Project;
            return (
              <ScrollReveal key={p.id} delay={i % 4} duration={650}>
                <Link
                  href={`/${locale}/projects/${p.slug}`}
                  className="group block relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                  style={{ borderRadius: '24px', boxShadow: '0 6px 24px rgba(0,0,0,0.10)', aspectRatio: '3 / 4' }}
                >
                  {/* Full-bleed image */}
                  <Image
                    src={p.image}
                    alt={isVi ? p.title : p.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(10,22,6,0.90) 0%, rgba(10,22,6,0.35) 42%, rgba(10,22,6,0.05) 72%)' }}
                  />

                  {/* Category pill — top-left */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C7 3 3 8 3 13c0 4 3 7 9 7 1-2.5 1-5.5 0-8 2 1.5 4 4 4 7 2-1.5 4-4 4-7C20 7 16.5 3 12 3z"/>
                    </svg>
                    {p.category}
                  </div>

                  {/* Arrow badge — top-right, reveal on hover */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>

                  {/* Bottom content overlaid on image */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-accent)' }}>
                      {p.location} · {p.year}
                    </p>
                    <h3 className="font-display font-bold text-white leading-snug" style={{ fontSize: '1.05rem' }}>
                      {isVi ? p.title : p.titleEn}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/85 group-hover:text-white transition-colors">
                      {isVi ? 'Xem chi tiết' : 'View Details'}
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={2} className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {isVi
              ? 'Hơn 200 dự án hoàn thành trên toàn quốc · '
              : 'Over 200 completed projects nationwide · '}
            <Link
              href={`/${locale}/projects`}
              className="font-bold transition-colors duration-200"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dự án →' : 'View All Projects →'}
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
