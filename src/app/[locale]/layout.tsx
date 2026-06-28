import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import BackToTop from '@/components/BackToTop';
import SmoothScroll from '@/components/SmoothScroll';
import '../globals.css';

// Single font family for the whole site (vi + en). Be Vietnam Pro fully supports
// Vietnamese + Latin, so we no longer load Bricolage / Public Sans (they were only
// ever shown on /en yet downloaded on every page). Ship every weight the UI uses:
// 300 (font-light), 400, 500 (font-medium), 600 (font-semibold), 700 (font-bold),
// 800 (hero), 900 (font-black). Do not trim.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lapla Landscape - Thiết Kế Cảnh Quan',
  description: 'Chuyên thiết kế và thi công cảnh quan cao cấp',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body className={`site-body ${beVietnamPro.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {children}
            <BackToTop />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
