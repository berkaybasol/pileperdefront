import CmsPageBoundary from '@/components/CmsPageBoundary'
import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof ManagedProductGalleryPage>

export default function CmsManagedProductGalleryPage(props: Props) {
  return (
    <CmsPageBoundary pageKey={props.pageKey}>
      <ManagedProductGalleryPage {...props} />
    </CmsPageBoundary>
  )
}
