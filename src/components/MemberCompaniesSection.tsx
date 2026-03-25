'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { memberCompanies } from '@/lib/data';

type Member = typeof memberCompanies[number];

function MemberModal({ member, onClose, isVi }: { member: Member; onClose: () => void; isVi: boolean }) {
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
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-[10px] font-bold tracking-widest uppercase text-green-100 bg-white/15 px-2.5 py-1 rounded-full">
            {member.tagline}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">{member.name}</h3>
          <p className="text-green-100 text-xs mt-1">{member.abbr}</p>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* About */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              {isVi ? 'Giới thiệu' : 'About'}
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              {isVi ? member.description : member.descriptionEn}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 flex items-center gap-2 bg-gray-50">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400">
            {isVi ? 'Thành viên của FAM Group' : 'Member of FAM Group'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MemberCompaniesSection() {
  const t = useTranslations('members');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<Member | null>(null);

  return (
    <section ref={ref} className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-green-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">Ecosystem</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          <p className="text-gray-400 text-xs mt-3">
            {locale === 'vi' ? '* Nhấn vào thành viên để xem chi tiết' : '* Click on a member to view details'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {memberCompanies.map((company, i) => (
            <motion.button
              key={company.abbr}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onClick={() => setSelected(company)}
              className="group relative rounded-2xl bg-white border border-gray-100 hover:border-green-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden text-left cursor-pointer"
            >
              {/* Accent top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-400" />

              <div className="p-4 md:p-6 flex flex-col h-full">
                {/* Abbreviation badge */}
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl mb-4 font-black text-sm md:text-base tracking-wide bg-green-500/10 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                  {company.abbr}
                </div>

                <h3 className="text-gray-900 font-bold text-sm md:text-base leading-snug mb-1">
                  {company.name}
                </h3>
                <p className="text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-3 text-green-500">
                  {company.tagline}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed flex-1">
                  {locale === 'vi' ? company.description : company.descriptionEn}
                </p>

                {/* View detail hint */}
                <div className="flex items-center gap-1 mt-4 text-[10px] font-semibold tracking-widest uppercase text-gray-300 group-hover:text-green-500 transition-colors duration-300">
                  <span>{locale === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
                  <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <MemberModal
            member={selected}
            onClose={() => setSelected(null)}
            isVi={locale === 'vi'}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
