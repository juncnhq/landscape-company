import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

// GET /api/news/[id]  — accepts id OR slug
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const article = await prisma.newsArticle.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    })
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    return NextResponse.json(article)
  } catch (error) {
    console.error('[GET /api/news/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/news/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()
    const {
      slug, titleVi, titleEn, summaryVi, summaryEn,
      contentVi, contentEn, image, published, publishedAt,
    } = body

    const existing = await prisma.newsArticle.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    })
    if (!existing) return NextResponse.json({ error: 'Article not found' }, { status: 404 })

    // Auto-set publishedAt when publishing for the first time
    const resolvedPublishedAt =
      publishedAt !== undefined
        ? new Date(publishedAt)
        : published === true && !existing.publishedAt
        ? new Date()
        : undefined

    const article = await prisma.newsArticle.update({
      where: { id: existing.id },
      data: {
        ...(slug !== undefined && { slug }),
        ...(titleVi !== undefined && { titleVi }),
        ...(titleEn !== undefined && { titleEn }),
        ...(summaryVi !== undefined && { summaryVi }),
        ...(summaryEn !== undefined && { summaryEn }),
        ...(contentVi !== undefined && { contentVi }),
        ...(contentEn !== undefined && { contentEn }),
        ...(image !== undefined && { image }),
        ...(published !== undefined && { published }),
        ...(resolvedPublishedAt !== undefined && { publishedAt: resolvedPublishedAt }),
      },
    })

    return NextResponse.json(article)
  } catch (error: unknown) {
    console.error('[PUT /api/news/[id]]', error)
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/news/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = await prisma.newsArticle.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    })
    if (!existing) return NextResponse.json({ error: 'Article not found' }, { status: 404 })

    await prisma.newsArticle.delete({ where: { id: existing.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE /api/news/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
