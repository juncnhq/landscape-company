'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchJson, sendJson, errMessage } from '@/lib/apiClient'
import Field from '@/components/admin/Field'

type JobPosition = {
  id: string
  order: number
  titleVi: string
  titleEn: string
  typeVi: string
  typeEn: string
  locationVi: string
  locationEn: string
  descVi: string
  descEn: string
  published: boolean
}

const emptyPosition: Omit<JobPosition, 'id'> = {
  order: 0,
  titleVi: '',
  titleEn: '',
  typeVi: 'Toàn thời gian',
  typeEn: 'Full-time',
  locationVi: '',
  locationEn: '',
  descVi: '',
  descEn: '',
  published: true,
}

export default function CareersManager() {
  const [items, setItems] = useState<JobPosition[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<JobPosition> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listError, setListError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [orderDirty, setOrderDirty] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const dragIndex = useRef<number | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await fetchJson<JobPosition[]>('/api/job-positions', 'Không tải được danh sách vị trí tuyển dụng.'))
      setOrderDirty(false)
      setListError(null)
    } catch (e) {
      setListError(errMessage(e, 'Không tải được danh sách vị trí tuyển dụng.'))
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  // Kéo thả đổi thứ tự — thứ tự này chính là thứ tự 01, 02, 03… trên /vi/careers.
  const onDragStart = (index: number) => { dragIndex.current = index }

  const onDragEnter = (index: number) => {
    if (dragIndex.current === null || dragIndex.current === index) return
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
    setOrderDirty(true)
  }

  const saveOrder = async () => {
    setSavingOrder(true)
    setListError(null)
    try {
      await sendJson('/api/job-positions', {
        method: 'PATCH',
        body: items.map((item, i) => ({ id: item.id, order: i })),
      }, 'Lưu thứ tự thất bại.')
      setOrderDirty(false)
    } catch (e) {
      setListError(errMessage(e, 'Lưu thứ tự thất bại.'))
    } finally {
      setSavingOrder(false)
    }
  }

  const openEdit = (item: JobPosition) => { setEditing(item); setIsCreating(false); setError(null) }
  const openCreate = () => { setEditing({ ...emptyPosition }); setIsCreating(true); setError(null) }
  const closeModal = () => { setEditing(null); setError(null) }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    setError(null)
    try {
      if (isCreating) await sendJson('/api/job-positions', { method: 'POST', body: editing })
      else await sendJson(`/api/job-positions/${editing.id}`, { method: 'PUT', body: editing })
      setEditing(null)
      fetchItems()
    } catch (e) {
      setError(errMessage(e, 'Lưu thất bại. Vui lòng thử lại.'))
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    setDeleteError(null)
    try {
      await sendJson(`/api/job-positions/${id}`, { method: 'DELETE' }, 'Xóa thất bại.')
      setDeleteConfirm(null)
      fetchItems()
    } catch (e) {
      setDeleteError(errMessage(e, 'Xóa thất bại.'))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Tuyển dụng</h1>
          <p className="text-xs text-gray-400 mt-0.5">{items.length} vị trí trên trang /vi/careers</p>
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
            + Thêm vị trí
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {listError && (
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <span className="text-red-600 text-sm leading-5">⚠</span>
            <div className="flex-1">
              <p className="text-sm text-red-700">{listError}</p>
              <p className="text-xs text-red-500 mt-0.5">Danh sách bên dưới có thể chưa đầy đủ.</p>
            </div>
          </div>
        )}
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-lg bg-white animate-pulse" />)}</div>
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
                  className="bg-white rounded-lg border border-gray-100 px-5 py-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing active:opacity-60 select-none"
                >
                  {/* Drag handle */}
                  <div className="shrink-0 mt-1 text-gray-300 hover:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                  </div>

                  <div className="shrink-0 mt-0.5">
                    <span className="inline-block bg-[#328442]/10 text-[#328442] text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{item.titleVi}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.titleEn}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.typeVi} · {item.locationVi}</p>
                  </div>

                  <div className="shrink-0 mt-1">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${item.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                      {item.published ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 mt-1">
                    <a href="/vi/careers" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors" title="Xem trang">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-md hover:bg-green-100 text-gray-400 hover:text-[#328442] transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded-md hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <div className="text-center py-16 text-gray-400 text-sm">Chưa có vị trí tuyển dụng nào</div>}
            </div>
          </>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">{isCreating ? 'Thêm vị trí tuyển dụng' : 'Chỉnh sửa vị trí'}</h2>
              <button onClick={closeModal} className="p-1 rounded-md hover:bg-gray-100 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tên vị trí (VI)" value={editing.titleVi || ''} onChange={v => setEditing({ ...editing, titleVi: v })} required />
                <Field label="Tên vị trí (EN)" value={editing.titleEn || ''} onChange={v => setEditing({ ...editing, titleEn: v })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Hình thức (VI)" value={editing.typeVi || ''} onChange={v => setEditing({ ...editing, typeVi: v })} />
                <Field label="Hình thức (EN)" value={editing.typeEn || ''} onChange={v => setEditing({ ...editing, typeEn: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Địa điểm (VI)" value={editing.locationVi || ''} onChange={v => setEditing({ ...editing, locationVi: v })} required />
                <Field label="Địa điểm (EN)" value={editing.locationEn || ''} onChange={v => setEditing({ ...editing, locationEn: v })} required />
              </div>
              <Field label="Mô tả công việc (VI)" value={editing.descVi || ''} onChange={v => setEditing({ ...editing, descVi: v })} type="textarea" rows={5} />
              <Field label="Mô tả công việc (EN)" value={editing.descEn || ''} onChange={v => setEditing({ ...editing, descEn: v })} type="textarea" rows={5} />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={editing.published ?? true} onChange={e => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 rounded" />
                Hiển thị trên trang tuyển dụng
              </label>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100">
              {error && <p className="text-sm text-red-500 mr-auto">{error}</p>}
              <div className="flex items-center gap-3 ml-auto">
                <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
                <button onClick={handleSave} disabled={saving} className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  {saving ? 'Đang lưu...' : isCreating ? 'Tạo vị trí' : 'Lưu thay đổi'}
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
            <p className="text-sm text-gray-500 mb-5">Bạn có chắc muốn xóa vị trí tuyển dụng này?</p>
            {deleteError && <p className="text-sm text-red-600 mb-3">{deleteError}</p>}
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} disabled={deleting} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={deleting} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">{deleting ? 'Đang xóa...' : 'Xóa'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
