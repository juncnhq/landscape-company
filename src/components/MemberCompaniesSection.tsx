'use client';
import { useLocale } from 'next-intl';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import AnimatedHeading from './AnimatedHeading';

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
        <div className="px-8 pt-8 pb-6" style={{ backgroundColor: 'var(--color-surface-dark)' }}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-white transition-opacity hover:opacity-70"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}
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
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{member.abbr} · Lapla Group</p>
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

  return (
    <>
      <section className="leafix-section relative" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
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
          style={{ bottom: '30px', right: '0px', width: '200px', opacity: 0.5, animation: 'float-bob-y 5.5s ease-in-out infinite 1s', zIndex: 20 }}
        />
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-brand)' }}>
                Ecosystem
              </p>
              <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)' }}>
                {isVi ? <>Hệ sinh thái<br /><span style={{ color: 'var(--color-brand)' }}>Lapla Group</span></> : <>The <span style={{ color: 'var(--color-brand)' }}>Lapla</span><br />Ecosystem</>}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {isVi ? 'Hệ sinh thái toàn diện gồm các công ty thành viên chuyên biệt, cùng phát triển bền vững.' : 'A comprehensive ecosystem of specialized member companies, growing together sustainably.'}
              </p>
            </ScrollReveal>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Featured card — 2 cols × 2 rows */}
            <ScrollReveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <button
                onClick={() => setSelected(featured)}
                className="group w-full h-full relative overflow-hidden text-left cursor-pointer flex flex-col justify-between"
                style={{
                  background: 'linear-gradient(145deg, #0f541e 0%, var(--color-brand) 55%, #48a85a 100%)',
                  borderRadius: '24px',
                  padding: '36px',
                  minHeight: '320px',
                  border: 'none',
                }}
              >
                {/* SVG leaf watermark bg */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <path d="M320 40C200 40 100 140 100 280c0-40 20-100 60-140 10 50 30 100 60 140C180 240 220 140 300 120c-40 40-60 100-60 160 60-20 120-80 140-240z" fill="white" opacity="0.04"/>
                  <path d="M60 200C10 200-20 240-20 280c0 20 10 35 30 35 10-15 10-30 0-45 15 10 25 25 25 45 10-7.5 20-22.5 20-37.5C55 242.5 30 222.5 60 200z" fill="white" opacity="0.035"/>
                  <circle cx="350" cy="80" r="60" stroke="white" strokeWidth="1" fill="none" opacity="0.06"/>
                  <circle cx="350" cy="80" r="35" stroke="white" strokeWidth="0.7" fill="none" opacity="0.04"/>
                </svg>

                {/* Top section */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(199,220,73,0.15)', borderRadius: '999px', border: '1px solid rgba(199,220,73,0.35)' }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 2 3 7 3 13c0 3.5 2.5 6.5 9 6.5 0.5-2.5 0.5-5 0-7 2 1.5 3.5 4 3.5 7 2-1.5 3.5-4 3.5-6.5C19 6.5 16 2 12 2z"/></svg>
                      {featured.tagline}
                    </span>
                    <div className="w-9 h-9 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-45" style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </div>
                  </div>
                  <p className="font-black text-[56px] leading-none mb-3 select-none" style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-display)', letterSpacing: '-2px' }}>{featured.abbr}</p>
                  <h3 className="font-display text-3xl font-bold text-white leading-snug -mt-4">{featured.name}</h3>
                </div>

                {/* Bottom section */}
                <div className="relative z-10 mt-8">
                  <div className="w-12 h-px mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '280px' }}>{isVi ? featured.descVi : featured.descEn}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                    {isVi ? 'Xem chi tiết' : 'Learn more'}
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </span>
                </div>
              </button>
            </ScrollReveal>

            {/* Regular cards */}
            {rest.map((company, i) => (
              <ScrollReveal key={company.abbr} delay={(i % 2) + 1}>
                <button
                  onClick={() => setSelected(company)}
                  className="group w-full relative overflow-hidden text-left cursor-pointer flex flex-col gap-0"
                  style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = '0 12px 36px rgba(15,84,30,0.13)';
                    el.style.borderColor = 'rgba(15,84,30,0.25)';
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                    el.style.borderColor = 'rgba(0,0,0,0.07)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Gradient bar top */}
                  <div className="h-1 w-full transition-all duration-300" style={{ background: 'linear-gradient(90deg, var(--color-brand), var(--color-accent))', opacity: 0, transform: 'scaleX(0)', transformOrigin: 'left', borderRadius: '20px 20px 0 0' }}
                    ref={el => {
                      if (el) {
                        const btn = el.parentElement as HTMLElement;
                        btn.addEventListener('mouseenter', () => { el.style.opacity = '1'; el.style.transform = 'scaleX(1)'; });
                        btn.addEventListener('mouseleave', () => { el.style.opacity = '0'; el.style.transform = 'scaleX(0)'; });
                      }
                    }}
                  />

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between">
                      {/* Abbr badge */}
                      <div className="relative">
                        <div className="w-14 h-14 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(15,84,30,0.08) 0%, rgba(15,84,30,0.04) 100%)', borderRadius: '14px', border: '1px solid rgba(15,84,30,0.1)' }}>
                          <span className="font-black text-sm" style={{ color: 'var(--color-brand)', letterSpacing: '0.05em' }}>{company.abbr}</span>
                        </div>
                        {/* Leaf accent */}
                        <svg className="absolute -top-1.5 -right-1.5 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 3C8 3 4 7.5 4 12.5c0 3 2 5.5 8 5.5 0.5-2 0.5-4 0-5.5 1.5 1.2 2.8 3 2.8 5.5 1.5-1.2 2.8-3 2.8-5C17.6 6.5 15 3 12 3z" fill="var(--color-brand)" opacity="0.5"/>
                        </svg>
                      </div>

                      {/* Number */}
                      <span className="font-black text-[28px] leading-none select-none" style={{ color: 'rgba(15,84,30,0.06)', fontFamily: 'var(--font-display)' }}>
                        {String(i + 2).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-[9px] font-black tracking-[0.25em] uppercase mb-1.5" style={{ color: 'rgba(15,84,30,0.45)' }}>{company.tagline}</p>
                      <h3 className="font-bold text-sm leading-snug mb-2.5 transition-colors duration-200 group-hover:text-[var(--color-brand)]" style={{ color: 'var(--color-text-primary)' }}>{company.name}</h3>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? company.descVi : company.descEn}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)', opacity: 0.7 }}>{isVi ? 'Xem thêm' : 'Details'}</span>
                      <div className="w-7 h-7 flex items-center justify-center transition-all duration-200 group-hover:scale-110" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: '8px' }}>
                        <svg className="w-3 h-3" style={{ color: 'var(--color-brand)' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
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
