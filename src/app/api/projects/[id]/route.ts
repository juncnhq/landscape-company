import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseProject } from '@/lib/entityInput'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({ where: { id } })
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    return NextResponse.json(project)
  } catch (err) {
    return handleApiError(err, 'GET /api/projects/[id] error:')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    const body = await readJson(request)
    const project = await prisma.project.update({
      where: { id },
      data: parseProject(body),
    })
    return NextResponse.json(project)
  } catch (err) {
    return handleApiError(err, 'PUT /api/projects/[id] error:')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/projects/[id] error:')
  }
}
