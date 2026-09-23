'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { useRef, useEffect, useState } from 'react'

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  label?: string
}

export default function RichTextEditor({ value, onChange, placeholder = 'Nhập nội dung...', label }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isUpdating = useRef(false)
  const [uploadError, setUploadError] = useState('')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-green-700 underline' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[240px] px-4 py-3 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      isUpdating.current = true
      onChange(editor.getHTML())
      isUpdating.current = false
    },
  })

  // Sync value from outside (e.g. when switching between VI/EN tabs)
  useEffect(() => {
    if (!editor || isUpdating.current) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  const uploadImage = async (file: File) => {
    // Trước đây hàm này không kiểm tra gì: preset thiếu thì return im lặng,
    // upload hỏng thì `res.json()` có thể ném lỗi, và ảnh chỉ đơn giản không
    // hiện ra mà người viết bài không biết vì sao.
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setUploadError('Chưa cấu hình Cloudinary — không chèn được ảnh.')
      return
    }
    setUploadError('')
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', UPLOAD_PRESET)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error(`Cloudinary trả về ${res.status}`)
      const data = await res.json()
      if (!data?.secure_url) throw new Error('Cloudinary không trả về đường dẫn ảnh')
      editor?.chain().focus().setImage({ src: data.secure_url }).run()
    } catch {
      setUploadError('Chèn ảnh thất bại, vui lòng thử lại.')
    }
  }

  if (!editor) return null

  const btn = (active: boolean) =>
    `px-2 py-1 rounded text-xs font-medium transition-colors ${active ? 'bg-[#328442] text-white' : 'text-gray-600 hover:bg-gray-100'}`

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="border border-gray-200 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#328442]/30 focus-within:border-[#328442]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-100 bg-gray-50/60">
          {/* Text style */}
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))} title="Bold">
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))} title="Italic">
            <em>I</em>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive('underline'))} title="Underline">
            <span className="underline">U</span>
          </button>

          <div className="w-px h-4 bg-gray-200 mx-1" />

          {/* Headings */}
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))} title="Heading 2">
            H2
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))} title="Heading 3">
            H3
          </button>

          <div className="w-px h-4 bg-gray-200 mx-1" />

          {/* Lists */}
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))} title="Bullet list">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))} title="Ordered list">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 5.25h.007v.008H3.75V12zm0 5.25h.007v.008H3.75v-.008z" />
            </svg>
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive('blockquote'))} title="Blockquote">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </button>

          <div className="w-px h-4 bg-gray-200 mx-1" />

          {/* Align */}
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn(editor.isActive({ textAlign: 'left' }))} title="Align left">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h10.5m-10.5 5.25h16.5" /></svg>
          </button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn(editor.isActive({ textAlign: 'center' }))} title="Center">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M6.75 12h10.5M3.75 17.25h16.5" /></svg>
          </button>

          <div className="w-px h-4 bg-gray-200 mx-1" />

          {/* Image upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={btn(false)}
            title="Chèn ảnh"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 19.5h18M13.5 6.75h.008v.008H13.5V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>

          {/* Undo / Redo */}
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={`${btn(false)} disabled:opacity-30`} title="Undo">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
          </button>
          <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={`${btn(false)} disabled:opacity-30`} title="Redo">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg>
          </button>
        </div>

        {/* Editor */}
        <EditorContent editor={editor} />
        {uploadError && (
          <p className="px-3 pb-2 text-xs text-red-600">{uploadError}</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) uploadImage(file)
          e.target.value = ''
        }}
      />

      <style>{`
        .ProseMirror img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; }
        .ProseMirror blockquote { border-left: 3px solid #328442; padding-left: 12px; color: #555; margin: 8px 0; }
        .ProseMirror h2 { font-size: 1.2em; font-weight: 700; margin: 12px 0 4px; }
        .ProseMirror h3 { font-size: 1.05em; font-weight: 600; margin: 10px 0 4px; }
        .ProseMirror ul { list-style: disc; padding-left: 20px; }
        .ProseMirror ol { list-style: decimal; padding-left: 20px; }
        .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #aaa; float: left; pointer-events: none; height: 0; }
      `}</style>
    </div>
  )
}
