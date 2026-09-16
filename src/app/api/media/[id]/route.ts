import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { unauthorized, handleApiError } from '@/lib/apiError'
import { destroyCloudinaryImage } from '@/lib/cloudinary'

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) return unauthorized()
  try {
    const { id } = await params

    const item = await prisma.media.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Không tìm thấy bản ghi.' }, { status: 404 })

    // Xoá file trên Cloudinary trước, nếu không file sẽ thành rác vĩnh viễn
    // (không còn record nào giữ URL để xoá lại sau).
    const destroyed = await destroyCloudinaryImage(item.url)

    await prisma.media.delete({ where: { id } })
    return NextResponse.json({ success: true, cloudinaryDeleted: destroyed })
  } catch (err) {
    return handleApiError(err, 'DELETE /api/media/[id] error:')
  }
}
