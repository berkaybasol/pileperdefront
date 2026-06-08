import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

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

const fallbackMetadata: Metadata = {
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
    />
  )
}
