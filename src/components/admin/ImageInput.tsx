'use client'
/**
 * ImageInput — drop-in replacement for CloudinaryUpload
 * Adds "Chọn từ thư viện" tab alongside existing upload/URL functionality.
 * Same props interface: { value, onChange, label? }
 */

import { useRef, useState } from 'react'
import ImagePickerModal from './ImagePickerModal'

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageInput({ value, onChange, label = 'Ảnh đại diện' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'upload' | 'library'>('upload')
  const [showPicker, setShowPicker] = useState(false)

  const upload = async (file: File) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) { setError('Chưa cấu hình Cloudinary'); return }
    setUploading(true); setError('')
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', UPLOAD_PRESET)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: form })
      if (!res.ok) throw new Error()
      onChange((await res.json()).secure_url)
    } catch { setError('Upload thất bại, thử lại.')
    } finally { setUploading(false) }
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-3 w-fit">
        {(['upload', 'library'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              tab === t ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'upload' ? '☁️ Upload mới' : '📁 Thư viện'}
          </button>
        ))}
      </div>

      {tab === 'upload' ? (
        <>
          {value ? (
            <div className="relative group w-full h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button type="button" onClick={() => inputRef.current?.click()} className="bg-white text-gray-800 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-gray-100">Thay ảnh</button>
                <button type="button" onClick={() => onChange('')} className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-red-700">Xóa</button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => !uploading && inputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f?.type.startsWith('image/')) upload(f) }}
              className={`w-full h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${uploading ? 'border-[#328442] bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-[#328442] hover:bg-green-50/40'}`}
            >
              {uploading ? (
                <><div className="w-6 h-6 border-2 border-[#328442] border-t-transparent rounded-full animate-spin mb-2" /><span className="text-xs text-gray-500">Đang tải lên...</span></>
              ) : (
                <><svg className="w-8 h-8 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 19.5h18M13.5 6.75h.008v.008H13.5V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                <span className="text-xs text-gray-400">Kéo ảnh vào hoặc <span className="text-[#328442] font-medium">chọn file</span></span><span className="text-[10px] text-gray-300 mt-1">JPG, PNG, WebP</span></>
              )}
            </div>
          )}
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          <input type="text" placeholder="Hoặc dán URL ảnh..." value={value} onChange={e => onChange(e.target.value)}
            className="mt-2 w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]" />
          <input ref={inputRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = '' }} className="hidden" />
        </>
      ) : (
        <div>
          {value && (
            <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-gray-100 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Selected" className="w-full h-full object-cover" />
              <button type="button" onClick={() => onChange('')} className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full text-sm flex items-center justify-center">×</button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#328442] rounded-lg text-sm text-gray-500 hover:text-[#328442] transition-colors font-medium"
          >
            {value ? '🔄 Đổi ảnh' : '📁 Mở thư viện ảnh'}
          </button>
        </div>
      )}

      {showPicker && <ImagePickerModal onSelect={url => { onChange(url); setShowPicker(false) }} onClose={() => setShowPicker(false)} />}
    </div>
  )
}
