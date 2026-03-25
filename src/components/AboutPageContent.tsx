'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import TimelineSection from './TimelineSection';

// ── Animated counter ─────────────────────────────────────────────────────────
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

// ── Static data ───────────────────────────────────────────────────────────────
const VALUES = [
  { titleKey: 'valueDesignTitle', textKey: 'valueDesignText' },
  { titleKey: 'valueSustainTitle', textKey: 'valueSustainText' },
  { titleKey: 'valuePartnerTitle', textKey: 'valuePartnerText' },
] as const;

const LEADERS = [
  { roleKey: 'roleCeo',       initials: 'CEO', gradient: 'from-green-700  to-green-500'  },
  { roleKey: 'roleTechnical', initials: 'TD',  gradient: 'from-blue-700   to-blue-500'   },
  { roleKey: 'roleProject',   initials: 'PM',  gradient: 'from-purple-700 to-purple-500' },
  { roleKey: 'roleHr',        initials: 'HR',  gradient: 'from-teal-700   to-teal-500'   },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutPageContent() {
  const t = useTranslations('about');
  const locale = useLocale();

  const overviewRef  = useRef(null);
  const statsRef     = useRef(null);
  const leaderRef    = useRef(null);
  const ctaRef       = useRef(null);

  const overviewInView  = useInView(overviewRef,  { once: true, margin: '-80px' });
  const statsInView     = useInView(statsRef,     { once: true, margin: '-80px' });
  const leaderInView    = useInView(leaderRef,    { once: true, margin: '-80px' });
  const ctaInView       = useInView(ctaRef,       { once: true, margin: '-80px' });

  const yearsCount    = useCounter(17,  statsInView);
  const projectsCount = useCounter(100, statsInView);
  const staffCount    = useCounter(500, statsInView);
  const partnersCount = useCounter(20,  statsInView);

  return (
    <>
      {/* ════════════════════════════════════════════════════════ HERO ══ */}
      <section className="relative bg-[#07130a] pt-36 md:pt-48 pb-24 md:pb-32 overflow-hidden">
        {/* Dot grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Green ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-green-500/15 rounded-full blur-[140px] pointer-events-none" />
        {/* Gold accent bottom right */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-green-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6">
              {t('heroEyebrow')}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-16 flex justify-center"
          >
            <div className="w-px h-16 bg-gradient-to-b from-green-500/70 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ OVERVIEW ══ */}
      <section ref={overviewRef} className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left column: description + fact table */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={overviewInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-3">
                {t('overviewEyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('overviewTitle')}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10">
                {t('overviewDescription')}
              </p>

              {/* Info table */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                {(
                  [
                    ['foundedLabel', 'foundedValue'],
                    ['fullNameLabel', 'fullNameValue'],
                    ['specializationLabel', 'specializationValue'],
                  ] as const
                ).map(([labelKey, valKey]) => (
                  <div key={labelKey} className="grid grid-cols-[148px_1fr] gap-4">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase pt-0.5">
                      {t(labelKey)}
                    </span>
                    <span className="text-gray-800 text-sm leading-relaxed">{t(valKey)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column: vision card + values */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={overviewInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5"
            >
              {/* Vision */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6 md:p-8">
                <p className="text-green-700 text-[11px] font-semibold tracking-widest uppercase mb-3">
                  {t('visionLabel')}
                </p>
                <p className="text-gray-900 text-base md:text-lg font-medium leading-relaxed">
                  {t('visionValue')}
                </p>
              </div>

              {/* Core values */}
              {VALUES.map(({ titleKey, textKey }, i) => (
                <motion.div
                  key={titleKey}
                  initial={{ opacity: 0, y: 16 }}
                  animate={overviewInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="mt-1.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t(titleKey)}</p>
                    <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{t(textKey)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ STATS ══ */}
      <section ref={statsRef} className="py-16 md:py-28 bg-[#07130a] relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-secondary-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center text-green-400 text-xs font-semibold tracking-widest uppercase mb-14 md:mb-20"
          >
            {t('statsEyebrow')}
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {(
              [
                { count: yearsCount,    label: t('statsYears') },
                { count: projectsCount, label: t('statsProjects') },
                { count: staffCount,    label: t('statsStaff') },
                { count: partnersCount, label: t('statsPartners') },
              ] as const
            ).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-7xl font-bold text-white leading-none mb-3 tabular-nums">
                  {stat.count}<span className="text-green-400">+</span>
                </div>
                <p className="text-gray-400 text-sm font-medium tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ TIMELINE ══ */}
      <TimelineSection />

      {/* ══════════════════════════════════════════ LEADERSHIP ══ */}
    

      {/* ═══════════════════════════════════════════════════ CTA ══ */}
      <section ref={ctaRef} className="relative py-20 md:py-32 bg-[#07130a] overflow-hidden">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Green glow top */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-green-500/15 rounded-full blur-[120px] pointer-events-none" />
        {/* Gold accent bottom-right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-secondary-500/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-green-300/70 text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-green-400 transition-colors shadow-xl"
            >
              {t('ctaButton')}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
