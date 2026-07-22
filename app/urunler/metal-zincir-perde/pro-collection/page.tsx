import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-metal-zincir-perde-pro-collection'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/5d0f3be6-6501-40b5-b44a-378c944d4c5f/file',
    alt: 'Pro Collection',
    title: 'Pro Collection',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/metal-zincir-perde/pro-collection'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Metal Zincir Perde', url: '/urunler/metal-zincir-perde' },
  { name: 'Pro Collection', url: '/urunler/metal-zincir-perde/pro-collection' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/metal-zincir-perde/pro-collection' },
  title: 'Pro Collection Galerisi - Pile Perde',
  description: 'Metal zincir perde Pro Collection uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-metal-zincir-perde-pro-collection', fallbackMetadata)

export default function ProCollectionPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Pro Collection"
      description="Ticari ve mimari projeler için dekoratif metal zincir uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Metal Zincir Perde', href: '/urunler/metal-zincir-perde' },
        { label: 'Pro Collection' },
      ]}
      galleryTitle="Pro Collection Modelleri"
    />
  )
}
