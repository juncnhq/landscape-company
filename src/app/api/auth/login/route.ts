import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!validateCredentials(email, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await createSession()
  return NextResponse.json({ success: true })
}
