import type { Metadata } from 'next'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import MekanizmaliPerdelerContent from '@/components/CmsProductDetailPage'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-metal-zincir-perde'

const canonicalUrl = 'https://pileperde.com.tr/urunler/metal-zincir-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Metal Zincir Perde', url: '/urunler/metal-zincir-perde' },
]

const fallbackMetadata: Metadata = {
  title: 'Metal Zincir Perde - Pile Perde',
  description: 'Dekoratif metal zincir perde ve seperatör çözümleri.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function MetalZincirPerdePage() {
  return <>
    <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
    <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} breadcrumbItems={breadcrumbItems} canonicalUrl={canonicalUrl} />
  </>
}
