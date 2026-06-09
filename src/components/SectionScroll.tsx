'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Section-by-section scroll — intercepts wheel + keyboard + touch,
 * snaps to the next/previous <section> inside the page.
 * Shows a dot-nav on the right edge.
 */
export default function SectionScroll({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<Element[]>([]);
  const [current, setCurrent] = useState(0);
  const cooldown = useRef(false);

  // Collect all <section> elements after mount
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll('main > section'));
    setSections(secs);
  }, []);

  const goTo = useCallback((index: number, secs: Element[]) => {
    if (index < 0 || index >= secs.length) return;
    cooldown.current = true;
    secs[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrent(index);
    setTimeout(() => { cooldown.current = false; }, 100);
  }, []);

  // Find which section is closest to viewport top
  const getClosestSection = useCallback((secs: Element[]) => {
    let closest = 0;
    let minDist = Infinity;
    secs.forEach((sec, i) => {
      const dist = Math.abs(sec.getBoundingClientRect().top);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }, []);

  useEffect(() => {
    if (!sections.length) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    // Sync dot on normal scroll (keyboard / scrollbar)
    const onScroll = () => {
      if (!cooldown.current) {
        setCurrent(getClosestSection(sections));
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (cooldown.current) { e.preventDefault(); return; }
      const dir = e.deltaY > 0 ? 1 : -1;
      setCurrent(prev => {
        const next = Math.max(0, Math.min(sections.length - 1, prev + dir));
        if (next !== prev) {
          e.preventDefault();
          goTo(next, sections);
        }
        return prev;
      });
    };

    const onKey = (e: KeyboardEvent) => {
      if (cooldown.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrent(prev => { goTo(Math.min(sections.length - 1, prev + 1), sections); return prev; });
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrent(prev => { goTo(Math.max(0, prev - 1), sections); return prev; });
      }
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (cooldown.current) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const dir = dy > 0 ? 1 : -1;
      setCurrent(prev => {
        const next = Math.max(0, Math.min(sections.length - 1, prev + dir));
        goTo(next, sections);
        return prev;
      });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [sections, goTo, getClosestSection]);

  return (
    <>
      {children}

      {/* Dot navigation */}
      {sections.length > 1 && (
        <nav
          aria-label="Page sections"
          className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 hidden md:flex"
        >
          {sections.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to section ${i + 1}`}
              onClick={() => goTo(i, sections)}
              style={{
                width:  i === current ? 8  : 6,
                height: i === current ? 24 : 6,
                borderRadius: i === current ? 4 : '50%',
                backgroundColor: i === current ? 'var(--color-brand, #0f541e)' : 'rgba(0,0,0,0.2)',
                transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </nav>
      )}
    </>
  );
}
