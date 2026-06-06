'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Nguyễn Văn An',
    nameEn: 'Andrew Nguyen',
    role: { vi: 'Chuyên gia Thiết kế Cảnh quan', en: 'Landscape Designer' },
    desc: { vi: 'Kết hợp thẩm mỹ và công năng để tạo ra không gian xanh bền vững.', en: 'Blends aesthetics with functionality for timeless outdoor spaces.' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
    socials: ['facebook', 'twitter', 'linkedin'],
  },
  {
    name: 'Trần Thị Bích',
    nameEn: 'Betty Tran',
    role: { vi: 'Nhà thiết kế vườn', en: 'Garden Designer' },
    desc: { vi: 'Chuyên tạo ra những khu vườn đẹp và hài hòa với thiên nhiên.', en: 'Specializes in creating gardens that harmonize with nature.' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png',
    socials: ['facebook', 'instagram', 'linkedin'],
  },
  {
    name: 'Lê Minh Khoa',
    nameEn: 'Kevin Le',
    role: { vi: 'Chuyên gia Cây trồng', en: 'Horticulture Specialist' },
    desc: { vi: 'Am hiểu sâu về cây trồng và các giải pháp xanh bền vững.', en: 'Deep knowledge in plants and sustainable green solutions.' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
    socials: ['facebook', 'twitter', 'instagram'],
  },
  {
    name: 'Phạm Thu Hà',
    nameEn: 'Hannah Pham',
    role: { vi: 'Chuyên gia Bảo trì Vườn', en: 'Garden Maintenance Expert' },
    desc: { vi: 'Đảm bảo vườn luôn tươi tốt và đẹp mắt quanh năm.', en: 'Ensures your garden stays vibrant and beautiful year-round.' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
    socials: ['facebook', 'linkedin', 'instagram'],
  },
];

const SocialIcon = ({ type }: { type: string }) => {
  const paths: Record<string, string> = {
    facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
    twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
    linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z',
  };
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || paths.facebook} />
    </svg>
  );
};

export default function TeamSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="leafix-section" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            {isVi ? 'Đội ngũ chuyên gia' : 'OUR EXPERT TEAM'}
          </p>
          <h2 className="font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0e2208', letterSpacing: '-0.02em' }}>
            {isVi ? 'Chuyên Gia Mang Thiên Nhiên Vào Cuộc Sống' : 'Professionals Who Bring Nature to Life'}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '120%' }}>
                <Image
                  src={member.image}
                  alt={isVi ? member.name : member.nameEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(14,34,8,0.95) 0%, rgba(14,34,8,0.6) 50%, transparent 100%)',
                    opacity: hoveredIdx === idx ? 1 : 0,
                  }}
                >
                  <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '20px' }}>
                    {isVi ? member.desc.vi : member.desc.en}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors duration-200 hover:opacity-80"
                    style={{ color: 'var(--color-brand)' }}
                  >
                    {isVi ? 'Xem hồ sơ' : 'VIEW PROFILE'}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                  {/* Socials */}
                  <div className="flex gap-2 mt-3">
                    {member.socials.map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:opacity-80"
                        style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                      >
                        <SocialIcon type={s} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div
                className="px-4 py-4 transition-colors duration-300"
                style={{
                  backgroundColor: hoveredIdx === idx ? 'var(--color-accent)' : '#f5f9f0',
                  borderBottom: `3px solid ${hoveredIdx === idx ? '#6a9433' : '#e0edd0'}`,
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1 transition-colors duration-300"
                  style={{ color: hoveredIdx === idx ? 'var(--color-text-primary)' : 'var(--color-brand)' }}
                >
                  {isVi ? member.role.vi : member.role.en}
                </p>
                <h4
                  className="font-bold text-base transition-colors duration-300"
                  style={{ color: hoveredIdx === idx ? 'white' : '#0e2208' }}
                >
                  {isVi ? member.name : member.nameEn}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
