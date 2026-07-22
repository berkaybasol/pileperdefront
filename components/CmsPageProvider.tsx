'use client'

import { createContext, useContext } from 'react'

export type ClientCmsSection = {
  sectionKey: string
  title: string | null
  subtitle: string | null
  body: string | null
  contentJson: string | null
  enabled: boolean
}

export type ClientCmsPage = {
  pageKey: string
  slug: string
  seoTitle: string | null
  seoDescription: string | null
  sections: ClientCmsSection[]
}

const CmsPageContext = createContext<ClientCmsPage | null>(null)

export function CmsPageProvider({
  page,
  children,
}: {
  page: ClientCmsPage | null
  children: React.ReactNode
}) {
  return <CmsPageContext.Provider value={page}>{children}</CmsPageContext.Provider>
}

export const useCmsPage = () => useContext(CmsPageContext)

export const useCmsSectionJson = (pageKey: string, sectionKey: string) => {
  const page = useCmsPage()
  if (!page || page.pageKey !== pageKey) {
    return null
  }

  return page.sections.find((section) => section.enabled && section.sectionKey === sectionKey)?.contentJson || null
}
