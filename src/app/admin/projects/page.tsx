import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import ProjectsManager from './ProjectsManager'

export default async function ProjectsPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <ProjectsManager />
    </AdminShell>
  )
}
