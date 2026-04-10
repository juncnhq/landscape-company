import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const services = [
  {
    slug: 'consulting',
    order: 1,
    icon: '📋',
    titleVi: 'Tư Vấn & Quản Lý Cảnh Quan',
    titleEn: 'Landscape Consulting & Management',
    subtitleVi: 'Bao phủ toàn bộ vòng đời dự án',
    subtitleEn: 'Full project lifecycle coverage',
    descVi: 'FAM cung cấp dịch vụ tư vấn và quản lý toàn diện cho mọi giai đoạn của dự án cảnh quan — từ ý tưởng ban đầu đến bàn giao và bảo dưỡng dài hạn.',
    descEn: 'FAM provides end-to-end consultancy and management across every phase of a landscape project — from initial concept through final handover and long-term maintenance.',
    tag: 'Consulting',
    bulletsVi: ['Thiết kế ý tưởng (Concept Design)', 'Thiết kế kỹ thuật (Technical Design)', 'Bản vẽ thi công (Construction Drawing)', 'Quản lý & giám sát công trường', 'Dịch vụ bảo hành', 'Bảo dưỡng định kỳ'],
    bulletsEn: ['Concept Design', 'Technical Design', 'Construction Drawing', 'Site Management & Supervision', 'Warranty Service', 'Ongoing Maintenance'],
  },
  {
    slug: 'construction',
    order: 2,
    icon: '🏗️',
    titleVi: 'Thiết Kế & Thi Công Cảnh Quan',
    titleEn: 'Landscape Design & Construction',
    subtitleVi: 'Hạ tầng, cảnh quan cứng & mềm',
    subtitleEn: 'Infrastructure, hardscape & softscape',
    descVi: 'Dịch vụ thiết kế và thi công cảnh quan toàn diện, bao gồm hạ tầng kỹ thuật, cảnh quan cứng, cảnh quan mềm, hệ thống chiếu sáng và tưới tiêu tự động.',
    descEn: 'Comprehensive landscape design and construction covering technical infrastructure, hardscape, softscape, lighting systems, and automatic irrigation.',
    tag: 'Design · Build',
    bulletsVi: ['Hạ tầng: thoát nước, điện ngầm, lớp nền', 'Cảnh quan cứng: lát đá, lối đi, tường chắn', 'Cảnh quan mềm: cây, thảm cỏ, hoa, cây bụi', 'Hệ thống chiếu sáng cảnh quan', 'Hệ thống tưới tiêu tự động'],
    bulletsEn: ['Infrastructure: drainage, underground electric, base layers', 'Hardscape: stone paving, walkways, retaining walls', 'Softscape: trees, turf, flowers, shrubs', 'Landscape lighting systems', 'Automatic irrigation systems'],
  },
  {
    slug: 'golf',
    order: 3,
    icon: '⛳',
    titleVi: 'Cảnh Quan Sân Golf',
    titleEn: 'Golf Course Landscape',
    subtitleVi: 'Chuyên gia cỏ & tưới tiêu sân golf',
    subtitleEn: 'Turf & irrigation specialists',
    descVi: 'FAM có chuyên môn sâu trong thiết kế, thi công và bảo dưỡng cảnh quan sân golf — từ lựa chọn loại cỏ đến hệ thống tưới tiêu Rainbird đạt tiêu chuẩn quốc tế.',
    descEn: 'FAM has deep expertise in golf course landscape design, construction, and maintenance — from turf selection to Rainbird-certified automatic irrigation systems.',
    tag: 'Golf',
    bulletsVi: ['Lựa chọn loại cỏ: Paspalum, Bermuda, Zoysia', 'Thiết kế & lắp đặt tưới tiêu tự động (chứng nhận Rainbird)', 'Cảnh quan bunker và fairway', 'Bảo dưỡng quanh năm'],
    bulletsEn: ['Turf selection: Paspalum, Bermuda, Zoysia', 'Automatic irrigation design & installation (Rainbird certified)', 'Bunker and fairway landscaping', 'Year-round maintenance'],
  },
  {
    slug: 'artwork',
    order: 4,
    icon: '🎨',
    titleVi: 'Thi Công Artwork & Iconic',
    titleEn: 'Artwork & Iconic Construction',
    subtitleVi: 'Kiến trúc nghệ thuật & công trình biểu tượng',
    subtitleEn: 'Artistic architecture & landmark structures',
    descVi: 'Thiết kế và thi công các công trình nghệ thuật độc đáo và biểu tượng mang tính nhận diện cao, được phát triển theo phương pháp tiếp cận tỷ lệ.',
    descEn: 'Design and construction of unique artistic structures and landmark installations, developed using a scale-based design approach.',
    tag: 'Art · Identity',
    bulletsVi: ['Công trình biểu tượng và nghệ thuật theo yêu cầu', 'Phương pháp thiết kế theo tỷ lệ', 'Tích hợp vào tổng thể cảnh quan', 'Tham chiếu: Cầu Đất Farm Đà Lạt, Novaworld Hồ Tràm'],
    bulletsEn: ['Custom iconic structures and art installations', 'Scale-based design approach', 'Integration into the overall landscape concept', 'References: Cau Dat Farm Da Lat, Novaworld Ho Tram'],
  },
  {
    slug: 'labour',
    order: 5,
    icon: '👷',
    titleVi: 'Cung Ứng Lao Động',
    titleEn: 'Labour Supply',
    subtitleVi: 'Nhân lực thi công & bảo dưỡng cảnh quan',
    subtitleEn: 'Skilled landscape construction & maintenance workforce',
    descVi: 'Cung cấp nhân lực có tay nghề cho các dự án thi công và bảo dưỡng cảnh quan — từ công nhân lành nghề đến giám sát công trường và kỹ thuật viên.',
    descEn: 'Supply of skilled personnel for landscape construction and maintenance projects — from skilled workers to on-site supervisors and technical staff.',
    tag: 'Workforce',
    bulletsVi: ['Công nhân thi công cảnh quan lành nghề', 'Đội bảo dưỡng chuyên nghiệp', 'Giám sát công trường và kỹ thuật viên'],
    bulletsEn: ['Skilled landscape construction workers', 'Maintenance crews', 'On-site supervisors and technical staff'],
  },
  {
    slug: 'materials',
    order: 6,
    icon: '📦',
    titleVi: 'Cung Cấp Vật Tư Cảnh Quan',
    titleEn: 'Landscape Materials Supply',
    subtitleVi: 'Cây xanh, cỏ, thiết bị tưới tiêu & vật tư',
    subtitleEn: 'Plants, turf, irrigation equipment & materials',
    descVi: 'Cung cấp đầy đủ vật tư cảnh quan chất lượng cao — từ cây xanh, cỏ đến thiết bị tưới tiêu và các vật liệu khác, thông qua mạng lưới đối tác đáng tin cậy.',
    descEn: 'Full supply of high-quality landscape materials — from plants and turf to irrigation equipment and other materials, through a reliable partner network.',
    tag: 'Materials',
    bulletsVi: ['Cây xanh & thảm cỏ chất lượng cao', 'Thiết bị tưới tiêu & phụ kiện', 'Vật liệu cứng: đá, gạch, đất nền', 'Mạng lưới nhà cung cấp đáng tin cậy'],
    bulletsEn: ['High-quality plants & turf', 'Irrigation equipment & accessories', 'Hard materials: stone, brick, substrate', 'Reliable supplier network'],
  },
]

async function main() {
  console.log('Seeding services...')
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: { ...s, published: true },
    })
  }
  console.log(`Seeded ${services.length} services.`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
