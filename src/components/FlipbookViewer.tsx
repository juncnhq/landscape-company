'use client';

import dynamic from 'next/dynamic';

const ReactPdfFlipbookViewer = dynamic(
  () => import('react-pdf-flipbook-viewer').then((mod) => ({ default: mod.FlipbookViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-900">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs tracking-[0.25em] text-gray-500 uppercase">Loading catalog</p>
      </div>
    ),
  }
);

interface FlipbookViewerProps {
  pdfUrl: string;
  className?: string;
  disableShare?: boolean;
}

export default function FlipbookViewer({ pdfUrl, className, disableShare = true }: FlipbookViewerProps) {
  return (
    <ReactPdfFlipbookViewer
      pdfUrl={pdfUrl}
      disableShare={disableShare}
      className={className}
    />
  );
}
