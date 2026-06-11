'use client'

import { useState, useEffect, useCallback } from 'react'
import ImageInput from '@/components/admin/ImageInput'
import RichTextEditor from '@/components/admin/RichTextEditor'

type NewsArticle = {
  id: string
  slug: string
  titleVi: string
  titleEn: string
  summaryVi: string
  summaryEn: string
  contentVi: string
  contentEn: string
  image: string
  categoryVi: string
  categoryEn: string
  newsType: string
  date: string
  readTime: number
  published: boolean
}

const emptyArticle: Omit<NewsArticle, 'id'> = {
  slug: '',
  titleVi: '',
  titleEn: '',
  summaryVi: '',
  summaryEn: '',
  contentVi: '',
  contentEn: '',
  image: '',
  categoryVi: '',
  categoryEn: '',
  newsType: 'general',
  date: new Date().toISOString().slice(0, 10),
  readTime: 4,
  published: true,
}

const NEWS_TYPES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'general', label: 'Thông tin chung' },
  { value: 'internal_event', label: 'Sự kiện nội bộ' },
  { value: 'industry', label: 'Chủ đề chuyên ngành' },
  { value: 'project', label: 'Chủ đề dự án' },
]

const newsTypeLabel = (type: string) => NEWS_TYPES.find(t => t.value === type)?.label ?? 'Thông tin chung'
const newsTypeColor = (type: string) => {
  if (type === 'internal_event') return 'bg-purple-100 text-purple-700'
  if (type === 'industry') return 'bg-blue-100 text-blue-700'
  if (type === 'project') return 'bg-green-100 text-green-700'
  return 'bg-amber-100 text-amber-700'
}

export default function NewsManager() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('all')
  const [editing, setEditing] = useState<Partial<NewsArticle> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/news')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setArticles(await res.json())
    } catch (err) {
      console.error('Failed to load articles:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  const openEdit = (a: NewsArticle) => { setEditing(a); setIsCreating(false); setError(null) }
  const openCreate = () => { setEditing({ ...emptyArticle }); setIsCreating(true); setError(null) }
  const closeModal = () => { setEditing(null); setError(null) }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    setError(null)
    try {
      const res = isCreating
        ? await fetch('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
        : await fetch(`/api/news/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
      if (!res.ok) throw new Error(`${res.status}`)
      setEditing(null)
      fetchArticles()
    } catch {
      setError('Lưu thất bại. Vui lòng thử lại.')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/news/${id}`, { method: 'DELETE' })
    if (!res.ok) { alert('Xóa thất bại.'); return }
    setDeleteConfirm(null)
    fetchArticles()
  }

  const categoryColor = (cat: string) => {
    if (cat.includes('Dự Án') || cat.includes('Project')) return 'bg-green-100 text-green-700'
    if (cat.includes('Kiến Thức') || cat.includes('Knowledge')) return 'bg-blue-100 text-blue-700'
    return 'bg-amber-100 text-amber-700'
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Tin tức</h1>
          <p className="text-xs text-gray-400 mt-0.5">{articles.length} bài viết</p>
        </div>
        <button onClick={openCreate} className="bg-[#328442] hover:bg-[#48a85a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Thêm bài viết
        </button>
      </div>

      <div className="px-6 py-6">
        {/* Type filter */}
        <div className="flex gap-2 flex-wrap mb-5">
          {NEWS_TYPES.map(t => (
            <button
              key={t.value}
              onClick={() => setTypeFilter(t.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === t.value
                  ? 'bg-[#328442] text-white'
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 rounded-lg bg-white animate-pulse" />)}</div>
        ) : (
          <div className="space-y-2">
            {articles.filter(a => typeFilter === 'all' || a.newsType === typeFilter).map((article) => (
              <div key={article.id} className="bg-white rounded-lg border border-gray-100 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                {article.image && (
                  <img src={article.image} alt="" className="w-16 h-12 object-cover rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm truncate">{article.titleVi}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${newsTypeColor(article.newsType)}`}>{newsTypeLabel(article.newsType)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{article.titleEn}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-xs text-gray-400">{article.readTime} phút đọc</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${article.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${article.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {article.published ? 'Hiển thị' : 'Ẩn'}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`/vi/news/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Xem trang"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  <button onClick={() => openEdit(article)} className="p-1.5 rounded-md hover:bg-green-100 text-gray-400 hover:text-[#328442] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => setDeleteConfirm(article.id)} className="p-1.5 rounded-md hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
            {articles.length === 0 && <div className="text-center py-16 text-gray-400 text-sm">Chưa có bài viết nào</div>}
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">{isCreating ? 'Thêm bài viết mới' : 'Chỉnh sửa bài viết'}</h2>
              <button onClick={closeModal} className="p-1 rounded-md hover:bg-gray-100 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[72vh] overflow-y-auto">
              <Field label="Slug" value={editing.slug || ''} onChange={v => setEditing({ ...editing, slug: v })} />
              <ImageInput
                label="Ảnh đại diện"
                value={editing.image || ''}
                onChange={v => setEditing({ ...editing, image: v })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tiêu đề (VI)" value={editing.titleVi || ''} onChange={v => setEditing({ ...editing, titleVi: v })} />
                <Field label="Tiêu đề (EN)" value={editing.titleEn || ''} onChange={v => setEditing({ ...editing, titleEn: v })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại tin tức</label>
                <select
                  value={editing.newsType || 'general'}
                  onChange={e => setEditing({ ...editing, newsType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
                >
                  {NEWS_TYPES.filter(t => t.value !== 'all').map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Danh mục (VI)" value={editing.categoryVi || ''} onChange={v => setEditing({ ...editing, categoryVi: v })} />
                <Field label="Danh mục (EN)" value={editing.categoryEn || ''} onChange={v => setEditing({ ...editing, categoryEn: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ngày đăng" value={editing.date || ''} onChange={v => setEditing({ ...editing, date: v })} />
                <Field label="Thời gian đọc (phút)" value={String(editing.readTime ?? 4)} onChange={v => setEditing({ ...editing, readTime: Number(v) })} />
              </div>
              <Field label="Tóm tắt (VI)" value={editing.summaryVi || ''} onChange={v => setEditing({ ...editing, summaryVi: v })} type="textarea" />
              <Field label="Tóm tắt (EN)" value={editing.summaryEn || ''} onChange={v => setEditing({ ...editing, summaryEn: v })} type="textarea" />
              <RichTextEditor
                label="Nội dung (VI)"
                value={editing.contentVi || ''}
                onChange={v => setEditing({ ...editing, contentVi: v })}
                placeholder="Nhập nội dung tiếng Việt..."
              />
              <RichTextEditor
                label="Nội dung (EN)"
                value={editing.contentEn || ''}
                onChange={v => setEditing({ ...editing, contentEn: v })}
                placeholder="Enter English content..."
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
                  {saving ? 'Đang lưu...' : isCreating ? 'Tạo bài viết' : 'Lưu thay đổi'}
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
            <p className="text-sm text-gray-500 mb-5">Bạn có chắc muốn xóa bài viết này?</p>
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
