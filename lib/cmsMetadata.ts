import type { Metadata } from 'next'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

type CmsPageMetadata = {
  title: string
  seoTitle: string | null
  seoDescription: string | null
}

export const getCmsPageMetadata = async (
  pageKey: string,
  fallback: Metadata
): Promise<Metadata> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/${pageKey}`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return fallback
    }

    const body = await response.json() as ApiResponse<CmsPageMetadata>
    const title = body.data.seoTitle || body.data.title || fallback.title
    const description = body.data.seoDescription || fallback.description

    return {
      ...fallback,
      title,
      description,
      openGraph: {
        ...fallback.openGraph,
        title: typeof title === 'string' ? title : fallback.openGraph?.title,
        description: typeof description === 'string' ? description : fallback.openGraph?.description,
      },
    }
  } catch {
    return fallback
  }
}
