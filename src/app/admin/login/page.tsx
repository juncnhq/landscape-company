'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/admin/projects')
      router.refresh()
    } else {
      setError('Email hoặc mật khẩu không đúng')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel – branding */}
      <div className="hidden lg:flex w-80 shrink-0 bg-[#07130a] flex-col justify-between p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#328442] flex items-center justify-center font-bold text-white text-sm">F</div>
          <span className="text-white font-semibold text-sm">FAM Admin</span>
        </div>
        <div>
          <p className="text-white/20 text-[10px] tracking-widest uppercase mb-2">FAM Landscape</p>
          <p className="text-white/50 text-xs leading-relaxed">Hệ thống quản lý nội dung nội bộ — chỉ dành cho quản trị viên.</p>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center px-6 bg-[#f0f4f1]">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#328442] flex items-center justify-center font-bold text-white text-base mb-4 lg:hidden">F</div>
            <h1 className="text-2xl font-semibold text-gray-900">Đăng nhập</h1>
            <p className="text-sm text-gray-500 mt-1">Nhập thông tin để truy cập trang quản trị</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#328442] hover:bg-[#48a85a] text-white py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
