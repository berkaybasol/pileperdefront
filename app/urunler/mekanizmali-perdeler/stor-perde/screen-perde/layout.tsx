import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Screen Perde - Sun Screen ve PES Screen Stor Perde Modelleri ',
  description: 'Screen stor perde ile güneş kontrolü ve enerji tasarrufu. Işığı kontrol eder, sıcağı azaltır. Ankara\'da ücretsiz ölçüm ve montaj.',
  keywords: 'screen perde, sun screen perde, pes screen perde, stor perde, screen perde modelleri, motorlu screen perde, screen stor perde, büro perdeleri, ofis perdeleri, güneş filtresi perde, uv korumalı perde, ısı yalıtımlı perde, cam elyaf perde, polyester stor perde, screen perde ankara',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/screen-perde'
  },
  openGraph: {
    title: 'Screen Perde - Sun Screen ve PES Screen Stor Perde Modelleri ',
    description: 'Screen perde modelleri: Sun Screen ve PES Screen stor perdeler. Güneş ışığını filtreleyen, UV korumalı, ısı yalıtımlı, 36 ay garantili screen perde sistemleri.',
    images: ['/api/public/media/images/e2a6e278-c000-4a7b-be76-b5e7e9cae1e3/file'],
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-stor-perde-screen-perde', fallbackMetadata)

export default function ScreenPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-urunler-mekanizmali-perdeler-stor-perde-screen-perde">{children}</CmsPageBoundary>
}