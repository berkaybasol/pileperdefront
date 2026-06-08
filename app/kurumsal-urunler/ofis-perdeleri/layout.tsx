import { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Ofis Perdeleri - Dikey Perde, Jaluzi, Stor Perde Ankara ',
  description: 'Ofis perdesi ile işyerlerinizde verimlilik ve estetik. Işık kontrolü, ses yalıtımı. Dikey, stor, jaluzi seçenekleri. Ankara\'da kurumsal fiyat avantajı.',
  keywords: 'ofis perdesi, dikey perde, jaluzi perde, stor perde, blackout perde, motorlu perde, makam odası perdesi, toplantı odası perdesi, büro perdesi, ankara ofis perdesi',
  alternates: {
    canonical: 'https://pileperde.com.tr/kurumsal-urunler/ofis-perdeleri'
  },
  openGraph: {
    title: 'Ofis Perdeleri - Dikey Perde, Jaluzi, Stor Perde Ankara ',
    description: 'Ofis perdeleri: Dikey perde, jaluzi perde, stor perde, blackout sistemler. Motorlu perde, ses yalıtımı. Makam odası çözümleri.',
    images: ['/api/public/media/images/e6a92fda-f300-41ce-a547-47cf59cc6359/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-kurumsal-urunler-ofis-perdeleri', fallbackMetadata)

export default function OfisperdeleriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
