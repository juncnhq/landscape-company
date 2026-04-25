import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import TimelineManager from './TimelineManager'

export default async function TimelinePage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <TimelineManager />
    </AdminShell>
  )
}
