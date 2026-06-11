const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

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

export const parseProductGalleryImages = (
  contentJson: string | null | undefined,
  fallbackImages: ProductGalleryImage[],
) => {
  if (!contentJson) {
    return fallbackImages
  }

  try {
    const parsed = JSON.parse(contentJson) as { images?: Partial<ProductGalleryImage>[] }
    if (!Array.isArray(parsed.images) || parsed.images.length === 0) {
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
      breadcrumbLabel: hero.breadcrumbLabel || fallbackCopy.breadcrumbLabel,
      eyebrow: hero.eyebrow || fallbackCopy.eyebrow,
      title: hero.title || fallbackCopy.title,
      highlightedTitle: hero.highlightedTitle || fallbackCopy.highlightedTitle,
      description: hero.description || fallbackCopy.description,
    }
  } catch {
    return fallbackCopy
  }
}

export const buildProductGalleryContentJson = (
  images: ProductGalleryImage[],
  hero?: ProductGalleryHeroCopy,
) =>
  JSON.stringify(hero ? { hero, images } : { images }, null, 2)

export const getPublicProductGallery = async (
  pageKey: string,
  fallbackImages: ProductGalleryImage[],
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/${pageKey}`, {
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

    return parseProductGalleryImages(section.contentJson, fallbackImages)
  } catch {
    return fallbackImages
  }
}

export const getPublicProductGalleryHeroCopy = async (
  pageKey: string,
  fallbackCopy: ProductGalleryHeroCopy,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/${pageKey}`, {
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
