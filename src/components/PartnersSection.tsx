'use client';
import { useLocale } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useRef, useState, useEffect } from 'react';

type Partner = {
  id: string; name: string; logo: string; images: string[];
  sectorVi: string; sectorEn: string;
  descVi: string; descEn: string;
  founded: number; hq: string;
  statLabelVi: string; statLabelEn: string; statValue: string;
  projectsVi: string[]; projectsEn: string[];
  highlightVi: string; highlightEn: string;
  published: boolean;
};

/* ── Modal ── */
function PartnerModal({ partner, onClose, isVi }: { partner: Partner; onClose: () => void; isVi: boolean }) {
  const projects = isVi ? partner.projectsVi : partner.projectsEn;
  const highlight = isVi ? partner.highlightVi : partner.highlightEn;
  const statLabel = isVi ? partner.statLabelVi : partner.statLabelEn;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#07130a] px-7 pt-7 pb-6">
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Đóng">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand)] bg-[var(--color-brand)]/20 px-3 py-1 rounded-full border border-[var(--color-brand)]/30 mb-3">
            {isVi ? partner.sectorVi : partner.sectorEn}
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">{partner.name}</h3>
          <p className="text-white/40 text-xs mt-1">
            {isVi ? `Thành lập ${partner.founded} · ${partner.hq}` : `Est. ${partner.founded} · ${partner.hq}`}
          </p>
        </div>

        <div className="px-7 py-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-4 bg-[var(--color-surface-base)] rounded-2xl p-4">
            <div className="flex-1">
              <p className="text-[10px] text-[var(--color-brand)] font-semibold uppercase tracking-wider">{statLabel}</p>
              <p className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">{partner.statValue}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-brand)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">{isVi ? 'Giới thiệu' : 'About'}</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{isVi ? partner.descVi : partner.descEn}</p>
          </div>
          {projects && projects.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">{isVi ? 'Dự án hợp tác với Lapla' : 'Projects with Lapla'}</p>
              <ul className="space-y-2">
                {projects.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {highlight && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <p className="text-xs text-amber-800 leading-relaxed">{highlight}</p>
            </div>
          )}
        </div>
        <div className="px-7 py-4 border-t border-gray-100 flex items-center gap-2 bg-gray-50/50">
          <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
          <span className="text-xs text-[var(--color-text-muted)]">{isVi ? 'Đối tác chiến lược của Lapla' : 'Strategic partner of Lapla'}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Marquee row ── */
function MarqueeRow({
  items,
  direction = 'left',
  onSelect,
}: {
  items: Partner[];
  direction?: 'left' | 'right';
  onSelect: (p: Partner) => void;
}) {
  // duplicate for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f7faf7] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f7faf7] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((partner, i) => (
          <button
            key={`${partner.name}-${i}`}
            onClick={() => onSelect(partner)}
            className="group shrink-0 flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 bg-white hover:bg-[var(--color-brand)] hover:border-[var(--color-brand)] transition-all duration-300 cursor-pointer shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] group-hover:bg-white shrink-0 transition-colors" />
            <span className="text-[var(--color-text-primary)] group-hover:text-white font-medium text-sm whitespace-nowrap transition-colors">
              {partner.name}
            </span>
            <span className="text-[var(--color-text-muted)] text-[10px] tracking-widest uppercase group-hover:text-white/60 transition-colors whitespace-nowrap">
              {partner.sectorVi}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main ── */
export default function PartnersSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<Partner | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch('/api/partners')
      .then(r => r.ok ? r.json() : [])
      .then((data: Partner[]) => setPartners(data.filter(p => p.published)))
      .catch(() => {});
  }, []);

  const row1 = partners.slice(0, Math.ceil(partners.length / 2));
  const row2 = partners.slice(Math.ceil(partners.length / 2));

  return (
    <>
      <section ref={ref} className="py-20 md:py-32 bg-[var(--color-surface-base)] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(50,132,66,0.06)_0%,transparent_70%)] pointer-events-none" />
        {/* SVG repeating ring-dot botanical pattern */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='70' cy='70' r='28' stroke='%230f541e' stroke-width='0.7' fill='none' opacity='0.07'/%3E%3Ccircle cx='70' cy='70' r='14' stroke='%230f541e' stroke-width='0.5' fill='none' opacity='0.05'/%3E%3Cpath d='M70 42 C65 52 60 60 60 70 C60 80 65 86 70 86 C75 86 80 80 80 70 C80 60 75 52 70 42Z' fill='%230f541e' opacity='0.06'/%3E%3Ccircle cx='70' cy='90' r='2.5' fill='%230f541e' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: '140px 140px',
        }} />
        {/* Floating monstera leaf — top-left */}
        <img
          src="https://res.cloudinary.com/dg9khx2s7/image/upload/v1781085047/shapes/team-shape-01.png"
          alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: '-15px', left: '-10px', width: '180px', opacity: 0.45, animation: 'float-bob-y 4.5s ease-in-out infinite 0.3s', zIndex: 20 }}
        />

        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[var(--color-brand)] mb-3">
                {isVi ? 'Đối tác' : 'Trust'}
              </p>
              <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-text-primary)" }}>
                {isVi ? (
                  <>Đối tác <span className="text-[var(--color-brand)]">chiến lược</span><br />của Lapla</>
                ) : (
                  <>Our <span className="text-[var(--color-brand)]">strategic</span><br />partners</>
                )}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-start md:items-end gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-[var(--color-text-primary)]">{partners.length}+</span>
                <span className="text-[var(--color-text-muted)] text-sm leading-tight max-w-[80px]">
                  {isVi ? 'Đối tác tin tưởng' : 'Trusted partners'}
                </span>
              </div>
              <p className="text-[var(--color-text-muted)] text-xs">
                {isVi ? '* Nhấn vào tên để xem chi tiết' : '* Click a name to view details'}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <MarqueeRow items={row1} direction="left" onSelect={setSelected} />
          <MarqueeRow items={row2} direction="right" onSelect={setSelected} />
        </motion.div>
      </section>

      <AnimatePresence>
        {selected && (
          <PartnerModal partner={selected} onClose={() => setSelected(null)} isVi={isVi} />
        )}
      </AnimatePresence>
    </>
  );
}
