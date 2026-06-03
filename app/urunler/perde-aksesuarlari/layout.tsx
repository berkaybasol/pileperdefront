import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perde Aksesuarları - Modern ve Klasik Modeller ',
  description: 'Perde aksesuarları ile detayda fark yaratın. Fırfır, püskül, bağlama, ray sistemleri. Geniş ürün yelpazesi. Ankara\'da hızlı teslimat.',
  keywords: 'perde aksesuarları, rustik, braçol, renso, perde kolbağı, sarkıt, püskül ponpon, ahşap rustik, krom rustik, ankara perde aksesuarı, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/perde-aksesuarlari'
  },
  openGraph: {
    title: 'Perde Aksesuarları - Modern ve Klasik Modeller ',
    description: 'Modern, klasik ve avangart perde aksesuarları. Rustik, braçol, renso, sarkıt, püskül ponpon modelleri.',
    images: ['/api/public/media/images/35d4d007-ea8e-4f37-9363-ad2ebfa75173/file']
  }
}

export default function PerdeAksesuarlariLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
