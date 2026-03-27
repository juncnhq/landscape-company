import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = await prisma.newsArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

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
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-2xl">
            <div className="text-5xl mb-4">📰</div>
            <p className="text-gray-400 text-lg font-medium">
              {locale === 'vi' ? 'Tin tức sắp ra mắt.' : 'News articles coming soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                {article.image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={locale === 'vi' ? article.titleVi : article.titleEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  {article.publishedAt && (
                    <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">
                      {new Date(article.publishedAt).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition-colors">
                    {locale === 'vi' ? article.titleVi : article.titleEn}
                  </h2>
                  {(locale === 'vi' ? article.summaryVi : article.summaryEn) && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {locale === 'vi' ? article.summaryVi : article.summaryEn}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
