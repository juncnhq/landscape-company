'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    titleVi: 'Tư vấn & Quản lý cảnh quan',
    titleEn: 'Landscape Consulting & Management',
    descVi: 'Quy trình thiết kế, sáng tạo, tư vấn, thi công, bảo hành và bảo dưỡng toàn diện.',
    descEn: 'Full-cycle process: design, consulting, construction, warranty and maintenance.',
  },
  {
    number: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3.75 3h16.5M4.5 3v18M19.5 3v18" />
      </svg>
    ),
    titleVi: 'Thiết kế & Thi công cảnh quan',
    titleEn: 'Landscape Design & Construction',
    descVi: 'Sản phẩm theo yêu cầu dựa trên kiến thức và kinh nghiệm thực tiễn trong lĩnh vực cảnh quan.',
    descEn: 'Tailored outputs built on deep practical knowledge and field experience in landscaping.',
  },
  {
    number: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    titleVi: 'Thiết kế & Thi công Artwork',
    titleEn: 'Artwork Design & Construction',
    descVi: 'Mẫu thiết kế nghệ thuật tùy chỉnh phù hợp với quy mô và đặc thù của từng công trình.',
    descEn: 'Custom artistic designs tailored to the scale and character of each project.',
  },
  {
    number: '04',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    titleVi: 'Cung ứng lao động',
    titleEn: 'Labour Supply',
    descVi: 'Cung ứng nhân lực chuyên nghiệp cho thi công và bảo dưỡng các hạng mục cảnh quan.',
    descEn: 'Skilled workforce supply for landscape construction and maintenance projects.',
  },
  {
    number: '05',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    titleVi: 'Cung ứng vật liệu cảnh quan',
    titleEn: 'Landscape Materials Supply',
    descVi: 'Cho thuê và cung cấp cây xanh, thảm cỏ, hệ thống tưới và vật liệu cảnh quan đa dạng.',
    descEn: 'Supply and rental of trees, turf, irrigation systems and diverse landscape materials.',
  },
  {
    number: '06',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    titleVi: 'Dịch vụ bảo dưỡng',
    titleEn: 'Maintenance Services',
    descVi: 'Bảo dưỡng định kỳ cây xanh và công trình cảnh quan, đảm bảo không gian luôn xanh đẹp.',
    descEn: 'Regular maintenance of greenery and landscape works to keep spaces vibrant year-round.',
  },
];

export default function OurServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Services</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight">{t('title')}</h2>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-white p-8 md:p-10 hover:bg-gray-950 transition-colors duration-300 cursor-default"
            >
              {/* Top row: number + icon */}
              <div className="flex items-start justify-between mb-8">
                <span className="text-[10px] tracking-[0.3em] text-gray-300 group-hover:text-green-500 font-semibold transition-colors duration-300">
                  {service.number}
                </span>
                <div className="text-gray-300 group-hover:text-green-400 transition-colors duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-white mb-3 leading-snug transition-colors duration-300">
                {locale === 'vi' ? service.titleVi : service.titleEn}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                {locale === 'vi' ? service.descVi : service.descEn}
              </p>

              {/* Bottom line */}
              <div className="mt-8 h-px bg-gray-100 group-hover:bg-green-500/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
