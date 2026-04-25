'use client'

import { useState, useEffect, useCallback } from 'react'

type Partner = {
  id: string
  order: number
  name: string
  sectorVi: string
  sectorEn: string
  descVi: string
  descEn: string
  founded: number
  hq: string
  statLabelVi: string
  statLabelEn: string
  statValue: string
  projectsVi: string[]
  projectsEn: string[]
  highlightVi: string
  highlightEn: string
  published: boolean
}

const emptyPartner: Omit<Partner, 'id'> = {
  order: 0, name: '', sectorVi: '', sectorEn: '', descVi: '', descEn: '',
  founded: 2000, hq: '', statLabelVi: '', statLabelEn: '', statValue: '',
  projectsVi: [], projectsEn: [], highlightVi: '', highlightEn: '', published: true,
}

export default function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Partner> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [projectsViText, setProjectsViText] = useState('')
  const [projectsEnText, setProjectsEnText] = useState('')

  const fetchPartners = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/partners')
    setPartners(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchPartners() }, [fetchPartners])

  const openEdit = (p: Partner) => {
    setEditing(p)
    setProjectsViText(p.projectsVi.join('\n'))
    setProjectsEnText(p.projectsEn.join('\n'))
    setIsCreating(false)
  }

  const openCreate = () => {
    setEditing({ ...emptyPartner })
    setProjectsViText('')
    setProjectsEnText('')
    setIsCreating(true)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    const payload = {
      ...editing,
      projectsVi: projectsViText.split('\n').map(s => s.trim()).filter(Boolean),
      projectsEn: projectsEnText.split('\n').map(s => s.trim()).filter(Boolean),
    }
    if (isCreating) {
      await fetch('/api/partners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } else {
      await fetch(`/api/partners/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }
    setSaving(false)
    setEditing(null)
    fetchPartners()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/partners/${id}`, { method: 'DELETE' })
    setDeleteConfirm(null)
    fetchPartners()
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Đối tác</h1>
          <p className="text-xs text-gray-400 mt-0.5">{partners.length} đối tác</p>
        </div>
        <button onClick={openCreate} className="bg-[#328442] hover:bg-[#48a85a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Thêm đối tác
        </button>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white animate-pulse" />)}</div>
        ) : (
          <div className="space-y-2">
            {partners.map((partner, i) => (
              <div key={partner.id} className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-gray-300 font-mono w-5 text-center shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">{partner.name}</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">{partner.sectorVi}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Est. {partner.founded} · {partner.hq}</p>
                </div>
                <div className="hidden md:block shrink-0 text-xs text-gray-400">{partner.statValue}</div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${partner.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${partner.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {partner.published ? 'Hiển thị' : 'Ẩn'}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(partner)} className="p-1.5 rounded-md hover:bg-green-100 text-gray-400 hover:text-[#328442] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => setDeleteConfirm(partner.id)} className="p-1.5 rounded-md hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
            {partners.length === 0 && <div className="text-center py-16 text-gray-400 text-sm">Chưa có đối tác nào</div>}
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">{isCreating ? 'Thêm đối tác mới' : 'Chỉnh sửa đối tác'}</h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[72vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tên đối tác" value={editing.name || ''} onChange={v => setEditing({ ...editing, name: v })} />
                <Field label="Order" value={String(editing.order ?? 0)} onChange={v => setEditing({ ...editing, order: Number(v) })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Lĩnh vực (VI)" value={editing.sectorVi || ''} onChange={v => setEditing({ ...editing, sectorVi: v })} />
                <Field label="Lĩnh vực (EN)" value={editing.sectorEn || ''} onChange={v => setEditing({ ...editing, sectorEn: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Năm thành lập" value={String(editing.founded ?? 2000)} onChange={v => setEditing({ ...editing, founded: Number(v) })} />
                <Field label="Trụ sở" value={editing.hq || ''} onChange={v => setEditing({ ...editing, hq: v })} />
              </div>
              <Field label="Mô tả (VI)" value={editing.descVi || ''} onChange={v => setEditing({ ...editing, descVi: v })} type="textarea" />
              <Field label="Mô tả (EN)" value={editing.descEn || ''} onChange={v => setEditing({ ...editing, descEn: v })} type="textarea" />
              <div className="grid grid-cols-3 gap-4">
                <Field label="Stat Label (VI)" value={editing.statLabelVi || ''} onChange={v => setEditing({ ...editing, statLabelVi: v })} />
                <Field label="Stat Label (EN)" value={editing.statLabelEn || ''} onChange={v => setEditing({ ...editing, statLabelEn: v })} />
                <Field label="Stat Value" value={editing.statValue || ''} onChange={v => setEditing({ ...editing, statValue: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dự án (VI) — mỗi dòng 1 mục</label>
                  <textarea value={projectsViText} onChange={e => setProjectsViText(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dự án (EN) — mỗi dòng 1 mục</label>
                  <textarea value={projectsEnText} onChange={e => setProjectsEnText(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] resize-none" />
                </div>
              </div>
              <Field label="Điểm nổi bật (VI)" value={editing.highlightVi || ''} onChange={v => setEditing({ ...editing, highlightVi: v })} type="textarea" />
              <Field label="Điểm nổi bật (EN)" value={editing.highlightEn || ''} onChange={v => setEditing({ ...editing, highlightEn: v })} type="textarea" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.published ?? true} onChange={e => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-700">Xuất bản</span>
              </label>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
              <button onClick={handleSave} disabled={saving} className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                {saving ? 'Đang lưu...' : isCreating ? 'Tạo đối tác' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500 mb-5">Bạn có chắc muốn xóa đối tác này?</p>
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

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: 'text' | 'textarea' }) {
  const cls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea'
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={`${cls} resize-none`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />}
    </div>
  )
}
