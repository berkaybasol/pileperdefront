import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Rustikli Perde Modelleri - Doğal ve Sıcak Tasarımlar ',
  description: 'Rustik perde modelleri ile doğal ve sıcak mekanlar. Keten, kaba doku kumaşlar. Country tarzı evler için ideal. Ankara\'da ücretsiz montaj.',
  keywords: 'rustikli perde, rustik perde, ahşap rustik, pirinç rustik, model perde, salon perdesi, yatak odası perde, desenli perde, ankara perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/rustikli-perde'
  },
  openGraph: {
    title: 'Rustikli Perde Modelleri - Doğal ve Sıcak Tasarımlar ',
    description: 'Rustikli perde modelleri ile mekanlarınıza doğal ve sıcak bir atmosfer katın. Ahşap ve pirinç rustik çeşitleri, desenli kumaşlar.',
    images: ['/api/public/media/images/4b0f28ee-b79d-44e0-880d-5aec64bb13e3/file']
  }
}

export const generateMetadata = () =>
  getCmsPageMetadata('product-gallery-model-perdeler-rustikli-perde', fallbackMetadata)

export default function RustikliPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-model-perdeler-rustikli-perde">{children}</CmsPageBoundary>
}
