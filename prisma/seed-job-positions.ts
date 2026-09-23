import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

// 5 vị trí vốn hardcode trong CareersPageContent.tsx — đưa vào DB để admin
// sửa được tại /admin/careers (feedback 22.09).
const positions = [
  {
    titleVi: 'Kiến Trúc Sư Cảnh Quan',
    titleEn: 'Landscape Architect',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Đà Nẵng / Công trường',
    locationEn: 'Da Nang / On-site',
    descVi: 'Chịu trách nhiệm lập hồ sơ thiết kế cảnh quan cho các dự án resort, sân golf, khu đô thị. Phối hợp với kỹ sư và đội thi công để đảm bảo chất lượng và tiến độ. Yêu cầu tốt nghiệp ngành Kiến trúc Cảnh quan hoặc liên quan, có ít nhất 2 năm kinh nghiệm, thành thạo AutoCAD và SketchUp.',
    descEn: 'Responsible for landscape design documentation for resort, golf course, and urban projects. Coordinate with engineers and construction teams to ensure quality and schedule. Requires a degree in Landscape Architecture or related field, at least 2 years of experience, proficiency in AutoCAD and SketchUp.',
  },
  {
    titleVi: 'Giám Sát Thi Công Sân Golf',
    titleEn: 'Golf Course Construction Supervisor',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Trên toàn quốc',
    locationEn: 'Nationwide',
    descVi: 'Giám sát trực tiếp quá trình thi công cảnh quan và hệ thống tưới tiêu tại các dự án sân golf. Kiểm soát chất lượng cỏ, cây trồng và hệ thống tưới Rainbird. Yêu cầu có kinh nghiệm thi công sân golf hoặc cảnh quan ngoài trời tối thiểu 3 năm, sẵn sàng di chuyển theo dự án.',
    descEn: 'Directly supervise landscape construction and irrigation systems at golf course projects. Quality control for turf, planting, and Rainbird irrigation systems. Requires minimum 3 years of golf course or outdoor landscape construction experience, willing to travel to project sites.',
  },
  {
    titleVi: 'Chỉ Huy Trưởng Cảnh Quan',
    titleEn: 'Site Manager – Landscape',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Đà Nẵng / Miền Trung',
    locationEn: 'Da Nang / Central Vietnam',
    descVi: 'Quản lý toàn bộ hoạt động thi công tại hiện trường, điều phối nhân lực và vật tư, báo cáo tiến độ cho ban giám đốc. Yêu cầu tốt nghiệp kỹ sư xây dựng hoặc cảnh quan, tối thiểu 5 năm kinh nghiệm quản lý công trình, kỹ năng lãnh đạo và đọc bản vẽ tốt.',
    descEn: 'Manage all on-site construction activities, coordinate manpower and materials, report progress to management. Requires a degree in Civil or Landscape Engineering, minimum 5 years of site management experience, strong leadership skills and ability to read construction drawings.',
  },
  {
    titleVi: 'Công Nhân Thi Công Cảnh Quan',
    titleEn: 'Landscape Construction Worker',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Nhiều công trường',
    locationEn: 'Multiple sites',
    descVi: 'Thực hiện các công việc thi công cảnh quan như trồng cây, lát đá, lắp đặt hệ thống tưới và công trình ngoại thất. Không yêu cầu bằng cấp, ưu tiên có kinh nghiệm thi công. Được đào tạo thực tế tại công trường, phụ cấp đi lại và ăn ở đầy đủ.',
    descEn: 'Carry out landscape construction tasks including planting, paving, irrigation installation, and outdoor structures. No formal degree required; experience preferred. On-the-job training provided, with full travel and accommodation allowances.',
  },
  {
    titleVi: 'Nhân Viên Phát Triển Kinh Doanh',
    titleEn: 'Business Development Executive',
    typeVi: 'Toàn thời gian',
    typeEn: 'Full-time',
    locationVi: 'Đà Nẵng',
    locationEn: 'Da Nang',
    descVi: 'Tìm kiếm và phát triển các cơ hội kinh doanh mới trong lĩnh vực cảnh quan, tiếp cận khách hàng B2B là chủ đầu tư và nhà thầu. Yêu cầu ít nhất 2 năm kinh nghiệm bán hàng B2B, kỹ năng giao tiếp và đàm phán tốt, ưu tiên có mạng lưới trong ngành xây dựng và bất động sản.',
    descEn: 'Identify and develop new business opportunities in the landscape sector, targeting B2B clients such as investors and contractors. Requires at least 2 years of B2B sales experience, strong communication and negotiation skills, with preference for candidates with a network in construction and real estate.',
  },
];

async function main() {
  const existing = await prisma.jobPosition.count()
  if (existing > 0) {
    console.log(`Đã có ${existing} vị trí tuyển dụng trong DB, bỏ qua seed.`)
    return
  }

  for (const [i, pos] of positions.entries()) {
    await prisma.jobPosition.create({ data: { ...pos, order: i, published: true } })
    console.log(`Created position: ${pos.titleEn}`)
  }
  console.log('Job positions seeded!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
