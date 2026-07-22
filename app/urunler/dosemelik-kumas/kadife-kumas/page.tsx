import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-dosemelik-kumas-kadife-kumas'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/af895b9f-e223-4245-9330-35473741b667/file',
    alt: 'Kadife Kumaş',
    title: 'Kadife Kumaş',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/dosemelik-kumas/kadife-kumas'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Döşemelik Kumaş', url: '/urunler/dosemelik-kumas' },
  { name: 'Kadife Kumaş', url: '/urunler/dosemelik-kumas/kadife-kumas' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/dosemelik-kumas/kadife-kumas' },
  title: 'Kadife Kumaş Galerisi - Pile Perde',
  description: 'Kadife döşemelik kumaş modelleri ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-dosemelik-kumas-kadife-kumas', fallbackMetadata)

export default function KadifeKumasPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Kadife Kumaş"
      description="Yumuşak dokulu ve şık oturum alanları için kadife kumaş uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Döşemelik Kumaş', href: '/urunler/dosemelik-kumas' },
        { label: 'Kadife Kumaş' },
      ]}
      galleryTitle="Kadife Kumaş Modelleri"
    />
  )
}
