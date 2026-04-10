import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesPageContent from '@/components/ServicesPageContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ServicesPageContent services={services} />
      <Footer />
    </main>
  );
}
