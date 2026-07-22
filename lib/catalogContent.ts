const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

type CmsSection = {
  sectionKey: string
  title: string | null
  subtitle: string | null
  body: string | null
  contentJson: string | null
  enabled: boolean
}

type CmsPage = {
  title: string
  sections: CmsSection[]
}

export type CatalogItem = {
  id: number
  title: string
  image: string
  href: string
  description: string
  enabled: boolean
  badge?: string
}

export type ProductSectionCopy = {
  heroTitle: string
  heroSubtitle: string
  sectionEyebrow: string
  sectionTitle: string
  sectionDescription: string
}

export type ProductPageContent = ProductSectionCopy & {
  items: CatalogItem[]
}

export type ModelPageContent = {
  heroTitle: string
  heroSubtitle: string
  sectionEyebrow: string
  sectionTitle: string
  sectionDescription: string
  items: CatalogItem[]
}

export type CorporatePageContent = {
  sectionEyebrow: string
  sectionTitle: string
  sectionDescription: string
  items: CatalogItem[]
}

export const defaultProductSectionCopy: ProductSectionCopy = {
  heroTitle: 'Ürünlerimiz',
  heroSubtitle: 'Kaliteli perde çözümleri',
  sectionEyebrow: 'ÜRÜNLERİMİZ',
  sectionTitle: 'Geniş Ürün Yelpazemiz',
  sectionDescription: 'En yeni teknoloji ve trendlere uygun, kaliteli perde ve dekorasyon ürünleri',
}

export const defaultModelPageCopy = {
  heroTitle: 'Perde Modelleri',
  heroSubtitle: 'Mekanınıza uygun perde modellerimiz',
  sectionEyebrow: 'PERDE MODELLERİ',
  sectionTitle: 'Tarzınıza Uygun Perde Modelleri',
  sectionDescription: 'Klasikten moderne, minimalistten gösterişliye kadar geniş model yelpazemizle mekanlarınıza değer katıyoruz',
}

export const defaultCorporateSectionCopy = {
  sectionEyebrow: 'KURUMSAL ÜRÜNLER',
  sectionTitle: 'Profesyonel Mekanlar İçin Özel Çözümler',
  sectionDescription: 'Otelden hastaneye, restorandan ofise kadar tüm kurumsal projeleriniz için özel üretim perde ve dekorasyon çözümleri sunuyoruz.',
}

export const defaultProductItems: CatalogItem[] = [
  {
    id: 1,
    title: 'Mekanizmalı Perdeler',
    image: '/api/public/media/images/6027e2a5-c5c1-4f6a-a787-5d6498ef05fc/file',
    href: '/urunler/mekanizmali-perdeler',
    description: 'Jaluzi, stor, dikey ve zebra perde çeşitleri',
    enabled: true,
  },
  {
    id: 2,
    title: 'Tül ve Fon Perdeler',
    image: '/api/public/media/images/ac111c41-9c23-4975-94bb-cab90e242037/file',
    href: '/urunler/tul-fon-perde',
    description: 'Şık ve zarif tül perde modelleri',
    enabled: true,
  },
  {
    id: 3,
    title: 'Döşemelik Kumaş',
    image: '/api/public/media/images/819c6a80-7dbe-4074-9934-dfdf8b903d8a/file',
    href: '/urunler/dosemelik-kumas',
    description: 'Kaliteli döşemelik kumaş çeşitleri',
    enabled: true,
  },
  {
    id: 4,
    title: 'Motorlu Perdeler',
    image: '/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file',
    href: '/urunler/motorlu-perdeler',
    description: 'Akıllı ve konforlu motorlu sistemler',
    enabled: true,
  },
  {
    id: 5,
    title: 'Perde Aksesuarları',
    image: '/api/public/media/images/35d4d007-ea8e-4f37-9363-ad2ebfa75173/file',
    href: '/urunler/perde-aksesuarlari',
    description: 'Ray, korniz ve diğer aksesuarlar',
    enabled: true,
  },
  {
    id: 6,
    title: 'Metal Zincir Perde',
    image: '/api/public/media/images/690febe4-344f-42f2-a163-91dee5421a1c/file',
    href: '/urunler/metal-zincir-perde',
    description: 'Dekoratif metal zincir perdeler',
    enabled: true,
  },
]

