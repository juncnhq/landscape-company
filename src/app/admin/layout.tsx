import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'
import Sidebar from './Sidebar'
import '../globals.css'

export const metadata: Metadata = {
  title: 'FAM Admin',
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body style={{ colorScheme: 'light', color: '#171717' }} className="bg-[#f0f4f1] min-h-screen antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  // Login page doesn't need sidebar
  // We rely on each page doing its own auth redirect

  return <>{children}</>
}
