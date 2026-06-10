"use client";
import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type TimelineItem = {
  id: string; year: string;
  titleVi: string; titleEn: string;
  descVi: string; descEn: string;
  order: number;
};

export default function TimelineSection() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch('/api/timeline')
      .then(r => r.ok ? r.json() : [])
      .then((data: TimelineItem[]) => setTimelineItems(data))
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(50,132,66,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[var(--color-brand)] mb-4">
              {isVi ? "Lịch sử" : "History"}
            </p>
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-text-primary)" }}>
              {isVi ? (
                <>Hành trình<br /><span className="text-[var(--color-brand)]">17 năm</span> phát triển</>
              ) : (
                <>Our <span className="text-[var(--color-brand)]">17 year</span><br />journey</>
              )}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right"
          >
            {isVi
              ? "Từ những bước khởi đầu nhỏ bé đến những công trình cảnh quan lớn trên toàn quốc."
              : "From humble beginnings to landmark landscape projects across the nation."}
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-100 via-[var(--color-brand)]/30 to-gray-100 -translate-x-px" />

          <div className="flex flex-col gap-12 md:gap-16">
            {timelineItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 36 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0.06 * i }}
                  className="relative flex items-start md:items-center"
                >
                  {/* Mobile marker */}
                  <div className="md:hidden shrink-0 mt-2 mr-5">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-brand)] ring-4 ring-[var(--color-brand)]/15" />
                  </div>

                  {/* Desktop center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.06 * i + 0.25 }}
                      className="w-4 h-4 rounded-full bg-[var(--color-brand)] ring-[6px] ring-[var(--color-brand)]/10"
                    />
                  </div>

                  {!isLeft && <div className="hidden md:block flex-1" />}

                  {/* Content */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`group flex-1 md:max-w-[44%] ${
                      isLeft ? "md:pr-14 md:text-right md:mr-auto" : "md:pl-14 md:text-left md:ml-auto"
                    }`}
                  >
                    <div className={`inline-flex items-center gap-2 mb-3 ${isLeft ? "md:flex-row-reverse md:ml-auto" : ""}`}>
                      <span className="text-[10px] tracking-[0.3em] text-[var(--color-brand)] uppercase font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="w-6 h-px bg-[var(--color-brand)]/30" />
                    </div>

                    {/* Ghost year */}
                    <div className="text-5xl md:text-7xl font-black select-none leading-none mb-2 transition-colors"
                      style={{ color: 'rgba(15,84,30,0.35)' }}
                    >
                      {item.year}
                    </div>

                    {/* Year badge */}
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-bold tracking-wider border border-[var(--color-brand)]/15">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-bold text-[var(--color-text-primary)] text-lg md:text-xl leading-snug mb-2 group-hover:text-[var(--color-brand)] transition-colors">
                      {isVi ? item.titleVi : item.titleEn}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {isVi ? item.descVi : item.descEn}
                    </p>
                  </motion.div>

                  {isLeft && <div className="hidden md:block flex-1" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
