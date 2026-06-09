import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import NewsGrid from '@/components/NewsGrid';

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow={isVi ? 'Cập nhật mới nhất' : 'Latest Updates'}
        title={isVi ? 'Tin Tức & Bài Viết' : 'News & Articles'}
        description={isVi
          ? 'Cập nhật xu hướng cảnh quan, chia sẻ kiến thức chuyên môn và câu chuyện từ các dự án của Lapla.'
          : 'Landscape trends, expert insights and stories from Lapla projects.'}
        breadcrumbs={[{ label: isVi ? 'Tin tức' : 'News' }]}
      />
      <NewsGrid />
      <Footer />
    </main>
  );
}
