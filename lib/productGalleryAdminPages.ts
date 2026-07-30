export type ProductGalleryAdminPage = {
  pageKey: string
  label: string
  displayLabel: string
  href?: string
}

type ProductGalleryCmsPage = {
  pageKey: string
  slug: string
  title: string
}

type ProductGallerySourceItem = {
  title: string
  href: string
}

type BuildProductGalleryAdminPagesInput = {
  pages: ProductGalleryCmsPage[]
  productItems: ProductGallerySourceItem[]
  modelItems: ProductGallerySourceItem[]
  corporateItems: ProductGallerySourceItem[]
  mechanizedCategories: ProductGallerySourceItem[]
}

const motorizedFabricGalleryPageKey = 'product-gallery-urunler-motorlu-tul-ve-kumas-perdeler'

const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')

const productGalleryCollator = new Intl.Collator('tr', {
  sensitivity: 'base',
  numeric: true,
})

const hiddenProductGalleryLabels = new Set([
  'deney',
  'pro collection galerisi',
])

const isHiddenProductGallery = (page: ProductGalleryAdminPage) =>
  [page.label, page.displayLabel].some((label) =>
    hiddenProductGalleryLabels.has(label.trim().toLocaleLowerCase('tr')))

const isMotorizedFabricGalleryLabel = (label: string) => {
  const normalizedLabel = normalizeSearchText(label)
  return (
    normalizedLabel.includes('motorlu') &&
    normalizedLabel.includes('tul') &&
    normalizedLabel.includes('kumas') &&
    normalizedLabel.includes('perde')
  )
}

const normalizeInternalHref = (href: string) => {
  const trimmedHref = href.trim()
  if (!trimmedHref || trimmedHref.startsWith('http') || trimmedHref.startsWith('mailto:') || trimmedHref.startsWith('tel:')) {
    return ''
  }

  return `/${trimmedHref.replace(/^\/+|\/+$/g, '')}`
}

const getProductGalleryPageKeyFromHref = (href: string) => {
  const normalizedHref = normalizeInternalHref(href)
  if (!normalizedHref) {
    return ''
  }

  return `product-gallery-${normalizedHref.replace(/^\/+/, '').replace(/\//g, '-')}`
}

const productDetailGalleryPageKeys = new Set([
  'product-gallery-urunler-mekanizmali-perdeler',
  'product-gallery-urunler-tul-fon-perde',
  'product-gallery-urunler-dosemelik-kumas',
  'product-gallery-urunler-motorlu-perdeler',
  'product-gallery-urunler-perde-aksesuarlari',
  'product-gallery-urunler-metal-zincir-perde',
])

export const getGalleryPageFromCatalogItem = (
  item: ProductGallerySourceItem,
): ProductGalleryAdminPage | null => {
  const normalizedHref = normalizeInternalHref(item.href)
  const pageKey = getProductGalleryPageKeyFromHref(normalizedHref)
  if (
    !normalizedHref ||
    productDetailGalleryPageKeys.has(pageKey) ||
    !item.title.trim() ||
    !['/urunler/', '/model-perdeler/', '/kurumsal-urunler/'].some((prefix) => normalizedHref.startsWith(prefix))
  ) {
    return null
  }

  return {
    pageKey,
    label: item.title,
    displayLabel: item.title,
    href: normalizedHref,
  }
}

export const buildProductGalleryAdminPages = ({
  pages,
  productItems,
  modelItems,
  corporateItems,
  mechanizedCategories,
}: BuildProductGalleryAdminPagesInput): ProductGalleryAdminPage[] => {
  const pageMap = new Map<string, ProductGalleryAdminPage>()

  pages
    .filter((page) => page.pageKey.startsWith('product-gallery-') && !productDetailGalleryPageKeys.has(page.pageKey))
    .forEach((page) => pageMap.set(page.pageKey, {
      pageKey: page.pageKey,
      label: page.title,
      displayLabel: page.title,
      href: page.slug,
    }))

  ;[...productItems, ...modelItems, ...corporateItems, ...mechanizedCategories]
    .map(getGalleryPageFromCatalogItem)
    .filter((page): page is ProductGalleryAdminPage => Boolean(page))
    .forEach((page) => {
      const cmsPage = pageMap.get(page.pageKey)
      pageMap.set(page.pageKey, {
        ...page,
        displayLabel: cmsPage?.displayLabel || page.displayLabel,
      })
    })

  const galleryPages = Array.from(pageMap.values())
  const hasMotorizedFabricGallery = galleryPages.some((page) => page.pageKey === motorizedFabricGalleryPageKey)

  return galleryPages
    .filter((page) => (
      !hasMotorizedFabricGallery ||
      !isMotorizedFabricGalleryLabel(page.label) ||
      page.pageKey === motorizedFabricGalleryPageKey
    ))
    .filter((page) => !isHiddenProductGallery(page))
    .sort((a, b) => productGalleryCollator.compare(a.displayLabel, b.displayLabel))
}
