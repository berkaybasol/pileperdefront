import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Motorlu Perdeler - Ankara ',
  description: 'Motorlu perde sistemleri ile konfor ve teknoloji. Kumanda, akıllı telefon kontrolü. Ankara\'da profesyonel kurulum ve garanti.',
  keywords: 'motorlu perde, akıllı perde, somfy, uzaktan kumandalı perde, otomasyon perde, motorlu stor, ankara motorlu perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/motorlu-perdeler'
  },
  openGraph: {
    title: 'Motorlu Perdeler - Ankara ',
    description: 'Uzaktan kumandalı ve akıllı ev sistemleri ile uyumlu motorlu perde çözümleri. Somfy eksperliği ile 5 yıl garantili motorlu perde sistemleri.',
    images: ['/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file']
  }
}

export default function MotorluperdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}