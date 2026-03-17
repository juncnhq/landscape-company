'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 md:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="md:col-span-2">
            <div className="text-2xl md:text-3xl font-bold text-white mb-4">
              <span className="text-green-400">F</span>am
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
                { href: `/${locale}`, label: locale === 'vi' ? 'Trang chủ' : 'Home' },
                { href: `/${locale}/projects`, label: locale === 'vi' ? 'Dự án' : 'Projects' },
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
              <li className="flex gap-2 items-start"><span className="shrink-0">📍</span><span>{t('address')}</span></li>
              <li className="flex gap-2 items-start"><span className="shrink-0">📞</span><span>{t('phone')}</span></li>
              <li className="flex gap-2 items-start"><span className="shrink-0">✉️</span><span>{t('email')}</span></li>
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
