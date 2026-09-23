/**
 * Parser cho từng entity của admin.
 *
 * Mỗi hàm nhận body thô và trả về đúng object đưa xuống Prisma.
 * **POST và PUT dùng chung một parser** — trước đây PUT không validate gì,
 * nên admin xoá trắng ô "Tên dự án" rồi bấm Lưu là DB ghi chuỗi rỗng và
 * trang public hiện trống mà không ai biết.
 */

import {
  reqStr,
  optStr,
  reqSlug,
  strArray,
  bool,
  intRange,
  isoDate,
  imageUrl,
  hexColor,
  oneOf,
} from '@/lib/validate'

/** Mô tả dài / rich text — nới trần độ dài so với field thường. */
const LONG = 20000
const RICH = 200000

export const PROJECT_CATEGORIES = ['Golf', 'Resort', 'Urban', 'Construction', 'Artwork'] as const
export const NEWS_TYPES = ['general', 'internal_event', 'industry', 'project'] as const

export function parseProject(b: Record<string, unknown>) {
  return {
    slug: reqSlug(b.slug),
    title: reqStr(b.title, 'Tên dự án (VI)'),
    titleEn: reqStr(b.titleEn, 'Tên dự án (EN)'),
    category: oneOf(b.category, PROJECT_CATEGORIES, 'Golf', 'Danh mục'),
    location: reqStr(b.location, 'Địa điểm'),
    client: reqStr(b.client, 'Khách hàng'),
    year: reqStr(b.year, 'Năm', 20),
    area: optStr(b.area, 'Diện tích', 100, '—'),
    duration: optStr(b.duration, 'Thời gian', 100, '—'),
    image: imageUrl(b.image, 'Ảnh đại diện', true),
    sketchImage: imageUrl(b.sketchImage, 'Ảnh vẽ tay'),
    images: strArray(b.images, 'Ảnh gallery', 60, 2000),
    description: reqStr(b.description, 'Mô tả (VI)', LONG),
    descriptionEn: reqStr(b.descriptionEn, 'Mô tả (EN)', LONG),
    published: bool(b.published, true),
  }
}

export function parseNews(b: Record<string, unknown>) {
  return {
    slug: reqSlug(b.slug),
    titleVi: reqStr(b.titleVi, 'Tiêu đề (VI)'),
    titleEn: reqStr(b.titleEn, 'Tiêu đề (EN)'),
    summaryVi: optStr(b.summaryVi, 'Tóm tắt (VI)', LONG),
    summaryEn: optStr(b.summaryEn, 'Tóm tắt (EN)', LONG),
    contentVi: optStr(b.contentVi, 'Nội dung (VI)', RICH),
    contentEn: optStr(b.contentEn, 'Nội dung (EN)', RICH),
    image: imageUrl(b.image, 'Ảnh đại diện'),
    categoryVi: optStr(b.categoryVi, 'Danh mục (VI)', 120),
    categoryEn: optStr(b.categoryEn, 'Danh mục (EN)', 120),
    newsType: oneOf(b.newsType, NEWS_TYPES, 'general', 'Loại tin'),
    date: isoDate(b.date),
    readTime: intRange(b.readTime, 4, 1, 600, 'Thời gian đọc'),
    published: bool(b.published, true),
  }
}

export function parseService(b: Record<string, unknown>) {
  return {
    slug: reqSlug(b.slug),
    order: intRange(b.order, 0, 0, 9999, 'Order'),
    icon: optStr(b.icon, 'Icon', 40),
    titleVi: reqStr(b.titleVi, 'Tiêu đề (VI)'),
    titleEn: reqStr(b.titleEn, 'Tiêu đề (EN)'),
    subtitleVi: optStr(b.subtitleVi, 'Phụ đề (VI)', 500),
    subtitleEn: optStr(b.subtitleEn, 'Phụ đề (EN)', 500),
    descVi: reqStr(b.descVi, 'Mô tả (VI)', LONG),
    descEn: reqStr(b.descEn, 'Mô tả (EN)', LONG),
    tag: optStr(b.tag, 'Tag', 100),
    bulletsVi: strArray(b.bulletsVi, 'Gạch đầu dòng (VI)'),
    bulletsEn: strArray(b.bulletsEn, 'Gạch đầu dòng (EN)'),
    image: imageUrl(b.image, 'Ảnh đại diện'),
    images: strArray(b.images, 'Ảnh gallery', 60, 2000),
    published: bool(b.published, true),
  }
}

