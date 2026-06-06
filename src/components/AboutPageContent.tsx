'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import TimelineSection from './TimelineSection';
import ScrollReveal from './ScrollReveal';

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return count;
}

const VALUES = [
  { titleKey: 'valueDesignTitle', textKey: 'valueDesignText' },
  { titleKey: 'valueSustainTitle', textKey: 'valueSustainText' },
  { titleKey: 'valuePartnerTitle', textKey: 'valuePartnerText' },
] as const;

export default function AboutPageContent() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isVi = locale === 'vi';

  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const yearsCount    = useCounter(17,  statsInView);
  const projectsCount = useCounter(100, statsInView);
  const staffCount    = useCounter(500, statsInView);
  const partnersCount = useCounter(20,  statsInView);

  return (
    <>
      {/* Overview */}
      <section className="leafix-section" style={{ backgroundColor: 'var(--color-surface-base)' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <ScrollReveal direction="left">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-brand)' }}>
                {t('overviewEyebrow')}
              </p>
              <h2 className="font-display font-bold mb-6 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--color-text-primary)' }}>
                {t('overviewTitle')}
              </h2>
              <p className="leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
                {t('overviewDescription')}
              </p>
              <div className="space-y-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '24px' }}>
                {(['foundedLabel','fullNameLabel','specializationLabel'] as const).map((labelKey, i) => {
                  const valKey = (['foundedValue','fullNameValue','specializationValue'] as const)[i];
                  return (
                    <div key={labelKey} className="grid gap-4" style={{ gridTemplateColumns: '148px 1fr' }}>
                      <span className="text-[11px] font-semibold tracking-wider uppercase pt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{t(labelKey)}</span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{t(valKey)}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={2} className="space-y-5">
              <div className="p-6 md:p-8" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: '16px', border: '1px solid rgba(15,84,30,0.12)' }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-brand)' }}>{t('visionLabel')}</p>
                <p className="font-medium leading-relaxed" style={{ color: 'var(--color-text-primary)', fontSize: '15px' }}>{t('visionValue')}</p>
              </div>
              {VALUES.map(({ titleKey, textKey }) => (
                <div key={titleKey} className="flex gap-4 items-start">
                  <div className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{t(titleKey)}</p>
                    <p className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t(textKey)}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="leafix-section relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-dark)' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] mb-16" style={{ color: 'var(--color-accent)' }}>
            {t('statsEyebrow')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { count: yearsCount,    suffix: '+', label: t('statsYears') },
              { count: projectsCount, suffix: '+', label: t('statsProjects') },
              { count: staffCount,    suffix: '+', label: t('statsStaff') },
              { count: partnersCount, suffix: '+', label: t('statsPartners') },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="font-display font-bold text-white leading-none mb-3 tabular-nums" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  {stat.count}<span style={{ color: 'var(--color-accent)' }}>{stat.suffix}</span>
                </div>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* CTA */}
      <section ref={ctaRef} className="leafix-section relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Bắt đầu hành trình' : 'Start Your Journey'}
            </p>
            <h2 className="font-display font-bold mb-5 leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)' }}>
              {t('ctaTitle')}
            </h2>
            <p className="mb-10 mx-auto" style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', lineHeight: '28px' }}>
              {t('ctaSubtitle')}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-brand)', color: '#ffffff', padding: '15px 36px', borderRadius: 'var(--radius-xl)' }}
            >
              {t('ctaButton')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
