'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function CatalogViewer({ locale }: Props) {
  const isVi = locale === 'vi';
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0); // 0 = cover page

  useEffect(() => {
    fetch('/api/projects?published=true')
      .then(r => r.ok ? r.json() : [])
      .then((data: Project[]) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const total = projects.length + 2; // cover + projects + back cover
  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (loading) return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[#07130a]">
      <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Loading catalog…</p>
    </div>
  );

  /* ── Page renderer ── */
  const renderPage = () => {
    // Cover
    if (current === 0) return <CoverPage isVi={isVi} locale={locale} total={projects.length} />;
    // Back cover
    if (current === total - 1) return <BackCoverPage isVi={isVi} locale={locale} />;
    // Project page
    const p = projects[current - 1];
    return <ProjectPage p={p} isVi={isVi} locale={locale} pageNum={current} total={total - 2} />;
  };

  const progress = Math.round((current / (total - 1)) * 100);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#07130a]">
      {/* Page area */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-4 overflow-hidden">
        <div
          className="relative w-full h-full max-w-5xl transition-all duration-500"
          style={{ animation: 'catalogFade 0.4s ease' }}
          key={current}
        >
          {renderPage()}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-t border-white/8">
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all disabled:opacity-20"
          style={{ color: current === 0 ? '#666' : '#c7dc49' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {isVi ? 'Trước' : 'Prev'}
        </button>

        {/* Progress bar + page indicator */}
        <div className="flex-1 flex items-center gap-4 mx-8">
          <div className="flex-1 h-px bg-white/10">
            <div className="h-full bg-[#c7dc49] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] tracking-[0.2em] text-gray-500 tabular-nums shrink-0">
            {current === 0 ? (isVi ? 'Trang bìa' : 'Cover') :
             current === total - 1 ? (isVi ? 'Kết thúc' : 'End') :
             `${current} / ${total - 2}`}
          </span>
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === total - 1}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all disabled:opacity-20"
          style={{ color: current === total - 1 ? '#666' : '#c7dc49' }}
        >
          {isVi ? 'Tiếp' : 'Next'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes catalogFade {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Cover Page ── */
function CoverPage({ isVi, locale, total }: { isVi: boolean; locale: string; total: number }) {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ borderRadius: 12, minHeight: 0 }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg"
          alt="cover" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,19,10,0.82) 0%, rgba(7,19,10,0.5) 60%, rgba(7,19,10,0.2) 100%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-10 md:p-14 w-full">
        {/* Top: logo + year */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#c7dc49] uppercase mb-1">LAPLA</p>
            <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase">Lawn &amp; Landscaping</p>
          </div>
          <p className="text-[9px] tracking-[0.2em] text-white/30 uppercase">2025</p>
        </div>

        {/* Center: title */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] text-[#c7dc49] uppercase mb-4">
            {isVi ? 'Danh mục dự án' : 'Project Catalog'}
          </p>
          <h1 className="font-display font-black leading-none text-white mb-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}>
            {isVi ? <>Tuyển tập<br />công trình<br />Lapla</> : <>Lapla<br />Project<br />Portfolio</>}
          </h1>
          <p className="text-sm text-white/50 max-w-xs leading-relaxed">
            {isVi
              ? `${total} dự án cảnh quan tiêu biểu — từ dân dụng đến thương mại và resort.`
              : `${total} featured landscape projects — residential, commercial & resort.`}
          </p>
        </div>

        {/* Bottom: stats row */}
        <div className="flex items-center gap-8">
          {[
            { n: '17+', label: isVi ? 'Năm kinh nghiệm' : 'Years' },
            { n: '200+', label: isVi ? 'Dự án' : 'Projects' },
            { n: '99%', label: isVi ? 'Hài lòng' : 'Satisfaction' },
          ].map(s => (
            <div key={s.n}>
              <p className="font-display font-black text-white leading-none" style={{ fontSize: '1.8rem' }}>{s.n}</p>
              <p className="text-[9px] tracking-[0.15em] text-white/40 uppercase mt-0.5">{s.label}</p>
            </div>
          ))}
          <div className="flex-1" />
          <p className="text-[9px] text-white/20 uppercase tracking-widest">Press → to start</p>
        </div>
      </div>
    </div>
  );
}

/* ── Project Page ── */
function ProjectPage({ p, isVi, locale, pageNum, total }: { p: Project; isVi: boolean; locale: string; pageNum: number; total: number }) {
  const galleryImgs = [p.image, ...(p.images || [])].filter(Boolean).slice(0, 4);

  return (
    <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden" style={{ borderRadius: 12, minHeight: 0 }}>

      {/* LEFT: main image */}
      <div className="relative overflow-hidden">
        <Image src={p.image} alt={isVi ? p.title : p.titleEn} fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,19,10,0.85) 0%, transparent 50%)' }} />
        {/* Category badge */}
        <div className="absolute top-5 left-5">
          <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5" style={{ backgroundColor: '#c7dc49', color: 'var(--color-text-primary)', borderRadius: 6 }}>
            {p.category}
          </span>
        </div>
        {/* Page number */}
        <div className="absolute bottom-5 left-5">
          <p className="text-[9px] tracking-[0.2em] text-white/40 tabular-nums">{String(pageNum).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
        </div>
      </div>

      {/* RIGHT: info */}
      <div className="flex flex-col bg-[#0c1e0f] p-7 md:p-9 overflow-y-auto">
        {/* Project title */}
        <div className="mb-6">
          <p className="text-[9px] font-bold tracking-[0.3em] text-[#c7dc49] uppercase mb-2">{p.category}</p>
          <h2 className="font-display font-black leading-tight text-white mb-1" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
            {isVi ? p.title : p.titleEn}
          </h2>
          <p className="text-xs text-white/40">{p.location} · {p.year}</p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { label: isVi ? 'Khách hàng' : 'Client',   value: p.client || '—' },
            { label: isVi ? 'Diện tích'  : 'Area',     value: p.area   || '—' },
            { label: isVi ? 'Năm'        : 'Year',     value: p.year   || '—' },
            { label: isVi ? 'Thời gian'  : 'Duration', value: p.duration || '—' },
          ].map(m => (
            <div key={m.label}>
              <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mb-0.5">{m.label}</p>
              <p className="text-xs font-semibold text-white/80">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-white/55 mb-6 flex-1" style={{ lineHeight: '22px' }}>
          {(isVi ? p.description : p.descriptionEn)?.slice(0, 280)}
          {(isVi ? p.description : p.descriptionEn)?.length > 280 ? '…' : ''}
        </p>

        {/* Gallery strip */}
        {galleryImgs.length > 1 && (
          <div className="flex gap-2 mb-6">
            {galleryImgs.slice(1).map((src, i) => (
              <div key={i} className="relative overflow-hidden flex-1" style={{ height: 56, borderRadius: 6 }}>
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/${locale}/projects/${p.slug}`}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all hover:opacity-80"
          style={{ color: '#c7dc49' }}
        >
          {isVi ? 'Xem dự án đầy đủ' : 'View Full Project'}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── Back Cover ── */
function BackCoverPage({ isVi, locale }: { isVi: boolean; locale: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ borderRadius: 12 }}>
      <div className="absolute inset-0">
        <Image src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg" alt="back" fill className="object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(7,19,10,0.88)' }} />
      </div>
      <div className="relative z-10 text-center px-10">
        <p className="text-[9px] font-bold tracking-[0.3em] text-[#c7dc49] uppercase mb-6">LAPLA</p>
        <h2 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}>
          {isVi ? 'Hãy cùng tạo nên\nmột tác phẩm xanh' : 'Let\'s Create\nSomething Green'}
        </h2>
        <p className="text-sm text-white/40 mb-8 max-w-md mx-auto">
          {isVi
            ? 'Liên hệ với chúng tôi để bắt đầu hành trình tạo dựng không gian xanh của bạn.'
            : 'Contact us to begin your green space journey with our expert team.'}
        </p>
        <Link
          href={`/${locale}#contact`}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all hover:opacity-90 px-7 py-3.5"
          style={{ backgroundColor: '#c7dc49', color: 'var(--color-text-primary)', borderRadius: 8 }}
        >
          {isVi ? 'Yêu cầu báo giá' : 'Request A Quote'}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
