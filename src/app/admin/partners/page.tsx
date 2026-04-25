import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import PartnersManager from './PartnersManager'

export default async function PartnersPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <PartnersManager />
    </AdminShell>
  )
}
