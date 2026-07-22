import type { ClientCmsPage } from '@/components/CmsPageProvider'

const PREVIEW_PREFIX = 'pileperde.local-preview.'

export const isLocalPreviewEnvironment = () =>
  typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)

export const createLocalPreview = (page: ClientCmsPage) => {
  if (!isLocalPreviewEnvironment()) return null
  const token = crypto.randomUUID()
  window.localStorage.setItem(`${PREVIEW_PREFIX}${token}`, JSON.stringify(page))
  return token
}

export const readLocalPreview = (pageKey: string) => {
  if (!isLocalPreviewEnvironment()) return null
  const token = new URLSearchParams(window.location.search).get('__cmsPreview')
  if (!token) return null

  try {
    const raw = window.localStorage.getItem(`${PREVIEW_PREFIX}${token}`)
    if (!raw) return null
    const page = JSON.parse(raw) as ClientCmsPage
    return page.pageKey === pageKey ? page : null
  } catch {
    return null
  }
}

export const readLocalPreviewSectionJson = (pageKey: string, sectionKey: string) =>
  readLocalPreview(pageKey)?.sections.find((section) => section.enabled && section.sectionKey === sectionKey)?.contentJson || null

export const readLocalPreviewSection = (pageKey: string, sectionKey: string) =>
  readLocalPreview(pageKey)?.sections.find((section) => section.enabled && section.sectionKey === sectionKey) || null
