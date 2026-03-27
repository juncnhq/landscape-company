import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Category } from '@/generated/prisma/client'

// GET /api/projects
// Query params: category, published, page, limit, search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const category = searchParams.get('category')?.toUpperCase() as Category | undefined
    const published = searchParams.get('published')
    const search = searchParams.get('search')
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 20)))

    const where = {
      ...(category && Object.values(Category).includes(category) ? { category } : {}),
      ...(published !== null ? { published: published === 'true' } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { titleEn: { contains: search, mode: 'insensitive' as const } },
              { location: { contains: search, mode: 'insensitive' as const } },
              { client: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    }

    const [total, data] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        include: { images: { orderBy: { order: 'asc' } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ])

    return NextResponse.json({
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[GET /api/projects]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/projects
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      slug,
      title,
      titleEn,
      category,
      location,
      area,
      duration,
      client,
      year,
      image,
      description,
      descriptionEn,
      published,
      images, // string[]
    } = body

    if (!slug || !title || !category) {
      return NextResponse.json(
        { error: 'slug, title, and category are required' },
        { status: 400 }
      )
    }

    if (!Object.values(Category).includes(category.toUpperCase())) {
      return NextResponse.json(
        { error: `category must be one of: ${Object.values(Category).join(', ')}` },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        slug,
        title,
        titleEn,
        category: category.toUpperCase() as Category,
        location,
        area,
        duration,
        client,
        year,
        image,
        description,
        descriptionEn,
        published: published ?? true,
        images: {
          create: (images as string[] | undefined)?.map((url, order) => ({ url, order })) ?? [],
        },
      },
      include: { images: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error: unknown) {
    console.error('[POST /api/projects]', error)
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'A project with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
