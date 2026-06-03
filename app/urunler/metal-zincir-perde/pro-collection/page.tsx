import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-metal-zincir-perde-pro-collection'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/5d0f3be6-6501-40b5-b44a-378c944d4c5f/file',
    alt: 'Pro Collection',
    title: 'Pro Collection',
  },
]

export const metadata: Metadata = {
  title: 'Pro Collection Galerisi - Pile Perde',
  description: 'Metal zincir perde Pro Collection uygulama görselleri.',
}

export default function ProCollectionPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Pro Collection"
      description="Ticari ve mimari projeler için dekoratif metal zincir uygulama görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Metal Zincir Perde', href: '/urunler/metal-zincir-perde' },
        { label: 'Pro Collection' },
      ]}
      galleryTitle="Pro Collection Modelleri"
    />
  )
}
