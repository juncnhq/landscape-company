import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = await prisma.newsArticle.findUnique({ where: { id } })
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  const body = await request.json()

  const article = await prisma.newsArticle.update({
    where: { id },
    data: {
      slug: body.slug,
      titleVi: body.titleVi,
      titleEn: body.titleEn,
      summaryVi: body.summaryVi,
      summaryEn: body.summaryEn,
      contentVi: body.contentVi,
      contentEn: body.contentEn,
      image: body.image,
      categoryVi: body.categoryVi,
      categoryEn: body.categoryEn,
      date: body.date,
      readTime: body.readTime,
      published: body.published,
    },
  })
  return NextResponse.json(article)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  const { id } = await params
  await prisma.newsArticle.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
