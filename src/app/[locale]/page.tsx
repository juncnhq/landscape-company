import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ValuesSection from '@/components/ValuesSection';
import OurServicesSection from '@/components/OurServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import ProcessSection from '@/components/ProcessSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import VideoSection from '@/components/VideoSection';
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
      <ValuesSection />
      <OurServicesSection />
      <BenefitsSection />
      <ProcessSection />
      <TeamSection />
      <TestimonialsSection />
      <VideoSection />
      <CTASection />
      <MemberCompaniesSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
