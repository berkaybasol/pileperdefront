import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

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

const canonicalUrl = 'https://pileperde.com.tr/urunler/dosemelik-kumas/desenli-kumas'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Döşemelik Kumaş', url: '/urunler/dosemelik-kumas' },
  { name: 'Desenli Kumaş', url: '/urunler/dosemelik-kumas/desenli-kumas' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/dosemelik-kumas/desenli-kumas' },
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
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Döşemelik Kumaş', href: '/urunler/dosemelik-kumas' },
        { label: 'Desenli Kumaş' },
      ]}
      galleryTitle="Desenli Kumaş Modelleri"
    />
  )
}
