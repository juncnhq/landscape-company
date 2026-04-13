import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

  let services;
  try {
    services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  } catch {
    services = SERVICES.map((s) => ({
      id: s.id,
      slug: s.id,
      icon: s.icon,
      titleVi: s.titleVi,
      titleEn: s.titleEn,
      subtitleVi: s.subtitleVi,
      subtitleEn: s.subtitleEn,
      descVi: s.descVi,
      descEn: s.descEn,
      bulletsVi: [...s.bulletsVi],
      bulletsEn: [...s.bulletsEn],
    }));
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ServicesPageContent services={services} />
      <Footer />
    </main>
  );
}
