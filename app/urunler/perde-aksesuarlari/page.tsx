import type { Metadata } from 'next'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import MekanizmaliPerdelerContent from '@/components/CmsProductDetailPage'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { getProductDetailContent, productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-perde-aksesuarlari'

const canonicalUrl = 'https://pileperde.com.tr/urunler/perde-aksesuarlari'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Perde Aksesuarları', url: '/urunler/perde-aksesuarlari' },
]

const fallbackMetadata: Metadata = {
  title: 'Perde Aksesuarları - Pile Perde',
  description: 'Rustik, kol bağı, braçol ve dekoratif perde aksesuarları.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default async function PerdeAksesuarlariPage() {
  const initialContent = await getProductDetailContent(pageKey)

  return <>
    <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
    <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={initialContent || productDetailDefaults[pageKey]} breadcrumbItems={breadcrumbItems} canonicalUrl={canonicalUrl} />
  </>
}
