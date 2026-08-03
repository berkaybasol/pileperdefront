import ManagedProductGalleryPage from '@/components/CmsManagedProductGalleryPage'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import {
  buildDynamicGalleryTitle,
  fallbackDynamicGalleryImage,
} from '@/lib/dynamicGalleryPage'
import type { ProductGalleryHeroCopy } from '@/lib/productGalleryContent'

const pageKey = 'product-gallery-urunler-perde-aksesuarlari-perde-bordurleri'
const slug = ['perde-aksesuarlari', 'perde-bordurleri']
const title = buildDynamicGalleryTitle(slug)
const canonicalUrl = 'https://pileperde.com.tr/urunler/perde-aksesuarlari/perde-bordurleri'
const openGraphImage = 'https://api.pileperde.com.tr/api/public/media/images/2084b064-a137-4345-a475-6de8efd4328f/file'

const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Perde Aksesuarları', url: '/urunler/perde-aksesuarlari' },
  { name: 'Perde Bordürleri', url: '/urunler/perde-aksesuarlari/perde-bordurleri' },
]

const fallbackHeroCopy: ProductGalleryHeroCopy = {
  breadcrumbLabel: 'Perde Bordürleri',
  eyebrow: 'Perde Bordürleri Koleksiyonu',
  title: 'Perde Bordürleri',
  highlightedTitle: 'Modelleri',
  description: 'Perde Bordürleri uygulama görselleri.',
}

export const generateMetadata = async () => {
  const metadata = await getCmsPageMetadata(pageKey, {
    title: 'Perde Bordür Modelleri | Dekoratif Bordür | Pile Perde Çayyolu Ankara',
    description: 'Perde bordür modelleri, dekoratif perde bordürleri, perde şeritleri, perde biyeleri ve perde süsleme şeritlerini keşfedin. Zengin renk ve desen seçenekleri.',
  })
  const pageTitle = typeof metadata.title === 'string' ? metadata.title : undefined
  const pageDescription = typeof metadata.description === 'string' ? metadata.description : undefined

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...metadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      images: [{ url: openGraphImage, alt: 'Perde Bordürleri Modelleri' }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: pageTitle,
      description: pageDescription,
      images: [openGraphImage],
    },
  }
}

export default function PerdeBordurleriPage() {
  return (
    <ManagedProductGalleryPage
      pageKey={pageKey}
      title={title}
      description={`${title} uygulama gorselleri.`}
      fallbackImages={fallbackDynamicGalleryImage}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: title },
      ]}
      seoBreadcrumbItems={breadcrumbItems}
      breadcrumbCanonicalUrl={canonicalUrl}
      fallbackHeroCopy={fallbackHeroCopy}
      galleryTitle="Perde Bordürleri Modelleri"
    />
  )
}
