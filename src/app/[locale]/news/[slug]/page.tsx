import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsDetailClient from '@/components/NewsDetailClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await prisma.newsArticle.findUnique({ where: { slug, published: true } });

  if (!article) notFound();

  return (
    <>
      <Navbar />
      <NewsDetailClient article={article} />
      <Footer />
    </>
  );
}
