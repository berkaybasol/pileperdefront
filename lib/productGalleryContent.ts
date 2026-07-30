const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
const getPublicApiBaseUrl = () => typeof window === 'undefined' ? API_BASE_URL : ''
import { readLocalPreviewSectionJson } from '@/lib/localCmsPreview'

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

type CmsSection = {
  sectionKey: string
  contentJson: string | null
  enabled: boolean
}

type CmsPage = {
  sections: CmsSection[]
}

export type ProductGalleryImage = {
  id: number
  src: string
  alt: string
  title: string
  enabled?: boolean
}

export type ProductGalleryHeroCopy = {
  breadcrumbLabel: string
  eyebrow: string
  title: string
  highlightedTitle: string
  description: string
}

export type ProductGalleryVideo = {
  title: string
  description: string
  youtubeUrl: string
  enabled?: boolean
}

export type ProductGalleryHeading = {
  galleryEyebrow: string
  galleryTitle: string
}

export const productGalleryLocaleCodes = ['tr', 'en', 'de', 'es', 'ar'] as const
export type ProductGalleryLocale = typeof productGalleryLocaleCodes[number]
export type LocalizedProductGalleryText = Partial<Record<ProductGalleryLocale | string, string>>
export type LocalizedProductGalleryHeading = {
  galleryEyebrow?: LocalizedProductGalleryText
  galleryTitle?: LocalizedProductGalleryText
}

export type ProductVideoGalleryItem = {
  id: string
  title: LocalizedProductGalleryText
  description: LocalizedProductGalleryText
  youtubeUrl: string
  enabled: boolean
  sortOrder: number
}

export type ProductVideoGallery = {
  eyebrow: LocalizedProductGalleryText
  title: LocalizedProductGalleryText
  videos: ProductVideoGalleryItem[]
}

export const defaultProductVideoGallery: ProductVideoGallery = {
  eyebrow: { tr: 'VİDEO GALERİSİ' },
  title: { tr: 'Motorlu Perde Videoları' },
  videos: [],
}

export const defaultProductGalleryVideo: ProductGalleryVideo = {
  title: 'Nasıl Çalışır?',
  description: '',
  youtubeUrl: '',
  enabled: false,
}

