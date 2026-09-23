'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchJson, sendJson, errMessage } from '@/lib/apiClient'
import Field, { AutoTextarea } from '@/components/admin/Field'
import GalleryInput from '@/components/admin/GalleryInput'
import { AboutContent, EMPTY_ABOUT } from '@/lib/aboutContent'

/**
 * Sửa nội dung trang /vi/about.
 *
 * Khác các manager còn lại: đây là **một bản ghi duy nhất**, không có danh sách
 * hay modal — cả trang là một form, lưu bằng PUT /api/about-page.
 *
 * Các danh sách lặp (tính năng, chỉ số, FAQ, quy trình) nhập bằng textarea
 * "mỗi dòng 1 mục", đúng quy ước sẵn có ở Partner/Service. Cặp mảng song song
 * (chỉ số ↔ nhãn, câu hỏi ↔ trả lời) phải cùng số dòng — form cảnh báo khi lệch
 * vì trang public cắt theo mảng ngắn hơn, tức là dòng thừa sẽ biến mất.
 */

const linesToArray = (t: string) => t.split('\n').map(s => s.trim()).filter(Boolean)
const arrayToLines = (a: string[] | undefined) => (a ?? []).join('\n')

export default function AboutManager() {
  const [form, setForm] = useState<AboutContent>(EMPTY_ABOUT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listError, setListError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const set = <K extends keyof AboutContent>(key: K, value: AboutContent[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }
  const setText = (key: keyof AboutContent) => (v: string) =>
    set(key, v as AboutContent[typeof key])
  const setList = (key: keyof AboutContent) => (v: string) =>
    set(key, linesToArray(v) as AboutContent[typeof key])

  const fetchContent = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchJson<Partial<AboutContent>>(
        '/api/about-page',
        'Không tải được nội dung trang About.',
      )
      setForm({ ...EMPTY_ABOUT, ...data })
      setListError(null)
    } catch (e) {
      setListError(errMessage(e, 'Không tải được nội dung trang About.'))
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchContent() }, [fetchContent])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      await sendJson('/api/about-page', { method: 'PUT', body: form })
      setSaved(true)
    } catch (e) {
      setError(errMessage(e, 'Lưu thất bại. Vui lòng thử lại.'))
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="px-6 py-6 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-white animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-[#f0f4f1]/90 backdrop-blur border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Về chúng tôi</h1>
          <p className="text-xs text-gray-400 mt-0.5">Nội dung hiển thị trên trang /vi/about</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-[#328442]">✓ Đã lưu</span>}
          <a
            href="/vi/about"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-white border border-gray-200 transition-colors"
          >
            Xem trang
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#328442] hover:bg-[#48a85a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-5 max-w-4xl">
        {listError && <Alert>{listError}</Alert>}
        {error && <Alert>{error}</Alert>}

        <Card title="Hero (đầu trang)" note="Ảnh nền hero sửa ở trang “Ảnh trang”">
          <Pair>
            <Field label="Eyebrow (VI)" value={form.heroEyebrowVi} onChange={setText('heroEyebrowVi')} />
            <Field label="Eyebrow (EN)" value={form.heroEyebrowEn} onChange={setText('heroEyebrowEn')} />
          </Pair>
          <Pair>
            <Field label="Tiêu đề (VI)" value={form.heroTitleVi} onChange={setText('heroTitleVi')} />
            <Field label="Tiêu đề (EN)" value={form.heroTitleEn} onChange={setText('heroTitleEn')} />
          </Pair>
          <Pair>
            <Field label="Mô tả (VI)" value={form.heroDescVi} onChange={setText('heroDescVi')} type="textarea" />
            <Field label="Mô tả (EN)" value={form.heroDescEn} onChange={setText('heroDescEn')} type="textarea" />
          </Pair>
        </Card>

        <Card title="1 — Giới thiệu">
          <Pair>
            <Field label="Eyebrow (VI)" value={form.introEyebrowVi} onChange={setText('introEyebrowVi')} />
            <Field label="Eyebrow (EN)" value={form.introEyebrowEn} onChange={setText('introEyebrowEn')} />
          </Pair>
          <Pair>
            <Field label="Tiêu đề (VI)" value={form.introTitleVi} onChange={setText('introTitleVi')} />
            <Field label="Tiêu đề (EN)" value={form.introTitleEn} onChange={setText('introTitleEn')} />
          </Pair>
          <Pair>
            <Field label="Mô tả (VI)" value={form.introDescVi} onChange={setText('introDescVi')} type="textarea" rows={4} />
            <Field label="Mô tả (EN)" value={form.introDescEn} onChange={setText('introDescEn')} type="textarea" rows={4} />
          </Pair>
          <ListPair
            labelVi="Gạch đầu dòng (VI)"
            labelEn="Gạch đầu dòng (EN)"
            vi={form.featuresVi}
            en={form.featuresEn}
            onChangeVi={setList('featuresVi')}
            onChangeEn={setList('featuresEn')}
          />
          <div className="grid grid-cols-3 gap-4">
            <Field label="Số trên badge" value={form.badgeValue} onChange={setText('badgeValue')} />
            <Field label="Nhãn badge (VI)" value={form.badgeLabelVi} onChange={setText('badgeLabelVi')} />
            <Field label="Nhãn badge (EN)" value={form.badgeLabelEn} onChange={setText('badgeLabelEn')} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Tên người đại diện" value={form.ownerName} onChange={setText('ownerName')} />
            <Field label="Chức danh (VI)" value={form.ownerRoleVi} onChange={setText('ownerRoleVi')} />
            <Field label="Chức danh (EN)" value={form.ownerRoleEn} onChange={setText('ownerRoleEn')} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Số điện thoại" value={form.phone} onChange={setText('phone')} />
            <Field label="Nhãn điện thoại (VI)" value={form.phoneLabelVi} onChange={setText('phoneLabelVi')} />
            <Field label="Nhãn điện thoại (EN)" value={form.phoneLabelEn} onChange={setText('phoneLabelEn')} />
          </div>
          <GalleryInput
            label="Ảnh collage (thứ tự quyết định vị trí trên trang)"
            value={form.images}
            onChange={v => set('images', v)}
          />
        </Card>

        <Card title="2 — Chỉ số">
          <Pair>
            <Field label="Tiêu đề khối (VI)" value={form.statsTitleVi} onChange={setText('statsTitleVi')} />
            <Field label="Tiêu đề khối (EN)" value={form.statsTitleEn} onChange={setText('statsTitleEn')} />
          </Pair>
          <div className="grid grid-cols-3 gap-4">
            <Lines label="Giá trị — mỗi dòng 1 mục" hint="ví dụ 200+ · 99%" value={form.statValues} onChange={setList('statValues')} />
            <Lines label="Nhãn (VI)" value={form.statLabelsVi} onChange={setList('statLabelsVi')} />
            <Lines label="Nhãn (EN)" value={form.statLabelsEn} onChange={setList('statLabelsEn')} />
          </div>
          <LenWarning groups={[
            ['Giá trị', form.statValues.length],
            ['Nhãn VI', form.statLabelsVi.length],
            ['Nhãn EN', form.statLabelsEn.length],
          ]} />
        </Card>

        <Card title="3 — FAQ">
          <Pair>
            <Field label="Eyebrow (VI)" value={form.faqEyebrowVi} onChange={setText('faqEyebrowVi')} />
            <Field label="Eyebrow (EN)" value={form.faqEyebrowEn} onChange={setText('faqEyebrowEn')} />
          </Pair>
          <Pair>
            <Field label="Tiêu đề (VI)" value={form.faqTitleVi} onChange={setText('faqTitleVi')} />
            <Field label="Tiêu đề (EN)" value={form.faqTitleEn} onChange={setText('faqTitleEn')} />
          </Pair>
          <Pair>
            <Field label="Mô tả (VI)" value={form.faqDescVi} onChange={setText('faqDescVi')} type="textarea" />
            <Field label="Mô tả (EN)" value={form.faqDescEn} onChange={setText('faqDescEn')} type="textarea" />
          </Pair>
          <Pair>
            <Lines label="Câu hỏi (VI)" value={form.faqQuestionsVi} onChange={setList('faqQuestionsVi')} rows={4} />
            <Lines label="Câu hỏi (EN)" value={form.faqQuestionsEn} onChange={setList('faqQuestionsEn')} rows={4} />
          </Pair>
          <Pair>
            <Lines label="Trả lời (VI) — cùng thứ tự với câu hỏi" value={form.faqAnswersVi} onChange={setList('faqAnswersVi')} rows={6} />
            <Lines label="Trả lời (EN) — cùng thứ tự với câu hỏi" value={form.faqAnswersEn} onChange={setList('faqAnswersEn')} rows={6} />
          </Pair>
          <LenWarning groups={[
            ['Câu hỏi VI', form.faqQuestionsVi.length],
            ['Trả lời VI', form.faqAnswersVi.length],
            ['Câu hỏi EN', form.faqQuestionsEn.length],
            ['Trả lời EN', form.faqAnswersEn.length],
          ]} />
        </Card>

        <Card title="4 — Quy trình">
          <Pair>
            <Field label="Eyebrow (VI)" value={form.processEyebrowVi} onChange={setText('processEyebrowVi')} />
            <Field label="Eyebrow (EN)" value={form.processEyebrowEn} onChange={setText('processEyebrowEn')} />
          </Pair>
          <Pair>
            <Field label="Tiêu đề (VI)" value={form.processTitleVi} onChange={setText('processTitleVi')} />
            <Field label="Tiêu đề (EN)" value={form.processTitleEn} onChange={setText('processTitleEn')} />
          </Pair>
          <ListPair
            labelVi="Các bước (VI)"
            labelEn="Các bước (EN)"
            vi={form.processVi}
            en={form.processEn}
            onChangeVi={setList('processVi')}
            onChangeEn={setList('processEn')}
          />
          <p className="text-xs text-gray-400">
            Trang chỉ có 4 biểu tượng quy trình — nhập quá 4 bước thì các bước sau dùng lại biểu tượng đầu.
          </p>
        </Card>

        <Card title="5 — Sứ mệnh">
          <Pair>
            <Field label="Eyebrow (VI)" value={form.missionEyebrowVi} onChange={setText('missionEyebrowVi')} />
            <Field label="Eyebrow (EN)" value={form.missionEyebrowEn} onChange={setText('missionEyebrowEn')} />
          </Pair>
          <Pair>
            <Field label="Tiêu đề (VI)" value={form.missionTitleVi} onChange={setText('missionTitleVi')} />
            <Field label="Tiêu đề (EN)" value={form.missionTitleEn} onChange={setText('missionTitleEn')} />
          </Pair>
          <Pair>
            <Field label="Đoạn 1 (VI)" value={form.missionDesc1Vi} onChange={setText('missionDesc1Vi')} type="textarea" rows={4} />
            <Field label="Đoạn 1 (EN)" value={form.missionDesc1En} onChange={setText('missionDesc1En')} type="textarea" rows={4} />
          </Pair>
          <Pair>
            <Field label="Đoạn 2 (VI)" value={form.missionDesc2Vi} onChange={setText('missionDesc2Vi')} type="textarea" rows={3} />
            <Field label="Đoạn 2 (EN)" value={form.missionDesc2En} onChange={setText('missionDesc2En')} type="textarea" rows={3} />
          </Pair>
        </Card>

        <Card title="CTA cuối trang">
          <Pair>
            <Field label="Eyebrow (VI)" value={form.ctaEyebrowVi} onChange={setText('ctaEyebrowVi')} />
            <Field label="Eyebrow (EN)" value={form.ctaEyebrowEn} onChange={setText('ctaEyebrowEn')} />
          </Pair>
          <Pair>
            <Field label="Tiêu đề (VI)" value={form.ctaTitleVi} onChange={setText('ctaTitleVi')} />
            <Field label="Tiêu đề (EN)" value={form.ctaTitleEn} onChange={setText('ctaTitleEn')} />
          </Pair>
          <Pair>
            <Field label="Mô tả (VI)" value={form.ctaDescVi} onChange={setText('ctaDescVi')} type="textarea" />
            <Field label="Mô tả (EN)" value={form.ctaDescEn} onChange={setText('ctaDescEn')} type="textarea" />
          </Pair>
        </Card>

        <div className="flex justify-end gap-3 pb-10">
          {error && <p className="text-sm text-red-500 mr-auto self-center">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#328442] hover:bg-[#48a85a] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── UI phụ ─────────────────────────────────────────────────────────────── */

function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
      <span className="text-red-600 text-sm leading-5">⚠</span>
      <p className="text-sm text-red-700 flex-1">{children}</p>
    </div>
  )
}

function Card({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="px-5 py-3 border-b border-gray-100 flex items-baseline gap-3">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {note && <p className="text-xs text-gray-400">{note}</p>}
      </div>
      <div className="px-5 py-4 space-y-4">{children}</div>
    </section>
  )
}

function Pair({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
}

function Lines({
  label, value, onChange, rows = 4, hint,
}: {
  label: string; value: string[]; onChange: (v: string) => void; rows?: number; hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && <span className="text-gray-400 font-normal"> — {hint}</span>}
      </label>
      <AutoTextarea value={arrayToLines(value)} onChange={onChange} rows={rows} />
      <p className="text-xs text-gray-400 mt-1">{value.length} dòng</p>
    </div>
  )
}

function ListPair({
  labelVi, labelEn, vi, en, onChangeVi, onChangeEn,
}: {
  labelVi: string; labelEn: string; vi: string[]; en: string[]
  onChangeVi: (v: string) => void; onChangeEn: (v: string) => void
}) {
  return (
    <>
      <Pair>
        <Lines label={`${labelVi} — mỗi dòng 1 mục`} value={vi} onChange={onChangeVi} />
        <Lines label={`${labelEn} — mỗi dòng 1 mục`} value={en} onChange={onChangeEn} />
      </Pair>
      <LenWarning groups={[['VI', vi.length], ['EN', en.length]]} />
    </>
  )
}

/**
 * Cảnh báo khi các danh sách song song lệch số dòng.
 * Trang public cắt theo mảng ngắn nhất, nên dòng thừa sẽ không hiển thị.
 */
function LenWarning({ groups }: { groups: [string, number][] }) {
  const lens = groups.map(g => g[1])
  if (new Set(lens).size <= 1) return null
  return (
    <p className="text-xs text-amber-600 flex items-center gap-1.5">
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      Số dòng lệch nhau ({groups.map(([n, l]) => `${n}: ${l}`).join(' · ')}) — trang chỉ hiển thị {Math.min(...lens)} mục.
    </p>
  )
}
