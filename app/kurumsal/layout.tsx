import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kurumsal Çözümler',
  description: 'Otel, hastane, ofis, restoran için kurumsal perde çözümleri. Toplu iş garantisi, profesyonel montaj, alev almaz sertifikalı kumaşlar. Ankara geneli hizmet.',
  keywords: 'kurumsal perde, toplu perde, otel perdesi, ofis perdesi, hastane perdesi, restoran perdesi, ankara kurumsal',
  alternates: {
    canonical: 'https://pileperde.com.tr/kurumsal'
  },
  openGraph: {
    title: 'Kurumsal Çözümler - Toplu İş Garantisi',
    description: 'Otel, hastane, ofis, restoran için kurumsal perde çözümleri.',
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function KurumsalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
