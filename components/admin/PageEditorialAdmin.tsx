'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  buildPageEditorialContentJson,
  getDefaultPageEditorial,
  pageEditorialLocaleCodes,
  parsePageEditorialDocument,
  type FaqEditorialItem,
  type FaqEditorialLocaleContent,
  type PageEditorialDocument,
  type PageEditorialLocale,
  type ProductEditorialLocaleContent,
} from '@/lib/pageEditorialContent'

type CmsSection = {
  sectionKey: string
  sectionType: string
  title: string | null
  subtitle: string | null
  body: string | null
  contentJson: string | null
  sortOrder: number
  enabled: boolean
}

type CmsPageSummary = {
  id: string
  pageKey: string
}

type CmsPageDetail = {
  id: string
  pageKey: string
  sections: CmsSection[]
}

type ApiResponse<T> = {
  data: T
  message?: string | null
}

type PageEditorialAdminProps = {
  apiBaseUrl: string
  authorization: string
  pageKey: string
  pageLabel: string
}

const localeLabels: Record<PageEditorialLocale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  ar: 'العربية',
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

const emptyProductLocale = (turkish: ProductEditorialLocaleContent): ProductEditorialLocaleContent => ({
  galleryFallback: { eyebrow: '', title: '' },
  features: { title: '', paragraphs: [], tags: [] },
  pricing: {
    title: '',
    paragraphs: [],
    showActions: turkish.pricing.showActions,
    callLabel: '',
    whatsappLabel: '',
  },
  advantages: { title: '', items: [] },
  usageAreas: { title: '', paragraphs: [], items: [] },
  bottomCta: {
    enabled: turkish.bottomCta.enabled,
    title: '',
    description: '',
    callLabel: '',
    whatsappLabel: '',
  },
})

const emptyFaqLocale = (): FaqEditorialLocaleContent => ({
  faq: {
    eyebrow: '',
    title: '',
    highlightedTitle: '',
    description: '',
    items: [],
    cta: { title: '', description: '', whatsappLabel: '', callLabel: '' },
  },
})

const getEditableProductLocale = (
  document: PageEditorialDocument,
  locale: PageEditorialLocale,
): ProductEditorialLocaleContent => {
  const turkish = document.locales.tr as ProductEditorialLocaleContent
  const current = document.locales[locale]
  if (current.features && current.pricing && current.advantages && current.usageAreas && current.bottomCta && current.galleryFallback) {
    return current as ProductEditorialLocaleContent
  }
  return emptyProductLocale(turkish)
}

