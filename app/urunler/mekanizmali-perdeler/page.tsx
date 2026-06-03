import type { Metadata } from 'next'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'

const fallbackMetadata: Metadata = {
  title: 'Mekanizmalı Perde Sistemleri - Dikey, Zebra, Plise Perde Ankara',
  description:
    "Mekanizmalı perde sistemleri: Dikey perde, zebra perde, plise perde, stor perde ve daha fazlası. Ankara'da profesyonel ölçüm ve montaj hizmeti.",
  keywords: 'mekanizmalı perde, dikey perde, zebra perde, plise perde, stor perde, silhouette perde, cam balkon perdesi, ankara mekanizmalı perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/mekanizmali-perdeler',
  },
  openGraph: {
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file'],
  },
}

export const generateMetadata = () =>
  getCmsPageMetadata('product-mekanizmali-perdeler', fallbackMetadata)

export default function MekanizmaliPerdelerPage() {
  return <MekanizmaliPerdelerContent />
}
