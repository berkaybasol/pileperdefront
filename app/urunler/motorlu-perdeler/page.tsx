import type { Metadata } from 'next'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'
import { turkishLocaleAlternates } from '@/lib/siteLocales'

const pageKey = 'product-motorlu-perdeler'

const canonicalUrl = 'https://pileperde.com.tr/urunler/motorlu-perdeler'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Motorlu Perde Sistemleri', url: '/urunler/motorlu-perdeler' },
]

const fallbackMetadata: Metadata = {
  title: 'Motorlu Perde Sistemleri - Pile Perde',
  description: 'Motorlu perde, zip perde, projeksiyon perde ve dış cephe jaluzi çözümleri.',
}

export const generateMetadata = async () => ({
  ...(await getCmsPageMetadata(pageKey, fallbackMetadata)),
  alternates: turkishLocaleAlternates('/urunler/motorlu-perdeler'),
})

export default function MotorluPerdelerPage() {
  return <>
    <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
    <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} breadcrumbItems={breadcrumbItems} canonicalUrl={canonicalUrl} />
  </>
}
