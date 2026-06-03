import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ürünler - Perde Jaluzi Stor',
  description: 'Ankara\'da perde, jaluzi, stor perde, tül perde, fon perde, motorlu perde ve tüm mekanizmalı perde sistemleri. Geniş ürün yelpazesi, profesyonel montaj.',
  keywords: 'perde çeşitleri, jaluzi modelleri, stor perde, tül perde, fon perde, motorlu perde, ankara perde ürünleri',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler'
  },
  openGraph: {
    title: 'Ürünler - Perde Jaluzi Stor Ankara',
    description: 'Ankara\'da perde, jaluzi, stor perde ve tüm mekanizmalı perde sistemleri.',
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function UrunlerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
