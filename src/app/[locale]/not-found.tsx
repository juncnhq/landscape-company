import Link from 'next/link';
import Navbar from '@/components/Navbar';

// Rendered inside [locale]/layout.tsx — html/body/lang come from there.
export default function LocaleNotFound() {
  return (
    <main className="min-h-screen bg-green-950 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <div className="text-[10rem] font-black text-white/[0.04] leading-none select-none">
            404
          </div>
          <h1 className="text-2xl font-bold text-white -mt-4 mb-3">Page not found</h1>
          <p className="text-gray-400 mb-8 text-sm">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition-colors text-sm"
          >
            ← Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