export function parsePartner(b: Record<string, unknown>) {
  const currentYear = new Date().getFullYear()
  return {
    order: intRange(b.order, 0, 0, 9999, 'Order'),
    name: reqStr(b.name, 'Tên đối tác'),
    sectorVi: optStr(b.sectorVi, 'Lĩnh vực (VI)', 200),
    sectorEn: optStr(b.sectorEn, 'Lĩnh vực (EN)', 200),
    descVi: optStr(b.descVi, 'Mô tả (VI)', LONG),
    descEn: optStr(b.descEn, 'Mô tả (EN)', LONG),
    founded: intRange(b.founded, 2000, 1800, currentYear, 'Năm thành lập'),
    hq: optStr(b.hq, 'Trụ sở', 200),
    statLabelVi: optStr(b.statLabelVi, 'Stat Label (VI)', 200),
    statLabelEn: optStr(b.statLabelEn, 'Stat Label (EN)', 200),
    statValue: optStr(b.statValue, 'Stat Value', 100),
    projectsVi: strArray(b.projectsVi, 'Dự án tiêu biểu (VI)'),
    projectsEn: strArray(b.projectsEn, 'Dự án tiêu biểu (EN)'),
    highlightVi: optStr(b.highlightVi, 'Điểm nổi bật (VI)', LONG),
    highlightEn: optStr(b.highlightEn, 'Điểm nổi bật (EN)', LONG),
    logo: imageUrl(b.logo, 'Logo đối tác'),
    images: strArray(b.images, 'Ảnh gallery', 60, 2000),
    published: bool(b.published, true),
  }
}

export function parseMemberCompany(b: Record<string, unknown>) {
  return {
    order: intRange(b.order, 0, 0, 9999, 'Order'),
    abbr: reqStr(b.abbr, 'Viết tắt', 20),
    name: reqStr(b.name, 'Tên công ty'),
    tagline: optStr(b.tagline, 'Tagline', 300),
    descVi: optStr(b.descVi, 'Mô tả (VI)', LONG),
    descEn: optStr(b.descEn, 'Mô tả (EN)', LONG),
    accent: hexColor(b.accent, '#328442'),
    images: strArray(b.images, 'Ảnh gallery', 60, 2000),
    published: bool(b.published, true),
  }
}

export function parseHeroSlide(b: Record<string, unknown>) {
  return {
    order: intRange(b.order, 0, 0, 9999, 'Order'),
    image: imageUrl(b.image, 'Ảnh slide', true),
    labelVi: reqStr(b.labelVi, 'Nhãn (VI)', 200),
    labelEn: reqStr(b.labelEn, 'Nhãn (EN)', 200),
    published: bool(b.published, true),
  }
}

export function parseMedia(b: Record<string, unknown>) {
  return {
    url: imageUrl(b.url, 'Đường dẫn ảnh', true),
    filename: optStr(b.filename, 'Tên file', 300),
    folder: optStr(b.folder, 'Thư mục', 100, 'gallery'),
  }
}

