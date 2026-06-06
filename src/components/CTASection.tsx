'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function CTASection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', address: '', service: '', message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', address: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="leafix-section relative overflow-hidden" style={{ backgroundColor: '#0e2208' }}>
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-brand) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{ backgroundColor: 'var(--color-accent)', filter: 'blur(140px)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT */}
          <ScrollReveal direction="left">
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Liên hệ tư vấn' : 'Get A Free Estimate'}
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              {isVi
                ? <>Yêu cầu báo giá<br /><span style={{ color: 'var(--color-brand)' }}>cảnh quan</span> miễn phí</>
                : <>Request a Free<br /><span style={{ color: 'var(--color-brand)' }}>Landscaping</span> Estimate</>
              }
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '26px' }}>
              {isVi
                ? 'Hãy để Lapla biến không gian sống của bạn thành khu vườn đẹp như mơ. Liên hệ ngay để nhận tư vấn miễn phí từ chuyên gia của chúng tôi.'
                : 'Let Lapla transform your living space into a dream garden. Contact us now for a free consultation from our landscape experts.'}
            </p>

            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  label: isVi ? 'Điện thoại' : 'Call Us',
                  value: '(+84) 90 123 4567',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: isVi ? 'Email' : 'Email Us',
                  value: 'info@lapla.vn',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  label: isVi ? 'Địa chỉ' : 'Our Office',
                  value: isVi ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(130,180,64,0.15)', color: 'var(--color-brand)' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* RIGHT: Form */}
          <ScrollReveal direction="right" delay={2}>
            <div className="bg-white rounded p-6 md:p-8" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
              <h3 className="font-display text-xl font-bold mb-1" style={{ color: '#111111' }}>
                {isVi ? 'Đặt tư vấn miễn phí' : 'Book A Free Consultation'}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                {isVi ? 'Điền thông tin, chúng tôi sẽ liên hệ trong 24h' : "Fill in details, we'll contact you within 24h"}
              </p>

              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f5f9f0' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--color-brand)' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg" style={{ color: '#111111' }}>
                    {isVi ? 'Đã gửi thành công!' : 'Message sent!'}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {isVi ? 'Chúng tôi sẽ liên hệ sớm nhất' : "We'll get back to you soon"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {isVi ? 'Họ *' : 'First Name *'}
                      </label>
                      <input
                        type="text" required value={form.firstName}
                        onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200"
                        style={{ borderColor: '#d0d0d0', color: '#111111' }}
                        placeholder={isVi ? 'Họ' : 'First name'}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {isVi ? 'Tên *' : 'Last Name *'}
                      </label>
                      <input
                        type="text" required value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200"
                        style={{ borderColor: '#d0d0d0', color: '#111111' }}
                        placeholder={isVi ? 'Tên' : 'Last name'}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {isVi ? 'Email *' : 'Email *'}
                      </label>
                      <input
                        type="email" required value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200"
                        style={{ borderColor: '#d0d0d0', color: '#111111' }}
                        placeholder="email@example.com"
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {isVi ? 'Điện thoại *' : 'Phone No *'}
                      </label>
                      <input
                        type="tel" required value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200"
                        style={{ borderColor: '#d0d0d0', color: '#111111' }}
                        placeholder={isVi ? 'Số điện thoại' : 'Phone number'}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'Công ty' : 'Company Name'}
                    </label>
                    <input
                      type="text" value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200"
                      style={{ borderColor: '#d0d0d0', color: '#111111' }}
                      placeholder={isVi ? 'Tên công ty (nếu có)' : 'Company name (optional)'}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {isVi ? 'Địa chỉ' : 'Current Address'}
                      </label>
                      <input
                        type="text" value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200"
                        style={{ borderColor: '#d0d0d0', color: '#111111' }}
                        placeholder={isVi ? 'Địa chỉ' : 'Your address'}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {isVi ? 'Dịch vụ' : 'Service Needed'}
                      </label>
                      <select
                        value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200 bg-white"
                        style={{ borderColor: '#d0d0d0', color: form.service ? '#111111' : '#999' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                      >
                        <option value="">{isVi ? 'Chọn dịch vụ...' : 'Select service...'}</option>
                        <option value="design">{isVi ? 'Thiết kế & Thi công' : 'Garden Design'}</option>
                        <option value="plants">{isVi ? 'Cây xanh & Thảm cỏ' : 'Plants & Turf'}</option>
                        <option value="hardscape">{isVi ? 'Cảnh quan cứng' : 'Hard Scaping'}</option>
                        <option value="public">{isVi ? 'Cảnh quan công cộng' : 'Public Garden'}</option>
                        <option value="golf">{isVi ? 'Sân Golf & Resort' : 'Golf & Resort'}</option>
                        <option value="maintenance">{isVi ? 'Bảo dưỡng' : 'Maintenance'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {isVi ? 'Nội dung' : 'Message'}
                    </label>
                    <textarea
                      rows={3} value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border outline-none transition-colors duration-200 resize-none"
                      style={{ borderColor: '#d0d0d0', color: '#111111' }}
                      placeholder={isVi ? 'Mô tả nhu cầu của bạn...' : 'Describe your project...'}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#d0d0d0')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px', }}
                  >
                    {isVi ? 'Gửi yêu cầu tư vấn' : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
