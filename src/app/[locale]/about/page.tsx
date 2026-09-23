import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import AboutPageContent from '@/components/AboutPageContent';
import { getSiteSetting } from '@/lib/getSiteSetting';
import { getAboutContent } from '@/lib/getAboutContent';

export const dynamic = 'force-dynamic';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';

  // Đọc phía server để nội dung có sẵn trong HTML (SEO), không fetch ở client.
  const [bgImage, content] = await Promise.all([
    getSiteSetting('hero_about'),
    getAboutContent(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? content.heroEyebrowVi : content.heroEyebrowEn}
        title={isVi ? content.heroTitleVi : content.heroTitleEn}
        description={isVi ? content.heroDescVi : content.heroDescEn}
        breadcrumbs={[{ label: isVi ? 'Về chúng tôi' : 'About' }]}
        bgImage={bgImage ?? undefined}
      />
      <AboutPageContent content={content} />
      <Footer />
    </main>
  );
}
