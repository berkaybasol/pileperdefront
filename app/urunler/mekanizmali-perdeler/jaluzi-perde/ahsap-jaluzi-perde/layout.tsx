import type { Metadata } from 'next'

import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Ahşap Jaluzi Perde | 60 Renk Seçeneği | Doğal Ahşap Jaluzi ',
  description: 'Doğal ahşap jaluzi perde çeşitleri Ankara\'da. Şık, zarif görünüm. Yatak odası ve salon için mükemmel. Ücretsiz ölçüm ve profesyonel montaj.',
  keywords: 'ahşap jaluzi perde, doğal ahşap jaluzi, beyaz ahşap jaluzi, ceviz jaluzi, ahşap jaluzi fiyatları, ankara ahşap jaluzi, amerikan ahşap jaluzi',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde'
  },
  openGraph: {
    title: 'Ahşap Jaluzi Perde | 60 Renk Seçeneği | Doğal Ahşap Jaluzi ',
    description: 'Ahşap jaluzi perde modelleri ve fiyatları. 60 farklı renk ve doku seçeneği ile doğal ahşap jaluzi sistemleri.',
    images: ['/api/public/media/images/e1446473-f10c-449c-8e90-98f44fa11966/file'],
  },
}

export const generateMetadata = () => getCmsPageMetadata('product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-ahsap-jaluzi-perde', fallbackMetadata)

export default function AhsapJaluziPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}