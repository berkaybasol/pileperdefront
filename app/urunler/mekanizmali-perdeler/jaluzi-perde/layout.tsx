import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jaluzi Perde Çeşitleri - Alüminyum, Ahşap, Deri Jaluzi Ankara',
  description: 'Jaluzi perde modelleri: Alüminyum, ahşap ve deri jaluzi çeşitleri. Modern tasarım, dayanıklı yapı. Ofis ve ev için uygun fiyatlı jaluzi perdeler. Ankara\'da ücretsiz montaj.',
  keywords: 'jaluzi perde, alüminyum jaluzi, ahşap jaluzi, deri jaluzi, jaluzi fiyatları, ofis jaluzisi, ankara jaluzi perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/jaluzi-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function JaluziPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
