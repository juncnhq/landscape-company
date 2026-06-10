'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;        // ms — e.g. 0, 100, 200, 300
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'fade';
  duration?: number;     // ms, default 850
  distance?: number;     // px translateY/X, default 48
  once?: boolean;        // animate only first time (default true)
}

/**
 * Leafix-style scroll reveal — WOW.js + animate.css equivalent.
 * Uses Intersection Observer. Easing matches animate.css easeOutCubic.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 850,
  distance = 48,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const getTransform = () => {
      switch (direction) {
        case 'left':  return `translateX(-${distance}px)`;
        case 'right': return `translateX(${distance}px)`;
        case 'fade':  return 'none';
        default:      return `translateY(${distance}px)`;
      }
    };

    // easeOutCubic — same as animate.css
    const easing = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

    el.style.opacity = '0';
    el.style.transform = getTransform();
    el.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          if (once) {
            observer.unobserve(el);
            // Clean up will-change after animation
            setTimeout(() => { el.style.willChange = 'auto'; }, duration + delay + 50);
          }
        } else if (!once) {
          el.style.opacity = '0';
          el.style.transform = getTransform();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
