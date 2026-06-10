'use client';
import { useState } from 'react';
import Image from 'next/image';

// Domain map: company name → clearbit domain
const DOMAIN_MAP: Record<string, string> = {
  // Partners — international / large brands
  'VinaCapital': 'vinacapital.com',
  'Novaland': 'novaland.com.vn',
  'BRG Group': 'brggroup.vn',
  'Laguna Lăng Cô': 'lagunalangco.com',
  'Sun Group': 'sungroup.com.vn',
  'Hung Thinh Corp': 'hungthinhcorp.vn',
  'Fusion Resort': 'fusionresorts.com',
  'HOIANA': 'hoiana.com',
  'Radisson': 'radissonhotels.com',
  'Minor International': 'minorhotels.com',
  'Obayashi Vietnam': 'obayashi.co.jp',
  'Vicoland Group': 'vicoland.vn',
  'Dat Phuong': 'datphuong.com.vn',
  'TTC Land': 'ttcland.com.vn',
  'Sacomreal': 'sacomreal.com.vn',
  'Six Senses': 'sixsenses.com',
  'Marriott': 'marriott.com',
  'Hyatt': 'hyatt.com',
  'Seava Hồ Tràm': 'seavahostram.vn',
  'TonkinLand': 'tonkinland.com.vn',
  // Members
  'LAPLA': 'lapla.vn',
  'BHA Architecture': 'bha.vn',
};

function getInitials(name: string): string {
  // If name has abbr pattern like "(ANA)" extract it
  const abbrMatch = name.match(/\(([A-Z]+)\)/);
  if (abbrMatch) return abbrMatch[1];
  // Otherwise take first letter of each word (max 3)
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

interface LogoImageProps {
  name: string;
  abbr?: string;
  size?: 'sm' | 'md' | 'lg';
  /** extra classes on the wrapper */
  className?: string;
}

export default function LogoImage({ name, abbr, size = 'md', className = '' }: LogoImageProps) {
  const [failed, setFailed] = useState(false);
  const domain = DOMAIN_MAP[name];
  const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : null;
  const displayText = abbr || getInitials(name);

  const sizes = {
    sm: { wrapper: 'h-8 w-20', text: 'text-xs', img: 32 },
    md: { wrapper: 'h-10 w-28', text: 'text-sm', img: 40 },
    lg: { wrapper: 'h-12 w-32', text: 'text-base', img: 48 },
  };
  const s = sizes[size];

  if (logoUrl && !failed) {
    return (
      <div className={`relative flex items-center justify-center ${s.wrapper} ${className}`}>
        <Image
          src={logoUrl}
          alt={name}
          width={s.img * 3}
          height={s.img}
          className="object-contain w-full h-full"
          onError={() => setFailed(true)}
          unoptimized
        />
      </div>
    );
  }

  // Fallback: styled text/abbr
  return (
    <div className={`flex items-center justify-center ${s.wrapper} ${className}`}>
      <span className={`font-black tracking-wide text-[var(--color-text-secondary)] group-hover:text-[var(--color-brand)] transition-colors ${s.text}`}>
        {displayText}
      </span>
    </div>
  );
}
