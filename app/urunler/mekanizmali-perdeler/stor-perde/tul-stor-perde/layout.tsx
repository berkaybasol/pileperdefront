import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Tül Stor Perde - İnce Tül Kumaş ile Zarif Stor Perde Modelleri ',
  description: 'Tül stor perde modelleri ve fiyatları Ankara\'da. Işık geçirgen, şeffaf tasarım. Gündüz mahremiyeti sağlar. Ücretsiz montaj için arayın.',
  keywords: 'tül stor perde, tül perde, stor perde, tül stor modelleri, ince stor perde, dekoratif stor perde, şeffaf stor perde, modern tül perde, zarif stor perde, ışık geçiren perde, tül stor ankara, pile perde, mekanizmalı tül perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde'
  },
  openGraph: {
    title: 'Tül Stor Perde - İnce Tül Kumaş ile Zarif Stor Perde Modelleri ',
    description: 'Tül stor perde modelleri: İnce tül kumaşlardan üretilen zarif ve şık stor perdeler. Işık geçirgenliği yüksek, dekoratif, modern mekanlar için ideal.',
    images: ['/api/public/media/images/f7e4e8a9-159e-40ab-a96d-11c0ffbc9119/file'],
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-stor-perde-tul-stor-perde', fallbackMetadata)

export default function TulStorPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-urunler-mekanizmali-perdeler-stor-perde-tul-stor-perde">{children}</CmsPageBoundary>
}