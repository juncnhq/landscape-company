import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import FlipbookViewer from '@/components/FlipbookViewer';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col h-screen bg-gray-950 overflow-hidden">

      {/* Top bar */}
      <header className="flex items-center justify-between px-6 h-12 shrink-0 border-b border-white/5 bg-gray-950 z-10">
        <Link
          href={`/${locale}/projects`}
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gray-500 uppercase hover:text-gray-300 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'vi' ? 'Dự Án' : 'Projects'}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-white uppercase">FAM</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            {locale === 'vi' ? 'Danh mục dự án' : 'Project Catalog'}
          </span>
        </div>

        <div className="w-24" /> {/* spacer to center logo */}
      </header>

      {/* Flipbook — fills remaining height, overrides internal hardcoded heights */}
      <div className="flex-1 min-h-0">
        <FlipbookViewer
          pdfUrl="/Lifestyle-Magazine.pdf"
          className="h-full! rounded-none!"
        />
      </div>
    </div>
  );
}
