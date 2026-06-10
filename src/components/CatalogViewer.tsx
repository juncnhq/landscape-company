'use client';
import { useRef, useState, useEffect, useCallback, forwardRef } from 'react';
import Link from 'next/link';
import HTMLFlipBook from 'react-pageflip';

type Project = {
  id: string; slug: string;
  title: string; titleEn: string;
  category: string; location: string;
  area: string; duration: string;
  client: string; year: string;
  image: string; images: string[];
  description: string; descriptionEn: string;
};

interface Props { locale: string; }

const PAGE_W = 430;
const PAGE_H = 570;

/* ─────────────────────── Img helper (no next/image inside flipbook) ──────── */
function Img({ src, alt = '', style }: { src: string; alt?: string; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', display: 'block',
        ...style,
      }}
    />
  );
}

/* ─────────────────────── Page components (forwardRef) ───────────────────── */
type BaseProps = { number?: number };

// Cover
const CoverPage = forwardRef<HTMLDivElement, BaseProps & { total: number; isVi: boolean }>(
  ({ total, isVi }, ref) => (
    <div ref={ref} data-density="hard"
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Img src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg" alt="cover" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(7,19,10,0.92) 0%,rgba(7,19,10,0.55) 60%,rgba(7,19,10,0.18) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '36px 32px' }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: '#c7dc49', fontSize: 10, fontWeight: 800, letterSpacing: '0.32em', textTransform: 'uppercase', margin: 0 }}>LAPLA</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '3px 0 0' }}>Lawn &amp; Landscaping</p>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>2025</p>
        </div>
        {/* Center */}
        <div>
          <div style={{ width: 36, height: 1, backgroundColor: '#c7dc49', marginBottom: 18 }} />
          <p style={{ color: '#c7dc49', fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10 }}>
            {isVi ? 'Danh mục dự án' : 'Project Catalog'}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 900, color: '#fff', lineHeight: 1, fontSize: 'clamp(2rem,6vw,3.2rem)', letterSpacing: '-0.02em', margin: '0 0 14px' }}>
            {isVi ? 'Tuyển tập\ncông trình\nLapla' : 'Lapla\nProject\nPortfolio'}
          </h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: 200, margin: 0 }}>
            {isVi ? `${total} dự án cảnh quan tiêu biểu — dân dụng, thương mại và resort.`
                  : `${total} featured landscape projects — residential, commercial & resort.`}
          </p>
        </div>
        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[{ n: '17+', l: isVi ? 'Năm kinh nghiệm' : 'Years' },
            { n: '200+', l: isVi ? 'Dự án' : 'Projects' },
            { n: '99%', l: isVi ? 'Hài lòng' : 'Satisfaction' }].map(s => (
            <div key={s.n}>
              <p style={{ fontFamily: 'var(--font-display), serif', fontWeight: 900, color: '#fff', fontSize: '1.55rem', lineHeight: 1, margin: 0 }}>{s.n}</p>
              <p style={{ fontSize: 8, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: '3px 0 0' }}>{s.l}</p>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', letterSpacing: '0.18em', margin: 0 }}>→ to start</p>
        </div>
      </div>
    </div>
  )
);
CoverPage.displayName = 'CoverPage';

