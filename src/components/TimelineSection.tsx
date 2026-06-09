"use client";
import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timelineItems } from "@/lib/data";

export default function TimelineSection() {
  const locale = useLocale();
  const isVi = locale === "vi";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#328442] mb-4">
              {isVi ? "Lịch sử" : "History"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
              {isVi ? (
                <>Hành trình<br /><span className="text-[#328442]">17 năm</span> phát triển</>
              ) : (
                <>Our <span className="text-[#328442]">17 year</span><br />journey</>
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
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-100 via-[#328442]/30 to-gray-100 -translate-x-px" />

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
                    <div className="w-3 h-3 rounded-full bg-[#328442] ring-4 ring-[#328442]/15" />
                  </div>

                  {/* Desktop center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.06 * i + 0.25 }}
                      className="w-4 h-4 rounded-full bg-[#328442] ring-[6px] ring-[#328442]/10"
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
                      <span className="text-[10px] tracking-[0.3em] text-[#328442] uppercase font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="w-6 h-px bg-[#328442]/30" />
                    </div>

                    {/* Ghost year */}
                    <div className="text-5xl md:text-7xl font-black select-none leading-none mb-2 transition-colors"
                      style={{ color: 'rgba(15,84,30,0.35)' }}
                    >
                      {item.year}
                    </div>

                    {/* Year badge */}
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#328442]/10 text-[#328442] text-xs font-bold tracking-wider border border-[#328442]/15">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg md:text-xl leading-snug mb-2 group-hover:text-[#328442] transition-colors">
                      {isVi ? item.title : item.titleEn}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {isVi ? item.description : item.descriptionEn}
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
