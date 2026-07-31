'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useCmsPage } from '@/components/CmsPageProvider'
import {
  getPageEditorialFromCmsPage,
  getProductEditorialLocale,
  type ProductEditorialLocaleContent,
} from '@/lib/pageEditorialContent'

const PHONE_HREF = 'tel:+903122417272'
const WHATSAPP_HREF = 'https://wa.me/905335127272'
const PHONE_TEXT = '0312 241 72 72'
const LEGACY_PHONE_TEXT = '+90 312 2417272'

function ContactText({ value, emphasizePhone = false }: { value: string; emphasizePhone?: boolean }) {
  const parts = value.split(/(\{\{phone(?:_legacy)?\}\})/g)
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${index}-${part}`}>
          {part === '{{phone}}'
            ? emphasizePhone ? <strong>{PHONE_TEXT}</strong> : PHONE_TEXT
            : part === '{{phone_legacy}}' ? LEGACY_PHONE_TEXT : part}
        </Fragment>
      ))}
    </>
  )
}

function InfoIcon() {
  return (
    <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
}

function PriceIcon() {
  return (
    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    </div>
  )
}

function CallArrowIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function ProductInfo({ content }: { content: ProductEditorialLocaleContent }) {
  return (
    <section className="relative py-16 border-t border-white/5" data-editorial-section="product-info">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-light text-white mb-4 flex items-center gap-3">
              <InfoIcon />
              {content.features.title}
            </h2>
            <div className="space-y-4">
              {content.features.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-300 text-sm leading-relaxed"><ContactText value={paragraph} /></p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {content.features.tags.map((feature) => (
                <span key={feature} className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 backdrop-blur-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/20">
            <h3 className="text-xl font-light text-white mb-4 flex items-center gap-3">
              <PriceIcon />
              {content.pricing.title}
            </h3>
            {content.pricing.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-300 text-sm leading-relaxed mb-4"><ContactText value={paragraph} /></p>
            ))}
            {content.pricing.showActions && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={PHONE_HREF} className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-black overflow-hidden transition-all duration-300 hover:gap-3 rounded-lg text-sm">
                  <span className="relative z-10 font-medium">{content.pricing.callLabel}</span>
                  <CallArrowIcon className="relative z-10 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
                <Link href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all duration-300 rounded-lg text-sm">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span className="font-medium">{content.pricing.whatsappLabel}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductBenefits({ content }: { content: ProductEditorialLocaleContent }) {
  return (
    <section className="relative py-20 border-t border-white/5" data-editorial-section="product-benefits">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/20">
            <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {content.advantages.title}
            </h3>
            <ul className="space-y-4">
              {content.advantages.items.map((advantage, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 font-light">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                  {advantage}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/20">
            <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              {content.usageAreas.title}
            </h3>
            {content.usageAreas.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-300 text-sm leading-relaxed mb-6"><ContactText value={paragraph} /></p>
            ))}
            <ul className="space-y-4">
              {content.usageAreas.items.map((area, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 font-light">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  </div>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function BottomCta({ content }: { content: ProductEditorialLocaleContent }) {
  if (!content.bottomCta.enabled) return null
  return (
    <section className="relative py-20 border-t border-white/5" data-editorial-section="bottom-cta">
      <div className="container mx-auto px-6 text-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-extralight text-white mb-4">{content.bottomCta.title}</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
            <ContactText value={content.bottomCta.description} emphasizePhone />
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={PHONE_HREF} className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:gap-4 rounded-xl">
              <span className="relative z-10 font-medium"><ContactText value={content.bottomCta.callLabel} /></span>
              <CallArrowIcon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all duration-300 rounded-xl">
              <WhatsAppIcon className="w-5 h-5" />
              <span className="font-medium">{content.bottomCta.whatsappLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ProductEditorialSections({ pageKey }: { pageKey: string }) {
  const cmsPage = useCmsPage()
  const document = getPageEditorialFromCmsPage(pageKey, cmsPage)
  const content = getProductEditorialLocale(document, 'tr')
  if (!content) return null

  return (
    <div lang="tr" data-page-editorial={pageKey}>
      <ProductInfo content={content} />
      <ProductBenefits content={content} />
      <BottomCta content={content} />
    </div>
  )
}
