import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plise Perde Modelleri - Ankara ',
  description: 'Plise perde çeşitleri ile modern ve şık mekanlar. Tavan pencereleri için ideal. Renk seçenekleri. Ankara\'da ücretsiz ölçüm ve montaj.',
  keywords: 'plise perde, ankara plise perde, çatı perdesi, tavan perdesi, eğik pencere perdesi, kış bahçesi perdesi, balkon plise perde, pile perde ankara',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/plise-perde'
  },
  openGraph: {
    title: 'Plise Perde Modelleri - Ankara ',
    description: 'Çatı, tavan ve eğik pencereler için özel olarak tasarlanmış plise perde çeşitleri. Ankara\'nın güvenilir perde firması Pile Perde ile kaliteli plise perde sistemleri.',
    images: ['/api/public/media/images/bf718b82-6626-4ffd-b4c5-109b496c9c34/file']
  }
}

export default function PlisePerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}