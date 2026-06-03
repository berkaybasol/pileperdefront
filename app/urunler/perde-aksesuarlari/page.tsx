import type { Metadata } from 'next'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-perde-aksesuarlari'

const fallbackMetadata: Metadata = {
  title: 'Perde Aksesuarları - Pile Perde',
  description: 'Rustik, kol bağı, braçol ve dekoratif perde aksesuarları.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function PerdeAksesuarlariPage() {
  return <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} />
}
