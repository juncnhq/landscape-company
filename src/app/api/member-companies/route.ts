import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { readJson } from '@/lib/validate'
import { parseMemberCompany } from '@/lib/entityInput'

export async function GET() {
  try {
    const where: Record<string, unknown> = {}
    if (!(await verifySession())) where.published = true

    const companies = await prisma.memberCompany.findMany({
      where,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(companies)
  } catch (err) {
    return handleApiError(err, 'GET /api/member-companies error:')
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifySession())) return unauthorized()
  try {
    const body = await readJson(request)
    const item = await prisma.memberCompany.create({ data: parseMemberCompany(body) })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return handleApiError(err, 'POST /api/member-companies error:')
  }
}
