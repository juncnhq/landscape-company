import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import MemberCompaniesManager from './MemberCompaniesManager'

export default async function MemberCompaniesPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <MemberCompaniesManager />
    </AdminShell>
  )
}
