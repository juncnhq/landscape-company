import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, createSession } from '@/lib/auth'

/**
 * Chặn dò mật khẩu: tối đa MAX_ATTEMPTS lần sai trong WINDOW_MS cho mỗi IP.
 * Lưu trong RAM của process — đủ cho một instance, mất khi restart. Nếu sau
 * này chạy nhiều instance thì cần chuyển sang Redis hoặc DB.
 */
const MAX_ATTEMPTS = 8
const WINDOW_MS = 10 * 60 * 1000

const attempts = new Map<string, { count: number; resetAt: number }>()

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function tooManyAttempts(ip: string): boolean {
  const rec = attempts.get(ip)
  if (!rec || Date.now() > rec.resetAt) return false
  return rec.count >= MAX_ATTEMPTS
}

function recordFailure(ip: string) {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return
  }
  rec.count += 1
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request)

  if (tooManyAttempts(ip)) {
    return NextResponse.json(
      { error: 'Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 10 phút.' },
      { status: 429 }
    )
  }

  // Body hỏng / không phải JSON trước đây làm route throw → 500.
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Dữ liệu gửi lên không hợp lệ.' }, { status: 400 })
  }

  const { email, password } = (body ?? {}) as { email?: unknown; password?: unknown }

  // validateCredentials dùng Buffer.from(...) nên non-string sẽ throw → 500.
  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Vui lòng nhập email và mật khẩu.' }, { status: 400 })
  }
  if (!email.trim() || !password) {
    return NextResponse.json({ error: 'Vui lòng nhập email và mật khẩu.' }, { status: 400 })
  }

  if (!validateCredentials(email.trim(), password)) {
    recordFailure(ip)
    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 })
  }

  attempts.delete(ip)
  await createSession()
  return NextResponse.json({ success: true })
}
