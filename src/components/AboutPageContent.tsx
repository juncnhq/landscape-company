"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { AboutContent, parseStatValue } from "@/lib/aboutContent";

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return count;
}

const IMG1 =
  "https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png";
const IMG2 =
  "https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg";
const IMG3 =
  "https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png";
const IMG4 =
  "https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg";
const IMG5 =
  "https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png";






const PROCESS_ICONS = [
  <svg
    key="p1"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
  <svg
    key="p2"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2C6.5 2 3 7 3 12c0 4.5 3.5 8 9 8 1.5-3 1.5-6 0-9 2.5 1.5 5 4 5 8 2-1.5 4-4 4-7 0-5.5-4-10-9-10z"
    />
  </svg>,
  <svg
    key="p3"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2C8.5 2 5 5 5 8.5c0 5.5 7 13.5 7 13.5s7-8 7-13.5C19 5 15.5 2 12 2zm0 6a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"
    />
  </svg>,
  <svg
    key="p4"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>,
];

/* ─────────────────────────────────── */
/** Đếm số cho một ô chỉ số. Tách riêng vì số lượng chỉ số do admin quyết định,
 *  không gọi hook trong vòng lặp được. */
function Counter({ target, inView }: { target: number; inView: boolean }) {
  return <>{useCounter(target, inView)}</>;
}

/** Ghép hai mảng song song theo chỉ số, cắt về độ dài ngắn hơn để một bên
 *  thiếu dòng không sinh ra mục rỗng trên trang. */
function zip<A, B, R>(a: A[], b: B[], fn: (x: A, y: B, i: number) => R): R[] {
  return a.slice(0, Math.min(a.length, b.length)).map((x, i) => fn(x, b[i], i));
}

