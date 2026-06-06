'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { newsArticles } from '@/lib/data';
import ScrollReveal from './ScrollReveal';

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function NewsGrid() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [featured, ...rest] = newsArticles;

  return (
    <div className="leafix-section" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Featured */}
        <ScrollReveal className="mb-10">
          <Link
            href={`/${locale}/news/${featured.slug}`}
            className="group grid md:grid-cols-2 overflow-hidden"
            style={{ borderRadius: '20px', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(0,0,0,0.06)' }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <Image src={featured.image} alt={isVi ? featured.titleVi : featured.titleEn} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1" style={{ backgroundColor: 'var(--color-brand)', color: '#fff', borderRadius: 'var(--radius-xl)' }}>
                  {isVi ? featured.categoryVi : featured.categoryEn}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{formatDate(featured.date, locale)}</span>
              </div>
              <h2 className="font-display font-bold leading-snug mb-3 transition-colors duration-200 group-hover:text-[var(--color-brand)]" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: 'var(--color-text-primary)' }}>
                {isVi ? featured.titleVi : featured.titleEn}
              </h2>
              <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: 'var(--color-text-secondary)' }}>
                {isVi ? featured.summaryVi : featured.summaryEn}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Đọc tiếp' : 'Read More'}
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i % 3}>
              <Link
                href={`/${locale}/news/${article.slug}`}
                className="group flex flex-col overflow-hidden h-full bg-white"
                style={{ borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.06)', transition: 'box-shadow var(--duration-fast)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <Image src={article.image} alt={isVi ? article.titleVi : article.titleEn} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1" style={{ color: 'var(--color-brand)', border: '1px solid var(--color-brand)', borderRadius: 'var(--radius-xl)' }}>
                      {isVi ? article.categoryVi : article.categoryEn}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>{formatDate(article.date, locale)}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm leading-snug mb-2 flex-1 transition-colors duration-200 group-hover:text-[var(--color-brand)]" style={{ color: 'var(--color-text-primary)' }}>
                    {isVi ? article.titleVi : article.titleEn}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {isVi ? article.summaryVi : article.summaryEn}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', color: 'var(--color-text-secondary)' }}>
                    <span>{article.readTime} {isVi ? 'phút đọc' : 'min read'}</span>
                    <span className="font-bold group-hover:translate-x-1 transition-transform duration-200" style={{ color: 'var(--color-brand)' }}>→</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
