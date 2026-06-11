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
          fontSize: 'clamp(8rem, 18vw, 18rem)',
          color: 'rgba(130,180,64,0.06)',
          lineHeight: 1,
          top: '-2rem',
          right: '0',
        }}
      >
        PROJECT
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Dự án của chúng tôi' : 'Our Projects'}
            </p>
            <AnimatedHeading
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)' }}
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
                    {/* Category pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full" style={{ backgroundColor: 'rgba(15,84,30,0.82)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3C7 3 3 8 3 13c0 4 3 7 9 7 1-2.5 1-5.5 0-8 2 1.5 4 4 4 7 2-1.5 4-4 4-7C20 7 16.5 3 12 3z" fill="currentColor"/>
                      </svg>
                      {p.category}
                    </div>
                    {/* Leaf corner accent — bottom right */}
                    <div className="absolute bottom-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                        <path d="M36 4C18 4 4 18 4 36c0-4 2-10 6-14 1 5 3 10 6 14C14 28 18 16 28 12c-4 4-6 10-6 16 6-2 12-8 14-24z" fill="white" opacity="0.9"/>
                      </svg>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative overflow-hidden" style={{ padding: '20px 24px 20px' }}>
                    {/* Watermark leaf — top right of body */}
                    <svg className="absolute top-0 right-0 pointer-events-none select-none" width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                      <path d="M72 8C36 8 8 36 8 72c0-8 4-20 12-28 2 10 6 20 12 28C28 56 36 32 56 24c-8 8-12 20-12 32 12-4 24-16 28-48z" fill="var(--color-brand)" opacity="0.055"/>
                    </svg>
                    <h3
                      className="font-display font-bold text-base mb-1.5 transition-colors duration-200 group-hover:text-[var(--color-brand)] leading-snug"
                      style={{ color: 'var(--color-text-primary)' }}
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
