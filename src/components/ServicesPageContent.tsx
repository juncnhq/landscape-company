'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

// ── Service data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'consulting',
    icon: '📋',
    accent: '#0891b2',         // cyan-600
    accentLight: '#ecfeff',    // cyan-50
    accentBorder: '#a5f3fc',   // cyan-200
    titleVi: 'Tư Vấn & Quản Lý Cảnh Quan',
    titleEn: 'Landscape Consulting & Management',
    subtitleVi: 'Bao phủ toàn bộ vòng đời dự án',
    subtitleEn: 'Full project lifecycle coverage',
    descVi:
      'FAM cung cấp dịch vụ tư vấn và quản lý toàn diện cho mọi giai đoạn của dự án cảnh quan — từ ý tưởng ban đầu đến bàn giao và bảo dưỡng dài hạn.',
    descEn:
      'FAM provides end-to-end consultancy and management across every phase of a landscape project — from initial concept through final handover and long-term maintenance.',
    bulletsVi: [
      'Thiết kế ý tưởng (Concept Design)',
      'Thiết kế kỹ thuật (Technical Design)',
      'Bản vẽ thi công (Construction Drawing)',
      'Quản lý & giám sát công trường',
      'Dịch vụ bảo hành',
      'Bảo dưỡng định kỳ',
    ],
    bulletsEn: [
      'Concept Design',
      'Technical Design',
      'Construction Drawing',
      'Site Management & Supervision',
      'Warranty Service',
      'Ongoing Maintenance',
    ],
  },
  {
    id: 'construction',
    icon: '🏗️',
    accent: '#16a34a',
    accentLight: '#f0fdf4',
    accentBorder: '#86efac',
    titleVi: 'Thiết Kế & Thi Công Cảnh Quan',
    titleEn: 'Landscape Design & Construction',
    subtitleVi: 'Hạ tầng, cảnh quan cứng & mềm',
    subtitleEn: 'Infrastructure, hardscape & softscape',
    descVi:
      'Dịch vụ thiết kế và thi công cảnh quan toàn diện, bao gồm hạ tầng kỹ thuật, cảnh quan cứng, cảnh quan mềm, hệ thống chiếu sáng và tưới tiêu tự động.',
    descEn:
      'Comprehensive landscape design and construction covering technical infrastructure, hardscape, softscape, lighting systems, and automatic irrigation.',
    bulletsVi: [
      'Hạ tầng: thoát nước, điện ngầm, lớp nền',
      'Cảnh quan cứng: lát đá, lối đi, tường chắn, tiểu cảnh khô, kết cấu đỡ',
      'Cảnh quan mềm: cây, thảm cỏ, hoa, cây bụi',
      'Hệ thống chiếu sáng cảnh quan',
      'Hệ thống tưới tiêu tự động',
    ],
    bulletsEn: [
      'Infrastructure: drainage, underground electric, base layers',
      'Hardscape: stone paving, walkways, retaining walls, dry features, support structures',
      'Softscape: trees, turf, flowers, shrubs',
      'Landscape lighting systems',
      'Automatic irrigation systems',
    ],
  },
  {
    id: 'golf',
    icon: '⛳',
    accent: '#059669',
    accentLight: '#ecfdf5',
    accentBorder: '#6ee7b7',
    titleVi: 'Cảnh Quan Sân Golf',
    titleEn: 'Golf Course Landscape',
    subtitleVi: 'Chuyên gia cỏ & tưới tiêu sân golf',
    subtitleEn: 'Turf & irrigation specialists',
    descVi:
      'FAM có chuyên môn sâu trong thiết kế, thi công và bảo dưỡng cảnh quan sân golf — từ lựa chọn loại cỏ đến hệ thống tưới tiêu Rainbird đạt tiêu chuẩn quốc tế.',
    descEn:
      'FAM has deep expertise in golf course landscape design, construction, and maintenance — from turf selection to Rainbird-certified automatic irrigation systems.',
    bulletsVi: [
      'Lựa chọn loại cỏ: Paspalum, Bermuda, Zoysia',
      'Thiết kế & lắp đặt tưới tiêu tự động (chứng nhận Rainbird)',
      'Cảnh quan bunker và fairway',
      'Bảo dưỡng quanh năm',
    ],
    bulletsEn: [
      'Turf selection: Paspalum, Bermuda, Zoysia',
      'Automatic irrigation design & installation (Rainbird certified)',
      'Bunker and fairway landscaping',
      'Year-round maintenance',
    ],
  },
  {
    id: 'artwork',
    icon: '🎨',
    accent: '#7c3aed',
    accentLight: '#f5f3ff',
    accentBorder: '#c4b5fd',
    titleVi: 'Thi Công Artwork & Iconic',
    titleEn: 'Artwork & Iconic Construction',
    subtitleVi: 'Kiến trúc nghệ thuật & công trình biểu tượng',
    subtitleEn: 'Artistic architecture & landmark structures',
    descVi:
      'Thiết kế và thi công các công trình nghệ thuật độc đáo và biểu tượng mang tính nhận diện cao, được phát triển theo phương pháp tiếp cận tỷ lệ.',
    descEn:
      'Design and construction of unique artistic structures and landmark installations, developed using a scale-based design approach.',
    bulletsVi: [
      'Công trình biểu tượng và nghệ thuật theo yêu cầu',
      'Phương pháp thiết kế theo tỷ lệ',
      'Tích hợp vào tổng thể cảnh quan',
      'Tham chiếu: Cầu Đất Farm Đà Lạt, Novaworld Hồ Tràm',
    ],
    bulletsEn: [
      'Custom iconic structures and art installations',
      'Scale-based design approach',
      'Integration into the overall landscape concept',
      'References: Cau Dat Farm Da Lat, Novaworld Ho Tram',
    ],
  },
  {
    id: 'labour',
    icon: '👷',
    accent: '#d97706',
    accentLight: '#fffbeb',
    accentBorder: '#fcd34d',
    titleVi: 'Cung Ứng Lao Động',
    titleEn: 'Labour Supply',
    subtitleVi: 'Nhân lực thi công & bảo dưỡng cảnh quan',
    subtitleEn: 'Skilled landscape construction & maintenance workforce',
    descVi:
      'Cung cấp nhân lực có tay nghề cho các dự án thi công và bảo dưỡng cảnh quan — từ công nhân lành nghề đến giám sát công trường và kỹ thuật viên.',
    descEn:
      'Supply of skilled personnel for landscape construction and maintenance projects — from skilled workers to on-site supervisors and technical staff.',
    bulletsVi: [
      'Công nhân thi công cảnh quan lành nghề',
      'Đội bảo dưỡng chuyên nghiệp',
      'Giám sát công trường và kỹ thuật viên',
    ],
    bulletsEn: [
      'Skilled landscape construction workers',
      'Maintenance crews',
      'On-site supervisors and technical staff',
    ],
  },
  {
    id: 'materials',
    icon: '📦',
    accent: '#2563eb',
    accentLight: '#eff6ff',
    accentBorder: '#93c5fd',
    titleVi: 'Cung Cấp Vật Tư Cảnh Quan',
    titleEn: 'Landscape Materials Supply',
    subtitleVi: 'Cây xanh, cỏ, thiết bị tưới tiêu & vật tư',
    subtitleEn: 'Plants, turf, irrigation equipment & materials',
    descVi:
      'Cung cấp đầy đủ vật tư cảnh quan chất lượng cao — từ cây xanh, cỏ đến thiết bị tưới tiêu và các vật liệu khác, thông qua mạng lưới đối tác đáng tin cậy.',
    descEn:
      'Full supply of high-quality landscape materials — from trees and turf to irrigation equipment and other materials, through a trusted partner network.',
    bulletsVi: [
      'Cây xanh, cây bụi, thảm phủ mặt đất',
      'Các loại cỏ và thảm cỏ',
      'Thiết bị tưới tiêu (đối tác Rainbird, Lumos)',
      'Các vật tư và thiết bị cảnh quan khác',
    ],
    bulletsEn: [
      'Trees, shrubs, ground cover',
      'Turf and grass varieties',
      'Irrigation equipment (Rainbird, Lumos partners)',
      'Other landscape materials and equipment',
    ],
  },
] as const;

