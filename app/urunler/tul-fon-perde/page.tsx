import type { Metadata } from 'next'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-tul-fon-perde'

const canonicalUrl = 'https://pileperde.com.tr/urunler/tul-fon-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Tül ve Fon Perde', url: '/urunler/tul-fon-perde' },
]

const fallbackMetadata: Metadata = {
  title: 'Tül ve Fon Perde Modelleri - Pile Perde',
  description: 'Tül perde ve fon perde modelleri, kumaş seçenekleri, renk ve ölçü danışmanlığı.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function TulFonPerdePage() {
  return <>
    <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
    <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} breadcrumbItems={breadcrumbItems} canonicalUrl={canonicalUrl} />
  </>
}
