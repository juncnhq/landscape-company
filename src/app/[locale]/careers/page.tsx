import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CareersPageContent from '@/components/CareersPageContent';
import { getSiteSetting } from '@/lib/getSiteSetting';

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';
  const bgImage = await getSiteSetting('hero_careers') ?? undefined;
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? 'Gia nhập đội ngũ' : 'Join Our Team'}
        title={isVi ? 'Tham gia Lapla — Kiến tạo tương lai xanh' : 'Join Lapla — Build Vietnam\'s Green Future'}
        description={isVi
          ? 'Chúng tôi tìm kiếm những người đam mê thiên nhiên, tự hào về nghề và muốn phát triển cùng công ty đang định hình ngành cảnh quan Việt Nam.'
          : 'We are looking for passionate people who love the outdoors, take pride in their craft, and want to grow with a company that is reshaping Vietnam\'s landscape industry.'}
        breadcrumbs={[{ label: isVi ? 'Tuyển dụng' : 'Careers' }]}
        bgImage={bgImage}
      />
      <CareersPageContent />
      <Footer />
    </main>
  );
}
