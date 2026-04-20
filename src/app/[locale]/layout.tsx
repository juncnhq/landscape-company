import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import BackToTop from '@/components/BackToTop';
import '../globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
});
const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Landscape Company - Thiết Kế Cảnh Quan',
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
      <body className={`${beVietnamPro.variable} ${playfair.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
