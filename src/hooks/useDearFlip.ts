import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jQuery: (el: Element) => any;
  }
}

const CDN_BASE =
  'https://cdn.jsdelivr.net/npm/@dearhive/dearflip-jquery-flipbook@1.7.3/dflip';

// Module-level singletons — survive HMR / Strict Mode double-invoke
let _loaded = false;
let _promise: Promise<void> | null = null;

function addStyle(href: string) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.body.appendChild(s);
  });
}

export function ensureDearFlip(): Promise<void> {
  if (_loaded) return Promise.resolve();
  if (_promise) return _promise;
  _promise = (async () => {
    addStyle(`${CDN_BASE}/css/dflip.min.css`);
    addStyle(`${CDN_BASE}/css/themify-icons.min.css`);
    await loadScript('https://code.jquery.com/jquery-3.7.1.min.js');
    await loadScript(`${CDN_BASE}/js/dflip.min.js`);
    _loaded = true;
  })();
  return _promise;
}

export interface DearFlipOptions {
  source: string[];
  webgl?: boolean;
  backgroundColor?: string;
  hard?: string;
  soundEnable?: boolean;
  autoEnableOutline?: boolean;
  autoEnableThumbnail?: boolean;
  pageMode?: number;
  [key: string]: unknown;
}

export function useDearFlip(
  containerRef: React.RefObject<HTMLDivElement | null>,
  options: DearFlipOptions
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceRef = useRef<any>(null);
  // Guard against React Strict Mode double-invoke
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;
    initializedRef.current = true;

    const container = containerRef.current;

    ensureDearFlip().then(() => {
      if (!container || !container.isConnected) return;
      instanceRef.current = window.jQuery(container).flipBook(options);
    });

    return () => {
      initializedRef.current = false;
      // Dispose DearFlip instance if method exists
      if (instanceRef.current?.dispose) {
        try { instanceRef.current.dispose(); } catch { /* ignore */ }
      }
      instanceRef.current = null;
      // Clear rendered output from container
      if (container) container.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // runs once per mount — use key prop on parent to reinitialize
}
