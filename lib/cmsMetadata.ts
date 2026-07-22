import type { Metadata } from 'next'
import { getCmsPage } from '@/lib/cmsPage'

export const getCmsPageMetadata = async (
  pageKey: string,
  fallback: Metadata
): Promise<Metadata> => {
  const page = await getCmsPage(pageKey)

  const nonSeoFallback = { ...fallback }
  const nonSeoOpenGraphFallback = { ...(fallback.openGraph ?? {}) }
  delete nonSeoFallback.title
  delete nonSeoFallback.description
  delete nonSeoFallback.openGraph
  delete nonSeoOpenGraphFallback.title
  delete nonSeoOpenGraphFallback.description

  if (!page?.seoTitle || !page.seoDescription) {
    return {
      ...nonSeoFallback,
      openGraph: nonSeoOpenGraphFallback,
    }
  }

  return {
    ...nonSeoFallback,
    title: { absolute: page.seoTitle },
    description: page.seoDescription,
    openGraph: {
      ...nonSeoOpenGraphFallback,
      title: page.seoTitle,
      description: page.seoDescription,
    },
  }
}
