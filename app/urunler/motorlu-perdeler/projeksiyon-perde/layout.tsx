import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projeksiyon Perde - Motorlu Sistemler ',
  description: 'Projeksiyon perde ile cafe ve restoranlarda gölge ve konfor. Motorlu ve manuel seçenekler. Ankara\'da ücretsiz keşif ve montaj.',
  keywords: 'projeksiyon perde, dış mekan perde, motorlu projeksiyon perde, balkon perdesi, teras perdesi, ankara projeksiyon perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/motorlu-perdeler/projeksiyon-perde'
  },
  openGraph: {
    title: 'Projeksiyon Perde - Motorlu Sistemler ',
    description: 'Dış mekan projeksiyon perde sistemleri. Akıllı kontrol ve dayanıklı kumaş teknolojisi ile güneş, rüzgar ve yağmura karşı koruma.',
    images: ['/api/public/media/images/f2650670-4cce-458e-9d01-9690f82673ce/file']
  }
}

export default function ProksiyonPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}