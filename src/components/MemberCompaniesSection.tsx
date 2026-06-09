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
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? member.description : member.descriptionEn}</p>
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
      <section className="leafix-section overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

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
            {/* Featured card — 2 cols */}
            <ScrollReveal className="sm:col-span-2 lg:col-span-2">
              <button
                onClick={() => setSelected(featured)}
                className="group w-full relative overflow-hidden text-left cursor-pointer flex flex-col justify-between p-8 min-h-[240px]"
                style={{ backgroundColor: 'var(--color-brand)', borderRadius: '20px', border: 'none' }}
              >
                <span className="absolute -right-4 -bottom-4 font-black leading-none select-none pointer-events-none" style={{ fontSize: '120px', color: 'rgba(255,255,255,0.06)' }}>{featured.abbr}</span>
                <div>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4" style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {featured.tagline}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white leading-snug">{featured.name}</h3>
                </div>
                <div className="flex items-end justify-between mt-6">
                  <p className="text-sm leading-relaxed max-w-[200px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{isVi ? featured.description : featured.descriptionEn}</p>
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 ml-4 transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '50%' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                  </div>
                </div>
              </button>
            </ScrollReveal>

            {/* Regular cards */}
            {rest.map((company, i) => (
              <ScrollReveal key={company.abbr} delay={(i % 2) + 1}>
                <button
                  onClick={() => setSelected(company)}
                  className="group w-full relative overflow-hidden text-left cursor-pointer flex flex-col justify-between p-6 h-full"
                  style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow var(--duration-fast), border-color var(--duration-fast)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,84,30,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)'; }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ background: 'linear-gradient(90deg, var(--color-brand), var(--color-accent))' }} />
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)' }}>
                      <span className="font-black text-sm transition-colors duration-300" style={{ color: 'var(--color-brand)' }}>{company.abbr}</span>
                    </div>
                    <div className="w-7 h-7 flex items-center justify-center" style={{ borderRadius: '50%', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <svg className="w-3 h-3" style={{ color: 'var(--color-text-secondary)' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(15,84,30,0.5)' }}>{company.tagline}</p>
                    <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-[var(--color-brand)] transition-colors" style={{ color: 'var(--color-text-primary)' }}>{company.name}</h3>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{isVi ? company.description : company.descriptionEn}</p>
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
