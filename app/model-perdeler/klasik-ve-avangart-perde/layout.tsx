import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Klasik Perde Modelleri - Modern Tasarımlar ',
  description: 'Klasik ve avangart perde modelleri ile zamansız şıklık. Fırfırlı, büzgülü tasarımlar. Özel dikim hizmeti. Ankara\'da profesyonel montaj.',
  keywords: 'klasik perde, avangart perde, model perde, ipek perde, kadife perde, desenli perde, salon perde modelleri, yatak odası perde, ankara perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/klasik-ve-avangart-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/df6a191d-3db6-4645-a083-f71422f49200/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-klasik-ve-avangart-perde', fallbackMetadata)

export default function KlasikAvangartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-model-perdeler-klasik-ve-avangart-perde">{children}</CmsPageBoundary>
}
