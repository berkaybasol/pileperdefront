import type { Metadata } from 'next'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import { productDetailDefaults } from '@/lib/productDetailContent'

const pageKey = 'product-motorlu-perdeler'

const fallbackMetadata: Metadata = {
  title: 'Motorlu Perde Sistemleri - Pile Perde',
  description: 'Motorlu perde, zip perde, projeksiyon perde ve dış cephe jaluzi çözümleri.',
}

export const generateMetadata = () => getCmsPageMetadata(pageKey, fallbackMetadata)

export default function MotorluPerdelerPage() {
  return <MekanizmaliPerdelerContent pageKey={pageKey} fallbackContent={productDetailDefaults[pageKey]} />
}
