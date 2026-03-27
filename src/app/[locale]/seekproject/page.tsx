import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeekProjectClient from '@/components/SeekProjectClient';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; cat?: string }>;
};

export default async function SeekProjectPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q = '', cat = '' } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('seekProject');

  const validCategory = Object.values(Category).includes(cat as Category)
    ? (cat as Category)
    : undefined;

  const projects = await prisma.project.findMany({
    where: {
      published: true,
      ...(validCategory && { category: validCategory }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { titleEn: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } },
          { client: { contains: q, mode: 'insensitive' } },
        ],
      }),
    },
    select: {
      id: true,
      slug: true,
      title: true,
      titleEn: true,
      category: true,
      location: true,
      year: true,
      image: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="pt-28 md:pt-40 pb-8 md:pb-12 px-4 sm:px-8 lg:px-12">
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Portfolio</p>
        <h1 className="text-4xl md:text-7xl font-light text-black tracking-tight mb-3">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      <Suspense>
        <SeekProjectClient
          projects={projects}
          query={q}
          category={cat}
        />
      </Suspense>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
