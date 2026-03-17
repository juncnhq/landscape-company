'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ── Static data ────────────────────────────────────────────────────────────────
const CULTURE_CARDS = [
  { tKey: 'card1', icon: '📈' },
  { tKey: 'card2', icon: '💼' },
  { tKey: 'card3', icon: '🤝' },
] as const;

const POSITIONS = [
  {
    titleVi: 'Kiến Trúc Sư Cảnh Quan',
    titleEn: 'Landscape Architect',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Đà Nẵng / Công trường',
    locationEn: 'Da Nang / On-site',
  },
  {
    titleVi: 'Giám Sát Thi Công Sân Golf',
    titleEn: 'Golf Course Construction Supervisor',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Trên toàn quốc',
    locationEn: 'Nationwide',
  },
  {
    titleVi: 'Chỉ Huy Trưởng Cảnh Quan',
    titleEn: 'Site Manager – Landscape',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Đà Nẵng / Miền Trung',
    locationEn: 'Da Nang / Central Vietnam',
  },
  {
    titleVi: 'Công Nhân Thi Công Cảnh Quan',
    titleEn: 'Landscape Construction Worker',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Nhiều công trường',
    locationEn: 'Multiple sites',
  },
  {
    titleVi: 'Nhân Viên Phát Triển Kinh Doanh',
    titleEn: 'Business Development Executive',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Đà Nẵng',
    locationEn: 'Da Nang',
  },
];

const GOOGLE_FORM = 'https://forms.gle/PnYikWTgC9A1DwFy6';
const MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.836369!2d108.2441229!3d15.9959172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314211621b2b61a1%3A0x3eccf87e6b972b36!2zQ8O0bmcgdHkgVE5ISCBIb2EgdsOgIEjGoW4gVGjhur8gTuG7rWE!5e0!3m2!1sen!2svn!4v1710000000000!5m2!1sen!2svn';

// ── Component ─────────────────────────────────────────────────────────────────
export default function CareersPageContent() {
  const t = useTranslations('careersPage');
  const locale = useLocale();
  const isVi = locale === 'vi';

  const cultureRef   = useRef(null);
  const positionsRef = useRef(null);
  const applyRef     = useRef(null);
  const contactRef   = useRef(null);

  const cultureInView   = useInView(cultureRef,   { once: true, margin: '-60px' });
  const positionsInView = useInView(positionsRef, { once: true, margin: '-60px' });
  const applyInView     = useInView(applyRef,     { once: true, margin: '-60px' });
  const contactInView   = useInView(contactRef,   { once: true, margin: '-60px' });

  return (
    <>
      {/* ══════════════════════════════════════════════ HERO ══ */}
      <section className="relative bg-gray-950 pt-36 md:pt-48 pb-24 md:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-green-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-green-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6">
              {t('heroEyebrow')}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-14 flex justify-center"
          >
            <div className="w-px h-14 bg-gradient-to-b from-green-500/70 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CULTURE ══ */}
      <section ref={cultureRef} className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={cultureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-3">
              {t('cultureEyebrow')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t('cultureTitle')}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">{t('cultureSubtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CULTURE_CARDS.map(({ tKey, icon }, i) => (
              <motion.div
                key={tKey}
                initial={{ opacity: 0, y: 32 }}
                animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 hover:border-green-100 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl mb-5">
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{t(`${tKey}Title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`${tKey}Text`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ POSITIONS ══ */}
      <section ref={positionsRef} className="py-16 md:py-24 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-3">
              {t('positionsEyebrow')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('positionsTitle')}</h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">{t('positionsSubtitle')}</p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {POSITIONS.map((pos, i) => (
              <motion.a
                key={pos.titleEn}
                href={GOOGLE_FORM}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={positionsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-center justify-between bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-xl px-6 py-5 transition-all hover:bg-gray-800"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-base leading-snug">
                      {isVi ? pos.titleVi : pos.titleEn}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {isVi ? pos.typeVi : pos.typeEn} · {isVi ? pos.locationVi : pos.locationEn}
                    </p>
                  </div>
                </div>
                <span className="text-green-400 text-sm font-medium group-hover:translate-x-1 transition-transform shrink-0 ml-4">
                  {isVi ? 'Ứng tuyển →' : 'Apply →'}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ APPLY ══ */}
      <section ref={applyRef} className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={applyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-3">
              {t('applyEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('applyTitle')}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">{t('applySubtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={applyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
          >
            <iframe
              src={GOOGLE_FORM}
              title="FAM Careers Application Form"
              className="w-full"
              style={{ height: '820px', border: 'none' }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════ CONTACT ══ */}
      <section ref={contactRef} className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-3">
              {t('contactEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('contactTitle')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5"
            >
              {[
                {
                  icon: '✉️',
                  label: 'Email',
                  value: 'hr@fam.com.vn',
                  href: 'mailto:hr@fam.com.vn',
                },
                {
                  icon: '📞',
                  label: isVi ? 'Điện thoại' : 'Phone',
                  value: '(+84) 02363 611 589',
                  href: 'tel:+842363611589',
                },
                {
                  icon: '📍',
                  label: isVi ? 'Địa chỉ' : 'Address',
                  value: isVi
                    ? 'Lô 50, B2-110, Khu đô thị ven sông Hòa Quý – Đồng Nò, Phường Ngũ Hành Sơn, TP Đà Nẵng'
                    : 'Lot 50, B2-110, Hoa Quy – Dong No Riverside Urban Area, Ngu Hanh Son, Da Nang',
                  href: undefined,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex gap-4 items-start">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-gray-800 text-sm hover:text-green-600 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-800 text-sm leading-relaxed">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Google Maps embed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]"
            >
              <iframe
                src={MAPS_EMBED}
                title="FAM Office Location"
                className="w-full h-full"
                style={{ border: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
