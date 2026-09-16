import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError, badRequest, missingFields, toInt } from '@/lib/apiError'

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
    const body = await request.json()
    const invalid = missingFields(body, ['slug', 'titleVi', 'titleEn'])
    if (invalid) return badRequest(invalid)

    const article = await prisma.newsArticle.create({
      data: {
        slug: body.slug,
        titleVi: body.titleVi,
        titleEn: body.titleEn,
        summaryVi: body.summaryVi ?? '',
        summaryEn: body.summaryEn ?? '',
        contentVi: body.contentVi ?? '',
        contentEn: body.contentEn ?? '',
        image: body.image ?? '',
        categoryVi: body.categoryVi ?? '',
        categoryEn: body.categoryEn ?? '',
        newsType: body.newsType ?? 'general',
        date: body.date ?? new Date().toISOString().slice(0, 10),
        readTime: toInt(body.readTime, 4),
        published: body.published ?? true,
      },
    })
    return NextResponse.json(article, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/news error:')
  }
}