// ── Service card ──────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  locale,
  ctaLabel,
  contactHref,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  locale: string;
  ctaLabel: string;
  contactHref: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isVi = locale === 'vi';
  const title = isVi ? service.titleVi : service.titleEn;
  const subtitle = isVi ? service.subtitleVi : service.subtitleEn;
  const desc = isVi ? service.descVi : service.descEn;
  const bullets = isVi ? service.bulletsVi : service.bulletsEn;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Coloured top bar */}
      <div className="h-1 w-full" style={{ backgroundColor: service.accent }} />

      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:gap-12">

          {/* ── Left: meta + description ── */}
          <div className="flex-1 min-w-0 mb-8 md:mb-0">
            <div className="flex items-start gap-4 mb-5">
              {/* Ghost number */}
              <span
                className="text-6xl font-black leading-none select-none shrink-0 mt-1"
                style={{ color: `${service.accent}18` }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {/* Icon + title block */}
              <div>
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-3"
                  style={{ backgroundColor: service.accentLight }}
                >
                  {service.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  {title}
                </h2>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mt-1"
                  style={{ color: service.accent }}
                >
                  {subtitle}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              {desc}
            </p>

            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2.5 transition-colors"
              style={{
                backgroundColor: service.accentLight,
                color: service.accent,
                border: `1px solid ${service.accentBorder}`,
              }}
            >
              {ctaLabel} →
            </Link>
          </div>

          {/* ── Right: bullet list ── */}
          <div
            className="md:w-72 lg:w-80 shrink-0 rounded-xl p-5 md:p-6"
            style={{ backgroundColor: service.accentLight, border: `1px solid ${service.accentBorder}` }}
          >
            <p
              className="text-[10px] font-bold tracking-widest uppercase mb-4"
              style={{ color: service.accent }}
            >
              {isVi ? 'Phạm vi dịch vụ' : 'Scope of Work'}
            </p>
            <ul className="space-y-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <svg
                    className="mt-0.5 shrink-0 w-4 h-4"
                    style={{ color: service.accent }}
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPageContent() {
  const t = useTranslations('servicesPage');
  const locale = useLocale();
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* ════════════════════════ HERO ══ */}
      <section className="relative bg-green-950 pt-36 md:pt-48 pb-20 md:pb-28 overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
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
            className="mt-16 flex justify-center"
          >
            <div className="w-px h-16 bg-gradient-to-b from-green-500/70 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ SERVICES LIST ══ */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 md:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              locale={locale}
              ctaLabel={t('contactCta')}
              contactHref={`/${locale}/contact`}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════ CTA ══ */}
      <section
        ref={ctaRef}
        className="relative py-20 md:py-32 bg-green-700 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/50 to-green-900/50 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {t('finalCtaTitle')}
            </h2>
            <p className="text-green-100 text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              {t('finalCtaSubtitle')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-green-50 transition-colors shadow-xl"
            >
              {t('finalCtaButton')} →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
