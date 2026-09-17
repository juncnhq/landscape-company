'use client'

import { useCallback, useEffect, useState } from 'react'
import { apiErrorMessage } from '@/lib/apiClient'

type ContactRequest = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  address: string
  service: string
  message: string
  status: string
  note: string
  createdAt: string
}

const STATUS = {
  new: { label: 'Mới', dot: '#e0a800', chip: 'bg-amber-50 text-amber-700 border-amber-200' },
  contacted: { label: 'Đã liên hệ', dot: '#2563eb', chip: 'bg-blue-50 text-blue-700 border-blue-200' },
  done: { label: 'Hoàn tất', dot: '#328442', chip: 'bg-green-50 text-green-700 border-green-200' },
} as const

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'new', label: 'Mới' },
  { key: 'contacted', label: 'Đã liên hệ' },
  { key: 'done', label: 'Hoàn tất' },
]

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

export default function ContactsManager() {
  const [items, setItems] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [viewing, setViewing] = useState<ContactRequest | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [savingNote, setSavingNote] = useState(false)
  const [noteDraft, setNoteDraft] = useState('')

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/contacts?status=${filter}`)
      if (!res.ok) throw new Error(await apiErrorMessage(res, 'Không tải được danh sách.'))
      setItems(await res.json())
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được danh sách.')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => { fetchItems() }, [fetchItems])

  const updateItem = async (id: string, payload: { status?: string; note?: string }) => {
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      alert(await apiErrorMessage(res, 'Cập nhật thất bại.'))
      return null
    }
    return (await res.json()) as ContactRequest
  }

  const changeStatus = async (item: ContactRequest, status: string) => {
    const updated = await updateItem(item.id, { status })
    if (!updated) return
    setItems(prev => prev.map(i => (i.id === item.id ? updated : i)))
    if (viewing?.id === item.id) setViewing(updated)
    if (filter !== 'all' && filter !== status) fetchItems()
  }

  const saveNote = async () => {
    if (!viewing) return
    setSavingNote(true)
    const updated = await updateItem(viewing.id, { note: noteDraft })
    setSavingNote(false)
    if (!updated) return
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)))
    setViewing(updated)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    if (!res.ok) { alert(await apiErrorMessage(res, 'Xoá thất bại.')); return }
    setItems(prev => prev.filter(i => i.id !== id))
    setDeleteConfirm(null)
    setViewing(null)
  }

  const openView = (item: ContactRequest) => {
    setViewing(item)
    setNoteDraft(item.note)
  }

  const q = search.trim().toLowerCase()
  const visible = q
    ? items.filter(i =>
        `${i.firstName} ${i.lastName} ${i.email} ${i.phone} ${i.company}`
          .toLowerCase()
          .includes(q))
    : items

  const newCount = items.filter(i => i.status === 'new').length

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Yêu cầu tư vấn</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {loading ? 'Đang tải…' : `${items.length} yêu cầu`}
            {!loading && newCount > 0 && (
              <span className="ml-2 text-amber-600 font-medium">· {newCount} chưa xử lý</span>
            )}
          </p>
        </div>
      </div>

      {/* Filters + search */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors border ${
              filter === f.key
                ? 'bg-[#328442] text-white border-[#328442]'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm theo tên, email, SĐT, công ty…"
          className="ml-auto w-72 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
        />
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-500">{error}</p>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-sm">
              {items.length === 0
                ? 'Chưa có yêu cầu nào.'
                : 'Không tìm thấy yêu cầu khớp từ khoá.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="px-4 py-3 font-medium">Khách hàng</th>
                <th className="px-4 py-3 font-medium">Liên hệ</th>
                <th className="px-4 py-3 font-medium">Dịch vụ</th>
                <th className="px-4 py-3 font-medium">Thời gian</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(item => {
                const st = STATUS[item.status as keyof typeof STATUS] ?? STATUS.new
                return (
                  <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-green-50/30">
                    <td className="px-4 py-3">
                      <button onClick={() => openView(item)} className="text-left">
                        <span className="font-medium text-gray-800 hover:text-[#328442]">
                          {item.firstName} {item.lastName}
                        </span>
                        {item.company && (
                          <span className="block text-xs text-gray-400 mt-0.5">{item.company}</span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <a href={`mailto:${item.email}`} className="hover:text-[#328442]">{item.email}</a>
                      <span className="block text-xs text-gray-400 mt-0.5">
                        <a href={`tel:${item.phone}`} className="hover:text-[#328442]">{item.phone}</a>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.service || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{fmtDate(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={item.status}
                        onChange={e => changeStatus(item, e.target.value)}
                        className={`px-2 py-1 rounded-md border text-xs font-medium cursor-pointer ${st.chip}`}
                      >
                        {Object.entries(STATUS).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openView(item)}
                          title="Xem chi tiết"
                          className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          title="Xoá"
                          className="p-1.5 rounded-md text-red-600 hover:bg-red-50"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {viewing.firstName} {viewing.lastName}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">{fmtDate(viewing.createdAt)}</p>
              </div>
              <button onClick={() => setViewing(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
                ×
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Info label="Email" value={<a href={`mailto:${viewing.email}`} className="text-[#328442] hover:underline">{viewing.email}</a>} />
                <Info label="Điện thoại" value={<a href={`tel:${viewing.phone}`} className="text-[#328442] hover:underline">{viewing.phone}</a>} />
                <Info label="Công ty" value={viewing.company || '—'} />
                <Info label="Dịch vụ quan tâm" value={viewing.service || '—'} />
              </div>
              <Info label="Địa chỉ" value={viewing.address || '—'} />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Nội dung</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                  {viewing.message || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Ghi chú nội bộ</p>
                <textarea
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  rows={3}
                  placeholder="Ghi lại kết quả liên hệ, báo giá đã gửi…"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100">
              <select
                value={viewing.status}
                onChange={e => changeStatus(viewing, e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
              >
                {Object.entries(STATUS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <div className="flex items-center gap-3 ml-auto">
                <button onClick={() => setViewing(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                  Đóng
                </button>
                <button
                  onClick={saveNote}
                  disabled={savingNote || noteDraft === viewing.note}
                  className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {savingNote ? 'Đang lưu…' : 'Lưu ghi chú'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Xoá yêu cầu này?</h3>
            <p className="text-sm text-gray-500 mb-6">Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100">
                Huỷ
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg">
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  )
}
