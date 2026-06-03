import type { Metadata } from 'next'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-tul-fon-perde'

const fallbackMetadata: Metadata = {
  title: 'Tül ve Fon Perde Modelleri - Pile Perde',
  description: 'Tül perde ve fon perde modelleri, kumaş seçenekleri, renk ve ölçü danışmanlığı.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function TulFonPerdePage() {
  return <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} />
}
