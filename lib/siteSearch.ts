import {
  getPublicCorporateItems,
  getPublicModelItems,
  getPublicProductItems,
} from '@/lib/catalogContent'
import { getPublicBlogPosts } from '@/lib/blogContent'
import { productDetailDefaults } from '@/lib/productDetailContent'
import { englishArticles, englishPages } from '@/lib/englishContent'

export type SearchContentType =
  | 'product'
  | 'product-category'
  | 'curtain-model'
  | 'corporate-solution'
  | 'blog'
  | 'project-story'

export type SearchDocument = {
  id: string
  locale: 'tr' | 'en'
  type: SearchContentType
  title: string
  description: string
  category?: string
  slug: string
  href: string
  content?: string
  enabled: boolean
}

export type SearchResult = SearchDocument & {
  score: number
}

const MAX_CONTENT_LENGTH = 700

const categoryDocuments: SearchDocument[] = [
  {
    id: 'category-products',
    locale: 'tr',
    type: 'product-category',
    title: 'Ürünler',
    description: 'Tül, fon, stor, jaluzi, motorlu perde ve döşemelik kumaş seçenekleri.',
    category: 'Kategoriler',
    slug: 'urunler',
    href: '/urunler',
    enabled: true,
  },
  {
    id: 'category-curtain-models',
    locale: 'tr',
    type: 'product-category',
    title: 'Perde Modelleri',
    description: 'Modern, klasik, rustik ve özel kullanım alanlarına yönelik perde modelleri.',
    category: 'Kategoriler',
    slug: 'perde-modelleri',
    href: '/perde-modelleri',
    enabled: true,
  },
  {
    id: 'category-corporate',
    locale: 'tr',
    type: 'product-category',
    title: 'Kurumsal Ürünler',
    description: 'Otel, ofis, restoran, hastane ve özel projeler için perde çözümleri.',
    category: 'Kategoriler',
    slug: 'kurumsal-urunler',
    href: '/kurumsal-urunler',
    enabled: true,
  },
  {
    id: 'category-blog',
    locale: 'tr',
    type: 'product-category',
    title: 'Blog',
    description: 'Perde seçimi, dekorasyon önerileri ve uygulama projeleri.',
    category: 'Kategoriler',
    slug: 'blog',
    href: '/blog',
    enabled: true,
  },
]

export const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_CONTENT_LENGTH)