const getEditableFaqLocale = (
  document: PageEditorialDocument,
  locale: PageEditorialLocale,
): FaqEditorialLocaleContent => {
  const current = document.locales[locale]
  return current.faq ? current as FaqEditorialLocaleContent : emptyFaqLocale()
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  dir,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  dir: 'ltr' | 'rtl'
}) {
  const commonClass = 'mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]'
  return (
    <label className="block text-sm font-medium text-[#3a342c]">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${commonClass} min-h-24`}
          dir={dir}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={commonClass}
          dir={dir}
        />
      )}
    </label>
  )
}

function StringListEditor({
  label,
  values,
  onChange,
  dir,
  multiline = false,
}: {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  dir: 'ltr' | 'rtl'
  multiline?: boolean
}) {
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= values.length) return
    const next = [...values]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }
  return (
    <div className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-[#3a342c]">{label}</h4>
        <button type="button" onClick={() => onChange([...values, ''])} className="rounded-md border border-[#b9aa91] px-3 py-1.5 text-xs font-semibold text-[#3a342c] hover:bg-white">
          Yeni satır ekle
        </button>
      </div>
      <div className="space-y-3">
        {values.length === 0 && <p className="text-xs text-[#7b7469]">Bu dil için henüz içerik yok.</p>}
        {values.map((value, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_auto]">
            {multiline ? (
              <textarea
                aria-label={`${label} ${index + 1}`}
                value={value}
                onChange={(event) => onChange(values.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
                className="min-h-20 rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                dir={dir}
              />
            ) : (
              <input
                aria-label={`${label} ${index + 1}`}
                value={value}
                onChange={(event) => onChange(values.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
                className="rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                dir={dir}
              />
            )}
            <div className="flex items-start gap-1">
              <button type="button" disabled={index === 0} onClick={() => move(index, -1)} className="rounded border border-[#d8d0c3] px-2 py-1 text-xs disabled:opacity-30">Yukarı</button>
              <button type="button" disabled={index === values.length - 1} onClick={() => move(index, 1)} className="rounded border border-[#d8d0c3] px-2 py-1 text-xs disabled:opacity-30">Aşağı</button>
              <button type="button" onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))} className="rounded border border-[#c9beb0] px-2 py-1 text-xs text-[#7b3f2e]">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FaqItemsEditor({
  items,
  onChange,
  dir,
}: {
  items: FaqEditorialItem[]
  onChange: (items: FaqEditorialItem[]) => void
  dir: 'ltr' | 'rtl'
}) {
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next.map((item, itemIndex) => ({ ...item, id: itemIndex + 1 })))
  }
  return (
    <div className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-[#3a342c]">Sorular ve cevaplar</h4>
        <button type="button" onClick={() => onChange([...items, { id: items.length + 1, question: '', answer: '' }])} className="rounded-md border border-[#b9aa91] px-3 py-1.5 text-xs font-semibold hover:bg-white">
          Yeni soru ekle
        </button>
      </div>
      <div className="space-y-4">
        {items.length === 0 && <p className="text-xs text-[#7b7469]">Bu dil için henüz soru bulunmuyor.</p>}
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="rounded-md border border-[#d8d0c3] bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <strong className="text-sm">Soru {index + 1}</strong>
              <div className="flex gap-1">
                <button type="button" disabled={index === 0} onClick={() => move(index, -1)} className="rounded border px-2 py-1 text-xs disabled:opacity-30">Yukarı</button>
                <button type="button" disabled={index === items.length - 1} onClick={() => move(index, 1)} className="rounded border px-2 py-1 text-xs disabled:opacity-30">Aşağı</button>
                <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index).map((nextItem, itemIndex) => ({ ...nextItem, id: itemIndex + 1 })))} className="rounded border px-2 py-1 text-xs text-[#7b3f2e]">Sil</button>
              </div>
            </div>
            <div className="grid gap-3">
              <Field label="Soru" value={item.question} dir={dir} onChange={(question) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, question } : current))} />
              <Field label="Cevap" value={item.answer} dir={dir} multiline onChange={(answer) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, answer } : current))} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const validateTurkish = (document: PageEditorialDocument) => {
  if (document.kind === 'product-detail') {
    const content = getEditableProductLocale(document, 'tr')
    const required = [
      content.galleryFallback.eyebrow,
      content.galleryFallback.title,
      content.features.title,
      content.pricing.title,
      content.advantages.title,
      content.usageAreas.title,
    ]
    if (required.some((value) => !value.trim())) return 'Türkçe zorunlu başlık alanları boş bırakılamaz.'
    if (!content.features.paragraphs.length || !content.advantages.items.length || !content.usageAreas.items.length) {
      return 'Türkçe ürün özellikleri, avantajları ve kullanım alanları en az bir içerik içermelidir.'
    }
    if (content.bottomCta.enabled && (!content.bottomCta.title.trim() || !content.bottomCta.description.trim())) {
      return 'Bu sayfada mevcut alt CTA başlığı ve açıklaması zorunludur.'
    }
    return ''
  }
  const faq = getEditableFaqLocale(document, 'tr').faq
  if (![faq.eyebrow, faq.title, faq.highlightedTitle, faq.description, faq.cta.title, faq.cta.whatsappLabel, faq.cta.callLabel].every((value) => value.trim())) {
    return 'Türkçe FAQ başlık, açıklama ve buton alanları zorunludur.'
  }
  if (!faq.items.length || faq.items.some((item) => !item.question.trim() || !item.answer.trim())) {
    return 'Türkçe FAQ en az bir eksiksiz soru ve cevap içermelidir.'
  }
  return ''
}

export default function PageEditorialAdmin({ apiBaseUrl, authorization, pageKey, pageLabel }: PageEditorialAdminProps) {
  const [document, setDocument] = useState<PageEditorialDocument | null>(null)
  const [section, setSection] = useState<CmsSection | null>(null)
  const [pageId, setPageId] = useState('')
  const [activeLocale, setActiveLocale] = useState<PageEditorialLocale>('tr')
  const [savedJson, setSavedJson] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setMessage('')
    setError('')
    try {
      const listResponse = await fetch(`${apiBaseUrl}/api/admin/cms/pages`, {
        headers: { Authorization: authorization },
      })
      if (!listResponse.ok) throw new Error(`Sayfa listesi alınamadı (${listResponse.status}).`)
      const listBody = await listResponse.json() as ApiResponse<CmsPageSummary[]>
      const summary = listBody.data.find((item) => item.pageKey === pageKey)
      if (!summary) throw new Error(`${pageKey} CMS sayfası bulunamadı.`)
      const detailResponse = await fetch(`${apiBaseUrl}/api/admin/cms/pages/${summary.id}`, {
        headers: { Authorization: authorization },
      })
      if (!detailResponse.ok) throw new Error(`Sayfa içeriği alınamadı (${detailResponse.status}).`)
      const detailBody = await detailResponse.json() as ApiResponse<CmsPageDetail>
      const editorialSection = detailBody.data.sections.find((item) => item.sectionKey === 'page.editorial')
      if (!editorialSection) throw new Error('page.editorial bölümü bulunamadı. Backend migration uygulanmış olmalı.')
      const parsed = parsePageEditorialDocument(editorialSection.contentJson, getDefaultPageEditorial(pageKey))
      if (!parsed) throw new Error('page.editorial içeriği okunamadı.')
      const json = buildPageEditorialContentJson(parsed)
      setPageId(detailBody.data.id)
      setSection(editorialSection)
      setDocument(parsed)
      setSavedJson(json)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'İçerik yüklenemedi.')
    } finally {
      setLoading(false)
    }
  }, [apiBaseUrl, authorization, pageKey])

  useEffect(() => {
    void load()
  }, [load])

  const currentJson = useMemo(() => document ? buildPageEditorialContentJson(document) : '', [document])
  const dirty = Boolean(document && currentJson !== savedJson)
  const dir: 'ltr' | 'rtl' = activeLocale === 'ar' ? 'rtl' : 'ltr'

  const updateProduct = (updater: (content: ProductEditorialLocaleContent) => ProductEditorialLocaleContent) => {
    setDocument((current) => {
      if (!current || current.kind !== 'product-detail') return current
      const next = clone(current)
      next.locales[activeLocale] = updater(getEditableProductLocale(next, activeLocale))
      return next
    })
  }

  const updateFaq = (updater: (content: FaqEditorialLocaleContent) => FaqEditorialLocaleContent) => {
    setDocument((current) => {
      if (!current || current.kind !== 'home') return current
      const next = clone(current)
      next.locales[activeLocale] = updater(getEditableFaqLocale(next, activeLocale))
      return next
    })
  }

  const save = async () => {
    if (!document || !section || !pageId) return
    const validationError = validateTurkish(document)
    if (validationError) {
      setError(validationError)
      return
    }
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const contentJson = buildPageEditorialContentJson(document)
      const response = await fetch(`${apiBaseUrl}/api/admin/cms/pages/${pageId}/sections/${encodeURIComponent('page.editorial')}`, {
        method: 'PATCH',
        headers: { Authorization: authorization, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionType: section.sectionType,
          title: section.title || '',
          subtitle: section.subtitle || '',
          body: section.body || '',
          contentJson,
          sortOrder: section.sortOrder,
          enabled: section.enabled,
        }),
      })
      if (!response.ok) throw new Error(`İçerik kaydedilemedi (${response.status}).`)
      await response.json()
      setSavedJson(contentJson)
      setMessage('İçerik kaydedildi. Public sayfayı yenileyerek kontrol edebilirsiniz.')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'İçerik kaydedilemedi.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="rounded-xl border border-[#d8d0c3] bg-white p-6">Editoryal içerik yükleniyor…</div>
  if (!document) return <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">{error || 'Editoryal içerik bulunamadı.'}</div>

  const product = document.kind === 'product-detail' ? getEditableProductLocale(document, activeLocale) : null
  const faq = document.kind === 'home' ? getEditableFaqLocale(document, activeLocale).faq : null

  return (
    <section className="mt-8 rounded-xl border border-[#cbb78f] bg-white p-6" data-page-editorial-admin={pageKey}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#2f2a24]">{pageLabel} — Editoryal içerik</h2>
          <p className="mt-1 text-sm text-[#6f6960]">SEO, URL, galeri, görsel, video ve kart verilerinden bağımsız page.editorial alanı.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => void load()} disabled={saving} className="rounded-md border border-[#b9aa91] px-4 py-2 text-sm font-semibold disabled:opacity-50">Yeniden yükle</button>
          <button type="button" onClick={() => void save()} disabled={saving || !dirty} className="rounded-md bg-[#191714] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">
            {saving ? 'Kaydediliyor…' : 'Editoryal içeriği kaydet'}
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Editoryal içerik dilleri">
        {pageEditorialLocaleCodes.map((locale) => (
          <button
            key={locale}
            type="button"
            role="tab"
            aria-selected={activeLocale === locale}
            onClick={() => setActiveLocale(locale)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${activeLocale === locale ? 'bg-[#191714] text-white' : 'border border-[#d8d0c3] text-[#5e564d]'}`}
          >
            {localeLabels[locale]} ({locale})
          </button>
        ))}
      </div>

      {activeLocale !== 'tr' && (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Bu dil yalnızca hazırlanır ve saklanır; public sitede yayınlanmaz. Boş alanlara Türkçe içerik otomatik taşınmaz.
        </p>
      )}
      {error && <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {message && <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-800">{message}</p>}

      <div className="mt-6 grid gap-6" dir={dir}>
        {product && (
          <>
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4 md:grid-cols-2">
              <Field label="Galeri küçük başlık yedeği" value={product.galleryFallback.eyebrow} dir={dir} onChange={(eyebrow) => updateProduct((current) => ({ ...current, galleryFallback: { ...current.galleryFallback, eyebrow } }))} />
              <Field label="Galeri ana başlık yedeği" value={product.galleryFallback.title} dir={dir} onChange={(title) => updateProduct((current) => ({ ...current, galleryFallback: { ...current.galleryFallback, title } }))} />
            </div>
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4">
              <Field label="Ürün Özellikleri başlığı" value={product.features.title} dir={dir} onChange={(title) => updateProduct((current) => ({ ...current, features: { ...current.features, title } }))} />
              <StringListEditor label="Ürün Özellikleri paragrafları" values={product.features.paragraphs} multiline dir={dir} onChange={(paragraphs) => updateProduct((current) => ({ ...current, features: { ...current.features, paragraphs } }))} />
              <StringListEditor label="Özellik etiketleri" values={product.features.tags} dir={dir} onChange={(tags) => updateProduct((current) => ({ ...current, features: { ...current.features, tags } }))} />
            </div>
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4">
              <Field label="Fiyat Bilgisi başlığı" value={product.pricing.title} dir={dir} onChange={(title) => updateProduct((current) => ({ ...current, pricing: { ...current.pricing, title } }))} />
              <StringListEditor label="Fiyat Bilgisi paragrafları" values={product.pricing.paragraphs} multiline dir={dir} onChange={(paragraphs) => updateProduct((current) => ({ ...current, pricing: { ...current.pricing, paragraphs } }))} />
              {product.pricing.showActions && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Fiyat kartı arama butonu" value={product.pricing.callLabel} dir={dir} onChange={(callLabel) => updateProduct((current) => ({ ...current, pricing: { ...current.pricing, callLabel } }))} />
                  <Field label="Fiyat kartı WhatsApp butonu" value={product.pricing.whatsappLabel} dir={dir} onChange={(whatsappLabel) => updateProduct((current) => ({ ...current, pricing: { ...current.pricing, whatsappLabel } }))} />
                </div>
              )}
            </div>
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4">
              <Field label="Ürünün Avantajları başlığı" value={product.advantages.title} dir={dir} onChange={(title) => updateProduct((current) => ({ ...current, advantages: { ...current.advantages, title } }))} />
              <StringListEditor label="Avantajlar" values={product.advantages.items} dir={dir} onChange={(items) => updateProduct((current) => ({ ...current, advantages: { ...current.advantages, items } }))} />
            </div>
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4">
              <Field label="Kullanım Alanları başlığı" value={product.usageAreas.title} dir={dir} onChange={(title) => updateProduct((current) => ({ ...current, usageAreas: { ...current.usageAreas, title } }))} />
              <StringListEditor label="Kullanım Alanları açıklamaları" values={product.usageAreas.paragraphs} multiline dir={dir} onChange={(paragraphs) => updateProduct((current) => ({ ...current, usageAreas: { ...current.usageAreas, paragraphs } }))} />
              <StringListEditor label="Kullanım Alanları listesi" values={product.usageAreas.items} dir={dir} onChange={(items) => updateProduct((current) => ({ ...current, usageAreas: { ...current.usageAreas, items } }))} />
            </div>
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4">
              <h4 className="font-semibold text-[#2f2a24]">Alt CTA</h4>
              {!product.bottomCta.enabled && (
                <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  Bu sayfada alt CTA public tarafta kapalıdır. Mevcut üst CTA&apos;nın tasarımı, konumu ve hedefleri bu alandan değiştirilmez.
                </p>
              )}
              <p className="text-xs text-[#6f6960]">Açıklamada <code>{'{{phone}}'}</code> kullanılırsa mevcut telefon metni kalın gösterilir; hedef numara değişmez.</p>
              <Field label="Alt CTA başlığı" value={product.bottomCta.title} dir={dir} onChange={(title) => updateProduct((current) => ({ ...current, bottomCta: { ...current.bottomCta, title } }))} />
              <Field label="Alt CTA açıklaması" value={product.bottomCta.description} multiline dir={dir} onChange={(description) => updateProduct((current) => ({ ...current, bottomCta: { ...current.bottomCta, description } }))} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Alt CTA arama butonu" value={product.bottomCta.callLabel} dir={dir} onChange={(callLabel) => updateProduct((current) => ({ ...current, bottomCta: { ...current.bottomCta, callLabel } }))} />
                <Field label="Alt CTA WhatsApp butonu" value={product.bottomCta.whatsappLabel} dir={dir} onChange={(whatsappLabel) => updateProduct((current) => ({ ...current, bottomCta: { ...current.bottomCta, whatsappLabel } }))} />
              </div>
            </div>
          </>
        )}

        {faq && (
          <>
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4 md:grid-cols-2">
              <Field label="Bölüm üst başlığı" value={faq.eyebrow} dir={dir} onChange={(eyebrow) => updateFaq((current) => ({ faq: { ...current.faq, eyebrow } }))} />
              <Field label="Ana başlık" value={faq.title} dir={dir} onChange={(title) => updateFaq((current) => ({ faq: { ...current.faq, title } }))} />
              <Field label="Vurgulu başlık" value={faq.highlightedTitle} dir={dir} onChange={(highlightedTitle) => updateFaq((current) => ({ faq: { ...current.faq, highlightedTitle } }))} />
              <Field label="Bölüm açıklaması" value={faq.description} dir={dir} onChange={(description) => updateFaq((current) => ({ faq: { ...current.faq, description } }))} />
            </div>
            <FaqItemsEditor items={faq.items} dir={dir} onChange={(items) => updateFaq((current) => ({ faq: { ...current.faq, items } }))} />
            <div className="grid gap-4 rounded-md border border-[#e4dccf] p-4 md:grid-cols-2">
              <Field label="FAQ CTA başlığı" value={faq.cta.title} dir={dir} onChange={(title) => updateFaq((current) => ({ faq: { ...current.faq, cta: { ...current.faq.cta, title } } }))} />
              <Field label="FAQ CTA açıklaması" value={faq.cta.description} dir={dir} onChange={(description) => updateFaq((current) => ({ faq: { ...current.faq, cta: { ...current.faq.cta, description } } }))} />
              <Field label="WhatsApp butonu" value={faq.cta.whatsappLabel} dir={dir} onChange={(whatsappLabel) => updateFaq((current) => ({ faq: { ...current.faq, cta: { ...current.faq.cta, whatsappLabel } } }))} />
              <Field label="Arama butonu" value={faq.cta.callLabel} dir={dir} onChange={(callLabel) => updateFaq((current) => ({ faq: { ...current.faq, cta: { ...current.faq.cta, callLabel } } }))} />
            </div>
          </>
        )}
      </div>

      <div className="mt-6 rounded-md border border-dashed border-[#b9aa91] bg-[#fbfaf7] p-5" dir={dir} data-editorial-preview={activeLocale}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6f6960]">{localeLabels[activeLocale]} önizleme</h3>
        {product && (
          <div className="mt-3 space-y-3 text-[#2f2a24]">
            <h4 className="text-xl font-semibold">{product.features.title || '—'}</h4>
            {product.features.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <h4 className="text-xl font-semibold">{product.advantages.title || '—'}</h4>
            <ul className="list-disc px-5">{product.advantages.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </div>
        )}
        {faq && (
          <div className="mt-3 space-y-3 text-[#2f2a24]">
            <p className="text-xs uppercase tracking-wider">{faq.eyebrow || '—'}</p>
            <h4 className="text-xl font-semibold">{faq.title} {faq.highlightedTitle}</h4>
            <p>{faq.description}</p>
            {faq.items.slice(0, 2).map((item) => <div key={item.id}><strong>{item.question}</strong><p>{item.answer}</p></div>)}
          </div>
        )}
      </div>
    </section>
  )
}
