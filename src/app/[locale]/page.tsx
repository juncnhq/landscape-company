import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import OurServicesSection from '@/components/OurServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import MemberCompaniesSection from '@/components/MemberCompaniesSection';
import PartnersSection from '@/components/PartnersSection';
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
      <ProjectsSection />
      <AboutSection />
      <OurServicesSection />
      <BenefitsSection />
      <CTASection />
      <MemberCompaniesSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
