import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { CmsPageProvider, type ClientCmsPage } from '@/components/CmsPageProvider'
import ProductEditorialSections from '@/components/ProductEditorialSections'
import { parseProductGalleryHeading } from '@/lib/productGalleryContent'
import {
  buildPageEditorialContentJson,
  getDefaultPageEditorial,
  getFaqEditorialLocale,
  getPageEditorialFromCmsPage,
  getProductEditorialLocale,
  pageEditorialLocaleCodes,
  pageEditorialPageKeys,
  parsePageEditorialDocument,
} from '@/lib/pageEditorialContent'

const CLASSIC_PAGE_KEY = 'product-gallery-model-perdeler-klasik-ve-avangart-perde'

const makePage = (pageKey: string, contentJson: string): ClientCmsPage => ({
  pageKey,
  slug: '/test',
  seoTitle: null,
  seoDescription: null,
  sections: [{
    sectionKey: 'page.editorial',
    title: 'Sayfa içeriği',
    subtitle: null,
    body: null,
    contentJson,
    enabled: true,
  }],
})

describe('page editorial content contract', () => {
  it('keeps deliberately empty gallery headings empty instead of restoring fallback copy', () => {
    const fallback = { galleryEyebrow: 'Ürün Galerisi', galleryTitle: 'Ürün Gruplarımız' }
    const stored = JSON.stringify({
      galleryEyebrow: { tr: '' },
      galleryTitle: { tr: '' },
    })

    expect(parseProductGalleryHeading(stored, fallback, 'tr')).toEqual({
      galleryEyebrow: '',
      galleryTitle: '',
    })
    expect(parseProductGalleryHeading('{}', { galleryEyebrow: '', galleryTitle: '' }, 'tr')).toEqual({
      galleryEyebrow: '',
      galleryTitle: '',
    })
  })

  it('contains all 32 detail pages and the home FAQ in five locale slots', () => {
    expect(pageEditorialPageKeys).toHaveLength(33)

    const documents = pageEditorialPageKeys.map((key) => getDefaultPageEditorial(key))
    expect(documents.filter((document) => document?.kind === 'product-detail')).toHaveLength(32)
    expect(documents.filter((document) => document?.kind === 'home')).toHaveLength(1)

    for (const document of documents) {
      expect(document?.schemaVersion).toBe(1)
      expect(document?.defaultLocale).toBe('tr')
      expect(Object.keys(document?.locales || {})).toEqual(pageEditorialLocaleCodes)
      expect(document?.locales.en).toEqual({})
      expect(document?.locales.de).toEqual({})
      expect(document?.locales.es).toEqual({})
      expect(document?.locales.ar).toEqual({})
    }

    const home = getDefaultPageEditorial('home')
    expect(getFaqEditorialLocale(home, 'tr')?.faq.items).toHaveLength(8)
  })

  it('never publishes Turkish content through an empty secondary locale', () => {
    const classic = getDefaultPageEditorial(CLASSIC_PAGE_KEY)
    expect(getProductEditorialLocale(classic, 'tr')).not.toBeNull()

    for (const locale of ['en', 'de', 'es', 'ar'] as const) {
      expect(getProductEditorialLocale(classic, locale)).toBeNull()
    }

    const home = getDefaultPageEditorial('home')
    expect(getFaqEditorialLocale(home, 'tr')).not.toBeNull()
    expect(getFaqEditorialLocale(home, 'en')).toBeNull()
  })

  it('round-trips Turkish characters, empty fields and list ordering', () => {
    const document = getDefaultPageEditorial(CLASSIC_PAGE_KEY)
    expect(document).not.toBeNull()
    if (!document) return

    const changed = structuredClone(document)
    const tr = getProductEditorialLocale(changed, 'tr')
    expect(tr).not.toBeNull()
    if (!tr) return

    tr.features.paragraphs = ['Çığ öşü İĞÜ — “tırnak”', '']
    tr.advantages.items = ['Üçüncü', 'Birinci', 'İkinci']
    tr.bottomCta.description = ''

    const parsed = parsePageEditorialDocument(buildPageEditorialContentJson(changed), document)
    const parsedTr = getProductEditorialLocale(parsed, 'tr')
    expect(parsedTr?.features.paragraphs).toEqual(['Çığ öşü İĞÜ — “tırnak”', ''])
    expect(parsedTr?.advantages.items).toEqual(['Üçüncü', 'Birinci', 'İkinci'])
    expect(parsedTr?.bottomCta.description).toBe('')
  })

  it('keeps one page edit isolated from every other page', () => {
    const classic = getDefaultPageEditorial(CLASSIC_PAGE_KEY)
    const modernKey = 'product-gallery-model-perdeler-modern-perde'
    const modern = getDefaultPageEditorial(modernKey)
    expect(classic).not.toBeNull()
    expect(modern).not.toBeNull()
    if (!classic || !modern) return

    const changedClassic = structuredClone(classic)
    const classicTr = getProductEditorialLocale(changedClassic, 'tr')
    expect(classicTr).not.toBeNull()
    if (!classicTr) return
    classicTr.features.title = 'Yalnızca Klasik Sayfası'

    const classicPage = makePage(CLASSIC_PAGE_KEY, buildPageEditorialContentJson(changedClassic))
    expect(getProductEditorialLocale(getPageEditorialFromCmsPage(CLASSIC_PAGE_KEY, classicPage), 'tr')?.features.title)
      .toBe('Yalnızca Klasik Sayfası')
    expect(getProductEditorialLocale(getDefaultPageEditorial(modernKey), 'tr')?.features.title)
      .toBe(getProductEditorialLocale(modern, 'tr')?.features.title)
    expect(getProductEditorialLocale(getDefaultPageEditorial(CLASSIC_PAGE_KEY), 'tr')?.features.title)
      .not.toBe('Yalnızca Klasik Sayfası')
  })

  it('renders CMS text through the shared component while preserving contact targets', () => {
    const document = getDefaultPageEditorial(CLASSIC_PAGE_KEY)
    expect(document).not.toBeNull()
    if (!document) return

    const changed = structuredClone(document)
    const tr = getProductEditorialLocale(changed, 'tr')
    expect(tr).not.toBeNull()
    if (!tr) return
    tr.features.title = 'CMS Özellik Başlığı'
    tr.bottomCta.title = 'CMS Alt CTA Başlığı'

    const html = renderToStaticMarkup(
      <CmsPageProvider page={makePage(CLASSIC_PAGE_KEY, buildPageEditorialContentJson(changed))}>
        <ProductEditorialSections pageKey={CLASSIC_PAGE_KEY} />
      </CmsPageProvider>,
    )

    expect(html).toContain('CMS Özellik Başlığı')
    expect(html).toContain('CMS Alt CTA Başlığı')
    expect(html).toContain('href="tel:+903122417272"')
    expect(html).toContain('href="https://wa.me/905335127272"')
    expect(html).not.toContain('{{phone}}')
    expect(html).not.toContain('{{phone_legacy}}')
  })
})
