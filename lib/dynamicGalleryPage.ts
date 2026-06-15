import type { Metadata } from 'next'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

export const fallbackDynamicGalleryImage: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file',
    alt: 'Pile Perde',
    title: 'Pile Perde',
    enabled: true,
  },
]

export const buildDynamicGalleryTitle = (slug: string[]) =>
  (slug.at(-1) || 'galeri')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase('tr-TR') + part.slice(1))
    .join(' ')

export const buildDynamicGalleryPageKey = (root: string, slug: string[]) =>
  `product-gallery-${[root, ...slug].join('-')}`

export const buildDynamicGalleryMetadata = (title: string): Metadata => ({
  title: `${title} Galerisi - Pile Perde`,
  description: `${title} uygulama gorselleri.`,
})
