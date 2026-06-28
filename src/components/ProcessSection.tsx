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
    icon: `<svg class="w-9 h-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21V10" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 13c0-3.2-2.6-4.6-5.5-4.6C6.5 11.8 9 13.6 12 13.6" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 10.4c0-3 2.4-4.3 5.2-4.3C17.2 9.3 14.8 11 12 11" /></svg>`,
  },
  {
    num: '02',
    titleVi: 'Thiết kế & Lập kế hoạch',
    titleEn: 'Design & Planning',
    descVi: 'Đội ngũ chuyên gia phác thảo thiết kế chi tiết phù hợp với không gian thực tế.',
    descEn: 'Our experts draft a detailed landscape design aligned with your actual space.',
    icon: `<svg class="w-9 h-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 21v-6.5c0-1.66 1.34-3 3-3s3 1.34 3 3V21" /><path stroke-linecap="round" stroke-linejoin="round" d="M5 21h14" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.5 20 7m0 0-3.2 3.2-2.3-2.3L18 4.5" /></svg>`,
  },
  {
    num: '03',
    titleVi: 'Triển khai thi công',
    titleEn: 'Implementation',
    descVi: 'Sau khi thiết kế được duyệt, chúng tôi tiến hành thi công theo đúng kế hoạch.',
    descEn: 'Once approved, we implement the plan with precision and care.',
    icon: `<svg class="w-9 h-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke-linecap="round" stroke-linejoin="round" /><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 18.5v-4c0-1.4 0.9-2.5 2-2.5s2 1.1 2 2.5v4M13 18.5v-6c0-1.7 1.1-3 2.5-3s2.5 1.3 2.5 3v6" /></svg>`,
  },
  {
    num: '04',
    titleVi: 'Hoàn thiện & Bàn giao',
    titleEn: 'Garden Finishing',
    descVi: 'Chăm chút từng chi tiết để không gian xanh trở nên hoàn hảo như mong muốn.',
    descEn: 'We perfect every detail so your garden looks exactly as envisioned.',
    icon: `<svg class="w-9 h-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21v-5m5 5v-7m5 7v-4" /><path stroke-linecap="round" stroke-linejoin="round" d="M4.7 9.7a3 3 0 0 1 2.7-4.2A3.6 3.6 0 0 1 14 5.8a2.9 2.9 0 0 1 3.4 3.4 2.6 2.6 0 0 1-.8 5.1H7a2.6 2.6 0 0 1-2.3-4.6Z" /></svg>`,
  },
];

// Decorative leaf-badge cluster (no fake stock faces)
const badgeColors = ['#0f541e', '#1a7a30', '#48a85a', '#c7dc49'];

export default function ProcessSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[2240px] lg:max-w-[72%] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-24">

        {/* Header — centered */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Quy trình' : 'How It Works'}
            </p>
            <h2
              className="font-display font-bold leading-tight max-w-3xl"
              style={{ fontSize: 'clamp(1.95rem, 3.5vw, 3.75rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi
                ? 'Quy trình mang khu vườn của bạn vào thực tế'
                : 'How We Bring Your Garden to Life'
              }
            </h2>
          </div>
        </ScrollReveal>

        {/* Single bordered box: icon+title / timeline+numbers / description / CTA bar */}
        <ScrollReveal delay={1} duration={600}>
          <div
            className="relative border border-[#e8e8e8] overflow-hidden"
            style={{ borderRadius: '28px', boxShadow: '0 12px 40px rgba(15, 84, 30, 0.06)' }}
          >
            {/* Decorative leaf graphic, bottom-left */}
            <svg
              className="hidden lg:block absolute left-0 bottom-0 w-40 h-40 pointer-events-none"
              style={{ color: 'var(--color-brand)', opacity: 0.07 }}
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <path d="M0 100C0 60 25 20 70 0c10 35-5 65-35 80-15 8-25 14-35 20Z" />
            </svg>

            {/* Icon + title row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-8 sm:px-12 pt-12">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center px-4 mb-6 lg:mb-0">
                  <div
                    className="process-icon w-16 h-16 flex items-center justify-center mb-4 transition-colors duration-300"
                    style={{ color: 'var(--color-brand)' }}
                    dangerouslySetInnerHTML={{ __html: step.icon }}
                  />
                  <h3
                    className="font-display font-bold text-lg leading-snug"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {isVi ? step.titleVi : step.titleEn}
                  </h3>
                </div>
              ))}
            </div>

            {/* Timeline line with number nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-8 sm:px-12">
              {steps.map((step) => (
                <div key={step.num} className="relative flex items-center justify-center py-6 px-4">
                  <span className="absolute left-0 right-0 top-1/2 h-px" style={{ backgroundColor: '#e8e8e8' }} />
                  <span
                    className="process-num relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{ backgroundColor: '#f5f2eb', color: 'var(--color-text-primary)' }}
                  >
                    {step.num}
                  </span>
                </div>
              ))}
            </div>

            {/* Description row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-8 sm:px-12 pb-12">
              {steps.map((step) => (
                <p
                  key={step.num}
                  className="text-center text-sm leading-relaxed px-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {isVi ? step.descVi : step.descEn}
                </p>
              ))}
            </div>

            {/* CTA bar inside the box */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 sm:px-12 py-6"
              style={{ backgroundColor: '#F5F2EB' }}
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 shrink-0">
                  {badgeColors.map((c, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ backgroundColor: c }}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: i === 3 ? '#0f541e' : '#ffffff' }}>
                        <path d="M12 3C8 3 4 7.5 4 12.5c0 3 2 5.5 8 5.5.5-2 .5-4 0-5.5 1.5 1.2 2.8 3 2.8 5.5 1.5-1.2 2.8-3 2.8-5C17.6 6.5 15 3 12 3z" fill="currentColor"/>
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="font-display font-bold text-sm sm:text-base" style={{ color: 'var(--color-text-primary)' }}>
                  {isVi
                    ? 'Bạn đã sẵn sàng biến khu vườn thành không gian ngoài trời tuyệt đẹp?'
                    : 'Are You Prepared to Make Your Garden a Gorgeous Outdoor Area?'}
                </p>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
              >
                {isVi ? 'Liên hệ ngay' : 'Get In Touch'}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .process-icon, .process-num { cursor: default; }
        .process-icon:hover { animation: processWiggle 0.6s ease-in-out; }
        .process-num:hover { animation: processSwing 0.6s ease-in-out; }
        @keyframes processWiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-12deg) scale(1.05); }
          40% { transform: rotate(10deg) scale(1.05); }
          60% { transform: rotate(-7deg) scale(1.05); }
          80% { transform: rotate(5deg) scale(1.05); }
        }
        @keyframes processSwing {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-4px) rotate(-8deg); }
          40% { transform: translateX(4px) rotate(8deg); }
          60% { transform: translateX(-3px) rotate(-5deg); }
          80% { transform: translateX(2px) rotate(3deg); }
        }
      `}</style>
    </section>
  );
}
