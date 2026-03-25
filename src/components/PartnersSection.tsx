'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { partners } from '@/lib/data';

type Partner = typeof partners[number];

function PartnerModal({ partner, onClose, isVi }: { partner: Partner; onClose: () => void; isVi: boolean }) {
  const projects = isVi ? partner.projectsVi : partner.projectsEn;
  const highlight = isVi ? partner.highlightVi : partner.highlightEn;
  const statLabel = isVi ? partner.statLabelVi : partner.statLabelEn;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header band */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 px-6 pt-6 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
            aria-label="Đóng"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-[10px] font-bold tracking-widest uppercase text-green-100 bg-white/15 px-2.5 py-1 rounded-full">
            {isVi ? partner.sector : partner.sectorEn}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">{partner.name}</h3>
          <p className="text-green-100 text-xs mt-1">
            {isVi ? `Thành lập ${partner.founded} · ${partner.hq}` : `Est. ${partner.founded} · ${partner.hq}`}
          </p>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Key stat */}
          <div className="flex items-center gap-4 bg-green-50 rounded-xl p-4">
            <div className="flex-1">
              <p className="text-[11px] text-green-600 font-semibold uppercase tracking-wider">{statLabel}</p>
              <p className="text-xl font-bold text-green-800 mt-0.5">{partner.statValue}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>

          {/* About */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              {isVi ? 'Giới thiệu' : 'About'}
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">{isVi ? partner.descVi : partner.descEn}</p>
          </div>

          {/* Projects with FAM */}
          {projects && projects.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                {isVi ? 'Dự án hợp tác với FAM' : 'Projects with FAM'}
              </p>
              <ul className="space-y-1.5">
                {projects.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Highlight */}
          {highlight && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3.5">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-xs text-amber-800 leading-relaxed">{highlight}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 flex items-center gap-2 bg-gray-50">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400">
            {isVi ? 'Đối tác chiến lược của FAM Landscape' : 'Strategic partner of FAM Landscape'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PartnersSection() {
  const t = useTranslations('partners');
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<Partner | null>(null);

  return (
    <>
      <section ref={ref} className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-green-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">Trust</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
            <p className="text-gray-400 text-xs mt-3">
              {isVi ? '* Nhấn vào logo để xem thông tin chi tiết' : '* Click on a partner to view details'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {partners.map((partner, i) => (
              <motion.button
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setSelected(partner)}
                className="bg-white rounded-2xl p-4 md:p-8 flex items-center justify-center hover:bg-green-50 hover:shadow-md transition-all group cursor-pointer border border-gray-200 hover:border-green-200 text-left"
              >
                <span className="text-gray-700 font-bold text-sm md:text-lg group-hover:text-green-700 transition-colors text-center">
                  {partner.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <PartnerModal
            partner={selected}
            onClose={() => setSelected(null)}
            isVi={isVi}
          />
        )}
      </AnimatePresence>
    </>
  );
}
