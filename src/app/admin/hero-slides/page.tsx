import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import HeroSlidesManager from './HeroSlidesManager'

export default async function HeroSlidesPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  return (
    <AdminShell>
      <HeroSlidesManager />
    </AdminShell>
  )
}
