import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleApiError } from '@/lib/apiError'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany()
    // Return as object { key: value }
    const obj: Record<string, string> = {}
    for (const s of settings) obj[s.key] = s.value
    return NextResponse.json(obj)
  } catch (err) {
    return handleApiError(err, 'GET /api/site-settings error:')
  }
}
