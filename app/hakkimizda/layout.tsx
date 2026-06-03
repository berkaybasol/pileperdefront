import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: '35 yıllık deneyim ile Ankara\'da perde, jaluzi ve dekorasyon hizmetleri. Beytepe, Bilkent, Yaşamkent, Çayyolu, Ümitköy bölgelerinde profesyonel hizmet.',
  keywords: 'pile perde hakkında, ankara perde firması, perde montaj ankara, çayyolu perde, bilkent perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/hakkimizda'
  },
  openGraph: {
    title: 'Hakkımızda - Pile Perde Ankara',
    description: '35 yıllık deneyim ile Ankara\'da perde, jaluzi ve dekorasyon hizmetleri.',
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
