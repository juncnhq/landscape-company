import { describe, it, expect } from 'vitest'
import { ValidationError } from '@/lib/validate'
import {
  parseProject,
  parseNews,
  parseService,
  parsePartner,
  parseAboutPage,
  parseMemberCompany,
  parseHeroSlide,
  parseMedia,
  parseJobPosition,
} from '@/lib/entityInput'

/**
 * POST và PUT của mỗi entity đều đi qua đúng parser ở đây, nên bộ test này
 * bảo vệ cả hai. Trọng tâm là các trường hợp trước đây lọt lưới: PUT xoá
 * trắng field bắt buộc, slug có dấu, ngày sai định dạng, field NOT NULL
 * thiếu (rơi vào 500 thay vì 400).
 */

/** Khẳng định parser từ chối, và trả về message để kiểm tra nội dung. */
function rejects(fn: () => unknown): string {
  try {
    fn()
  } catch (e) {
    if (e instanceof ValidationError) return e.message
    throw new Error(`Lỗi sai loại: ${e}`)
  }
  throw new Error('Đáng lẽ phải throw ValidationError nhưng lại qua được')
}

const validProject = {
  slug: 'du-an-san-golf',
  title: 'Sân golf Đầm Vạc',
  titleEn: 'Dam Vac Golf Course',
  category: 'Golf',
  location: 'Vĩnh Phúc',
  client: 'FAM',
  year: '2026',
  image: 'https://res.cloudinary.com/x/a.jpg',
  description: 'Mô tả dự án',
  descriptionEn: 'Project description',
}

describe('parseProject', () => {
  it('chấp nhận payload hợp lệ', () => {
    expect(parseProject({ ...validProject }).slug).toBe('du-an-san-golf')
  })

  it('từ chối slug có dấu và khoảng trắng', () => {
    expect(rejects(() => parseProject({ ...validProject, slug: 'Dự án Sân Golf' }))).toMatch(/chữ thường không dấu/)
  })

  it('tự hạ chữ thường cho slug viết hoa', () => {
    expect(parseProject({ ...validProject, slug: 'Du-An-A' }).slug).toBe('du-an-a')
  })

  // Đây là lỗ hổng chính trước đây: PUT không validate gì, xoá trắng ô là
  // DB ghi chuỗi rỗng và trang public hiện trống.
  it.each([
    ['slug', 'Slug'],
    ['title', 'Tên dự án (VI)'],
    ['titleEn', 'Tên dự án (EN)'],
    ['location', 'Địa điểm'],
    ['client', 'Khách hàng'],
    ['year', 'Năm'],
    ['description', 'Mô tả (VI)'],
    ['descriptionEn', 'Mô tả (EN)'],
  ])('từ chối khi %s bị xoá trắng', (field, label) => {
    expect(rejects(() => parseProject({ ...validProject, [field]: '   ' }))).toContain(label)
  })

  it('từ chối khi field bắt buộc thiếu hẳn', () => {
    const body: Record<string, unknown> = { ...validProject }
    delete body.title
    expect(rejects(() => parseProject(body))).toContain('Tên dự án (VI)')
  })

  it('từ chối category ngoài danh sách', () => {
    expect(rejects(() => parseProject({ ...validProject, category: 'Hacked' }))).toMatch(/Danh mục/)
  })

  it('từ chối ảnh không phải http(s) hoặc đường dẫn nội bộ', () => {
    expect(rejects(() => parseProject({ ...validProject, image: 'javascript:alert(1)' }))).toMatch(/Ảnh đại diện/)
  })

  it('từ chối ảnh đại diện rỗng', () => {
    expect(rejects(() => parseProject({ ...validProject, image: '' }))).toMatch(/Vui lòng chọn/)
  })

  it('từ chối images không phải mảng', () => {
    expect(rejects(() => parseProject({ ...validProject, images: 'a,b' }))).toMatch(/Ảnh gallery/)
  })

  it('chặn mô tả vượt giới hạn độ dài', () => {
    expect(rejects(() => parseProject({ ...validProject, description: 'a'.repeat(20001) }))).toMatch(/tối đa 20000/)
  })

  // Trước đây `body.published ?? true` coi chuỗi "false" là truthy → bỏ
  // publish qua API ngoài UI không có tác dụng.
  it.each([
    ['false', false],
    [false, false],
    ['true', true],
    [undefined, true],
  ])('ép published %s → %s', (input, expected) => {
    expect(parseProject({ ...validProject, published: input }).published).toBe(expected)
  })

  it('dùng mặc định "—" cho diện tích và thời gian bỏ trống', () => {
    const p = parseProject({ ...validProject, area: '', duration: undefined })
    expect([p.area, p.duration]).toEqual(['—', '—'])
  })
})

