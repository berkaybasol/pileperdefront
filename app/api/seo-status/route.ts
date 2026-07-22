import { NextRequest, NextResponse } from 'next/server'
import { getCmsPage } from '@/lib/cmsPage'

type StatusRequest = {
  pageKey: string
  slug: string
}

type SeoStatusErrorReason = 'invalid_request' | 'cms_page_unavailable' | 'cms_metadata_missing' | 'public_request_failed'

const decode = (value: string) => value
  .replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')

const readMetadata = (html: string) => {
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '')
  const descriptionTag = html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0]
    || html.match(/<meta\b[^>]*content=["'][^"']*["'][^>]*name=["']description["'][^>]*>/i)?.[0]
    || ''
  const description = decode(descriptionTag.match(/content=["']([^"']*)["']/i)?.[1]?.trim() || '')
  return { title, description }
}

const isSafeSlug = (slug: string) =>
  slug.startsWith('/') && !slug.startsWith('//') && !slug.includes('://') && !slug.includes('..')

export async function POST(request: NextRequest) {
  const body = await request.json() as { pages?: StatusRequest[] }
  const pages = Array.isArray(body.pages) ? body.pages.slice(0, 100) : []

  const statuses = await Promise.all(pages.map(async ({ pageKey, slug }) => {
    if (!pageKey || !isSafeSlug(slug)) {
      return {
        pageKey,
        state: 'error' as const,
        errorReason: 'invalid_request' as SeoStatusErrorReason,
        errorMessage: 'PageKey veya slug geçersiz.',
      }
    }

    const cmsPage = await getCmsPage(pageKey)
    if (!cmsPage) {
      return {
        pageKey,
        state: 'error' as const,
        errorReason: 'cms_page_unavailable' as SeoStatusErrorReason,
        errorMessage: 'CMS sayfası okunamadı veya bulunamadı.',
      }
    }

    if (!cmsPage.seoTitle || !cmsPage.seoDescription) {
      return {
        pageKey,
        state: 'error' as const,
        errorReason: 'cms_metadata_missing' as SeoStatusErrorReason,
        errorMessage: 'CMS Google başlığı veya açıklaması eksik.',
      }
    }

    try {
      const response = await fetch(new URL(slug, request.nextUrl.origin), { cache: 'no-store' })
      const metadata = readMetadata(await response.text())
      return {
        pageKey,
        state: response.ok && metadata.title === cmsPage.seoTitle && metadata.description === cmsPage.seoDescription
          ? 'same' as const
          : 'different' as const,
        httpStatus: response.status,
        publicTitle: metadata.title,
        publicDescription: metadata.description,
      }
    } catch (error) {
      return {
        pageKey,
        state: 'error' as const,
        errorReason: 'public_request_failed' as SeoStatusErrorReason,
        errorMessage: error instanceof Error ? error.message : 'Public sayfa isteği başarısız oldu.',
      }
    }
  }))

  return NextResponse.json({ statuses })
}
