import type { Metadata } from 'next'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-dosemelik-kumas'

const canonicalUrl = 'https://pileperde.com.tr/urunler/dosemelik-kumas'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Döşemelik Kumaş', url: '/urunler/dosemelik-kumas' },
]

const fallbackMetadata: Metadata = {
  title: 'Döşemelik Kumaş Modelleri - Pile Perde',
  description: 'Koltuk, sandalye ve özel dekorasyon projeleri için döşemelik kumaş seçenekleri.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function DosemelikKumasPage() {
  return <>
    <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
    <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} breadcrumbItems={breadcrumbItems} canonicalUrl={canonicalUrl} />
  </>
}
