import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import ProjectsSection from '@/components/ProjectsSection';
import OurServicesSection from '@/components/OurServicesSection';
import TimelineSection from '@/components/TimelineSection';
import PartnersSection from '@/components/PartnersSection';
import MemberCompaniesSection from '@/components/MemberCompaniesSection';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [featured, heroSlides, services, timelineItems, partners] = await Promise.all([
    prisma.project.findMany({
      where: { published: true },
      select: { id: true, slug: true, title: true, titleEn: true, category: true, location: true, year: true, image: true },
      orderBy: { createdAt: 'desc' },
      take: 9,
    }),
    prisma.heroSlide.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    }),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    }),
    prisma.timelineItem.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.partner.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection slides={heroSlides} />
      <VideoSection />
      <ProjectsSection projects={featured} />
      <OurServicesSection services={services} />
      <TimelineSection items={timelineItems} />
      <MemberCompaniesSection />
      <PartnersSection partners={partners} />
      <Footer />
    </main>
  );
}
