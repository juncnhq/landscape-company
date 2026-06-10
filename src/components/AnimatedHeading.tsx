'use client';
import { useEffect, useRef } from 'react';

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;       // base delay ms
  stagger?: number;     // ms between each word
  duration?: number;    // ms per word
  splitBy?: 'word' | 'chunk'; // default word
}

/**
 * Splits text into words and reveals them left-to-right on scroll.
 * Same easing as HeroSection heroWord animation.
 */
export default function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className = '',
  style,
  delay = 0,
  stagger = 120,
  duration = 900,
  splitBy = 'word',
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  const words = splitBy === 'word'
    ? children.split(/\s+/)
    : [children];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const spans = el.querySelectorAll<HTMLSpanElement>('.ah-word');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spans.forEach((span, i) => {
            span.style.animationDelay = `${delay + i * stagger}ms`;
            span.classList.add('ah-animate');
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* @ts-expect-error dynamic tag */}
      <Tag ref={ref} className={className} style={style}>
        {words.map((word, i) => (
          <span
            key={i}
            className="ah-word inline-block"
            style={{ '--ah-duration': `${duration}ms` } as React.CSSProperties}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
      <style>{`
        .ah-word {
          opacity: 0;
          transform: translateX(-20px) skewX(-3deg);
          will-change: opacity, transform;
        }
        .ah-word.ah-animate {
          animation: ahReveal var(--ah-duration, 900ms) cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }
        @keyframes ahReveal {
          from { opacity: 0; transform: translateX(-20px) skewX(-3deg); }
          to   { opacity: 1; transform: translateX(0) skewX(0deg); }
        }
      `}</style>
    </>
  );
}
