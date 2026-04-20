"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

function FlagVN({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="20" fill="#DA251D" />
      <polygon
        points="15,3.5 16.55,8.27 21.5,8.27 17.48,11.18 19.02,15.95 15,13.04 10.98,15.95 12.52,11.18 8.5,8.27 13.45,8.27"
        fill="#FFFF00"
      />
    </svg>
  );
}

function FlagEN({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="30" fill="#012169" />
      {/* White diagonals */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      {/* Red diagonals (clipped to halves) */}
      <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      {/* White cross */}
      <rect x="25" y="0" width="10" height="30" fill="#fff" />
      <rect x="0" y="10" width="60" height="10" fill="#fff" />
      {/* Red cross */}
      <rect x="27" y="0" width="6" height="30" fill="#C8102E" />
      <rect x="0" y="12" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === "/";
  const [scrolled, setScrolled] = useState(!isHomePage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isHomePage]);

  // Lock body scroll (with scrollbar-width fix to prevent layout shift)
  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const otherLocale = locale === "vi" ? "en" : "vi";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/partners`, label: t("partners") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/careers`, label: t("careers") },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="absolute -top-12 left-4 bg-green-600 text-white px-4 py-2 rounded-md focus:top-4 transition-all z-[60] font-medium text-sm"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: prefersReducedMotion ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: "easeOut",
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[76px]">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 shrink-0 group"
              onClick={() => setMobileOpen(false)}
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.06, y: -1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative"
              >
                {/* Glow halo behind logo */}
                <span
                  className={`absolute inset-0 rounded-xl blur-lg transition-opacity duration-500 ${
                    scrolled
                      ? "bg-green-400/20 opacity-0 group-hover:opacity-100"
                      : "bg-white/10 opacity-0 group-hover:opacity-100"
                  }`}
                />
                <Image
                  src="/logo.png"
                  alt="FAM Landscape"
                  width={140}
                  height={48}
                  className={`relative h-16 w-auto object-contain transition-[filter] duration-500 ${
                    scrolled
                      ? "drop-shadow-[0_2px_8px_rgba(50,132,66,0.25)] group-hover:drop-shadow-[0_4px_16px_rgba(50,132,66,0.45)]"
                      : "drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
                  }`}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-md focus:outline-none
                    ${scrolled ? "text-gray-700" : "text-white/85"}
                    ${isActive(link.href) ? "!text-green-500" : "hover:text-green-500"}
                  `}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-green-500"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 300, damping: 30 }
                      }
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right: lang switcher + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href={switchPath}
                aria-label={`Switch language to ${otherLocale === "vi" ? "Vietnamese" : "English"}`}
                className={`hidden sm:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all px-3 py-1.5 rounded-full border focus:outline-none ${
                  scrolled
                    ? "border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-600"
                    : "border-white/30 text-white/80 hover:border-white hover:text-white"
                }`}
              >
                <span className="rounded-sm overflow-hidden shadow-sm">
                  {otherLocale === "vi" ? <FlagVN /> : <FlagEN />}
                </span>
                {otherLocale.toUpperCase()}
              </Link>

              {/* Hamburger */}
              <button
                className={`lg:hidden p-2 flex flex-col items-center justify-center gap-[5px] rounded-md transition-colors focus:outline-none ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <motion.span
                  animate={
                    mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                  }
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                />
                <motion.span
                  animate={
                    mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                  }
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer from right */}
            <motion.div
              initial={{ x: prefersReducedMotion ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: prefersReducedMotion ? 0 : "100%" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.35,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[#07130a] flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[76px] border-b border-white/[0.07]">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/logo.png"
                    alt="FAM Landscape"
                    width={100}
                    height={34}
                    className="h-8 w-auto object-contain brightness-0 invert"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  title="Close menu (Esc)"
                  className="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <p className="text-[9px] tracking-[0.3em] text-gray-600 uppercase mb-4 px-2">
                  Navigation
                </p>
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.05 + i * 0.05,
                      duration: prefersReducedMotion ? 0 : 0.3,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg mb-1 min-h-[44px] text-base font-medium tracking-wide transition-colors group  ${
                        isActive(link.href)
                          ? "bg-green-600/15 text-green-400"
                          : "text-gray-300 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.href) && (
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer: lang switcher */}
              <div className="px-4 py-5 border-t border-white/[0.07]">
                <p className="text-[9px] tracking-[0.3em] text-gray-600 uppercase mb-3 px-2">
                  Language
                </p>
                <div className="flex gap-2 px-2">
                  {(["vi", "en"] as const).map((lang) => {
                    const path = pathname.replace(`/${locale}`, `/${lang}`);
                    const active = locale === lang;
                    return (
                      <Link
                        key={lang}
                        href={path}
                        onClick={() => setMobileOpen(false)}
                        aria-label={`Switch to ${lang === "vi" ? "Vietnamese" : "English"}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-lg text-sm font-semibold tracking-widest uppercase transition-colors focus:outline-none ${
                          active
                            ? "bg-green-600 text-white"
                            : "bg-white/[0.06] text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="rounded-sm overflow-hidden shadow-sm">
                          {lang === "vi" ? (
                            <FlagVN className="w-5 h-3.5" />
                          ) : (
                            <FlagEN className="w-5 h-3.5" />
                          )}
                        </span>
                        {lang.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
