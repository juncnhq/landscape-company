import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsGrid from '@/components/ProjectsGrid';

export default async function ProjectsPage() {
  const t = await getTranslations('projects');
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="pt-28 md:pt-40 pb-8 md:pb-12 px-4 sm:px-8 lg:px-12">
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Portfolio</p>
        <h1 className="text-4xl md:text-7xl font-light text-black tracking-tight">{t('title')}</h1>
      </div>
      <ProjectsGrid />
    </main>
  );
}
