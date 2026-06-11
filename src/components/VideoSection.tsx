'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function VideoSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [playing, setPlaying] = useState(false);

  return (
    <section className="leafix-section relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              Showreel
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi
                ? <span>Hành trình<br />kiến tạo <span style={{ color: 'var(--color-brand)' }}>cảnh quan</span></span>
                : <span>The Art of<br /><span style={{ color: 'var(--color-brand)' }}>Landscape</span> Making</span>
              }
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {isVi
                ? 'Xem video giới thiệu về hành trình và các dự án tiêu biểu của Lapla.'
                : 'Watch our showreel to experience the journey and featured projects of Lapla.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Video */}
        <ScrollReveal duration={800}>
          <div className="relative">
            {/* Decorative border */}
            <div
              className="absolute -inset-3 pointer-events-none"
              style={{ border: '1px solid rgba(130,180,64,0.2)' }}
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {!playing ? (
                <div
                  className="relative w-full h-full group cursor-pointer"
                  onClick={() => setPlaying(true)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://img.youtube.com/vi/B9VRvOKKwfs/maxresdefault.jpg"
                    alt="Lapla Showreel"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.1) 100%)' }} />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Pulse rings */}
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: 'rgba(130,180,64,0.3)', animationDuration: '2s' }}
                      />
                      <div
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                        style={{ boxShadow: '0 0 0 8px rgba(255,255,255,0.15)' }}
                      >
                        <svg className="w-8 h-8 translate-x-0.5" style={{ color: 'var(--color-brand)' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Lapla Landscape</p>
                      <p className="text-white font-bold text-lg leading-snug">
                        {isVi ? 'Hành Trình Kiến Tạo Cảnh Quan' : 'The Art of Landscape Making'}
                      </p>
                    </div>
                    <span
                      className="shrink-0 ml-4 px-3 py-1.5 text-white text-[10px] font-bold tracking-widest uppercase"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      Showreel
                    </span>
                  </div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/B9VRvOKKwfs?autoplay=1&mute=1&rel=0"
                  title="Lapla Landscape Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Stats strip */}
        <ScrollReveal delay={2} className="mt-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '17+', vi: 'Năm kinh nghiệm', en: 'Years of expertise' },
              { value: '200+', vi: 'Dự án hoàn thành', en: 'Projects delivered' },
              { value: '5★', vi: 'Đánh giá khách hàng', en: 'Client rating' },
            ].map((s) => (
              <div key={s.value} className="flex items-center gap-4">
                <span className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--color-brand)' }}>{s.value}</span>
                <span className="text-[11px] uppercase tracking-wider leading-tight max-w-[80px]" style={{ color: 'var(--color-text-secondary)' }}>
                  {isVi ? s.vi : s.en}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
