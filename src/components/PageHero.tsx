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

const BG_IMAGE = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671218/wymbkpzgdmlov1gnysd3.jpg';

export default function PageHero({ eyebrow, title, breadcrumbs }: PageHeroProps) {
  const locale = useLocale();

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '60px',
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(5,18,3,0.88) 40%, rgba(5,18,3,0.55))',
      }} />

      {/* Green accent line at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(to right, var(--color-brand), transparent)',
      }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Eyebrow */}
        <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 flex items-center gap-2"
          style={{ color: 'var(--color-accent)' }}>
          <span className="inline-block w-6 h-px" style={{ backgroundColor: 'var(--color-accent)' }} />
          {eyebrow}
        </p>

        {/* Title */}
        <h1
          className="font-display font-bold text-white mb-5"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          {title}
        </h1>

        {/* Breadcrumb */}
        {breadcrumbs && (
          <div className="flex items-center gap-2">
            <Link href={`/${locale}`}
              className="text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-80"
              style={{ color: 'rgba(255,255,255,0.5)' }}>
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
                {crumb.href ? (
                  <Link href={crumb.href}
                    className="text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-80"
                    style={{ color: i === breadcrumbs.length - 1 ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)' }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-xs uppercase tracking-widest font-medium"
                    style={{ color: 'var(--color-accent)' }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
