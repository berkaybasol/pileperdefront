import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-tul-fon-perde-modern-fon-perde'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/ac111c41-9c23-4975-94bb-cab90e242037/file',
    alt: 'Modern Fon Perde',
    title: 'Modern Fon Perde',
  },
]

export const metadata: Metadata = {
  title: 'Modern Fon Perde Galerisi - Pile Perde',
  description: 'Modern fon perde modelleri ve uygulama görselleri.',
}

export default function ModernFonPerdePage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Modern Fon Perde"
      description="Modern yaşam alanları için fon perde uygulama görselleri."
      fallbackImages={fallbackImages}
    />
  )
}
