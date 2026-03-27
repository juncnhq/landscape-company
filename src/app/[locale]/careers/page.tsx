import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareersPageContent from '@/components/CareersPageContent';
import { prisma } from '@/lib/prisma';

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const positions = await prisma.jobPosition.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <CareersPageContent positions={positions} />
      <Footer />
    </main>
  );
}
