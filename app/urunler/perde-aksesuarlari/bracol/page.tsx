import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-perde-aksesuarlari-bracol'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/636b83ba-f2a6-4902-9288-27675417e17a/file',
    alt: 'Braçol',
    title: 'Braçol',
  },
]

export const metadata: Metadata = {
  title: 'Braçol Galerisi - Pile Perde',
  description: 'Braçol perde aksesuarları ve uygulama görselleri.',
}

export default function BracolPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Braçol"
      description="Klasik ve avangart dekorasyona uyumlu braçol aksesuarı uygulama görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Perde Aksesuarları', href: '/urunler/perde-aksesuarlari' },
        { label: 'Braçol' },
      ]}
      galleryTitle="Braçol Modelleri"
    />
  )
}
