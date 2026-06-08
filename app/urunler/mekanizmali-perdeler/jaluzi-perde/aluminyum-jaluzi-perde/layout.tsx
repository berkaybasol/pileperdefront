import type { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Alüminyum Jaluzi Perde | 16mm 25mm 50mm Modelleri ',
  description: 'Ankara\'da alüminyum jaluzi perde modelleri ve fiyatları. Dayanıklı, modern tasarım, kolay temizlenir. Ofis ve ev için ideal. Ücretsiz montaj hizmeti.',
  keywords: 'alüminyum jaluzi perde, jaluzi perde fiyatları, metal jaluzi, 25mm jaluzi, 50mm jaluzi, ankara jaluzi perde, ekonomik jaluzi',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde'
  },
  openGraph: {
    title: 'Alüminyum Jaluzi Perde | 16mm 25mm 50mm Modelleri ',
    description: 'Alüminyum jaluzi perde modelleri ve fiyatları. 16mm, 25mm, 50mm boyutlarında ekonomik ve dayanıklı jaluzi sistemleri.',
    images: ['/api/public/media/images/5b85af2f-2127-4028-9eab-cc9c75005ba4/file'],
  },
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-aluminyum-jaluzi-perde', fallbackMetadata)

export default function AluminyumJaluziPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}