import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'

export default async function AdminPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')
  redirect('/admin/projects')
}
