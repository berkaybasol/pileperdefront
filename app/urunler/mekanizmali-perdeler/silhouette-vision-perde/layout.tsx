import type { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Silhouette & Vision Perde - Ankara ',
  description: 'Silhouette vision perde ile zarif tasarım ve mükemmel ışık kontrolü. Yumuşak kumaş dokusu. Ankara\'da profesyonel montaj ve garanti.',
  keywords: 'silhouette perde, vision perde, silüet perde, technical perde, vip perde, makam odası perdesi, ankara silhouette perde, pile perde ankara',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/silhouette-vision-perde'
  },
  openGraph: {
    title: 'Silhouette & Vision Perde - Ankara ',
    description: 'Silhouette ve Vision perde sistemleri ile modern ve şık mekanlar. Ankara\'nın güvenilir perde firması Pile Perde ile kaliteli technical perde çözümleri.',
    images: ['/api/public/media/images/513ca252-0365-4494-90a3-73d3aa720bd0/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-silhouette-vision-perde', fallbackMetadata)

export default function SilhouetteVisionPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}