import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Balon Perde Modelleri - Şık ve Gösterişli Tasarımlar ',
  description: 'Balon perde modelleri ile romantik ve şık mekanlar. Büzgülü tasarım, hacimli görünüm. Yatak odası için mükemmel. Ankara\'da ücretsiz montaj.',
  keywords: 'balon perde, balon perde modelleri, ipli balon perde, organze balon perde, balon perde fiyatları, balon perde ankara, mekanizmalı balon perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/balon-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/0d960ab5-7767-41f7-86e2-674315fa8cfd/file']
  }
}

export default function BalonPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
