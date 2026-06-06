'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/FAM-Flower-and-More/61564629761096/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/fam_flower_and_more/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/fam-flower-and-more-8ba690273',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@FAM-HoavaHonTheNua',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#0e2208', backgroundImage: 'url(/images/shapes/footer-bg-img.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(5,18,3,0.82)' }} />
      {/* Background leaf pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-brand) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Green glow */}
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
        style={{ backgroundColor: 'var(--color-accent)', filter: 'blur(150px)' }}
      />

      <div className="relative z-10">
        {/* Top bar: logo + hours + socials */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}
        >
          <Link href={`/${locale}`}>
            <Image
              src="/logo.png"
              alt="Lapla Landscape"
              width={120}
              height={40}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--color-brand)' }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'T2–T7: 8:00–18:00' : 'Mon–Sat: 8:00 AM – 6:00 PM'}
            </span>
          </div>

          <div className="flex gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center border transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.75)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Main 4-column grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: CTA + phone + email */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Liên hệ ngay' : 'Get In Touch'}
            </p>
            <h3 className="font-display font-bold text-xl text-white leading-snug mb-5">
              {isVi ? 'Tư vấn miễn phí cho dự án của bạn' : 'Free consultation for your project'}
            </h3>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-xs font-bold uppercase tracking-wider mb-6 transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px', }}
            >
              {isVi ? 'Liên hệ' : 'Contact Us'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <div className="space-y-3">
              <a
                href="tel:+84901234567"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(130,180,64,0.15)' }}>
                  <svg className="w-4 h-4" style={{ color: 'var(--color-brand)' }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                (+84) 90 123 4567
              </a>
              <a
                href="mailto:info@lapla.vn"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(130,180,64,0.15)' }}>
                  <svg className="w-4 h-4" style={{ color: 'var(--color-brand)' }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                info@lapla.vn
              </a>
            </div>
          </div>

          {/* Col 2: Company links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs tracking-[0.2em] uppercase">
              {isVi ? 'Công ty' : 'Company'}
            </h4>
            <ul className="space-y-3">
              {[
                { href: `/${locale}/about`,    vi: 'Về chúng tôi',  en: 'About Us' },
                { href: `/${locale}/projects`, vi: 'Dự án',         en: 'Projects' },
                { href: `/${locale}/partners`, vi: 'Đối tác',       en: 'Partners' },
                { href: `/${locale}/news`,     vi: 'Tin tức',       en: 'News' },
                { href: `/${locale}/careers`,  vi: 'Tuyển dụng',    en: 'Careers' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--color-accent)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)')}
                  >
                    <span
                      className="w-0 h-px transition-all duration-200 group-hover:w-3 shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                    {isVi ? link.vi : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs tracking-[0.2em] uppercase">
              {isVi ? 'Dịch vụ' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {[
                { vi: 'Thiết kế & Thi công',   en: 'Garden Design' },
                { vi: 'Cây xanh & Thảm cỏ',    en: 'Plants & Turf' },
                { vi: 'Cảnh quan cứng',         en: 'Hard Scaping' },
                { vi: 'Cảnh quan công cộng',    en: 'Public Garden' },
                { vi: 'Sân Golf & Resort',      en: 'Golf & Resort' },
                { vi: 'Bảo dưỡng',              en: 'Maintenance' },
              ].map((item) => (
                <li key={item.en}>
                  <Link
                    href={`/${locale}/services`}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--color-accent)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)')}
                  >
                    <span
                      className="w-0 h-px transition-all duration-200 group-hover:w-3 shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                    {isVi ? item.vi : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs tracking-[0.2em] uppercase">
              {isVi ? 'Đăng ký nhận tin' : 'Newsletter'}
            </h4>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '22px' }}>
              {isVi
                ? 'Nhận thông tin mới nhất về cảnh quan và ưu đãi từ Lapla.'
                : 'Get the latest landscaping tips and exclusive offers from Lapla.'}
            </p>
            {subscribed ? (
              <p className="text-sm font-semibold" style={{ color: 'var(--color-brand)' }}>
                {isVi ? '✓ Cảm ơn bạn đã đăng ký!' : '✓ Thank you for subscribing!'}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={isVi ? 'Email của bạn' : 'Your email address'}
                  className="w-full px-4 py-3 text-sm bg-white/10 border border-white/15 text-white placeholder-white/40 outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                />
                <button
                  type="submit"
                  className="w-full py-3 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px', }}
                >
                  {isVi ? 'Đăng ký' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)' }}
        >
          <p>© {new Date().getFullYear()} Lapla Landscape. {isVi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="hover:text-white transition-colors duration-200">
              {isVi ? 'Điều khoản sử dụng' : 'Terms & Conditions'}
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <Link href={`/${locale}`} className="hover:text-white transition-colors duration-200">
              {isVi ? 'Chính sách bảo mật' : 'Privacy Policy'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
