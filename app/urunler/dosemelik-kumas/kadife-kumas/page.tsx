import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-dosemelik-kumas-kadife-kumas'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/af895b9f-e223-4245-9330-35473741b667/file',
    alt: 'Kadife Kumaş',
    title: 'Kadife Kumaş',
  },
]

export const metadata: Metadata = {
  title: 'Kadife Kumaş Galerisi - Pile Perde',
  description: 'Kadife döşemelik kumaş modelleri ve uygulama görselleri.',
}

export default function KadifeKumasPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Kadife Kumaş"
      description="Yumuşak dokulu ve şık oturum alanları için kadife kumaş uygulama görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Döşemelik Kumaş', href: '/urunler/dosemelik-kumas' },
        { label: 'Kadife Kumaş' },
      ]}
      galleryTitle="Kadife Kumaş Modelleri"
    />
  )
}
