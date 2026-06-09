'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const FEATURES = [
  {
    vi: { title: 'Chuyên gia cảnh quan dày dạn', desc: 'Đội ngũ chuyên nghiệp với nhiều năm kinh nghiệm thực tiễn trong thiết kế và thi công cảnh quan.' },
    en: { title: 'Experienced Gardening Experts', desc: 'Our skilled team brings years of hands-on experience in gardening and landscaping.' },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    vi: { title: 'Vật liệu & Công cụ chất lượng', desc: 'Chúng tôi chỉ sử dụng vật liệu và công cụ tốt nhất cho mọi dự án cảnh quan.' },
    en: { title: 'Quality Materials & Tools', desc: 'We use only the best materials and tools for every landscaping project.' },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    vi: { title: 'Thiết kế theo yêu cầu riêng', desc: 'Mỗi dự án được thiết kế độc đáo để phù hợp với phong cách và tầm nhìn cá nhân của bạn.' },
    en: { title: 'Customized Design Approach', desc: 'Each project is uniquely designed to match your personal style and vision.' },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    vi: { title: 'Dịch vụ đúng hẹn & đáng tin', desc: 'Chúng tôi tôn trọng thời gian của bạn và bàn giao dự án đúng tiến độ, không thỏa hiệp chất lượng.' },
    en: { title: 'On-Time & Reliable Service', desc: 'We respect your time and deliver projects on schedule without compromise.' },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const IMG = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg';

export default function ServicesFeatureSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: image + phone card */}
          <ScrollReveal direction="left">
            <div className="relative" style={{ height: '520px' }}>
              <div className="relative overflow-hidden w-full h-full" style={{ borderRadius: 20 }}>
                <Image src={IMG} alt={isVi ? 'Cảnh quan Lapla' : 'Lapla landscaping'} fill className="object-cover" sizes="50vw" />
              </div>
              {/* Phone card overlay */}
              <div
                className="absolute bottom-6 left-6 flex flex-col gap-1"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  borderRadius: 12,
                  padding: '16px 20px',
                  zIndex: 2,
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(199,220,73,0.8)' }}>
                  {isVi ? 'Cần hỗ trợ?' : 'Need Any Help?'}
                </p>
                <a href="tel:+84901234567" className="font-bold" style={{ color: '#ffffff', fontSize: '1.1rem', letterSpacing: '0.02em' }}>
                  (+84) 90 123 4567
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: text + features */}
          <ScrollReveal direction="right" delay={2}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Dịch vụ của chúng tôi' : 'Our Services'}
            </p>
            <h2 className="font-display font-bold mb-6 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0e1a0f' }}>
              {isVi
                ? <>Tạo dựng không gian đẹp<br />bằng tâm huyết & chuyên môn</>
                : <>Growing Beautiful Spaces with<br />Care &amp; Expertise</>}
            </h2>

            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-widest mb-8 transition-all hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-brand)', color: '#fff',
                padding: '14px 28px', borderRadius: 999,
              }}
            >
              {isVi ? 'Yêu cầu báo giá' : 'Request A Quote'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Feature list */}
            <div className="space-y-5">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(15,84,30,0.08)', borderRadius: 10, color: 'var(--color-brand)' }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                      {isVi ? f.vi.title : f.en.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? f.vi.desc : f.en.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
