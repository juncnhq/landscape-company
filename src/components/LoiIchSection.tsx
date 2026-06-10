'use client';
import { useLocale } from 'next-intl';
import ScrollReveal from './ScrollReveal';

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="12" fill="rgba(15,84,30,0.08)" />
        <path d="M24 12 L36 18 L36 30 L24 36 L12 30 L12 18 Z" stroke="#0f541e" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <path d="M18 27 L22 31 L30 21" stroke="#0f541e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    titleVi: 'Tăng Giá Trị Bất Động Sản',
    titleEn: 'Increase Property Value',
    descVi: 'Cảnh quan chuyên nghiệp có thể tăng giá trị bất động sản lên đến 15–20%, tạo ấn tượng mạnh và thu hút người mua tiềm năng.',
    descEn: 'Professional landscaping can increase property value by up to 15–20%, creating a strong impression and attracting potential buyers.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="12" fill="rgba(15,84,30,0.08)" />
        <circle cx="24" cy="22" r="7" stroke="#0f541e" strokeWidth="1.8" fill="none" />
        <path d="M12 38 C12 32 17.373 28 24 28 C30.627 28 36 32 36 38" stroke="#0f541e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M20 19.5 L22.5 22 L27 17" stroke="#0f541e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    titleVi: 'Cải Thiện Chất Lượng Sống',
    titleEn: 'Improve Quality of Life',
    descVi: 'Không gian xanh mang lại sự thư giãn, giảm stress và tạo môi trường sống trong lành, hài hòa với thiên nhiên cho cả gia đình.',
    descEn: 'Green spaces bring relaxation, reduce stress and create a healthy living environment in harmony with nature for the whole family.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="12" fill="rgba(15,84,30,0.08)" />
        <path d="M24 12 C24 12 14 18 14 26 C14 31.523 18.477 36 24 36 C29.523 36 34 31.523 34 26 C34 18 24 12 24 12 Z" stroke="#0f541e" strokeWidth="1.8" fill="none" />
        <path d="M24 20 L24 30 M20 25 L28 25" stroke="#0f541e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    titleVi: 'Bảo Vệ Môi Trường',
    titleEn: 'Environmental Protection',
    descVi: 'Giải pháp cảnh quan bền vững giúp giảm nhiệt độ đô thị, lọc không khí, bảo tồn đa dạng sinh học và tiết kiệm nước hiệu quả.',
    descEn: 'Sustainable landscaping solutions help reduce urban heat, filter air, conserve biodiversity and save water effectively.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="12" fill="rgba(15,84,30,0.08)" />
        <rect x="12" y="12" width="10" height="10" rx="2" stroke="#0f541e" strokeWidth="1.8" fill="none" />
        <rect x="26" y="12" width="10" height="10" rx="2" stroke="#0f541e" strokeWidth="1.8" fill="none" />
        <rect x="12" y="26" width="10" height="10" rx="2" stroke="#0f541e" strokeWidth="1.8" fill="none" />
        <rect x="26" y="26" width="10" height="10" rx="2" stroke="#0f541e" strokeWidth="1.8" fill="none" />
      </svg>
    ),
    titleVi: 'Tối Ưu Hóa Không Gian',
    titleEn: 'Space Optimization',
    descVi: 'Thiết kế thông minh tận dụng tối đa diện tích, biến những khoảng trống thành không gian chức năng đẹp và tiện ích cho cuộc sống.',
    descEn: 'Smart design maximizes space, turning empty areas into beautiful, functional spaces that enhance everyday living.',
  },
];

export default function LoiIchSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-brand)' }}>
            {isVi ? 'Lợi ích' : 'Benefits'}
          </p>
          <h2
            className="font-display font-bold mx-auto"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)', maxWidth: '560px', lineHeight: 1.15 }}
          >
            {isVi
              ? <>Tại sao chọn cảnh quan<br />chuyên nghiệp từ Lapla?</>
              : <>Why Choose Professional<br />Landscaping from Lapla?</>
            }
          </h2>
        </ScrollReveal>

        {/* 4-col cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.titleEn} delay={i % 4} duration={650}>
              <div
                className="group flex flex-col gap-5 bg-white h-full transition-all duration-300"
                style={{
                  padding: '32px 28px',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(15,84,30,0.14)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,84,30,0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.05)';
                }}
              >
                {/* Icon */}
                {b.icon}

                {/* Number */}
                <span
                  className="font-display font-black leading-none select-none"
                  style={{ fontSize: '3rem', color: 'rgba(15,84,30,0.06)' }}
                >
                  0{i + 1}
                </span>

                {/* Text */}
                <div className="-mt-6">
                  <h3
                    className="font-display font-bold mb-3 leading-snug"
                    style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)' }}
                  >
                    {isVi ? b.titleVi : b.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {isVi ? b.descVi : b.descEn}
                  </p>
                </div>

                {/* Check mark */}
                <div
                  className="mt-auto w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(15,84,30,0.08)', color: 'var(--color-brand)' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
