import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-metal-zincir-perde-metal-zincir-seperator'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/1743147b-da62-4e3e-9745-ae7d6523bcb5/file',
    alt: 'Metal Zincir Seperatör',
    title: 'Metal Zincir Seperatör',
  },
]

const fallbackMetadata: Metadata = {
  title: 'Metal Zincir Seperatör Galerisi - Pile Perde',
  description: 'Metal zincir seperatör modelleri ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-metal-zincir-perde-metal-zincir-seperator', fallbackMetadata)

export default function MetalZincirSeperatorPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Metal Zincir Seperatör"
      description="Alan bölücü olarak kullanılabilen özel ölçü metal zincir seperatör görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Metal Zincir Perde', href: '/urunler/metal-zincir-perde' },
        { label: 'Metal Zincir Seperatör' },
      ]}
      galleryTitle="Metal Zincir Seperatör Modelleri"
    />
  )
}
