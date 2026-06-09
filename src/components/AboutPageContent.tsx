'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import TimelineSection from './TimelineSection';
import TeamSection from './TeamSection';
import TestimonialsSection from './TestimonialsSection';

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return count;
}

const IMG1 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png';
const IMG2 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg';
const IMG3 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png';
const IMG4 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg';
const IMG5 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png';

const FEATURES = {
  vi: ['Đội ngũ cảnh quan chuyên nghiệp', 'Thực hành bền vững', 'Giải pháp ngoài trời tùy chỉnh', 'Dịch vụ đáng tin cậy'],
  en: ['Expert Landscaping Team', 'Sustainable Practices', 'Custom Outdoor Solutions', 'Trusted & Reliable Service'],
};

const THUMBS = [
  [IMG1, IMG2, IMG3],
  [IMG5, IMG2, IMG4],
  [IMG3, IMG1, IMG4],
  [IMG5, IMG1, IMG3],
];

const STATS = [
  { n: 200, suffix: '+', vi: 'Dự án hoàn thành',     en: 'Beautiful Lawns Designed' },
  { n: 99,  suffix: '%', vi: 'Khách hàng hài lòng',  en: 'Customer Satisfaction Rate' },
  { n: 17,  suffix: '+', vi: 'Năm kinh nghiệm',      en: 'Years of Experience' },
  { n: 500, suffix: '+', vi: 'Nhân sự chuyên nghiệp',en: 'Expert Staff Members' },
];

const FAQ_ITEMS = {
  vi: [
    { q: 'Cung cấp dịch vụ cảnh quan chất lượng cao', a: 'Lapla cung cấp dịch vụ cảnh quan toàn diện từ thiết kế, thi công đến bảo dưỡng. Với cam kết chất lượng cao và bền vững, chúng tôi đồng hành cùng mọi công trình từ dân dụng đến thương mại.' },
    { q: '01. Làm thế nào để bắt đầu với dịch vụ của chúng tôi?', a: 'Liên hệ qua form báo giá hoặc điện thoại. Đội ngũ chuyên gia sẽ tư vấn và khảo sát miễn phí, đề xuất giải pháp phù hợp nhất với nhu cầu của bạn.' },
    { q: '03. Một dự án cảnh quan mất bao lâu?', a: 'Thời gian phụ thuộc vào quy mô và độ phức tạp. Dự án nhỏ thường 1–2 tuần, dự án lớn 1–6 tháng. Chúng tôi luôn cam kết tiến độ đã thỏa thuận với khách hàng.' },
  ],
  en: [
    { q: 'Providing Dependable, High-Quality Lawn And Garden Care.', a: 'Lapla provides comprehensive landscaping services from design to construction and maintenance, committed to high quality and sustainability for every residential and commercial project.' },
    { q: '01. How Do I Get Started With Your Services?', a: 'Contact us via our quote form or phone. Our expert team will provide a free consultation and site survey to propose the most suitable solution for your specific needs.' },
    { q: '03. How Long Does A Landscaping Project Take?', a: 'Timeline depends on scale and complexity. Small projects typically take 1–2 weeks, while larger ones may take 1–6 months. We always commit to the agreed schedule.' },
  ],
};

const PROCESS = [
  { vi: 'Tư vấn & Khảo sát', en: 'Discovery & Consultation' },
  { vi: 'Tích hợp cây bản địa', en: 'Native Plant Integration' },
  { vi: 'Hệ thống tưới tiêu', en: 'Water-Efficient Irrigation' },
  { vi: 'Bảo dưỡng định kỳ', en: 'Ongoing Maintenance' },
];

const PROCESS_ICONS = [
  <svg key="p1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  <svg key="p2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.5 2 3 7 3 12c0 4.5 3.5 8 9 8 1.5-3 1.5-6 0-9 2.5 1.5 5 4 5 8 2-1.5 4-4 4-7 0-5.5-4-10-9-10z" /></svg>,
  <svg key="p3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.5 2 5 5 5 8.5c0 5.5 7 13.5 7 13.5s7-8 7-13.5C19 5 15.5 2 12 2zm0 6a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" /></svg>,
  <svg key="p4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
];