describe('parseNews', () => {
  const validNews = { slug: 'tin-moi', titleVi: 'Tin mới', titleEn: 'Latest news' }

  it('chấp nhận payload hợp lệ', () => {
    expect(parseNews({ ...validNews }).titleVi).toBe('Tin mới')
  })

  // Cột `date` là String và được orderBy — một bản ghi sai định dạng là
  // lệch thứ tự cả trang tin tức.
  it('từ chối ngày dạng dd/mm/yyyy', () => {
    expect(rejects(() => parseNews({ ...validNews, date: '20/01/2026' }))).toMatch(/YYYY-MM-DD/)
  })

  it('từ chối ngày không có thật', () => {
    expect(rejects(() => parseNews({ ...validNews, date: '2026-02-31' }))).toMatch(/không phải ngày có thật/)
  })

  it('giữ nguyên ngày hợp lệ', () => {
    expect(parseNews({ ...validNews, date: '2026-01-20' }).date).toBe('2026-01-20')
  })

  it('mặc định về hôm nay khi bỏ trống ngày', () => {
    expect(parseNews({ ...validNews }).date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('từ chối newsType ngoài danh sách', () => {
    expect(rejects(() => parseNews({ ...validNews, newsType: 'spam' }))).toMatch(/Loại tin/)
  })

  it('từ chối readTime âm', () => {
    expect(rejects(() => parseNews({ ...validNews, readTime: -5 }))).toMatch(/1–600/)
  })

  it('readTime bỏ trống dùng mặc định 4, không phải 0', () => {
    expect(parseNews({ ...validNews, readTime: '' }).readTime).toBe(4)
  })
})

describe('parseService', () => {
  const validService = {
    slug: 'thiet-ke', titleVi: 'Thiết kế', titleEn: 'Design',
    descVi: 'Mô tả', descEn: 'Description',
  }

  it('chấp nhận payload hợp lệ', () => {
    expect(parseService({ ...validService }).slug).toBe('thiet-ke')
  })

  // descVi/descEn là NOT NULL không default — trước đây rỗng sẽ rơi xuống
  // Prisma và trả 500 "Internal server error".
  it.each(['descVi', 'descEn'])('từ chối %s rỗng', (field) => {
    expect(rejects(() => parseService({ ...validService, [field]: '' }))).toMatch(/Mô tả/)
  })

  it('từ chối order ngoài khoảng', () => {
    expect(rejects(() => parseService({ ...validService, order: 99999 }))).toMatch(/0–9999/)
  })

  it('từ chối bullets không phải mảng', () => {
    expect(rejects(() => parseService({ ...validService, bulletsVi: 'a,b' }))).toMatch(/Gạch đầu dòng/)
  })

  it('lọc phần tử rỗng và sai kiểu khỏi bullets', () => {
    const s = parseService({ ...validService, bulletsVi: ['  a  ', '', 5, null, 'b'] })
    expect(s.bulletsVi).toEqual(['a', 'b'])
  })
})

describe('parsePartner', () => {
  it('chấp nhận payload hợp lệ', () => {
    expect(parsePartner({ name: 'Đối tác A' }).name).toBe('Đối tác A')
  })

  it('từ chối tên rỗng', () => {
    expect(rejects(() => parsePartner({ name: '' }))).toMatch(/Tên đối tác/)
  })

  it.each([0, 2999])('từ chối năm thành lập %s', (founded) => {
    expect(rejects(() => parsePartner({ name: 'A', founded }))).toMatch(/Năm thành lập/)
  })

  // Number('') === 0 sẽ biến ô bỏ trống thành "năm 0".
  it('năm thành lập bỏ trống dùng mặc định, không phải 0', () => {
    expect(parsePartner({ name: 'A', founded: '' }).founded).toBe(2000)
  })
})

describe('parseMemberCompany', () => {
  const valid = { abbr: 'FAM', name: 'FAM Landscape' }

  it('chấp nhận payload hợp lệ', () => {
    expect(parseMemberCompany({ ...valid }).abbr).toBe('FAM')
  })

  it('từ chối màu nhấn không phải hex', () => {
    expect(rejects(() => parseMemberCompany({ ...valid, accent: 'red' }))).toMatch(/hex/)
  })

  it('màu nhấn bỏ trống dùng mặc định', () => {
    expect(parseMemberCompany({ ...valid }).accent).toBe('#328442')
  })
})

describe('parseHeroSlide', () => {
  const valid = { image: '/images/hero.jpg', labelVi: 'Nhãn', labelEn: 'Label' }

  it('chấp nhận đường dẫn nội bộ bắt đầu bằng "/"', () => {
    expect(parseHeroSlide({ ...valid }).image).toBe('/images/hero.jpg')
  })

  // labelVi/labelEn là NOT NULL không default, trước đây thiếu → 500.
  it.each(['labelVi', 'labelEn'])('từ chối thiếu %s', (field) => {
    const body: Record<string, unknown> = { ...valid }
    delete body[field]
    expect(() => parseHeroSlide(body)).toThrow(ValidationError)
  })

  it('từ chối slide không có ảnh', () => {
    expect(rejects(() => parseHeroSlide({ ...valid, image: '' }))).toMatch(/Ảnh slide/)
  })
})

describe('parseMedia', () => {
  it('chấp nhận URL Cloudinary', () => {
    expect(parseMedia({ url: 'https://res.cloudinary.com/a.jpg' }).folder).toBe('gallery')
  })

  it('từ chối url không phải đường dẫn', () => {
    expect(rejects(() => parseMedia({ url: 'abc' }))).toMatch(/Đường dẫn ảnh/)
  })
})

describe('parseJobPosition', () => {
  const valid = {
    titleVi: 'Kiến trúc sư cảnh quan',
    titleEn: 'Landscape Architect',
    locationVi: 'Đà Nẵng',
    locationEn: 'Da Nang',
  }

  it('chấp nhận payload hợp lệ', () => {
    expect(parseJobPosition({ ...valid }).titleEn).toBe('Landscape Architect')
  })

  it('điền sẵn hình thức làm việc khi bỏ trống', () => {
    const p = parseJobPosition({ ...valid })
    expect(p.typeVi).toBe('Toàn thời gian')
    expect(p.typeEn).toBe('Full-time')
  })

  it.each(['titleVi', 'titleEn', 'locationVi', 'locationEn'])('từ chối %s rỗng', (field) => {
    expect(() => parseJobPosition({ ...valid, [field]: '' })).toThrow(ValidationError)
  })

  it('ẩn vị trí được thì published phải nhận đúng false', () => {
    expect(parseJobPosition({ ...valid, published: 'false' }).published).toBe(false)
  })
})

describe('parseAboutPage', () => {
  it('chấp nhận payload rỗng — mọi field đều tuỳ chọn', () => {
    const p = parseAboutPage({})
    expect(p.heroTitleVi).toBe('')
    expect(p.featuresVi).toEqual([])
  })

  it('giữ nguyên chữ và mảng hợp lệ', () => {
    const p = parseAboutPage({
      heroTitleVi: '  Về Lapla  ',
      featuresVi: ['A', 'B'],
      statValues: ['200+', '99%'],
    })
    expect(p.heroTitleVi).toBe('Về Lapla')
    expect(p.featuresVi).toEqual(['A', 'B'])
    expect(p.statValues).toEqual(['200+', '99%'])
  })

  it('loại bỏ dòng trống trong danh sách', () => {
    expect(parseAboutPage({ processVi: ['Bước 1', '', '   ', 'Bước 2'] }).processVi)
      .toEqual(['Bước 1', 'Bước 2'])
  })

  it('từ chối mảng không phải array', () => {
    expect(() => parseAboutPage({ featuresVi: 'A,B' })).toThrow(ValidationError)
  })

  it('từ chối chữ vượt quá giới hạn', () => {
    expect(() => parseAboutPage({ heroTitleVi: 'x'.repeat(301) })).toThrow(ValidationError)
  })
})
