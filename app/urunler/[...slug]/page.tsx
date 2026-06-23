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
  return getCmsPageMetadata(buildDynamicGalleryPageKey('urunler', slug), buildDynamicGalleryMetadata(title))
}

export default async function DynamicUrunGalleryPage({ params }: DynamicGalleryPageProps) {
  const { slug } = await params
  const title = buildDynamicGalleryTitle(slug)
  const isMotorizedProductGallery = slug[0] === 'motorlu-perdeler' && slug.length > 1
  const isMotorizedTulFabricGallery = slug.join('/') === 'motorlu-perdeler/motorlu-tul-ve-kumas-perdeler'
  const alternatePageKeys = isMotorizedTulFabricGallery
    ? [
      'product-gallery-urunler-motorlu-perdeler-motorlu-tül-ve-kumaş-perdeler',
      'product-gallery-urunler-motorlu-perdeler-yeni-kategori',
    ]
    : undefined

  return (
    <ManagedProductGalleryPage
      pageKey={buildDynamicGalleryPageKey('urunler', slug)}
      title={title}
      description={`${title} uygulama gorselleri.`}
      fallbackImages={fallbackDynamicGalleryImage}
      showVideoSection={isMotorizedProductGallery}
      alternatePageKeys={alternatePageKeys}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: title },
      ]}
    />
  )
}
