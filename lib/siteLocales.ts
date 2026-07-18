export const SITE_URL = 'https://pileperde.com.tr'

import { englishArticles, englishPages } from '@/lib/englishContent'

const routePairs: Array<[string, string]> = [
  ...Object.entries(englishPages).map(([key, page]) => [
    page.turkishPath,
    `/en${key ? `/${key}` : ''}`,
  ] as [string, string]),
  ['/blog', '/en/journal'],
  ...Object.entries(englishArticles).map(([slug, article]) => [
    article.turkishPath,
    `/en/blog/${slug}`,
  ] as [string, string]),
]

export const localeRoutePairs = new Map(routePairs)
export const reverseLocaleRoutePairs = new Map(routePairs.map(([tr, en]) => [en, tr]))

export function getLocaleAlternative(pathname: string) {
  const normalized = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname
  const isEnglish = normalized === '/en' || normalized.startsWith('/en/')

  if (isEnglish) {
    const href = reverseLocaleRoutePairs.get(normalized)
    return { locale: 'en' as const, href: href || '/', available: Boolean(href) }
  }

  const href = localeRoutePairs.get(normalized)
  return { locale: 'tr' as const, href: href || '/en', available: Boolean(href) }
}

export function localeAlternates(turkishPath: string, englishPath: string) {
  return {
    canonical: `${SITE_URL}${englishPath}`,
    languages: {
      'tr-TR': `${SITE_URL}${turkishPath}`,
      'en': `${SITE_URL}${englishPath}`,
      'x-default': `${SITE_URL}${turkishPath}`,
    },
  }
}

export function turkishLocaleAlternates(turkishPath: string, englishPath: string) {
  return {
    canonical: `${SITE_URL}${turkishPath}`,
    languages: {
      'tr-TR': `${SITE_URL}${turkishPath}`,
      en: `${SITE_URL}${englishPath}`,
      'x-default': `${SITE_URL}${turkishPath}`,
    },
  }
}
