import type { Metadata } from 'next'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-metal-zincir-perde'

const fallbackMetadata: Metadata = {
  title: 'Metal Zincir Perde - Pile Perde',
  description: 'Dekoratif metal zincir perde ve seperatör çözümleri.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function MetalZincirPerdePage() {
  return <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} />
}
