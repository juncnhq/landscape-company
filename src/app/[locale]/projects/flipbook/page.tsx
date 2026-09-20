import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import ProjectFlipbook from '@/components/ProjectFlipbook';

export const dynamic = 'force-dynamic';

export default async function FlipbookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Trước đây flipbook dựng từ mảng hardcode trong data.ts, nên dự án thêm
  // hoặc ẩn trong admin không bao giờ phản ánh ở đây.
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, title: true, year: true, category: true, location: true,
      client: true, description: true, image: true, images: true,
    },
  });

  return (
    <main className="h-screen bg-stone-950 overflow-hidden">
      <ProjectFlipbook projects={projects} />
    </main>
  );
}
