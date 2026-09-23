'use client'

import { useRef, useState } from 'react'

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function CloudinaryUpload({ value, onChange, label = 'Ảnh đại diện' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const upload = async (file: File) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError('Chưa cấu hình Cloudinary')
      return
    }
    setUploading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', UPLOAD_PRESET)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: form }
      )
      if (!res.ok) throw new Error('Upload thất bại')
      const data = await res.json()
      onChange(data.secure_url)
    } catch {
      setError('Upload thất bại, thử lại.')
    } finally {
      setUploading(false)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) upload(file)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {value ? (
        <div className="relative group w-full h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-800 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Thay ảnh
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Xóa
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`w-full h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors
            ${uploading ? 'border-[#328442] bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-[#328442] hover:bg-green-50/40'}`}
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-[#328442] border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-xs text-gray-500">Đang tải lên...</span>
            </>
          ) : (
            <>
              <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 19.5h18M13.5 6.75h.008v.008H13.5V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs text-gray-400">Kéo ảnh vào hoặc <span className="text-[#328442] font-medium">chọn file</span></span>
              <span className="text-[10px] text-gray-300 mt-1">JPG, PNG, WebP</span>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {/* URL input fallback */}
      <input
        type="text"
        placeholder="Hoặc dán URL ảnh..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-3 py-1.5 rounded-md border border-gray-200 text-xs text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
      />

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  )
}
