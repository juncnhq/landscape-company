import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Category } from '@/generated/prisma/client'

type Params = { params: Promise<{ id: string }> }

// GET /api/projects/[id]  — accepts id OR slug
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const project = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: { images: { orderBy: { order: 'asc' } } },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('[GET /api/projects/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/projects/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
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
      images, // string[] | undefined — if provided, replaces all images
    } = body

    const existing = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (category && !Object.values(Category).includes(category.toUpperCase())) {
      return NextResponse.json(
        { error: `category must be one of: ${Object.values(Category).join(', ')}` },
        { status: 400 }
      )
    }

    const project = await prisma.project.update({
      where: { id: existing.id },
      data: {
        ...(slug !== undefined && { slug }),
        ...(title !== undefined && { title }),
        ...(titleEn !== undefined && { titleEn }),
        ...(category !== undefined && { category: category.toUpperCase() as Category }),
        ...(location !== undefined && { location }),
        ...(area !== undefined && { area }),
        ...(duration !== undefined && { duration }),
        ...(client !== undefined && { client }),
        ...(year !== undefined && { year }),
        ...(image !== undefined && { image }),
        ...(description !== undefined && { description }),
        ...(descriptionEn !== undefined && { descriptionEn }),
        ...(published !== undefined && { published }),
        ...(images !== undefined && {
          images: {
            deleteMany: {},
            create: (images as string[]).map((url, order) => ({ url, order })),
          },
        }),
      },
      include: { images: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json(project)
  } catch (error: unknown) {
    console.error('[PUT /api/projects/[id]]', error)
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'A project with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/projects/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    await prisma.project.delete({ where: { id: existing.id } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE /api/projects/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