const productGalleryDefaultHeroCopies: Record<string, ProductGalleryHeroCopy> = {
  'product-gallery-model-perdeler-modern-perde': {
    breadcrumbLabel: 'Modern Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Modern',
    highlightedTitle: 'Perde Modelleri',
    description: 'Modern perde; çağdaş tasarım ve genellikle nötr renkleri içeren modern bir tarzdır. Temiz çizgiler ve doğal malzemeler tercih edilen modern perdeler, sadeliği ve klasik zarafeti ile popülerdir.',
  },
  'product-gallery-model-perdeler-kruvaze-perde': {
    breadcrumbLabel: 'Kruvaze Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Kruvaze',
    highlightedTitle: 'Perde Modelleri',
    description: 'Kruvaze perde; tül perdelere ek olarak dikilen ve iki kanattan meydana gelen ve bunun yanında mekanizmalı ya da mekanizmasız çekilen ipleri ile büzüşerek estetik bir görünüm ortaya koyan perde çeşidi olarak tanımlanır. Bu modelin arkasında güneşlik olarak daha çok stor perde çeşitleri kullanılır.',
  },
  'product-gallery-model-perdeler-klasik-ve-avangart-perde': {
    breadcrumbLabel: 'Klasik Perde Modelleri',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Klasik',
    highlightedTitle: 'Perde Modelleri',
    description: 'Dekorasyonu tamamlayan, bir mekanın modern veya klasik olmasında belirleyici unsur, perde seçimidir. Perde, dekorasyonun karakterini değiştirebilecek etkiye sahiptir. Perdelerin rengi, modeli, detayları mekanın bütünlüğüne ciddi anlamda katkı sağlamaktadır.',
  },
  'product-gallery-model-perdeler-rustikli-perde': {
    breadcrumbLabel: 'Rustikli Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Rustik',
    highlightedTitle: 'Perde Modelleri',
    description: 'Rustik kelime anlamı olarak, perde asma işlemidir. Perdelerin kornişe ihtiyaç duymadan asıldığı silindire verilen isimdir. Bu silindir çeşitleri; farklı renklerdeki ahşap (ahşap rustik), sarı ya da krom rengi pirinçten (pirinç rustik) yapılır.',
  },
  'product-gallery-model-perdeler-katlamali-perde': {
    breadcrumbLabel: 'Katlamalı Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Katlamalı',
    highlightedTitle: 'Perde Modelleri',
    description: 'Katlamalı perde; tül perdelere ek olarak dikilen ve iki kanattan meydana gelen ve bunun yanında mekanizmalı ya da mekanizmasız çekilen ipleri ile büzüşerek estetik bir görünüm ortaya koyan perde çeşidi olarak tanımlanır. Bu modelin arkasında güneşlik olarak daha çok stor perde çeşitleri kullanılır.',
  },
  'product-gallery-model-perdeler-ip-perde': {
    breadcrumbLabel: 'İp Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'İp',
    highlightedTitle: 'Perde Modelleri',
    description: 'İp Perde tek başına kullanıldığında standart bir tül perdenin işlevini görür, dışarından içeriye giren ışık miktarı tülle aynıdır. 10 metre yükseklikte dilediğiniz genişlikte ve özel ölçülerde üretilebilmektedir. Birçok değişik türde İp Perde modeli vardır.',
  },
  'product-gallery-model-perdeler-yuksek-tavanli-galeri-perde': {
    breadcrumbLabel: 'Yüksek Tavanlı Galeri Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Yüksek Tavanlı Galeri',
    highlightedTitle: 'Perde Modelleri',
    description: 'Son zamanlarda sıkça karşılaştığımız yüksek tavanlı galeri pencereleri standart pencelerden daha yüksek olduğundan dolayı çok daha başarılı perde modelleri ortaya çıkmaktadır. Pile Perde olarak, öncelikle tasarım aşamasında mekanın yüksekliğine büyüklüğüne ve sizin beklentilerinize göre çeşitli tespitler yapıp, profesyonel tasarım ekibimiz tarafından dekorasyonunuzun konseptine göre perde modellemesi oluştururuz.',
  },
  'product-gallery-model-perdeler-balon-perde': {
    breadcrumbLabel: 'Balon Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Balon',
    highlightedTitle: 'Perde Modelleri',
    description: 'Balon perde; tül perdelere ek olarak dikilen ve iki kanattan meydana gelen ve bunun yanında mekanizmalı ya da mekanizmasız çekilen ipleri ile büzüşerek estetik bir görünüm ortaya koyan perde çeşidi olarak tanımlanır. Bu modelin arkasında güneşlik olarak daha çok stor perde çeşitleri kullanılır.',
  },
  'product-gallery-model-perdeler-cati-kati-perde': {
    breadcrumbLabel: 'Çatı Katı Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Çatı Katı',
    highlightedTitle: 'Perde Modelleri',
    description: 'Çatı Katı Perdeleri, çatılardaki üçgen ve eğimli pencerelerde kullanılan hareketli ya da sabit perdelerdir. Pencere yapınıza göre farklı perde sistemleri uygulanabilir ve hem ışığı hem de oda ısısını rahatça düzenleyebileceğiniz konforlu bir alan sağlanabilir.',
  },
  'product-gallery-model-perdeler-kis-bahcesi-perde': {
    breadcrumbLabel: 'Kış Bahçesi Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Kış Bahçesi Perde',
    highlightedTitle: 'Perde Modelleri',
    description: 'Yeni bir yaşam tarzı olarak hayatımıza giren kış bahçeleri (winter garden), dekorasyon zenginliği yaratan perde sistemleriyle keyifli mekanlar haline geldi. Esnek formları sayesinde hem fonksiyonel hem de şık sistemlerdir.',
  },
  'product-gallery-model-perdeler-cocuk-perde': {
    breadcrumbLabel: 'Çocuk Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'İp',
    highlightedTitle: 'Perde Modelleri',
    description: 'Perdelere Masalsı Bir Dokunuş... Pile Perde Çocuk Koleksiyonumuz; çocuklarınızın sağlığı ve güvenliği için tüm gereklerin düşünüldüğü, tamamı antibakteriyel olan, geniş tarz ve model çeşitliliğine sahip özel bir koleksiyondur.',
  },
  'product-gallery-model-perdeler-cibinlik-perde': {
    breadcrumbLabel: 'Cibinlik Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Cibinlik',
    highlightedTitle: 'Perde Modelleri',
    description: 'Eski dönemlerde cibinlik, lüks ve ihtişam sembolü olarak kabul edildiği için özellikle yatak odalarının dekorasyonlarında vazgeçilmez bir öğeydi. Günümüzde, klasik/modern yatak odası ve çocuk odalarında dekoratif Cibinlik Perde çokça tercih ediliyor.',
  },
}

