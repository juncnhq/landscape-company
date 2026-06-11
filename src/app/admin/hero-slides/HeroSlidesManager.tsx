'use client'
import { useEffect, useState, useCallback } from 'react'
import CloudinaryUpload from '@/components/admin/CloudinaryUpload'

interface HeroSlide {
  id: string
  order: number
  image: string
  labelVi: string
  labelEn: string
  published: boolean
}

interface MediaItem {
  id: string
  url: string
  filename: string
}

const empty = (): Omit<HeroSlide, 'id'> => ({
  order: 0,
  image: '',
  labelVi: '',
  labelEn: '',
  published: true,
})

// ── Image Picker Modal ────────────────────────────────────────────────────────
function ImagePickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void
  onClose: () => void
}) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/media')
      .then(r => r.json())
      .then(data => { setMedia(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = media.filter(m =>
    !search || m.filename.toLowerCase().includes(search.toLowerCase()) || m.url.includes(search)
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h3 className="text-lg font-bold text-gray-800">Chọn ảnh từ thư viện</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b shrink-0">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
            placeholder="Tìm kiếm ảnh..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              {search ? 'Không tìm thấy ảnh phù hợp' : 'Thư viện trống — hãy upload ảnh trong Gallery trước'}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onSelect(item.url); onClose() }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-transparent hover:border-[#328442] transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold bg-[#328442] px-2 py-1 rounded-full transition-opacity">
                      Chọn
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState(empty())
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [imageTab, setImageTab] = useState<'upload' | 'library'>('library')

  const fetchSlides = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/hero-slides/admin')
      setSlides(res.ok ? await res.json() : [])
    } catch {
      setSlides([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSlides() }, [fetchSlides])

  const openCreate = () => {
    setForm({ ...empty(), order: slides.length })
    setImageTab('library')
    setIsCreating(true)
    setEditingSlide(null)
  }

  const openEdit = (slide: HeroSlide) => {
    setForm({ order: slide.order, image: slide.image, labelVi: slide.labelVi, labelEn: slide.labelEn, published: slide.published })
    setImageTab('library')
    setEditingSlide(slide)
    setIsCreating(false)
  }

  const closeModal = () => { setEditingSlide(null); setIsCreating(false) }

  const handleSave = async () => {
    if (!form.image || !form.labelVi || !form.labelEn) return
    setSaving(true)
    try {
      if (isCreating) {
        await fetch('/api/hero-slides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else if (editingSlide) {
        await fetch(`/api/hero-slides/${editingSlide.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      await fetchSlides()
      closeModal()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' })
    await fetchSlides()
    setDeleteConfirm(null)
  }

  const togglePublished = async (slide: HeroSlide) => {
    await fetch(`/api/hero-slides/${slide.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...slide, published: !slide.published }),
    })
    await fetchSlides()
  }

  const showModal = isCreating || !!editingSlide

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hero Slides</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý ảnh slider trang chủ</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-semibold text-white rounded-lg"
          style={{ backgroundColor: '#328442' }}
        >
          + Thêm slide
        </button>
      </div>

      {/* Slides grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Đang tải...</div>
      ) : slides.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">Chưa có slide nào</p>
          <p className="text-sm">Bấm &quot;+ Thêm slide&quot; để bắt đầu</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[16/9] bg-gray-100">
                {slide.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={slide.image} alt={slide.labelVi} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 text-4xl">🖼</div>
                )}
                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
                <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ${slide.published ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-800 text-sm truncate">{slide.labelVi}</p>
                <p className="text-gray-500 text-xs truncate mt-0.5">{slide.labelEn}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => togglePublished(slide)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      slide.published
                        ? 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100'
                        : 'border-gray-200 text-gray-500 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {slide.published ? 'Hiển thị' : 'Ẩn'}
                  </button>
                  <button
                    onClick={() => openEdit(slide)}
                    className="px-3 py-1.5 text-xs font-medium text-white rounded-lg"
                    style={{ backgroundColor: '#328442' }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(slide.id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                {isCreating ? 'Thêm slide mới' : 'Chỉnh sửa slide'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Image section */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Ảnh slide</label>

                {/* Tab switcher */}
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-3 w-fit">
                  <button
                    onClick={() => setImageTab('library')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      imageTab === 'library' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    📁 Chọn từ thư viện
                  </button>
                  <button
                    onClick={() => setImageTab('upload')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      imageTab === 'upload' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ☁️ Upload mới
                  </button>
                </div>

                {imageTab === 'library' ? (
                  <div>
                    {/* Preview selected image */}
                    {form.image && (
                      <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-gray-100 mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={form.image} alt="Selected" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setForm(f => ({ ...f, image: '' }))}
                          className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full text-sm flex items-center justify-center transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => setShowPicker(true)}
                      className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#328442] rounded-xl text-sm text-gray-500 hover:text-[#328442] transition-colors font-medium"
                    >
                      {form.image ? '🔄 Đổi ảnh từ thư viện' : '📁 Mở thư viện ảnh'}
                    </button>
                  </div>
                ) : (
                  <CloudinaryUpload
                    label=""
                    value={form.image}
                    onChange={(url) => setForm(f => ({ ...f, image: url }))}
                  />
                )}
              </div>

              {/* Labels */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Label (Tiếng Việt)</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] outline-none"
                  value={form.labelVi}
                  onChange={e => setForm(f => ({ ...f, labelVi: e.target.value }))}
                  placeholder="VD: Thiết kế cảnh quan"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Label (English)</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] outline-none"
                  value={form.labelEn}
                  onChange={e => setForm(f => ({ ...f, labelEn: e.target.value }))}
                  placeholder="e.g. Landscape Design"
                />
              </div>

              {/* Order + Published */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Thứ tự</label>
                  <input
                    type="number"
                    min={0}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] outline-none"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                  />
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                      className="w-4 h-4 accent-[#328442]"
                    />
                    <span className="text-sm text-gray-700">Hiển thị</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-lg">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100">
                Huỷ
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.image || !form.labelVi || !form.labelEn}
                className="px-5 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50"
                style={{ backgroundColor: '#328442' }}
              >
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Picker Modal */}
      {showPicker && (
        <ImagePickerModal
          onSelect={(url) => setForm(f => ({ ...f, image: url }))}
          onClose={() => setShowPicker(false)}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Xoá slide?</h3>
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
