import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-perde-aksesuarlari-bracol'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/636b83ba-f2a6-4902-9288-27675417e17a/file',
    alt: 'Braçol',
    title: 'Braçol',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/perde-aksesuarlari/bracol'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Perde Aksesuarları', url: '/urunler/perde-aksesuarlari' },
  { name: 'Braçol', url: '/urunler/perde-aksesuarlari/bracol' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/perde-aksesuarlari/bracol' },
  title: 'Braçol Galerisi - Pile Perde',
  description: 'Braçol perde aksesuarları ve uygulama görselleri.',
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-perde-aksesuarlari-bracol', fallbackMetadata)

export default function BracolPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Braçol"
      description="Klasik ve avangart dekorasyona uyumlu braçol aksesuarı uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Perde Aksesuarları', href: '/urunler/perde-aksesuarlari' },
        { label: 'Braçol' },
      ]}
      galleryTitle="Braçol Modelleri"
    />
  )
}
