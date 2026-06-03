import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dış Cephe Jaluzi - Motorlu Sistemler ',
  description: 'Dış cephe jaluzi sistemleri ile güneş kontrolü ve enerji tasarrufu. Modern binalar için estetik çözüm. Ankara\'da profesyonel montaj.',
  keywords: 'dış cephe jaluzi, brisoley, güneş kırıcı, dış mekan jaluzi, motorlu jaluzi, ankara dış cephe jaluzi, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/motorlu-perdeler/dis-cephe-jaluzi'
  },
  openGraph: {
    title: 'Dış Cephe Jaluzi - Motorlu Sistemler ',
    description: 'Otomatik dış cephe jaluzi perde sistemleri. Güneş kontrolü ve enerji tasarrufu sağlayan motorlu dış cephe jaluzileri.',
    images: ['/api/public/media/images/f271f700-1801-4b4c-b25c-554ccf65cbb1/file']
  }
}

export default function DisCepheJaluziLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}