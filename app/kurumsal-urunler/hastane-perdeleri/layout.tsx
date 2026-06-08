import { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Hastane Perdeleri - Antibakteriyel Hijyenik Perde Sistemleri Ankara ',
  description: 'Hastane perdesi ile sağlık tesislerinizde hijyen ve mahremiyet. Antibakteriyel, sterilize edilebilir kumaşlar. Alev almaz sertifikalı. Ankara\'da profesyonel montaj.',
  keywords: 'hastane perdesi, antibakteriyel perde, hijyenik perde, bölme perde rayı, sterilize perde, alev almaz perde, tıbbi perde, sağlık tesisi perdesi, ankara hastane perdesi',
  alternates: {
    canonical: 'https://pileperde.com.tr/kurumsal-urunler/hastane-perdeleri'
  },
  openGraph: {
    title: 'Hastane Perdeleri - Antibakteriyel Hijyenik Perde Sistemleri Ankara ',
    description: 'Hastane perdeleri: Antibakteriyel, hijyenik, sterilize edilebilir kumaşlar. Alev almaz sertifikalı, bölme perde rayları.',
    images: ['/api/public/media/images/7bbbe77b-6a2c-45a2-9f6f-04e4441a0b33/file']
  }
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-kurumsal-urunler-hastane-perdeleri', fallbackMetadata)

export default function HastaneperdeleriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
