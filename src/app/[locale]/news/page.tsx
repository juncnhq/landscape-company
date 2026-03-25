import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsGrid from '@/components/NewsGrid';

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 md:pt-40 pb-8 md:pb-12 px-4 sm:px-8 lg:px-12">
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Latest</p>
        <h1 className="text-4xl md:text-7xl font-light text-black tracking-tight">
          {locale === 'vi' ? 'Tin Tức' : 'News'}
        </h1>
      </div>
      <NewsGrid />
      <Footer />
    </main>
  );
}
