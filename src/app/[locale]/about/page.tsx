import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import AboutPageContent from '@/components/AboutPageContent';

export default async function AboutPage({
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
        eyebrow={isVi ? 'Câu chuyện của chúng tôi' : 'Our Story'}
        title={isVi ? 'Về Lapla Landscape' : 'About Us'}
        description={isVi
          ? '17 năm kiến tạo không gian xanh — Lapla là đơn vị cảnh quan hàng đầu Việt Nam với hệ sinh thái chuyên biệt từ thiết kế đến vận hành.'
          : '17 years crafting green spaces — Lapla is Vietnam\'s leading landscape firm with a specialized ecosystem from design to operations.'}
        breadcrumbs={[{ label: isVi ? 'Về chúng tôi' : 'About' }]}
      />
      <AboutPageContent />
      <Footer />
    </main>
  );
}
