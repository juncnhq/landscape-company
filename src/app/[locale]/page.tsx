import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import OurServicesSection from '@/components/OurServicesSection';
import ProcessSection from '@/components/ProcessSection';
import CTASection from '@/components/CTASection';
import MemberCompaniesSection from '@/components/MemberCompaniesSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const heroSlides = await prisma.heroSlide.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection initialSlides={heroSlides} />
      <ProjectsSection />
      <AboutSection />
      <OurServicesSection />
      <ProcessSection />
      <MemberCompaniesSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
