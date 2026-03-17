'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';

const services = [
  {
    number: '01',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    titleVi: 'Tư vấn & Quản lý cảnh quan',
    titleEn: 'Landscape Consulting & Management',
    descVi: 'Quy trình thiết kế, sáng tạo, tư vấn, thi công, bảo hành và bảo dưỡng toàn diện.',
    descEn: 'Full-cycle process: design, consulting, construction, warranty and maintenance.',
    tag: 'Consulting',
  },
  {
    number: '02',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3.75 3h16.5M4.5 3v18M19.5 3v18" />
      </svg>
    ),
    titleVi: 'Thiết kế & Thi công cảnh quan',
    titleEn: 'Landscape Design & Construction',
    descVi: 'Sản phẩm theo yêu cầu dựa trên kiến thức và kinh nghiệm thực tiễn trong lĩnh vực cảnh quan.',
    descEn: 'Tailored outputs built on deep practical knowledge and field experience in landscaping.',
    tag: 'Design · Build',
  },
  {
    number: '03',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    titleVi: 'Thiết kế & Thi công Artwork',
    titleEn: 'Artwork Design & Construction',
    descVi: 'Mẫu thiết kế nghệ thuật tùy chỉnh phù hợp với quy mô và đặc thù của từng công trình.',
    descEn: 'Custom artistic designs tailored to the scale and character of each project.',
    tag: 'Art · Identity',
  },
  {
    number: '04',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    titleVi: 'Cung ứng lao động',
    titleEn: 'Labour Supply',
    descVi: 'Cung ứng nhân lực chuyên nghiệp cho thi công và bảo dưỡng các hạng mục cảnh quan.',
    descEn: 'Skilled workforce supply for landscape construction and maintenance projects.',
    tag: 'Workforce',
  },
  {
    number: '05',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    titleVi: 'Cung ứng vật liệu cảnh quan',
    titleEn: 'Landscape Materials Supply',
    descVi: 'Cho thuê và cung cấp cây xanh, thảm cỏ, hệ thống tưới và vật liệu cảnh quan đa dạng.',
    descEn: 'Supply and rental of trees, turf, irrigation systems and diverse landscape materials.',
    tag: 'Materials',
  },
  {
    number: '06',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    titleVi: 'Dịch vụ bảo dưỡng',
    titleEn: 'Maintenance Services',
    descVi: 'Bảo dưỡng định kỳ cây xanh và công trình cảnh quan, đảm bảo không gian luôn xanh đẹp.',
    descEn: 'Regular maintenance of greenery and landscape works to keep spaces vibrant year-round.',
    tag: 'Maintenance',
  },
];

export default function OurServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative bg-gray-950 py-20 md:py-32 overflow-hidden">
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
                        {service.icon}
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
