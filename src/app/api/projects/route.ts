import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseProject } from '@/lib/entityInput'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const where: Record<string, unknown> = {}
  // Khách vãng lai chỉ thấy dự án đã publish; admin (có session) thấy tất cả.
  const isAdmin = await verifySession()
  if (!isAdmin || searchParams.get('published') === 'true') where.published = true
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

  try {
    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(projects)
  } catch (err) {
    return handleApiError(err, 'GET /api/projects error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await readJson(request)
    const project = await prisma.project.create({ data: parseProject(body) })
    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/projects error:')
  }
}
