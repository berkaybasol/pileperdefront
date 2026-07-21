import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-tul-fon-perde-desenli-fon-perde'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/ae02ace1-0d00-465b-8009-ce717e0b7c21/file',
    alt: 'Desenli Fon Perde',
    title: 'Desenli Fon Perde',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/tul-fon-perde/desenli-fon-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Tül ve Fon Perde', url: '/urunler/tul-fon-perde' },
  { name: 'Desenli Fon Perde', url: '/urunler/tul-fon-perde/desenli-fon-perde' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/tul-fon-perde/desenli-fon-perde' },
  title: 'Desenli Fon Perde Galerisi - Pile Perde',
  description: 'Desenli fon perde modelleri ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-tul-fon-perde-desenli-fon-perde', fallbackMetadata)

export default function DesenliFonPerdePage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Desenli Fon Perde"
      description="Mekana karakter katan desenli fon perde uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
    />
  )
}
