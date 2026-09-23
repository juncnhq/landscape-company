import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

const IMG1 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671447/dq8l14ajn2y7kxdku0nb.png'
const IMG2 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671255/hkzptty2mrrdqgcjnvbv.jpg'
const IMG3 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671436/g1bzoz3cahba47gm9h6h.png'
const IMG4 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671439/nhmwwlfahgea7q8quyvr.jpg'
const IMG5 = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671226/z2ljjartk4vgpbvanae2.png'

/**
 * Nội dung vốn hardcode trong AboutPageContent.tsx và [locale]/about/page.tsx,
 * chuyển nguyên văn sang DB để sửa được tại /admin/about.
 */
const content = {
  id: 'main',

  heroEyebrowVi: 'Câu chuyện của chúng tôi',
  heroEyebrowEn: 'Our Story',
  heroTitleVi: 'Về Lapla Landscape',
  heroTitleEn: 'About Us',
  heroDescVi:
    '17 năm kiến tạo không gian xanh — Lapla là đơn vị cảnh quan hàng đầu Việt Nam với hệ sinh thái chuyên biệt từ thiết kế đến vận hành.',
  heroDescEn:
    "17 years crafting green spaces — Lapla is Vietnam's leading landscape firm with a specialized ecosystem from design to operations.",

  introEyebrowVi: 'Về chúng tôi',
  introEyebrowEn: 'About Us',
  introTitleVi: 'Thiết kế không gian ngoài trời truyền cảm hứng',
  introTitleEn: 'Designing Outdoor Spaces That Inspire',
  introDescVi:
    'Lapla là nông trại cảnh quan vi mô đam mê thực phẩm tươi và các thành phố xanh hơn. Chúng tôi cung cấp giải pháp xanh phong phú cho các hộ gia đình, nhà hàng và bất kỳ ai đề cao cuộc sống bền vững.',
  introDescEn:
    'Lapla is a local microgreen farm passionate about fresh food and greener cities. We provide nutrient-rich microgreens to homes, restaurants, and anyone who values healthy, eco-friendly produce.',
  featuresVi: [
    'Đội ngũ cảnh quan chuyên nghiệp',
    'Thực hành bền vững',
    'Giải pháp ngoài trời tùy chỉnh',
    'Dịch vụ đáng tin cậy',
  ],
  featuresEn: [
    'Expert Landscaping Team',
    'Sustainable Practices',
    'Custom Outdoor Solutions',
    'Trusted & Reliable Service',
  ],
  badgeValue: '17+',
  badgeLabelVi: 'Năm kinh nghiệm',
  badgeLabelEn: 'Years of experienced',
  ownerName: 'Nguyễn Văn Hoàng',
  ownerRoleVi: 'CEO & Sáng lập',
  ownerRoleEn: 'CEO & founder',
  phoneLabelVi: 'Gọi bất cứ lúc nào',
  phoneLabelEn: 'Call Us Any Time',
  phone: '0236 3695 166',
  images: [IMG1, IMG2, IMG3, IMG4, IMG5],

  statsTitleVi: 'Thành tích của chúng tôi nói lên tất cả',
  statsTitleEn: 'Our Experience Speaks for Itself',
  statValues: ['200+', '99%', '17+', '500+'],
  statLabelsVi: [
    'Dự án hoàn thành',
    'Khách hàng hài lòng',
    'Năm kinh nghiệm',
    'Nhân sự chuyên nghiệp',
  ],
  statLabelsEn: [
    'Beautiful Lawns Designed',
    'Customer Satisfaction Rate',
    'Years of Experience',
    'Expert Staff Members',
  ],

  faqEyebrowVi: 'Thêm về chúng tôi',
  faqEyebrowEn: 'More About',
  faqTitleVi: 'Phát triển vẻ đẹp qua sự tận tâm và tin cậy',
  faqTitleEn: 'Growing Beauty Through Honest, Reliable Care',
  faqDescVi:
    'Cung cấp dịch vụ cảnh quan xanh bền vững nâng cao giá trị thẩm mỹ, hỗ trợ tăng trưởng lành mạnh và mang lại cho khách hàng thêm thời gian.',
  faqDescEn:
    'To provide dependable, eco-conscious lawn and garden care that enhances curb appeal, supports healthy growth, and gives our clients more time.',
  faqQuestionsVi: [
    'Cung cấp dịch vụ cảnh quan chất lượng cao',
    '01. Làm thế nào để bắt đầu với dịch vụ của chúng tôi?',
    '03. Một dự án cảnh quan mất bao lâu?',
  ],
  faqAnswersVi: [
    'Lapla cung cấp dịch vụ cảnh quan toàn diện từ thiết kế, thi công đến bảo dưỡng. Với cam kết chất lượng cao và bền vững, chúng tôi đồng hành cùng mọi công trình từ dân dụng đến thương mại.',
    'Liên hệ qua form báo giá hoặc điện thoại. Đội ngũ chuyên gia sẽ tư vấn và khảo sát miễn phí, đề xuất giải pháp phù hợp nhất với nhu cầu của bạn.',
    'Thời gian phụ thuộc vào quy mô và độ phức tạp. Dự án nhỏ thường 1–2 tuần, dự án lớn 1–6 tháng. Chúng tôi luôn cam kết tiến độ đã thỏa thuận với khách hàng.',
  ],
  faqQuestionsEn: [
    'Providing Dependable, High-Quality Lawn And Garden Care.',
    '01. How Do I Get Started With Your Services?',
    '03. How Long Does A Landscaping Project Take?',
  ],
  faqAnswersEn: [
    'Lapla provides comprehensive landscaping services from design to construction and maintenance, committed to high quality and sustainability for every residential and commercial project.',
    'Contact us via our quote form or phone. Our expert team will provide a free consultation and site survey to propose the most suitable solution for your specific needs.',
    'Timeline depends on scale and complexity. Small projects typically take 1–2 weeks, while larger ones may take 1–6 months. We always commit to the agreed schedule.',
  ],

  processEyebrowVi: 'Giải pháp công ty',
  processEyebrowEn: 'Our Company Solution',
  processTitleVi: 'Thiết kế cảnh quan chuyên nghiệp & tận tâm',
  processTitleEn: 'Boutique Landscape Design & Garden',
  processVi: [
    'Tư vấn & Khảo sát',
    'Tích hợp cây bản địa',
    'Hệ thống tưới tiêu',
    'Bảo dưỡng định kỳ',
  ],
  processEn: [
    'Discovery & Consultation',
    'Native Plant Integration',
    'Water-Efficient Irrigation',
    'Ongoing Maintenance',
  ],

  missionEyebrowVi: 'Sứ mệnh của chúng tôi',
  missionEyebrowEn: 'Our Mission',
  missionTitleVi: 'Định chuẩn mới cho không gian xanh Việt Nam',
  missionTitleEn: "Setting the Standard for Vietnam's Green Spaces",
  missionDesc1Vi:
    'Tại Lapla, chúng tôi hình dung một Việt Nam nơi mỗi không gian ngoài trời phản ánh vẻ đẹp, sự bền vững và chuyên môn đỉnh cao. Sứ mệnh của chúng tôi là dẫn dắt ngành cảnh quan, được công nhận qua cam kết về chất lượng, đổi mới sáng tạo và dịch vụ khách hàng xuất sắc.',
  missionDesc1En:
    'At Lapla, we envision a Vietnam where every outdoor space reflects beauty, sustainability and expert craftsmanship. Our mission is to lead the landscaping industry, recognized for our commitment to excellence, innovation, and exceptional customer service.',
  missionDesc2Vi:
    'Chúng tôi đam mê tạo ra cảnh quan không chỉ nâng tầm giá trị thẩm mỹ mà còn làm giàu thêm môi trường tự nhiên — mang lại niềm vui lâu dài và lợi ích sinh thái cho khách hàng.',
  missionDesc2En:
    'We are passionate about creating landscapes that not only elevate the visual appeal of properties but also enrich the natural environment — providing long-lasting joy and ecological benefits to our clients.',

  ctaEyebrowVi: 'Bắt đầu hành trình',
  ctaEyebrowEn: 'Start Your Journey',
  ctaTitleVi: 'Hãy Cùng Tạo Ra Điều Gì Đó Xanh',
  ctaTitleEn: "Let's Create Something Green Together",
  ctaDescVi:
    'Từ ý tưởng đến hoàn thiện — Lapla cung cấp giải pháp cảnh quan trọn gói theo tầm nhìn của bạn.',
  ctaDescEn:
    'From concept to completion — Lapla delivers full-package landscape solutions shaped by your vision.',
}

async function main() {
  const existing = await prisma.aboutPage.findUnique({ where: { id: 'main' } })
  if (existing) {
    console.log('about_page đã có dữ liệu, bỏ qua seed (tránh ghi đè nội dung admin đã sửa).')
  } else {
    await prisma.aboutPage.create({ data: content })
    console.log('Đã seed nội dung trang /about.')
  }

  // Bảng timeline_item được giữ lại dù không còn dùng — xác nhận không bị mất.
  console.log('timeline_item vẫn còn:', await prisma.timelineItem.count(), 'bản ghi')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
