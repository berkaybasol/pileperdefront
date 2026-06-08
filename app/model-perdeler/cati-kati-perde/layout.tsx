import { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Çatı Katı Perde Modelleri Ankara ',
  description: 'Çatı katı perde çözümleri ile eğik pencereler için özel tasarım. Velux, çatı pencereleri için ideal. Ankara\'da profesyonel ölçüm ve montaj.',
  keywords: 'çatı katı perde, üçgen pencere perde, eğimli pencere perde, mansard perde, plise perde, çatı perde ankara, blackout çatı perde, motorlu çatı perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/cati-kati-perde'
  },
  openGraph: {
    title: 'Çatı Katı Perde Modelleri Ankara ',
    description: 'Çatı katı perde modelleri: Üçgen ve eğimli pencereler için özel çözümler. Plise perde, motorlu sistemler, blackout kumaş seçenekleri.',
    images: ['/api/public/media/images/a45da14d-05a8-4732-9bdb-ccd38d587dda/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-cati-kati-perde', fallbackMetadata)

export default function CatikatiperdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
