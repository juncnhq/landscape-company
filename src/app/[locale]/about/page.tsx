import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutPageContent from '@/components/AboutPageContent';
import { prisma } from '@/lib/prisma';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const timelineItems = await prisma.timelineItem.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutPageContent timelineItems={timelineItems} />
      <Footer />
    </main>
  );
}
