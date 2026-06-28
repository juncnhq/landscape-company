"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

function FlagVN({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="20" fill="#DA251D" />
      <polygon points="15,3.5 16.55,8.27 21.5,8.27 17.48,11.18 19.02,15.95 15,13.04 10.98,15.95 12.52,11.18 8.5,8.27 13.45,8.27" fill="#FFFF00" />
    </svg>
  );
}

function FlagEN({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <rect x="25" y="0" width="10" height="30" fill="#fff" />
      <rect x="0" y="10" width="60" height="10" fill="#fff" />
      <rect x="27" y="0" width="6" height="30" fill="#C8102E" />
      <rect x="0" y="12" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}

const navLinks = [
  { key: "home",     vi: "Trang chủ",    en: "HOME" },
  { key: "projects", vi: "Dự án",        en: "PROJECTS" },
  { key: "services", vi: "Dịch vụ",      en: "SERVICES" },
  { key: "news",     vi: "Tin tức",      en: "NEWS" },
  { key: "catalog",  vi: "Catalog",      en: "CATALOG" },
  { key: "careers",  vi: "Tuyển dụng",  en: "CAREERS" },
  { key: "about",    vi: "Về chúng tôi", en: "ABOUT" },
];

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const otherLocale = locale === "vi" ? "en" : "vi";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const href = (key: string) => {
    if (key === "home") return `/${locale}`;
    return `/${locale}/${key}`;
  };

  const isActive = (key: string) => {
    const h = href(key);
    return h === `/${locale}` ? pathname === h : pathname.startsWith(h);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(15,84,30,0.92)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 100%)",
          backdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.25)" : "none",
        }}
      >
        <div className="max-w-[2240px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between h-[76px] gap-4">

            {/* Logo */}
            <Link href={`/${locale}`} className="shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="Lapla Landscape"
                width={140}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Center: nav pill */}
            <div
              className="hidden lg:flex items-center rounded-full px-3 py-1.5"
              style={{
                backgroundColor: scrolled ? "transparent" : "rgba(0,0,0,0.45)",
                backdropFilter: scrolled ? "none" : "blur(8px)",
              }}
            >
              {navLinks.map((link) => {
                const active = isActive(link.key);
                return (
                  <Link
                    key={link.key}
                    href={href(link.key)}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 rounded-full"
                    style={{
                      color: active ? "var(--color-accent)" : "rgba(255,255,255,0.92)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.92)";
                    }}
                  >
                    {locale === "vi" ? link.vi : link.en}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">

              {/* Language switcher */}
              <Link
                href={switchPath}
                aria-label={locale === "vi" ? "Chuyển sang English" : "Switch to Tiếng Việt"}
                title={locale === "vi" ? "Chuyển sang English" : "Switch to Tiếng Việt"}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all duration-200"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.85)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                }}
              >
                <span className="rounded-sm overflow-hidden">
                  {locale === "vi" ? <FlagVN /> : <FlagEN />}
                </span>
                {locale.toUpperCase()}
              </Link>

              {/* REQUEST A QUOTE CTA */}
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-text-primary)",
                  borderRadius: "10px",
                }}
              >
                {locale === "vi" ? "Yêu cầu báo giá" : "Request A Quote"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              style={{ color: scrolled ? 'var(--color-text-primary)' : 'white' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-0.5 bg-current transition-all duration-200"
                style={{ transform: mobileOpen ? "rotate(45deg) translateY(6px)" : "none" }}
              />
              <span
                className="block w-6 h-0.5 bg-current transition-all duration-200"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-0.5 bg-current transition-all duration-200"
                style={{ transform: mobileOpen ? "rotate(-45deg) translateY(-6px)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-white flex flex-col lg:hidden"
            style={{ boxShadow: "-4px 0 30px rgba(0,0,0,0.15)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-[76px] border-b border-[#e8e8e8]">
              <Image src="/logo.png" alt="Lapla" width={100} height={34} className="h-10 w-auto object-contain" />
              <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center" style={{ color: "var(--color-text-secondary)" }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={href(link.key)}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 mb-1 text-sm font-bold uppercase tracking-wider transition-colors duration-200"
                  style={{
                    color: isActive(link.key) ? "var(--color-accent)" : "#111111",
                    backgroundColor: isActive(link.key) ? "#f5f9f0" : "transparent",
                  }}
                >
                  {locale === "vi" ? link.vi : link.en}
                  {isActive(link.key) && (
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                  )}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-5 border-t border-[#e8e8e8] space-y-3">
              <a href="tel:+842363695166" className="flex items-center gap-3 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: "var(--color-accent)", color: "white" }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                0236 3695 166
              </a>
              <div className="flex gap-2">
                {(["vi", "en"] as const).map((lang) => (
                  <Link
                    key={lang}
                    href={pathname.replace(`/${locale}`, `/${lang}`)}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border transition-colors duration-200"
                    style={{
                      backgroundColor: locale === lang ? "var(--color-accent)" : "white",
                      color: locale === lang ? "white" : "var(--color-text-secondary)",
                      borderColor: locale === lang ? "var(--color-accent)" : "#e0e0e0",
                    }}
                  >
                    <span className="rounded-sm overflow-hidden">
                      {lang === "vi" ? <FlagVN /> : <FlagEN />}
                    </span>
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
