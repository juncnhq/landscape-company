import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { getSiteSetting } from '@/lib/getSiteSetting';

export const dynamic = 'force-dynamic';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';
  const bgImage = await getSiteSetting('hero_contact') ?? undefined;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? 'Liên hệ với chúng tôi' : 'Get In Touch'}
        title={isVi ? 'Liên Hệ & Báo Giá' : 'Contact & Quote'}
        description={isVi
          ? 'Hãy để Lapla biến không gian của bạn thành khu vườn đẹp như mơ. Gửi yêu cầu, chúng tôi phản hồi trong vòng 24 giờ.'
          : 'Let Lapla turn your space into a dream garden. Send your request and we will respond within 24 hours.'}
        breadcrumbs={[{ label: isVi ? 'Liên hệ' : 'Contact' }]}
        bgImage={bgImage}
      />
      <CTASection />
      <Footer />
    </main>
  );
}