export const getProductGalleryDefaultHeroCopy = (pageKey: string, fallbackLabel = 'Ürün') =>
  productGalleryDefaultHeroCopies[pageKey] || {
    breadcrumbLabel: fallbackLabel,
    eyebrow: 'Ürün Koleksiyonu',
    title: fallbackLabel,
    highlightedTitle: 'Modelleri',
    description: '',
  }

export const parseProductGalleryImages = (
  contentJson: string | null | undefined,
  fallbackImages: ProductGalleryImage[],
  allowEmpty = false,
) => {
  if (!contentJson) {
    return fallbackImages
  }

  try {
    const parsed = JSON.parse(contentJson) as { images?: Partial<ProductGalleryImage>[] }
    if (!Array.isArray(parsed.images) || (!allowEmpty && parsed.images.length === 0)) {
      return fallbackImages
    }

    return parsed.images
      .map((image, index) => {
        const fallback = fallbackImages[index]
        return {
          id: Number(image.id) || fallback?.id || index + 1,
          src: image.src || fallback?.src || '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
          alt: image.alt || fallback?.alt || image.title || fallback?.title || 'Pile Perde ürün görseli',
          title: image.title || fallback?.title || image.alt || fallback?.alt || 'Ürün görseli',
          enabled: image.enabled !== false,
        }
      })
      .filter((image) => image.enabled !== false)
  } catch {
    return fallbackImages
  }
}

export const parseProductGalleryHeroCopy = (
  contentJson: string | null | undefined,
  fallbackCopy: ProductGalleryHeroCopy,
) => {
  if (!contentJson) {
    return fallbackCopy
  }

  try {
    const parsed = JSON.parse(contentJson) as { hero?: Partial<ProductGalleryHeroCopy> }
    const hero = parsed.hero || {}

    return {
      breadcrumbLabel: hero.breadcrumbLabel ?? fallbackCopy.breadcrumbLabel,
      eyebrow: hero.eyebrow ?? fallbackCopy.eyebrow,
      title: hero.title ?? fallbackCopy.title,
      highlightedTitle: hero.highlightedTitle ?? fallbackCopy.highlightedTitle,
      description: hero.description ?? fallbackCopy.description,
    }
  } catch {
    return fallbackCopy
  }
}

export const parseProductGalleryVideo = (
  contentJson: string | null | undefined,
  fallbackVideo: ProductGalleryVideo = defaultProductGalleryVideo,
) => {
  if (!contentJson) {
    return fallbackVideo
  }

  try {
    const parsed = JSON.parse(contentJson) as { video?: Partial<ProductGalleryVideo> }
    const video = parsed.video || {}

    return {
      title: video.title ?? fallbackVideo.title,
      description: video.description ?? fallbackVideo.description,
      youtubeUrl: video.youtubeUrl || fallbackVideo.youtubeUrl,
      enabled: video.enabled === true,
    }
  } catch {
    return fallbackVideo
  }
}

const normalizeLocalizedProductGalleryText = (
  value: unknown,
): LocalizedProductGalleryText => {
  if (typeof value === 'string') {
    return { tr: value }
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  )
}

export const getLocalizedProductGalleryText = (
  value: LocalizedProductGalleryText | undefined,
  locale: ProductGalleryLocale = 'tr',
  fallback = '',
) => value && Object.prototype.hasOwnProperty.call(value, locale)
  ? value[locale] as string
  : fallback

export const setLocalizedProductGalleryText = (
  value: LocalizedProductGalleryText | undefined,
  locale: ProductGalleryLocale,
  text: string,
): LocalizedProductGalleryText => ({
  ...value,
  [locale]: text,
})

