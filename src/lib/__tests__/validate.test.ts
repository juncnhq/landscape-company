import { describe, it, expect } from 'vitest'
import {
  ValidationError, reqStr, optStr, reqSlug, strArray,
  bool, intRange, isoDate, imageUrl, hexColor, oneOf, asObject,
} from '@/lib/validate'
import { slugify } from '@/lib/slugify'

describe('reqStr / optStr', () => {
  it('trim khoảng trắng thừa', () => {
    expect(reqStr('  a  ', 'X')).toBe('a')
  })

  it.each([
    ['', 'rỗng'],
    ['   ', 'toàn khoảng trắng'],
    [undefined, 'undefined'],
    [null, 'null'],
    [5, 'số'],
  ] as const)('từ chối giá trị %s (%s)', (v, _label) => {
    expect(() => reqStr(v, 'Tên')).toThrow(ValidationError)
  })

  it('optStr trả fallback khi rỗng', () => {
    expect(optStr('', 'X', 100, '—')).toBe('—')
  })

  it('chặn chuỗi vượt maxLen', () => {
    expect(() => optStr('a'.repeat(11), 'X', 10)).toThrow(/tối đa 10/)
  })
})

describe('reqSlug', () => {
  it.each(['du-an-san-golf', 'abc', 'a1-b2-c3'])('chấp nhận %s', (s) => {
    expect(reqSlug(s)).toBe(s)
  })

  it.each([
    ['Dự án', 'có dấu tiếng Việt'],
    ['du an', 'có khoảng trắng'],
    ['-du-an', 'gạch ngang ở đầu'],
    ['du-an-', 'gạch ngang ở cuối'],
    ['du--an', 'gạch ngang đôi'],
    ['du_an', 'gạch dưới'],
  ] as const)('từ chối %s (%s)', (s, _label) => {
    expect(() => reqSlug(s)).toThrow(ValidationError)
  })
})

// Slug do UI sinh ra phải luôn lọt qua reqSlug — nếu hai bên lệch nhau thì
// admin gõ tiêu đề bình thường cũng bị API từ chối.
describe('slugify khớp với reqSlug', () => {
  it.each([
    ['Dự án Sân Golf Đầm Vạc', 'du-an-san-golf-dam-vac'],
    ['  Khu đô thị --- Ecopark! ', 'khu-do-thi-ecopark'],
    ['Resort & Spa (2026)', 'resort-spa-2026'],
    ['ĐỀ ÁN 2026', 'de-an-2026'],
    ['Café Đá', 'cafe-da'],
  ])('%s → %s', (input, expected) => {
    const s = slugify(input)
    expect(s).toBe(expected)
    expect(reqSlug(s)).toBe(s)
  })
})

describe('bool', () => {
  it.each([
    [true, true], [false, false],
    ['true', true], ['false', false],
    [1, true], [0, false],
    [undefined, true], [null, true], ['', true],
  ])('ép %s → %s (fallback true)', (input, expected) => {
    expect(bool(input, true)).toBe(expected)
  })
})

describe('intRange', () => {
  it('cắt phần thập phân', () => {
    expect(intRange(4.9, 0, 0, 10, 'X')).toBe(4)
  })

  it.each([[''], [null], [undefined]])('ô trống %s dùng fallback, không phải 0', (v) => {
    expect(intRange(v, 7, 0, 10, 'X')).toBe(7)
  })

  it.each([[-1], [11]])('từ chối %s ngoài khoảng', (v) => {
    expect(() => intRange(v, 0, 0, 10, 'X')).toThrow(/0–10/)
  })

  it('từ chối giá trị không phải số', () => {
    expect(() => intRange('abc', 0, 0, 10, 'X')).toThrow(/phải là số/)
  })
})

describe('isoDate', () => {
  it('chấp nhận ngày hợp lệ', () => {
    expect(isoDate('2026-01-20')).toBe('2026-01-20')
  })

  it.each(['20/01/2026', '2026-1-5', '2026-13-01', '2026-02-31', 'hôm qua'])(
    'từ chối %s',
    (v) => expect(() => isoDate(v)).toThrow(ValidationError)
  )
})

describe('imageUrl', () => {
  it.each(['https://a.com/x.jpg', 'http://a.com/x.jpg', '/images/a.jpg'])('chấp nhận %s', (v) => {
    expect(imageUrl(v, 'Ảnh')).toBe(v)
  })

  it.each(['javascript:alert(1)', 'data:image/png;base64,AAA', 'a.com/x.jpg'])('từ chối %s', (v) => {
    expect(() => imageUrl(v, 'Ảnh')).toThrow(ValidationError)
  })

  it('cho phép rỗng khi không bắt buộc', () => {
    expect(imageUrl('', 'Ảnh')).toBe('')
  })

  it('từ chối rỗng khi bắt buộc', () => {
    expect(() => imageUrl('', 'Ảnh', true)).toThrow(/Vui lòng chọn/)
  })
})

describe('strArray / hexColor / oneOf / asObject', () => {
  it('strArray bỏ phần tử rỗng và sai kiểu', () => {
    expect(strArray([' a ', '', null, 3, 'b'], 'X')).toEqual(['a', 'b'])
  })

  it('strArray coi undefined là mảng rỗng', () => {
    expect(strArray(undefined, 'X')).toEqual([])
  })

  it('strArray từ chối giá trị không phải mảng', () => {
    expect(() => strArray('a,b', 'X')).toThrow(ValidationError)
  })

  it.each(['#fff', '#328442'])('hexColor chấp nhận %s', (v) => {
    expect(hexColor(v, '#000')).toBe(v)
  })

  it.each(['red', '328442', '#12345'])('hexColor từ chối %s', (v) => {
    expect(() => hexColor(v, '#000')).toThrow(ValidationError)
  })

  it('oneOf trả fallback khi bỏ trống', () => {
    expect(oneOf('', ['a', 'b'] as const, 'a', 'X')).toBe('a')
  })

  it('oneOf từ chối giá trị lạ', () => {
    expect(() => oneOf('z', ['a', 'b'] as const, 'a', 'X')).toThrow(ValidationError)
  })

  it.each([[null], ['chuỗi'], [[1, 2]], [42]])('asObject từ chối %s', (v) => {
    expect(() => asObject(v)).toThrow(ValidationError)
  })
})
