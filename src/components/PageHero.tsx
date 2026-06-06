'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  breadcrumbs?: Crumb[];
}

export default function PageHero({ eyebrow, title, breadcrumbs }: PageHeroProps) {
  const locale = useLocale();

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--color-surface-dark) 0%, var(--color-brand) 60%, #1a6b28 100%)',
        paddingTop: '160px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        border: '1px solid rgba(199,220,73,0.12)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '350px', height: '350px', borderRadius: '50%',
        border: '1px solid rgba(199,220,73,0.08)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Breadcrumb */}
        {breadcrumbs && (
          <div className="flex items-center gap-2 mb-6">
            <Link href={`/${locale}`} className="text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>›</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-70" style={{ color: i === breadcrumbs.length - 1 ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)' }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--color-accent)' }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Eyebrow */}
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: 'var(--color-accent)' }} />
          {eyebrow}
        </p>

        {/* Title */}
        <h1
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
