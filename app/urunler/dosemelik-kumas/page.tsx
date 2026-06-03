import type { Metadata } from 'next'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-dosemelik-kumas'

const fallbackMetadata: Metadata = {
  title: 'Döşemelik Kumaş Modelleri - Pile Perde',
  description: 'Koltuk, sandalye ve özel dekorasyon projeleri için döşemelik kumaş seçenekleri.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function DosemelikKumasPage() {
  return <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} />
}
