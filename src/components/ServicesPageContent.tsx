'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

type DbService = {
  id: string; slug: string; icon: string;
  titleVi: string; titleEn: string;
  subtitleVi: string; subtitleEn: string;
  descVi?: string; descEn?: string;
  descriptionVi?: string; descriptionEn?: string;
  bulletsVi?: string[]; bulletsEn?: string[];
  images?: string[]; published?: boolean; order?: number;
  createdAt?: Date; updatedAt?: Date;
};

export const SERVICES: (DbService & { order: number })[] = [
  {
    id: 'consulting', slug: 'consulting', icon: '📋', order: 1,
    titleVi: 'Tư Vấn & Quản Lý Cảnh Quan', titleEn: 'Landscape Consulting & Management',
    subtitleVi: 'Bao phủ toàn bộ vòng đời dự án', subtitleEn: 'Full project lifecycle coverage',
    descVi: 'Lapla cung cấp dịch vụ tư vấn và quản lý toàn diện cho mọi giai đoạn của dự án cảnh quan — từ ý tưởng ban đầu đến bàn giao và bảo dưỡng dài hạn.',
    descEn: 'Lapla provides end-to-end consultancy and management across every phase of a landscape project — from initial concept through final handover and long-term maintenance.',
    bulletsVi: ['Thiết kế ý tưởng','Thiết kế kỹ thuật','Bản vẽ thi công','Quản lý & giám sát','Dịch vụ bảo hành','Bảo dưỡng định kỳ'],
    bulletsEn: ['Concept Design','Technical Design','Construction Drawing','Site Management','Warranty Service','Periodic Maintenance'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png'],
  },
  {
    id: 'design', slug: 'design', icon: '🌿', order: 2,
    titleVi: 'Thiết Kế & Thi Công Cảnh Quan', titleEn: 'Landscape Design & Construction',
    subtitleVi: 'Từ bản vẽ đến hiện thực', subtitleEn: 'From blueprint to reality',
    descVi: 'Đội ngũ kiến trúc sư và kỹ sư cảnh quan của Lapla chuyên thiết kế và thi công các không gian xanh đẳng cấp, phù hợp với mọi quy mô và phong cách.',
    descEn: 'Our landscape architects and engineers specialize in designing and constructing premium green spaces suited to any scale and style.',
    bulletsVi: ['Thiết kế sân vườn','Cảnh quan cứng (hardscape)','Hồ nước & thác nước','Hệ thống đèn cảnh quan','Cây xanh & thảm cỏ'],
    bulletsEn: ['Garden Design','Hardscape','Water Features','Landscape Lighting','Plants & Turf'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png'],
  },
  {
    id: 'maintenance', slug: 'maintenance', icon: '🔧', order: 3,
    titleVi: 'Bảo Dưỡng & Chăm Sóc', titleEn: 'Maintenance & Care',
    subtitleVi: 'Giữ vẻ đẹp lâu dài', subtitleEn: 'Preserving beauty long-term',
    descVi: 'Dịch vụ bảo dưỡng định kỳ giúp không gian xanh của bạn luôn tươi tốt và đẹp đẽ suốt năm, với đội ngũ chăm sóc tận tâm và chuyên nghiệp.',
    descEn: 'Our regular maintenance service keeps your green spaces lush and beautiful year-round, with a dedicated and professional care team.',
    bulletsVi: ['Cắt tỉa định kỳ','Bón phân & tưới tiêu','Kiểm soát sâu bệnh','Thay thế cây','Vệ sinh cảnh quan'],
    bulletsEn: ['Regular Trimming','Fertilizing & Irrigation','Pest Control','Plant Replacement','Landscape Cleaning'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg'],
  },
];

function ServiceCard({ service, index, locale, contactHref }: {
  service: DbService; index: number; locale: string; contactHref: string;
}) {
  const isVi = locale === 'vi';
  const title = isVi ? service.titleVi : service.titleEn;
  const subtitle = isVi ? service.subtitleVi : service.subtitleEn;
  const desc = isVi ? (service.descVi || service.descriptionVi || '') : (service.descEn || service.descriptionEn || '');
  const bullets = isVi ? (service.bulletsVi || []) : (service.bulletsEn || []);
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal delay={index % 2}>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        style={{ paddingBottom: '60px', marginBottom: '60px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        {/* Number + content */}
        <div className={isEven ? 'order-2 lg:order-1' : 'order-2'}>
          <div className="flex items-center gap-4 mb-5">
            <span className="font-display font-black text-6xl leading-none select-none" style={{ color: 'rgba(15,84,30,0.08)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-12 flex items-center justify-center text-2xl" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)' }}>
              {service.icon}
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-brand)' }}>{subtitle}</p>
          <h2 className="font-display font-bold mb-4 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--color-text-primary)' }}>{title}</h2>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>{desc}</p>

          {bullets.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {bullets.map(b => (
                <li key={b} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="var(--color-brand)" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={contactHref}
            className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-brand)', color: '#ffffff', padding: '13px 28px', borderRadius: 'var(--radius-md)' }}
          >
            {isVi ? 'Liên hệ tư vấn' : 'Get a Quote'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Image */}
        <div className={`${isEven ? 'order-1 lg:order-2' : 'order-1'} relative`} style={{ height: '420px', borderRadius: '20px', overflow: 'hidden' }}>
          {(service.images?.[0]) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={service.images[0]} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
              {service.icon}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ServicesPageContent({ services }: { services: DbService[] }) {
  const t = useTranslations('servicesPage');
  const locale = useLocale();
  const isVi = locale === 'vi';
  const list = services.length > 0 ? services : SERVICES;

  return (
    <section className="leafix-section" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {list.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} locale={locale} contactHref={`/${locale}#contact`} />
        ))}

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-12 rounded-3xl" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
            {isVi ? 'Bắt đầu dự án' : 'Start Your Project'}
          </p>
          <h3 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-text-primary)' }}>
            {t('finalCtaTitle')}
          </h3>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto 2rem' }}>
            {t('finalCtaSubtitle')}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-brand)', color: '#ffffff', padding: '15px 36px', borderRadius: 'var(--radius-xl)' }}
          >
            {t('finalCtaButton')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
