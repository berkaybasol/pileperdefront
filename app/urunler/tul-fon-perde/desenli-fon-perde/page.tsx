import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

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

const fallbackMetadata: Metadata = {
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
    />
  )
}
