'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { readLocalPreview } from '@/lib/localCmsPreview'

export type ClientCmsSection = {
  sectionKey: string
  title: string | null
  subtitle: string | null
  body: string | null
  contentJson: string | null
  enabled: boolean
}

export type ClientCmsPage = {
  localPreview?: boolean
  pageKey: string
  slug: string
  title?: string
  status?: string
  seoTitle: string | null
  seoDescription: string | null
  sections: ClientCmsSection[]
}

const CmsPageContext = createContext<ClientCmsPage | null>(null)

function LocalPreviewEffects({ page }: { page: ClientCmsPage | null }) {
  useEffect(() => {
    if (!page?.localPreview) return
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content

    const applyPreviewMetadata = () => {
      if (page.seoTitle && document.title !== page.seoTitle) document.title = page.seoTitle
      if (page.seoDescription) {
        const current = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        const target = current || Object.assign(document.createElement('meta'), { name: 'description' })
        if (target.content !== page.seoDescription) target.content = page.seoDescription
        if (!current) document.head.appendChild(target)
      }
    }

    applyPreviewMetadata()
    // Next.js streamed metadata may arrive after hydration. Keep the local draft
    // authoritative for the lifetime of this preview tab.
    const observer = new MutationObserver(applyPreviewMetadata)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true, attributes: true })

    return () => {
      observer.disconnect()
      document.title = previousTitle
      if (meta && previousDescription !== undefined) meta.content = previousDescription
    }
  }, [page])

  useEffect(() => {
    if (!page?.localPreview) return
    const gallerySection = page.sections.find((section) => section.sectionKey === 'product.gallery' && section.enabled)
    if (!gallerySection?.contentJson) return

    let video: { title?: string; description?: string; youtubeUrl?: string; enabled?: boolean } | undefined
    try {
      video = (JSON.parse(gallerySection.contentJson) as { video?: typeof video }).video
    } catch {
      return
    }
    if (!video) return

    const frame = document.querySelector<HTMLIFrameElement>('iframe[src*="youtube.com"], iframe[src*="youtu.be"]')
    const section = frame?.closest('section') as HTMLElement | null
    if (!frame || !section) return

    if (video.enabled === false) {
      section.hidden = true
      return () => { section.hidden = false }
    }

    const heading = section.querySelector('h2, h3')
    const description = Array.from(section.querySelectorAll('p')).find((item) =>
      !/video anlatım|video galerisi/i.test(item.textContent || '')
    )
    if (heading && video.title) heading.textContent = video.title
    if (description && video.description !== undefined) description.textContent = video.description
    if (video.youtubeUrl) {
      try {
        const url = new URL(video.youtubeUrl)
        const host = url.hostname.replace(/^www\./, '')
        const videoId = host === 'youtu.be'
          ? url.pathname.split('/').filter(Boolean)[0]
          : url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop()
        if (videoId) frame.src = `https://www.youtube.com/embed/${videoId}`
      } catch {
        // Keep the existing video for an invalid local draft URL.
      }
    }
    if (video.title) frame.title = video.title
  }, [page])

  if (!page?.localPreview || page.status === 'PUBLISHED') return null
  return (
    <div className="fixed inset-x-0 top-0 z-[9999] bg-amber-300 px-4 py-2 text-center text-sm font-semibold text-black shadow-md">
      Lokal ön izleme: Bu sayfa “{page.status === 'DRAFT' ? 'Taslak' : page.status || 'Yayında değil'}” durumunda; canlı yayın etkilenmez.
    </div>
  )
}

export function CmsPageProvider({
  page,
  children,
}: {
  page: ClientCmsPage | null
  children: React.ReactNode
}) {
  const [resolvedPage, setResolvedPage] = useState(page)

  useEffect(() => {
    if (!page) return
    const previewPage = readLocalPreview(page.pageKey)
    if (previewPage) setResolvedPage(previewPage)
  }, [page])

  return (
    <CmsPageContext.Provider key={resolvedPage?.localPreview ? 'local-preview' : 'cms'} value={resolvedPage}>
      <LocalPreviewEffects page={resolvedPage} />
      {children}
    </CmsPageContext.Provider>
  )
}

export const useCmsPage = () => useContext(CmsPageContext)

export const useCmsSectionJson = (pageKey: string, sectionKey: string) => {
  const page = useCmsPage()
  if (!page || page.pageKey !== pageKey) {
    return null
  }

  return page.sections.find((section) => section.enabled && section.sectionKey === sectionKey)?.contentJson || null
}
