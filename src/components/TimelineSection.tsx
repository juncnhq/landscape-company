'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { timelineItems } from '@/lib/data';

export default function TimelineSection() {
  const t = useTranslations('timeline');
  const locale = useLocale();

  return (
    <section className="py-16 md:py-28 overflow-hidden relative bg-[#07130a]">

      {/* Radial glow from top — adds depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(50,132,66,0.35)_0%,transparent_65%)] pointer-events-none" />

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Accent glow bottom-right — warmth from brand gold */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(190,123,43,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Bottom fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#07130a] to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-secondary-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 drop-shadow-[0_1px_6px_rgba(190,123,43,0.5)]">History</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">{t('title')}</h2>
          <p className="text-white/70 text-base md:text-lg">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-white/0 via-green-400/40 to-white/0 md:-translate-x-px" />

          <div className="flex flex-col gap-10 md:gap-14">
            {timelineItems.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 * i }}
                className={`relative flex items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* ── Dot (mobile: left edge; desktop: center via absolute) ── */}
                <div className="relative flex-shrink-0 mt-1 mr-5 md:hidden">
                  <div className="w-3.5 h-3.5 rounded-full bg-secondary-400 ring-4 ring-secondary-400/30" />
                </div>
                <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * i + 0.2 }}
                    className="w-3.5 h-3.5 rounded-full bg-secondary-400 ring-4 ring-secondary-400/30"
                  />
                </div>

                {/* ── Content (single block, layout shifts via md: classes) ── */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-1 pb-2 md:max-w-[280px] ${
                    i % 2 === 0
                      ? 'md:mr-auto md:ml-0 md:pr-14 md:text-right'
                      : 'md:ml-auto md:mr-0 md:pl-14 md:text-left'
                  }`}
                >
                  <span className="text-[10px] tracking-[0.3em] text-secondary-300 uppercase font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="text-2xl md:text-5xl font-bold text-white/90 leading-none mt-0.5 mb-2 select-none">
                    {item.year}
                  </div>
                  <h3 className="font-bold text-white text-base md:text-xl leading-snug mb-1">
                    {locale === 'vi' ? item.title : item.titleEn}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {locale === 'vi' ? item.description : item.descriptionEn}
                  </p>
                </motion.div>

                {/* ── Desktop: empty side spacer ── */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
