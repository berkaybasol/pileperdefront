'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCmsPage } from '@/components/CmsPageProvider'
import {
  getPublicProductGalleryHeading,
  parseProductGalleryHeading,
  type ProductGalleryLocale,
  type ProductGalleryHeading as ProductGalleryHeadingContent,
} from '@/lib/productGalleryContent'

type ProductGalleryHeadingProps = {
  fallbackEyebrow: string
  fallbackTitle: string
  className?: string
  eyebrowClassName?: string
  eyebrowTitleSpacingClassName?: string
  titleClassName?: string
  locale?: ProductGalleryLocale
}

export default function ProductGalleryHeading({
  className = 'text-center mb-16',
  eyebrowClassName = 'text-sm text-gray-500 uppercase tracking-[0.3em]',
  eyebrowTitleSpacingClassName = 'mb-4',
  titleClassName = 'text-3xl md:text-4xl font-extralight text-white',
  locale = 'tr',
}: ProductGalleryHeadingProps) {
  const page = useCmsPage()
  const contentJson = page?.sections.find(
    (section) => section.enabled && section.sectionKey === 'product.gallery',
  )?.contentJson
  const fallbackHeading = useMemo(() => ({
    galleryEyebrow: '',
    galleryTitle: '',
  } satisfies ProductGalleryHeadingContent), [])
  const initialHeading = useMemo(
    () => parseProductGalleryHeading(contentJson, fallbackHeading, locale),
    [contentJson, fallbackHeading, locale],
  )
  const [heading, setHeading] = useState(initialHeading)

  useEffect(() => {
    setHeading(initialHeading)
  }, [initialHeading])

  useEffect(() => {
    if (!page?.pageKey) {
      return
    }

    let isMounted = true
    getPublicProductGalleryHeading(page.pageKey, fallbackHeading, locale).then((nextHeading) => {
      if (isMounted) {
        setHeading(nextHeading)
      }
    })

    return () => {
      isMounted = false
    }
  }, [fallbackHeading, locale, page?.pageKey])

  if (!heading.galleryEyebrow && !heading.galleryTitle) {
    return null
  }

  return (
    <div
      className={className}
      data-product-gallery-heading
      data-gallery-fallback-eyebrow={fallbackHeading.galleryEyebrow}
      data-gallery-fallback-title={fallbackHeading.galleryTitle}
      lang={locale}
    >
      {heading.galleryEyebrow && (
        <p className={`break-words ${eyebrowClassName}${heading.galleryTitle ? ` ${eyebrowTitleSpacingClassName}` : ''}`}>
          {heading.galleryEyebrow}
        </p>
      )}
      {heading.galleryTitle && <h2 className={`break-words ${titleClassName}`}>{heading.galleryTitle}</h2>}
    </div>
  )
}
