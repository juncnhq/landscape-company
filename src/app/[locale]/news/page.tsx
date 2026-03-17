import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-32">
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-2xl">
          <div className="text-5xl mb-4">📰</div>
          <p className="text-gray-400 text-lg font-medium">
            {locale === 'vi' ? 'Tin tức sắp ra mắt.' : 'News articles coming soon.'}
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
