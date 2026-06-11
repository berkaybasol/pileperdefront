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
    breadcrumbLabel: 'Klasik ve Avangart Perde',
    eyebrow: 'Model Perde Koleksiyonu',
    title: 'Klasik ve Avangart',
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
