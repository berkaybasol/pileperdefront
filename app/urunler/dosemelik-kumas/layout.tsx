import type { Metadata } from 'next'
import { turkishLocaleAlternates } from '@/lib/siteLocales'

export const metadata: Metadata = {
  title: 'Döşemelik Kumaş - Ankara ',
  description: 'Döşemelik kumaş çeşitleri ile koltuklarınızı yenileyin. Koltuk, sandalye, berjer kaplama. Dayanıklı kumaşlar. Ankara\'da ücretsiz keşif.',
  keywords: 'döşemelik kumaş, ithal kumaş, keten kumaş, kadife kumaş, sönil kumaş, nubuk kumaş, ankara döşemelik kumaş, pile perde ankara',
  alternates: turkishLocaleAlternates('/urunler/dosemelik-kumas', '/en/products/upholstery-fabrics'),
  openGraph: {
    title: 'Döşemelik Kumaş - Ankara ',
    description: 'İthal döşemelik kumaşlar: %100 keten, ipek sönil, kadife, dokuma desenli, süet, nubuk kumaşlar ve suni deri. Ankara\'nın güvenilir kumaş firması Pile Perde.',
    images: ['/api/public/media/images/819c6a80-7dbe-4074-9934-dfdf8b903d8a/file']
  }
}

export default function DosemelikKumasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
