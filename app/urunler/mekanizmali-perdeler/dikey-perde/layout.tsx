import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dikey Perde - PVC ve Kumaş Dikey Perde Sistemleri ',
  description: 'Dikey perde sistemleri Ankara\'da. Geniş cam cepheler ve ofisler için pratik çözüm. Kumaş ve PVC seçenekleri. Ücretsiz keşif ve montaj.',
  keywords: 'dikey perde, pvc dikey perde, kumaş dikey perde, ofis perdesi, büro perdesi, dikey perde ankara, motorlu dikey perde, screen dikey perde, blackout dikey perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/dikey-perde'
  },
  openGraph: {
    title: 'Dikey Perde - PVC ve Kumaş Dikey Perde Sistemleri ',
    description: 'Dikey perde modelleri: PVC slayt, kumaş, screen ve blackout dikey perdeler. Ofis, büro ve ev kullanımı için motorlu ve zincirli dikey perde sistemleri.',
    images: ['/api/public/media/images/0ba47af9-08c5-4fb0-8073-9734db255f80/file'],
  }
}

export default function DikeyPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}