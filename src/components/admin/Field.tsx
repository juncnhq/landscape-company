'use client'

import { useEffect, useRef } from 'react'

/**
 * Ô nhập dùng chung cho mọi form trong admin.
 *
 * Trước đây mỗi manager tự khai báo `Field` riêng với cùng một chuỗi class,
 * nên mỗi lần chỉnh giao diện lại phải sửa 5 chỗ.
 *
 * Feedback 22.09: "viền bo tròn che mất chữ" — hai thay đổi ở đây:
 *  1. `rounded-md` thay cho `rounded-lg`: gần như hình chữ nhật, chỉ bo nhẹ
 *     4 góc nên góc bo không còn ăn vào ký tự đầu/cuối dòng.
 *  2. Textarea tự giãn theo nội dung (`resize-none` + đo `scrollHeight`).
 *     Bản cũ cố định `rows={3}` và chặn resize, nên mô tả dài hơn 3 dòng bị
 *     cắt mất phần dưới mà không có cách nào xem hết.
 */
export const adminInputClass =
  'w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-900 bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-[#328442]/30 focus:border-[#328442]'

/**
 * Textarea cao đúng bằng nội dung, tối thiểu `rows` dòng.
 *
 * Đặt `height: auto` trước khi đọc `scrollHeight` để ô còn co lại được khi
 * xoá bớt chữ; `scrollHeight` luôn ≥ chiều cao theo `rows` nên vẫn giữ được
 * chiều cao tối thiểu.
 */
export function AutoTextarea({
  value,
  onChange,
  rows = 3,
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
  className?: string
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${adminInputClass} resize-none overflow-hidden ${className}`}
    />
  )
}

export default function Field({
  label,
  value,
  onChange,
  type = 'text',
  options,
  required = false,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: 'text' | 'textarea' | 'select'
  options?: string[]
  required?: boolean
  rows?: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {type === 'textarea' ? (
        <AutoTextarea value={value} onChange={onChange} rows={rows} />
      ) : type === 'select' ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={adminInputClass}>
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={adminInputClass}
        />
      )}
    </div>
  )
}
