import { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Karartma Stor Perde (Blackout) - %100 Işık Geçirmez Stor Perde ',
  description: 'Blackout karartma stor perde ile tam karanlık sağlayın. Yatak odası, bebek odası için ideal. %100 ışık engelleme. Ankara\'da profesyonel montaj.',
  keywords: 'karartma stor perde, blackout stor perde, ışık geçirmez perde, karartma perde, blackout perde, güneş geçirmez perde, ısı yalıtımlı perde, karartma stor ankara, blackout stor ankara, pile perde, mekanizmalı perde, motorlu karartma perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/karartma-stor-perde'
  },
  openGraph: {
    title: 'Karartma Stor Perde (Blackout) - %100 Işık Geçirmez Stor Perde ',
    description: 'Karartma (Blackout) stor perde modelleri: %100 ışık geçirmez, güneş ışınlarını tamamen engelleyen, ısı yalıtımlı karartma stor perdeler.',
    images: ['/api/public/media/images/3527def1-7573-4032-99f9-edb5082959eb/file'],
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-stor-perde-karartma-stor-perde', fallbackMetadata)

export default function KarartmaStorPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}