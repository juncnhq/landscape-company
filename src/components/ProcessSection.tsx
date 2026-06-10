'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    num: '01',
    titleVi: 'Tư vấn thiết kế',
    titleEn: 'Design Consultation',
    descVi: 'Chúng tôi lắng nghe và thảo luận về tầm nhìn, mong muốn cho không gian xanh của bạn.',
    descEn: 'We listen and discuss your vision and preferences for your green space.',
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>`,
  },
  {
    num: '02',
    titleVi: 'Thiết kế & Lập kế hoạch',
    titleEn: 'Design & Planning',
    descVi: 'Đội ngũ chuyên gia phác thảo thiết kế chi tiết phù hợp với không gian thực tế.',
    descEn: 'Our experts draft a detailed landscape design aligned with your actual space.',
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>`,
  },
  {
    num: '03',
    titleVi: 'Triển khai thi công',
    titleEn: 'Implementation',
    descVi: 'Sau khi thiết kế được duyệt, chúng tôi tiến hành thi công theo đúng kế hoạch.',
    descEn: 'Once approved, we implement the plan with precision and care.',
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>`,
  },
  {
    num: '04',
    titleVi: 'Hoàn thiện & Bàn giao',
    titleEn: 'Garden Finishing',
    descVi: 'Chăm chút từng chi tiết để không gian xanh trở nên hoàn hảo như mong muốn.',
    descEn: 'We perfect every detail so your garden looks exactly as envisioned.',
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
  },
];

export default function ProcessSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Quy trình' : 'How It Works'}
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi
                ? <span>Quy trình mang khu vườn<br /><span style={{ color: 'var(--color-brand)' }}>của bạn vào thực tế</span></span>
                : <span>How We Bring Your<br /><span style={{ color: 'var(--color-brand)' }}>Garden to Life</span></span>
              }
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-200"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Bắt đầu dự án' : 'Start Your Project'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* 4-step bordered box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#e8e8e8]">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i % 4} duration={600}>
              <div
                className="process-step group relative p-8 h-full flex flex-col cursor-default transition-colors duration-300"
                style={{ borderRight: i < 3 ? '1px solid #e8e8e8' : 'none' }}
              >
                {/* Ghost number */}
                <span
                  className="absolute top-3 right-4 font-display font-black select-none pointer-events-none leading-none transition-colors duration-300"
                  style={{ fontSize: '5rem', color: 'rgba(130,180,64,0.08)' }}
                >
                  {step.num}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ backgroundColor: '#f5f9f0', color: 'var(--color-brand)' }}
                  dangerouslySetInnerHTML={{ __html: step.icon }}
                />

                <p
                  className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 transition-colors duration-300"
                  style={{ color: 'var(--color-brand)' }}
                >
                  {isVi ? `Bước ${step.num}` : `Step ${step.num}`}
                </p>

                <h3
                  className="font-display font-bold text-lg mb-3 leading-snug transition-colors duration-300"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {isVi ? step.titleVi : step.titleEn}
                </h3>

                <p
                  className="text-sm leading-relaxed flex-1 transition-colors duration-300"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {isVi ? step.descVi : step.descEn}
                </p>

                <div
                  className="mt-6 w-9 h-9 flex items-center justify-center border transition-all duration-300"
                  style={{ borderColor: '#e0e0e0', color: 'var(--color-text-secondary)' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <ScrollReveal delay={2}>
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5"
            style={{ backgroundColor: '#0e2208' }}
          >
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>
              {isVi
                ? '✦ Hơn 500 khách hàng tin tưởng chúng tôi trong 17 năm qua'
                : '✦ Over 500 clients have trusted us over the past 17 years'}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px', }}
            >
              {isVi ? 'Nhận tư vấn miễn phí' : 'Get Free Consultation'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Hover styles */}
        <style>{`
          .process-step:hover { background-color: var(--color-accent); }
          .process-step:hover h3 { color: white !important; }
          .process-step:hover p { color: rgba(255,255,255,0.75) !important; }
          .process-step:hover [style*="f5f9f0"] { background-color: rgba(255,255,255,0.2) !important; color: white !important; }
          .process-step:hover [style*="e0e0e0"] { border-color: rgba(255,255,255,0.4) !important; color: white !important; }
          .process-step:hover [style*="rgba(130,180,64,0.08)"] { color: rgba(255,255,255,0.1) !important; }
        `}</style>
      </div>
    </section>
  );
}
