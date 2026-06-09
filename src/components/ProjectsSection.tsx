'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

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
    <section className="leafix-section relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      {/* Decorative background text */}
      <div
        className="absolute top-0 right-0 font-display font-bold select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(8rem, 18vw, 18rem)',
          color: 'rgba(130,180,64,0.06)',
          lineHeight: 1,
          top: '-2rem',
          right: '-2rem',
        }}
      >
        PROJECT
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Dự án của chúng tôi' : 'Our Projects'}
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#111111' }}
            >
              {isVi
                ? <>Xem cách chúng tôi biến đổi<br />không gian thành tác phẩm xanh</>
                : <>See how we transform spaces<br />into living works of art</>
              }
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:gap-3"
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
                  style={{ borderRadius: '30px', overflow: 'hidden', backgroundColor: '#e8ede8', height: '340px' }}
                />
              );
            }
            const p = project as Project;
            return (
              <ScrollReveal key={p.id} delay={i % 4} duration={650}>
                <Link
                  href={`/${locale}/projects/${p.slug}`}
                  className="group block bg-white overflow-hidden transition-all duration-300 h-full"
                  style={{ borderRadius: '30px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(130,180,64,0.22)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={isVi ? p.title : p.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: 'rgba(130,180,64,0.3)' }}
                    />
                    {/* Category badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '6px' }}
                    >
                      {p.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '24px 24px 20px' }}>
                    <h3
                      className="font-display font-bold text-base mb-1.5 transition-colors duration-200 group-hover:text-[var(--color-brand)] leading-snug"
                      style={{ color: '#111111' }}
                    >
                      {isVi ? p.title : p.titleEn}
                    </h3>
                    <p className="text-xs mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                      {p.location} · {p.year}
                    </p>

                    {/* Arrow row */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>
                        {isVi ? 'Xem chi tiết' : 'View Details'}
                      </span>
                      <div
                        className="w-8 h-8 flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                        style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
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
