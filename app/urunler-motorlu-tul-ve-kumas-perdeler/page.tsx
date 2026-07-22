import type { Metadata } from 'next'
import CmsManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const pageKey = 'product-gallery-urunler-motorlu-tul-ve-kumas-perdeler'
const slug = '/urunler-motorlu-tul-ve-kumas-perdeler'

const metadataBase: Metadata = {
  alternates: { canonical: `https://pileperde.com.tr${slug}` },
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, metadataBase)

export default function MotorluTulVeKumasPerdelerPage() {
  return (
    <CmsManagedProductGalleryPage
      pageKey={pageKey}
      title="Motorlu Tül ve Kumaş Perdeler"
      description=""
      fallbackImages={[]}
      breadcrumbCanonicalUrl={`https://pileperde.com.tr${slug}`}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: 'Motorlu Perdeler', href: '/urunler/motorlu-perdeler' },
        { label: 'Motorlu Tül ve Kumaş Perdeler' },
      ]}
    />
  )
}