export const defaultModelItems: CatalogItem[] = [
  {
    id: 1,
    title: 'Klasik Perde Modelleri',
    image: '/api/public/media/images/df6a191d-3db6-4645-a083-f71422f49200/file',
    href: '/model-perdeler/klasik-ve-avangart-perde',
    description: 'Zamansız elegans ve sofistike tasarımlar',
    enabled: true,
  },
  {
    id: 2,
    title: 'Modern Perde',
    image: '/api/public/media/images/d70ef178-4553-4734-b023-80b297f1e695/file',
    href: '/model-perdeler/modern-perde',
    description: 'Minimalist ve çağdaş perde modelleri',
    enabled: true,
  },
  {
    id: 3,
    title: 'Rustikli Perde',
    image: '/api/public/media/images/4b0f28ee-b79d-44e0-880d-5aec64bb13e3/file',
    href: '/model-perdeler/rustikli-perde',
    description: 'Doğal ve sıcak atmosfer yaratan tasarımlar',
    enabled: true,
  },
  {
    id: 4,
    title: 'Kruvaze Perde',
    image: '/api/public/media/images/fa4be5de-409b-407c-adc6-44df3d5c712b/file',
    href: '/model-perdeler/kruvaze-perde',
    description: 'Zarif ve estetik perde tasarımları',
    enabled: true,
  },
  {
    id: 5,
    title: 'Balon Perde',
    image: '/api/public/media/images/0d960ab5-7767-41f7-86e2-674315fa8cfd/file',
    href: '/model-perdeler/balon-perde',
    description: 'Şık ve gösterişli tasarımlar',
    enabled: true,
  },
  {
    id: 6,
    title: 'Katlamalı Perde',
    image: '/api/public/media/images/2e01e3a6-79a2-4b09-87f3-48350370e150/file',
    href: '/model-perdeler/katlamali-perde',
    description: 'Fonksiyonel ve şık tasarımlar',
    enabled: true,
  },
  {
    id: 7,
    title: 'Yüksek Tavanlı Galeri',
    image: '/api/public/media/images/334ad8c7-98e2-411c-98e9-d3c74c5a8973/file',
    href: '/model-perdeler/yuksek-tavanli-galeri-perde',
    description: 'İhtişamlı yüksek tavan çözümleri',
    enabled: true,
  },
  {
    id: 8,
    title: 'İp Perde',
    image: '/api/public/media/images/10c446e9-acdc-487b-8f12-2f962c3b5e37/file',
    href: '/model-perdeler/ip-perde',
    description: 'Modern ve dekoratif tasarımlar',
    enabled: true,
  },
  {
    id: 9,
    title: 'Çocuk Perde',
    image: '/api/public/media/images/92d067f9-f14e-45da-89fb-901f775d61b3/file',
    href: '/model-perdeler/cocuk-perde',
    description: 'Renkli ve eğlenceli desenler',
    enabled: true,
  },
  {
    id: 10,
    title: 'Cibinlik Perde',
    image: '/api/public/media/images/66a8d307-6542-437e-9781-8626f3f2067e/file',
    href: '/model-perdeler/cibinlik-perde',
    description: 'Romantik ve zarif yatak odası',
    enabled: true,
  },
  {
    id: 11,
    title: 'Çatı Katı Perde',
    image: '/api/public/media/images/9bfdadba-520b-43d8-8ccb-c9256523b8a9/file',
    href: '/model-perdeler/cati-kati-perde',
    description: 'Eğimli pencere özel çözümleri',
    enabled: true,
  },
  {
    id: 12,
    title: 'Kış Bahçesi Perde',
    image: '/api/public/media/images/3f3e07b0-8d36-4b49-8b21-1f0f4d439d90/file',
    href: '/model-perdeler/kis-bahcesi-perde',
    description: 'Cam balkon ve kış bahçesi için',
    enabled: true,
  },
]

