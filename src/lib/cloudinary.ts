import { createHash } from 'crypto'

/**
 * Trích `public_id` từ URL Cloudinary.
 *
 * Ví dụ:
 *   https://res.cloudinary.com/demo/image/upload/v1712345678/fam/abc123.jpg
 *   → fam/abc123
 *
 * Trả về null nếu URL không phải dạng Cloudinary upload (ảnh dán từ nguồn khác).
 */
export function publicIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (!u.hostname.endsWith('res.cloudinary.com')) return null

    const parts = u.pathname.split('/').filter(Boolean)
    const uploadIdx = parts.indexOf('upload')
    if (uploadIdx === -1) return null

    // Bỏ qua segment version (v1712345678) và các segment transformation nếu có.
    let rest = parts.slice(uploadIdx + 1)
    rest = rest.filter((p, i) => !(i === 0 && /^v\d+$/.test(p)))
    if (rest.length === 0) return null

    const joined = rest.join('/')
    return joined.replace(/\.[^./]+$/, '')
  } catch {
    return null
  }
}

/**
 * Xoá ảnh trên Cloudinary (signed destroy).
 *
 * Best-effort: trả về false khi thiếu credentials hoặc Cloudinary từ chối,
 * để việc xoá record trong DB vẫn tiếp tục.
 */
export async function destroyCloudinaryImage(url: string): Promise<boolean> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) return false

  const publicId = publicIdFromUrl(url)
  if (!publicId) return false

  const timestamp = Math.floor(Date.now() / 1000)
  const signature = createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex')

  const form = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature,
  })

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body: form,
    })
    if (!res.ok) return false
    const data = (await res.json()) as { result?: string }
    return data.result === 'ok' || data.result === 'not found'
  } catch {
    return false
  }
}
