import { prisma } from './prisma'
import { AboutContent, EMPTY_ABOUT } from './aboutContent'

/**
 * Đọc nội dung trang /about phía server.
 *
 * Tách khỏi `aboutContent.ts` vì file đó được import cả từ component client —
 * import `prisma` ở đó sẽ kéo `pg` vào bundle trình duyệt và làm hỏng build.
 *
 * DB lỗi thì trả bản rỗng thay vì ném: trang about hỏng hoàn toàn vì một truy
 * vấn lỗi tệ hơn nhiều so với việc thiếu vài dòng chữ.
 */
export async function getAboutContent(): Promise<AboutContent> {
  try {
    const row = await prisma.aboutPage.findUnique({ where: { id: 'main' } })
    if (!row) return EMPTY_ABOUT
    return { ...EMPTY_ABOUT, ...row }
  } catch (err) {
    console.error('getAboutContent error:', err)
    return EMPTY_ABOUT
  }
}
