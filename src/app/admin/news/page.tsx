import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import NewsManager from './NewsManager'

export default async function NewsPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <NewsManager />
    </AdminShell>
  )
}
