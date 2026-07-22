import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Yüksek Tavanlı Galeri Perde Modelleri - Özel Tasarımlar ',
  description: 'Yüksek tavanlı galeri perde çözümleri ile ihtişamlı mekanlar. Özel dikim, profesyonel montaj. Dubleks ve villalar için ideal. Ankara\'da ücretsiz keşif.',
  keywords: 'yüksek tavanlı perde, galeri perde, yüksek tavan perde, galeri perde modelleri',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/yuksek-tavanli-galeri-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/334ad8c7-98e2-411c-98e9-d3c74c5a8973/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-yuksek-tavanli-galeri-perde', fallbackMetadata)

export default function YuksektavanligaleriperdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-model-perdeler-yuksek-tavanli-galeri-perde">{children}</CmsPageBoundary>
}
