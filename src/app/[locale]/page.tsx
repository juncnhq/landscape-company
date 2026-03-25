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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <ProjectsSection />
      <OurServicesSection />
      <TimelineSection />
      <MemberCompaniesSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
