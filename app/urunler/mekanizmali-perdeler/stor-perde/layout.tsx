import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stor Perde Modelleri - Tül, Screen, Karartma Stor Ankara',
  description: 'Stor perde çeşitleri: Tül stor, screen perde, blackout karartma, desenli stor perdeler. Pratik kullanım, şık tasarım. Ankara\'da uygun fiyat, ücretsiz ölçüm ve montaj.',
  keywords: 'stor perde, tül stor, screen perde, karartma stor, blackout perde, desenli stor, stor perde fiyatları, ankara stor perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function StorPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