export function parseJobPosition(b: Record<string, unknown>) {
  return {
    order: intRange(b.order, 0, 0, 9999, 'Order'),
    titleVi: reqStr(b.titleVi, 'Tên vị trí (VI)'),
    titleEn: reqStr(b.titleEn, 'Tên vị trí (EN)'),
    typeVi: optStr(b.typeVi, 'Hình thức (VI)', 100, 'Toàn thời gian'),
    typeEn: optStr(b.typeEn, 'Hình thức (EN)', 100, 'Full-time'),
    locationVi: reqStr(b.locationVi, 'Địa điểm (VI)', 200),
    locationEn: reqStr(b.locationEn, 'Địa điểm (EN)', 200),
    descVi: optStr(b.descVi, 'Mô tả công việc (VI)', LONG),
    descEn: optStr(b.descEn, 'Mô tả công việc (EN)', LONG),
    published: bool(b.published, true),
  }
}

/**
 * Nội dung trang /about — một bản ghi duy nhất.
 *
 * Mọi field đều `optStr`: admin để trống một ô nghĩa là ẩn dòng đó trên trang,
 * không phải lỗi. Các danh sách lặp lưu dạng mảng song song (câu hỏi ↔ câu trả
 * lời, chỉ số ↔ nhãn) nên được cắt về cùng độ dài ở `zipLen` bên dưới — lệch
 * độ dài sẽ khiến trang render ra ô trống hoặc mất nội dung.
 */
