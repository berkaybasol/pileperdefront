import 'server-only'

import { cache } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export type CmsSection = {
  id: string
  sectionKey: string
  sectionType: string
  title: string | null
  subtitle: string | null
  body: string | null
  contentJson: string | null
  sortOrder: number
  enabled: boolean
}

export type CmsPage = {
  id: string
  pageKey: string
  slug: string
  title: string
  seoTitle: string | null
  seoDescription: string | null
  status: string
  sections: CmsSection[]
}

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

export const cmsPageTag = (pageKey: string) => `cms-page:${pageKey}`

export const getCmsPage = cache(async (pageKey: string): Promise<CmsPage | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/${encodeURIComponent(pageKey)}`, {
      next: {
        revalidate: 60,
        tags: [cmsPageTag(pageKey)],
      },
    })

    if (!response.ok) {
      return null
    }

    const body = await response.json() as ApiResponse<CmsPage>
    return body.success && body.data ? body.data : null
  } catch {
    return null
  }
})

export const parseCmsSectionJson = <T>(section: CmsSection | undefined): T | null => {
  if (!section?.contentJson) {
    return null
  }

  try {
    return JSON.parse(section.contentJson) as T
  } catch {
    return null
  }
}

export const getCmsSection = (page: CmsPage | null, sectionKey: string) =>
  page?.sections.find((section) => section.enabled && section.sectionKey === sectionKey)
