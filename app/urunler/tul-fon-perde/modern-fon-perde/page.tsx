import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-tul-fon-perde-modern-fon-perde'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/ac111c41-9c23-4975-94bb-cab90e242037/file',
    alt: 'Modern Fon Perde',
    title: 'Modern Fon Perde',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/tul-fon-perde/modern-fon-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Tül ve Fon Perde', url: '/urunler/tul-fon-perde' },
  { name: 'Modern Fon Perde', url: '/urunler/tul-fon-perde/modern-fon-perde' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/tul-fon-perde/modern-fon-perde' },
  title: 'Modern Fon Perde Galerisi - Pile Perde',
  description: 'Modern fon perde modelleri ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-tul-fon-perde-modern-fon-perde', fallbackMetadata)

export default function ModernFonPerdePage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Modern Fon Perde"
      description="Modern yaşam alanları için fon perde uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
    />
  )
}
