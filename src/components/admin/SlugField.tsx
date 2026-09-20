'use client'

import { useEffect, useRef } from 'react'
import { slugify } from '@/lib/slugify'

const cls =
  'w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]'

interface Props {
  value: string
  onChange: (v: string) => void
  /** Tiêu đề dùng để tự sinh slug khi tạo mới. */
  source?: string
  /** Chỉ bật khi tạo mới — đổi slug bài cũ là gãy mọi link đã chia sẻ. */
  autoFill?: boolean
  label?: string
}

/**
 * Ô nhập slug tự chuẩn hoá.
 *
 * API từ chối slug có dấu hoặc khoảng trắng (vì slug nằm trong URL public),
 * nên ô này tự sinh từ tiêu đề lúc tạo mới và tự chuẩn hoá khi rời ô —
 * admin không phải tự đoán luật đặt tên.
 */
export default function SlugField({
  value,
  onChange,
  source = '',
  autoFill = false,
  label = 'Slug',
}: Props) {
  const touched = useRef(false)
  const onChangeRef = useRef(onChange)

  // Giữ ref trỏ tới onChange mới nhất mà không phải đưa nó vào deps bên dưới
  // (onChange là closure mới mỗi lần render → sẽ lặp vô hạn). Effect này khai
  // báo trước nên luôn chạy trước effect tự sinh slug.
  useEffect(() => {
    onChangeRef.current = onChange
  })

  // Bám theo tiêu đề cho tới khi admin tự gõ vào ô slug.
  useEffect(() => {
    if (!autoFill || touched.current) return
    onChangeRef.current(slugify(source))
  }, [source, autoFill])

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={value}
        placeholder="du-an-san-golf"
        onChange={(e) => {
          touched.current = true
          onChange(e.target.value)
        }}
        onBlur={(e) => {
          const s = slugify(e.target.value)
          if (s !== e.target.value) onChange(s)
        }}
        className={cls}
      />
      <p className="mt-1 text-xs text-gray-400">
        Nằm trong link công khai — chỉ chữ thường không dấu, số và gạch ngang. Tự chuẩn hoá khi rời ô.
      </p>
    </div>
  )
}