export const defaultCorporateItems: CatalogItem[] = [
  {
    id: 1,
    title: 'Özel Proje Perdeleri',
    image: '/api/public/media/images/e939490a-f630-474f-a048-c25558109c07/file',
    href: '/kurumsal-urunler/ozel-proje-perdeleri',
    description: 'Büyük projeler için kurumsal çözümler',
    badge: 'Kurumsal',
    enabled: true,
  },
  {
    id: 2,
    title: 'Cafe Restoran',
    image: '/api/public/media/images/024932ef-a4e3-4ecd-99b7-4ae638859b49/file',
    href: '/kurumsal-urunler/cafe-restoran-perdeleri',
    description: 'Mekanınıza değer katan perde sistemleri',
    badge: 'Ticari',
    enabled: true,
  },
  {
    id: 3,
    title: 'Hastane Perdeleri',
    image: '/api/public/media/images/fa0a224a-6d56-4bc2-93f3-cdffa7563026/file',
    href: '/kurumsal-urunler/hastane-perdeleri',
    description: 'Hijyenik ve fonksiyonel hastane perdeleri',
    badge: 'Medikal',
    enabled: true,
  },
  {
    id: 4,
    title: 'Ofis Perdeleri',
    image: '/api/public/media/images/47ff2c4b-2644-4628-8934-8e55b67c721e/file',
    href: '/kurumsal-urunler/ofis-perdeleri',
    description: 'Profesyonel çalışma ortamları için',
    badge: 'Ofis',
    enabled: true,
  },
  {
    id: 5,
    title: 'Otel Perdeleri',
    image: '/api/public/media/images/88fba881-2e13-464e-9d80-127b267fcef3/file',
    href: '/kurumsal-urunler/otel-perdeleri',
    description: 'Lüks oteller için özel tasarım perdeler',
    badge: 'Premium',
    enabled: true,
  },
]

export const parseCatalogItems = (
  contentJson: string | null | undefined,
  fallbackItems: CatalogItem[] = defaultProductItems,
) => {
  if (!contentJson) {
    return fallbackItems
  }

  try {
    const parsed = JSON.parse(contentJson) as { items?: Partial<CatalogItem>[] }
    if (!Array.isArray(parsed.items) || parsed.items.length === 0) {
      return fallbackItems
    }

    return parsed.items.map((item, index) => ({
      id: Number(item.id) || index + 1,
      title: item.title || '',
      image: item.image || '/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file',
      href: item.href || '/iletisim',
      description: item.description || '',
      enabled: item.enabled !== false,
      badge: item.badge || fallbackItems[index]?.badge,
    }))
  } catch {
    return fallbackItems
  }
}

export const buildCatalogContentJson = (items: CatalogItem[]) => JSON.stringify({ items }, null, 2)

export const getPublicCatalogItems = async (
  pageKey: string,
  sectionKey: string,
  fallbackItems: CatalogItem[],
) => {
  const previewSection = readLocalPreviewSection(pageKey, sectionKey)
  if (previewSection) return parseCatalogItems(previewSection.contentJson, fallbackItems).filter((item) => item.enabled)
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallbackItems
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === sectionKey)
    if (!section || !section.enabled) {
      return fallbackItems
    }

    const items = parseCatalogItems(section.contentJson, fallbackItems)
    return items.filter((item) => item.enabled)
  } catch {
    return fallbackItems
  }
}

export const getPublicProductItems = () =>
  getPublicCatalogItems('products', 'products.grid', defaultProductItems)

