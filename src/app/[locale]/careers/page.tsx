import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareersPageContent from '@/components/CareersPageContent';

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <CareersPageContent />
      <Footer />
    </main>
  );
}
