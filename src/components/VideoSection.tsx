'use client';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function VideoSection() {
  const t = useTranslations('video');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [playing, setPlaying] = useState(false);

  return (
    <section ref={ref} className="py-12 md:py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-green-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">Showreel</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
        >
          {!playing ? (
            <div className="relative w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setPlaying(true)}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 group"
                >
                  <svg className="w-8 h-8 text-white translate-x-0.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Landscape Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
