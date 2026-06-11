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
  description?: string;
  breadcrumbs?: Crumb[];
  bgImage?: string;
}

const DEFAULT_BG = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671218/wymbkpzgdmlov1gnysd3.jpg';

export default function PageHero({ eyebrow, title, description, breadcrumbs, bgImage }: PageHeroProps) {
  const locale = useLocale();
  const bg = bgImage ?? DEFAULT_BG;

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '190px',
        paddingBottom: '72px',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        overflow: 'hidden',
      }}
    >
      {/* Strong uniform dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: 'rgba(4,14,2,0.42)',
      }} />

      {/* Subtle left-to-right gradient on top for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(15,84,30,0.30) 0%, transparent 60%)',
      }} />

      {/* Bottom fade — smooth transition into page content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '80px',
        background: 'linear-gradient(to bottom, transparent, rgba(4,14,2,0.55))',
      }} />

      {/* Decorative dots top-right */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '100px', right: '80px',
          width: '180px', height: '120px',
          backgroundImage: 'radial-gradient(circle, rgba(199,220,73,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
          opacity: 0.7,
        }}
      />

      {/* Accent line at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(to right, var(--color-accent), var(--color-brand) 40%, transparent 80%)',
      }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">

        {/* Eyebrow */}
        <p
          className="text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2.5"
          style={{ color: 'var(--color-accent)' }}
        >
          <span className="inline-block w-8 h-px shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
          {eyebrow}
        </p>

        {/* Title — inline color required: globals.css h1 rule overrides Tailwind text-white */}
        <h1
          className="font-display font-bold mb-4"
          style={{
            color: '#ffffff',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            textShadow: '0 2px 24px rgba(0,0,0,0.55)',
            maxWidth: '760px',
          }}
        >
          {title}
        </h1>

        {/* Optional description */}
        {description && (
          <p
            className="mb-6 max-w-[560px]"
            style={{
              color: 'rgba(255,255,255,0.70)',
              fontSize: '15px',
              lineHeight: '26px',
            }}
          >
            {description}
          </p>
        )}

        {/* Breadcrumb */}
        {breadcrumbs && (
          <div className="flex items-center gap-1.5 mt-5">
            <Link
              href={`/${locale}`}
              className="text-[11px] uppercase tracking-widest font-semibold transition-opacity hover:opacity-80"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {locale === 'vi' ? 'Trang chủ' : 'Home'}
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[11px] uppercase tracking-widest font-semibold transition-opacity hover:opacity-80"
                    style={{ color: i === breadcrumbs.length - 1 ? 'var(--color-accent)' : 'rgba(255,255,255,0.45)' }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-[11px] uppercase tracking-widest font-semibold"
                    style={{ color: 'var(--color-accent)' }}
                  >
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
