'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="relative bg-[#07130a] text-green-100/70 overflow-hidden">

      {/* Organic SVG wave divider at top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 56" className="w-full h-12 md:h-14" preserveAspectRatio="none">
          <path d="M0,0 C360,56 1080,56 1440,0 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* Top brand gold accent line */}
      <div className="absolute top-12 md:top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_left,rgba(50,132,66,0.12)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(190,123,43,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <div className="mb-5">
              <Link href={`/${locale}`} className="inline-block">
                <div className="px-3 py-2 rounded-xl bg-white/8 hover:bg-white/14 transition-colors duration-300 inline-block border border-white/10">
                  <Image
                    src="/logo.png"
                    alt="FAM Landscape"
                    width={120}
                    height={40}
                    className="h-9 w-auto object-contain drop-shadow-[0_1px_8px_rgba(50,132,66,0.4)]"
                  />
                </div>
              </Link>
            </div>
            <p className="text-green-100/55 leading-relaxed max-w-sm text-sm">{t('description')}</p>

            {/* Social icons */}
            <div className="flex gap-2.5 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-green-600 hover:border-green-500 transition-colors duration-300 text-green-100/60 hover:text-white"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-green-100 font-semibold mb-5 text-xs tracking-widest uppercase">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { href: `/${locale}`,           label: locale === 'vi' ? 'Trang chủ'     : 'Home' },
                { href: `/${locale}/projects`,  label: locale === 'vi' ? 'Dự án'         : 'Projects' },
                { href: `/${locale}/about`,     label: locale === 'vi' ? 'Về chúng tôi'  : 'About Us' },
                { href: `/${locale}/services`,  label: locale === 'vi' ? 'Dịch vụ'       : 'Services' },
                { href: `/${locale}/partners`,  label: locale === 'vi' ? 'Đối tác'       : 'Partners' },
                { href: `/${locale}/news`,      label: locale === 'vi' ? 'Tin tức'       : 'News' },
                { href: `/${locale}/careers`,   label: locale === 'vi' ? 'Tuyển dụng'    : 'Careers' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-100/50 hover:text-green-300 transition-colors text-sm flex items-center gap-1.5 group">
                    <span className="w-0 h-px bg-green-400 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-green-100 font-semibold mb-5 text-xs tracking-widest uppercase">{t('contact')}</h4>
            <ul className="space-y-4 text-sm text-green-100/50">
              <li className="flex gap-2.5 items-start">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-green-500/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="leading-relaxed">{t('address')}</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-green-500/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>{t('phone')}</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-green-500/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>{t('email')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-100/30">
          <p>© {new Date().getFullYear()} Công Ty TNHH SX-TM-DV Hoa Và Hơn Thế Nữa (FAM). {t('rights')}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            <span className="text-green-100/40">landscape · artwork · maintenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
