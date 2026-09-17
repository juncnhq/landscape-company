import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import AdminShell from '../AdminShell'
import ContactsManager from './ContactsManager'

export default async function ContactsPage() {
  const ok = await verifySession()
  if (!ok) redirect('/admin/login')

  return (
    <AdminShell>
      <ContactsManager />
    </AdminShell>
  )
}
