import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Çocuk Perde Modelleri Ankara ',
  description: 'Çocuk odası perde modelleri ile renkli ve eğlenceli mekanlar. Güvenli kumaşlar, çizgi film karakterleri. Ankara\'da ücretsiz montaj.',
  keywords: 'çocuk perde, bebek odası perdesi, çizgi kahraman perde, antibakteriyel perde, güvenli çocuk perdesi, renkli desenli perde, çocuk odası perdesi, ankara çocuk perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/cocuk-perde'
  },
  openGraph: {
    title: 'Çocuk Perde Modelleri Ankara ',
    description: 'Çocuk perde modelleri: Antibakteriyel, güvenli tasarım, çizgi kahraman ve renkli desenler. Çocuklarınızın odalarına masalsı dokunuş.',
    images: ['/api/public/media/images/92d067f9-f14e-45da-89fb-901f775d61b3/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-model-perdeler-cocuk-perde', fallbackMetadata)

export default function IpperdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-model-perdeler-cocuk-perde">{children}</CmsPageBoundary>
}
