import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsGrid from '@/components/ProjectsGrid';
import { prisma } from '@/lib/prisma';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { id: true, slug: true, title: true, titleEn: true, category: true, location: true, year: true, image: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="pt-28 md:pt-40 pb-8 md:pb-12 px-4 sm:px-8 lg:px-12">
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Portfolio</p>
        <h1 className="text-4xl md:text-7xl font-light text-black tracking-tight">{t('title')}</h1>
      </div>
      <ProjectsGrid projects={projects} />
      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
