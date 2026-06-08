import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-dosemelik-kumas-desenli-kumas'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/098b3c8d-9069-467b-bc74-b59f93132820/file',
    alt: 'Desenli Kumaş',
    title: 'Desenli Kumaş',
  },
]

const fallbackMetadata: Metadata = {
  title: 'Desenli Kumaş Galerisi - Pile Perde',
  description: 'Desenli döşemelik kumaş modelleri ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-dosemelik-kumas-desenli-kumas', fallbackMetadata)

export default function DesenliKumasPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Desenli Kumaş"
      description="Projeye karakter veren desenli döşemelik kumaş uygulama görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Döşemelik Kumaş', href: '/urunler/dosemelik-kumas' },
        { label: 'Desenli Kumaş' },
      ]}
      galleryTitle="Desenli Kumaş Modelleri"
    />
  )
}
