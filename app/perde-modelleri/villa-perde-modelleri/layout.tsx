import type { Metadata } from 'next'

const title = 'Villa Perde Modelleri Ankara | Özel Tasarım | Pile Perde'
const description = 'Ankara’da villalar için ölçüye özel tül, fon, motorlu ve yüksek tavan perde çözümleri. Tasarım, üretim ve profesyonel uygulama Pile Perde’de.'
const canonical = 'https://pileperde.com.tr/perde-modelleri/villa-perde-modelleri'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'villa perde modelleri',
    'villa perde tasarımı',
    'Ankara villa perdesi',
    'özel tasarım perde',
    'ölçüye özel perde',
    'yüksek tavan perde',
    'motorlu villa perdesi',
  ],
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'website',
  },
}

export default function VillaPerdeModelleriLayout({ children }: { children: React.ReactNode }) {
  return children
}
