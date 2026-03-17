'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { memberCompanies } from '@/lib/data';

export default function MemberCompaniesSection() {
  const t = useTranslations('members');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-12 md:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-green-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">Ecosystem</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {memberCompanies.map((company, i) => (
            <motion.div
              key={company.abbr}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group relative rounded-xl md:rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all overflow-hidden"
            >
              {/* Accent top bar */}
              <div className="h-1 w-full" style={{ backgroundColor: company.accent }} />

              <div className="p-3.5 md:p-6">
                {/* Abbreviation badge */}
                <div
                  className="inline-flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl mb-3 font-black text-xs md:text-sm tracking-wide"
                  style={{ backgroundColor: `${company.accent}22`, color: company.accent }}
                >
                  {company.abbr}
                </div>

                <h3 className="text-white font-bold text-sm md:text-base leading-snug mb-1">
                  {company.name}
                </h3>
                <p className="text-[10px] md:text-xs font-semibold tracking-wide mb-2 md:mb-3" style={{ color: company.accent }}>
                  {company.tagline}
                </p>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
                  {locale === 'vi' ? company.description : company.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
