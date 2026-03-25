import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsDetailClient from '@/components/NewsDetailClient';
import { newsArticles } from '@/lib/data';

export function generateStaticParams() {
  const locales = ['vi', 'en'];
  return locales.flatMap((locale) =>
    newsArticles.map((article) => ({ locale, slug: article.slug }))
  );
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <NewsDetailClient article={article} />
      <Footer />
    </>
  );
}
