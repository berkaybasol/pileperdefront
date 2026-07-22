import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-dosemelik-kumas-dokulu-kumas'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/819c6a80-7dbe-4074-9934-dfdf8b903d8a/file',
    alt: 'Dokulu Kumaş',
    title: 'Dokulu Kumaş',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/dosemelik-kumas/dokulu-kumas'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Döşemelik Kumaş', url: '/urunler/dosemelik-kumas' },
  { name: 'Dokulu Kumaş', url: '/urunler/dosemelik-kumas/dokulu-kumas' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/dosemelik-kumas/dokulu-kumas' },
  title: 'Dokulu Kumaş Galerisi - Pile Perde',
  description: 'Dokulu döşemelik kumaş modelleri ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-dosemelik-kumas-dokulu-kumas', fallbackMetadata)

export default function DokuluKumasPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Dokulu Kumaş"
      description="Günlük kullanıma uygun dayanıklı döşemelik kumaş uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Döşemelik Kumaş', href: '/urunler/dosemelik-kumas' },
        { label: 'Dokulu Kumaş' },
      ]}
      galleryTitle="Dokulu Kumaş Modelleri"
    />
  )
}
