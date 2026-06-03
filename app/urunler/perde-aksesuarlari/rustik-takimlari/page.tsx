import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-perde-aksesuarlari-rustik-takimlari'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/35d4d007-ea8e-4f37-9363-ad2ebfa75173/file',
    alt: 'Rustik Takımları',
    title: 'Rustik Takımları',
  },
]

export const metadata: Metadata = {
  title: 'Rustik Takımları Galerisi - Pile Perde',
  description: 'Rustik perde aksesuarları ve uygulama görselleri.',
}

export default function RustikTakimlariPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Rustik Takımları"
      description="Klasik ve modern dekorasyonlara uygun rustik perde aksesuarı uygulama görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Perde Aksesuarları', href: '/urunler/perde-aksesuarlari' },
        { label: 'Rustik Takımları' },
      ]}
      galleryTitle="Rustik Takımları Modelleri"
    />
  )
}