export const parseProductVideoGallery = (
  contentJson: string | null | undefined,
  fallbackGallery: ProductVideoGallery = defaultProductVideoGallery,
): ProductVideoGallery => {
  if (!contentJson) {
    return fallbackGallery
  }

  try {
    const parsed = JSON.parse(contentJson) as {
      videoGallery?: {
        eyebrow?: unknown
        title?: unknown
        videos?: Array<{
          id?: unknown
          title?: unknown
          description?: unknown
          youtubeUrl?: unknown
          enabled?: unknown
          sortOrder?: unknown
        }>
      }
    }
    if (!parsed.videoGallery || typeof parsed.videoGallery !== 'object') {
      return fallbackGallery
    }

    const storedGallery = parsed.videoGallery
    const videos = Array.isArray(storedGallery.videos)
      ? storedGallery.videos.map((video, index) => ({
        id: typeof video.id === 'string' && video.id.trim()
          ? video.id
          : `video-${index + 1}`,
        title: normalizeLocalizedProductGalleryText(video.title),
        description: normalizeLocalizedProductGalleryText(video.description),
        youtubeUrl: typeof video.youtubeUrl === 'string' ? video.youtubeUrl : '',
        enabled: video.enabled !== false,
        sortOrder: Number.isFinite(Number(video.sortOrder)) ? Number(video.sortOrder) : index,
      })).sort((a, b) => a.sortOrder - b.sortOrder)
      : []

    return {
      eyebrow: storedGallery.eyebrow === undefined
        ? fallbackGallery.eyebrow
        : normalizeLocalizedProductGalleryText(storedGallery.eyebrow),
      title: storedGallery.title === undefined
        ? fallbackGallery.title
        : normalizeLocalizedProductGalleryText(storedGallery.title),
      videos,
    }
  } catch {
    return fallbackGallery
  }
}

export const hasStoredProductVideoGallery = (
  contentJson: string | null | undefined,
) => {
  if (!contentJson) return false
  try {
    const parsed = JSON.parse(contentJson) as Record<string, unknown>
    return Object.prototype.hasOwnProperty.call(parsed, 'videoGallery')
  } catch {
    return false
  }
}

export const parseProductGalleryHeading = (
  contentJson: string | null | undefined,
  fallbackHeading: ProductGalleryHeading,
  locale: ProductGalleryLocale = 'tr',
) => {
  if (!contentJson) {
    return fallbackHeading
  }

  try {
    const storedHeading = getStoredProductGalleryHeading(contentJson)
    const storedEyebrow = storedHeading.galleryEyebrow
    const storedTitle = storedHeading.galleryTitle

    return {
      galleryEyebrow: storedEyebrow && Object.prototype.hasOwnProperty.call(storedEyebrow, locale)
        ? storedEyebrow[locale] as string
        : fallbackHeading.galleryEyebrow,
      galleryTitle: storedTitle && Object.prototype.hasOwnProperty.call(storedTitle, locale)
        ? storedTitle[locale] as string
        : fallbackHeading.galleryTitle,
    }
  } catch {
    return fallbackHeading
  }
}

export const getStoredProductGalleryHeading = (
  contentJson: string | null | undefined,
): LocalizedProductGalleryHeading => {
  if (!contentJson) {
    return {}
  }

  try {
    const parsed = JSON.parse(contentJson) as {
      galleryEyebrow?: string | Record<string, unknown>
      galleryTitle?: string | Record<string, unknown>
    }
    const heading: LocalizedProductGalleryHeading = {}
    const normalizeField = (field: string | Record<string, unknown> | undefined) => {
      if (typeof field === 'string') {
        return { tr: field }
      }
      if (!field || typeof field !== 'object' || Array.isArray(field)) {
        return undefined
      }

      return Object.fromEntries(
        Object.entries(field).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
      )
    }
    const galleryEyebrow = normalizeField(parsed.galleryEyebrow)
    const galleryTitle = normalizeField(parsed.galleryTitle)

    if (galleryEyebrow) heading.galleryEyebrow = galleryEyebrow
    if (galleryTitle) heading.galleryTitle = galleryTitle

    return heading
  } catch {
    return {}
  }
}

export const mergeProductGalleryHeadingLocale = (
  storedHeading: LocalizedProductGalleryHeading,
  locale: ProductGalleryLocale,
  heading: Partial<ProductGalleryHeading>,
): LocalizedProductGalleryHeading => ({
  ...(heading.galleryEyebrow !== undefined
    ? { galleryEyebrow: { ...storedHeading.galleryEyebrow, [locale]: heading.galleryEyebrow } }
    : storedHeading.galleryEyebrow ? { galleryEyebrow: storedHeading.galleryEyebrow } : {}),
  ...(heading.galleryTitle !== undefined
    ? { galleryTitle: { ...storedHeading.galleryTitle, [locale]: heading.galleryTitle } }
    : storedHeading.galleryTitle ? { galleryTitle: storedHeading.galleryTitle } : {}),
})

export const buildProductGalleryContentJson = (
  images: ProductGalleryImage[],
  hero?: ProductGalleryHeroCopy,
  video?: ProductGalleryVideo,
  heading?: LocalizedProductGalleryHeading,
  videoGallery?: ProductVideoGallery,
) =>
  JSON.stringify({
    ...(hero ? { hero } : {}),
    ...(video ? { video } : {}),
    ...(heading || {}),
    ...(videoGallery ? { videoGallery } : {}),
    images,
  }, null, 2)

