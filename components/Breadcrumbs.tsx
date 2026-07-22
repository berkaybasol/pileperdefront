'use client'

import Link from 'next/link'
import { useCmsPage } from '@/components/CmsPageProvider'
import {
  normalizeBreadcrumbItems,
  type BreadcrumbItem,
} from '@/lib/breadcrumbs'

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  canonicalUrl: string
  className?: string
}

export function Breadcrumbs({ items, canonicalUrl, className = '' }: BreadcrumbsProps) {
  const cmsPage = useCmsPage()
  const normalizedItems = normalizeBreadcrumbItems(items, canonicalUrl)
  if (cmsPage?.localPreview) {
    const gallerySection = cmsPage.sections.find((section) => section.sectionKey === 'product.gallery' && section.enabled)
    if (gallerySection?.contentJson) {
      try {
        const breadcrumbLabel = (JSON.parse(gallerySection.contentJson) as { hero?: { breadcrumbLabel?: string } }).hero?.breadcrumbLabel
        if (breadcrumbLabel && normalizedItems.length > 0) {
          normalizedItems[normalizedItems.length - 1] = { ...normalizedItems[normalizedItems.length - 1], name: breadcrumbLabel }
        }
      } catch {
        // Keep the original breadcrumb when a local draft is malformed.
      }
    }
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400">
        {normalizedItems.map((item, index) => {
          const isLast = index === normalizedItems.length - 1
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-gray-600">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-gray-300">{item.name}</span>
              ) : (
                <Link href={item.url} className="inline-flex min-h-11 items-center transition-colors hover:text-white">{item.name}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
