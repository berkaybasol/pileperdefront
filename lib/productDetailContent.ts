const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
const getPublicApiBaseUrl = () => typeof window === 'undefined' ? API_BASE_URL : ''

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

export type ProductCategoryItem = {
  id: number
  title: string
  description: string
  image: string
  href: string
  enabled: boolean
}

export type ProductDetailContent = {
  heroEyebrow: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  categoryEyebrow: string
  categoryTitle: string
  categories: ProductCategoryItem[]
  ctaTitle: string
  ctaDescription: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export const defaultProductDetailContent: ProductDetailContent = {
  heroEyebrow: 'Mekanizmalı Sistemler',
  heroTitle: 'Mekanizmalı',
  heroHighlight: 'Perde Koleksiyonu',
  heroDescription:
    'Modern yaşam alanlarınız için pratik ve şık mekanizmalı perde sistemleri. 35 yıllık deneyimimizle, en kaliteli ürünleri sunuyoruz.',
  categoryEyebrow: 'Kategoriler',
  categoryTitle: 'Ürün Gruplarımız',
  categories: [
    {
      id: 1,
      title: 'Jaluzi Perde',
      description: 'Alüminyum, ahşap ve PVC jaluzi perde çeşitleri',
      image: '/api/public/media/images/36e65445-18c7-432e-9d43-d2afc1ad5567/file',
      href: '/urunler/mekanizmali-perdeler/jaluzi-perde',
      enabled: true,
    },
    {
      id: 2,
      title: 'Stor Perde',
      description: 'Blackout ve güneşlik stor perde sistemleri',
      image: '/api/public/media/images/e2a6e278-c000-4a7b-be76-b5e7e9cae1e3/file',
      href: '/urunler/mekanizmali-perdeler/stor-perde',
      enabled: true,
    },
    {
      id: 3,
      title: 'Dikey Perde',
      description: 'Ofis ve ev için dikey jaluziler',
      image: '/api/public/media/images/7bfcd13c-7349-4270-91e9-5540c6d8a84a/file',
      href: '/urunler/mekanizmali-perdeler/dikey-perde',
      enabled: true,
    },
    {
      id: 4,
      title: 'Zebra Perde',
      description: 'Modern ve şık zebra perde modelleri',
      image: '/api/public/media/images/463ad540-855a-459a-8d0f-23c040af83c2/file',
      href: '/urunler/mekanizmali-perdeler/zebra-perde',
      enabled: true,
    },
    {
      id: 5,
      title: 'Plise Perde',
      description: 'Katlanabilir plise perde sistemleri',
      image: '/api/public/media/images/4466d5ae-a827-4b07-bb27-5afb2e00cebb/file',
      href: '/urunler/mekanizmali-perdeler/plise-perde',
      enabled: true,
    },
    {
      id: 6,
      title: 'Cam Balkon Perdeleri',
      description: 'Balkon için özel perde çözümleri',
      image: '/api/public/media/images/32293b60-60ee-4947-b1b7-1b17f5b3af8f/file',
      href: '/urunler/mekanizmali-perdeler/cam-balkon-perdeleri',
      enabled: true,
    },
    {
      id: 7,
      title: 'Silhouette & Vision',
      description: 'Lüks ve zarif perde sistemleri',
      image: '/api/public/media/images/513ca252-0365-4494-90a3-73d3aa720bd0/file',
      href: '/urunler/mekanizmali-perdeler/silhouette-vision-perde',
      enabled: true,
    },
  ],
  ctaTitle: 'Mekanınız İçin Doğru Çözüm',
  ctaDescription:
    'Size en uygun mekanizmalı perde sistemini birlikte belirleyelim. Ücretsiz keşif hizmetimizden yararlanın.',
  primaryCtaLabel: 'Ücretsiz Keşif',
  primaryCtaHref: '/iletisim',
  secondaryCtaLabel: 'Tüm Ürünler',
  secondaryCtaHref: '/urunler',
}

export const defaultMekanizmaliPerdelerContent = defaultProductDetailContent

export const productDetailDefaults: Record<string, ProductDetailContent> = {
  'product-mekanizmali-perdeler': defaultMekanizmaliPerdelerContent,
  'product-tul-fon-perde': {
    heroEyebrow: 'Tül ve Fon Perde Koleksiyonu',
    heroTitle: 'Tül Perde',
    heroHighlight: 've Fon Perde',
    heroDescription:
      'Perdede en çok metrajı tül oluşturur. Fon perdeler ise mekanın karakterini belirleyen tamamlayıcı dekorasyon ürünleridir.',
    categoryEyebrow: 'Galeri',
    categoryTitle: 'Tül ve Fon Perde Modelleri',
    categories: [
      {
        id: 1,
        title: 'Modern Fon Perde',
        description: 'Modern yaşam alanları için zarif fon perde uygulamaları',
        image: '/api/public/media/images/ac111c41-9c23-4975-94bb-cab90e242037/file',
        href: '/urunler/tul-fon-perde/modern-fon-perde',
        enabled: true,
      },
      {
        id: 2,
        title: 'Desenli Fon Perde',
        description: 'Mekana karakter katan desenli kumaş alternatifleri',
        image: '/api/public/media/images/ae02ace1-0d00-465b-8009-ce717e0b7c21/file',
        href: '/urunler/tul-fon-perde/desenli-fon-perde',
        enabled: true,
      },
      {
        id: 3,
        title: 'Keten Fon Perde',
        description: 'Doğal dokulu, zamansız keten perde çözümleri',
        image: '/api/public/media/images/f62b8a1a-c83c-4c34-ac15-b04df465d062/file',
        href: '/urunler/tul-fon-perde/keten-fon-perde',
        enabled: true,
      },
    ],
    ctaTitle: 'Tül ve Fon Perde Hakkında Sorularınız mı var?',
    ctaDescription: 'Kumaş, renk ve ölçü seçeneklerini birlikte değerlendirelim.',
    primaryCtaLabel: 'Ücretsiz Keşif',
    primaryCtaHref: '/iletisim',
    secondaryCtaLabel: 'Tüm Ürünler',
    secondaryCtaHref: '/urunler',
  },
  'product-dosemelik-kumas': {
    heroEyebrow: 'Döşemelik Kumaş Koleksiyonu',
    heroTitle: 'Döşemelik',
    heroHighlight: 'Kumaş',
    heroDescription:
      'Koltuk, sandalye ve özel dekorasyon projeleri için dayanıklı, estetik ve zengin dokulu döşemelik kumaş seçenekleri.',
    categoryEyebrow: 'Galeri',
    categoryTitle: 'Döşemelik Kumaş Modelleri',
    categories: [
      {
        id: 1,
          title: 'Dokulu Kumaş',
          description: 'Günlük kullanıma uygun dayanıklı döşemelik kumaşlar',
          image: '/api/public/media/images/819c6a80-7dbe-4074-9934-dfdf8b903d8a/file',
          href: '/urunler/dosemelik-kumas/dokulu-kumas',
          enabled: true,
        },
        {
          id: 2,
          title: 'Kadife Kumaş',
          description: 'Yumuşak dokulu ve şık oturum alanları için',
          image: '/api/public/media/images/af895b9f-e223-4245-9330-35473741b667/file',
          href: '/urunler/dosemelik-kumas/kadife-kumas',
          enabled: true,
        },
        {
          id: 3,
          title: 'Desenli Kumaş',
          description: 'Projeye karakter veren desenli kumaş alternatifleri',
          image: '/api/public/media/images/098b3c8d-9069-467b-bc74-b59f93132820/file',
          href: '/urunler/dosemelik-kumas/desenli-kumas',
          enabled: true,
        },
    ],
    ctaTitle: 'Kumaş Seçimini Birlikte Yapalım',
    ctaDescription: 'Kullanım alanına, renk paletine ve dayanıklılık ihtiyacına göre doğru kumaşı belirleyelim.',
    primaryCtaLabel: 'Danışmanlık Al',
    primaryCtaHref: '/iletisim',
    secondaryCtaLabel: 'Tüm Ürünler',
    secondaryCtaHref: '/urunler',
  },
  'product-motorlu-perdeler': {
    heroEyebrow: 'Akıllı Sistemler',
    heroTitle: 'Motorlu',
    heroHighlight: 'Perde Sistemleri',
    heroDescription:
      'Uzaktan kumanda, otomasyon ve akıllı ev entegrasyonu ile perde sistemlerinizi kolayca kontrol edin.',
    categoryEyebrow: 'Kategoriler',
    categoryTitle: 'Motorlu Perde Ürün Gruplarımız',
    categories: [
      {
        id: 1,
        title: 'Projeksiyon Perde',
        description: 'Dış mekan projeksiyon perde sistemleri',
        image: '/api/public/media/images/9ae3d120-1399-40e0-81e2-47d274e6c2b8/file',
        href: '/urunler/motorlu-perdeler/projeksiyon-perde',
        enabled: true,
      },
      {
        id: 2,
        title: 'Zip Perde',
        description: 'Fermuarlı zip perde çözümleri',
        image: '/api/public/media/images/e4fd8217-6117-470f-b9d5-6726cc37991c/file',
        href: '/urunler/motorlu-perdeler/zip-perde',
        enabled: true,
      },
      {
        id: 3,
        title: 'Dış Cephe Jaluzi',
        description: 'Otomatik dış cephe jaluzi sistemleri',
        image: '/api/public/media/images/71c09054-b91f-4cd7-8441-63e34da98813/file',
        href: '/urunler/motorlu-perdeler/dis-cephe-jaluzi',
        enabled: true,
      },
    ],
    ctaTitle: 'Mekanınız İçin Motorlu Perde Çözümü',
    ctaDescription: 'Size en uygun motorlu perde sistemini birlikte belirleyelim.',
    primaryCtaLabel: 'Ücretsiz Keşif',
    primaryCtaHref: '/iletisim',
    secondaryCtaLabel: 'Tüm Ürünler',
    secondaryCtaHref: '/urunler',
  },
  'product-perde-aksesuarlari': {
    heroEyebrow: 'Tamamlayıcı Detaylar',
    heroTitle: 'Perde',
    heroHighlight: 'Aksesuarları',
    heroDescription:
      'Rustik, kol bağı, braçol ve dekoratif tamamlayıcılarla perde uygulamalarınızı bütünleyen aksesuar seçenekleri.',
    categoryEyebrow: 'Galeri',
    categoryTitle: 'Perde Aksesuar Modelleri',
    categories: [
      {
        id: 1,
        title: 'Rustik Takımları',
        description: 'Klasik ve modern dekorasyonlara uygun rustik seçenekleri',
        image: '/api/public/media/images/35d4d007-ea8e-4f37-9363-ad2ebfa75173/file',
        href: '/urunler/perde-aksesuarlari/rustik-takimlari',
        enabled: true,
      },
      {
        id: 2,
        title: 'Kol Bağı',
        description: 'Fon perde kullanımını şık biçimde tamamlayan aksesuarlar',
        image: '/api/public/media/images/970dff38-f4e6-4c7c-8dd1-03455630c5f6/file',
        href: '/urunler/perde-aksesuarlari/kol-bagi',
        enabled: true,
      },
      {
        id: 3,
        title: 'Braçol',
        description: 'Klasik ve avangart dekorasyona uyumlu tamamlayıcılar',
        image: '/api/public/media/images/636b83ba-f2a6-4902-9288-27675417e17a/file',
        href: '/urunler/perde-aksesuarlari/bracol',
        enabled: true,
      },
      {
        id: 4,
        title: 'Perde Bordürleri',
        description: 'Fon ve tül perdeleri tamamlayan dekoratif bordür modelleri ve özel tasarım uygulamaları.',
        image: '/api/public/media/images/2084b064-a137-4345-a475-6de8efd4328f/file',
        href: '/urunler/perde-aksesuarlari/perde-bordurleri',
        enabled: true,
      },
    ],
    ctaTitle: 'Perdenizi Detaylarla Tamamlayın',
    ctaDescription: 'Kumaş, model ve mekan stiline uygun aksesuar seçeneklerini birlikte değerlendirelim.',
    primaryCtaLabel: 'Aksesuar Seçimi İçin Görüş',
    primaryCtaHref: '/iletisim',
    secondaryCtaLabel: 'Tüm Ürünler',
    secondaryCtaHref: '/urunler',
  },
  'product-metal-zincir-perde': {
    heroEyebrow: 'Dekoratif Seperatörler',
    heroTitle: 'Metal Zincir',
    heroHighlight: 'Perde Seperatörler',
    heroDescription:
      'Metal zincir perde; ev, iş yeri ve ticari alanlarda şık bölücü ve dekoratif iç mekan çözümleri sunar.',
    categoryEyebrow: 'Galeri',
    categoryTitle: 'Metal Zincir Perde Modelleri',
    categories: [
      {
        id: 1,
        title: 'Metal Zincir Perde',
        description: 'Dekoratif iç mekan uygulamaları için zarif metal zincir sistemleri',
        image: '/api/public/media/images/ac0a3aee-b553-4521-ae13-386cb302e723/file',
        href: '/urunler/metal-zincir-perde/metal-zincir-perde',
        enabled: true,
      },
      {
        id: 2,
        title: 'Metal Zincir Seperatör',
        description: 'Alan bölücü olarak kullanılabilen özel ölçü çözümler',
        image: '/api/public/media/images/1743147b-da62-4e3e-9745-ae7d6523bcb5/file',
        href: '/urunler/metal-zincir-perde/metal-zincir-seperator',
        enabled: true,
      },
      {
        id: 3,
        title: 'Pro Collection',
        description: 'Ticari ve mimari projeler için dekoratif uygulamalar',
        image: '/api/public/media/images/5d0f3be6-6501-40b5-b44a-378c944d4c5f/file',
        href: '/urunler/metal-zincir-perde/pro-collection',
        enabled: true,
      },
    ],
    ctaTitle: 'Projenize Uygun Metal Zincir Perde',
    ctaDescription: 'Pencere, kapı veya alan bölücü ihtiyacına göre özel ölçü projelendirme yapalım.',
    primaryCtaLabel: 'Proje İçin Görüş',
    primaryCtaHref: '/iletisim',
    secondaryCtaLabel: 'Tüm Ürünler',
    secondaryCtaHref: '/urunler',
  },
}

export const parseProductDetailContent = (
  contentJson: string | null | undefined,
  fallback = defaultMekanizmaliPerdelerContent
): ProductDetailContent => {
  if (!contentJson) {
    return fallback
  }

  try {
    const parsed = JSON.parse(contentJson) as Partial<ProductDetailContent>
    const categories = Array.isArray(parsed.categories) && parsed.categories.length > 0
      ? parsed.categories.map((item, index) => ({
          id: Number(item.id) || index + 1,
          title: item.title || '',
          description: item.description || '',
          image: item.image || fallback.categories[index]?.image || '/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file',
          href: item.href || fallback.categories[index]?.href || '/iletisim',
          enabled: item.enabled !== false,
        }))
      : fallback.categories

    return {
      ...fallback,
      ...parsed,
      categories,
    }
  } catch {
    return fallback
  }
}

export const buildProductDetailContentJson = (content: ProductDetailContent) =>
  JSON.stringify(content, null, 2)

export const getMekanizmaliPerdelerContent = async () => {
  return getProductDetailContent('product-mekanizmali-perdeler')
}

export const getProductDetailContent = async (pageKey: string) => {
  const previewJson = readLocalPreviewSectionJson(pageKey, 'product.detail')
  if (previewJson) return parseProductDetailContent(previewJson, productDetailDefaults[pageKey] || defaultProductDetailContent)
  const fallback = productDetailDefaults[pageKey] || defaultProductDetailContent

  try {
    const response = await fetch(`${getPublicApiBaseUrl()}/api/public/cms/pages/${pageKey}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallback
    }

    const body = await response.json() as ApiResponse<CmsPage>
    const section = body.data.sections.find((item) => item.sectionKey === 'product.detail')
    if (!section || !section.enabled) {
      return fallback
    }

    const content = parseProductDetailContent(section.contentJson, fallback)
    return {
      ...content,
      categories: content.categories.filter((item) => item.enabled),
    }
  } catch {
    return fallback
  }
}
import { readLocalPreviewSectionJson } from '@/lib/localCmsPreview'
