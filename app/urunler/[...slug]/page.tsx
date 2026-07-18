import ManagedProductGalleryPage from '@/components/ManagedProductGalleryPage'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
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
  const metadata = await getCmsPageMetadata(
    buildDynamicGalleryPageKey('urunler', slug),
    buildDynamicGalleryMetadata(title)
  )

  return {
    ...metadata,
    alternates: {
      canonical: `https://pileperde.com.tr/urunler/${slug.join('/')}`,
    },
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
}

export default async function DynamicUrunGalleryPage({ params }: DynamicGalleryPageProps) {
  const { slug } = await params
  const title = buildDynamicGalleryTitle(slug)
  const slugPath = slug.join('/')
  const activeBreadcrumb = activeProductBreadcrumbs[slugPath]
  const canonicalUrl = `https://pileperde.com.tr/urunler/${slugPath}`
  const seoBreadcrumbItems: BreadcrumbItem[] | undefined = activeBreadcrumb ? [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Ürünler', url: '/urunler' },
    { name: activeBreadcrumb.parentName, url: activeBreadcrumb.parentUrl },
    { name: activeBreadcrumb.name, url: `/urunler/${slugPath}` },
  ] : undefined

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
    />
  )
}
