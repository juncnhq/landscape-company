'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
  articles: { title: string; date: string; excerpt: string }[];
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const t = useTranslations('projectDetail');
  const locale = useLocale();
  const title = locale === 'vi' ? project.title : project.titleEn;
  const description = locale === 'vi' ? project.description : project.descriptionEn;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allImages = project.images.length > 0 ? project.images : [project.image];
  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + allImages.length) % allImages.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % allImages.length));

  const meta = [
    { label: 'Type', value: project.category },
    { label: t('location'), value: project.location },
    { label: 'Year', value: project.year },
    { label: t('client'), value: project.client },
    ...(project.area && project.area !== '—' ? [{ label: t('area'), value: project.area }] : []),
    ...(project.duration && project.duration !== '—' ? [{ label: t('duration'), value: project.duration }] : []),
  ];

  const InfoPanel = () => (
    <>
      <Link
        href={`/${locale}/projects`}
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-gray-400 uppercase hover:text-gray-700 transition-colors mb-12"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToProjects')}
      </Link>

      <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-4">{project.category}</p>

      <h1 className="text-2xl xl:text-3xl font-light text-gray-900 uppercase tracking-widest leading-snug mb-10">
        {title}
      </h1>

      <div className="border-t border-gray-200 mb-8" />

      <div className="space-y-6 mb-10">
        {meta.map((item) => (
          <div key={item.label}>
            <p className="text-[9px] tracking-[0.25em] text-gray-400 uppercase mb-1">{item.label}</p>
            <p className="text-sm font-light text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mb-8" />

      <p className="text-sm font-light text-gray-500 leading-relaxed">{description}</p>

      {project.articles.length > 0 && (
        <div className="mt-10 space-y-6">
          <p className="text-[9px] tracking-[0.25em] text-gray-400 uppercase">{t('relatedArticles')}</p>
          {project.articles.map((article, i) => (
            <div key={i} className="border-t border-gray-100 pt-5">
              <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-2">{article.date}</p>
              <p className="text-sm font-light text-gray-800 mb-1">{article.title}</p>
              <p className="text-xs font-light text-gray-500 leading-relaxed">{article.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* DESKTOP: Fixed left info panel */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex flex-col fixed top-20 left-0 w-[38%] xl:w-[32%] h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-100 px-10 xl:px-16 py-14 bg-white z-10"
      >
        <InfoPanel />
      </motion.aside>

      {/* Right column: offset by left panel width, scrolls normally */}
      <div className="md:ml-[38%] xl:ml-[32%]">

        {/* MOBILE: info above images */}
        <div className="md:hidden pt-24 px-4 pb-6 space-y-5">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-gray-400 uppercase"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToProjects')}
          </Link>
          <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase">{project.category}</p>
          <h1 className="text-xl font-light text-gray-900 uppercase tracking-wider leading-snug">{title}</h1>
          <div className="border-t border-gray-200 pt-5 grid grid-cols-2 gap-4">
            {meta.map((item) => (
              <div key={item.label}>
                <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-1">{item.label}</p>
                <p className="text-xs font-light text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm font-light text-gray-500 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:pt-20 space-y-[2px]"
        >
          {/* First image — full width */}
          <button
            onClick={() => openLightbox(0)}
            className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 block group cursor-zoom-in"
          >
            <Image
              src={allImages[0]}
              alt={`${title} 1`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 62vw"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>

          {/* Remaining images — alternating full + 2-col grid */}
          {allImages.slice(1).map((img, i) => {
            const isFullWidth = i % 3 === 2;
            if (isFullWidth) {
              return (
                <button
                  key={i}
                  onClick={() => openLightbox(i + 1)}
                  className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 block group cursor-zoom-in"
                >
                  <Image src={img} alt={`${title} ${i + 2}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 62vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </button>
              );
            }
            const pairIndex = i % 3;
            if (pairIndex === 1) return null;
            const nextImg = allImages[i + 2];
            return (
              <div key={i} className="grid grid-cols-2 gap-[2px]">
                <button
                  onClick={() => openLightbox(i + 1)}
                  className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 block group cursor-zoom-in"
                >
                  <Image src={img} alt={`${title} ${i + 2}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 50vw, 31vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </button>
                {nextImg && (
                  <button
                    onClick={() => openLightbox(i + 2)}
                    className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 block group cursor-zoom-in"
                  >
                    <Image src={nextImg} alt={`${title} ${i + 3}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 50vw, 31vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </button>
                )}
              </div>
            );
          })}
        </motion.div>

      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={allImages}
          index={lightboxIndex}
          alt={title}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          onJump={setLightboxIndex}
        />
      )}
    </main>
  );
}
