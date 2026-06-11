'use client'

import { useState, useEffect, useCallback } from 'react'
import GalleryInput from '@/components/admin/GalleryInput'

type MemberCompany = {
  id: string
  order: number
  abbr: string
  name: string
  tagline: string
  descVi: string
  descEn: string
  accent: string
  images: string[]
  published: boolean
}

const emptyCompany: Omit<MemberCompany, 'id'> = {
  order: 0, abbr: '', name: '', tagline: '', descVi: '', descEn: '', accent: '#328442', images: [], published: true,
}

export default function MemberCompaniesManager() {
  const [companies, setCompanies] = useState<MemberCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<MemberCompany> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [companyImages, setCompanyImages] = useState<string[]>([])

  const fetchCompanies = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/member-companies')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setCompanies(await res.json())
    } catch (err) {
      console.error('Failed to load companies:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchCompanies() }, [fetchCompanies])

  const openEdit = (c: MemberCompany) => { setEditing(c); setCompanyImages(c.images); setIsCreating(false); setError(null) }
  const openCreate = () => { setEditing({ ...emptyCompany }); setCompanyImages([]); setIsCreating(true); setError(null) }
  const closeModal = () => { setEditing(null); setError(null) }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    setError(null)
    const payload = { ...editing, images: companyImages }
    try {
      const res = isCreating
        ? await fetch('/api/member-companies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch(`/api/member-companies/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(`${res.status}`)
      setEditing(null)
      fetchCompanies()
    } catch {
      setError('Lưu thất bại. Vui lòng thử lại.')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/member-companies/${id}`, { method: 'DELETE' })
    if (!res.ok) { alert('Xóa thất bại.'); return }
    setDeleteConfirm(null)
    fetchCompanies()
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Thành viên hệ sinh thái</h1>
          <p className="text-xs text-gray-400 mt-0.5">{companies.length} thành viên</p>
        </div>
        <button onClick={openCreate} className="bg-[#328442] hover:bg-[#48a85a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Thêm thành viên
        </button>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-lg bg-white animate-pulse" />)}</div>
        ) : (
          <div className="space-y-2">
            {companies.map((company, i) => (
              <div key={company.id} className="bg-white rounded-lg border border-gray-100 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-gray-300 font-mono w-5 text-center shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: company.accent }}
                >
                  {company.abbr.slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{company.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{company.tagline}</p>
                </div>
                <div className="hidden md:block shrink-0 text-xs text-gray-500">{company.descVi}</div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${company.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${company.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {company.published ? 'Hiển thị' : 'Ẩn'}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a href="/vi/about" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors" title="Xem trang">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  </a>
                  <button onClick={() => openEdit(company)} className="p-1.5 rounded-md hover:bg-green-100 text-gray-400 hover:text-[#328442] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => setDeleteConfirm(company.id)} className="p-1.5 rounded-md hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
            {companies.length === 0 && <div className="text-center py-16 text-gray-400 text-sm">Chưa có thành viên nào</div>}
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">{isCreating ? 'Thêm thành viên' : 'Chỉnh sửa thành viên'}</h2>
              <button onClick={closeModal} className="p-1 rounded-md hover:bg-gray-100 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Viết tắt" value={editing.abbr || ''} onChange={v => setEditing({ ...editing, abbr: v })} />
                <Field label="Order" value={String(editing.order ?? 0)} onChange={v => setEditing({ ...editing, order: Number(v) })} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Màu accent</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={editing.accent || '#328442'} onChange={e => setEditing({ ...editing, accent: e.target.value })} className="w-10 h-9 rounded-lg border border-gray-200 cursor-pointer" />
                    <input type="text" value={editing.accent || ''} onChange={e => setEditing({ ...editing, accent: e.target.value })} className="min-w-0 w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]" />
                  </div>
                </div>
              </div>
              <Field label="Tên công ty" value={editing.name || ''} onChange={v => setEditing({ ...editing, name: v })} />
              <Field label="Tagline" value={editing.tagline || ''} onChange={v => setEditing({ ...editing, tagline: v })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Mô tả (VI)" value={editing.descVi || ''} onChange={v => setEditing({ ...editing, descVi: v })} />
                <Field label="Mô tả (EN)" value={editing.descEn || ''} onChange={v => setEditing({ ...editing, descEn: v })} />
              </div>
              <GalleryInput
                label="Ảnh gallery"
                value={companyImages}
                onChange={setCompanyImages}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.published ?? true} onChange={e => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-700">Xuất bản</span>
              </label>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100">
              {error && <p className="text-sm text-red-500 mr-auto">{error}</p>}
              <div className="flex items-center gap-3 ml-auto">
                <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
                <button onClick={handleSave} disabled={saving} className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  {saving ? 'Đang lưu...' : isCreating ? 'Tạo thành viên' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500 mb-5">Bạn có chắc muốn xóa thành viên này?</p>
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

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]" />
    </div>
  )
}