// Project page — layout mirrors ProjectFlipbook: image top 62%, thumbnail+info bottom 38%
type ProjectPageProps = BaseProps & { p: Project; isVi: boolean; locale: string; idx: number; total: number };
const ProjectPage = forwardRef<HTMLDivElement, ProjectPageProps>(
  ({ p, isVi, locale, idx, total }, ref) => {
    const imgs = [p.image, ...(p.images || [])].filter(Boolean);
    const secondImg = imgs[1] ?? imgs[0];
    const desc = ((isVi ? p.description : p.descriptionEn) || '');
    return (
      <div ref={ref}
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#0c1e0f' }}>

        {/* TOP: hero image — 62% height */}
        <div style={{ height: '62%', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          <Img src={p.image} alt={isVi ? p.title : p.titleEn} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(7,19,10,0.75) 0%,transparent 55%)' }} />

          {/* Page number + category */}
          <div style={{ position: 'absolute', top: 12, left: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#c7dc49' }}>
              {String(idx).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>·</span>
            <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              {p.category}
            </span>
          </div>
        </div>

        {/* BOTTOM: thumbnail + info — 38% height */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Left: second image */}
          <div style={{ width: '42%', flexShrink: 0, position: 'relative', overflow: 'hidden', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <Img src={secondImg} style={{ opacity: 0.85 }} />
          </div>

          {/* Right: text info */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 14px' }}>
            {/* Top: category tag */}
            <span style={{ display: 'inline-block', fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c7dc49', border: '1px solid rgba(199,220,73,0.3)', padding: '2px 7px', alignSelf: 'flex-start' }}>
              {p.category}
            </span>

            {/* Middle: title + desc */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display),serif', fontWeight: 700, color: '#fff', fontSize: '0.85rem', lineHeight: 1.3, margin: '0 0 5px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {isVi ? p.title : p.titleEn}
              </h3>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {desc}
              </p>
            </div>

            {/* Bottom: location / year / client */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>↗</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>{p.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{p.year}</span>
                <a href={`/${locale}/projects/${p.slug}`}
                  style={{ fontSize: 8, fontWeight: 700, color: '#c7dc49', textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {isVi ? 'Xem →' : 'View →'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ProjectPage.displayName = 'ProjectPage';

// Back cover
const BackCoverPage = forwardRef<HTMLDivElement, BaseProps & { isVi: boolean; locale: string }>(
  ({ isVi, locale }, ref) => (
    <div ref={ref} data-density="hard"
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Img src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg" alt="back" />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(7,19,10,0.87)' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 32px' }}>
        <div style={{ width: 28, height: 1, backgroundColor: '#c7dc49', margin: '0 auto 20px' }} />
        <p style={{ color: '#c7dc49', fontSize: 9, fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 18px' }}>LAPLA</p>
        <h2 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 900, color: '#fff', lineHeight: 1.2, fontSize: 'clamp(1.4rem,4vw,2.4rem)', margin: '0 0 14px' }}>
          {isVi ? 'Hãy cùng tạo nên\nmột tác phẩm xanh' : "Let's Create\nSomething Green"}
        </h2>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, maxWidth: 240, margin: '0 auto 24px' }}>
          {isVi ? 'Liên hệ để bắt đầu hành trình tạo dựng không gian xanh của bạn.'
                : 'Contact us to begin your green space journey with our expert team.'}
        </p>
        <a href={`/${locale}#contact`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', backgroundColor: '#c7dc49', color: '#07130a', textDecoration: 'none', padding: '10px 22px', borderRadius: 7 }}>
          {isVi ? 'Yêu cầu báo giá' : 'Request A Quote'}
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
        <div style={{ width: 28, height: 1, backgroundColor: '#c7dc49', opacity: 0.4, margin: '18px auto 0' }} />
      </div>
    </div>
  )
);
BackCoverPage.displayName = 'BackCoverPage';

/* ─────────────────────── Main viewer ─────────────────────────────────────── */
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 1.3;
const ZOOM_STEP = 0.1;

export default function CatalogViewer({ locale }: Props) {
  const isVi = locale === 'vi';
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(0.82);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Prevent document-level scrollbars that appear during flip animation
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    fetch('/api/projects?published=true')
      .then(r => r.ok ? r.json() : [])
      .then((data: Project[]) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const goNext = () => bookRef.current?.pageFlip()?.flipNext();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoomIn  = () => setZoom(z => Math.min(+(z + ZOOM_STEP).toFixed(1), ZOOM_MAX));
  const zoomOut = () => setZoom(z => Math.max(+(z - ZOOM_STEP).toFixed(1), ZOOM_MIN));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const TOTAL_PAGES = projects.length + 2;
  const TOTAL_SPREADS = Math.ceil(TOTAL_PAGES / 2);
  const activeSpread = Math.floor(currentPage / 2);

  if (loading) return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, backgroundColor: '#07130a' }}>
      <div style={{ width: 28, height: 28, border: '2px solid #328442', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#4a4a4a', textTransform: 'uppercase', margin: 0 }}>Loading catalog…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  return (
    <>
    <style>{`
      .catalog-root * { scrollbar-width: none; -ms-overflow-style: none; }
      .catalog-root *::-webkit-scrollbar { display: none; }
    `}</style>
    <div ref={containerRef} className="catalog-root" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#07130a' }}>

      {/* Toolbar */}
      <div style={{ position: 'absolute', top: 10, right: 14, zIndex: 20, display: 'flex', alignItems: 'center', gap: 2 }}>
        {[
          { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35M8 11h6"/></svg>, action: zoomOut, disabled: zoom <= ZOOM_MIN, label: 'Thu nhỏ' },
        ].map(({ icon, action, disabled, label }) => (
          <button key={label} onClick={action} disabled={disabled} aria-label={label}
            style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', color: disabled ? '#333' : '#666', transition: 'color 0.15s' }}
            onMouseEnter={e => !disabled && ((e.currentTarget as HTMLElement).style.color = '#fff')}
            onMouseLeave={e => !disabled && ((e.currentTarget as HTMLElement).style.color = '#666')}
          >{icon}</button>
        ))}
        <button onClick={() => setZoom(0.82)}
          style={{ minWidth: 38, height: 30, background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: 11, fontVariantNumeric: 'tabular-nums', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#555')}
        >{Math.round(zoom * 100)}%</button>
        <button onClick={zoomIn} disabled={zoom >= ZOOM_MAX} aria-label="Phóng to"
          style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: zoom >= ZOOM_MAX ? 'not-allowed' : 'pointer', color: zoom >= ZOOM_MAX ? '#333' : '#666', transition: 'color 0.15s' }}
          onMouseEnter={e => zoom < ZOOM_MAX && ((e.currentTarget as HTMLElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#666')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
        </button>
        <div style={{ width: 1, height: 14, backgroundColor: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        <button onClick={toggleFullscreen} aria-label={isFullscreen ? 'Thoát' : 'Toàn màn hình'}
          style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#666', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#666')}
        >
          {isFullscreen
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9 4 4m0 0h5m-5 0v5M15 9l5-5m0 0h-5m5 0v5M9 15l-5 5m0 0h5m-5 0v-5M15 15l5 5m0 0h-5m5 0v-5"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/></svg>
          }
        </button>
      </div>

      {/* ── Desktop flipbook ───────────────────────────── */}
      {mounted && (
        <div className="hidden md:flex flex-col flex-1 items-center justify-center gap-5">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease', filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.75))' }}>
            {/* @ts-ignore – react-pageflip types */}
            <HTMLFlipBook
              ref={bookRef}
              width={PAGE_W} height={PAGE_H}
              className="" style={{}}
              size="fixed"
              minWidth={PAGE_W} maxWidth={PAGE_W}
              minHeight={PAGE_H} maxHeight={PAGE_H}
              showCover drawShadow
              usePortrait={false}
              flippingTime={750}
              autoSize={false}
              startPage={0} startZIndex={10}
              maxShadowOpacity={0.6}
              useMouseEvents swipeDistance={30}
              clickEventForward
              mobileScrollSupport={false}
              showPageCorners
              disableFlipByClick={false}
              onFlip={handleFlip}
            >
              <CoverPage total={projects.length} isVi={isVi} />
              {projects.map((p, i) => (
                <ProjectPage key={p.id} p={p} isVi={isVi} locale={locale} idx={i + 1} total={projects.length} />
              ))}
              <BackCoverPage isVi={isVi} locale={locale} />
            </HTMLFlipBook>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button onClick={goPrev} aria-label="Trang trước"
              style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'none', cursor: 'pointer', color: '#666', fontSize: 18, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#c7dc49'; (e.currentTarget as HTMLElement).style.color = '#c7dc49'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#666'; }}
            >‹</button>

            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {Array.from({ length: TOTAL_SPREADS }).map((_, i) => (
                <span key={i} style={{ display: 'block', height: 4, borderRadius: 2, transition: 'all 0.3s', width: i === activeSpread ? 18 : 5, backgroundColor: i === activeSpread ? '#c7dc49' : 'rgba(255,255,255,0.1)' }} />
              ))}
            </div>

            <button onClick={goNext} aria-label="Trang sau"
              style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'none', cursor: 'pointer', color: '#666', fontSize: 18, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#c7dc49'; (e.currentTarget as HTMLElement).style.color = '#c7dc49'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#666'; }}
            >›</button>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 10, letterSpacing: '0.15em', margin: 0 }}>
            {isVi ? 'Kéo góc trang hoặc nhấn ← → để lật' : 'Drag page corner or press ← → to flip'}
          </p>
        </div>
      )}

      {/* ── Mobile scroll-snap ─────────────────────────── */}
      <div className="flex flex-col flex-1 justify-center md:hidden">
        <p style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 12 }}>
          {isVi ? 'Vuốt để xem dự án' : 'Swipe to browse'}
        </p>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 24px 16px', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
          {projects.map((p, i) => (
            <div key={p.id} style={{ flexShrink: 0, scrollSnapAlign: 'center', width: '78vw', maxWidth: 290, height: '58vh', borderRadius: 12, overflow: 'hidden', position: 'relative', backgroundColor: '#0c1e0f' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={isVi ? p.title : p.titleEn} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(7,19,10,0.92) 0%,rgba(7,19,10,0.1) 55%,transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#c7dc49' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,220,73,0.7)' }}>{p.category}</span>
                </div>
                <h3 style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.3, margin: '0 0 5px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{isVi ? p.title : p.titleEn}</h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, margin: 0 }}>{p.location} · {p.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