export const getPublicProductsPageContent = async (): Promise<ProductPageContent> => {
  const preview = readLocalPreview('products')
  if (preview) {
    const heroSection = preview.sections.find((item) => item.sectionKey === 'products.hero')
    const gridSection = preview.sections.find((item) => item.sectionKey === 'products.grid')
    return {
      heroTitle: heroSection?.title || defaultProductSectionCopy.heroTitle,
      heroSubtitle: heroSection?.body || defaultProductSectionCopy.heroSubtitle,
      sectionEyebrow: gridSection?.subtitle || defaultProductSectionCopy.sectionEyebrow,
      sectionTitle: gridSection?.title || defaultProductSectionCopy.sectionTitle,
      sectionDescription: gridSection?.body || defaultProductSectionCopy.sectionDescription,
      items: parseCatalogItems(gridSection?.contentJson, defaultProductItems),
    }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/products`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return { ...defaultProductSectionCopy, items: defaultProductItems }
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const heroSection = body.data.sections.find((item) => item.sectionKey === 'products.hero')
    const gridSection = body.data.sections.find((item) => item.sectionKey === 'products.grid')

    return {
      heroTitle: heroSection?.enabled && heroSection.title ? heroSection.title : defaultProductSectionCopy.heroTitle,
      heroSubtitle: heroSection?.enabled && heroSection.body ? heroSection.body : defaultProductSectionCopy.heroSubtitle,
      sectionEyebrow: gridSection?.enabled && gridSection.subtitle ? gridSection.subtitle : defaultProductSectionCopy.sectionEyebrow,
      sectionTitle: gridSection?.enabled && gridSection.title ? gridSection.title : defaultProductSectionCopy.sectionTitle,
      sectionDescription: gridSection?.enabled && gridSection.body ? gridSection.body : defaultProductSectionCopy.sectionDescription,
      items: gridSection?.enabled ? parseCatalogItems(gridSection.contentJson, defaultProductItems) : defaultProductItems,
    }
  } catch {
    return { ...defaultProductSectionCopy, items: defaultProductItems }
  }
}

export const getPublicModelItems = () =>
  getPublicCatalogItems('curtain-models', 'models.grid', defaultModelItems)

export const getPublicModelsPageContent = async (): Promise<ModelPageContent> => {
  const preview = readLocalPreview('curtain-models')
  if (preview) {
    const heroSection = preview.sections.find((item) => item.sectionKey === 'models.hero')
    const gridSection = preview.sections.find((item) => item.sectionKey === 'models.grid')
    return {
      heroTitle: heroSection?.title || defaultModelPageCopy.heroTitle,
      heroSubtitle: heroSection?.body || defaultModelPageCopy.heroSubtitle,
      sectionEyebrow: gridSection?.subtitle || defaultModelPageCopy.sectionEyebrow,
      sectionTitle: gridSection?.title || defaultModelPageCopy.sectionTitle,
      sectionDescription: gridSection?.body || defaultModelPageCopy.sectionDescription,
      items: parseCatalogItems(gridSection?.contentJson, defaultModelItems),
    }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/curtain-models`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return { ...defaultModelPageCopy, items: defaultModelItems }
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const heroSection = body.data.sections.find((item) => item.sectionKey === 'models.hero')
    const gridSection = body.data.sections.find((item) => item.sectionKey === 'models.grid')

    return {
      heroTitle: heroSection?.enabled && heroSection.title ? heroSection.title : defaultModelPageCopy.heroTitle,
      heroSubtitle: heroSection?.enabled && heroSection.body ? heroSection.body : defaultModelPageCopy.heroSubtitle,
      sectionEyebrow: gridSection?.enabled && gridSection.subtitle ? gridSection.subtitle : defaultModelPageCopy.sectionEyebrow,
      sectionTitle: gridSection?.enabled && gridSection.title ? gridSection.title : defaultModelPageCopy.sectionTitle,
      sectionDescription: gridSection?.enabled && gridSection.body ? gridSection.body : defaultModelPageCopy.sectionDescription,
      items: gridSection?.enabled ? parseCatalogItems(gridSection.contentJson, defaultModelItems) : defaultModelItems,
    }
  } catch {
    return { ...defaultModelPageCopy, items: defaultModelItems }
  }
}

export const getPublicCorporateItems = () =>
  getPublicCatalogItems('corporate-products', 'corporate.grid', defaultCorporateItems)

export const getPublicCorporatePageContent = async (): Promise<CorporatePageContent> => {
  const previewSection = readLocalPreviewSection('corporate-products', 'corporate.grid')
  if (previewSection) return {
    sectionEyebrow: previewSection.subtitle || defaultCorporateSectionCopy.sectionEyebrow,
    sectionTitle: previewSection.title || defaultCorporateSectionCopy.sectionTitle,
    sectionDescription: previewSection.body || defaultCorporateSectionCopy.sectionDescription,
    items: parseCatalogItems(previewSection.contentJson, defaultCorporateItems),
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/corporate-products`, { cache: 'no-store' })
    if (!response.ok) return { ...defaultCorporateSectionCopy, items: defaultCorporateItems }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'corporate.grid')
    if (!section?.enabled) return { ...defaultCorporateSectionCopy, items: defaultCorporateItems }

    return {
      sectionEyebrow: section.subtitle || defaultCorporateSectionCopy.sectionEyebrow,
      sectionTitle: section.title || defaultCorporateSectionCopy.sectionTitle,
      sectionDescription: section.body || defaultCorporateSectionCopy.sectionDescription,
      items: parseCatalogItems(section.contentJson, defaultCorporateItems),
    }
  } catch {
    return { ...defaultCorporateSectionCopy, items: defaultCorporateItems }
  }
}
import { readLocalPreview, readLocalPreviewSection } from '@/lib/localCmsPreview'
