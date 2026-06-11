export type DbService = {
  id: string; slug: string; icon: string;
  titleVi: string; titleEn: string;
  subtitleVi: string; subtitleEn: string;
  descVi?: string; descEn?: string;
  descriptionVi?: string; descriptionEn?: string;
  bulletsVi?: string[]; bulletsEn?: string[];
  images?: string[]; published?: boolean; order?: number;
  createdAt?: Date; updatedAt?: Date;
};

export const SERVICES: (DbService & { order: number })[] = [
  {
    id: 'consulting', slug: 'consulting', icon: '📋', order: 1,
    titleVi: 'Tư Vấn & Quản Lý Cảnh Quan', titleEn: 'Landscape Consulting & Management',
    subtitleVi: 'Bao phủ toàn bộ vòng đời dự án', subtitleEn: 'Full project lifecycle coverage',
    descVi: 'Lapla cung cấp dịch vụ tư vấn và quản lý toàn diện cho mọi giai đoạn của dự án cảnh quan — từ ý tưởng ban đầu đến bàn giao và bảo dưỡng dài hạn.',
    descEn: 'Lapla provides end-to-end consultancy and management across every phase of a landscape project — from initial concept through final handover and long-term maintenance.',
    bulletsVi: ['Thiết kế ý tưởng','Thiết kế kỹ thuật','Bản vẽ thi công','Quản lý & giám sát','Dịch vụ bảo hành','Bảo dưỡng định kỳ'],
    bulletsEn: ['Concept Design','Technical Design','Construction Drawing','Site Management','Warranty Service','Periodic Maintenance'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png'],
  },
  {
    id: 'design', slug: 'design', icon: '🌿', order: 2,
    titleVi: 'Thiết Kế & Thi Công Cảnh Quan', titleEn: 'Landscape Design & Construction',
    subtitleVi: 'Từ bản vẽ đến hiện thực', subtitleEn: 'From blueprint to reality',
    descVi: 'Đội ngũ kiến trúc sư và kỹ sư cảnh quan của Lapla chuyên thiết kế và thi công các không gian xanh đẳng cấp, phù hợp với mọi quy mô và phong cách.',
    descEn: 'Our landscape architects and engineers specialize in designing and constructing premium green spaces suited to any scale and style.',
    bulletsVi: ['Thiết kế sân vườn','Cảnh quan cứng (hardscape)','Hồ nước & thác nước','Hệ thống đèn cảnh quan','Cây xanh & thảm cỏ'],
    bulletsEn: ['Garden Design','Hardscape','Water Features','Landscape Lighting','Plants & Turf'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png'],
  },
  {
    id: 'maintenance', slug: 'maintenance', icon: '🔧', order: 3,
    titleVi: 'Bảo Dưỡng & Chăm Sóc', titleEn: 'Maintenance & Care',
    subtitleVi: 'Giữ vẻ đẹp lâu dài', subtitleEn: 'Preserving beauty long-term',
    descVi: 'Dịch vụ bảo dưỡng định kỳ giúp không gian xanh của bạn luôn tươi tốt và đẹp đẽ suốt năm, với đội ngũ chăm sóc tận tâm và chuyên nghiệp.',
    descEn: 'Our regular maintenance service keeps your green spaces lush and beautiful year-round, with a dedicated and professional care team.',
    bulletsVi: ['Cắt tỉa định kỳ','Bón phân & tưới tiêu','Kiểm soát sâu bệnh','Thay thế cây','Vệ sinh cảnh quan'],
    bulletsEn: ['Regular Trimming','Fertilizing & Irrigation','Pest Control','Plant Replacement','Landscape Cleaning'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg'],
  },
  {
    id: 'golf-resort', slug: 'golf-resort', icon: '⛳', order: 4,
    titleVi: 'Cảnh Quan Sân Golf & Resort', titleEn: 'Golf Course & Resort Landscaping',
    subtitleVi: 'Đẳng cấp quốc tế', subtitleEn: 'International standard',
    descVi: 'Lapla có kinh nghiệm phong phú trong thiết kế và thi công cảnh quan cho các sân golf và resort 5 sao hàng đầu Việt Nam.',
    descEn: "Lapla has extensive experience designing and constructing landscapes for Vietnam's leading golf courses and 5-star resorts.",
    bulletsVi: ['Cảnh quan fairway & rough','Hồ nước & tiểu cảnh','Khu vực clubhouse','Khu nghỉ dưỡng bungalow','Đường dạo & cây bóng mát','Hệ thống tưới tự động'],
    bulletsEn: ['Fairway & Rough Landscaping','Water Features & Ponds','Clubhouse Surroundings','Bungalow Resort Areas','Walkways & Shade Trees','Automated Irrigation Systems'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png'],
  },
  {
    id: 'urban', slug: 'urban', icon: '🏙️', order: 5,
    titleVi: 'Cảnh Quan Đô Thị & Công Cộng', titleEn: 'Urban & Public Landscaping',
    subtitleVi: 'Kiến tạo không gian sống cộng đồng', subtitleEn: 'Building community living spaces',
    descVi: 'Chúng tôi cung cấp giải pháp cảnh quan cho các khu đô thị, khu dân cư, công viên và không gian công cộng.',
    descEn: 'We deliver landscaping solutions for urban developments, residential complexes, parks and public spaces.',
    bulletsVi: ['Công viên & vườn hoa','Đường phố & dải phân cách','Sân chơi trẻ em','Quảng trường đô thị','Mảng xanh khu dân cư','Tường cây & vườn đứng'],
    bulletsEn: ["Parks & Gardens","Streets & Medians","Children's Play Areas","Urban Plazas","Residential Green Zones","Green Walls & Vertical Gardens"],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png'],
  },
  {
    id: 'indoor', slug: 'indoor', icon: '🪴', order: 6,
    titleVi: 'Cây Xanh Nội Thất & Tường Cây', titleEn: 'Interior Plants & Green Walls',
    subtitleVi: 'Không gian xanh trong nhà', subtitleEn: 'Bringing nature indoors',
    descVi: 'Giải pháp cây xanh nội thất cho văn phòng, khách sạn, trung tâm thương mại và nhà ở cao cấp.',
    descEn: 'Interior plant solutions for offices, hotels, shopping centers and premium residences.',
    bulletsVi: ['Thiết kế tường cây sinh thái','Cây cảnh văn phòng & khách sạn','Hệ thống tưới tự động nội thất','Bảo dưỡng cây nội thất','Vườn ban công & sân thượng','Tiểu cảnh & hòn non bộ'],
    bulletsEn: ['Eco Green Wall Design','Office & Hotel Plants','Indoor Auto-Irrigation','Interior Plant Maintenance','Balcony & Rooftop Gardens','Miniature Landscapes & Bonsai'],
    images: ['https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png'],
  },
]
