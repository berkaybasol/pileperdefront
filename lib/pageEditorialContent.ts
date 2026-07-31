import pageEditorialDefaultsJson from '@/lib/pageEditorialDefaults.json'
import type { CmsPage } from '@/lib/cmsPage'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
const getPublicApiBaseUrl = () => typeof window === 'undefined' ? API_BASE_URL : ''

export const pageEditorialLocaleCodes = ['tr', 'en', 'de', 'es', 'ar'] as const
export type PageEditorialLocale = typeof pageEditorialLocaleCodes[number]

export type ProductEditorialLocaleContent = {
  galleryFallback: {
    eyebrow: string
    title: string
  }
  features: {
    title: string
    paragraphs: string[]
    tags: string[]
  }
  pricing: {
    title: string
    paragraphs: string[]
    showActions: boolean
    callLabel: string
    whatsappLabel: string
  }
  advantages: {
    title: string
    items: string[]
  }
  usageAreas: {
    title: string
    paragraphs: string[]
    items: string[]
  }
  bottomCta: {
    enabled: boolean
    title: string
    description: string
    callLabel: string
    whatsappLabel: string
  }
}

export type FaqEditorialItem = {
  id: number
  question: string
  answer: string
}

export type FaqEditorialLocaleContent = {
  faq: {
    eyebrow: string
    title: string
    highlightedTitle: string
    description: string
    items: FaqEditorialItem[]
    cta: {
      title: string
      description: string
      whatsappLabel: string
      callLabel: string
    }
  }
}

export type PageEditorialLocaleContent = Partial<ProductEditorialLocaleContent & FaqEditorialLocaleContent>

export type PageEditorialDocument = {
  schemaVersion: 1
  kind: 'product-detail' | 'home'
  defaultLocale: 'tr'
  locales: Record<PageEditorialLocale, PageEditorialLocaleContent>
}

type ApiResponse<T> = {
  data: T
}

const pageEditorialDefaults = pageEditorialDefaultsJson as Record<string, PageEditorialDocument>

export const pageEditorialPageKeys = Object.freeze(Object.keys(pageEditorialDefaults))

export const getDefaultPageEditorial = (pageKey: string): PageEditorialDocument | null =>
  pageEditorialDefaults[pageKey] || null

const cloneDocument = (document: PageEditorialDocument) =>
  JSON.parse(JSON.stringify(document)) as PageEditorialDocument

export const parsePageEditorialDocument = (
  contentJson: string | null | undefined,
  fallback: PageEditorialDocument | null,
): PageEditorialDocument | null => {
  if (!contentJson) return fallback ? cloneDocument(fallback) : null

  try {
    const parsed = JSON.parse(contentJson) as Partial<PageEditorialDocument>
    if (
      parsed.schemaVersion !== 1
      || !['product-detail', 'home'].includes(parsed.kind || '')
      || !parsed.locales
      || typeof parsed.locales !== 'object'
    ) return fallback ? cloneDocument(fallback) : null

    const fallbackLocales = fallback?.locales || {
      tr: {}, en: {}, de: {}, es: {}, ar: {},
    }
    return {
      schemaVersion: 1,
      kind: parsed.kind as PageEditorialDocument['kind'],
      defaultLocale: 'tr',
      locales: Object.fromEntries(pageEditorialLocaleCodes.map((locale) => [
        locale,
        locale === 'tr'
          ? { ...fallbackLocales.tr, ...(parsed.locales?.tr || {}) }
          : parsed.locales?.[locale] || {},
      ])) as PageEditorialDocument['locales'],
    }
  } catch {
    return fallback ? cloneDocument(fallback) : null
  }
}

type CmsPageSections = {
  sections: Array<{
    sectionKey: string
    contentJson: string | null
    enabled: boolean
  }>
}

export const getPageEditorialSectionJson = (page: CmsPageSections | null | undefined) =>
  page?.sections.find((section) => section.enabled && section.sectionKey === 'page.editorial')?.contentJson

export const getPageEditorialFromCmsPage = (pageKey: string, page: CmsPageSections | null | undefined) =>
  parsePageEditorialDocument(getPageEditorialSectionJson(page), getDefaultPageEditorial(pageKey))

export const getProductEditorialLocale = (
  document: PageEditorialDocument | null,
  locale: PageEditorialLocale = 'tr',
): ProductEditorialLocaleContent | null => {
  if (!document || document.kind !== 'product-detail') return null
  const localeContent = document.locales[locale]
  if (!localeContent?.features || !localeContent.pricing || !localeContent.advantages || !localeContent.usageAreas || !localeContent.bottomCta || !localeContent.galleryFallback) {
    return null
  }
  return localeContent as ProductEditorialLocaleContent
}

export const getFaqEditorialLocale = (
  document: PageEditorialDocument | null,
  locale: PageEditorialLocale = 'tr',
): FaqEditorialLocaleContent | null => {
  if (!document || document.kind !== 'home' || !document.locales[locale]?.faq) return null
  return document.locales[locale] as FaqEditorialLocaleContent
}

export const buildPageEditorialContentJson = (document: PageEditorialDocument) =>
  JSON.stringify(document, null, 2)

export const getPublicPageEditorial = async (pageKey: string) => {
  const fallback = getDefaultPageEditorial(pageKey)
  try {
    const response = await fetch(`${getPublicApiBaseUrl()}/api/public/cms/pages/${encodeURIComponent(pageKey)}`, {
      cache: 'no-store',
    })
    if (!response.ok) return fallback
    const body = await response.json() as ApiResponse<CmsPage>
    return getPageEditorialFromCmsPage(pageKey, body.data)
  } catch {
    return fallback
  }
}
