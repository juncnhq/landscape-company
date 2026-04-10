'use client'

import { useState, useEffect, useCallback } from 'react'

type Service = {
  id: string
  slug: string
  order: number
  icon: string
  titleVi: string
  titleEn: string
  subtitleVi: string
  subtitleEn: string
  descVi: string
  descEn: string
  tag: string
  bulletsVi: string[]
  bulletsEn: string[]
  published: boolean
}

const emptyService: Omit<Service, 'id'> = {
  slug: '',
  order: 0,
  icon: '',
  titleVi: '',
  titleEn: '',
  subtitleVi: '',
  subtitleEn: '',
  descVi: '',
  descEn: '',
  tag: '',
  bulletsVi: [],
  bulletsEn: [],
  published: true,
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Service> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [bulletsViText, setBulletsViText] = useState('')
  const [bulletsEnText, setBulletsEnText] = useState('')

  const fetchServices = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/services')
    setServices(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchServices() }, [fetchServices])

  const openEdit = (s: Service) => {
    setEditing(s)
    setBulletsViText(s.bulletsVi.join('\n'))
    setBulletsEnText(s.bulletsEn.join('\n'))
    setIsCreating(false)
  }

  const openCreate = () => {
    setEditing({ ...emptyService })
    setBulletsViText('')
    setBulletsEnText('')
    setIsCreating(true)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    const payload = {
      ...editing,
      bulletsVi: bulletsViText.split('\n').map(s => s.trim()).filter(Boolean),
      bulletsEn: bulletsEnText.split('\n').map(s => s.trim()).filter(Boolean),
    }

    if (isCreating) {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch(`/api/services/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    setSaving(false)
    setEditing(null)
    fetchServices()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    setDeleteConfirm(null)
    fetchServices()
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Dịch vụ</h1>
          <p className="text-xs text-gray-400 mt-0.5">{services.length} dịch vụ</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#328442] hover:bg-[#48a85a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Thêm dịch vụ
        </button>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order + icon */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-gray-300 font-mono w-5 text-center">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-2xl">{service.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm truncate">{service.titleVi}</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">{service.tag}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{service.titleEn}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{service.subtitleVi}</p>
                </div>

                {/* Bullets count */}
                <div className="hidden md:flex items-center gap-1 shrink-0">
                  <span className="text-xs text-gray-400">{service.bulletsVi.length} bullets</span>
                </div>

                {/* Status */}
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
                    service.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${service.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {service.published ? 'Hiển thị' : 'Ẩn'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(service)}
                    className="p-1.5 rounded-md hover:bg-green-100 text-gray-400 hover:text-[#328442] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(service.id)}
                    className="p-1.5 rounded-md hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {services.length === 0 && (
              <div className="text-center py-16 text-gray-400 text-sm">Chưa có dịch vụ nào</div>
            )}
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                {isCreating ? 'Thêm dịch vụ mới' : 'Chỉnh sửa dịch vụ'}
              </h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[72vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Slug" value={editing.slug || ''} onChange={v => setEditing({ ...editing, slug: v })} />
                <Field label="Icon (emoji)" value={editing.icon || ''} onChange={v => setEditing({ ...editing, icon: v })} />
                <Field label="Tag" value={editing.tag || ''} onChange={v => setEditing({ ...editing, tag: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Order" value={String(editing.order ?? 0)} onChange={v => setEditing({ ...editing, order: Number(v) })} />
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.published ?? true}
                      onChange={e => setEditing({ ...editing, published: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Xuất bản</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tiêu đề (VI)" value={editing.titleVi || ''} onChange={v => setEditing({ ...editing, titleVi: v })} />
                <Field label="Tiêu đề (EN)" value={editing.titleEn || ''} onChange={v => setEditing({ ...editing, titleEn: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Phụ đề (VI)" value={editing.subtitleVi || ''} onChange={v => setEditing({ ...editing, subtitleVi: v })} />
                <Field label="Phụ đề (EN)" value={editing.subtitleEn || ''} onChange={v => setEditing({ ...editing, subtitleEn: v })} />
              </div>
              <Field label="Mô tả (VI)" value={editing.descVi || ''} onChange={v => setEditing({ ...editing, descVi: v })} type="textarea" />
              <Field label="Mô tả (EN)" value={editing.descEn || ''} onChange={v => setEditing({ ...editing, descEn: v })} type="textarea" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bullets VI (mỗi dòng 1 mục)</label>
                  <textarea
                    value={bulletsViText}
                    onChange={e => setBulletsViText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bullets EN (mỗi dòng 1 mục)</label>
                  <textarea
                    value={bulletsEnText}
                    onChange={e => setBulletsEnText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {saving ? 'Đang lưu...' : isCreating ? 'Tạo dịch vụ' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500 mb-5">Bạn có chắc muốn xóa dịch vụ này?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({
  label, value, onChange, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; type?: 'text' | 'textarea'
}) {
  const cls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea'
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={`${cls} resize-none`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  )
}
