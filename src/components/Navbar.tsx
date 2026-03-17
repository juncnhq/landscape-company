'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

function FlagVN({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="20" fill="#DA251D" />
      <polygon
        points="15,3.5 16.55,8.27 21.5,8.27 17.48,11.18 19.02,15.95 15,13.04 10.98,15.95 12.52,11.18 8.5,8.27 13.45,8.27"
        fill="#FFFF00"
      />
    </svg>
  );
}

function FlagEN({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
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
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === '/';
  const [scrolled, setScrolled] = useState(!isHomePage);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) { setScrolled(true); return; }
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [isHomePage]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const otherLocale = locale === 'vi' ? 'en' : 'vi';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/partners`, label: t('partners') },
    { href: `/${locale}/news`, label: t('news') },
    { href: `/${locale}/careers`, label: t('careers') },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <span className={`w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold ${scrolled ? 'bg-green-600' : 'bg-green-500/90'}`}>
                F
              </span>
              <span className={`text-sm font-semibold tracking-widest uppercase transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                AM Landscape
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-[11px] font-medium tracking-widest uppercase transition-colors rounded-md ${
                    isActive(link.href)
                      ? scrolled ? 'text-green-600' : 'text-green-400'
                      : scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-dot"
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${scrolled ? 'bg-green-600' : 'bg-green-400'}`}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right: lang switcher + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href={switchPath}
                className={`hidden sm:flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase transition-all px-3 py-1.5 rounded-full border ${
                  scrolled
                    ? 'border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-600'
                    : 'border-white/30 text-white/80 hover:border-white hover:text-white'
                }`}
              >
                <span className="rounded-sm overflow-hidden shadow-sm">
                  {otherLocale === 'vi' ? <FlagVN /> : <FlagEN />}
                </span>
                {otherLocale.toUpperCase()}
              </Link>

              {/* Hamburger */}
              <button
                className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-md transition-colors ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: 0.25 }}
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-gray-950 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/[0.07]">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">F</span>
                  <span className="text-white text-xs font-semibold tracking-widest uppercase">AM Landscape</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <p className="text-[9px] tracking-[0.3em] text-gray-600 uppercase mb-4 px-2">Navigation</p>
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-3.5 rounded-lg mb-1 text-sm font-medium tracking-wide transition-colors group ${
                        isActive(link.href)
                          ? 'bg-green-600/15 text-green-400'
                          : 'text-gray-300 hover:bg-white/[0.05] hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer: lang switcher */}
              <div className="px-4 py-5 border-t border-white/[0.07]">
                <p className="text-[9px] tracking-[0.3em] text-gray-600 uppercase mb-3 px-2">Language</p>
                <div className="flex gap-2 px-2">
                  {(['vi', 'en'] as const).map((lang) => {
                    const path = pathname.replace(`/${locale}`, `/${lang}`);
                    const active = locale === lang;
                    return (
                      <Link
                        key={lang}
                        href={path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-colors ${
                          active
                            ? 'bg-green-600 text-white'
                            : 'bg-white/[0.06] text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="rounded-sm overflow-hidden shadow-sm">
                          {lang === 'vi' ? <FlagVN className="w-5 h-3.5" /> : <FlagEN className="w-5 h-3.5" />}
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
