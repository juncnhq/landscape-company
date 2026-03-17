import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import ProjectsSection from '@/components/ProjectsSection';
import OurServicesSection from '@/components/OurServicesSection';
import TimelineSection from '@/components/TimelineSection';
import PartnersSection from '@/components/PartnersSection';
import MemberCompaniesSection from '@/components/MemberCompaniesSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <ProjectsSection />
      <OurServicesSection />
      <TimelineSection />
      <PartnersSection />
      <MemberCompaniesSection />
      <Footer />
    </main>
  );
}
