import type { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Zip Perde - Motorlu Sistemler ',
  description: 'Zip perde sistemleri ile bahçe ve teraslarda konfor. Rüzgar, yağmur, güneş koruması. Motorlu sistem. Ankara\'da ücretsiz keşif.',
  keywords: 'zip perde, fermuarlı perde, dış mekan perdesi, motorlu zip perde, balkon zip perdesi, ankara zip perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/motorlu-perdeler/zip-perde'
  },
  openGraph: {
    title: 'Zip Perde - Motorlu Sistemler ',
    description: 'Fermuarlı zip perde sistemleri ile dış mekan alanlarınızda maksimum koruma. Rüzgar, yağmur ve güneşe karşı dayanıklı zip perde çözümleri.',
    images: ['/api/public/media/images/41fdb3a5-0351-4c47-8342-d522b1dcf7b2/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-motorlu-perdeler-zip-perde', fallbackMetadata)

export default function ZipPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}