/* ─────────────────────────────────── */
export default function AboutPageContent() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [openFaq, setOpenFaq] = useState(1);

  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const c0 = useCounter(STATS[0].n, statsInView);
  const c1 = useCounter(STATS[1].n, statsInView);
  const c2 = useCounter(STATS[2].n, statsInView);
  const c3 = useCounter(STATS[3].n, statsInView);
  const counts = [c0, c1, c2, c3];

  const faqItems = isVi ? FAQ_ITEMS.vi : FAQ_ITEMS.en;
  const features = isVi ? FEATURES.vi : FEATURES.en;

  return (
    <>
      {/* ═══════════════════════════════════
          SECTION 1 — Collage + intro
      ════════════════════════════════════ */}
      <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT: collage */}
            <ScrollReveal direction="left">
              <div className="relative select-none" style={{ height: '500px' }}>

                {/* Small landscape image — top left */}
                <div className="absolute overflow-hidden" style={{
                  top: 0, left: 0, width: '54%', height: '210px',
                  borderRadius: 20, zIndex: 1,
                }}>
                  <Image src={IMG1} alt="Lapla project" fill className="object-cover" sizes="30vw" />
                </div>

                {/* Years badge — top right of collage */}
                <div className="absolute flex items-center gap-3" style={{
                  top: 12, right: 0, zIndex: 3,
                }}>
                  <p className="font-display font-black leading-none" style={{ fontSize: '3.2rem', color: 'var(--color-brand)' }}>17+</p>
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'Năm kinh' : 'Years of'}
                    </p>
                    <p className="text-xs font-semibold leading-tight" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'nghiệm' : 'experienced'}
                    </p>
                  </div>
                </div>

                {/* Large portrait — bottom right */}
                <div className="absolute overflow-hidden" style={{
                  bottom: 0, right: 0, width: '60%', height: '320px',
                  borderRadius: 20, zIndex: 2,
                }}>
                  <Image src={IMG2} alt="Lapla landscape" fill className="object-cover" sizes="35vw" />
                </div>

                {/* Monstera leaf — bottom left */}
                <div className="absolute" style={{
                  bottom: 0, left: 0, zIndex: 1, opacity: 0.9,
                }}>
                  <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 180 C100 180 20 140 10 80 C5 50 25 20 55 20 C70 20 85 30 95 45 C90 30 95 10 110 5 C130 -3 155 10 160 35 C170 70 145 110 120 140 L100 180Z" fill="var(--color-brand)" opacity="0.12"/>
                    <path d="M100 180 C100 180 20 140 10 80 C5 50 25 20 55 20 C70 20 85 30 95 45 C90 30 95 10 110 5 C130 -3 155 10 160 35 C170 70 145 110 120 140 L100 180Z" stroke="var(--color-brand)" strokeWidth="1" fill="none" opacity="0.4"/>
                    <line x1="100" y1="45" x2="100" y2="180" stroke="var(--color-brand)" strokeWidth="1.5" opacity="0.3"/>
                    <line x1="55" y1="60" x2="100" y2="90" stroke="var(--color-brand)" strokeWidth="1" opacity="0.25"/>
                    <line x1="40" y1="90" x2="100" y2="110" stroke="var(--color-brand)" strokeWidth="1" opacity="0.25"/>
                    <line x1="145" y1="65" x2="100" y2="95" stroke="var(--color-brand)" strokeWidth="1" opacity="0.25"/>
                    <line x1="150" y1="95" x2="100" y2="120" stroke="var(--color-brand)" strokeWidth="1" opacity="0.25"/>
                  </svg>
                </div>

              </div>
            </ScrollReveal>

            {/* RIGHT: text */}
            <ScrollReveal direction="right" delay={2}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Về chúng tôi' : 'About Us'}
              </p>
              <h2 className="font-display font-bold leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', color: '#0e1a0f' }}>
                {isVi
                  ? <>Thiết kế không gian ngoài trời<br />truyền cảm hứng</>
                  : <>Designing Outdoor Spaces<br />That Inspire</>}
              </h2>
              <p className="mb-7 leading-relaxed text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '26px', maxWidth: '480px' }}>
                {isVi
                  ? 'Lapla là nông trại cảnh quan vi mô đam mê thực phẩm tươi và các thành phố xanh hơn. Chúng tôi cung cấp giải pháp xanh phong phú cho các hộ gia đình, nhà hàng và bất kỳ ai đề cao cuộc sống bền vững.'
                  : 'Lapla is a local microgreen farm passionate about fresh food and greener cities. We provide nutrient-rich microgreens to homes, restaurants, and anyone who values healthy, eco-friendly produce.'}
              </p>

              {/* Feature 2-col */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8">
                {features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Image
                      src={IMG3}
                      alt=""
                      width={18}
                      height={18}
                      className="shrink-0 object-cover"
                      style={{ borderRadius: 3 }}
                    />
                    <span className="text-sm font-semibold" style={{ color: '#222' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CEO + Call side by side */}
              <div className="flex items-center gap-0" style={{
                borderTop: '1px solid rgba(0,0,0,0.08)',
                paddingTop: 24,
              }}>
                {/* CEO */}
                <div className="flex items-center gap-3 flex-1 pr-6">
                  <div className="relative shrink-0 overflow-hidden" style={{ width: 48, height: 48, borderRadius: '50%' }}>
                    <Image src={IMG5} alt="CEO" fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#111' }}>Nguyễn Văn Hoàng</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'CEO & Sáng lập' : 'CEO & founder'}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 56, backgroundColor: 'rgba(0,0,0,0.1)' }} />

                {/* Call */}
                <div className="flex items-center gap-3 flex-1 pl-6">
                  <div className="relative shrink-0 overflow-hidden" style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid var(--color-brand)' }}>
                    <Image src={IMG3} alt="Call" fill className="object-cover" sizes="44px" />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(15,84,30,0.5)' }}>
                      <svg width="18" height="18" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'Gọi bất cứ lúc nào' : 'Call Us Any Time'}
                    </p>
                    <a href="tel:+84901234567" className="text-sm font-bold" style={{ color: '#111' }}>
                      (+84) 90 123 4567
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 2 — Stats row
      ════════════════════════════════════ */}
      <section ref={statsRef as React.RefObject<HTMLDivElement>} className="py-16 md:py-20" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <p className="text-center font-semibold mb-12" style={{ fontSize: '1.1rem', color: '#111' }}>
            {isVi ? 'Thành tích của chúng tôi nói lên tất cả' : 'Our Experience Speaks for Itself'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.en}
                className="flex flex-col px-8 py-4"
                style={{ borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}
              >
                <p className="font-display font-black tabular-nums mb-1 leading-none" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#111' }}>
                  {counts[i]}<span style={{ color: '#111' }}>{stat.suffix}</span>
                </p>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {isVi ? stat.vi : stat.en}
                </p>
                {/* Thumbnail row */}
                <div className="flex gap-1.5">
                  {THUMBS[i].map((src, j) => (
                    <div key={j} className="overflow-hidden" style={{
                      width: 36, height: 36,
                      borderRadius: i % 2 === 1 ? '50%' : 6,
                      flexShrink: 0, border: '2px solid white',
                      marginLeft: j > 0 ? -8 : 0,
                    }}>
                      <Image src={src} alt="" width={36} height={36} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 3 — FAQ + image
      ════════════════════════════════════ */}
      <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#f5f2ec' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* LEFT */}
            <ScrollReveal direction="left">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Thêm về chúng tôi' : 'More About'}
              </p>
              <h2 className="font-display font-bold mb-3 leading-tight" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', color: '#0e1a0f' }}>
                {isVi
                  ? <>Phát triển vẻ đẹp qua<br />sự tận tâm và tin cậy</>
                  : <>Growing Beauty Through<br />Honest, Reliable Care</>}
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)', maxWidth: '480px' }}>
                {isVi
                  ? 'Cung cấp dịch vụ cảnh quan xanh bền vững nâng cao giá trị thẩm mỹ, hỗ trợ tăng trưởng lành mạnh và mang lại cho khách hàng thêm thời gian.'
                  : 'To provide dependable, eco-conscious lawn and garden care that enhances curb appeal, supports healthy growth, and gives our clients more time.'}
              </p>

              {/* Simple accordion */}
              <div>
                {faqItems.map((item, i) => (
                  <div
                    key={i}
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                  >
                    <button
                      className="w-full flex items-center justify-between text-left py-5 gap-4"
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    >
                      <span className="text-sm font-bold" style={{ color: openFaq === i ? 'var(--color-brand)' : '#111' }}>
                        {item.q}
                      </span>
                      <span className="shrink-0 w-6 h-6 flex items-center justify-center" style={{
                        color: openFaq === i ? 'var(--color-brand)' : 'var(--color-text-secondary)',
                        fontSize: '1.2rem', fontWeight: 300, lineHeight: 1,
                      }}>
                        {openFaq === i ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="pb-5">
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* RIGHT: image */}
            <ScrollReveal direction="right" delay={2}>
              <div className="relative overflow-hidden" style={{ borderRadius: 20, height: '500px' }}>
                <Image src={IMG4} alt="Landscaper at work" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 4 — Company Solution
      ════════════════════════════════════ */}
      <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Centered header */}
          <ScrollReveal className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Giải pháp công ty' : 'Our Company Solution'}
            </p>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#0e1a0f' }}>
              {isVi ? 'Thiết kế cảnh quan chuyên nghiệp & tận tâm' : 'Boutique Landscape Design & Garden'}
            </h2>
          </ScrollReveal>

          {/* Full-width image + flower badge */}
          <ScrollReveal>
            <div className="relative overflow-hidden" style={{ borderRadius: 24, height: '480px' }}>
              <Image src={IMG3} alt="Company solution" fill className="object-cover" sizes="100vw" />
              {/* Dark overlay */}
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
              {/* Flower/starburst badge */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                <Link href={`/${locale}#contact`} className="flex items-center justify-center hover:scale-105 transition-transform duration-200">
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <path d="M70 4 L76 55 L95 35 L82 62 L116 55 L90 72 L120 85 L86 84 L100 115 L70 95 L70 130 L70 95 L40 115 L54 84 L20 85 L50 72 L24 55 L58 62 L45 35 L64 55 Z"
                      fill="white" stroke="var(--color-accent)" strokeWidth="3"/>
                    <text x="70" y="62" textAnchor="middle" fill="#111" fontSize="10" fontWeight="900" fontFamily="Arial" letterSpacing="0.5">REQUEST</text>
                    <text x="70" y="75" textAnchor="middle" fill="#111" fontSize="10" fontWeight="900" fontFamily="Arial" letterSpacing="0.5">A QUOTE</text>
                    <text x="70" y="94" textAnchor="middle" fill="#111" fontSize="18">↓</text>
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 process steps below */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {PROCESS.map((step, i) => (
              <ScrollReveal key={step.en} delay={i % 4}>
                <div className="flex items-center gap-4 py-4 px-5" style={{
                  backgroundColor: 'var(--color-surface-alt)', borderRadius: 14,
                  border: '1px solid rgba(15,84,30,0.08)',
                }}>
                  <div className="shrink-0 w-11 h-11 flex items-center justify-center" style={{
                    backgroundColor: 'rgba(15,84,30,0.1)', borderRadius: 10,
                    color: 'var(--color-brand)',
                  }}>
                    {PROCESS_ICONS[i]}
                  </div>
                  <p className="text-sm font-bold leading-snug" style={{ color: '#111' }}>
                    {isVi ? step.vi : step.en}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 5 — Mission (dark green full bg)
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-brand)', minHeight: '520px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ minHeight: '520px' }}>

            {/* LEFT: person image with circle decoration */}
            <div className="relative flex items-end justify-center lg:justify-start" style={{ minHeight: '520px' }}>
              {/* Large circle bg */}
              <div className="absolute" style={{
                width: 420, height: 420,
                borderRadius: '50%',
                backgroundColor: 'rgba(199,220,73,0.1)',
                bottom: 20, left: '50%', transform: 'translateX(-50%)',
              }} />
              <div className="relative" style={{ height: '480px', width: '380px', zIndex: 1 }}>
                <Image
                  src={IMG5}
                  alt={isVi ? 'Đội ngũ Lapla' : 'Lapla Team'}
                  fill
                  className="object-cover object-center"
                  sizes="40vw"
                  style={{ borderRadius: '20px 20px 0 0' }}
                />
              </div>
            </div>

            {/* RIGHT: text */}
            <div className="px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
              <ScrollReveal>
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-5" style={{ color: 'var(--color-accent)' }}>
                  {isVi ? 'Sứ mệnh của chúng tôi' : 'Our Mission'}
                </p>
                <h2 className="font-display font-bold mb-6 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#ffffff' }}>
                  {isVi
                    ? <>Định chuẩn mới cho<br />không gian xanh Việt Nam</>
                    : <>Setting the Standard for<br />Vietnam&apos;s Green Spaces</>}
                </h2>
                <p className="mb-4 leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '26px', maxWidth: '460px' }}>
                  {isVi
                    ? 'Tại Lapla, chúng tôi hình dung một Việt Nam nơi mỗi không gian ngoài trời phản ánh vẻ đẹp, sự bền vững và chuyên môn đỉnh cao. Sứ mệnh của chúng tôi là dẫn dắt ngành cảnh quan, được công nhận qua cam kết về chất lượng, đổi mới sáng tạo và dịch vụ khách hàng xuất sắc.'
                    : 'At Lapla, we envision a Vietnam where every outdoor space reflects beauty, sustainability and expert craftsmanship. Our mission is to lead the landscaping industry, recognized for our commitment to excellence, innovation, and exceptional customer service.'}
                </p>
                <p className="mb-8 leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '26px', maxWidth: '460px' }}>
                  {isVi
                    ? 'Chúng tôi đam mê tạo ra cảnh quan không chỉ nâng tầm giá trị thẩm mỹ mà còn làm giàu thêm môi trường tự nhiên — mang lại niềm vui lâu dài và lợi ích sinh thái cho khách hàng.'
                    : 'We are passionate about creating landscapes that not only elevate the visual appeal of properties but also enrich the natural environment — providing long-lasting joy and ecological benefits to our clients.'}
                </p>
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-widest transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-accent)', color: '#111', padding: '14px 28px', borderRadius: 8 }}
                >
                  {isVi ? 'Xem tất cả dịch vụ' : 'View All Services'}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <TimelineSection />
      <TeamSection />
      <TestimonialsSection />
    </>
  );
}
