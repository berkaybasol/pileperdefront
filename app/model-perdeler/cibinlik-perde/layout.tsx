import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Cibinlik Perde Modelleri Ankara ',
  description: 'Cibinlik perde ile sivrisinek ve böceklerden korunun. Klasik ve lüks cibinlik taçları. Yatak odası için zarif çözüm. Ankara\'da profesyonel montaj.',
  keywords: 'cibinlik perde, cibinlik taçları, klasik cibinlik, altın cibinlik, yatak odası cibinlik, çocuk odası cibinlik, lüks cibinlik perde, dekoratif cibinlik, ankara cibinlik perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/cibinlik-perde'
  },
  openGraph: {
    title: 'Cibinlik Perde Modelleri Ankara ',
    description: 'Cibinlik perde modelleri: Klasik, altın, varak, gümüş ve siyah cibinlik taçları. Yatak odası ve çocuk odaları için lüks ve ihtişamlı tasarımlar.',
    images: ['/api/public/media/images/66a8d307-6542-437e-9781-8626f3f2067e/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-cibinlik-perde', fallbackMetadata)

export default function IpperdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-model-perdeler-cibinlik-perde">{children}</CmsPageBoundary>
}
