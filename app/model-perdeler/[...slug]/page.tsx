import ManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import {
  buildDynamicGalleryMetadata,
  buildDynamicGalleryPageKey,
  buildDynamicGalleryTitle,
  fallbackDynamicGalleryImage,
} from '@/lib/dynamicGalleryPage'

type DynamicGalleryPageProps = {
  params: Promise<{
    slug: string[]
  }>
}

export const generateMetadata = async ({ params }: DynamicGalleryPageProps) => {
  const { slug } = await params
  const title = buildDynamicGalleryTitle(slug)
  return getCmsPageMetadata(buildDynamicGalleryPageKey('model-perdeler', slug), buildDynamicGalleryMetadata(title))
}

export default async function DynamicModelGalleryPage({ params }: DynamicGalleryPageProps) {
  const { slug } = await params
  const title = buildDynamicGalleryTitle(slug)

  return (
    <ManagedProductGalleryPage
      pageKey={buildDynamicGalleryPageKey('model-perdeler', slug)}
      title={title}
      description={`${title} uygulama gorselleri.`}
      fallbackImages={fallbackDynamicGalleryImage}
      breadcrumbItems={[
        { label: 'Perde Modelleri', href: '/perde-modelleri' },
        { label: title },
      ]}
    />
  )
}
