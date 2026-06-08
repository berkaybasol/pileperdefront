import { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Kruvaze Perde Modelleri - Zarif ve Estetik Tasarımlar ',
  description: 'Kruvaze perde modelleri ile gösterişli ve zarif dekorasyon. Katmanlı tasarım, zengin görünüm. Ankara\'da profesyonel ölçüm ve montaj.',
  keywords: 'kruvaze perde, kruvaze perde modelleri, mekanizmalı kruvaze perde, mekanizmasız kruvaze perde, yalancı kruvaze perde, kruvaze perde fiyatları, kruvaze perde ankara, tül perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/kruvaze-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/fa4be5de-409b-407c-adc6-44df3d5c712b/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-kruvaze-perde', fallbackMetadata)

export default function KruvazePerdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
