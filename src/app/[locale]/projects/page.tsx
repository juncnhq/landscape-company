import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ProjectsGrid from '@/components/ProjectsGrid';
import { getSiteSetting } from '@/lib/getSiteSetting';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';
  const bgImage = await getSiteSetting('hero_projects') ?? undefined;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? 'Danh mục công trình' : 'Our Portfolio'}
        title={isVi ? 'Dự Án Cảnh Quan' : 'Landscape Projects'}
        description={isVi
          ? 'Hơn 200 công trình cảnh quan tiêu biểu trên khắp Việt Nam — từ biệt thự, khu đô thị đến sân golf và resort.'
          : 'Over 200 signature landscape projects across Vietnam — villas, urban developments, golf courses and resorts.'}
        breadcrumbs={[{ label: isVi ? 'Dự án' : 'Projects' }]}
        bgImage={bgImage}
      />
      <ProjectsGrid />
      <Footer />
    </main>
  );
}
