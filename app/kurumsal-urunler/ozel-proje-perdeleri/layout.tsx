import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Özel Proje Perdeleri - Kurumsal Perde Çözümleri Ankara ',
  description: 'Özel proje perde çözümleri ile otel, hastane, ofis projeleriniz için profesyonel hizmet. Toplu iş garantisi, 3D görselleştirme. Ankara\'da ücretsiz keşif.',
  keywords: 'özel proje perde, kurumsal perde, otel perdesi, hastane perdesi, ofis perdesi, restoran perdesi, toplu perde, alev almaz perde, sertifikalı perde, ankara kurumsal perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/kurumsal-urunler/ozel-proje-perdeleri'
  },
  openGraph: {
    title: 'Özel Proje Perdeleri - Kurumsal Perde Çözümleri Ankara ',
    description: 'Özel proje perdeleri: Otel, hastane, ofis, restoran için kurumsal perde çözümleri. Toplu iş garantisi, 3D görselleştirme, alev almaz sertifikalı kumaşlar.',
    images: ['/api/public/media/images/cddc7f70-53b5-4df0-bd2e-1a8511c17fd7/file']
  }
}

export default function OzelprojeperdeleriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
