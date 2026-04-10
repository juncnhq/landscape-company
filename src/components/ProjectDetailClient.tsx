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
  articles?: { title: string; date: string; excerpt: string }[];
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
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-gray-800 uppercase hover:text-gray-700 transition-colors mb-12"
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

      {(project.articles?.length ?? 0) > 0 && (
        <div className="mt-10 space-y-6">
          <p className="text-[9px] tracking-[0.25em] text-gray-400 uppercase">{t('relatedArticles')}</p>
          {project.articles?.map((article, i) => (
            <div key={i} className="border-t border-gray-100 pt-5">
              <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-2">{article.date}</p>
              <p className="text-sm font-light text-gray-800 mb-1">{article.title}</p>
              <p className="text-xs font-light text-gray-500 leading-relaxed">{article.excerpt}</p>
            </div>
          ))}
        </div>
      )}

      {/* Social share */}
      <div className="mt-auto pt-10 border-t border-gray-100">
        <p className="text-[9px] tracking-[0.25em] text-gray-400 uppercase mb-4">Share</p>
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
            aria-label="Share on Facebook"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </a>
          {/* Zalo */}
          <a
            href={`https://zalo.me/`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#0068FF] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
            aria-label="Contact via Zalo"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="currentColor">
              <path d="M24 4C13 4 4 13 4 24c0 4.6 1.6 8.8 4.2 12.2L6 42l6.1-2.1C15.2 42.4 19.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm9.8 27.2c-.4 1.1-2.3 2.1-3.2 2.2-.8.1-1.8.1-2.9-.2--.7-.2-1.5-.5-2.6-1-4.5-1.9-7.4-6.5-7.6-6.8-.2-.3-1.6-2.1-1.6-4s1-3 1.4-3.4c.4-.4.8-.5 1.1-.5h.8c.3 0 .6.1.9.7l1.2 2.9c.1.3.2.6 0 .9-.2.3-.3.5-.5.7l-.5.6c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.8 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.1.8-.1l1.2-1.4c.3-.4.5-.3.9-.1l2.8 1.3c.3.1.6.3.7.5.1.3.1 1.1-.1 2z"/>
            </svg>
          </a>
        </div>
      </div>
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
        className="hidden md:flex flex-col fixed top-20 left-0 w-[42%] xl:w-[38%] h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-100 px-10 xl:px-16 py-14 bg-white z-10"
      >
        <InfoPanel />
      </motion.aside>

      {/* Right column: offset by left panel width, scrolls normally */}
      <div className="md:ml-[42%] xl:ml-[38%]">

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
          className="md:pt-20 grid grid-cols-1 gap-4 p-2 md:p-16 lg:p-20 xl:p-24"
        >
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 block group cursor-zoom-in rounded-sm"
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 58vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          ))}
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
