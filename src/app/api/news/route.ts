import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/news
// Query params: published, page, limit, search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const published = searchParams.get('published')
    const search = searchParams.get('search')
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 20)))

    const where = {
      ...(published !== null ? { published: published === 'true' } : {}),
      ...(search
        ? {
            OR: [
              { titleVi: { contains: search, mode: 'insensitive' as const } },
              { titleEn: { contains: search, mode: 'insensitive' as const } },
              { summaryVi: { contains: search, mode: 'insensitive' as const } },
              { summaryEn: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    }

    const [total, data] = await Promise.all([
      prisma.newsArticle.count({ where }),
      prisma.newsArticle.findMany({
        where,
        select: {
          id: true, slug: true, titleVi: true, titleEn: true,
          summaryVi: true, summaryEn: true, image: true,
          published: true, publishedAt: true, createdAt: true,
        },
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ])

    return NextResponse.json({
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[GET /api/news]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/news
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      slug, titleVi, titleEn, summaryVi, summaryEn,
      contentVi, contentEn, image, published, publishedAt,
    } = body

    if (!slug || !titleVi || !titleEn) {
      return NextResponse.json(
        { error: 'slug, titleVi, and titleEn are required' },
        { status: 400 }
      )
    }

    const article = await prisma.newsArticle.create({
      data: {
        slug, titleVi, titleEn, summaryVi, summaryEn,
        contentVi, contentEn, image,
        published: published ?? false,
        publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error: unknown) {
    console.error('[POST /api/news]', error)
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