const youtubeVideoIdPattern = /^[A-Za-z0-9_-]{11}$/

export const getYouTubeVideoId = (youtubeUrl: string) => {
  const value = youtubeUrl.trim()
  if (!value) {
    return ''
  }

  try {
    const normalizedValue = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`
    const url = new URL(normalizedValue)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    let videoId = ''

    if (host === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] || ''
    } else if (['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v') || ''
      } else {
        const [, route, id] = url.pathname.split('/')
        if (['embed', 'shorts', 'live'].includes(route)) {
          videoId = id || ''
        }
      }
    }

    return youtubeVideoIdPattern.test(videoId) ? videoId : ''
  } catch {
    return ''
  }
}

export const getYouTubeEmbedUrl = (youtubeUrl: string) => {
  const videoId = getYouTubeVideoId(youtubeUrl)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
}

export const getYouTubeNoCookieEmbedUrl = (youtubeUrl: string) => {
  const videoId = getYouTubeVideoId(youtubeUrl)
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
}

export const getPublicProductGallery = async (
  pageKey: string,
  fallbackImages: ProductGalleryImage[],
  allowEmpty = false,
) => {
  const previewJson = readLocalPreviewSectionJson(pageKey, 'product.gallery')
  if (previewJson) return parseProductGalleryImages(previewJson, fallbackImages, allowEmpty)
  try {
    const response = await fetch(`${getPublicApiBaseUrl()}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallbackImages
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'product.gallery')
    if (!section || !section.enabled) {
      return fallbackImages
    }

    return parseProductGalleryImages(section.contentJson, fallbackImages, allowEmpty)
  } catch {
    return fallbackImages
  }
}

export const getPublicProductGalleryHeroCopy = async (
  pageKey: string,
  fallbackCopy: ProductGalleryHeroCopy,
) => {
  const previewJson = readLocalPreviewSectionJson(pageKey, 'product.gallery')
  if (previewJson) return parseProductGalleryHeroCopy(previewJson, fallbackCopy)
  try {
    const response = await fetch(`${getPublicApiBaseUrl()}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallbackCopy
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'product.gallery')
    if (!section || !section.enabled) {
      return fallbackCopy
    }

    return parseProductGalleryHeroCopy(section.contentJson, fallbackCopy)
  } catch {
    return fallbackCopy
  }
}

export const getPublicProductGalleryVideo = async (
  pageKey: string,
  fallbackVideo: ProductGalleryVideo = defaultProductGalleryVideo,
) => {
  const previewJson = readLocalPreviewSectionJson(pageKey, 'product.gallery')
  if (previewJson) return parseProductGalleryVideo(previewJson, fallbackVideo)
  try {
    const response = await fetch(`${getPublicApiBaseUrl()}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallbackVideo
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'product.gallery')
    if (!section || !section.enabled) {
      return fallbackVideo
    }

    return parseProductGalleryVideo(section.contentJson, fallbackVideo)
  } catch {
    return fallbackVideo
  }
}

export const getPublicProductVideoGallery = async (
  pageKey: string,
  fallbackGallery: ProductVideoGallery = defaultProductVideoGallery,
) => {
  const previewJson = readLocalPreviewSectionJson(pageKey, 'product.gallery')
  if (previewJson) return parseProductVideoGallery(previewJson, fallbackGallery)
  try {
    const response = await fetch(`${getPublicApiBaseUrl()}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallbackGallery
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'product.gallery')
    if (!section || !section.enabled) {
      return fallbackGallery
    }

    return parseProductVideoGallery(section.contentJson, fallbackGallery)
  } catch {
    return fallbackGallery
  }
}

export const getPublicProductGalleryHeading = async (
  pageKey: string,
  fallbackHeading: ProductGalleryHeading,
  locale: ProductGalleryLocale = 'tr',
) => {
  const previewJson = readLocalPreviewSectionJson(pageKey, 'product.gallery')
  if (previewJson) return parseProductGalleryHeading(previewJson, fallbackHeading, locale)
  try {
    const response = await fetch(`${getPublicApiBaseUrl()}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallbackHeading
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'product.gallery')
    if (!section || !section.enabled) {
      return fallbackHeading
    }

    return parseProductGalleryHeading(section.contentJson, fallbackHeading, locale)
  } catch {
    return fallbackHeading
  }
}