const slugFromHref = (href: string) =>
  href.split('/').filter(Boolean).at(-1) || href.replace(/^\//, '') || 'anasayfa'

const dedupeDocuments = (documents: SearchDocument[]) => {
  const unique = new Map<string, SearchDocument>()

  documents.forEach((document) => {
    if (document.enabled && document.href && !unique.has(document.href)) {
      unique.set(document.href, document)
    }
  })

  return Array.from(unique.values())
}

export async function getSiteSearchDocuments(): Promise<SearchDocument[]> {
  const [products, models, corporateSolutions, blogPosts] = await Promise.all([
    getPublicProductItems(),
    getPublicModelItems(),
    getPublicCorporateItems(),
    getPublicBlogPosts(),
  ])

  const productDocuments: SearchDocument[] = products
    .filter((item) => item.enabled)
    .map((item) => ({
      id: `product-category-${item.id}`,
      locale: 'tr',
      type: 'product-category',
      title: item.title,
      description: item.description,
      category: 'Ürün Kategorisi',
      slug: slugFromHref(item.href),
      href: item.href,
      enabled: item.enabled,
    }))

  const productDetailDocuments: SearchDocument[] = Object.entries(productDetailDefaults)
    .flatMap(([pageKey, detail]) =>
      detail.categories
        .filter((item) => item.enabled)
        .map((item) => ({
          id: `${pageKey}-${item.id}`,
          locale: 'tr' as const,
          type: 'product' as const,
          title: item.title,
          description: item.description,
          category: detail.categoryTitle || 'Ürün',
          slug: slugFromHref(item.href),
          href: item.href,
          content: `${detail.heroTitle} ${detail.heroHighlight} ${detail.heroDescription}`.slice(
            0,
            MAX_CONTENT_LENGTH,
          ),
          enabled: item.enabled,
        })),
    )

  const modelDocuments: SearchDocument[] = models
    .filter((item) => item.enabled)
    .map((item) => ({
      id: `curtain-model-${item.id}`,
      locale: 'tr',
      type: 'curtain-model',
      title: item.title,
      description: item.description,
      category: 'Perde Modelleri',
      slug: slugFromHref(item.href),
      href: item.href,
      enabled: item.enabled,
    }))

  const corporateDocuments: SearchDocument[] = corporateSolutions
    .filter((item) => item.enabled)
    .map((item) => ({
      id: `corporate-solution-${item.id}`,
      locale: 'tr',
      type: 'corporate-solution',
      title: item.title,
      description: item.description,
      category: item.badge || 'Kurumsal Çözüm',
      slug: slugFromHref(item.href),
      href: item.href,
      enabled: item.enabled,
    }))

  const blogDocuments: SearchDocument[] = blogPosts
    .filter((post) => post.enabled !== false)
    .map((post) => {
      const isProjectStory = normalizeSearchText(post.category).includes('proje hikaye')

      return {
        id: `blog-${post.id}`,
        locale: 'tr',
        type: isProjectStory ? 'project-story' : 'blog',
        title: post.title,
        description: post.excerpt,
        category: post.category,
        slug: post.slug,
        href: post.href || `/blog/${post.slug}`,
        content: stripHtml(post.content),
        enabled: post.enabled !== false,
      }
    })

  const englishPageDocuments: SearchDocument[] = Object.entries(englishPages).map(([key, page], index) => ({
    id: `english-page-${index}`,
    locale: 'en',
    type: key.startsWith('products/') ? 'product-category' : 'corporate-solution',
    title: page.title,
    description: page.description,
    category: key.startsWith('products') ? 'Products' : 'Pile Perde',
    slug: key || 'home',
    href: `/en${key ? `/${key}` : ''}`,
    content: page.paragraphs.join(' ').slice(0, MAX_CONTENT_LENGTH),
    enabled: true,
  }))

  const englishArticleDocuments: SearchDocument[] = Object.entries(englishArticles).map(([slug, article], index) => ({
    id: `english-article-${index}`,
    locale: 'en',
    type: 'blog',
    title: article.title,
    description: article.description,
    category: article.category,
    slug,
    href: `/en/blog/${slug}`,
    content: article.paragraphs.join(' ').slice(0, MAX_CONTENT_LENGTH),
    enabled: true,
  }))

  return dedupeDocuments([
    ...categoryDocuments,
    ...productDocuments,
    ...productDetailDocuments,
    ...modelDocuments,
    ...corporateDocuments,
    ...blogDocuments,
    ...englishPageDocuments,
    ...englishArticleDocuments,
  ])
}

const editDistance = (left: string, right: string) => {
  if (left === right) return 0
  if (Math.abs(left.length - right.length) > 2) return 3

  const previous = Array.from({ length: right.length + 1 }, (_, index) => index)

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex]

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + substitutionCost,
      )
    }

    previous.splice(0, previous.length, ...current)
  }

  return previous[right.length]
}

const tokenMatches = (queryToken: string, fieldToken: string) => {
  if (fieldToken === queryToken) return 1
  if (fieldToken.startsWith(queryToken) || queryToken.startsWith(fieldToken)) return 0.85
  if (fieldToken.includes(queryToken) || queryToken.includes(fieldToken)) return 0.72

  const allowedDistance = queryToken.length >= 7 ? 2 : queryToken.length >= 4 ? 1 : 0
  if (allowedDistance > 0 && editDistance(queryToken, fieldToken) <= allowedDistance) return 0.58

  return 0
}

const scoreField = (query: string, field: string | undefined, weight: number) => {
  if (!field) return 0

  const normalizedField = normalizeSearchText(field)
  if (!normalizedField) return 0
  if (normalizedField === query) return weight * 4
  if (normalizedField.startsWith(query)) return weight * 3
  if (normalizedField.includes(query)) return weight * 2

  const queryTokens = query.split(' ')
  const fieldTokens = normalizedField.split(' ')
  const tokenScores = queryTokens.map((queryToken) =>
    Math.max(...fieldTokens.map((fieldToken) => tokenMatches(queryToken, fieldToken))),
  )
  const matchedTokens = tokenScores.filter((score) => score > 0).length

  if (matchedTokens !== queryTokens.length) return 0

  return weight * (tokenScores.reduce((sum, score) => sum + score, 0) / queryTokens.length)
}

export function searchSiteDocuments(
  documents: SearchDocument[],
  rawQuery: string,
  limit = 10,
  locale: 'tr' | 'en' = 'tr',
): SearchResult[] {
  const query = normalizeSearchText(rawQuery)
  if (query.length < 2) return []

  return documents
    .filter((document) => document.enabled && document.locale === locale)
    .map((document) => ({
      ...document,
      score:
        scoreField(query, document.title, 40) +
        scoreField(query, document.slug, 22) +
        scoreField(query, document.category, 16) +
        scoreField(query, document.description, 10) +
        scoreField(query, document.content, 4),
    }))
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title, 'tr'))
    .filter((document, index, results) =>
      results.findIndex((result) => result.href === document.href) === index,
    )
    .slice(0, limit)
}
