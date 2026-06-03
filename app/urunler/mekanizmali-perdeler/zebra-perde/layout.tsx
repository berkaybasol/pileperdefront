import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zebra Perde - Modern Zebra Stor Perde Modelleri ',
  description: 'Zebra perde modelleri ile ışık kontrolünde özgürlük. Şeffaf ve mat şeritler. Ankara\'da uygun fiyat, ücretsiz montaj hizmeti.',
  keywords: 'zebra perde, zebra stor perde, bambu zebra perde, pileli zebra perde, screen zebra perde, desenli zebra perde, zebra perde ankara, ekonomik perde, pile perde, motorlu zebra perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/zebra-perde'
  },
  openGraph: {
    title: 'Zebra Perde - Modern Zebra Stor Perde Modelleri ',
    description: 'Zebra perde modelleri: Modern, bambu, pileli, desenli, screen zebra perde çeşitleri. Işık kontrolü sağlayan, ekonomik, şık zebra stor perdeler.',
    images: ['/api/public/media/images/c4d60335-5722-40f0-92c7-24f193d8b287/file'],
  }
}

export default function ZebraPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}