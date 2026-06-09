import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ServicesPageContent, { SERVICES } from '@/components/ServicesPageContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';

  let services;
  try {
    services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  } catch {
    services = SERVICES.map((s) => ({
      id: s.id, slug: s.id, icon: s.icon,
      titleVi: s.titleVi, titleEn: s.titleEn,
      subtitleVi: s.subtitleVi, subtitleEn: s.subtitleEn,
      descriptionVi: s.descriptionVi, descriptionEn: s.descriptionEn,
      images: s.images, published: true, order: s.order ?? 0,
      createdAt: new Date(), updatedAt: new Date(),
    }));
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? 'Giải pháp cảnh quan' : 'What We Offer'}
        title={isVi ? 'Dịch Vụ Của Chúng Tôi' : 'Our Services'}
        description={isVi
          ? 'Từ thiết kế sân vườn đến cảnh quan resort 5 sao — chúng tôi mang đến giải pháp xanh toàn diện cho mọi không gian.'
          : 'From garden design to 5-star resort landscaping — comprehensive green solutions for every space.'}
        breadcrumbs={[{ label: isVi ? 'Dịch vụ' : 'Services' }]}
      />
      <ServicesPageContent services={services} />
      <Footer />
    </main>
  );
}
