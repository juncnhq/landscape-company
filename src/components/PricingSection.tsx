'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

type Tab = 'residential' | 'commercial';

const plans = {
  residential: [
    {
      name: { vi: 'Gói Cơ Bản', en: 'Basic Garden Care' },
      price: '2.900.000',
      priceEn: '$148',
      period: { vi: 'tháng', en: 'Monthly' },
      desc: { vi: 'Phù hợp cho vườn nhỏ, bảo trì định kỳ để không gian luôn tươi đẹp.', en: 'Perfect for small gardens, routine maintenance to keep your outdoor space fresh.' },
      features: [
        { vi: 'Cắt cỏ & tỉa viền', en: 'Lawn mowing & edging' },
        { vi: 'Tưới cây', en: 'Plant watering' },
        { vi: 'Dọn dẹp theo mùa', en: 'Seasonal cleanup' },
        { vi: 'Kiểm soát cỏ dại', en: 'Weed control' },
        { vi: 'Thăm 1 lần/tháng', en: 'Monthly visit' },
      ],
      popular: false,
      color: '#f5f9f0',
    },
    {
      name: { vi: 'Gói Tiêu Chuẩn', en: 'Standard Landscaping' },
      price: '5.900.000',
      priceEn: '$248',
      period: { vi: 'tháng', en: 'Monthly' },
      desc: { vi: 'Giải pháp toàn diện cho khu vườn đẹp và bền vững quanh năm.', en: 'Comprehensive solution for a beautiful and sustainable garden year-round.' },
      features: [
        { vi: 'Cắt cỏ & tỉa viền', en: 'Lawn mowing & edging' },
        { vi: 'Tưới cây tự động', en: 'Automatic plant watering' },
        { vi: 'Dọn dẹp theo mùa', en: 'Seasonal cleanup' },
        { vi: 'Kiểm soát sâu bệnh', en: 'Pest control' },
        { vi: 'Thăm 2 lần/tháng', en: 'Bi-weekly visits' },
      ],
      popular: true,
      color: 'var(--color-brand)',
    },
    {
      name: { vi: 'Gói Cao Cấp', en: 'Premium Landscape Care' },
      price: '9.900.000',
      priceEn: '$348',
      period: { vi: 'tháng', en: 'Monthly' },
      desc: { vi: 'Dịch vụ đẳng cấp với thiết kế cảnh quan chuyên nghiệp và bảo trì ưu tiên.', en: 'Premium service with professional landscape design and priority maintenance.' },
      features: [
        { vi: 'Tất cả dịch vụ gói Tiêu Chuẩn', en: 'All Standard package services' },
        { vi: 'Thiết kế cảnh quan tùy chỉnh', en: 'Custom landscape design' },
        { vi: 'Hệ thống tưới tiêu thông minh', en: 'Smart irrigation system' },
        { vi: 'Chăm sóc cây quý hiếm', en: 'Rare plant care' },
        { vi: 'Hỗ trợ 24/7', en: '24/7 support' },
      ],
      popular: false,
      color: '#f5f9f0',
    },
  ],
  commercial: [
    {
      name: { vi: 'Gói Văn Phòng', en: 'Office Basic' },
      price: '8.900.000',
      priceEn: '$388',
      period: { vi: 'tháng', en: 'Monthly' },
      desc: { vi: 'Bảo trì cơ bản cho khuôn viên văn phòng nhỏ và tòa nhà.', en: 'Basic maintenance for small office premises and buildings.' },
      features: [
        { vi: 'Cắt cỏ & tỉa viền', en: 'Lawn mowing & edging' },
        { vi: 'Tưới cây', en: 'Plant watering' },
        { vi: 'Dọn dẹp theo mùa', en: 'Seasonal cleanup' },
        { vi: 'Kiểm soát cỏ dại', en: 'Weed control' },
        { vi: 'Thăm 2 lần/tháng', en: 'Bi-weekly visits' },
      ],
      popular: false,
      color: '#f5f9f0',
    },
    {
      name: { vi: 'Gói Doanh Nghiệp', en: 'Corporate Standard' },
      price: '18.900.000',
      priceEn: '$688',
      period: { vi: 'tháng', en: 'Monthly' },
      desc: { vi: 'Giải pháp cảnh quan toàn diện cho doanh nghiệp và khu công nghiệp.', en: 'Comprehensive landscaping solution for businesses and industrial zones.' },
      features: [
        { vi: 'Cắt cỏ & tỉa viền hàng tuần', en: 'Weekly lawn mowing & edging' },
        { vi: 'Hệ thống tưới tự động', en: 'Automatic irrigation system' },
        { vi: 'Bảo trì cây xanh', en: 'Green plant maintenance' },
        { vi: 'Kiểm soát sâu bệnh', en: 'Pest control' },
        { vi: 'Thăm hàng tuần', en: 'Weekly visits' },
      ],
      popular: true,
      color: 'var(--color-brand)',
    },
    {
      name: { vi: 'Gói Cao Cấp Doanh Nghiệp', en: 'Corporate Premium' },
      price: '35.000.000',
      priceEn: '$1,200',
      period: { vi: 'tháng', en: 'Monthly' },
      desc: { vi: 'Dịch vụ đẳng cấp cho khu resort, khách sạn và khu đô thị lớn.', en: 'Premium service for resorts, hotels and large urban developments.' },
      features: [
        { vi: 'Tất cả dịch vụ Doanh Nghiệp', en: 'All Corporate Standard services' },
        { vi: 'Thiết kế cảnh quan cao cấp', en: 'Premium landscape design' },
        { vi: 'Đội ngũ chuyên trách', en: 'Dedicated team' },
        { vi: 'Báo cáo định kỳ', en: 'Periodic reports' },
        { vi: 'Hỗ trợ 24/7 ưu tiên', en: 'Priority 24/7 support' },
      ],
      popular: false,
      color: '#f5f9f0',
    },
  ],
};

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function PricingSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [activeTab, setActiveTab] = useState<Tab>('residential');

  const currentPlans = plans[activeTab];

  return (
    <section className="leafix-section" style={{ backgroundColor: '#f5f9f0' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-black uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            {isVi ? 'Bảng giá dịch vụ' : 'OUR PRICING'}
          </p>
          <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0e2208', letterSpacing: '-0.02em' }}>
            {isVi ? 'Chọn Gói Phù Hợp Với Nhu Cầu Của Bạn' : 'Determine a Plan Based on Your Needs'}
          </h2>

          {/* Tab switcher */}
          <div className="inline-flex border" style={{ borderColor: '#d0e8b0' }}>
            {(['residential', 'commercial'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-8 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200"
                style={{
                  backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'white',
                  color: activeTab === tab ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                }}
              >
                {tab === 'residential' ? (isVi ? 'Dân dụng' : 'Residential') : (isVi ? 'Thương mại' : 'Commercial')}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentPlans.map((plan, idx) => (
            <div
              key={idx}
              className="relative flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: plan.popular ? 'var(--color-brand)' : 'white',
                boxShadow: plan.popular ? '0 20px 60px rgba(130,180,64,0.25)' : '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-widest px-3 py-1"
                  style={{ backgroundColor: '#0e2208', color: 'white' }}
                >
                  {isVi ? 'Phổ biến' : 'POPULAR'}
                </div>
              )}

              {/* Header */}
              <div className="px-7 pt-8 pb-6" style={{ borderBottom: `1px solid ${plan.popular ? 'rgba(255,255,255,0.2)' : '#e8ede0'}` }}>
                <h3
                  className="font-bold text-xl mb-2"
                  style={{ color: plan.popular ? 'white' : '#0e2208' }}
                >
                  {isVi ? plan.name.vi : plan.name.en}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: plan.popular ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}
                >
                  {isVi ? plan.desc.vi : plan.desc.en}
                </p>
                <div className="flex items-end gap-1">
                  <span
                    className="font-black"
                    style={{ fontSize: '2.2rem', color: plan.popular ? 'white' : '#0e2208', lineHeight: 1 }}
                  >
                    {isVi ? plan.price : plan.priceEn}
                  </span>
                  <span
                    className="text-sm mb-1"
                    style={{ color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--color-brand)' }}
                  >
                    /{isVi ? plan.period.vi : plan.period.en}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="px-7 py-6 flex-1">
                <p
                  className="text-[10px] font-black uppercase tracking-widest mb-4"
                  style={{ color: plan.popular ? 'rgba(255,255,255,0.6)' : 'var(--color-brand)' }}
                >
                  {isVi ? "Bao gồm:" : "What's included:"}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: plan.popular ? 'rgba(255,255,255,0.2)' : '#f0f7e8',
                          color: plan.popular ? 'white' : 'var(--color-brand)',
                        }}
                      >
                        <CheckIcon />
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: plan.popular ? 'rgba(255,255,255,0.88)' : 'var(--color-text-secondary)' }}
                      >
                        {isVi ? f.vi : f.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-7 pb-8">
                <Link
                  href={`/${locale}#contact`}
                  className="flex items-center justify-center gap-2 w-full py-4 text-xs font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: plan.popular ? 'white' : '#0e2208',
                    color: plan.popular ? 'var(--color-accent)' : 'white',
                    boxShadow: plan.popular ? 'none' : 'rgb(5,18,3) 0px 4px 0px 0px',
                  }}
                >
                  {isVi ? 'Bắt đầu ngay' : 'GET STARTED'}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6"
          style={{ backgroundColor: '#0e2208' }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {isVi ? 'Tư vấn chuyên gia về giá' : 'EXPERT PRICING ADVICE'}
            </p>
            <p className="font-bold text-lg" style={{ color: 'white' }}>
              {isVi ? 'Tối Ưu Ngân Sách Của Bạn.' : 'Maximize Your Budget.'}
            </p>
          </div>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 px-7 py-4 text-xs font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90 shrink-0"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
          >
            {isVi ? 'Liên hệ tư vấn' : 'GET STARTED'}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
