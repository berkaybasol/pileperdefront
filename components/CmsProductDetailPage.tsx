import CmsPageBoundary from '@/components/CmsPageBoundary'
import MekanizmaliPerdelerContent from '@/components/MekanizmaliPerdelerContent'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof MekanizmaliPerdelerContent>

export default function CmsProductDetailPage(props: Props) {
  const pageKey = props.pageKey || 'product-mekanizmali-perdeler'

  return (
    <CmsPageBoundary pageKey={pageKey}>
      <MekanizmaliPerdelerContent {...props} pageKey={pageKey} />
    </CmsPageBoundary>
  )
}
