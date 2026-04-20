'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function VideoSection() {
  const t = useTranslations('video');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (inView) setPlaying(true);
  }, [inView]);

  return (
    <section ref={ref} className="relative bg-white py-20 md:py-32 overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <p className="text-green-600 text-[10px] font-semibold tracking-[0.3em] uppercase">
                Showreel
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {t('title')}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base max-w-xs leading-relaxed md:text-right"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          {/* Green frame accent */}
          <div className="absolute -inset-3 md:-inset-5 rounded-[28px] border border-green-100 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 w-24 h-24 rounded-br-[28px] bg-green-600/8 pointer-events-none" />

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            {!playing ? (
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setPlaying(true)}>
                <img
                  src="https://img.youtube.com/vi/B9VRvOKKwfs/maxresdefault.jpg"
                  alt="FAM Landscape Showreel"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Play button with pulsing rings */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    {/* Pulsing rings */}
                    <motion.div
                      animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full bg-green-500/30"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.35], opacity: [0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                      className="absolute inset-0 rounded-full bg-white/20"
                    />
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl cursor-pointer"
                    >
                      <svg className="w-8 h-8 md:w-9 md:h-9 text-green-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                  <span className="text-white text-xs tracking-widest uppercase font-medium opacity-80">
                    {locale === 'vi' ? 'Xem video' : 'Watch now'}
                  </span>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-white/50 text-[10px] tracking-widest uppercase mb-1">FAM Landscape</p>
                    <p className="text-white font-semibold text-base md:text-lg leading-snug">
                      {locale === 'vi' ? 'Hành Trình Kiến Tạo Cảnh Quan' : 'The Art of Landscape Making'}
                    </p>
                  </div>
                  <span className="shrink-0 ml-4 px-3 py-1.5 rounded-full bg-green-600 text-white text-[10px] font-semibold tracking-widest uppercase">
                    {locale === 'vi' ? 'Showreel' : 'Showreel'}
                  </span>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/B9VRvOKKwfs?autoplay=1&mute=1&rel=0"
                title="FAM Landscape Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 md:mt-14 grid grid-cols-3 md:flex md:gap-16"
        >
          {[
            { value: '17+', label: locale === 'vi' ? 'Năm kinh nghiệm' : 'Years of expertise' },
            { value: '200+', label: locale === 'vi' ? 'Dự án hoàn thành' : 'Projects delivered' },
            { value: '5★', label: locale === 'vi' ? 'Đánh giá khách hàng' : 'Client rating' },
          ].map((s) => (
            <div key={s.value} className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3">
              <span className="text-xl md:text-3xl font-bold text-green-600">{s.value}</span>
              <span className="text-[10px] md:text-xs text-gray-400 tracking-wide leading-tight text-center md:text-left max-w-[80px]">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
