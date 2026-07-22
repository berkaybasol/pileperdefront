import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Kış Bahçesi Perde Modelleri Ankara ',
  description: 'Kış bahçesi perde sistemleri ile mevsim fark etmez konfor. Sıcak ve soğuk hava koruması. Geniş cam yüzeyler için. Ankara\'da ücretsiz keşif.',
  keywords: 'kış bahçesi perde, winter garden perde, motorlu perde, plise perde, sun screen perde, blackout perde, somfy motor, cam tavan perde, ankara kış bahçesi perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/kis-bahcesi-perde'
  },
  openGraph: {
    title: 'Kış Bahçesi Perde Modelleri Ankara ',
    description: 'Kış bahçesi perde modelleri: Motorlu, zincirli, manuel sistemler. Plise perde, sun screen, blackout kumaş seçenekleri.',
    images: ['/api/public/media/images/3f3e07b0-8d36-4b49-8b21-1f0f4d439d90/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-kis-bahcesi-perde', fallbackMetadata)

export default function KisbahcesiperdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-model-perdeler-kis-bahcesi-perde">{children}</CmsPageBoundary>
}
