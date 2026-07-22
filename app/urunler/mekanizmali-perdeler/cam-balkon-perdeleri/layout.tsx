import type { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Cam Balkon Perdeleri - Ankara ',
  description: 'Cam balkon perdesi ile kışın sıcak, yazın serin balkonlar. Rüzgar ve yağmur koruması. PVC ve kristal seçenekleri. Ankara\'da ücretsiz montaj.',
  keywords: 'cam balkon perdesi, ankara cam balkon perdesi, plise cam balkon perdesi, balkon perdesi, cam balkon plise perde, pile perde ankara',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/cam-balkon-perdeleri'
  },
  openGraph: {
    title: 'Cam Balkon Perdeleri - Ankara ',
    description: 'Cam balkon için özel tasarlanmış plise perde sistemleri. Ankara\'nın güvenilir perde firması Pile Perde ile kaliteli cam balkon perde çözümleri.',
    images: ['/api/public/media/images/dd5aaa7b-04cd-40d1-bc5a-ff06715ba2f9/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-cam-balkon-perdeleri', fallbackMetadata)

export default function CamBalkonPerdeleriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-urunler-mekanizmali-perdeler-cam-balkon-perdeleri">{children}</CmsPageBoundary>
}