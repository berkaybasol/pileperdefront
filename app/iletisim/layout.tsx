import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Pile Perde ile iletişime geçin. Ankara Çayyolu, Beytepe, Bilkent, Yaşamkent, Ümitköy bölgelerinde ücretsiz keşif ve ölçüm hizmeti. ☎️ 0312 241 72 72',
  keywords: 'pile perde iletişim, ankara perde telefon, çayyolu perde, pile perde adres, perde montaj randevu',
  alternates: {
    canonical: 'https://pileperde.com.tr/iletisim'
  },
  openGraph: {
    title: 'İletişim - Pile Perde Ankara Çayyolu',
    description: 'Pile Perde ile iletişime geçin. Ücretsiz keşif ve ölçüm hizmeti.',
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
