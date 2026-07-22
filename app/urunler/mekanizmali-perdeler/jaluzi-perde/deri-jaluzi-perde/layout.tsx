import type { Metadata } from 'next'
import CmsPageBoundary from '@/components/CmsPageBoundary'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Deri Jaluzi Perde | Lüks Deri Jaluzi Modelleri | Premium Kalite ',
  description: 'Premium deri jaluzi perde modelleri Ankara\'da. Lüks ve modern dekorasyon. Uzun ömürlü, kolay bakım. Ücretsiz montaj ve garanti.',
  keywords: 'deri jaluzi perde, lüks deri jaluzi, premium deri jaluzi, kahverengi deri jaluzi, deri jaluzi fiyatları, ankara deri jaluzi, şık deri perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/jaluzi-perde/deri-jaluzi-perde'
  },
  openGraph: {
    title: 'Deri Jaluzi Perde | Lüks Deri Jaluzi Modelleri | Premium Kalite ',
    description: 'Deri jaluzi perde modelleri ve fiyatları. Premium kalitede lüks deri jaluzi sistemleri.',
    images: ['/api/public/media/images/8d3779a1-8291-44fe-833d-b3572cacce66/file'],
  },
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-deri-jaluzi-perde', fallbackMetadata)

export default function DeriJaluziPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsPageBoundary pageKey="product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-deri-jaluzi-perde">{children}</CmsPageBoundary>
}