export function parseAboutPage(b: Record<string, unknown>) {
  const featuresVi = strArray(b.featuresVi, 'Tính năng (VI)', 12, 300)
  const featuresEn = strArray(b.featuresEn, 'Tính năng (EN)', 12, 300)

  const statValues = strArray(b.statValues, 'Giá trị chỉ số', 8, 20)
  const statLabelsVi = strArray(b.statLabelsVi, 'Nhãn chỉ số (VI)', 8, 200)
  const statLabelsEn = strArray(b.statLabelsEn, 'Nhãn chỉ số (EN)', 8, 200)

  const faqQuestionsVi = strArray(b.faqQuestionsVi, 'Câu hỏi (VI)', 12, 500)
  const faqAnswersVi = strArray(b.faqAnswersVi, 'Trả lời (VI)', 12, LONG)
  const faqQuestionsEn = strArray(b.faqQuestionsEn, 'Câu hỏi (EN)', 12, 500)
  const faqAnswersEn = strArray(b.faqAnswersEn, 'Trả lời (EN)', 12, LONG)

  const processVi = strArray(b.processVi, 'Bước quy trình (VI)', 12, 200)
  const processEn = strArray(b.processEn, 'Bước quy trình (EN)', 12, 200)

  return {
    heroEyebrowVi: optStr(b.heroEyebrowVi, 'Eyebrow hero (VI)', 200),
    heroEyebrowEn: optStr(b.heroEyebrowEn, 'Eyebrow hero (EN)', 200),
    heroTitleVi: optStr(b.heroTitleVi, 'Tiêu đề hero (VI)', 300),
    heroTitleEn: optStr(b.heroTitleEn, 'Tiêu đề hero (EN)', 300),
    heroDescVi: optStr(b.heroDescVi, 'Mô tả hero (VI)', LONG),
    heroDescEn: optStr(b.heroDescEn, 'Mô tả hero (EN)', LONG),

    introEyebrowVi: optStr(b.introEyebrowVi, 'Eyebrow giới thiệu (VI)', 200),
    introEyebrowEn: optStr(b.introEyebrowEn, 'Eyebrow giới thiệu (EN)', 200),
    introTitleVi: optStr(b.introTitleVi, 'Tiêu đề giới thiệu (VI)', 300),
    introTitleEn: optStr(b.introTitleEn, 'Tiêu đề giới thiệu (EN)', 300),
    introDescVi: optStr(b.introDescVi, 'Mô tả giới thiệu (VI)', LONG),
    introDescEn: optStr(b.introDescEn, 'Mô tả giới thiệu (EN)', LONG),
    featuresVi,
    featuresEn,
    badgeValue: optStr(b.badgeValue, 'Số trên badge', 20),
    badgeLabelVi: optStr(b.badgeLabelVi, 'Nhãn badge (VI)', 100),
    badgeLabelEn: optStr(b.badgeLabelEn, 'Nhãn badge (EN)', 100),
    ownerName: optStr(b.ownerName, 'Tên người đại diện', 200),
    ownerRoleVi: optStr(b.ownerRoleVi, 'Chức danh (VI)', 200),
    ownerRoleEn: optStr(b.ownerRoleEn, 'Chức danh (EN)', 200),
    phoneLabelVi: optStr(b.phoneLabelVi, 'Nhãn điện thoại (VI)', 100),
    phoneLabelEn: optStr(b.phoneLabelEn, 'Nhãn điện thoại (EN)', 100),
    phone: optStr(b.phone, 'Số điện thoại', 50),
    images: strArray(b.images, 'Ảnh collage', 10, 2000),

    statsTitleVi: optStr(b.statsTitleVi, 'Tiêu đề khối chỉ số (VI)', 300),
    statsTitleEn: optStr(b.statsTitleEn, 'Tiêu đề khối chỉ số (EN)', 300),
    statValues,
    statLabelsVi,
    statLabelsEn,

    faqEyebrowVi: optStr(b.faqEyebrowVi, 'Eyebrow FAQ (VI)', 200),
    faqEyebrowEn: optStr(b.faqEyebrowEn, 'Eyebrow FAQ (EN)', 200),
    faqTitleVi: optStr(b.faqTitleVi, 'Tiêu đề FAQ (VI)', 300),
    faqTitleEn: optStr(b.faqTitleEn, 'Tiêu đề FAQ (EN)', 300),
    faqDescVi: optStr(b.faqDescVi, 'Mô tả FAQ (VI)', LONG),
    faqDescEn: optStr(b.faqDescEn, 'Mô tả FAQ (EN)', LONG),
    faqQuestionsVi,
    faqAnswersVi,
    faqQuestionsEn,
    faqAnswersEn,

    processEyebrowVi: optStr(b.processEyebrowVi, 'Eyebrow quy trình (VI)', 200),
    processEyebrowEn: optStr(b.processEyebrowEn, 'Eyebrow quy trình (EN)', 200),
    processTitleVi: optStr(b.processTitleVi, 'Tiêu đề quy trình (VI)', 300),
    processTitleEn: optStr(b.processTitleEn, 'Tiêu đề quy trình (EN)', 300),
    processVi,
    processEn,

    missionEyebrowVi: optStr(b.missionEyebrowVi, 'Eyebrow sứ mệnh (VI)', 200),
    missionEyebrowEn: optStr(b.missionEyebrowEn, 'Eyebrow sứ mệnh (EN)', 200),
    missionTitleVi: optStr(b.missionTitleVi, 'Tiêu đề sứ mệnh (VI)', 300),
    missionTitleEn: optStr(b.missionTitleEn, 'Tiêu đề sứ mệnh (EN)', 300),
    missionDesc1Vi: optStr(b.missionDesc1Vi, 'Đoạn 1 sứ mệnh (VI)', LONG),
    missionDesc1En: optStr(b.missionDesc1En, 'Đoạn 1 sứ mệnh (EN)', LONG),
    missionDesc2Vi: optStr(b.missionDesc2Vi, 'Đoạn 2 sứ mệnh (VI)', LONG),
    missionDesc2En: optStr(b.missionDesc2En, 'Đoạn 2 sứ mệnh (EN)', LONG),

    ctaEyebrowVi: optStr(b.ctaEyebrowVi, 'Eyebrow CTA (VI)', 200),
    ctaEyebrowEn: optStr(b.ctaEyebrowEn, 'Eyebrow CTA (EN)', 200),
    ctaTitleVi: optStr(b.ctaTitleVi, 'Tiêu đề CTA (VI)', 300),
    ctaTitleEn: optStr(b.ctaTitleEn, 'Tiêu đề CTA (EN)', 300),
    ctaDescVi: optStr(b.ctaDescVi, 'Mô tả CTA (VI)', LONG),
    ctaDescEn: optStr(b.ctaDescEn, 'Mô tả CTA (EN)', LONG),
  }
}
