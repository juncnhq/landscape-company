import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartnersSection from '@/components/PartnersSection';
import { prisma } from '@/lib/prisma';

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const partners = await prisma.partner.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 md:pt-36 pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-3">Network</p>
          <h1 className="text-4xl md:text-7xl font-light text-black tracking-tight">
            {locale === 'vi' ? 'Đối Tác & Khách Hàng' : 'Partners & Clients'}
          </h1>
        </div>
      </div>
      <PartnersSection partners={partners} />
      <Footer />
    </main>
  );
}
