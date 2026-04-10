import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import ServicesManager from './ServicesManager'

export default async function ServicesPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <ServicesManager />
    </AdminShell>
  )
}
