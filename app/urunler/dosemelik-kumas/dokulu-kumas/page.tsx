import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-dosemelik-kumas-dokulu-kumas'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/819c6a80-7dbe-4074-9934-dfdf8b903d8a/file',
    alt: 'Dokulu Kumaş',
    title: 'Dokulu Kumaş',
  },
]

export const metadata: Metadata = {
  title: 'Dokulu Kumaş Galerisi - Pile Perde',
  description: 'Dokulu döşemelik kumaş modelleri ve uygulama görselleri.',
}

export default function DokuluKumasPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Dokulu Kumaş"
      description="Günlük kullanıma uygun dayanıklı döşemelik kumaş uygulama görselleri."
      fallbackImages={fallbackImages}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Döşemelik Kumaş', href: '/urunler/dosemelik-kumas' },
        { label: 'Dokulu Kumaş' },
      ]}
      galleryTitle="Dokulu Kumaş Modelleri"
    />
  )
}
