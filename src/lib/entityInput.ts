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

export function parseTimelineItem(b: Record<string, unknown>) {
  return {
    order: intRange(b.order, 0, 0, 9999, 'Order'),
    year: reqStr(b.year, 'Năm / Giai đoạn', 50),
    titleVi: reqStr(b.titleVi, 'Tiêu đề (VI)'),
    titleEn: reqStr(b.titleEn, 'Tiêu đề (EN)'),
    descVi: optStr(b.descVi, 'Mô tả (VI)', LONG),
    descEn: optStr(b.descEn, 'Mô tả (EN)', LONG),
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
