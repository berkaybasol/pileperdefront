import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Katlamalı Perde Modelleri - Fonksiyonel ve Şık Tasarımlar ',
  description: 'Katlamalı perde modelleri ile pratik ve estetik çözüm. Manuel veya motorlu sistem. Modern tasarım. Ankara\'da profesyonel ölçüm ve montaj.',
  keywords: 'katlamalı perde, katlamalı perde modelleri, mekanizmalı perde, çubuklu katlamalı perde, çubuksuz katlamalı perde, katlamalı perde fiyatları, katlamalı perde ankara',
  alternates: {
    canonical: 'https://pileperde.com.tr/model-perdeler/katlamali-perde'
  },
  openGraph: {
    images: ['/api/public/media/images/2e01e3a6-79a2-4b09-87f3-48350370e150/file']
  }
}

export default function KatlamaliPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
