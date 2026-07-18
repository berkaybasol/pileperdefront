import type { Metadata } from 'next'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { turkishLocaleAlternates } from '@/lib/siteLocales'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
]

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

export const generateMetadata = async () => ({
  ...(await getCmsPageMetadata('product-mekanizmali-perdeler', fallbackMetadata)),
  alternates: turkishLocaleAlternates('/urunler/mekanizmali-perdeler', '/en/products/blinds-and-shades'),
})

export default function MekanizmaliPerdelerPage() {
  return <>
    <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
    <MekanizmaliPerdelerContent breadcrumbItems={breadcrumbItems} canonicalUrl={canonicalUrl} />
  </>
}
