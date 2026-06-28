'use client';
import { useLocale } from 'next-intl';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

type Member = {
  id: string; abbr: string; name: string; tagline: string;
  descVi: string; descEn: string; accent: string;
  images: string[]; published: boolean;
};

/* ── Modal ── */
function MemberModal({ member, onClose, isVi }: { member: Member; onClose: () => void; isVi: boolean }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg relative overflow-hidden"
        style={{ borderRadius: '20px', boxShadow: 'var(--shadow-xl)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #0f541e 0%, #1a7a30 60%, #2d9e4a 100%)' }}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-white transition-opacity hover:opacity-70"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}
            aria-label={isVi ? 'Đóng' : 'Close'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(199,220,73,0.15)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(199,220,73,0.3)' }}>
            {member.tagline}
          </span>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(199,220,73,0.15)', borderRadius: '14px', border: '1px solid rgba(199,220,73,0.25)' }}>
              <span className="font-black text-lg" style={{ color: 'var(--color-accent)' }}>{member.abbr}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{member.abbr} · Lapla Group</p>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="px-8 py-6">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? 'Giới thiệu' : 'About'}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? member.descVi : member.descEn}</p>
        </div>
        <div className="px-8 py-4 flex items-center gap-2" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#fafafa' }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? 'Thành viên của Lapla Group' : 'Member of Lapla Group'}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function MemberCompaniesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [selected, setSelected] = useState<Member | null>(null);
  const [memberCompanies, setMemberCompanies] = useState<Member[]>([]);

  useEffect(() => {
    fetch('/api/member-companies')
      .then(r => r.ok ? r.json() : [])
      .then((data: Member[]) => setMemberCompanies(data.filter(m => m.published)))
      .catch(() => {});
  }, []);

  const [featured, ...rest] = memberCompanies;
  if (!featured) return null;

  const total = memberCompanies.length;

  return (
    <>
      <section className="leafix-section relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
        {/* SVG botanical repeating pattern */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 C70 50 50 70 50 100 C50 130 68 148 90 148 C112 148 130 130 130 100 C130 70 110 50 90 15Z' stroke='%230f541e' stroke-width='0.8' fill='none' opacity='0.09'/%3E%3Cline x1='90' y1='148' x2='90' y2='168' stroke='%230f541e' stroke-width='0.8' opacity='0.09'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%230f541e' opacity='0.07'/%3E%3Ccircle cx='150' cy='150' r='3' fill='%230f541e' opacity='0.07'/%3E%3Ccircle cx='150' cy='30' r='2' fill='%230f541e' opacity='0.05'/%3E%3Ccircle cx='30' cy='150' r='2' fill='%230f541e' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 1,
        }} />
        {/* Floating branch — bottom-right corner */}
        <img
          src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1781085049/shapes/work-shape-01.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none hidden md:block"
          style={{ bottom: '30px', right: '0px', width: '180px', opacity: 0.4, animation: 'float-bob-y 5.5s ease-in-out infinite 1s', zIndex: 0 }}
        />
        <div className="max-w-[2240px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-24 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <ScrollReveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-brand)' }}>
                <span className="inline-block w-6 h-px" style={{ backgroundColor: 'var(--color-brand)' }} />
                {isVi ? 'Hệ sinh thái' : 'Ecosystem'}
              </p>
              <h2 className="font-display font-bold leading-[1.08]" style={{ fontSize: 'clamp(1.95rem, 3.5vw, 3.75rem)', color: 'var(--color-text-primary)' }}>
                {isVi
                  ? <>Hệ sinh thái <span style={{ color: 'var(--color-brand)' }}>Lapla&nbsp;Group</span></>
                  : <>The <span style={{ color: 'var(--color-brand)' }}>Lapla</span> Ecosystem</>}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="md:text-right md:max-w-xs">
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {isVi ? 'Hệ sinh thái toàn diện gồm các công ty thành viên chuyên biệt, cùng phát triển bền vững.' : 'A comprehensive ecosystem of specialized member companies, growing together sustainably.'}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full" style={{ color: 'var(--color-brand)', backgroundColor: 'rgba(15,84,30,0.07)', border: '1px solid rgba(15,84,30,0.12)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
                  {total} {isVi ? 'công ty thành viên' : 'member companies'}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Featured card — 2 cols × 2 rows */}
            <ScrollReveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2 h-full">
              <button
                onClick={() => setSelected(featured)}
                aria-label={featured.name}
                className="group w-full h-full relative overflow-hidden text-left cursor-pointer flex flex-col justify-between transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(15,84,30,0.30)]"
                style={{
                  background: 'linear-gradient(145deg, #0f541e 0%, var(--color-brand) 55%, #48a85a 100%)',
                  borderRadius: '24px',
                  padding: '36px',
                  minHeight: '340px',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(15,84,30,0.18)',
                }}
              >
                {/* SVG leaf watermark bg */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none select-none transition-transform duration-500 group-hover:scale-105" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <path d="M320 40C200 40 100 140 100 280c0-40 20-100 60-140 10 50 30 100 60 140C180 240 220 140 300 120c-40 40-60 100-60 160 60-20 120-80 140-240z" fill="white" opacity="0.05"/>
                  <path d="M60 200C10 200-20 240-20 280c0 20 10 35 30 35 10-15 10-30 0-45 15 10 25 25 25 45 10-7.5 20-22.5 20-37.5C55 242.5 30 222.5 60 200z" fill="white" opacity="0.04"/>
                  <circle cx="350" cy="80" r="60" stroke="white" strokeWidth="1" fill="none" opacity="0.07"/>
                  <circle cx="350" cy="80" r="35" stroke="white" strokeWidth="0.7" fill="none" opacity="0.05"/>
                </svg>

                {/* Top section */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(199,220,73,0.15)', borderRadius: '999px', border: '1px solid rgba(199,220,73,0.35)' }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 2 3 7 3 13c0 3.5 2.5 6.5 9 6.5 0.5-2.5 0.5-5 0-7 2 1.5 3.5 4 3.5 7 2-1.5 3.5-4 3.5-6.5C19 6.5 16 2 12 2z"/></svg>
                      {featured.tagline}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:rotate-45" style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)' }}>
                      <svg className="w-4 h-4 text-white transition-colors group-hover:text-[var(--color-text-primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </div>
                  </div>
                  {/* Abbr monogram badge */}
                  <div className="w-16 h-16 flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.22)' }}>
                    <span className="font-black text-xl text-white tracking-wide">{featured.abbr}</span>
                  </div>
                  <h3 className="font-display font-bold text-white leading-snug" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)' }}>{featured.name}</h3>
                </div>

                {/* Bottom section */}
                <div className="relative z-10 mt-8">
                  <div className="w-12 h-px mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '320px' }}>{isVi ? featured.descVi : featured.descEn}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition-colors">
                    {isVi ? 'Xem chi tiết' : 'Learn more'}
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </span>
                </div>
              </button>
            </ScrollReveal>

            {/* Regular cards */}
            {rest.map((company, i) => (
              <ScrollReveal key={company.id ?? company.abbr} delay={(i % 2) + 1} className="h-full">
                <button
                  onClick={() => setSelected(company)}
                  aria-label={company.name}
                  className="group w-full h-full relative overflow-hidden text-left cursor-pointer flex flex-col rounded-[20px] bg-white border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-brand)]/30 hover:shadow-[0_16px_40px_rgba(15,84,30,0.14)]"
                >
                  {/* Gradient bar top — hover bằng CSS group-hover */}
                  <div
                    className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(90deg, var(--color-brand), var(--color-accent))' }}
                  />

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between">
                      {/* Abbr badge — fill brand on hover */}
                      <div className="w-14 h-14 flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--color-brand)]" style={{ background: 'rgba(15,84,30,0.06)', borderRadius: '14px', border: '1px solid rgba(15,84,30,0.1)' }}>
                        <span className="font-black text-base transition-colors duration-300 group-hover:text-white" style={{ color: 'var(--color-brand)', letterSpacing: '0.04em' }}>{company.abbr}</span>
                      </div>

                      {/* Number */}
                      <span className="font-display font-black text-[30px] leading-none select-none" style={{ color: 'rgba(15,84,30,0.12)' }}>
                        {String(i + 2).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-2" style={{ color: 'rgba(15,84,30,0.5)' }}>{company.tagline}</p>
                      <h3 className="font-display font-bold text-base leading-snug mb-2 transition-colors duration-200 group-hover:text-[var(--color-brand)]" style={{ color: 'var(--color-text-primary)' }}>{company.name}</h3>
                      <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? company.descVi : company.descEn}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>{isVi ? 'Xem thêm' : 'Details'}</span>
                      <div className="w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--color-brand)]" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: '9px' }}>
                        <svg className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-white" style={{ color: 'var(--color-brand)' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <MemberModal member={selected} onClose={() => setSelected(null)} isVi={isVi} />}
      </AnimatePresence>
    </>
  );
}
