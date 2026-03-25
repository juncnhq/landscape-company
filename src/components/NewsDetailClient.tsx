'use client';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { newsArticles } from '@/lib/data';

type Article = typeof newsArticles[number];

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function NewsDetailClient({ article }: { article: Article }) {
  const locale = useLocale();
  const title = locale === 'vi' ? article.titleVi : article.titleEn;
  const summary = locale === 'vi' ? article.summaryVi : article.summaryEn;
  const content = locale === 'vi' ? article.contentVi : article.contentEn;
  const category = locale === 'vi' ? article.categoryVi : article.categoryEn;

  const related = newsArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">

      {/* Hero image */}
      <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-100">
        <Image
          src={article.image}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-green-600/80 backdrop-blur-sm px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="text-white/70 text-xs">{formatDate(article.date, locale)}</span>
              <span className="text-white/50 text-xs">· {article.readTime} {locale === 'vi' ? 'phút đọc' : 'min read'}</span>
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
              {title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">

          {/* Article body */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-gray-400 uppercase hover:text-gray-700 transition-colors mb-10"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              {locale === 'vi' ? 'Quay lại tin tức' : 'Back to news'}
            </Link>

            {/* Summary */}
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light border-l-4 border-green-500 pl-5 mb-10">
              {summary}
            </p>

            {/* Body paragraphs */}
            <div className="space-y-6">
              {content.map((para, i) => (
                <p key={i} className="text-gray-700 text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
              <span className="text-[10px] tracking-widest uppercase text-gray-400">Share</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0068FF] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48" fill="currentColor">
                  <path d="M24 4C13 4 4 13 4 24c0 4.6 1.6 8.8 4.2 12.2L6 42l6.1-2.1C15.2 42.4 19.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm9.8 27.2c-.4 1.1-2.3 2.1-3.2 2.2-.8.1-1.8.1-2.9-.2-.7-.2-1.5-.5-2.6-1-4.5-1.9-7.4-6.5-7.6-6.8-.2-.3-1.6-2.1-1.6-4s1-3 1.4-3.4c.4-.4.8-.5 1.1-.5h.8c.3 0 .6.1.9.7l1.2 2.9c.1.3.2.6 0 .9-.2.3-.3.5-.5.7l-.5.6c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.8 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.1.8-.1l1.2-1.4c.3-.4.5-.3.9-.1l2.8 1.3c.3.1.6.3.7.5.1.3.1 1.1-.1 2z"/>
                </svg>
              </a>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-8"
          >
            {/* Article meta */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-4">
                {locale === 'vi' ? 'Thông tin bài viết' : 'Article Info'}
              </p>
              <div className="space-y-3">
                {[
                  { label: locale === 'vi' ? 'Chuyên mục' : 'Category', value: category },
                  { label: locale === 'vi' ? 'Ngày đăng' : 'Published', value: formatDate(article.date, locale) },
                  { label: locale === 'vi' ? 'Thời gian đọc' : 'Read time', value: `${article.readTime} ${locale === 'vi' ? 'phút' : 'min'}` },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start gap-4">
                    <span className="text-xs text-gray-400">{item.label}</span>
                    <span className="text-xs font-medium text-gray-800 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related articles */}
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-4">
                {locale === 'vi' ? 'Bài viết liên quan' : 'Related Articles'}
              </p>
              <div className="space-y-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${locale}/news/${rel.slug}`}
                    className="group flex gap-3 items-start"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <Image
                        src={rel.image}
                        alt={locale === 'vi' ? rel.titleVi : rel.titleEn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors">
                        {locale === 'vi' ? rel.titleVi : rel.titleEn}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">{formatDate(rel.date, locale)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.aside>

        </div>
      </div>
    </main>
  );
}
