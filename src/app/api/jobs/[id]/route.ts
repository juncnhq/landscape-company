import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

// GET /api/jobs/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const job = await prisma.jobPosition.findUnique({ where: { id } })
    if (!job) return NextResponse.json({ error: 'Job position not found' }, { status: 404 })
    return NextResponse.json(job)
  } catch (error) {
    console.error('[GET /api/jobs/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/jobs/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()
    const { titleVi, titleEn, typeVi, typeEn, locationVi, locationEn, descVi, descEn, order, published } = body

    const existing = await prisma.jobPosition.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Job position not found' }, { status: 404 })

    const job = await prisma.jobPosition.update({
      where: { id },
      data: {
        ...(titleVi !== undefined && { titleVi }),
        ...(titleEn !== undefined && { titleEn }),
        ...(typeVi !== undefined && { typeVi }),
        ...(typeEn !== undefined && { typeEn }),
        ...(locationVi !== undefined && { locationVi }),
        ...(locationEn !== undefined && { locationEn }),
        ...(descVi !== undefined && { descVi }),
        ...(descEn !== undefined && { descEn }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('[PUT /api/jobs/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/jobs/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = await prisma.jobPosition.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Job position not found' }, { status: 404 })

    await prisma.jobPosition.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE /api/jobs/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
