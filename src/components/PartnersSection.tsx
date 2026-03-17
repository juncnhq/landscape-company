'use client';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { partners } from '@/lib/data';

export default function PartnersSection() {
  const t = useTranslations('partners');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-green-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">Trust</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-gray-50 rounded-2xl p-4 md:p-8 flex items-center justify-center hover:bg-green-50 hover:shadow-md transition-all group cursor-pointer border border-transparent hover:border-green-100"
            >
              <span className="text-gray-600 font-bold text-sm md:text-lg group-hover:text-green-700 transition-colors text-center">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
