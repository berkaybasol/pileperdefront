import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
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
  return getCmsPageMetadata(buildDynamicGalleryPageKey('kurumsal-urunler', slug), buildDynamicGalleryMetadata(title))
}

export default async function DynamicCorporateGalleryPage({ params }: DynamicGalleryPageProps) {
  const { slug } = await params
  const title = buildDynamicGalleryTitle(slug)

  return (
    <ManagedProductGalleryPage
      pageKey={buildDynamicGalleryPageKey('kurumsal-urunler', slug)}
      title={title}
      description={`${title} uygulama gorselleri.`}
      fallbackImages={fallbackDynamicGalleryImage}
      breadcrumbItems={[
        { label: 'Kurumsal Ürünler', href: '/kurumsal-urunler' },
        { label: title },
      ]}
    />
  )
}
