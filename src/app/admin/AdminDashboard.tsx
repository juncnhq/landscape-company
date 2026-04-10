'use client'

import { useState, useEffect, useCallback } from 'react'

type Project = {
  id: string
  slug: string
  title: string
  titleEn: string
  category: string
  location: string
  area: string
  duration: string
  client: string
  year: string
  image: string
  images: string[]
  description: string
  descriptionEn: string
  published: boolean
  createdAt: string
  updatedAt: string
}

const CATEGORIES = ['All', 'Golf', 'Resort', 'Urban', 'Construction', 'Artwork']

const emptyProject = {
  slug: '',
  title: '',
  titleEn: '',
  category: 'Golf',
  location: '',
  area: '—',
  duration: '—',
  client: '',
  year: new Date().getFullYear().toString(),
  image: '',
  images: [] as string[],
  description: '',
  descriptionEn: '',
  published: true,
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [imagesText, setImagesText] = useState('')

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter !== 'All') params.set('category', filter)
    if (search) params.set('search', search)

    const res = await fetch(`/api/projects?${params}`)
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }, [filter, search])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleSave = async () => {
    if (!editingProject) return
    setSaving(true)

    const payload = {
      ...editingProject,
      images: imagesText.split('\n').map(s => s.trim()).filter(Boolean),
    }

    if (isCreating) {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    setSaving(false)
    setEditingProject(null)
    setIsCreating(false)
    fetchProjects()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    setDeleteConfirm(null)
    fetchProjects()
  }

  const openEdit = (project: Project) => {
    setEditingProject(project)
    setImagesText(project.images.join('\n'))
    setIsCreating(false)
  }

  const openCreate = () => {
    setEditingProject({ ...emptyProject })
    setImagesText('')
    setIsCreating(true)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#07130a] text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#328442] flex items-center justify-center font-bold text-sm">
              F
            </div>
            <div>
              <h1 className="text-lg font-semibold">FAM Admin</h1>
              <p className="text-xs text-gray-400">Quản lý dự án</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{projects.length} dự án</span>
            <button
              onClick={openCreate}
              className="bg-[#328442] hover:bg-[#48a85a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + Thêm dự án
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Đăng xuất"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-[#328442] text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Đang tải...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-medium text-gray-500 w-16">Ảnh</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Tên dự án</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Danh mục</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Địa điểm</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Khách hàng</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Năm</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Trạng thái</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-500 w-28">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-gray-100 hover:bg-green-50/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="w-12 h-8 rounded overflow-hidden bg-gray-100">
                          {project.image && (
                            <img
                              src={project.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{project.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{project.titleEn}</div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          project.category === 'Golf' ? 'bg-green-100 text-green-700' :
                          project.category === 'Resort' ? 'bg-blue-100 text-blue-700' :
                          project.category === 'Urban' ? 'bg-purple-100 text-purple-700' :
                          project.category === 'Construction' ? 'bg-orange-100 text-orange-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {project.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{project.location}</td>
                      <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{project.client}</td>
                      <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{project.year}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block w-2 h-2 rounded-full ${project.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(project)}
                            className="p-1.5 rounded-md hover:bg-green-100 text-gray-500 hover:text-[#328442] transition-colors"
                            title="Sửa"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(project.id)}
                            className="p-1.5 rounded-md hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                            title="Xóa"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                        Không tìm thấy dự án nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {isCreating ? 'Thêm dự án mới' : 'Chỉnh sửa dự án'}
              </h2>
              <button
                onClick={() => { setEditingProject(null); setIsCreating(false) }}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Slug" value={editingProject.slug || ''} onChange={(v) => setEditingProject({ ...editingProject, slug: v })} />
                <Field label="Danh mục" value={editingProject.category || 'Golf'} onChange={(v) => setEditingProject({ ...editingProject, category: v })} type="select" options={CATEGORIES.filter(c => c !== 'All')} />
              </div>
              <Field label="Tên dự án (VI)" value={editingProject.title || ''} onChange={(v) => setEditingProject({ ...editingProject, title: v })} />
              <Field label="Tên dự án (EN)" value={editingProject.titleEn || ''} onChange={(v) => setEditingProject({ ...editingProject, titleEn: v })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Địa điểm" value={editingProject.location || ''} onChange={(v) => setEditingProject({ ...editingProject, location: v })} />
                <Field label="Khách hàng" value={editingProject.client || ''} onChange={(v) => setEditingProject({ ...editingProject, client: v })} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Năm" value={editingProject.year || ''} onChange={(v) => setEditingProject({ ...editingProject, year: v })} />
                <Field label="Diện tích" value={editingProject.area || ''} onChange={(v) => setEditingProject({ ...editingProject, area: v })} />
                <Field label="Thời gian" value={editingProject.duration || ''} onChange={(v) => setEditingProject({ ...editingProject, duration: v })} />
              </div>
              <Field label="Ảnh đại diện (URL)" value={editingProject.image || ''} onChange={(v) => setEditingProject({ ...editingProject, image: v })} />
              <Field label="Mô tả (VI)" value={editingProject.description || ''} onChange={(v) => setEditingProject({ ...editingProject, description: v })} type="textarea" />
              <Field label="Mô tả (EN)" value={editingProject.descriptionEn || ''} onChange={(v) => setEditingProject({ ...editingProject, descriptionEn: v })} type="textarea" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh gallery (mỗi URL 1 dòng)</label>
                <textarea
                  value={imagesText}
                  onChange={(e) => setImagesText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] resize-none"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProject.published ?? true}
                  onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#328442] focus:ring-[#328442]"
                />
                <span className="text-sm text-gray-700">Xuất bản</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => { setEditingProject(null); setIsCreating(false) }}
                className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {saving ? 'Đang lưu...' : isCreating ? 'Tạo dự án' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500 mb-5">
              Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Xóa dự án
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: 'text' | 'textarea' | 'select'
  options?: string[]
}) {
  const cls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`${cls} resize-none`} />
      ) : type === 'select' ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={cls}>
          {options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  )
}
