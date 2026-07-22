'use server'

import { revalidatePath, updateTag } from 'next/cache'

const normalizeCmsSlug = (slug: string) => {
  const value = slug.trim()

  if (!value.startsWith('/') || value.startsWith('//') || value.includes('://') || value.includes('..')) {
    throw new Error('Geçersiz CMS slug')
  }

  return value === '/' ? '/' : value.replace(/\/+$/, '')
}

export const revalidateCmsPage = async (pageKey: string, slug: string) => {
  if (!pageKey.trim()) {
    throw new Error('Geçersiz CMS pageKey')
  }

  const path = normalizeCmsSlug(slug)
  updateTag(`cms-page:${pageKey}`)
  revalidatePath(path)

  return { pageKey, path }
}
