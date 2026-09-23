/**
 * Nội dung trang /about, sửa tại /admin/about.
 *
 * Module này KHÔNG được import `prisma`: cả component client
 * (`AboutPageContent`) lẫn form admin đều dùng type ở đây, kéo Prisma vào sẽ
 * làm bundle trình duyệt vỡ vì `pg` cần `dns`. Hàm đọc DB nằm ở
 * `src/lib/getAboutContent.ts`.
 */
export type AboutContent = {
  heroEyebrowVi: string; heroEyebrowEn: string
  heroTitleVi: string; heroTitleEn: string
  heroDescVi: string; heroDescEn: string

  introEyebrowVi: string; introEyebrowEn: string
  introTitleVi: string; introTitleEn: string
  introDescVi: string; introDescEn: string
  featuresVi: string[]; featuresEn: string[]
  badgeValue: string; badgeLabelVi: string; badgeLabelEn: string
  ownerName: string; ownerRoleVi: string; ownerRoleEn: string
  phoneLabelVi: string; phoneLabelEn: string; phone: string
  images: string[]

  statsTitleVi: string; statsTitleEn: string
  statValues: string[]; statLabelsVi: string[]; statLabelsEn: string[]

  faqEyebrowVi: string; faqEyebrowEn: string
  faqTitleVi: string; faqTitleEn: string
  faqDescVi: string; faqDescEn: string
  faqQuestionsVi: string[]; faqAnswersVi: string[]
  faqQuestionsEn: string[]; faqAnswersEn: string[]

  processEyebrowVi: string; processEyebrowEn: string
  processTitleVi: string; processTitleEn: string
  processVi: string[]; processEn: string[]

  missionEyebrowVi: string; missionEyebrowEn: string
  missionTitleVi: string; missionTitleEn: string
  missionDesc1Vi: string; missionDesc1En: string
  missionDesc2Vi: string; missionDesc2En: string

  ctaEyebrowVi: string; ctaEyebrowEn: string
  ctaTitleVi: string; ctaTitleEn: string
  ctaDescVi: string; ctaDescEn: string
}

/** Bản ghi rỗng — dùng khi DB chưa seed hoặc truy vấn lỗi, để trang không vỡ. */
export const EMPTY_ABOUT: AboutContent = {
  heroEyebrowVi: '', heroEyebrowEn: '',
  heroTitleVi: '', heroTitleEn: '',
  heroDescVi: '', heroDescEn: '',
  introEyebrowVi: '', introEyebrowEn: '',
  introTitleVi: '', introTitleEn: '',
  introDescVi: '', introDescEn: '',
  featuresVi: [], featuresEn: [],
  badgeValue: '', badgeLabelVi: '', badgeLabelEn: '',
  ownerName: '', ownerRoleVi: '', ownerRoleEn: '',
  phoneLabelVi: '', phoneLabelEn: '', phone: '',
  images: [],
  statsTitleVi: '', statsTitleEn: '',
  statValues: [], statLabelsVi: [], statLabelsEn: [],
  faqEyebrowVi: '', faqEyebrowEn: '',
  faqTitleVi: '', faqTitleEn: '',
  faqDescVi: '', faqDescEn: '',
  faqQuestionsVi: [], faqAnswersVi: [],
  faqQuestionsEn: [], faqAnswersEn: [],
  processEyebrowVi: '', processEyebrowEn: '',
  processTitleVi: '', processTitleEn: '',
  processVi: [], processEn: [],
  missionEyebrowVi: '', missionEyebrowEn: '',
  missionTitleVi: '', missionTitleEn: '',
  missionDesc1Vi: '', missionDesc1En: '',
  missionDesc2Vi: '', missionDesc2En: '',
  ctaEyebrowVi: '', ctaEyebrowEn: '',
  ctaTitleVi: '', ctaTitleEn: '',
  ctaDescVi: '', ctaDescEn: '',
}

/**
 * Tách "200+" thành { n: 200, suffix: "+" } cho hiệu ứng đếm số.
 * Giá trị không có phần số (ví dụ "—") trả n = 0 và giữ nguyên làm suffix.
 */
export function parseStatValue(raw: string): { n: number; suffix: string } {
  const m = /^(\d+)(.*)$/.exec(raw.trim())
  if (!m) return { n: 0, suffix: raw.trim() }
  return { n: Number(m[1]), suffix: m[2] }
}
