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

  // Bài liên quan lấy từ DB để bài mới thêm trong admin xuất hiện ngay.
  const related = await prisma.newsArticle.findMany({
    where: { published: true, slug: { not: slug } },
    orderBy: { date: 'desc' },
    take: 3,
    select: { slug: true, titleVi: true, titleEn: true, image: true, date: true },
  });

  return (
    <>
      <Navbar />
      <NewsDetailClient article={article} related={related} />
      <Footer />
    </>
  );
}
