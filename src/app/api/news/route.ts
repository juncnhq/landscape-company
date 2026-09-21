import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseNews } from '@/lib/entityInput'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const category = searchParams.get('category')
    const newsType = searchParams.get('newsType')
    const where: Record<string, unknown> = {}
    if (category) where.categoryEn = category
    if (newsType) where.newsType = newsType
    // Khách vãng lai chỉ thấy bài đã publish; admin (có session) thấy tất cả.
    if (!(await verifySession())) where.published = true

    const articles = await prisma.newsArticle.findMany({
      where,
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(articles)
  } catch (err) {
    return handleApiError(err, 'GET /api/news error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await readJson(request)
    const item = await prisma.newsArticle.create({ data: parseNews(body) })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/news error:')
  }
}
