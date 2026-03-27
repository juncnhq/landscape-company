import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import CatalogueFlipbook from '@/components/CatalogueFlipbook';
import { prisma } from '@/lib/prisma';

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const raw = await prisma.project.findMany({
    where: { published: true, image: { not: null } },
    select: { id: true, category: true, image: true },
    orderBy: { createdAt: 'desc' },
  });
  const projectData = raw.map((p) => ({ id: p.id, category: p.category, image: p.image! }));

  return (
    // overflow-hidden prevents body scroll while flipbook is full-screen
    <main className="overflow-hidden bg-stone-100">
      <Navbar />
      {/* pt-[68px] offsets the fixed navbar */}
      <div className="pt-[68px]">
        <CatalogueFlipbook projects={projectData} locale={locale} />
      </div>
    </main>
  );
}
