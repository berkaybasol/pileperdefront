import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kurumsal Ürünler - Otel Ofis Hastane',
  description: 'Kurumsal perde çözümleri: Otel, ofis, hastane, cafe, restoran için özel üretim perdeler. Toplu iş garantisi, alev almaz sertifikalı. Ankara\'da profesyonel hizmet.',
  keywords: 'kurumsal perde, otel perdesi, ofis perdesi, hastane perdesi, cafe perdesi, restoran perdesi, toplu perde ankara',
  alternates: {
    canonical: 'https://pileperde.com.tr/kurumsal-urunler'
  },
  openGraph: {
    title: 'Kurumsal Ürünler - Otel Ofis Hastane Ankara',
    description: 'Kurumsal perde çözümleri: Otel, ofis, hastane için özel üretim perdeler.',
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function KurumsalUrunlerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
