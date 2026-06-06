import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ProjectsGrid from '@/components/ProjectsGrid';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? 'Danh mục công trình' : 'Our Portfolio'}
        title={isVi ? 'Dự Án Cảnh Quan' : 'Landscape Projects'}
        breadcrumbs={[{ label: isVi ? 'Dự án' : 'Projects' }]}
      />
      <ProjectsGrid />
      <Footer />
    </main>
  );
}
