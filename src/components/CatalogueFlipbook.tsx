'use client';

import { useEffect, useRef, useState } from 'react';
import { useDearFlip, ensureDearFlip } from '@/hooks/useDearFlip';

interface Project {
  id: string;
  category: string;
  image: string;
}

const CATEGORIES = ['ALL', 'Golf', 'Resort', 'Urban', 'Garden', 'Artwork'];
const CAT_LABEL: Record<string, { vi: string; en: string }> = {
  ALL:     { vi: 'Tất cả',     en: 'All'     },
  Golf:    { vi: 'Golf',       en: 'Golf'    },
  Resort:  { vi: 'Resort',     en: 'Resort'  },
  Urban:   { vi: 'Đô thị',     en: 'Urban'   },
  Garden:  { vi: 'Sân vườn',   en: 'Garden'  },
  Artwork: { vi: 'Nghệ thuật', en: 'Artwork' },
};

// ── Inner component — one fresh instance per key ─────────────────────────────
function FlipbookInstance({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useDearFlip(containerRef, {
    source: images,
    webgl: false,
    backgroundColor: '#f0ede8',
    hard: 'cover',
    soundEnable: false,
    autoEnableOutline: false,
    autoEnableThumbnail: false,
  });

  return <div ref={containerRef} className="w-full h-full" />;
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function CatalogueFlipbook({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [ready, setReady] = useState(false);
  const lang = locale as 'vi' | 'en';

  // Pre-load DearFlip scripts as early as possible
  useEffect(() => {
    ensureDearFlip()
      .then(() => setReady(true))
      .catch((err) => console.error('DearFlip load error:', err));
  }, []);

  const filteredImages = (
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeCategory)
  ).map((p) => p.image);

  return (
    // Full viewport minus fixed navbar (68 px)
    <div className="flex flex-col" style={{ height: 'calc(100vh - 68px)' }}>

      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 sm:px-8 py-3 bg-white border-b border-gray-100 overflow-x-auto shrink-0">
        <span className="text-[10px] tracking-widest uppercase text-gray-400 mr-2 whitespace-nowrap hidden sm:block">
          {lang === 'vi' ? 'Lọc:' : 'Filter:'}
        </span>
        {CATEGORIES.map((cat) => {
          const count =
            cat === 'ALL'
              ? projects.length
              : projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-medium tracking-widest uppercase whitespace-nowrap rounded transition-colors ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {CAT_LABEL[cat][lang]}
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Flipbook area ──────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden bg-stone-100">
        {!ready ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs tracking-widest uppercase">
                {lang === 'vi' ? 'Đang tải catalogue...' : 'Loading catalogue...'}
              </p>
            </div>
          </div>
        ) : (
          // key={activeCategory} → triggers unmount + remount → fresh DearFlip init
          <FlipbookInstance key={activeCategory} images={filteredImages} />
        )}
      </div>
    </div>
  );
}
