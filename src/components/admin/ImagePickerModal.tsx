'use client'
import { useEffect, useState } from 'react'

interface MediaItem { id: string; url: string; filename: string }

interface Props {
  onSelect: (url: string) => void
  onClose: () => void
}

export default function ImagePickerModal({ onSelect, onClose }: Props) {
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
    !search || m.filename.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h3 className="text-lg font-bold text-gray-800">Chọn ảnh từ thư viện</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="px-6 py-3 border-b shrink-0">
          <input
            autoFocus
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]"
            placeholder="Tìm kiếm ảnh..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
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
