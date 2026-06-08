import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-perde-aksesuarlari-kol-bagi'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/970dff38-f4e6-4c7c-8dd1-03455630c5f6/file',
    alt: 'Kol Bağı',
    title: 'Kol Bağı',
  },
]

const fallbackMetadata: Metadata = {
  title: 'Kol Bağı Galerisi - Pile Perde',
  description: 'Perde kol bağı aksesuarları ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-perde-aksesuarlari-kol-bagi', fallbackMetadata)

export default function KolBagiPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Kol Bağı"
      description="Fon perde kullanımını şık biçimde tamamlayan kol bağı aksesuarı uygulama görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Perde Aksesuarları', href: '/urunler/perde-aksesuarlari' },
        { label: 'Kol Bağı' },
      ]}
      galleryTitle="Kol Bağı Modelleri"
    />
  )
}
