'use client'

import { useState, useEffect, useRef } from 'react'

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

type MediaItem = {
  id: string
  url: string
  filename: string
  folder: string
  createdAt: string
}

type GalleryImage = {
  url: string
  source: string
  label: string
}

const SOURCE_LABELS: Record<string, string> = {
  media: 'Gallery',
  projects: 'Dự án',
  news: 'Tin tức',
  services: 'Dịch vụ',
  partners: 'Đối tác',
  'member-companies': 'Hệ sinh thái',
}

const SOURCE_COLORS: Record<string, string> = {
  media: 'bg-[#328442]/10 text-[#328442]',
  projects: 'bg-green-100 text-green-700',
  news: 'bg-blue-100 text-blue-700',
  services: 'bg-purple-100 text-purple-700',
  partners: 'bg-amber-100 text-amber-700',
  'member-companies': 'bg-rose-100 text-rose-700',
}

export default function GalleryManager() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [allImages, setAllImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState<{ url: string; index: number } | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      const collected: GalleryImage[] = []

      const fetchJson = (url: string) =>
        fetch(url).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })

      const [mediaRes, projects, news, services, partners, companies] = await Promise.all([
        fetchJson('/api/media'),
        fetchJson('/api/projects'),
        fetchJson('/api/news'),
        fetchJson('/api/services'),
        fetchJson('/api/partners'),
        fetchJson('/api/member-companies'),
      ]).catch(err => { console.error('Failed to load gallery:', err); return [[], [], [], [], [], []] })

      setMediaItems(mediaRes)
      for (const m of mediaRes) collected.push({ url: m.url, source: 'media', label: m.filename || 'Gallery' })
      for (const p of projects) {
        if (p.image) collected.push({ url: p.image, source: 'projects', label: p.title })
        for (const img of p.images ?? []) collected.push({ url: img, source: 'projects', label: p.title })
      }
      for (const a of news) {
        if (a.image) collected.push({ url: a.image, source: 'news', label: a.titleVi })
      }
      for (const s of services) {
        for (const img of s.images ?? []) collected.push({ url: img, source: 'services', label: s.titleVi })
      }
      for (const p of partners) {
        for (const img of p.images ?? []) collected.push({ url: img, source: 'partners', label: p.name })
      }
      for (const c of companies) {
        for (const img of c.images ?? []) collected.push({ url: img, source: 'member-companies', label: c.name })
      }

      setAllImages(collected)
      setLoading(false)
    }

    fetchAll()
  }, [])

  const uploadFiles = async (files: File[]) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) return
    setUploading(true)
    setUploadProgress(0)

    let done = 0
    const results: MediaItem[] = []

    for (const file of files) {
      try {
        const form = new FormData()
        form.append('file', file)
        form.append('upload_preset', UPLOAD_PRESET)

        const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: form,
        })
        if (!cloudRes.ok) throw new Error(`Cloudinary error ${cloudRes.status}`)
        const data = await cloudRes.json()

        const saved = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: data.secure_url, filename: file.name }),
        })
        if (!saved.ok) throw new Error(`Save error ${saved.status}`)
        results.push(await saved.json())
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err)
      }

      done++
      setUploadProgress(Math.round((done / files.length) * 100))
    }

    // Update state
    setMediaItems(prev => [...results, ...prev])
    setAllImages(prev => [
      ...results.map(m => ({ url: m.url, source: 'media', label: m.filename || 'Gallery' })),
      ...prev,
    ])
    setUploading(false)
    setUploadProgress(0)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter(f => f.type.startsWith('image/'))
    if (files.length) uploadFiles(files)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (files.length) uploadFiles(files)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/media/${id}`, { method: 'DELETE' })
    setMediaItems(prev => prev.filter(m => m.id !== id))
    setAllImages(prev => {
      const item = mediaItems.find(m => m.id === id)
      if (!item) return prev
      return prev.filter(img => img.url !== item.url)
    })
    setDeleteConfirm(null)
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const filtered = filter === 'all' ? allImages : allImages.filter(img => img.source === filter)
  const sources = ['all', ...Object.keys(SOURCE_LABELS)]

  // Lightbox navigation
  const lightboxPrev = () => {
    if (!lightbox) return
    const prev = (lightbox.index - 1 + filtered.length) % filtered.length
    setLightbox({ url: filtered[prev].url, index: prev })
  }
  const lightboxNext = () => {
    if (!lightbox) return
    const next = (lightbox.index + 1) % filtered.length
    setLightbox({ url: filtered[next].url, index: next })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4">
        <h1 className="text-base font-semibold text-gray-900">Gallery</h1>
        <p className="text-xs text-gray-400 mt-0.5">{allImages.length} ảnh · {mediaItems.length} trong thư viện</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-10 cursor-pointer transition-all
            ${isDragging ? 'border-[#328442] bg-green-50 scale-[1.01]' : uploading ? 'border-[#328442] bg-green-50/50' : 'border-gray-200 bg-white hover:border-[#328442] hover:bg-green-50/30'}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-[#328442] border-t-transparent rounded-full animate-spin" style={{ borderWidth: 3 }} />
              <p className="text-sm text-gray-600 font-medium">Đang tải lên... {uploadProgress}%</p>
              <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#328442] rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-[#328442]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">Kéo ảnh vào đây hoặc <span className="text-[#328442]">chọn file</span></p>
              <p className="text-xs text-gray-400 mt-1">Hỗ trợ JPG, PNG, WebP · nhiều file cùng lúc</p>
            </>
          )}
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {sources.map(s => {
            const count = s === 'all' ? allImages.length : allImages.filter(i => i.source === s).length
            if (count === 0 && s !== 'all') return null
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === s
                    ? 'bg-[#328442] text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {s === 'all' ? 'Tất cả' : SOURCE_LABELS[s]} <span className="opacity-60 text-xs ml-1">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-white animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">Chưa có ảnh nào</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((img, i) => {
              const mediaId = img.source === 'media' ? mediaItems.find(m => m.url === img.url)?.id : undefined
              return (
                <div key={i} className="group relative aspect-square rounded-md overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    onClick={() => setLightbox({ url: img.url, index: i })}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Source badge */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${SOURCE_COLORS[img.source]}`}>
                      {SOURCE_LABELS[img.source]}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyUrl(img.url)}
                      title="Copy URL"
                      className="w-7 h-7 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center text-gray-700 transition-colors shadow"
                    >
                      {copiedUrl === img.url ? (
                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                      )}
                    </button>
                    {mediaId && (
                      <button
                        onClick={() => setDeleteConfirm(mediaId)}
                        title="Xóa"
                        className="w-7 h-7 bg-white/90 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center text-gray-700 transition-colors shadow"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Label */}
                  <p className="absolute bottom-2 left-2 right-14 text-white text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.label}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Prev */}
          <button
            className="absolute left-4 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          {/* Image */}
          <img
            src={lightbox.url}
            alt=""
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          {/* Next */}
          <button
            className="absolute right-4 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); lightboxNext() }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          {/* Counter + copy */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-white/50 text-sm">{lightbox.index + 1} / {filtered.length}</span>
            <button
              onClick={(e) => { e.stopPropagation(); copyUrl(lightbox.url) }}
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors"
            >
              {copiedUrl === lightbox.url ? 'Đã copy!' : 'Copy URL'}
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Xóa ảnh</h3>
            <p className="text-sm text-gray-500 mb-5">Ảnh sẽ bị xóa khỏi thư viện (không xóa trên Cloudinary).</p>
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
