'use client';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { newsArticles } from '@/lib/data';

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function NewsGrid() {
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [featured, ...rest] = newsArticles;

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-32">

      {/* Featured article */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <Link href={`/${locale}/news/${featured.slug}`} className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
            <Image
              src={featured.image}
              alt={locale === 'vi' ? featured.titleVi : featured.titleEn}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-green-600 px-2.5 py-1 rounded-full">
                {locale === 'vi' ? featured.categoryVi : featured.categoryEn}
              </span>
              <span className="text-xs text-gray-400">{formatDate(featured.date, locale)}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-green-700 transition-colors">
              {locale === 'vi' ? featured.titleVi : featured.titleEn}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
              {locale === 'vi' ? featured.summaryVi : featured.summaryEn}
            </p>
            <div className="flex items-center gap-2 text-green-600 text-xs font-semibold tracking-widest uppercase">
              <span>{locale === 'vi' ? 'Đọc tiếp' : 'Read more'}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Rest of articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((article, i) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
          >
            <Link
              href={`/${locale}/news/${article.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={locale === 'vi' ? article.titleVi : article.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-green-600 border border-green-200 px-2 py-0.5 rounded-full">
                    {locale === 'vi' ? article.categoryVi : article.categoryEn}
                  </span>
                  <span className="text-[10px] text-gray-400">{formatDate(article.date, locale)}</span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-green-700 transition-colors flex-1">
                  {locale === 'vi' ? article.titleVi : article.titleEn}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                  {locale === 'vi' ? article.summaryVi : article.summaryEn}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                  <span>{article.readTime} {locale === 'vi' ? 'phút đọc' : 'min read'}</span>
                  <span className="text-green-600 font-semibold group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
