import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PartnersSection from '@/components/PartnersSection';
import { getSiteSetting } from '@/lib/getSiteSetting';

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';
  const bgImage = await getSiteSetting('hero_partners') ?? undefined;
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? 'Hệ sinh thái đối tác' : 'Our Network'}
        title={isVi ? 'Đối Tác & Khách Hàng' : 'Partners & Clients'}
        description={isVi
          ? 'Lapla đồng hành cùng các chủ đầu tư, nhà thầu và thương hiệu hàng đầu trong lĩnh vực bất động sản và cảnh quan.'
          : 'Lapla partners with leading developers, contractors and brands in real estate and landscaping.'}
        breadcrumbs={[{ label: isVi ? 'Đối tác' : 'Partners' }]}
        bgImage={bgImage}
      />
      <PartnersSection />
      <Footer />
    </main>
  );
}
