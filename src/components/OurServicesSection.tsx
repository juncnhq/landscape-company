'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

type Service = {
  id: string;
  slug: string;
  icon: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  images: string[];
  published: boolean;
  order: number;
};

// Clean SVG icon set (replaces emoji icons) — Heroicons outline style
const SERVICE_ICONS = [
  // consulting / management
  <svg key="i0" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>,
  // design
  <svg key="i1" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
  // golf / flag
  <svg key="i2" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>,
  // artwork / swatch
  <svg key="i3" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>,
  // labor / team
  <svg key="i4" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  // materials / box
  <svg key="i5" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
];

export default function OurServicesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.ok ? r.json() : [])
      .then((data: Service[]) => setServices(data.filter(s => s.published).slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <section className="leafix-section relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="absolute inset-0 pointer-events-none select-none" style={{ backgroundImage: 'url(/images/shapes/service-bg-shape.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover', opacity: 0.35 }} />
      {/* Decorative background text */}
      <div
        className="absolute top-0 right-0 font-display font-bold select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(8rem, 18vw, 21.6rem)',
          color: 'rgba(130,180,64,0.06)',
          lineHeight: 1,
          top: '-2rem',
          right: '-2rem',
        }}
      >
        GREEN
      </div>

      <div className="relative z-10 max-w-[2240px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Dịch vụ của chúng tôi' : 'Our Service'}
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.95rem, 3.5vw, 3.75rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi
                ? <>Giải pháp cho cảnh quan<br />dân dụng và thương mại</>
                : <>Solutions for Residential<br />and Commercial Landscaping</>
              }
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:gap-3"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dịch vụ' : 'View All Services'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i % 3} duration={650}>
              <Link
                href={`/${locale}/services`}
                className="group block bg-white transition-all duration-300 h-full"
                style={{ borderRadius: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(130,180,64,0.22)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ padding: '28px' }}>
                  {/* Header row: title + icon badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <h3
                      className="font-display font-bold text-lg leading-snug transition-colors duration-200 group-hover:text-[var(--color-brand)]"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {isVi ? service.titleVi : service.titleEn}
                    </h3>
                    <div
                      className="shrink-0 w-14 h-14 flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--color-brand)] group-hover:text-white"
                      style={{ backgroundColor: '#f5f1e6', borderRadius: '14px', color: 'var(--color-brand)' }}
                    >
                      {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-40 overflow-hidden mb-5 flex items-center justify-center" style={{ borderRadius: '16px', backgroundColor: '#f5f1e6' }}>
                    {service.images?.[0] ? (
                      <Image
                        src={service.images[0]}
                        alt={isVi ? service.titleVi : service.titleEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <span style={{ color: 'var(--color-brand)', opacity: 0.5 }}>
                        <span className="block scale-[2.2]">{SERVICE_ICONS[i % SERVICE_ICONS.length]}</span>
                      </span>
                    )}
                    <div
                      className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: 'rgba(130,180,64,0.3)' }}
                    />
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                    {isVi ? service.descVi : service.descEn}
                  </p>

                  {/* Divider */}
                  <div className="h-px w-full mb-5" style={{ backgroundColor: '#ececec' }} />

                  {/* Icon button + label */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>
                      {isVi ? 'Xem chi tiết' : 'View Details'}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA text */}
        <ScrollReveal delay={2} className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {isVi
              ? 'Chúng tôi là công ty cảnh quan độc lập lớn nhất · '
              : 'We Are the Largest Independent Landscaping Company · '}
            <Link
              href={`/${locale}/services`}
              className="font-bold transition-colors duration-200"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dịch vụ →' : 'View All Services →'}
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
