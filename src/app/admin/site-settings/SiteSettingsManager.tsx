'use client'
import { useCallback, useEffect, useState } from 'react'
import ImageInput from '@/components/admin/ImageInput'

const DEFAULT_BG = 'https://res.cloudinary.com/dg9khx2s7/image/upload/v1780671218/wymbkpzgdmlov1gnysd3.jpg'

const PAGES = [
  { key: 'hero_projects',  labelVi: 'Dự án',       labelEn: 'Projects',  href: '/vi/projects' },
  { key: 'hero_about',     labelVi: 'Về chúng tôi', labelEn: 'About',     href: '/vi/about' },
  { key: 'hero_news',      labelVi: 'Tin tức',      labelEn: 'News',      href: '/vi/news' },
  { key: 'hero_services',  labelVi: 'Dịch vụ',      labelEn: 'Services',  href: '/vi/services' },
  { key: 'hero_partners',  labelVi: 'Đối tác',      labelEn: 'Partners',  href: '/vi/partners' },
  { key: 'hero_careers',   labelVi: 'Tuyển dụng',   labelEn: 'Careers',   href: '/vi/careers' },
]

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/site-settings')
      if (res.ok) setSettings(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSettings() }, [fetchSettings])

  const handleSave = async (key: string, value: string) => {
    setSaving(prev => ({ ...prev, [key]: true }))
    setSaved(prev => ({ ...prev, [key]: false }))
    try {
      await fetch(`/api/site-settings/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      })
      setSaved(prev => ({ ...prev, [key]: true }))
      setTimeout(() => setSaved(prev => ({ ...prev, [key]: false })), 2000)
    } finally {
      setSaving(prev => ({ ...prev, [key]: false }))
    }
  }

  const handleReset = async (key: string) => {
    await fetch(`/api/site-settings/${key}`, { method: 'DELETE' })
    setSettings(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  if (loading) return (
    <div className="p-8">
      <div className="space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />)}
      </div>
    </div>
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ảnh Hero Các Trang</h1>
        <p className="text-sm text-gray-500 mt-1">
          Đổi ảnh nền cho phần hero của từng trang. Nếu để trống sẽ dùng ảnh mặc định.
        </p>
      </div>

      {/* Default image preview */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-4 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DEFAULT_BG} alt="Default" className="w-24 h-14 object-cover rounded-md shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-800">Ảnh mặc định</p>
          <p className="text-xs text-amber-600 mt-0.5">Các trang chưa được set ảnh riêng sẽ dùng ảnh này.</p>
        </div>
      </div>

      {/* Page grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PAGES.map(page => {
          const current = settings[page.key] ?? ''
          const hasCustom = !!current
          return (
            <div key={page.key} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Preview strip */}
              <div className="relative h-28 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current || DEFAULT_BG}
                  alt={page.labelVi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end px-3 pb-2">
                  <div>
                    <p className="text-white font-bold text-sm">{page.labelVi}</p>
                    <p className="text-white/60 text-xs">{page.labelEn}</p>
                  </div>
                </div>
                {hasCustom && (
                  <span className="absolute top-2 right-2 bg-[#328442] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Tuỳ chỉnh
                  </span>
                )}
                <a
                  href={page.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full transition-colors"
                >
                  Xem trang ↗
                </a>
              </div>

              {/* Image input */}
              <div className="p-4">
                <ImageInput
                  value={current}
                  onChange={val => setSettings(prev => ({ ...prev, [page.key]: val }))}
                  label=""
                />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleSave(page.key, current)}
                    disabled={saving[page.key]}
                    className="flex-1 py-2 text-sm font-semibold text-white rounded-lg transition-colors disabled:opacity-60"
                    style={{ backgroundColor: saved[page.key] ? '#22863a' : '#328442' }}
                  >
                    {saving[page.key] ? 'Đang lưu…' : saved[page.key] ? '✓ Đã lưu' : 'Lưu'}
                  </button>
                  {hasCustom && (
                    <button
                      onClick={() => handleReset(page.key)}
                      className="px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                      title="Dùng ảnh mặc định"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
