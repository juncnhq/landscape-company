'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type TimelineItem = {
  id: string
  order: number
  year: string
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
}

const emptyItem: Omit<TimelineItem, 'id'> = {
  order: 0, year: '', titleVi: '', titleEn: '', descVi: '', descEn: '',
}

export default function TimelineManager() {
  const [items, setItems] = useState<TimelineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<TimelineItem> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)
  const [orderDirty, setOrderDirty] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const dragIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/timeline')
    setItems(await res.json())
    setOrderDirty(false)
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  // Drag handlers
  const onDragStart = (index: number) => {
    dragIndex.current = index
  }

  const onDragEnter = (index: number) => {
    if (dragIndex.current === null || dragIndex.current === index) return
    dragOverIndex.current = index
    setItems(prev => {
      const next = [...prev]
      const [moved] = next.splice(dragIndex.current!, 1)
      next.splice(index, 0, moved)
      dragIndex.current = index
      return next
    })
  }

  const onDragEnd = () => {
    dragIndex.current = null
    dragOverIndex.current = null
    setOrderDirty(true)
  }

  const saveOrder = async () => {
    setSavingOrder(true)
    await fetch('/api/timeline', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items.map((item, i) => ({ id: item.id, order: i }))),
    })
    setSavingOrder(false)
    setOrderDirty(false)
  }

  const openEdit = (item: TimelineItem) => { setEditing(item); setIsCreating(false) }
  const openCreate = () => { setEditing({ ...emptyItem }); setIsCreating(true) }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    if (isCreating) {
      await fetch('/api/timeline', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    } else {
      await fetch(`/api/timeline/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    }
    setSaving(false)
    setEditing(null)
    fetchItems()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/timeline/${id}`, { method: 'DELETE' })
    setDeleteConfirm(null)
    fetchItems()
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Lịch sử phát triển</h1>
          <p className="text-xs text-gray-400 mt-0.5">{items.length} mốc thời gian</p>
        </div>
        <div className="flex items-center gap-2">
          {orderDirty && (
            <button
              onClick={saveOrder}
              disabled={savingOrder}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {savingOrder ? 'Đang lưu...' : 'Lưu thứ tự'}
            </button>
          )}
          <button onClick={openCreate} className="bg-[#328442] hover:bg-[#48a85a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + Thêm mốc
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white animate-pulse" />)}</div>
        ) : (
          <>
            {orderDirty && (
              <p className="text-xs text-amber-600 mb-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                Thứ tự đã thay đổi — nhấn &quot;Lưu thứ tự&quot; để lưu
              </p>
            )}
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => onDragStart(index)}
                  onDragEnter={() => onDragEnter(index)}
                  onDragEnd={onDragEnd}
                  onDragOver={e => e.preventDefault()}
                  className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing active:opacity-60 select-none"
                >
                  {/* Drag handle */}
                  <div className="shrink-0 mt-1 text-gray-300 hover:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                  </div>

                  <div className="shrink-0 mt-0.5">
                    <span className="inline-block bg-[#328442]/10 text-[#328442] text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">{item.year}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{item.titleVi}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.titleEn}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.descVi}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 mt-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-md hover:bg-green-100 text-gray-400 hover:text-[#328442] transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded-md hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <div className="text-center py-16 text-gray-400 text-sm">Chưa có mốc thời gian nào</div>}
            </div>
          </>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">{isCreating ? 'Thêm mốc thời gian' : 'Chỉnh sửa mốc'}</h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Năm / Giai đoạn" value={editing.year || ''} onChange={v => setEditing({ ...editing, year: v })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tiêu đề (VI)" value={editing.titleVi || ''} onChange={v => setEditing({ ...editing, titleVi: v })} />
                <Field label="Tiêu đề (EN)" value={editing.titleEn || ''} onChange={v => setEditing({ ...editing, titleEn: v })} />
              </div>
              <Field label="Mô tả (VI)" value={editing.descVi || ''} onChange={v => setEditing({ ...editing, descVi: v })} type="textarea" />
              <Field label="Mô tả (EN)" value={editing.descEn || ''} onChange={v => setEditing({ ...editing, descEn: v })} type="textarea" />
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
              <button onClick={handleSave} disabled={saving} className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                {saving ? 'Đang lưu...' : isCreating ? 'Tạo mốc' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500 mb-5">Bạn có chắc muốn xóa mốc thời gian này?</p>
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
