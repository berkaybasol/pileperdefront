import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modern Perde Modelleri - Çağdaş Tasarımlar ',
  description: 'Modern perde modelleri ile evinize çağdaş bir hava katın. Sade çizgiler, zarif tasarımlar. Binlerce kumaş seçeneği. Ankara\'da ücretsiz montaj.',
  keywords: 'modern perde, çağdaş perde, stor perde, mutfak perdesi, salon perdesi, minimalist perde, zebra perde, tül fon perde, ankara modern perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/modern-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/8c0da342-dfe5-422c-8ef5-6279fd76976e/file']
  }
}

export default function ModernPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
