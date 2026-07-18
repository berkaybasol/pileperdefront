export const BREADCRUMB_SITE_URL = 'https://pileperde.com.tr'

export type BreadcrumbItem = {
  name: string
  url: string
}

export type NormalizedBreadcrumbItem = {
  name: string
  url: string
}

export type BreadcrumbListSchema = {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  '@id': string
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

const siteOrigin = new URL(BREADCRUMB_SITE_URL).origin

const normalizeSameOriginUrl = (value: string, fieldName: string) => {
  const input = value.trim()
  if (!input) throw new Error(`${fieldName} boş olamaz.`)
  if (input.startsWith('//')) throw new Error(`${fieldName} protokolsüz URL olamaz.`)
  if (!input.startsWith('/') && !/^https:\/\//i.test(input)) {
    throw new Error(`${fieldName} kökten başlayan path veya HTTPS URL olmalıdır.`)
  }

  let parsed: URL
  try {
    parsed = new URL(input, BREADCRUMB_SITE_URL)
  } catch {
    throw new Error(`${fieldName} geçerli bir URL olmalıdır.`)
  }

  if (parsed.protocol !== 'https:' || parsed.origin !== siteOrigin) {
    throw new Error(`${fieldName} ${siteOrigin} alan adında HTTPS URL olmalıdır.`)
  }
  if (parsed.username || parsed.password) throw new Error(`${fieldName} kullanıcı bilgisi içeremez.`)
  if (parsed.search || parsed.hash) throw new Error(`${fieldName} sorgu veya fragment içeremez.`)

  const pathname = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '')
  return `${siteOrigin}${pathname}`
}

export const normalizeBreadcrumbUrl = (value: string) =>
  normalizeSameOriginUrl(value, 'Breadcrumb URL')

export const normalizeCanonicalUrl = (value: string) =>
  normalizeSameOriginUrl(value, 'Canonical URL')

export const createBreadcrumbId = (canonicalUrl: string) =>
  `${normalizeCanonicalUrl(canonicalUrl)}#breadcrumb`

export const normalizeBreadcrumbItems = (
  items: BreadcrumbItem[],
  canonicalUrl: string
): NormalizedBreadcrumbItem[] => {
  if (items.length < 2) throw new Error('BreadcrumbList en az iki öğe içermelidir.')

  const canonical = normalizeCanonicalUrl(canonicalUrl)
  const normalized = items.map((item, index) => {
    const name = item.name.trim()
    if (!name) throw new Error(`Breadcrumb ${index + 1} adı boş olamaz.`)
    return { name, url: normalizeBreadcrumbUrl(item.url) }
  })

  if (normalized.at(-1)?.url !== canonical) {
    throw new Error('Son breadcrumb URL değeri sayfanın canonical URL değeriyle aynı olmalıdır.')
  }

  return normalized
}

export const buildBreadcrumbListSchema = (
  items: BreadcrumbItem[],
  canonicalUrl: string
): BreadcrumbListSchema => {
  const canonical = normalizeCanonicalUrl(canonicalUrl)
  const normalizedItems = normalizeBreadcrumbItems(items, canonical)

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': createBreadcrumbId(canonical),
    itemListElement: normalizedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}