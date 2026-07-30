export const productVideoGalleryPilotPageKey =
  'product-gallery-urunler-motorlu-tul-ve-kumas-perdeler'

export const productVideoGalleryPilotHref =
  '/urunler/motorlu-tul-ve-kumas-perdeler'

export const isProductVideoGalleryPilot = (pageKey: string) =>
  pageKey === productVideoGalleryPilotPageKey

export const productVideoGalleryEnabledPageKeys = [
  productVideoGalleryPilotPageKey,
  'product-gallery-urunler-motorlu-perdeler-ahsap-jaluzi',
  'product-gallery-urunler-motorlu-perdeler-motorlu-stor-perdeler',
  'product-gallery-urunler-motorlu-perdeler-motorlu-dikey-perdeler',
  'product-gallery-urunler-motorlu-perdeler-zip-perde',
  'product-gallery-urunler-motorlu-perdeler-dis-cephe-jaluzi',
] as const

const productVideoGalleryEnabledPageKeySet = new Set<string>(
  productVideoGalleryEnabledPageKeys,
)

export const isProductVideoGalleryEnabled = (pageKey: string) =>
  productVideoGalleryEnabledPageKeySet.has(pageKey)

export const isProductVideoGalleryAdminEnabled = (
  activePageKey: string,
  loadedCmsPageKey?: string | null,
) => loadedCmsPageKey
  ? isProductVideoGalleryEnabled(loadedCmsPageKey)
  : isProductVideoGalleryEnabled(activePageKey)
