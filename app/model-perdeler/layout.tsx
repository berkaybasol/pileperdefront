import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Model Perdeler - Modern Klasik Rustik',
  description: 'Perde modelleri: Modern, klasik, rustik, kruvaze, balon, katlamalı perdeler. Galeri, ip, çocuk odası, kış bahçesi perde çeşitleri. Ankara\'da özel dikim hizmeti.',
  keywords: 'perde modelleri, modern perde, klasik perde, rustik perde, kruvaze perde, balon perde, galeri perde, ankara model perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler'
  },
  openGraph: {
    title: 'Model Perdeler - Modern Klasik Rustik Ankara',
    description: 'Perde modelleri: Modern, klasik, rustik, kruvaze, balon, katlamalı perdeler.',
    images: ['/api/public/media/images/8c0da342-dfe5-422c-8ef5-6279fd76976e/file']
  }
}

export default function ModelPerdelerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