export default function AboutPageContent({ content }: { content: AboutContent }) {
  const locale = useLocale();
  const isVi = locale === "vi";
  const [openFaq, setOpenFaq] = useState(1);

  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  // Ảnh collage do admin chọn; thiếu thì quay về bộ ảnh mặc định.
  const imgs = content.images.length ? content.images : [IMG1, IMG2, IMG3, IMG4, IMG5];
  const img = (i: number) => imgs[i % imgs.length];
  const thumbsFor = (i: number) => [img(i), img(i + 1), img(i + 2)];

  const features = isVi ? content.featuresVi : content.featuresEn;
  const faqItems = zip(
    isVi ? content.faqQuestionsVi : content.faqQuestionsEn,
    isVi ? content.faqAnswersVi : content.faqAnswersEn,
    (q, a) => ({ q, a }),
  );
  const processSteps = isVi ? content.processVi : content.processEn;
  const stats = zip(
    content.statValues,
    isVi ? content.statLabelsVi : content.statLabelsEn,
    (value, label) => ({ ...parseStatValue(value), label }),
  );

  return (
    <>
      {/* ═══════════════════════════════════
          SECTION 1 — Collage + intro
      ════════════════════════════════════ */}
      <section
        className="leafix-section overflow-hidden"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="max-w-[1440px] lg:max-w-[80%] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT: collage */}
            <ScrollReveal direction="left">
              <div className="relative select-none" style={{ height: "500px" }}>
                {/* Small landscape image — top left */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    top: 0,
                    left: 0,
                    width: "54%",
                    height: "210px",
                    borderRadius: 20,
                    zIndex: 1,
                  }}
                >
                  <Image
                    src={img(0)}
                    alt="Lapla project"
                    fill
                    className="object-cover"
                    sizes="30vw"
                  />
                </div>

                {/* Years badge — top right of collage */}
                <div
                  className="absolute flex items-center gap-3"
                  style={{
                    top: 12,
                    right: 0,
                    zIndex: 3,
                  }}
                >
                  <p
                    className="font-display font-black leading-none"
                    style={{ fontSize: "3.2rem", color: "var(--color-brand)" }}
                  >
                    {content.badgeValue}
                  </p>
                  <div>
                    <p
                      className="text-xs font-semibold leading-tight max-w-[70px]"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {isVi ? content.badgeLabelVi : content.badgeLabelEn}
                    </p>
                  </div>
                </div>

                {/* Large portrait — bottom right */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: "60%",
                    height: "320px",
                    borderRadius: 20,
                    zIndex: 2,
                  }}
                >
                  <Image
                    src={img(1)}
                    alt="Lapla landscape"
                    fill
                    className="object-cover"
                    sizes="35vw"
                  />
                </div>

                {/* Monstera leaf — bottom left */}
                <div
                  className="absolute"
                  style={{
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    opacity: 0.9,
                  }}
                >
                  <svg
                    width="140"
                    height="140"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 180 C100 180 20 140 10 80 C5 50 25 20 55 20 C70 20 85 30 95 45 C90 30 95 10 110 5 C130 -3 155 10 160 35 C170 70 145 110 120 140 L100 180Z"
                      fill="var(--color-brand)"
                      opacity="0.12"
                    />
                    <path
                      d="M100 180 C100 180 20 140 10 80 C5 50 25 20 55 20 C70 20 85 30 95 45 C90 30 95 10 110 5 C130 -3 155 10 160 35 C170 70 145 110 120 140 L100 180Z"
                      stroke="var(--color-brand)"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.4"
                    />
                    <line
                      x1="100"
                      y1="45"
                      x2="100"
                      y2="180"
                      stroke="var(--color-brand)"
                      strokeWidth="1.5"
                      opacity="0.3"
                    />
                    <line
                      x1="55"
                      y1="60"
                      x2="100"
                      y2="90"
                      stroke="var(--color-brand)"
                      strokeWidth="1"
                      opacity="0.25"
                    />
                    <line
                      x1="40"
                      y1="90"
                      x2="100"
                      y2="110"
                      stroke="var(--color-brand)"
                      strokeWidth="1"
                      opacity="0.25"
                    />
                    <line
                      x1="145"
                      y1="65"
                      x2="100"
                      y2="95"
                      stroke="var(--color-brand)"
                      strokeWidth="1"
                      opacity="0.25"
                    />
                    <line
                      x1="150"
                      y1="95"
                      x2="100"
                      y2="120"
                      stroke="var(--color-brand)"
                      strokeWidth="1"
                      opacity="0.25"
                    />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT: text */}
            <ScrollReveal direction="right" delay={2}>
              <p
                className="text-sm font-bold uppercase tracking-[0.3em] mb-3"
                style={{ color: "var(--color-brand)" }}
              >
                {isVi ? content.introEyebrowVi : content.introEyebrowEn}
              </p>
              <h2
                className="font-display font-bold leading-tight mb-5"
                style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                  color: 'var(--color-text-primary)',
                }}
              >
                {isVi ? content.introTitleVi : content.introTitleEn}
              </h2>
              <p
                className="mb-7 leading-relaxed text-sm"
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: "26px",
                  maxWidth: "480px",
                }}
              >
                {isVi ? content.introDescVi : content.introDescEn}
              </p>

              {/* Feature 2-col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Image
                      src={img(2)}
                      alt=""
                      width={18}
                      height={18}
                      className="shrink-0 object-cover"
                      style={{ borderRadius: 3 }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* CEO + Call side by side */}
              <div
                className="flex items-center gap-0"
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  paddingTop: 24,
                }}
              >
                {/* CEO */}
                <div className="flex items-center gap-3 flex-1 pr-6">
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{ width: 48, height: 48, borderRadius: "50%" }}
                  >
                    <Image
                      src={img(4)}
                      alt="CEO"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {content.ownerName}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {isVi ? content.ownerRoleVi : content.ownerRoleEn}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: 1,
                    height: 56,
                    backgroundColor: "rgba(0,0,0,0.1)",
                  }}
                />

                {/* Call */}
                <div className="flex items-center gap-3 flex-1 pl-6">
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "3px solid var(--color-brand)",
                    }}
                  >
                    <Image
                      src={img(2)}
                      alt="Call"
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(22,129,61,0.5)" }}
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {isVi ? content.phoneLabelVi : content.phoneLabelEn}
                    </p>
                    <a
                      href={`tel:${content.phone.replace(/[^\d+]/g, "")}`}
                      className="text-sm font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {content.phone}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 2 — Stats row
      ════════════════════════════════════ */}
      <section
        ref={statsRef as React.RefObject<HTMLDivElement>}
        className="py-16 md:py-20"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="max-w-[1440px] lg:max-w-[80%] mx-auto px-6 sm:px-10 lg:px-14">
          <p
            className="text-center font-semibold mb-12"
            style={{ fontSize: "1.1rem", color: "var(--color-text-primary)" }}
          >
            {isVi ? content.statsTitleVi : content.statsTitleEn}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={`${stat.label}-${i}`}
                className="flex flex-col px-8 py-4"
                style={{
                  borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.1)" : "none",
                }}
              >
                <p
                  className="font-display font-black tabular-nums mb-1 leading-none"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <Counter target={stat.n} inView={statsInView} />
                  <span style={{ color: "var(--color-text-primary)" }}>
                    {stat.suffix}
                  </span>
                </p>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {stat.label}
                </p>
                {/* Thumbnail row */}
                <div className="flex gap-1.5">
                  {thumbsFor(i).map((src, j) => (
                    <div
                      key={j}
                      className="overflow-hidden"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: i % 2 === 1 ? "50%" : 6,
                        flexShrink: 0,
                        border: "2px solid white",
                        marginLeft: j > 0 ? -8 : 0,
                      }}
                    >
                      <Image
                        src={src}
                        alt=""
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 3 — FAQ + image
      ════════════════════════════════════ */}
      <section
        className="leafix-section overflow-hidden"
        style={{ backgroundColor: "#f5f2ec" }}
      >
        <div className="max-w-[1440px] lg:max-w-[80%] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* LEFT */}
            <ScrollReveal direction="left">
              <p
                className="text-sm font-bold uppercase tracking-[0.3em] mb-3"
                style={{ color: "var(--color-brand)" }}
              >
                {isVi ? content.faqEyebrowVi : content.faqEyebrowEn}
              </p>
              <h2
                className="font-display font-bold mb-3 leading-tight"
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
                  color: 'var(--color-text-primary)',
                }}
              >
                {isVi ? content.faqTitleVi : content.faqTitleEn}
              </h2>
              <p
                className="text-sm mb-8 leading-relaxed"
                style={{
                  color: "var(--color-text-secondary)",
                  maxWidth: "480px",
                }}
              >
                {isVi ? content.faqDescVi : content.faqDescEn}
              </p>

              {/* Simple accordion */}
              <div>
                {faqItems.map((item, i) => (
                  <div
                    key={i}
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <button
                      className="w-full flex items-center justify-between text-left py-5 gap-4"
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{
                          color: openFaq === i ? "var(--color-brand)" : "#111",
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        className="shrink-0 w-6 h-6 flex items-center justify-center"
                        style={{
                          color:
                            openFaq === i
                              ? "var(--color-brand)"
                              : "var(--color-text-secondary)",
                          fontSize: "1.2rem",
                          fontWeight: 300,
                          lineHeight: 1,
                        }}
                      >
                        {openFaq === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="pb-5">
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* RIGHT: image */}
            <ScrollReveal direction="right" delay={2}>
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: 20, height: "500px" }}
              >
                <Image
                  src={img(3)}
                  alt="Landscaper at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 4 — Company Solution
      ════════════════════════════════════ */}
      <section
        className="leafix-section overflow-hidden"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="max-w-[1440px] lg:max-w-[80%] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Centered header */}
          <ScrollReveal className="text-center mb-10">
            <p
              className="text-sm font-bold uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--color-brand)" }}
            >
              {isVi ? content.processEyebrowVi : content.processEyebrowEn}
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: 'var(--color-text-primary)' }}
            >
              {isVi ? content.processTitleVi : content.processTitleEn}
            </h2>
          </ScrollReveal>

          {/* Full-width image + flower badge */}
          <ScrollReveal>
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 24, height: "480px" }}
            >
              <Image
                src={img(2)}
                alt="Company solution"
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
              />
            </div>
          </ScrollReveal>

          {/* 4 process steps below */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {processSteps.map((step, i) => (
              <ScrollReveal key={`${step}-${i}`} delay={i % 4}>
                <div
                  className="flex items-center gap-4 py-4 px-5"
                  style={{
                    backgroundColor: "var(--color-surface-alt)",
                    borderRadius: 14,
                    border: "1px solid rgba(22,129,61,0.08)",
                  }}
                >
                  <div
                    className="shrink-0 w-11 h-11 flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(22,129,61,0.1)",
                      borderRadius: 10,
                      color: "var(--color-brand)",
                    }}
                  >
                    {PROCESS_ICONS[i]}
                  </div>
                  <p
                    className="text-sm font-bold leading-snug"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {step}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 5 — Mission (dark green full bg)
      ════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-brand)", minHeight: "520px" }}
      >
        <div className="max-w-[1440px] lg:max-w-[80%] mx-auto">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 items-center"
            style={{ minHeight: "520px" }}
          >
            {/* LEFT: person image with circle decoration */}
            <div
              className="relative flex items-end justify-center lg:justify-start"
              style={{ minHeight: "520px" }}
            >
              {/* Large circle bg */}
              <div
                className="absolute"
                style={{
                  width: 420,
                  height: 420,
                  borderRadius: "50%",
                  backgroundColor: "rgba(199,220,73,0.1)",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
              <div
                className="relative"
                style={{ height: "480px", width: "380px", zIndex: 1 }}
              >
                <Image
                  src={img(4)}
                  alt={content.ownerName || "Lapla"}
                  fill
                  className="object-cover object-center"
                  sizes="40vw"
                  style={{ borderRadius: "20px 20px 0 0" }}
                />
              </div>
            </div>

            {/* RIGHT: text */}
            <div className="px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
              <ScrollReveal>
                <p
                  className="text-sm font-bold uppercase tracking-[0.3em] mb-5"
                  style={{ color: "var(--color-accent)" }}
                >
                  {isVi ? content.missionEyebrowVi : content.missionEyebrowEn}
                </p>
                <h2
                  className="font-display font-bold mb-6 leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    color: "#ffffff",
                  }}
                >
                  {isVi ? content.missionTitleVi : content.missionTitleEn}
                </h2>
                <p
                  className="mb-4 leading-relaxed text-sm"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: "26px",
                    maxWidth: "460px",
                  }}
                >
                  {isVi ? content.missionDesc1Vi : content.missionDesc1En}
                </p>
                <p
                  className="mb-8 leading-relaxed text-sm"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: "26px",
                    maxWidth: "460px",
                  }}
                >
                  {isVi ? content.missionDesc2Vi : content.missionDesc2En}
                </p>
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-widest transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-text-primary)",
                    padding: "14px 28px",
                    borderRadius: 8,
                  }}
                >
                  {isVi ? "Xem tất cả dịch vụ" : "View All Services"}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner (image12 style) ───────────────────── */}
      <div className="py-28 md:py-36 px-6 text-center relative overflow-hidden">
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(22,129,61,0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <ScrollReveal className="relative z-10">
          <p
            className="text-sm font-bold uppercase tracking-[0.3em] mb-5"
            style={{ color: "var(--color-brand)" }}
          >
            {isVi ? content.ctaEyebrowVi : content.ctaEyebrowEn}
          </p>
          <h2
            className="font-display font-bold mb-5 mx-auto"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              maxWidth: "780px",
            }}
          >
            {isVi ? content.ctaTitleVi : content.ctaTitleEn}
          </h2>
          <p
            className="text-base mb-10 mx-auto"
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: "520px",
              lineHeight: "26px",
            }}
          >
            {isVi ? content.ctaDescVi : content.ctaDescEn}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "var(--color-brand)",
              color: "#ffffff",
              padding: "16px 36px",
              borderRadius: "999px",
            }}
          >
            {isVi ? "Liên hệ ngay" : "Contact Us Now"}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </>
  );
}
