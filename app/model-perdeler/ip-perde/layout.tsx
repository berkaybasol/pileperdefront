import { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'İp Perde Modelleri Ankara ',
  description: 'İp perde modelleri ile hafif ve hareketli tasarım. Modern, minimal görünüm. Salon ve ofisler için uygun. Ankara\'da geniş renk seçenekleri.',
  keywords: 'ip perde, ip perde modelleri, simli ip perde, kurdelalı ip perde, balon ip perde, fon ip perde, ip perde fiyatları, ankara ip perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/ip-perde'
  },
  openGraph: {
    title: 'İp Perde Modelleri Ankara ',
    description: 'İp perde modelleri: Mat, simli, kurdelalı, halat, urgan, deri ve balon perde çeşitleri. 10 metre yükseklikte özel ölçülerde üretim.',
    images: ['/api/public/media/images/2e807ac8-7507-4d23-94d9-6ac4d56705af/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-ip-perde', fallbackMetadata)

export default function IpperdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
