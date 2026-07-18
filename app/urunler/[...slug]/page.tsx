import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import { getCmsPageMetadata } from '@/lib/cmsMetadata'
import {
  buildDynamicGalleryMetadata,
  buildDynamicGalleryPageKey,
  buildDynamicGalleryTitle,
  fallbackDynamicGalleryImage,
} from '@/lib/dynamicGalleryPage'
import type { ProductGalleryHeroCopy } from '@/lib/productGalleryContent'

const PERDE_BORDURLERI_SLUG = 'perde-aksesuarlari/perde-bordurleri'
const PERDE_BORDURLERI_CANONICAL = `https://pileperde.com.tr/urunler/${PERDE_BORDURLERI_SLUG}`
const PERDE_BORDURLERI_IMAGE = 'https://api.pileperde.com.tr/api/public/media/images/2084b064-a137-4345-a475-6de8efd4328f/file'

type DynamicGalleryPageProps = {
  params: Promise<{
    slug: string[]
  }>
}

export const generateMetadata = async ({ params }: DynamicGalleryPageProps) => {
  const { slug } = await params
  const slugPath = slug.join('/')
  const title = buildDynamicGalleryTitle(slug)
  const fallbackMetadata = slugPath === PERDE_BORDURLERI_SLUG ? {
    title: 'Perde Bordür Modelleri | Dekoratif Bordür | Pile Perde Çayyolu Ankara',
    description: 'Perde bordür modelleri, dekoratif perde bordürleri, perde şeritleri, perde biyeleri ve perde süsleme şeritlerini keşfedin. Zengin renk ve desen seçenekleri.',
  } : buildDynamicGalleryMetadata(title)
  const metadata = await getCmsPageMetadata(
    buildDynamicGalleryPageKey('urunler', slug),
    fallbackMetadata
  )

  const canonical = `https://pileperde.com.tr/urunler/${slugPath}`
  const pageTitle = typeof metadata.title === 'string' ? metadata.title : undefined
  const pageDescription = typeof metadata.description === 'string' ? metadata.description : undefined

  return {
    ...metadata,
    alternates: {
      canonical,
    },
    ...(slugPath === PERDE_BORDURLERI_SLUG ? {
      openGraph: {
        ...metadata.openGraph,
        title: pageTitle,
        description: pageDescription,
        url: PERDE_BORDURLERI_CANONICAL,
        images: [{ url: PERDE_BORDURLERI_IMAGE, alt: 'Perde Bordürleri Modelleri' }],
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: pageTitle,
        description: pageDescription,
        images: [PERDE_BORDURLERI_IMAGE],
      },
    } : {}),
  }
}

const activeProductBreadcrumbs: Record<string, { name: string; parentName: string; parentUrl: string }> = {
  'mekanizmali-perdeler/bambu-perde': { name: 'Bambu Perde', parentName: 'Mekanizmalı Perdeler', parentUrl: '/urunler/mekanizmali-perdeler' },
  'tul-fon-perde/klasik-fon-perde': { name: 'Klasik Fon Perde', parentName: 'Tül & Fon Perde', parentUrl: '/urunler/tul-fon-perde' },
  'tul-fon-perde/kadife-fon-perde': { name: 'Kadife Fon Perde', parentName: 'Tül & Fon Perde', parentUrl: '/urunler/tul-fon-perde' },
  'tul-fon-perde/tasarim-fon-perdeler': { name: 'Tasarım Fon Perdeler', parentName: 'Tül & Fon Perde', parentUrl: '/urunler/tul-fon-perde' },
  'tul-fon-perde/keten-tul-perdeler': { name: 'Keten Tül Perdeler', parentName: 'Tül & Fon Perde', parentUrl: '/urunler/tul-fon-perde' },
  'tul-fon-perde/baskili-fon-perdeler': { name: 'Baskılı Fon Perdeler', parentName: 'Tül & Fon Perde', parentUrl: '/urunler/tul-fon-perde' },
  'dosemelik-kumas/outdoor-kumas': { name: 'Outdoor Kumaş', parentName: 'Döşemelik Kumaş', parentUrl: '/urunler/dosemelik-kumas' },
  'dosemelik-kumas/deri-kumas': { name: 'Deri Kumaş', parentName: 'Döşemelik Kumaş', parentUrl: '/urunler/dosemelik-kumas' },
  'dosemelik-kumas/leopar-desenli-dosemelik-kumaslar': { name: 'Leopar Desenli Döşemelik Kumaşlar', parentName: 'Döşemelik Kumaş', parentUrl: '/urunler/dosemelik-kumas' },
  'motorlu-tul-ve-kumas-perdeler': { name: 'Motorlu Tül ve Kumaş Perdeler', parentName: 'Motorlu Perdeler', parentUrl: '/urunler/motorlu-perdeler' },
  'motorlu-perdeler/ahsap-jaluzi': { name: 'Motorlu Ahşap Jaluzi', parentName: 'Motorlu Perdeler', parentUrl: '/urunler/motorlu-perdeler' },
  'motorlu-perdeler/motorlu-stor-perdeler': { name: 'Motorlu Stor Perdeler', parentName: 'Motorlu Perdeler', parentUrl: '/urunler/motorlu-perdeler' },
  'motorlu-perdeler/motorlu-dikey-perdeler': { name: 'Motorlu Dikey Perdeler', parentName: 'Motorlu Perdeler', parentUrl: '/urunler/motorlu-perdeler' },
  [PERDE_BORDURLERI_SLUG]: { name: 'Perde Bordürleri', parentName: 'Perde Aksesuarları', parentUrl: '/urunler/perde-aksesuarlari' },
}

export default async function DynamicUrunGalleryPage({ params }: DynamicGalleryPageProps) {
  const { slug } = await params
  const title = buildDynamicGalleryTitle(slug)
  const slugPath = slug.join('/')
  const activeBreadcrumb = activeProductBreadcrumbs[slugPath]
  const isPerdeBordurleri = slugPath === PERDE_BORDURLERI_SLUG
  const canonicalUrl = `https://pileperde.com.tr/urunler/${slugPath}`
  const seoBreadcrumbItems: BreadcrumbItem[] | undefined = activeBreadcrumb ? [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Ürünler', url: '/urunler' },
    { name: activeBreadcrumb.parentName, url: activeBreadcrumb.parentUrl },
    { name: activeBreadcrumb.name, url: `/urunler/${slugPath}` },
  ] : undefined
  const fallbackHeroCopy: ProductGalleryHeroCopy | undefined = isPerdeBordurleri ? {
    breadcrumbLabel: 'Perde Bordürleri',
    eyebrow: 'Perde Bordürleri Koleksiyonu',
    title: 'Perde Bordürleri',
    highlightedTitle: 'Modelleri',
    description: 'Perde Bordürleri uygulama görselleri.',
  } : undefined

  return (
    <ManagedProductGalleryPage
      pageKey={buildDynamicGalleryPageKey('urunler', slug)}
      title={title}
      description={`${title} uygulama gorselleri.`}
      fallbackImages={fallbackDynamicGalleryImage}
      breadcrumbItems={[
        { label: 'Ürünler', href: '/urunler' },
        { label: title },
      ]}
      seoBreadcrumbItems={seoBreadcrumbItems}
      breadcrumbCanonicalUrl={activeBreadcrumb ? canonicalUrl : undefined}
      fallbackHeroCopy={fallbackHeroCopy}
      galleryTitle={isPerdeBordurleri ? 'Perde Bordürleri Modelleri' : undefined}
    />
  )
}
