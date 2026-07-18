import type { Metadata } from 'next'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ProductGalleryImage } from '@/lib/productGalleryContent'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-perde-aksesuarlari-rustik-takimlari'

const fallbackImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/35d4d007-ea8e-4f37-9363-ad2ebfa75173/file',
    alt: 'Rustik Takımları',
    title: 'Rustik Takımları',
  },
]

const canonicalUrl = 'https://pileperde.com.tr/urunler/perde-aksesuarlari/rustik-takimlari'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Perde Aksesuarları', url: '/urunler/perde-aksesuarlari' },
  { name: 'Rustik Takımları', url: '/urunler/perde-aksesuarlari/rustik-takimlari' },
]

const fallbackMetadata: Metadata = {
  alternates: { canonical: 'https://pileperde.com.tr/urunler/perde-aksesuarlari/rustik-takimlari' },
  title: 'Rustik Takımları Galerisi - Pile Perde',
  description: 'Rustik perde aksesuarları ve uygulama görselleri.',
}

export const generateMetadata = async () => ({
  ...await getCmsPageMetadata('product-gallery-urunler-perde-aksesuarlari-rustik-takimlari', fallbackMetadata),
  title: 'Rustik Perde Aksesuarları ve Rustik Takımları | Pile Perde Ankara',
})

export default function RustikTakimlariPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title="Rustik Takımları"
      description="Klasik ve modern dekorasyonlara uygun rustik perde aksesuarı uygulama görselleri."
      fallbackImages={fallbackImages}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Perde Aksesuarları', href: '/urunler/perde-aksesuarlari' },
        { label: 'Rustik Takımları' },
      ]}
      galleryTitle="Rustik Takımları Modelleri"
    />
  )
}
