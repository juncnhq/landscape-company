'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';

type ServiceItem = {
  id: string;
  number: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  tag: string;
  iconSvg: string | null;
};

export default function OurServicesSection({ services }: { services: ServiceItem[] }) {
  const t = useTranslations('services');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative bg-green-950 py-20 md:py-32 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* Green glow top-right */}
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-green-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
              {locale === 'vi' ? 'Dịch vụ' : 'What We Do'}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {t('title')}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-start md:items-end gap-3"
          >
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right">
              {t('subtitle')}
            </p>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold hover:text-green-300 transition-colors group"
            >
              {locale === 'vi' ? 'Xem tất cả dịch vụ' : 'View all services'}
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Services — accordion list */}
        <div className="divide-y divide-white/[0.06]">
          {services.map((service, i) => {
            const isActive = activeIndex === i;
            const isHovered = hoverIndex === i;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              >
                <button
                  className="w-full text-left group"
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="relative py-6 md:py-8 flex items-center gap-6 md:gap-10">
                    {/* Animated green left bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-green-500 origin-top"
                      animate={{ scaleY: isActive || isHovered ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    />

                    {/* Number */}
                    <span className={`text-[10px] tracking-[0.3em] font-semibold transition-colors duration-300 w-8 shrink-0 pl-4 ${isActive || isHovered ? 'text-green-500' : 'text-gray-600'}`}>
                      {service.number}
                    </span>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-0">
                        <h3 className={`text-base md:text-xl font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-green-400' : isHovered ? 'text-white' : 'text-white'}`}>
                          {locale === 'vi' ? service.titleVi : service.titleEn}
                        </h3>
                        <span className={`hidden sm:inline text-[9px] tracking-widest uppercase rounded-full px-2 py-0.5 transition-colors duration-300 ${isActive || isHovered ? 'border border-green-500/40 text-green-500/70' : 'border border-gray-700 text-gray-600'}`}>
                          {service.tag}
                        </span>
                      </div>

                      {/* Description — expands on click only */}
                      <motion.div
                        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-400 text-sm leading-relaxed pt-3 max-w-2xl">
                          {locale === 'vi' ? service.descVi : service.descEn}
                        </p>
                      </motion.div>
                    </div>

                    {/* Icon + arrow */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className={`transition-colors duration-300 ${isActive ? 'text-green-400' : isHovered ? 'text-gray-400' : 'text-gray-600'}`}>
                        {service.iconSvg && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={service.iconSvg} />
                          </svg>
                        )}
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? 'border-green-500 bg-green-500/10' : isHovered ? 'border-gray-500' : 'border-gray-700'}`}>
                        <svg
                          className={`w-3.5 h-3.5 transition-all duration-300 ${isActive ? 'text-green-400 rotate-45' : isHovered ? 'text-gray-400' : 'text-gray-600'}`}
                          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-20 grid grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden"
        >
          {[
            { value: '17+', labelVi: 'Năm kinh nghiệm', labelEn: 'Years Experience' },
            { value: '200+', labelVi: 'Dự án hoàn thành', labelEn: 'Projects Completed' },
            { value: '6', labelVi: 'Dịch vụ cốt lõi', labelEn: 'Core Services' },
          ].map((stat) => (
            <div key={stat.value} className="bg-gray-900/60 px-2 md:px-6 py-5 md:py-8 text-center">
              <p className="text-xl md:text-3xl font-bold text-green-400 mb-1">{stat.value}</p>
              <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-gray-500">
                {locale === 'vi' ? stat.labelVi : stat.labelEn}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
