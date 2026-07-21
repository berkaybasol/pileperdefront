import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-tul-fon-perde-keten-fon-perde'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/f62b8a1a-c83c-4c34-ac15-b04df465d062/file',
    alt: 'Keten Fon Perde',
    title: 'Keten Fon Perde',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/tul-fon-perde/keten-fon-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Tül ve Fon Perde', url: '/urunler/tul-fon-perde' },
  { name: 'Keten Fon Perde', url: '/urunler/tul-fon-perde/keten-fon-perde' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/tul-fon-perde/keten-fon-perde' },
  title: 'Keten Fon Perde Galerisi - Pile Perde',
  description: 'Keten fon perde modelleri ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-tul-fon-perde-keten-fon-perde', fallbackMetadata)

export default function KetenFonPerdePage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Keten Fon Perde"
      description="Doğal dokulu keten fon perde uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
    />
  )
}
