'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Nguyễn Văn Hoàng',
    nameEn: 'Andrew Nguyen',
    role: { vi: 'Chuyên gia Cảnh quan', en: 'Horticulture Specialist' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png',
  },
  {
    name: 'Trần Thị Bích',
    nameEn: 'Betty Tran',
    role: { vi: 'Nhà thiết kế vườn', en: 'Horticulture Specialist' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png',
  },
  {
    name: 'Lê Minh Khoa',
    nameEn: 'Kevin Le',
    role: { vi: 'Chuyên gia Cây trồng', en: 'Horticulture Specialist' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg',
  },
  {
    name: 'Phạm Thu Hà',
    nameEn: 'Hannah Pham',
    role: { vi: 'Chuyên gia Bảo trì', en: 'Horticulture Specialist' },
    image: 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png',
  },
];

export default function TeamSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header: 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
              <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--color-brand)' }}>
                {isVi ? 'Đội ngũ của chúng tôi' : 'Our Team'}
              </p>
            </div>
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0e1a0f' }}>
              {isVi
                ? <>Gặp gỡ chuyên gia<br />cây xanh & cảnh quan</>
                : <>Meet Our Expert Tree and<br />Garden Specialists</>}
            </h2>
          </div>
          <div>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
              {isVi
                ? 'Doanh nghiệp gia đình của chúng tôi quy tụ những chuyên gia giàu kinh nghiệm và nhiệt huyết, với hơn 17 năm kinh nghiệm trong ngành cây xanh và cảnh quan tại Việt Nam.'
                : 'Our family-owned business brings together a group of passionate and skilled professionals with over three decades of experience in Vietnam\'s tree and garden industry.'}
            </p>
          </div>
        </div>

        {/* Team cards — arch shape */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {teamMembers.map((member) => (
            <div key={member.nameEn} className="flex flex-col items-center">
              {/* Arch image container */}
              <div
                className="relative overflow-hidden w-full mb-5"
                style={{
                  height: '340px',
                  borderRadius: '9999px 9999px 0 0',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Image
                  src={member.image}
                  alt={isVi ? member.name : member.nameEn}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              {/* Name + role */}
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                {isVi ? member.role.vi : member.role.en}
              </p>
              <p className="font-display font-bold text-base" style={{ color: '#0e1a0f' }}>
                {isVi ? member.name : member.nameEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
