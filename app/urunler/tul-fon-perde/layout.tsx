import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tül ve Fon Perde - Ankara ',
  description: 'Tül ve fon perde modelleri Ankara\'da. Binlerce kumaş seçeneği, özel dikim. Evinize şıklık katar. Ücretsiz ölçüm ve profesyonel montaj.',
  keywords: 'tül perde, fon perde, ankara tül perde, ankara fon perde, nakışlı tül, desenli fon perde, klasik perde, modern perde, pile perde ankara',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/tul-fon-perde'
  },
  openGraph: {
    title: 'Tül ve Fon Perde - Ankara ',
    description: 'İşlevsel ve dekoratif tül perde modelleri, modern ve klasik fon perde çeşitleri. Ankara\'nın güvenilir perde firması Pile Perde ile kaliteli perde çözümleri.',
    images: ['/api/public/media/images/ac111c41-9c23-4975-94bb-cab90e242037/file']
  }
}

export default function TulFonPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}