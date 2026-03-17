'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memberCompanies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:bg-gray-800 transition-all cursor-pointer border border-gray-800 hover:border-green-500/30"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <div className="absolute top-4 left-4 text-3xl">{company.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">{company.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
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
