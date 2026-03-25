'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 md:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="mb-4">
              <Link href={`/${locale}`} className="inline-block">
                <div className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 inline-block">
                  <Image
                    src="/logo.png"
                    alt="FAM Landscape"
                    width={120}
                    height={40}
                    className="h-9 w-auto object-contain drop-shadow-[0_1px_4px_rgba(50,132,66,0.3)]"
                  />
                </div>
              </Link>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm text-sm md:text-base">{t('description')}</p>
            <div className="flex gap-3 mt-6">
              {[
                { label: 'F', href: 'https://www.facebook.com/people/FAM-Flower-and-More/61564629761096/' },
                { label: 'I', href: 'https://www.instagram.com/fam_flower_and_more/' },
                { label: 'in', href: 'https://www.linkedin.com/in/fam-flower-and-more-8ba690273' },
                { label: 'YT', href: 'https://www.youtube.com/@FAM-HoavaHonTheNua' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors text-xs font-bold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm tracking-widest uppercase">{t('quickLinks')}</h4>
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
                  <Link href={link.href} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm tracking-widest uppercase">{t('contact')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2.5 items-start">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{t('address')}</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>{t('phone')}</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>{t('email')}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Công Ty TNHH SX-TM-DV Hoa Và Hơn Thế Nữa (FAM). {t('rights')}
        </div>
      </div>
    </footer>
  );
}
