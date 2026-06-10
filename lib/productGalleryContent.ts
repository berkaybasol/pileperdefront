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

export type ProductGalleryPageContent = {
  eyebrow: string
  title: string
  highlight: string
  description: string
  galleryEyebrow: string
  galleryTitle: string
  images: ProductGalleryImage[]
}

export type ProductGalleryPageFallback = Omit<ProductGalleryPageContent, 'images'> & {
  images?: ProductGalleryImage[]
}

const defaultPageText = {
  eyebrow: 'Ürün Koleksiyonu',
  title: 'Ürün',
  highlight: 'Modelleri',
  description: 'Pile Perde ürün ve uygulama görsellerini inceleyin.',
  galleryEyebrow: 'Ürün Galerisi',
  galleryTitle: 'Ürün Modelleri',
}

export const buildProductGalleryFallback = (
  title: string,
  description: string,
  images: ProductGalleryImage[],
  eyebrow?: string,
  galleryTitle = `${title} Modelleri`,
): ProductGalleryPageContent => ({
  eyebrow: eyebrow || `${title} Koleksiyonu`,
  title,
  highlight: '',
  description,
  galleryEyebrow: 'Ürün Galerisi',
  galleryTitle,
  images,
})

export const parseProductGalleryContent = (
  contentJson: string | null | undefined,
  fallback: ProductGalleryPageFallback,
): ProductGalleryPageContent => {
  const fallbackImages = fallback.images || []

  if (!contentJson) {
    return {
      ...defaultPageText,
      ...fallback,
      images: fallbackImages,
    }
  }

  try {
    const parsed = JSON.parse(contentJson) as Partial<ProductGalleryPageContent> & {
      images?: Partial<ProductGalleryImage>[]
    }

    return {
      ...defaultPageText,
      ...fallback,
      eyebrow: parsed.eyebrow || fallback.eyebrow || defaultPageText.eyebrow,
      title: parsed.title || fallback.title || defaultPageText.title,
      highlight: parsed.highlight ?? fallback.highlight ?? defaultPageText.highlight,
      description: parsed.description || fallback.description || defaultPageText.description,
      galleryEyebrow: parsed.galleryEyebrow || fallback.galleryEyebrow || defaultPageText.galleryEyebrow,
      galleryTitle: parsed.galleryTitle || fallback.galleryTitle || defaultPageText.galleryTitle,
      images: parseProductGalleryImages(contentJson, fallbackImages),
    }
  } catch {
    return {
      ...defaultPageText,
      ...fallback,
      images: fallbackImages,
    }
  }
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

export const buildProductGalleryContentJson = (
  images: ProductGalleryImage[],
  pageContent?: Omit<ProductGalleryPageContent, 'images'>,
) =>
  JSON.stringify({ ...pageContent, images }, null, 2)

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

export const getPublicProductGalleryContent = async (
  pageKey: string,
  fallback: ProductGalleryPageContent,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallback
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'product.gallery')
    if (!section || !section.enabled) {
      return fallback
    }

    return parseProductGalleryContent(section.contentJson, fallback)
  } catch {
    return fallback
  }
}
