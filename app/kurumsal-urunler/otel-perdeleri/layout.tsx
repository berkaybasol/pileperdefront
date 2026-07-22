import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Otel Perdeleri - Blackout, Ses Yalıtımı, Lüks Perde Ankara ',
  description: 'Otel perdesi ile misafir memnuniyetini artırın. Blackout karartma, ses yalıtımı, lüks tasarım. Dayanıklı kumaşlar. Ankara\'da toplu iş garantisi.',
  keywords: 'otel perdesi, suit oda perdesi, blackout perde, ses yalıtımlı perde, otel perde fiyatları, lüks otel perdesi, butik otel perdesi, resort otel perdesi, ankara otel perdesi',
  alternates: {
    canonical: 'https://pileperde.com.tr/kurumsal-urunler/otel-perdeleri'
  },
  openGraph: {
    title: 'Otel Perdeleri - Blackout, Ses Yalıtımı, Lüks Perde Ankara ',
    description: 'Otel perdeleri: Blackout karartma, ses yalıtımı, motorlu sistemler. Suit oda, otel odası perdeleri. Alev almaz, dayanıklı kumaşlar.',
    images: ['/api/public/media/images/edbff0f3-80da-43fe-b32f-96023906862d/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-kurumsal-urunler-otel-perdeleri', fallbackMetadata)

export default function OtelperdeleriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-kurumsal-urunler-otel-perdeleri">{children}</CmsPageBoundary>
}
