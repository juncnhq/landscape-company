import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const where: Record<string, unknown> = {}
  if (category && category !== 'All') {
    where.category = category
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { titleEn: { contains: search, mode: 'insensitive' } },
      { client: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
    ]
  }

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  const body = await request.json()

  const project = await prisma.project.create({
    data: {
      slug: body.slug,
      title: body.title,
      titleEn: body.titleEn,
      category: body.category,
      location: body.location,
      area: body.area || '—',
      duration: body.duration || '—',
      client: body.client,
      year: body.year,
      image: body.image,
      images: body.images || [],
      description: body.description,
      descriptionEn: body.descriptionEn,
      published: body.published ?? true,
    },
  })

  return NextResponse.json(project, { status: 201 })
}
