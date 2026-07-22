import { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Cafe & Restoran Perdeleri - Hijyenik Perde Çözümleri Ankara ',
  description: 'Cafe ve restoran perdeleri ile müşterilerinize konforlu mekan. Hijyenik, kolay temizlenir kumaşlar. Alev almaz sertifikalı. Ankara\'da profesyonel montaj.',
  keywords: 'cafe perdesi, restoran perdesi, hijyenik perde, kir tutmaz perde, leke tutmaz perde, alev almaz perde, yıkanabilir perde, dekoratif perde, ankara cafe perdesi',
  alternates: {
    canonical: 'https://pileperde.com.tr/kurumsal-urunler/cafe-restoran-perdeleri'
  },
  openGraph: {
    title: 'Cafe & Restoran Perdeleri - Hijyenik Perde Çözümleri Ankara ',
    description: 'Cafe ve restoran perdeleri: Hijyenik, kir tutmaz, leke tutmaz kumaşlar. Kolay temizlenebilir, alev almaz sertifikalı perdeler.',
    images: ['/api/public/media/images/bcf0aa06-5687-4d2b-816a-a609e5517cab/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-kurumsal-urunler-cafe-restoran-perdeleri', fallbackMetadata)

export default function CaferestoranperdeleriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-kurumsal-urunler-cafe-restoran-perdeleri">{children}</CmsPageBoundary>
}
