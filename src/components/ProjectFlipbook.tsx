'use client'

import {
  useRef,
  useState,
  forwardRef,
  useEffect,
  useCallback,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import HTMLFlipBook from 'react-pageflip'
import { projects } from '@/lib/data'

type Project = (typeof projects)[number]

// ─── Pages (forwardRef required — react-pageflip injects ref + number prop) ──

type BasePageProps = { number?: number }

// Cover -----------------------------------------------------------------------
const CoverPage = forwardRef<HTMLDivElement, BasePageProps>((_, ref) => {
  const years = projects.map((p) => parseInt(p.year, 10))
  const range = `${Math.min(...years)} — ${Math.max(...years)}`

  return (
    <div
      ref={ref}
      data-density="hard"
      className="relative w-full h-full overflow-hidden"
    >
      <Image
        src={projects[0].images[0]}
        alt="Lapla Landscape – Dự Án Tiêu Biểu"
        fill
        sizes="420px"
        className="object-cover"
        priority
      />
      {/* dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/20 to-stone-950/85" />
      {/* content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-10">
        <div className="w-8 h-px bg-[#BE7B2B]" />
        <p
          className="text-[#BE7B2B] text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Lapla Landscape
        </p>
        <h2
          className="text-white text-[1.75rem] leading-tight font-light"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          Dự Án
          <br />
          Tiêu Biểu
        </h2>
        <div className="w-8 h-px bg-[#BE7B2B]" />
        <p className="text-stone-500 text-[10px] tracking-[0.3em]">{range}</p>
      </div>
    </div>
  )
})
CoverPage.displayName = 'CoverPage'

// Project page ----------------------------------------------------------------
type ImagePageProps = BasePageProps & { project: Project; pageIndex: number }

const ImagePage = forwardRef<HTMLDivElement, ImagePageProps>(
  ({ project, pageIndex }, ref) => {
    const secondImg = project.images[1] ?? project.images[0]

    return (
      <div
        ref={ref}
        className="w-full h-full overflow-hidden bg-stone-950 flex flex-col"
      >
        {/* ── Top: hero image (60% height) ── */}
        <div className="relative shrink-0" style={{ height: '60%' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="420px"
            className="object-cover"
          />
          {/* subtle bottom fade into dark */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent" />

          {/* page index badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <span className="text-[#BE7B2B] font-mono text-[10px] tabular-nums">
              {String(pageIndex).padStart(2, '0')}
            </span>
            <span className="text-stone-600 text-[10px]">·</span>
            <span className="text-stone-300/70 text-[10px] tracking-[0.3em] uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* ── Bottom: second image + text info (40% height) ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* second image */}
          <div className="relative w-[45%] shrink-0 overflow-hidden border-r border-stone-800/50">
            <Image
              src={secondImg}
              alt=""
              fill
              sizes="190px"
              className="object-cover opacity-80"
            />
          </div>

          {/* text info */}
          <div className="flex flex-col justify-between px-4 py-4 flex-1 overflow-hidden">
            {/* top: category tag */}
            <span className="inline-block text-[var(--color-brand)] text-[9px] tracking-[0.3em] uppercase border border-[var(--color-brand)]/30 px-2 py-0.5 self-start">
              {project.category}
            </span>

            {/* middle: title + description */}
            <div>
              <h3
                className="text-white text-[0.9rem] font-light leading-snug mb-2 line-clamp-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                {project.title}
              </h3>
              <p className="text-stone-500 text-[10px] leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* bottom: location + year + client */}
            <div className="space-y-1 border-t border-stone-800/60 pt-3">
              <div className="flex items-center gap-1.5 text-stone-400 text-[10px]">
                <span className="text-stone-600">↗</span>
                {project.location}
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-stone-600">{project.year}</span>
                <span className="text-stone-700 truncate max-w-[100px] text-right">
                  {project.client}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  },
)
ImagePage.displayName = 'ImagePage'

// Back cover ------------------------------------------------------------------
const BackCoverPage = forwardRef<HTMLDivElement, BasePageProps>((_, ref) => (
  <div
    ref={ref}
    data-density="hard"
    className="relative w-full h-full bg-stone-950 flex flex-col items-center justify-center gap-5"
  >
    <div className="w-8 h-px bg-[#BE7B2B]" />
    <span
      className="text-white text-2xl font-light tracking-[0.3em]"
      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
    >
      LAPLA
    </span>
    <span className="text-stone-500 text-[11px] tracking-[0.3em]">
      lapla.vn
    </span>
    <div className="w-8 h-px bg-[#BE7B2B]" />
  </div>
))
BackCoverPage.displayName = 'BackCoverPage'

// ─── Main component ──────────────────────────────────────────────────────────

const PAGE_W = 420
const PAGE_H = 560
// 1 cover + N projects + 1 back cover; use spread count (÷2) for dots
const TOTAL_PAGES = projects.length + 2
const TOTAL_SPREADS = Math.ceil(TOTAL_PAGES / 2) // ≈ 13 dots

// Synthesize a realistic book page-flip sound via Web Audio API
function playFlipSound() {
  try {
    const ctx = new AudioContext()
    const t = ctx.currentTime
    const sr = ctx.sampleRate

    const noise = (dur: number) => {
      const buf = ctx.createBuffer(1, Math.ceil(sr * dur), sr)
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
      const src = ctx.createBufferSource()
      src.buffer = buf
      return src
    }

    // ── 1. SWISH — paper cutting through air (0–90ms) ──
    // Bandpass frequency sweeps up then drops → mimics acceleration of page
    const swish = noise(0.09)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.Q.value = 1.2
    bp.frequency.setValueAtTime(1200, t)
    bp.frequency.exponentialRampToValueAtTime(5500, t + 0.04)
    bp.frequency.exponentialRampToValueAtTime(2200, t + 0.09)

    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 800

    const gSwish = ctx.createGain()
    gSwish.gain.setValueAtTime(0, t)
    gSwish.gain.linearRampToValueAtTime(0.45, t + 0.018)
    gSwish.gain.exponentialRampToValueAtTime(0.001, t + 0.09)

    swish.connect(bp); bp.connect(hp); hp.connect(gSwish)
    gSwish.connect(ctx.destination)
    swish.start(t); swish.stop(t + 0.09)

    // ── 2. THUMP — page landing (starts at 75ms, lasts 45ms) ──
    const thump = noise(0.045)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 500

    const gThump = ctx.createGain()
    const t2 = t + 0.075
    gThump.gain.setValueAtTime(0, t2)
    gThump.gain.linearRampToValueAtTime(0.28, t2 + 0.007)
    gThump.gain.exponentialRampToValueAtTime(0.001, t2 + 0.045)

    thump.connect(lp); lp.connect(gThump)
    gThump.connect(ctx.destination)
    thump.start(t2); thump.stop(t2 + 0.045)

    setTimeout(() => ctx.close(), 300)
  } catch {
    // AudioContext unavailable — fail silently
  }
}

const ZOOM_MIN = 0.6
const ZOOM_MAX = 1.4
const ZOOM_STEP = 0.1

export default function ProjectFlipbook() {
  const locale = useLocale()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  // Track fullscreen changes (e.g. user presses Esc)
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // Arrow key navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { playFlipSound(); bookRef.current?.pageFlip()?.flipNext() }
      if (e.key === 'ArrowLeft')  { playFlipSound(); bookRef.current?.pageFlip()?.flipPrev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleFlip = useCallback((e: { data: number }) => {
    playFlipSound()
    setCurrentPage(e.data)
  }, [])

  const goPrev = () => { playFlipSound(); bookRef.current?.pageFlip()?.flipPrev() }
  const goNext = () => { playFlipSound(); bookRef.current?.pageFlip()?.flipNext() }

  const zoomIn  = () => setZoom(z => Math.min(+(z + ZOOM_STEP).toFixed(1), ZOOM_MAX))
  const zoomOut = () => setZoom(z => Math.max(+(z - ZOOM_STEP).toFixed(1), ZOOM_MIN))

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      sectionRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  // active dot = which spread we're in
  const activeSpread = Math.floor(currentPage / 2)

  return (
    <section
      ref={sectionRef}
      id="portfolio-flipbook"
      className="relative h-screen bg-stone-950 flex flex-col overflow-hidden"
    >
      {/* Floating back button — top left */}
      <Link
        href={`/${locale}/projects`}
        className="absolute top-6 left-6 z-20 group inline-flex items-center gap-2 text-stone-500 hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Xem tất cả
      </Link>

      {/* Toolbar — top right */}
      <div className="absolute top-5 right-5 z-20 hidden md:flex items-center gap-1">
        {/* Zoom out */}
        <button
          onClick={zoomOut}
          disabled={zoom <= ZOOM_MIN}
          aria-label="Thu nhỏ"
          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-white disabled:opacity-25 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35M8 11h6"/>
          </svg>
        </button>

        {/* Zoom level */}
        <button
          onClick={() => setZoom(1)}
          className="min-w-[2.75rem] h-8 text-[11px] tabular-nums text-stone-500 hover:text-white transition-colors"
          aria-label="Đặt lại zoom"
        >
          {Math.round(zoom * 100)}%
        </button>

        {/* Zoom in */}
        <button
          onClick={zoomIn}
          disabled={zoom >= ZOOM_MAX}
          aria-label="Phóng to"
          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-white disabled:opacity-25 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
        </button>

        <div className="w-px h-5 bg-stone-800 mx-1" />

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-white transition-colors"
        >
          {isFullscreen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9 4 4m0 0h5m-5 0v5M15 9l5-5m0 0h-5m5 0v5M9 15l-5 5m0 0h5m-5 0v-5M15 15l5 5m0 0h-5m5 0v-5"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── DESKTOP: Flipbook ────────────────────────────── */}
      {mounted && (
        <div className="hidden md:flex flex-col flex-1 items-center justify-center gap-6">
          {/* book — zoom wrapper */}
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease',
              filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.65))',
            }}
          >
            <HTMLFlipBook
              ref={bookRef}
              width={PAGE_W}
              height={PAGE_H}
              className=""
              style={{}}
              size="fixed"
              minWidth={PAGE_W}
              maxWidth={PAGE_W}
              minHeight={PAGE_H}
              maxHeight={PAGE_H}
              showCover
              drawShadow
              usePortrait={false}
              flippingTime={700}
              autoSize={false}
              startPage={0}
              startZIndex={10}
              maxShadowOpacity={0.5}
              useMouseEvents
              swipeDistance={30}
              clickEventForward
              mobileScrollSupport={false}
              showPageCorners
              disableFlipByClick={false}
              onFlip={handleFlip}
            >
              <CoverPage />
              {projects.map((project, i) => (
                <ImagePage key={project.id} project={project} pageIndex={i + 1} />
              ))}
              <BackCoverPage />
            </HTMLFlipBook>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-5">
            <button
              onClick={goPrev}
              aria-label="Trang trước"
              className="w-10 h-10 rounded-full border border-stone-700 text-stone-400 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all duration-200 flex items-center justify-center text-xl leading-none"
            >
              ‹
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_SPREADS }).map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    i === activeSpread ? 'w-5 bg-[var(--color-brand)]' : 'w-1.5 bg-stone-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Trang sau"
              className="w-10 h-10 rounded-full border border-stone-700 text-stone-400 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all duration-200 flex items-center justify-center text-xl leading-none"
            >
              ›
            </button>
          </div>

          <p className="text-stone-700 text-[11px] tracking-[0.15em]">
            Kéo góc trang hoặc nhấn mũi tên để lật
          </p>
        </div>
      )}

      {/* ── MOBILE: full-screen scroll-snap gallery ──────── */}
      <div className="md:hidden flex-1 flex flex-col justify-center">
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="flex-none snap-center w-[78vw] max-w-[300px] h-[60vh] relative rounded-lg overflow-hidden bg-stone-900 shrink-0"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/92 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#BE7B2B] font-mono text-[10px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[var(--color-brand)] text-[10px] tracking-widest uppercase">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-white text-sm font-light leading-snug mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-stone-400 text-[10px]">
                  <span>{project.location}</span>
                  <span>· {project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
