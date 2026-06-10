'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageLightbox from './ImageLightbox';

interface Project {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  location: string;
  area: string;
  duration: string;
  client: string;
  year: string;
  image: string;
  images: string[];
  description: string;
  descriptionEn: string;
  articles?: { title: string; date: string; excerpt: string }[];
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const title = isVi ? project.title : project.titleEn;
  const allImages = project.images.length > 0 ? project.images : [project.image];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Back link + title */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-8">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-6 transition-colors hover:opacity-70"
          style={{ color: 'var(--color-brand)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {isVi ? 'Quay lại dự án' : 'Back to Projects'}
        </Link>
        <h1
          className="font-display font-bold"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)', lineHeight: 1.15 }}
        >
          {title}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-widest font-medium" style={{ color: 'var(--color-brand)' }}>
          {project.category}
        </p>
      </div>

      {/* Image gallery — masonry-like 1 col */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 pb-24 flex flex-col gap-4">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative w-full overflow-hidden group cursor-zoom-in"
            style={{ aspectRatio: i === 0 ? '16/9' : '16/8', borderRadius: '16px' }}
          >
            <Image
              src={img}
              alt={`${title} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <Footer />

      {lightboxIndex !== null && (
        <ImageLightbox
          images={allImages}
          index={lightboxIndex}
          alt={title}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i === null ? 0 : (i - 1 + allImages.length) % allImages.length))}
          onNext={() => setLightboxIndex(i => (i === null ? 0 : (i + 1) % allImages.length))}
          onJump={setLightboxIndex}
        />
      )}
    </main>
  );
}
