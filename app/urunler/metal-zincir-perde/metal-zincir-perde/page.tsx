import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-metal-zincir-perde-metal-zincir-perde'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/ac0a3aee-b553-4521-ae13-386cb302e723/file',
    alt: 'Metal Zincir Perde',
    title: 'Metal Zincir Perde',
  },
]

export const metadata: Metadata = {
  title: 'Metal Zincir Perde Galerisi - Pile Perde',
  description: 'Metal zincir perde modelleri ve uygulama görselleri.',
}

export default function MetalZincirPerdeGalleryPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Metal Zincir Perde"
      description="Dekoratif iç mekan uygulamaları için metal zincir perde görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Metal Zincir Perde', href: '/urunler/metal-zincir-perde' },
        { label: 'Metal Zincir Perde' },
      ]}
      galleryTitle="Metal Zincir Perde Modelleri"
    />
  )
}
