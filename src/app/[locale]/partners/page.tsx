import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PartnersSection from '@/components/PartnersSection';

export default async function PartnersPage({
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
        eyebrow={isVi ? 'Hệ sinh thái đối tác' : 'Our Network'}
        title={isVi ? 'Đối Tác & Khách Hàng' : 'Partners & Clients'}
        breadcrumbs={[{ label: isVi ? 'Đối tác' : 'Partners' }]}
      />
      <PartnersSection />
      <Footer />
    </main>
  );
}
