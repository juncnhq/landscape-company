'use client'
/**
 * GalleryInput — drop-in replacement for CloudinaryGalleryUpload
 * Adds "Chọn từ thư viện" tab for multi-select from gallery.
 * Same props interface: { value, onChange, label? }
 */

import { useEffect, useRef, useState } from 'react'

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

interface Props {
  value: string[]
  onChange: (urls: string[]) => void
  label?: string
}

interface MediaItem { id: string; url: string; filename: string }

function GalleryPickerModal({ selected, onConfirm, onClose }: {
  selected: string[]
  onConfirm: (urls: string[]) => void
  onClose: () => void
}) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [picked, setPicked] = useState<Set<string>>(new Set(selected))

  useEffect(() => {
    fetch('/api/media')
      .then(r => r.json())
      .then(data => { setMedia(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = media.filter(m => !search || m.filename.toLowerCase().includes(search.toLowerCase()))

  const toggle = (url: string) => {
    setPicked(prev => {
      const next = new Set(prev)
      next.has(url) ? next.delete(url) : next.add(url)
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Chọn ảnh từ thư viện</h3>
            <p className="text-xs text-gray-400 mt-0.5">{picked.size} ảnh đã chọn — click để chọn/bỏ</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="px-6 py-3 border-b shrink-0">
          <input autoFocus className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
            placeholder="Tìm kiếm ảnh..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              {search ? 'Không tìm thấy ảnh phù hợp' : 'Thư viện trống — upload ảnh trong Gallery trước'}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filtered.map(item => {
                const isSelected = picked.has(item.url)
                return (
                  <button key={item.id} type="button" onClick={() => toggle(item.url)}
                    className={`group relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${isSelected ? 'border-[#328442]' : 'border-transparent hover:border-[#328442]/50'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-[#328442]/30' : 'bg-black/0 group-hover:bg-black/15'}`} />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#328442] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100">Huỷ</button>
          <button type="button" onClick={() => { onConfirm(Array.from(picked)); onClose() }}
            className="px-5 py-2 text-sm font-semibold text-white rounded-lg" style={{ backgroundColor: '#328442' }}>
            Thêm {picked.size > 0 ? `(${picked.size})` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GalleryInput({ value, onChange, label = 'Ảnh gallery' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'upload' | 'library'>('upload')
  const [showPicker, setShowPicker] = useState(false)

  const uploadFile = async (file: File): Promise<string> => {
    const form = new FormData()
    form.append('file', file)
    form.append('upload_preset', UPLOAD_PRESET!)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: form })
    if (!res.ok) throw new Error('Upload thất bại')
    return (await res.json()).secure_url as string
  }

  const handleFiles = async (files: FileList) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) { setError('Chưa cấu hình Cloudinary'); return }
    setUploading(true); setError('')
    try { onChange([...value, ...await Promise.all(Array.from(files).map(uploadFile))])
    } catch { setError('Một số ảnh upload thất bại.')
    } finally { setUploading(false) }
  }

  const remove = (index: number) => onChange(value.filter((_, i) => i !== index))

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-3 w-fit">
        {(['upload', 'library'] as const).map(t => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${tab === t ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'upload' ? '☁️ Upload mới' : '📁 Thư viện'}
          </button>
        ))}
      </div>

      {/* Grid preview — always shown */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {value.map((url, i) => (
            <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs leading-none">×</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'upload' ? (
        <>
          <div
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')); if (files.length) handleFiles(Object.assign(new DataTransfer(), { files }).files) }}
            className={`w-full h-20 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${uploading ? 'border-[#328442] bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-[#328442] hover:bg-green-50/40'}`}
          >
            {uploading
              ? <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-4 h-4 border-2 border-[#328442] border-t-transparent rounded-full animate-spin" />Đang tải lên...</div>
              : <span className="text-xs text-gray-400">+ Thêm ảnh <span className="text-[#328442] font-medium">chọn file</span> hoặc kéo thả</span>}
          </div>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          <details className="mt-2">
            <summary className="text-[11px] text-gray-400 cursor-pointer select-none">Dán URL thủ công</summary>
            <textarea value={value.join('\n')} onChange={e => onChange(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
              rows={3} placeholder="Mỗi URL một dòng..."
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442] resize-none" />
          </details>
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = '' }} className="hidden" />
        </>
      ) : (
        <button type="button" onClick={() => setShowPicker(true)}
          className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#328442] rounded-lg text-sm text-gray-500 hover:text-[#328442] transition-colors font-medium">
          📁 Chọn ảnh từ thư viện
        </button>
      )}

      {showPicker && (
        <GalleryPickerModal
          selected={value}
          onConfirm={urls => onChange(urls)}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  )
}
