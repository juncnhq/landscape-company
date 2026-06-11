'use client';
import { SERVICES, type DbService } from '@/lib/services-data';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';


function ServiceCard({ service, index, locale, contactHref }: {
  service: DbService; index: number; locale: string; contactHref: string;
}) {
  const isVi = locale === 'vi';
  const title = isVi ? service.titleVi : service.titleEn;
  const subtitle = isVi ? service.subtitleVi : service.subtitleEn;
  const desc = isVi ? (service.descVi || service.descriptionVi || '') : (service.descEn || service.descriptionEn || '');
  const bullets = isVi ? (service.bulletsVi || []) : (service.bulletsEn || []);
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal delay={index % 2}>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        style={{ paddingBottom: '60px', marginBottom: '60px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        {/* Number + content */}
        <div className={isEven ? 'order-2 lg:order-1' : 'order-2'}>
          <div className="flex items-center gap-4 mb-5">
            <span className="font-display font-black text-6xl leading-none select-none" style={{ color: 'rgba(15,84,30,0.28)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-12 flex items-center justify-center text-2xl" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)' }}>
              {service.icon}
            </div>
          </div>
          <p className="text-lg font-bold uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-brand)' }}>{subtitle}</p>
          <h2 className="font-display font-bold mb-4 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--color-text-primary)' }}>{title}</h2>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>{desc}</p>

          {bullets.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {bullets.map(b => (
                <li key={b} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="var(--color-brand)" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={contactHref}
            className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-brand)', color: '#ffffff', padding: '13px 28px', borderRadius: 'var(--radius-md)' }}
          >
            {isVi ? 'Liên hệ tư vấn' : 'Get a Quote'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Image */}
        <div className={`${isEven ? 'order-1 lg:order-2' : 'order-1'} relative`} style={{ height: '420px', borderRadius: '20px', overflow: 'hidden' }}>
          {(service.images?.[0]) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={service.images[0]} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
              {service.icon}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ServicesPageContent({ services }: { services: DbService[] }) {
  const t = useTranslations('servicesPage');
  const locale = useLocale();
  const isVi = locale === 'vi';
  const list = services.length > 0 ? services : SERVICES;

  return (
    <section className="leafix-section" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {list.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} locale={locale} contactHref={`/${locale}#contact`} />
        ))}

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-12 rounded-3xl" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
          <p className="text-lg font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
            {isVi ? 'Bắt đầu dự án' : 'Start Your Project'}
          </p>
          <h3 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-text-primary)' }}>
            {t('finalCtaTitle')}
          </h3>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto 2rem' }}>
            {t('finalCtaSubtitle')}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-brand)', color: '#ffffff', padding: '15px 36px', borderRadius: 'var(--radius-xl)' }}
          >
            {t('finalCtaButton')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
