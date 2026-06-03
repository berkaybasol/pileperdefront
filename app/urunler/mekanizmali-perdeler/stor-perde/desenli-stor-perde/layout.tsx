import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desenli Stor Perde - Dekoratif Baskılı Stor Perde Modelleri ',
  description: 'Desenli stor perde çeşitleri Ankara\'da. Modern ve klasik desenler. Uygun fiyat, ücretsiz keşif ve profesyonel montaj hizmeti.',
  keywords: 'desenli stor perde, baskılı stor perde, dekoratif stor perde, renkli stor perde, dijital baskılı perde, desenli stor ankara, pile perde, mekanizmalı perde, motorlu desenli perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/desenli-stor-perde'
  },
  openGraph: {
    title: 'Desenli Stor Perde - Dekoratif Baskılı Stor Perde Modelleri ',
    description: 'Desenli stor perde modelleri: Dekoratif, baskılı ve renkli desenli stor perdeler. İç mekan dekorasyonuna uygun, zarif tasarımlı stor perde sistemleri.',
    images: ['/api/public/media/images/aa595e7c-4fa9-41d5-91ce-10cc578e64db/file'],
  }
}

export default function DesenliStorPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}