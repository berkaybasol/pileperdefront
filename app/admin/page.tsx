'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  buildCatalogContentJson,
  defaultCorporateItems,
  defaultModelPageCopy,
  defaultModelItems,
  defaultProductItems,
  defaultProductSectionCopy,
  parseCatalogItems,
  type CatalogItem,
} from '@/lib/catalogContent'
import {
  buildProductDetailContentJson,
  defaultMekanizmaliPerdelerContent,
  parseProductDetailContent,
  type ProductCategoryItem,
  type ProductDetailContent,
} from '@/lib/productDetailContent'
import {
  buildBlogContentJson,
  defaultBlogPosts,
  parseBlogPosts,
  type BlogPost,
} from '@/lib/blogContent'
import {
  buildProductGalleryContentJson,
  parseProductGalleryHeroCopy,
  parseProductGalleryImages,
  parseProductGalleryVideo,
  type ProductGalleryImage,
  type ProductGalleryHeroCopy,
  type ProductGalleryVideo,
} from '@/lib/productGalleryContent'
import { runVerifiedSave, SaveVerificationError } from '@/lib/adminVerifiedSave'
import { revalidateCmsPage } from './actions'
import { createLocalPreview } from '@/lib/localCmsPreview'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

type AdminLoginResponse = {
  token: string
  tokenType: string
  expiresInSeconds: number
  email: string
}

type PageResult<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

type CmsPageStatus = 'DRAFT' | 'PUBLISHED'

type CmsPageSummary = {
  id: string
  pageKey: string
  slug: string
  title: string
  status: CmsPageStatus
  updatedAt: string
}

type CmsSection = {
  id: string
  sectionKey: string
  sectionType: string
  title: string | null
  subtitle: string | null
  body: string | null
  contentJson: string | null
  sortOrder: number
  enabled: boolean
}

type ProductGalleryAdminPage = {
  pageKey: string
  label: string
  href?: string
}

type CmsPageDetail = {
  id: string
  pageKey: string
  slug: string
  title: string
  seoTitle: string | null
  seoDescription: string | null
  status: CmsPageStatus
  sections: CmsSection[]
}

type AdminCredentials = {
  email: string
  password: string
}

type AdminPanel =
  | 'home'
  | 'about'
  | 'curtainModels'
  | 'corporateProducts'
  | 'blog'
  | 'products'
  | 'mechanized'
  | 'tulFon'
  | 'dosemelik'
  | 'motorlu'
  | 'accessories'
  | 'metalChain'
  | 'productGalleries'
  | 'media'
  | 'leads'
  | 'settings'

type HeroSlideForm = {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  link: string
  enabled: boolean
}

type HeroStatForm = {
  number: string
  label: string
  suffix: string
}

type AboutTabForm = {
  key: string
  title: string
  content: string
}

type AboutStatForm = {
  number: string
  label: string
  suffix: string
}

type AboutForm = {
  heroEyebrow: string
  heroTitle: string
  heroDescription: string
  eyebrow: string
  title: string
  lead: string
  image: string
  imageAlt: string
  experienceLabel: string
  ctaLabel: string
  ctaHref: string
  tabs: AboutTabForm[]
  services: string[]
  stats: AboutStatForm[]
}

type ProductsPageCopyForm = {
  heroTitle: string
  heroSubtitle: string
  sectionEyebrow: string
  sectionTitle: string
  sectionDescription: string
}

type ModelsPageCopyForm = {
  heroTitle: string
  heroSubtitle: string
}

type MediaAsset = {
  id: string
  fileName: string
  mimeType: string
  sizeBytes: number
  width: number | null
  height: number | null
  title: string | null
  altText: string | null
  publicUrl: string
  status: 'UPLOADING' | 'READY' | 'FAILED' | 'ARCHIVED'
}

type SiteSetting = {
  id: string
  settingKey: string
  settingValue: string
  valueType: string
  groupName: string
  description: string | null
  updatedAt: string
}

type ContactRequestStatus = 'NEW' | 'CONTACTED' | 'WON' | 'LOST' | 'SPAM'

type ContactRequestItem = {
  id: string
  name: string
  phone: string
  email: string | null
  message: string
  sourcePage: string | null
  status: ContactRequestStatus
  adminNote: string | null
  createdAt: string
  updatedAt: string
}

type CmsSectionForm = {
  sectionType: string
  title: string
  subtitle: string
  body: string
  contentJson: string
  sortOrder: number
  enabled: boolean
}

type BlogContentBlock = {
  id: number
  type: 'heading' | 'paragraph' | 'list'
  text: string
}

const emptyCredentials: AdminCredentials = {
  email: 'admin@pileperde.com.tr',
  password: '',
}

const editableSettingKeys = [
  'company.phone.primary',
  'company.whatsapp.primary',
  'company.email',
  'company.address.showroom',
  'company.maps.url',
  'company.hours.weekday',
  'company.hours.sunday',
] as const

const settingLabels: Record<(typeof editableSettingKeys)[number], string> = {
  'company.phone.primary': 'Telefon',
  'company.whatsapp.primary': 'WhatsApp',
  'company.email': 'E-posta',
  'company.address.showroom': 'Showroom adresi',
  'company.maps.url': 'Google Maps linki',
  'company.hours.weekday': 'Hafta ici / Cumartesi',
  'company.hours.sunday': 'Pazar',
}

const contactStatusLabels: Record<ContactRequestStatus, string> = {
  NEW: 'Yeni',
  CONTACTED: 'Görüşüldü',
  WON: 'Kazanıldı',
  LOST: 'Kaybedildi',
  SPAM: 'Spam',
}

const contactStatusOptions = Object.keys(contactStatusLabels) as ContactRequestStatus[]

const slugifyBlogTitle = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const buildBlogHref = (slug: string) => `/blog/${slug || 'yeni-blog-yazisi'}`

const makeUniqueBlogSlug = (baseSlug: string, posts: BlogPost[], ignoredPostId?: number) => {
  const safeBaseSlug = baseSlug || 'yeni-blog-yazisi'
  const usedSlugs = new Set(
    posts
      .filter((post) => post.id !== ignoredPostId)
      .map((post) => post.slug)
      .filter(Boolean)
  )

  if (!usedSlugs.has(safeBaseSlug)) {
    return safeBaseSlug
  }

  let counter = 2
  let nextSlug = `${safeBaseSlug}-${counter}`
  while (usedSlugs.has(nextSlug)) {
    counter += 1
    nextSlug = `${safeBaseSlug}-${counter}`
  }

  return nextSlug
}

const decodeBlogText = (value: string) =>
  value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const cleanBlogText = (value: string) =>
  decodeBlogText(
    value
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '')
  ).trim()

const escapeBlogHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const parseBlogContentBlocks = (content: string): BlogContentBlock[] => {
  const blocks: BlogContentBlock[] = []
  const blockPattern = /<(h2|h3|p|ul)[^>]*>([\s\S]*?)<\/\1>/gi
  let match = blockPattern.exec(content)

  while (match) {
    const [, tagName, innerHtml] = match
    if (tagName === 'ul') {
      const items = Array.from(innerHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
        .map((item) => cleanBlogText(item[1]))
        .filter(Boolean)

      if (items.length > 0) {
        blocks.push({
          id: blocks.length + 1,
          type: 'list',
          text: items.join('\n'),
        })
      }
    } else {
      const text = cleanBlogText(innerHtml)
      if (text) {
        blocks.push({
          id: blocks.length + 1,
          type: tagName === 'p' ? 'paragraph' : 'heading',
          text,
        })
      }
    }

    match = blockPattern.exec(content)
  }

  if (blocks.length > 0) {
    return blocks
  }

  const plainTextBlocks = cleanBlogText(content)
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean)

  if (plainTextBlocks.length === 0) {
    return [{ id: 1, type: 'paragraph', text: '' }]
  }

  return plainTextBlocks.map((text, index) => ({
    id: index + 1,
    type: 'paragraph',
    text,
  }))
}

const buildBlogArticleContent = (blocks: BlogContentBlock[]) =>
  blocks
    .map((block) => {
      const text = block.text.trim()
      if (!text) {
        return ''
      }

      if (block.type === 'heading') {
        return `<h2>${escapeBlogHtml(text)}</h2>`
      }

      if (block.type === 'list') {
        const items = text
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean)

        if (items.length === 0) {
          return ''
        }

        return `<ul>${items.map((item) => `<li>${escapeBlogHtml(item)}</li>`).join('')}</ul>`
      }

      return `<p>${escapeBlogHtml(text).replace(/\n/g, '<br />')}</p>`
    })
    .filter(Boolean)
    .join('')

const productDetailAdminPages = [
  { panel: 'mechanized', pageKey: 'product-mekanizmali-perdeler', label: 'Mekanizmalı Perdeler' },
  { panel: 'tulFon', pageKey: 'product-tul-fon-perde', label: 'Tül ve Fon Perde' },
  { panel: 'dosemelik', pageKey: 'product-dosemelik-kumas', label: 'Döşemelik Kumaş' },
  { panel: 'motorlu', pageKey: 'product-motorlu-perdeler', label: 'Motorlu Perdeler' },
  { panel: 'accessories', pageKey: 'product-perde-aksesuarlari', label: 'Perde Aksesuarları' },
  { panel: 'metalChain', pageKey: 'product-metal-zincir-perde', label: 'Metal Zincir Perde' },
] as const

const productDetailPanels = productDetailAdminPages.map((item) => item.panel) as AdminPanel[]

const productGalleryAdminPages = [
  { pageKey: 'product-gallery-model-perdeler-modern-perde', label: 'Modern Perde' },
  { pageKey: 'product-gallery-model-perdeler-kruvaze-perde', label: 'Kruvaze Perde' },
  { pageKey: 'product-gallery-model-perdeler-klasik-ve-avangart-perde', label: 'Klasik ve Avangart Perde' },
  { pageKey: 'product-gallery-model-perdeler-rustikli-perde', label: 'Rustikli Perde' },
  { pageKey: 'product-gallery-model-perdeler-katlamali-perde', label: 'Katlamalı Perde' },
  { pageKey: 'product-gallery-model-perdeler-ip-perde', label: 'İp Perde' },
  { pageKey: 'product-gallery-model-perdeler-yuksek-tavanli-galeri-perde', label: 'Yüksek Tavanlı Galeri Perde' },
  { pageKey: 'product-gallery-model-perdeler-balon-perde', label: 'Balon Perde' },
  { pageKey: 'product-gallery-model-perdeler-cati-kati-perde', label: 'Çatı Katı Perde' },
  { pageKey: 'product-gallery-model-perdeler-kis-bahcesi-perde', label: 'Kış Bahçesi Perde' },
  { pageKey: 'product-gallery-model-perdeler-cocuk-perde', label: 'Çocuk Perde' },
  { pageKey: 'product-gallery-model-perdeler-cibinlik-perde', label: 'Cibinlik Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-aluminyum-jaluzi-perde', label: 'Alüminyum Jaluzi Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-ahsap-jaluzi-perde', label: 'Ahşap Jaluzi Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-deri-jaluzi-perde', label: 'Deri Jaluzi Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-zebra-perde', label: 'Zebra Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-dikey-perde', label: 'Dikey Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-plise-perde', label: 'Plise Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-cam-balkon-perdeleri', label: 'Cam Balkon Perdeleri' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-silhouette-vision-perde', label: 'Silhouette Vision Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-screen-perde', label: 'Screen Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-tul-stor-perde', label: 'Tül Stor Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-karartma-stor-perde', label: 'Karartma Stor Perde' },
  { pageKey: 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-desenli-stor-perde', label: 'Desenli Stor Perde' },
  { pageKey: 'product-gallery-urunler-tul-fon-perde-modern-fon-perde', label: 'Modern Fon Perde' },
  { pageKey: 'product-gallery-urunler-tul-fon-perde-desenli-fon-perde', label: 'Desenli Fon Perde' },
  { pageKey: 'product-gallery-urunler-tul-fon-perde-keten-fon-perde', label: 'Keten Fon Perde' },
  { pageKey: 'product-gallery-urunler-dosemelik-kumas-dokulu-kumas', label: 'Dokulu Kumaş' },
  { pageKey: 'product-gallery-urunler-dosemelik-kumas-kadife-kumas', label: 'Kadife Kumaş' },
  { pageKey: 'product-gallery-urunler-dosemelik-kumas-desenli-kumas', label: 'Desenli Kumaş' },
  { pageKey: 'product-gallery-urunler-perde-aksesuarlari-rustik-takimlari', label: 'Rustik Takımları' },
  { pageKey: 'product-gallery-urunler-perde-aksesuarlari-kol-bagi', label: 'Kol Bağı' },
  { pageKey: 'product-gallery-urunler-perde-aksesuarlari-bracol', label: 'Braçol' },
  { pageKey: 'product-gallery-urunler-metal-zincir-perde-metal-zincir-perde', label: 'Metal Zincir Perde' },
  { pageKey: 'product-gallery-urunler-metal-zincir-perde-metal-zincir-seperator', label: 'Metal Zincir Seperatör' },
  { pageKey: 'product-gallery-urunler-metal-zincir-perde-pro-collection', label: 'Pro Collection' },
  { pageKey: 'product-gallery-urunler-motorlu-tul-ve-kumas-perdeler', label: 'Motorlu Tül ve Kumaş Perdeler' },
  { pageKey: 'product-gallery-urunler-motorlu-perdeler-projeksiyon-perde', label: 'Projeksiyon Perde' },
  { pageKey: 'product-gallery-urunler-motorlu-perdeler-zip-perde', label: 'Zip Perde' },
  { pageKey: 'product-gallery-urunler-motorlu-perdeler-dis-cephe-jaluzi', label: 'Dış Cephe Jaluzi' },
  { pageKey: 'product-gallery-kurumsal-urunler-ozel-proje-perdeleri', label: 'Özel Proje Perdeleri' },
  { pageKey: 'product-gallery-kurumsal-urunler-cafe-restoran-perdeleri', label: 'Cafe Restoran Perdeleri' },
  { pageKey: 'product-gallery-kurumsal-urunler-hastane-perdeleri', label: 'Hastane Perdeleri' },
  { pageKey: 'product-gallery-kurumsal-urunler-ofis-perdeleri', label: 'Ofis Perdeleri' },
  { pageKey: 'product-gallery-kurumsal-urunler-otel-perdeleri', label: 'Otel Perdeleri' },
] as const

const motorizedFabricGalleryPageKey = 'product-gallery-urunler-motorlu-tul-ve-kumas-perdeler'

const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')

const isMotorizedFabricGalleryLabel = (label: string) => {
  const normalizedLabel = normalizeSearchText(label)
  return (
    normalizedLabel.includes('motorlu') &&
    normalizedLabel.includes('tul') &&
    normalizedLabel.includes('kumas') &&
    normalizedLabel.includes('perde')
  )
}

const getDefaultProductGalleryHeroCopy = (label: string): ProductGalleryHeroCopy => {
  if (label === 'Klasik ve Avangart Perde') {
    return {
      breadcrumbLabel: 'Klasik ve Avangart Perde',
      eyebrow: 'Model Perde Koleksiyonu',
      title: 'Klasik ve Avangart',
      highlightedTitle: 'Perde Modelleri',
      description: 'Dekorasyonu tamamlayan, bir mekanın modern veya klasik olmasında belirleyici unsur, perde seçimidir. Perde, dekorasyonun karakterini değiştirebilecek etkiye sahiptir. Perdelerin rengi, modeli, detayları mekanın bütünlüğüne ciddi anlamda katkı sağlamaktadır.',
    }
  }

  return {
    breadcrumbLabel: label,
    eyebrow: 'Ürün Koleksiyonu',
    title: label,
    highlightedTitle: 'Modelleri',
    description: '',
  }
}

const getDefaultProductGalleryVideo = (label: string): ProductGalleryVideo => ({
  title: 'Nasıl Çalışır?',
  description: `${label} sisteminin çalışma prensibini ve kullanım detaylarını videomuzda izleyebilirsiniz.`,
  youtubeUrl: '',
  enabled: false,
})

const productDetailCategoryGalleryPages: Record<string, Record<string, string>> = {
  'product-tul-fon-perde': {
    'Modern Fon Perde': 'product-gallery-urunler-tul-fon-perde-modern-fon-perde',
    'Desenli Fon Perde': 'product-gallery-urunler-tul-fon-perde-desenli-fon-perde',
    'Keten Fon Perde': 'product-gallery-urunler-tul-fon-perde-keten-fon-perde',
  },
  'product-dosemelik-kumas': {
    'Dokulu Kumaş': 'product-gallery-urunler-dosemelik-kumas-dokulu-kumas',
    'Kadife Kumaş': 'product-gallery-urunler-dosemelik-kumas-kadife-kumas',
    'Desenli Kumaş': 'product-gallery-urunler-dosemelik-kumas-desenli-kumas',
  },
  'product-perde-aksesuarlari': {
    'Rustik Takımları': 'product-gallery-urunler-perde-aksesuarlari-rustik-takimlari',
    'Kol Bağı': 'product-gallery-urunler-perde-aksesuarlari-kol-bagi',
    'Braçol': 'product-gallery-urunler-perde-aksesuarlari-bracol',
  },
  'product-metal-zincir-perde': {
    'Metal Zincir Perde': 'product-gallery-urunler-metal-zincir-perde-metal-zincir-perde',
    'Metal Zincir Seperatör': 'product-gallery-urunler-metal-zincir-perde-metal-zincir-seperator',
    'Pro Collection': 'product-gallery-urunler-metal-zincir-perde-pro-collection',
  },
}

const defaultHeroSlides: HeroSlideForm[] = [
  {
    id: 1,
    title: 'Modern Perde',
    subtitle: 'Yeni Nesil Tasarım',
    description: 'Bir mekana modern veya klasik perde yapma kararı dekorasyondaki en kritik kararlardan biridir.',
    image: '/api/public/media/images/2ec18b59-7848-4fcf-9b14-e72e00850a47/file',
    link: '/model-perdeler/modern-perde/',
    enabled: true,
  },
  {
    id: 2,
    title: 'Klasik ve Avangart Perde',
    subtitle: 'Zamansız Elegans',
    description: 'Klasik dokunuşlarla dekorasyonun kimliğini güçlendiren perde modelleri.',
    image: '/api/public/media/images/1257dce8-6141-47d9-8d0b-b3f4337daf65/file',
    link: '/model-perdeler/klasik-ve-avangart-perde/',
    enabled: true,
  },
  {
    id: 3,
    title: 'Stor Perdeler',
    subtitle: 'Pratik Çözümler',
    description: 'Pratik kullanımı ve ürün çeşitliliğiyle mekanik perde sistemleri.',
    image: '/api/public/media/images/fba75649-b296-4612-af5b-a2e4feff19d7/file',
    link: '/urunler/mekanizmali-perdeler/stor-perde',
    enabled: true,
  },
  {
    id: 4,
    title: 'Kruvaze Perde',
    subtitle: 'Gösterişli Model',
    description: 'Şık ve gösterişli mekanlar için kruvaze perde modelleri.',
    image: '/api/public/media/images/f3dd50c6-fc26-4672-9666-1b1504fb1982/file',
    link: '/model-perdeler/kruvaze-perde/',
    enabled: true,
  },
]

const defaultHeroStats: HeroStatForm[] = [
  { number: '500', suffix: '+', label: 'Proje' },
  { number: '35', suffix: '+', label: 'Yıl Deneyim' },
  { number: '100', suffix: '%', label: 'Memnuniyet' },
]

const defaultAboutForm: AboutForm = {
  heroEyebrow: 'KURUMSAL',
  heroTitle: 'Hakkımızda',
  heroDescription: '35 yıllık tecrübemizle yanınızdayız',
  eyebrow: 'HAKKIMIZDA',
  title: '35 Yıllık Dekorasyon Deneyimi',
  lead: 'Pile Perde olarak, perde ve döşemelik kumaş alanında Türkiye ve Avrupa\'nın önde gelen tekstil firmaları ile çalışarak, müşterilerimize en kaliteli ürünleri sunuyoruz.',
  image: '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
  imageAlt: 'Pile Perde Mağaza',
  experienceLabel: 'Yıl Deneyim',
  ctaLabel: 'Daha Fazla Bilgi',
  ctaHref: '/hakkimizda',
  tabs: [
    {
      key: 'mission',
      title: 'Misyonumuz',
      content: 'Ev, ofis, otel, restoran, kafe ve resmi kurumlar için özel tasarım perde ve döşemelik kumaş çözümleri sunarak, müşterilerimizin yaşam alanlarını güzelleştirmek ve fonksiyonel hale getirmek.',
    },
    {
      key: 'vision',
      title: 'Vizyonumuz',
      content: '35 yıllık deneyimimizle Türkiye\'nin lider dekorasyon markası olarak, klasik, yarı klasik, modern, country ve avangard tarzlarda sunduğumuz çözümlerle sektörde öncü olmaya devam etmek.',
    },
    {
      key: 'values',
      title: 'Değerlerimiz',
      content: 'Kaliteli ürün, zamanında teslimat, uzman ekip ve %100 müşteri memnuniyeti ilkeleriyle, iç mimarların güvenilir çözüm ortağı olmak.',
    },
  ],
  services: [
    'Ücretsiz keşif hizmeti',
    'Kusursuz montaj garantisi',
    'İç mimarların çözüm ortağı',
  ],
  stats: [
    { number: '35', label: 'Yıllık Deneyim', suffix: '' },
    { number: '1482', label: 'Tamamlanan Proje', suffix: '+' },
    { number: '15', label: 'Mutlu Müşteri', suffix: 'K+' },
    { number: '99', label: 'Müşteri Memnuniyeti', suffix: '%' },
  ],
}

const parseHeroSlides = (contentJson: string) => {
  if (!contentJson) {
    return defaultHeroSlides
  }

  try {
    const parsed = JSON.parse(contentJson) as { slides?: HeroSlideForm[] }
    if (!Array.isArray(parsed.slides) || parsed.slides.length === 0) {
      return defaultHeroSlides
    }

    return parsed.slides.map((slide, index) => ({
      id: Number(slide.id) || index + 1,
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      description: slide.description || '',
      image: slide.image || `/hero/${index + 1}.jpg`,
      link: slide.link || '/iletisim',
      enabled: slide.enabled !== false,
    }))
  } catch {
    return defaultHeroSlides
  }
}

const parseHeroStats = (contentJson: string) => {
  if (!contentJson) {
    return defaultHeroStats
  }

  try {
    const parsed = JSON.parse(contentJson) as { stats?: HeroStatForm[] }
    if (!Array.isArray(parsed.stats) || parsed.stats.length === 0) {
      return defaultHeroStats
    }

    return defaultHeroStats.map((fallback, index) => {
      const stat = parsed.stats?.[index]
      return {
        number: stat?.number || fallback.number,
        suffix: stat?.suffix ?? fallback.suffix,
        label: stat?.label || fallback.label,
      }
    })
  } catch {
    return defaultHeroStats
  }
}

const buildHeroContentJson = (slides: HeroSlideForm[], stats: HeroStatForm[]) => JSON.stringify({ slides, stats }, null, 2)

const parseAboutForm = (section: CmsSection | null): AboutForm => {
  if (!section) {
    return defaultAboutForm
  }

  try {
    const parsed = section.contentJson ? JSON.parse(section.contentJson) as {
      hero?: {
        eyebrow?: string
        title?: string
        description?: string
      }
      image?: string
      imageAlt?: string
      experienceLabel?: string
      ctaLabel?: string
      ctaHref?: string
      tabs?: AboutTabForm[]
      services?: string[]
      stats?: AboutStatForm[]
    } : {}

    return {
      ...defaultAboutForm,
      heroEyebrow: parsed.hero?.eyebrow || defaultAboutForm.heroEyebrow,
      heroTitle: parsed.hero?.title || defaultAboutForm.heroTitle,
      heroDescription: parsed.hero?.description || defaultAboutForm.heroDescription,
      eyebrow: section.subtitle || defaultAboutForm.eyebrow,
      title: section.title || defaultAboutForm.title,
      lead: section.body || defaultAboutForm.lead,
      image: parsed.image || defaultAboutForm.image,
      imageAlt: parsed.imageAlt || defaultAboutForm.imageAlt,
      experienceLabel: parsed.experienceLabel || defaultAboutForm.experienceLabel,
      ctaLabel: parsed.ctaLabel || defaultAboutForm.ctaLabel,
      ctaHref: parsed.ctaHref || defaultAboutForm.ctaHref,
      tabs: Array.isArray(parsed.tabs) && parsed.tabs.length > 0 ? parsed.tabs : defaultAboutForm.tabs,
      services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : defaultAboutForm.services,
      stats: Array.isArray(parsed.stats) && parsed.stats.length > 0 ? parsed.stats : defaultAboutForm.stats,
    }
  } catch {
    return {
      ...defaultAboutForm,
      eyebrow: section.subtitle || defaultAboutForm.eyebrow,
      title: section.title || defaultAboutForm.title,
      lead: section.body || defaultAboutForm.lead,
    }
  }
}

const buildAboutContentJson = (form: AboutForm) => JSON.stringify({
  hero: {
    eyebrow: form.heroEyebrow,
    title: form.heroTitle,
    description: form.heroDescription,
  },
  image: form.image,
  imageAlt: form.imageAlt,
  experienceLabel: form.experienceLabel,
  ctaLabel: form.ctaLabel,
  ctaHref: form.ctaHref,
  tabs: form.tabs,
  services: form.services,
  stats: form.stats,
}, null, 2)

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 KB'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / (1024 ** index)
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

const getPreviewImageUrl = (src: string, version: string | number) => {
  if (!src.startsWith('/api/public/media/images/')) {
    return src
  }

  return `${src}${src.includes('?') ? '&' : '?'}v=${version}`
}

const formatDateTime = (value: string) => {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const readErrorMessage = async (response: Response, fallback: string) => {
  try {
    const body = await response.json() as { message?: string; errors?: Record<string, string> }
    if (body.message) {
      return body.message
    }
    if (body.errors) {
      return Object.values(body.errors).join(', ')
    }
  } catch {
  }
  return fallback
}

class AdminRequestError extends Error {
  readonly httpStatus?: number
  readonly endpoint: string
  readonly errorReason: string

  constructor(message: string, endpoint: string, errorReason: string, httpStatus?: number) {
    super(message)
    this.name = 'AdminRequestError'
    this.endpoint = endpoint
    this.errorReason = errorReason
    this.httpStatus = httpStatus
  }
}

type ProductGalleryTechnicalDetail = {
  section: 'Sayfa/Google bilgileri' | 'Hero/Video/Galeri' | 'CMS geri okuma' | 'Public doğrulama'
  httpStatus?: number
  errorReason: string
  errorMessage: string
  endpoint: string
  cmsSaved: boolean | null
  publicVerified: boolean
  failedAttempt?: number
}

const toProductGalleryTechnicalDetail = (
  error: unknown,
  fallbackSection: ProductGalleryTechnicalDetail['section'],
  fallbackEndpoint: string,
  cmsSaved: boolean | null,
): ProductGalleryTechnicalDetail => {
  if (error instanceof AdminRequestError) {
    return {
      section: error.errorReason === 'cms_read_failed' ? 'CMS geri okuma' : fallbackSection,
      httpStatus: error.httpStatus,
      errorReason: error.errorReason,
      errorMessage: error.message,
      endpoint: error.endpoint,
      cmsSaved: error.errorReason === 'cms_read_failed' ? null : cmsSaved,
      publicVerified: false,
      failedAttempt: 1,
    }
  }

  if (error instanceof SaveVerificationError) {
    return {
      section: error.phase === 'cms' ? 'CMS geri okuma' : 'Public doğrulama',
      errorReason: error.phase === 'cms' ? 'cms_verification_mismatch' : 'public_verification_failed',
      errorMessage: error.message,
      endpoint: fallbackEndpoint,
      cmsSaved,
      publicVerified: false,
      failedAttempt: 1,
    }
  }

  return {
    section: fallbackSection,
    errorReason: 'unexpected_error',
    errorMessage: error instanceof Error ? error.message : 'Bilinmeyen teknik hata',
    endpoint: fallbackEndpoint,
    cmsSaved,
    publicVerified: false,
    failedAttempt: 1,
  }
}

const IMAGE_UPLOAD_COMPRESSION_THRESHOLD_BYTES = 8 * 1024 * 1024
const IMAGE_UPLOAD_MAX_DIMENSION = 2200

const loadImageElement = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = document.createElement('img')
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error(`${file.name} okunamadi`))
    }
    image.src = objectUrl
  })

const prepareImageFileForUpload = async (file: File) => {
  if (!file.type.startsWith('image/') || file.size <= IMAGE_UPLOAD_COMPRESSION_THRESHOLD_BYTES) {
    return file
  }

  const image = await loadImageElement(file)
  const scale = Math.min(1, IMAGE_UPLOAD_MAX_DIMENSION / image.naturalWidth, IMAGE_UPLOAD_MAX_DIMENSION / image.naturalHeight)
  const width = Math.max(1, Math.round(image.naturalWidth * scale))
  const height = Math.max(1, Math.round(image.naturalHeight * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  if (!context) {
    return file
  }

  context.drawImage(image, 0, 0, width, height)

  return new Promise<File>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob || blob.size >= file.size) {
        resolve(file)
        return
      }

      resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
        type: 'image/jpeg',
        lastModified: Date.now(),
      }))
    }, 'image/jpeg', 0.86)
  })
}

const fallbackCardImage = '/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file'

const getNextNumericId = (items: Array<{ id: number }>) =>
  items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1

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

const getGalleryPageFromCatalogItem = (item: CatalogItem | ProductCategoryItem): ProductGalleryAdminPage | null => {
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
    href: normalizedHref,
  }
}

const moveItemById = <T extends { id: number }>(items: T[], itemId: number, direction: 'up' | 'down') => {
  const index = items.findIndex((item) => item.id === itemId)
  const targetIndex = direction === 'up' ? index - 1 : index + 1

  if (index < 0 || targetIndex < 0 || targetIndex >= items.length) {
    return items
  }

  const nextItems = [...items]
  const currentItem = nextItems[index]
  nextItems[index] = nextItems[targetIndex]
  nextItems[targetIndex] = currentItem
  return nextItems
}

const AdminPage = () => {
  const [credentials, setCredentials] = useState(emptyCredentials)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [activePanel, setActivePanel] = useState<AdminPanel>('home')
  const [pages, setPages] = useState<CmsPageSummary[]>([])
  const [selectedPage, setSelectedPage] = useState<CmsPageDetail | null>(null)
  const [pageForm, setPageForm] = useState({
    slug: '',
    title: '',
    status: 'DRAFT' as CmsPageStatus,
  })
  const [savedSeoTitle, setSavedSeoTitle] = useState('')
  const [savedSeoDescription, setSavedSeoDescription] = useState('')
  const [draftSeoTitle, setDraftSeoTitle] = useState('')
  const [draftSeoDescription, setDraftSeoDescription] = useState('')
  const [heroSlides, setHeroSlides] = useState<HeroSlideForm[]>(defaultHeroSlides)
  const [heroStats, setHeroStats] = useState<HeroStatForm[]>(defaultHeroStats)
  const [productsPageCopy, setProductsPageCopy] = useState<ProductsPageCopyForm>(defaultProductSectionCopy)
  const [modelsPageCopy, setModelsPageCopy] = useState<ModelsPageCopyForm>(defaultModelPageCopy)
  const [productItems, setProductItems] = useState<CatalogItem[]>(defaultProductItems)
  const [modelItems, setModelItems] = useState<CatalogItem[]>(defaultModelItems)
  const [corporateItems, setCorporateItems] = useState<CatalogItem[]>(defaultCorporateItems)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts)
  const [mechanizedForm, setMechanizedForm] = useState<ProductDetailContent>(defaultMekanizmaliPerdelerContent)
  const [selectedProductGalleryPageKey, setSelectedProductGalleryPageKey] = useState<string>(productGalleryAdminPages[0].pageKey)
  const [productGalleryImages, setProductGalleryImages] = useState<ProductGalleryImage[]>([])
  const [productGalleryHeroCopy, setProductGalleryHeroCopy] = useState<ProductGalleryHeroCopy>(
    getDefaultProductGalleryHeroCopy(productGalleryAdminPages[0].label),
  )
  const [productGalleryVideo, setProductGalleryVideo] = useState<ProductGalleryVideo>(
    getDefaultProductGalleryVideo(productGalleryAdminPages[0].label),
  )
  const [aboutForm, setAboutForm] = useState<AboutForm>(defaultAboutForm)
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])
  const [expandedMediaPickerKey, setExpandedMediaPickerKey] = useState<string | null>(null)
  const [contactRequests, setContactRequests] = useState<ContactRequestItem[]>([])
  const [selectedContactRequestId, setSelectedContactRequestId] = useState<string | null>(null)
  const [contactRequestForm, setContactRequestForm] = useState({
    status: 'NEW' as ContactRequestStatus,
    adminNote: '',
  })
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [settingsForm, setSettingsForm] = useState<Record<string, string>>({})
  const [uploadingSlideId, setUploadingSlideId] = useState<number | null>(null)
  const [isAboutImageUploading, setIsAboutImageUploading] = useState(false)
  const [uploadingBlogPostId, setUploadingBlogPostId] = useState<number | null>(null)
  const [uploadingGalleryImageId, setUploadingGalleryImageId] = useState<number | null>(null)
  const [uploadingCardImageKey, setUploadingCardImageKey] = useState<string | null>(null)
  const [isGalleryBulkUploading, setIsGalleryBulkUploading] = useState(false)
  const [isMediaUploading, setIsMediaUploading] = useState(false)
  const [deletingMediaId, setDeletingMediaId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [productGallerySaveResult, setProductGallerySaveResult] = useState<{
    state: 'idle' | 'saved' | 'partial' | 'error'
    message: string
    note?: string
    savedParts: string[]
    failedParts: string[]
    technicalDetails: ProductGalleryTechnicalDetail[]
  }>({ state: 'idle', message: '', savedParts: [], failedParts: [], technicalDetails: [] })
  const [productGalleryTechnicalDetailsOpen, setProductGalleryTechnicalDetailsOpen] = useState(false)
  const [seoPreviewOpen, setSeoPreviewOpen] = useState(false)
  const [publicSeoResults, setPublicSeoResults] = useState<Record<string, {
    state: 'pending' | 'same' | 'different' | 'error'
    publicSeoTitle: string
    publicSeoDescription: string
    httpStatus?: number
    errorReason?: string
    errorMessage?: string
  }>>({})
  const pageLoadRequestId = useRef(0)
  const pendingImageFiles = useRef(new Map<string, { file: File; originalName: string }>())

  const authHeader = useMemo(() => {
    if (!authToken) {
      return null
    }

    return `Bearer ${authToken}`
  }, [authToken])

  const productGalleryPages = useMemo(() => {
    const pageMap = new Map<string, ProductGalleryAdminPage>()

    productGalleryAdminPages.forEach((page) => pageMap.set(page.pageKey, page))
    pages
      .filter((page) => page.pageKey.startsWith('product-gallery-') && !productDetailGalleryPageKeys.has(page.pageKey))
      .forEach((page) => pageMap.set(page.pageKey, {
        pageKey: page.pageKey,
        label: page.title,
        href: page.slug,
      }))

    ;[...productItems, ...modelItems, ...corporateItems, ...mechanizedForm.categories]
      .map(getGalleryPageFromCatalogItem)
      .filter((page): page is ProductGalleryAdminPage => Boolean(page))
      .forEach((page) => pageMap.set(page.pageKey, page))

    const galleryPages = Array.from(pageMap.values())
    const hasMotorizedFabricGallery = galleryPages.some((page) => page.pageKey === motorizedFabricGalleryPageKey)

    return galleryPages
      .filter((page) => (
        !hasMotorizedFabricGallery ||
        !isMotorizedFabricGalleryLabel(page.label) ||
        page.pageKey === motorizedFabricGalleryPageKey
      ))
      .sort((a, b) => a.label.localeCompare(b.label, 'tr'))
  }, [corporateItems, mechanizedForm.categories, modelItems, pages, productItems])

  const activeProductDetailPage = productDetailAdminPages.find((item) => item.panel === activePanel)
  const activeProductGalleryPage = productGalleryPages.find((item) => item.pageKey === selectedProductGalleryPageKey) || productGalleryPages[0] || productGalleryAdminPages[0]
  const selectedContactRequest = contactRequests.find((requestItem) => requestItem.id === selectedContactRequestId) || null
  const getMediaPickerAssets = (pickerKey: string) =>
    expandedMediaPickerKey === pickerKey ? mediaAssets : mediaAssets.slice(0, 16)

  useEffect(() => {
    const savedToken = window.localStorage.getItem('pileperde.admin.auth')
    if (savedToken) {
      setAuthToken(savedToken)
    }
  }, [])

  useEffect(() => {
    if (authHeader) {
      void loadPages(authHeader)
      void loadMediaAssets(authHeader)
      void loadContactRequests(authHeader)
      void loadSettings(authHeader)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHeader])

  const request = async <T,>(path: string, options: RequestInit = {}) => {
    if (!authHeader) {
      throw new Error('Admin girisi gerekli')
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
        ...(options.headers || {}),
      },
    })

    if (!response.ok) {
      throw new AdminRequestError(
        await readErrorMessage(response, 'İşlem tamamlanamadı'),
        path,
        'http_error',
        response.status,
      )
    }

    const body = await response.json() as ApiResponse<T>
    return body.data
  }

  const readMediaAssets = async (header = authHeader) => {
    if (!header) {
      throw new Error('Admin oturumu bulunamadı')
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/media/images?size=200&sort=createdAt,desc`, {
      cache: 'no-store',
      headers: { Authorization: header },
    })
    if (!response.ok) throw new Error('Gorseller yuklenemedi')
    const body = await response.json() as ApiResponse<PageResult<MediaAsset>>
    return body.data.content
  }

  const loadMediaAssets = async (header = authHeader) => {
    if (!header) return

    try {
      const assets = await readMediaAssets(header)
      setMediaAssets(assets.filter((asset) => asset.status === 'READY'))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gorseller yuklenemedi')
    }
  }

  const readSettings = async (header = authHeader) => {
    if (!header) {
      throw new Error('Admin oturumu bulunamadı')
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
      cache: 'no-store',
      headers: { Authorization: header },
    })
    if (!response.ok) {
      throw new Error('Ayarlar yuklenemedi')
    }
    const body = await response.json() as ApiResponse<SiteSetting[]>
    return body.data
  }

  const loadSettings = async (header = authHeader) => {
    if (!header) return

    try {
      const data = await readSettings(header)
      setSettings(data)
      setSettingsForm(Object.fromEntries(data.map((setting) => [setting.settingKey, setting.settingValue])))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Ayarlar yuklenemedi')
    }
  }

  const selectContactRequest = (requestItem: ContactRequestItem | null) => {
    setSelectedContactRequestId(requestItem?.id || null)
    setContactRequestForm({
      status: requestItem?.status || 'NEW',
      adminNote: requestItem?.adminNote || '',
    })
  }

  const loadContactRequests = async (header = authHeader) => {
    if (!header) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/contact-requests`, {
        headers: {
          Authorization: header,
        },
      })

      if (!response.ok) {
        throw new Error('Talepler yüklenemedi')
      }

      const body = await response.json() as ApiResponse<ContactRequestItem[]>
      setContactRequests(body.data)

      const selectedRequest = selectedContactRequestId
        ? body.data.find((requestItem) => requestItem.id === selectedContactRequestId)
        : body.data[0]
      selectContactRequest(selectedRequest || null)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Talepler yüklenemedi')
    }
  }

  const loadPages = async (header = authHeader) => {
    if (!header) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/cms/pages`, {
        headers: {
          Authorization: header,
        },
      })

      if (!response.ok) {
        throw new Error('Admin girisi basarisiz')
      }

      const body = await response.json() as ApiResponse<CmsPageSummary[]>
      setPages(body.data)
      void refreshSeoStatuses(body.data)

      if (!selectedPage && body.data.length > 0) {
        const preferredPage = body.data.find((page) => page.pageKey === 'home') || body.data[0]
        await loadPage(preferredPage.id, header)
      }
    } catch (error) {
      window.localStorage.removeItem('pileperde.admin.auth')
      setAuthToken(null)
      setErrorMessage(error instanceof Error ? error.message : 'Admin girisi basarisiz')
    } finally {
      setIsLoading(false)
    }
  }

  const loadPageByKey = async (
    pageKey: string,
    header = authHeader,
    fallbackGalleryPage?: ProductGalleryAdminPage,
  ) => {
    if (!header) {
      return
    }

    const page = pages.find((item) => item.pageKey === pageKey)
    if (page) {
      await loadPage(page.id, header)
      return
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/cms/pages`, {
      headers: {
        Authorization: header,
      },
    })

    if (!response.ok) {
      throw new Error('Sayfa listesi yuklenemedi')
    }

    const body = await response.json() as ApiResponse<CmsPageSummary[]>
    setPages(body.data)
    const refreshedPage = body.data.find((item) => item.pageKey === pageKey)
    if (refreshedPage) {
      await loadPage(refreshedPage.id, header)
      return
    }

    if (fallbackGalleryPage && pageKey.startsWith('product-gallery-')) {
      throw new Error(`${fallbackGalleryPage.label} için CMS kaydı bulunamadı. Otomatik kayıt oluşturma güvenlik nedeniyle kapalıdır.`)
    }
  }

  const loadPage = async (pageId: string, header = authHeader) => {
    if (!header) {
      return
    }

    const requestId = ++pageLoadRequestId.current
    setIsLoading(true)
    setErrorMessage(null)
    setStatusMessage(null)
    setProductGallerySaveResult({ state: 'idle', message: '', savedParts: [], failedParts: [], technicalDetails: [] })
    setProductGalleryTechnicalDetailsOpen(false)
    setSeoPreviewOpen(false)
    setSelectedPage(null)
    setPageForm({
      slug: '',
      title: '',
      status: 'DRAFT',
    })
    setSavedSeoTitle('')
    setSavedSeoDescription('')
    setDraftSeoTitle('')
    setDraftSeoDescription('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/cms/pages/${pageId}`, {
        headers: {
          Authorization: header,
        },
      })

      if (!response.ok) {
        throw new Error('Sayfa yuklenemedi')
      }

      const body = await response.json() as ApiResponse<CmsPageDetail>
      if (requestId !== pageLoadRequestId.current) {
        return
      }
      const page = body.data
      const loadedProductGalleryPage = productGalleryPages.find((item) => item.pageKey === page.pageKey) || activeProductGalleryPage
      setSelectedPage(page)
      const heroSection = page.sections.find((section) => section.sectionKey === 'home.hero') || null
      const aboutSection = page.sections.find((section) => section.sectionKey === 'about.main') || null
      const productsHeroSection = page.sections.find((section) => section.sectionKey === 'products.hero') || null
      const productsSection = page.sections.find((section) => section.sectionKey === 'products.grid') || null
      const modelsHeroSection = page.sections.find((section) => section.sectionKey === 'models.hero') || null
      const modelsSection = page.sections.find((section) => section.sectionKey === 'models.grid') || null
      const corporateSection = page.sections.find((section) => section.sectionKey === 'corporate.grid') || null
      const blogSection = page.sections.find((section) => section.sectionKey === 'blog.list') || null
      const productDetailSection = page.sections.find((section) => section.sectionKey === 'product.detail') || null
      const productGallerySection = page.sections.find((section) => section.sectionKey === 'product.gallery') || null
      setPageForm({
        slug: page.slug,
        title: page.title,
        status: page.status,
      })
      setSavedSeoTitle(page.seoTitle || '')
      setSavedSeoDescription(page.seoDescription || '')
      setDraftSeoTitle(page.seoTitle || '')
      setDraftSeoDescription(page.seoDescription || '')

      if (heroSection) {
        setHeroSlides(parseHeroSlides(heroSection.contentJson || ''))
        setHeroStats(parseHeroStats(heroSection.contentJson || ''))
      }
      if (aboutSection) {
        setAboutForm(parseAboutForm(aboutSection))
      }
      setProductsPageCopy({
        heroTitle: productsHeroSection?.title || defaultProductSectionCopy.heroTitle,
        heroSubtitle: productsHeroSection?.body || defaultProductSectionCopy.heroSubtitle,
        sectionEyebrow: productsSection?.subtitle || defaultProductSectionCopy.sectionEyebrow,
        sectionTitle: productsSection?.title || defaultProductSectionCopy.sectionTitle,
        sectionDescription: productsSection?.body || defaultProductSectionCopy.sectionDescription,
      })
      if (productsSection) {
        setProductItems(parseCatalogItems(productsSection.contentJson))
      }
      setModelsPageCopy({
        heroTitle: modelsHeroSection?.title || defaultModelPageCopy.heroTitle,
        heroSubtitle: modelsHeroSection?.body || defaultModelPageCopy.heroSubtitle,
      })
      if (modelsSection) {
        setModelItems(parseCatalogItems(modelsSection.contentJson, defaultModelItems))
      }
      if (corporateSection) {
        setCorporateItems(parseCatalogItems(corporateSection.contentJson, defaultCorporateItems))
      }
      if (blogSection) {
        setBlogPosts(parseBlogPosts(blogSection.contentJson))
      }
      if (productDetailSection) {
        setMechanizedForm(parseProductDetailContent(productDetailSection.contentJson))
      }
      if (productGallerySection) {
        setProductGalleryImages(parseProductGalleryImages(productGallerySection.contentJson, []))
        setProductGalleryHeroCopy(parseProductGalleryHeroCopy(
          productGallerySection.contentJson,
          getDefaultProductGalleryHeroCopy(loadedProductGalleryPage.label),
        ))
        setProductGalleryVideo(parseProductGalleryVideo(
          productGallerySection.contentJson,
          getDefaultProductGalleryVideo(loadedProductGalleryPage.label),
        ))
      } else {
        setProductGalleryImages([])
        setProductGalleryHeroCopy(getDefaultProductGalleryHeroCopy(loadedProductGalleryPage.label))
        setProductGalleryVideo(getDefaultProductGalleryVideo(loadedProductGalleryPage.label))
      }
    } catch (error) {
      if (requestId === pageLoadRequestId.current) {
        setErrorMessage(error instanceof Error ? error.message : 'Sayfa yuklenemedi')
      }
    } finally {
      if (requestId === pageLoadRequestId.current) {
        setIsLoading(false)
      }
    }
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage(null)
    setErrorMessage(null)
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Admin girisi basarisiz')
      }

      const payload: ApiResponse<AdminLoginResponse> = await response.json()
      setAuthToken(payload.data.token)
      window.localStorage.setItem('pileperde.admin.auth', payload.data.token)
      setCredentials({ ...credentials, password: '' })
    } catch (error) {
      window.localStorage.removeItem('pileperde.admin.auth')
      setAuthToken(null)
      setErrorMessage(error instanceof Error ? error.message : 'Admin girisi basarisiz')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('pileperde.admin.auth')
    setAuthToken(null)
    setSelectedPage(null)
    setPages([])
    setStatusMessage(null)
  }

  const uploadMediaAssetVerified = async (file: File, originalName = file.name) => {
    if (!authHeader) throw new Error('Admin oturumu bulunamadı')

    const intendedTitle = originalName
    const intendedAltText = originalName.replace(/\.[^.]+$/, '')
    let writtenAsset: MediaAsset | null = null

    const result = await runVerifiedSave({
      write: async () => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', intendedTitle)
        formData.append('altText', intendedAltText)
        const response = await fetch(`${API_BASE_URL}/api/admin/media/images`, {
          method: 'POST',
          headers: { Authorization: authHeader },
          body: formData,
        })
        if (!response.ok) throw new Error(await readErrorMessage(response, 'Gorsel yuklenemedi'))
        const body = await response.json() as ApiResponse<MediaAsset>
        writtenAsset = body.data
      },
      readBack: async () => {
        if (!writtenAsset) throw new Error('Yüklenen görsel kimliği alınamadı')
        const response = await fetch(`${API_BASE_URL}/api/admin/media/images/${writtenAsset.id}`, {
          cache: 'no-store',
          headers: { Authorization: authHeader },
        })
        if (!response.ok) throw new Error('Görsel geri okuma isteği başarısız oldu')
        const body = await response.json() as ApiResponse<MediaAsset>
        return body.data
      },
      cmsMatches: (actual) => Boolean(
        writtenAsset
        && actual.id === writtenAsset.id
        && actual.publicUrl === writtenAsset.publicUrl
        && actual.title === intendedTitle
        && actual.altText === intendedAltText
        && actual.status === 'READY'
      ),
      readPublic: async () => {
        if (!writtenAsset) return null
        const response = await fetch(`${API_BASE_URL}/api/public/media/images?size=200&sort=createdAt,desc`, { cache: 'no-store' })
        if (!response.ok) throw new Error('Public medya doğrulaması başarısız oldu')
        const body = await response.json() as ApiResponse<PageResult<MediaAsset>>
        return body.data.content.find((asset) => asset.id === writtenAsset?.id) || null
      },
      publicMatches: (actual, verified) => Boolean(
        actual
        && actual.id === verified.id
        && actual.publicUrl === verified.publicUrl
        && actual.title === verified.title
        && actual.altText === verified.altText
      ),
    })

    await loadMediaAssets()
    return result.cmsValue
  }

  const stageImageFile = (file: File, originalName = file.name) => {
    const previewUrl = URL.createObjectURL(file)
    pendingImageFiles.current.set(previewUrl, { file, originalName })
    return previewUrl
  }

  const materializeImageUrl = async (url: string) => {
    const pending = pendingImageFiles.current.get(url)
    if (!pending) return url
    const asset = await uploadMediaAssetVerified(pending.file, pending.originalName)
    pendingImageFiles.current.delete(url)
    URL.revokeObjectURL(url)
    return asset.publicUrl
  }

  const updateHeroSlide = (slideId: number, updates: Partial<HeroSlideForm>) => {
    const nextSlides = heroSlides.map((slide) =>
      slide.id === slideId ? { ...slide, ...updates } : slide
    )
    setHeroSlides(nextSlides)
  }

  const uploadHeroSlideImage = async (slideId: number, file: File | null) => {
    if (!file || !authHeader) {
      return
    }

    updateHeroSlide(slideId, { image: stageImageFile(file) })
    setStatusMessage('Görsel geçici olarak hazırlandı; Kaydet’e basılana kadar yüklenmeyecek')
  }

  const uploadAboutImage = async (file: File | null) => {
    if (!file || !authHeader) {
      return
    }

    setAboutForm((current) => ({ ...current, image: stageImageFile(file), imageAlt: current.imageAlt || file.name }))
    setStatusMessage('Görsel geçici olarak hazırlandı; Kaydet’e basılana kadar yüklenmeyecek')
  }

  const uploadBlogImage = async (postId: number, file: File | null) => {
    if (!file || !authHeader) {
      return
    }

    const previewUrl = stageImageFile(file)
    setBlogPosts((current) => current.map((post) => post.id === postId ? { ...post, image: previewUrl } : post))
    setStatusMessage('Görsel geçici olarak hazırlandı; Kaydet’e basılana kadar yüklenmeyecek')
  }

  const uploadProductGalleryImage = async (imageId: number, file: File | null) => {
    if (!file || !authHeader) {
      return
    }

    updateProductGalleryImage(imageId, { src: stageImageFile(file), alt: file.name, title: file.name })
    setStatusMessage('Görsel geçici olarak hazırlandı; Kaydet’e basılana kadar yüklenmeyecek')
  }

  const uploadProductGalleryImages = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || !authHeader) {
      return
    }

    const files = Array.from(fileList)
    let nextId = productGalleryImages.reduce((maxId, image) => Math.max(maxId, image.id), 0) + 1
    const stagedImages = files.map((file) => ({
      id: nextId++, src: stageImageFile(file), alt: file.name, title: file.name, enabled: true,
    }))
    setProductGalleryImages((current) => [...current, ...stagedImages])
    setStatusMessage(`${stagedImages.length} görsel geçici olarak hazırlandı; Kaydet’e basılana kadar yüklenmeyecek`)
  }

  const uploadCardImage = async (
    cardKey: string,
    file: File | null,
    applyImage: (publicUrl: string) => void,
  ) => {
    if (!file || !authHeader) {
      return
    }

    applyImage(stageImageFile(file))
    setStatusMessage('Görsel geçici olarak hazırlandı; Kaydet’e basılana kadar yüklenmeyecek')
  }

  const uploadMediaLibraryImage = async (file: File | null) => {
    if (!file || !authHeader) {
      return
    }

    setIsMediaUploading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      await uploadMediaAssetVerified(file)
      setStatusMessage('Görsel CMS ve public dosyayla doğrulanarak kütüphaneye eklendi')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gorsel yuklenemedi')
    } finally {
      setIsMediaUploading(false)
    }
  }

  const copyMediaUrl = async (url: string) => {
    try {
      await window.navigator.clipboard.writeText(url)
      setStatusMessage('Gorsel URL kopyalandi')
    } catch {
      setErrorMessage('URL kopyalanamadi')
    }
  }

  const archiveMediaAsset = async (assetId: string) => {
    if (!authHeader) {
      return
    }

    setDeletingMediaId(assetId)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const baselineAsset = mediaAssets.find((asset) => asset.id === assetId)
      if (!baselineAsset) throw new Error('Arşivlenecek görselin doğrulanmış kaydı bulunamadı')
      await runVerifiedSave({
        write: async () => {
          const response = await fetch(`${API_BASE_URL}/api/admin/media/images/${assetId}`, {
            method: 'DELETE',
            headers: { Authorization: authHeader },
          })
          if (!response.ok) throw new Error(await readErrorMessage(response, 'Gorsel arsivlenemedi'))
        },
        readBack: async () => {
          const response = await fetch(`${API_BASE_URL}/api/admin/media/images/${assetId}`, {
            cache: 'no-store',
            headers: { Authorization: authHeader },
          })
          if (!response.ok) throw new Error('Arşivlenen görsel geri okunamadı')
          const body = await response.json() as ApiResponse<MediaAsset>
          return body.data
        },
        cmsMatches: (actual) => actual.id === baselineAsset.id
          && actual.fileName === baselineAsset.fileName
          && actual.mimeType === baselineAsset.mimeType
          && actual.sizeBytes === baselineAsset.sizeBytes
          && actual.width === baselineAsset.width
          && actual.height === baselineAsset.height
          && actual.title === baselineAsset.title
          && actual.altText === baselineAsset.altText
          && actual.publicUrl === baselineAsset.publicUrl
          && actual.status !== 'READY',
        onCmsRead: async () => { await loadMediaAssets() },
        readPublic: async () => {
          const response = await fetch(`${API_BASE_URL}/api/public/media/images?size=200`, { cache: 'no-store' })
          if (!response.ok) throw new Error('Public medya listesi doğrulanamadı')
          const body = await response.json() as ApiResponse<PageResult<MediaAsset>>
          return body.data.content
        },
        publicMatches: (actual) => !actual.some((asset) => asset.id === assetId),
      })
      setStatusMessage('Görsel CMS ve public listeyle doğrulanarak arşivlendi')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gorsel arsivlenemedi')
    } finally {
      setDeletingMediaId(null)
    }
  }

  const addHeroSlide = () => {
    const nextId = heroSlides.reduce((maxId, slide) => Math.max(maxId, slide.id), 0) + 1
    const nextSlides = [
      ...heroSlides,
      {
        id: nextId,
        title: 'Yeni Slide',
        subtitle: 'Alt baslik',
        description: 'Aciklama metni',
        image: '/api/public/media/images/2ec18b59-7848-4fcf-9b14-e72e00850a47/file',
        link: '/iletisim',
        enabled: true,
      },
    ]
    setHeroSlides(nextSlides)
  }

  const handleSettingsSave = async () => {
    if (!authHeader) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedByKey = Object.fromEntries(settings.map((setting) => [setting.settingKey, setting.settingValue]))
      const changedKeys = editableSettingKeys.filter((settingKey) =>
        Object.hasOwn(savedByKey, settingKey)
        && (settingsForm[settingKey] || '') !== (savedByKey[settingKey] || '')
      )
      if (changedKeys.length === 0) {
        setStatusMessage('Kaydedilecek değişiklik bulunamadı')
        return
      }
      const changedKeySet = new Set<string>(changedKeys)

      await runVerifiedSave({
        write: async () => {
          for (const settingKey of changedKeys) {
            const response = await fetch(`${API_BASE_URL}/api/admin/settings/${encodeURIComponent(settingKey)}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader,
              },
              body: JSON.stringify({ settingValue: settingsForm[settingKey] || '' }),
            })
            if (!response.ok) {
              throw new Error(await readErrorMessage(response, 'Ayar kaydedilemedi'))
            }
          }
        },
        readBack: () => readSettings(authHeader),
        cmsMatches: (actual) => actual.length === settings.length
          && settings.every((baselineSetting) => {
            const actualSetting = actual.find((setting) => setting.settingKey === baselineSetting.settingKey)
            if (!actualSetting) return false
            const expectedValue = changedKeySet.has(baselineSetting.settingKey)
              ? settingsForm[baselineSetting.settingKey] || ''
              : baselineSetting.settingValue
            return actualSetting.id === baselineSetting.id
              && actualSetting.settingValue === expectedValue
              && actualSetting.valueType === baselineSetting.valueType
              && actualSetting.groupName === baselineSetting.groupName
              && actualSetting.description === baselineSetting.description
          }),
        onCmsRead: (actual) => {
          setSettings(actual)
          setSettingsForm(Object.fromEntries(actual.map((setting) => [setting.settingKey, setting.settingValue])))
        },
        readPublic: async () => {
          const response = await fetch(`${API_BASE_URL}/api/public/settings`, { cache: 'no-store' })
          if (!response.ok) throw new Error('Public ayar doğrulaması başarısız oldu')
          const body = await response.json() as ApiResponse<Record<string, string>>
          return body.data
        },
        publicMatches: (actual, verified) => changedKeys.every((settingKey) => {
          const cmsValue = verified.find((setting) => setting.settingKey === settingKey)?.settingValue || ''
          return (actual[settingKey] || '') === cmsValue
        }),
      })
      setStatusMessage('Site ayarları CMS ve public çıktıyla doğrulanarak kaydedildi')
    } catch (error) {
      await loadSettings()
      setErrorMessage(error instanceof Error ? error.message : 'Ayarlar kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactRequestSave = async () => {
    if (!authHeader || !selectedContactRequestId) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const requestId = selectedContactRequestId
      const requested = { ...contactRequestForm }
      const baselineRequest = selectedContactRequest
      if (!baselineRequest) throw new Error('Talebin doğrulanmış temel kaydı bulunamadı')
      await runVerifiedSave({
        write: async () => {
          const response = await fetch(`${API_BASE_URL}/api/admin/contact-requests/${requestId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: authHeader,
            },
            body: JSON.stringify(requested),
          })
          if (!response.ok) {
            throw new Error(await readErrorMessage(response, 'Talep kaydedilemedi'))
          }
        },
        readBack: async () => {
          const response = await fetch(`${API_BASE_URL}/api/admin/contact-requests/${requestId}`, {
            cache: 'no-store',
            headers: { Authorization: authHeader },
          })
          if (!response.ok) throw new Error('Talep geri okuma isteği başarısız oldu')
          const body = await response.json() as ApiResponse<ContactRequestItem>
          return body.data
        },
        cmsMatches: (actual) => actual.id === baselineRequest.id
          && actual.name === baselineRequest.name
          && actual.phone === baselineRequest.phone
          && actual.email === baselineRequest.email
          && actual.message === baselineRequest.message
          && actual.sourcePage === baselineRequest.sourcePage
          && actual.createdAt === baselineRequest.createdAt
          && actual.status === requested.status
          && (actual.adminNote || '') === requested.adminNote,
        onCmsRead: (actual) => {
          setContactRequests((current) => current.map((item) => item.id === actual.id ? actual : item))
          selectContactRequest(actual)
        },
      })
      setStatusMessage('Talep CMS’den geri okunarak doğrulandı ve kaydedildi')
    } catch (error) {
      await loadContactRequests()
      setErrorMessage(error instanceof Error ? error.message : 'Talep kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const savePageBasics = async () => {
    if (!selectedPage) {
      return null
    }

    return request<CmsPageDetail>(`/api/admin/cms/pages/${selectedPage.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        slug: selectedPage.slug,
        title: selectedPage.title,
        seoTitle: draftSeoTitle,
        seoDescription: draftSeoDescription,
        status: selectedPage.status,
      }),
    })
  }

  const saveSection = async (sectionKey: string, requestBody: CmsSectionForm) => {
    if (!selectedPage) {
      return
    }

    await request<CmsSection>(
      `/api/admin/cms/pages/${selectedPage.id}/sections/${encodeURIComponent(sectionKey)}`,
      {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
      }
    )
  }

  const refreshSeoStatuses = async (items: CmsPageSummary[]) => {
    setPublicSeoResults((current) => ({
      ...current,
      ...Object.fromEntries(items.map((page) => [page.pageKey, {
        state: 'pending' as const,
        publicSeoTitle: current[page.pageKey]?.publicSeoTitle || '',
        publicSeoDescription: current[page.pageKey]?.publicSeoDescription || '',
      }])),
    }))

    try {
      const response = await fetch('/api/seo-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: items.map((page) => ({ pageKey: page.pageKey, slug: page.slug })) }),
      })
      if (!response.ok) {
        const results = Object.fromEntries(items.map((page) => [page.pageKey, {
          state: 'error' as const,
          publicSeoTitle: '',
          publicSeoDescription: '',
          httpStatus: response.status,
          errorReason: 'status_endpoint_failed',
          errorMessage: `Public durum servisi HTTP ${response.status} döndürdü.`,
        }]))
        setPublicSeoResults((current) => ({ ...current, ...results }))
        return results
      }
      const body = await response.json() as {
        statuses: Array<{
          pageKey: string
          state: 'same' | 'different' | 'error'
          httpStatus?: number
          publicTitle?: string
          publicDescription?: string
          errorReason?: string
          errorMessage?: string
        }>
      }
      const results = Object.fromEntries(body.statuses.map((item) => [item.pageKey, {
        state: item.state,
        publicSeoTitle: item.publicTitle || '',
        publicSeoDescription: item.publicDescription || '',
        httpStatus: item.httpStatus,
        errorReason: item.errorReason,
        errorMessage: item.errorMessage,
      }]))
      setPublicSeoResults(results)
      return results
    } catch (error) {
      const results = Object.fromEntries(items.map((page) => [page.pageKey, {
        state: 'error' as const,
        publicSeoTitle: '',
        publicSeoDescription: '',
        errorReason: 'network_error',
        errorMessage: error instanceof Error ? error.message : 'Public durum isteği başarısız oldu.',
      }]))
      setPublicSeoResults((current) => ({ ...current, ...results }))
      return results
    }
  }

  const readCmsPage = async (pageId: string) => {
    if (!authHeader) {
      throw new Error('Admin oturumu bulunamadı')
    }

    const endpoint = `/api/admin/cms/pages/${pageId}`
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store',
      headers: { Authorization: authHeader },
    })
    if (!response.ok) {
      throw new AdminRequestError(
        await readErrorMessage(response, 'Kayıt sonrası CMS doğrulama isteği başarısız oldu'),
        endpoint,
        'cms_read_failed',
        response.status,
      )
    }
    const body = await response.json() as ApiResponse<CmsPageDetail>
    return body.data
  }

  const readPublicCmsPage = async (pageKey: string) => {
    const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/${encodeURIComponent(pageKey)}`, {
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('Public CMS doğrulama isteği başarısız oldu')
    }
    const body = await response.json() as ApiResponse<CmsPageDetail>
    return body.data
  }

  const sectionMatchesRequest = (section: CmsSection | undefined, requestBody: CmsSectionForm) => Boolean(
    section
    && section.sectionType === requestBody.sectionType
    && (section.title || '') === requestBody.title
    && (section.subtitle || '') === requestBody.subtitle
    && (section.body || '') === requestBody.body
    && (section.contentJson || '') === requestBody.contentJson
    && section.sortOrder === requestBody.sortOrder
    && section.enabled === requestBody.enabled
  )

  const sectionsEqual = (left: CmsSection | undefined, right: CmsSection | undefined) => Boolean(
    left
    && right
    && left.id === right.id
    && left.sectionKey === right.sectionKey
    && left.sectionType === right.sectionType
    && (left.title || '') === (right.title || '')
    && (left.subtitle || '') === (right.subtitle || '')
    && (left.body || '') === (right.body || '')
    && (left.contentJson || '') === (right.contentJson || '')
    && left.sortOrder === right.sortOrder
    && left.enabled === right.enabled
  )

  const pageMatchesIsolatedChanges = (
    actual: CmsPageDetail,
    baseline: CmsPageDetail,
    pageChanges: Partial<Pick<CmsPageDetail, 'title' | 'seoTitle' | 'seoDescription'>> = {},
    sectionChanges: Array<{ sectionKey: string; requestBody: CmsSectionForm }> = [],
  ) => {
    const changedSections = new Map(sectionChanges.map((change) => [change.sectionKey, change.requestBody]))
    return actual.id === baseline.id
      && actual.pageKey === baseline.pageKey
      && actual.slug === baseline.slug
      && actual.status === baseline.status
      && actual.title === (pageChanges.title ?? baseline.title)
      && (actual.seoTitle || '') === (pageChanges.seoTitle ?? baseline.seoTitle ?? '')
      && (actual.seoDescription || '') === (pageChanges.seoDescription ?? baseline.seoDescription ?? '')
      && actual.sections.length === baseline.sections.length
      && baseline.sections.every((baselineSection) => {
        const actualSection = actual.sections.find((section) => section.sectionKey === baselineSection.sectionKey)
        const requestedSection = changedSections.get(baselineSection.sectionKey)
        return requestedSection
          ? sectionMatchesRequest(actualSection, requestedSection)
          : sectionsEqual(actualSection, baselineSection)
      })
  }

  const applySectionReadback = (page: CmsPageDetail, sectionKeys: string[]) => {
    const keys = new Set(sectionKeys)
    setSelectedPage(page)

    if (keys.has('home.hero')) {
      const section = page.sections.find((item) => item.sectionKey === 'home.hero')
      if (section) {
        setHeroSlides(parseHeroSlides(section.contentJson || ''))
        setHeroStats(parseHeroStats(section.contentJson || ''))
      }
    }

    if (keys.has('about.main')) {
      const section = page.sections.find((item) => item.sectionKey === 'about.main')
      if (section) setAboutForm(parseAboutForm(section))
    }

    const productsHero = page.sections.find((item) => item.sectionKey === 'products.hero')
    const productsGrid = page.sections.find((item) => item.sectionKey === 'products.grid')
    if (keys.has('products.hero')) {
      setProductsPageCopy((current) => ({
        ...current,
        heroTitle: productsHero?.title || defaultProductSectionCopy.heroTitle,
        heroSubtitle: productsHero?.body || defaultProductSectionCopy.heroSubtitle,
      }))
    }
    if (keys.has('products.grid')) {
      setProductsPageCopy((current) => ({
        ...current,
        sectionEyebrow: productsGrid?.subtitle || defaultProductSectionCopy.sectionEyebrow,
        sectionTitle: productsGrid?.title || defaultProductSectionCopy.sectionTitle,
        sectionDescription: productsGrid?.body || defaultProductSectionCopy.sectionDescription,
      }))
      if (productsGrid) setProductItems(parseCatalogItems(productsGrid.contentJson))
    }

    const modelsHero = page.sections.find((item) => item.sectionKey === 'models.hero')
    const modelsGrid = page.sections.find((item) => item.sectionKey === 'models.grid')
    if (keys.has('models.hero')) {
      setModelsPageCopy((current) => ({
        ...current,
        heroTitle: modelsHero?.title || defaultModelPageCopy.heroTitle,
        heroSubtitle: modelsHero?.body || defaultModelPageCopy.heroSubtitle,
      }))
    }
    if (keys.has('models.grid') && modelsGrid) {
      setModelItems(parseCatalogItems(modelsGrid.contentJson, defaultModelItems))
    }

    if (keys.has('corporate.grid')) {
      const section = page.sections.find((item) => item.sectionKey === 'corporate.grid')
      if (section) setCorporateItems(parseCatalogItems(section.contentJson, defaultCorporateItems))
    }

    if (keys.has('blog.list')) {
      const section = page.sections.find((item) => item.sectionKey === 'blog.list')
      if (section) setBlogPosts(parseBlogPosts(section.contentJson))
    }

    if (keys.has('product.detail')) {
      const section = page.sections.find((item) => item.sectionKey === 'product.detail')
      if (section) setMechanizedForm(parseProductDetailContent(section.contentJson))
    }

    if (keys.has('product.gallery')) {
      const section = page.sections.find((item) => item.sectionKey === 'product.gallery')
      if (section) {
        setProductGalleryImages(parseProductGalleryImages(section.contentJson, []))
        setProductGalleryHeroCopy(parseProductGalleryHeroCopy(
          section.contentJson,
          getDefaultProductGalleryHeroCopy(activeProductGalleryPage.label),
        ))
        setProductGalleryVideo(parseProductGalleryVideo(
          section.contentJson,
          getDefaultProductGalleryVideo(activeProductGalleryPage.label),
        ))
      }
    }
  }

  const saveCmsSectionsVerified = async (
    requests: Array<{ sectionKey: string; requestBody: CmsSectionForm }>,
  ) => {
    if (!selectedPage) {
      throw new Error('CMS sayfası seçilmedi')
    }

    const pageAtSave = selectedPage
    const changedRequests = requests.filter(({ sectionKey, requestBody }) =>
      !sectionMatchesRequest(
        pageAtSave.sections.find((section) => section.sectionKey === sectionKey),
        requestBody,
      )
    )

    if (changedRequests.length === 0) {
      return { changedCount: 0, publicVerified: undefined }
    }

    const changedSectionKeys = changedRequests.map(({ sectionKey }) => sectionKey)

    try {
      const verification = await runVerifiedSave({
        write: async () => {
          for (const { sectionKey, requestBody } of changedRequests) {
            await saveSection(sectionKey, requestBody)
          }
        },
        readBack: () => readCmsPage(pageAtSave.id),
        cmsMatches: (page) => pageMatchesIsolatedChanges(page, pageAtSave, {}, changedRequests),
        onCmsRead: (page) => applySectionReadback(page, changedSectionKeys),
        revalidate: () => revalidateCmsPage(pageAtSave.pageKey, pageAtSave.slug),
        readPublic: () => readPublicCmsPage(pageAtSave.pageKey),
        publicMatches: (publicPage, verifiedPage) => pageMatchesIsolatedChanges(
          publicPage,
          verifiedPage,
        ),
        publicMismatchIsError: false,
      })
      return { changedCount: changedRequests.length, publicVerified: verification.publicVerified === true }
    } catch (error) {
      try {
        applySectionReadback(await readCmsPage(pageAtSave.id), changedSectionKeys)
      } catch {
        // The original save/readback error remains the actionable failure.
      }
      throw error
    }

  }

  const handleSeoConfirmSave = async () => {
    if (!selectedPage || !seoPreviewOpen) return

    const pageAtSave = selectedPage
    const requestedSeoTitle = draftSeoTitle
    const requestedSeoDescription = draftSeoDescription
    setIsLoading(true)
    setErrorMessage(null)
    setStatusMessage(null)
    try {
      const verification = await runVerifiedSave({
        write: async () => { await savePageBasics() },
        readBack: () => readCmsPage(pageAtSave.id),
        cmsMatches: (actual) => pageMatchesIsolatedChanges(actual, pageAtSave, {
          seoTitle: requestedSeoTitle,
          seoDescription: requestedSeoDescription,
        }),
        onCmsRead: (actual) => {
          const actualTitle = actual.seoTitle || ''
          const actualDescription = actual.seoDescription || ''
          setSelectedPage(actual)
          setSavedSeoTitle(actualTitle)
          setSavedSeoDescription(actualDescription)
          setDraftSeoTitle(actualTitle)
          setDraftSeoDescription(actualDescription)
          setSeoPreviewOpen(false)
        },
        revalidate: () => revalidateCmsPage(pageAtSave.pageKey, pageAtSave.slug),
        readPublic: async () => {
          const response = await fetch('/api/seo-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pages: [{ pageKey: pageAtSave.pageKey, slug: pageAtSave.slug }] }),
          })
          if (!response.ok) throw new Error('Public metadata doğrulaması başarısız oldu')
          const body = await response.json() as {
            statuses: Array<{
              pageKey: string
              state: 'same' | 'different' | 'error'
              httpStatus?: number
              publicTitle?: string
              publicDescription?: string
              errorReason?: string
              errorMessage?: string
            }>
          }
          return body.statuses[0]
        },
        publicMatches: (actual, verified) =>
          actual?.state === 'same'
          && (actual.publicTitle || '') === (verified.seoTitle || '')
          && (actual.publicDescription || '') === (verified.seoDescription || ''),
        onPublicRead: (actual) => {
          setPublicSeoResults((current) => ({
            ...current,
            [pageAtSave.pageKey]: {
              state: actual?.state || 'error',
              publicSeoTitle: actual?.publicTitle || '',
              publicSeoDescription: actual?.publicDescription || '',
              httpStatus: actual?.httpStatus,
              errorReason: actual?.errorReason,
              errorMessage: actual?.errorMessage,
            },
          }))
        },
        publicMismatchIsError: false,
      })
      setStatusMessage(verification.publicVerified
        ? 'SEO bilgileri kaydedildi, CMS’den geri okundu ve public metadata ile doğrulandı'
        : 'SEO bilgileri CMS’ye kaydedildi ve doğrulandı. Public yayılım henüz tamamlanmadı; durum daha sonra yeniden kontrol edilecek.')
    } catch (error) {
      if (error instanceof SaveVerificationError) {
        setPublicSeoResults((current) => ({
          ...current,
          [pageAtSave.pageKey]: {
            state: 'error',
            publicSeoTitle: current[pageAtSave.pageKey]?.publicSeoTitle || '',
            publicSeoDescription: current[pageAtSave.pageKey]?.publicSeoDescription || '',
          },
        }))
      }
      await loadPage(pageAtSave.id)
      setErrorMessage(error instanceof Error ? error.message : 'SEO bilgileri kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageTitleSave = async () => {
    if (!selectedPage || !authHeader) return

    const pageAtSave = selectedPage
    const requestedTitle = pageForm.title
    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)
    try {
      await runVerifiedSave({
        write: async () => {
          await request<CmsPageDetail>(`/api/admin/cms/pages/${pageAtSave.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              slug: pageAtSave.slug,
              title: requestedTitle,
              seoTitle: pageAtSave.seoTitle,
              seoDescription: pageAtSave.seoDescription,
              status: pageAtSave.status,
            }),
          })
        },
        readBack: () => readCmsPage(pageAtSave.id),
        cmsMatches: (actual) => pageMatchesIsolatedChanges(actual, pageAtSave, {
          title: requestedTitle,
        }),
        onCmsRead: (actual) => {
          setSelectedPage(actual)
          setPageForm({ slug: actual.slug, title: actual.title, status: actual.status })
        },
        revalidate: () => revalidateCmsPage(pageAtSave.pageKey, pageAtSave.slug),
        readPublic: () => readPublicCmsPage(pageAtSave.pageKey),
        publicMatches: (actual, verified) => pageMatchesIsolatedChanges(actual, verified),
      })
      setStatusMessage('Sayfa adı CMS ve public API’den doğrulanarak kaydedildi')
    } catch (error) {
      await loadPage(pageAtSave.id)
      setErrorMessage(error instanceof Error ? error.message : 'Sayfa adı kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleHomeSave = async () => {
    if (!selectedPage) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedHeroSlides = await Promise.all(heroSlides.map(async (slide) => ({ ...slide, image: await materializeImageUrl(slide.image) })))
      setHeroSlides(savedHeroSlides)
      const heroSection = selectedPage.sections.find((section) => section.sectionKey === 'home.hero')
      const result = await saveCmsSectionsVerified(heroSection ? [{
        sectionKey: 'home.hero',
        requestBody: {
          sectionType: heroSection.sectionType,
          title: heroSection.title || '',
          subtitle: heroSection.subtitle || '',
          body: heroSection.body || '',
          contentJson: buildHeroContentJson(savedHeroSlides, heroStats),
          sortOrder: heroSection.sortOrder,
          enabled: heroSection.enabled,
        },
      }] : [])
      setStatusMessage(result.changedCount > 0 ? 'Ana sayfa CMS ve public çıktıyla doğrulanarak kaydedildi' : 'Kaydedilecek değişiklik bulunamadı')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Ana sayfa kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAboutSave = async () => {
    if (!selectedPage) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedAboutForm = { ...aboutForm, image: await materializeImageUrl(aboutForm.image) }
      setAboutForm(savedAboutForm)
      const aboutSection = selectedPage.sections.find((section) => section.sectionKey === 'about.main')
      const result = await saveCmsSectionsVerified(aboutSection ? [{
        sectionKey: 'about.main',
        requestBody: {
          sectionType: aboutSection.sectionType,
          title: savedAboutForm.title,
          subtitle: savedAboutForm.eyebrow,
          body: savedAboutForm.lead,
          contentJson: buildAboutContentJson(savedAboutForm),
          sortOrder: aboutSection.sortOrder,
          enabled: aboutSection.enabled,
        },
      }] : [])
      setStatusMessage(result.changedCount > 0 ? 'Hakkımızda CMS ve public çıktıyla doğrulanarak kaydedildi' : 'Kaydedilecek değişiklik bulunamadı')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Hakkımızda kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductsSave = async () => {
    if (!selectedPage) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedProductItems = await Promise.all(productItems.map(async (item) => ({ ...item, image: await materializeImageUrl(item.image) })))
      setProductItems(savedProductItems)
      const requests: Array<{ sectionKey: string; requestBody: CmsSectionForm }> = []
      const productsHeroSection = selectedPage.sections.find((section) => section.sectionKey === 'products.hero')
      if (productsHeroSection) {
        requests.push({ sectionKey: 'products.hero', requestBody: {
          sectionType: productsHeroSection.sectionType,
          title: productsPageCopy.heroTitle,
          subtitle: productsHeroSection.subtitle || '',
          body: productsPageCopy.heroSubtitle,
          contentJson: productsHeroSection.contentJson || '',
          sortOrder: productsHeroSection.sortOrder,
          enabled: productsHeroSection.enabled,
        } })
      }
      const productsSection = selectedPage.sections.find((section) => section.sectionKey === 'products.grid')
      if (productsSection) {
        requests.push({ sectionKey: 'products.grid', requestBody: {
          sectionType: productsSection.sectionType,
          title: productsPageCopy.sectionTitle,
          subtitle: productsPageCopy.sectionEyebrow,
          body: productsPageCopy.sectionDescription,
          contentJson: buildCatalogContentJson(savedProductItems),
          sortOrder: productsSection.sortOrder,
          enabled: productsSection.enabled,
        } })
      }
      const result = await saveCmsSectionsVerified(requests)
      setStatusMessage(result.changedCount > 0 ? 'Ürünler CMS ve public çıktıyla doğrulanarak kaydedildi' : 'Kaydedilecek değişiklik bulunamadı')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Ürünler kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleModelsSave = async () => {
    if (!selectedPage) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedModelItems = await Promise.all(modelItems.map(async (item) => ({ ...item, image: await materializeImageUrl(item.image) })))
      setModelItems(savedModelItems)
      const requests: Array<{ sectionKey: string; requestBody: CmsSectionForm }> = []
      const modelsHeroSection = selectedPage.sections.find((section) => section.sectionKey === 'models.hero')
      if (modelsHeroSection) {
        requests.push({ sectionKey: 'models.hero', requestBody: {
          sectionType: modelsHeroSection.sectionType,
          title: modelsPageCopy.heroTitle,
          subtitle: modelsHeroSection.subtitle || '',
          body: modelsPageCopy.heroSubtitle,
          contentJson: modelsHeroSection.contentJson || '',
          sortOrder: modelsHeroSection.sortOrder,
          enabled: modelsHeroSection.enabled,
        } })
      }
      const modelsSection = selectedPage.sections.find((section) => section.sectionKey === 'models.grid')
      if (modelsSection) {
        requests.push({ sectionKey: 'models.grid', requestBody: {
          sectionType: modelsSection.sectionType,
          title: modelsSection.title || '',
          subtitle: modelsSection.subtitle || '',
          body: modelsSection.body || '',
          contentJson: buildCatalogContentJson(savedModelItems),
          sortOrder: modelsSection.sortOrder,
          enabled: modelsSection.enabled,
        } })
      }
      const result = await saveCmsSectionsVerified(requests)
      setStatusMessage(result.changedCount > 0 ? 'Perde Modelleri CMS ve public çıktıyla doğrulanarak kaydedildi' : 'Kaydedilecek değişiklik bulunamadı')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Perde Modelleri kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCorporateSave = async () => {
    if (!selectedPage) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedCorporateItems = await Promise.all(corporateItems.map(async (item) => ({ ...item, image: await materializeImageUrl(item.image) })))
      setCorporateItems(savedCorporateItems)
      const corporateSection = selectedPage.sections.find((section) => section.sectionKey === 'corporate.grid')
      const result = await saveCmsSectionsVerified(corporateSection ? [{
        sectionKey: 'corporate.grid',
        requestBody: {
          sectionType: corporateSection.sectionType,
          title: corporateSection.title || '',
          subtitle: corporateSection.subtitle || '',
          body: corporateSection.body || '',
          contentJson: buildCatalogContentJson(savedCorporateItems),
          sortOrder: corporateSection.sortOrder,
          enabled: corporateSection.enabled,
        },
      }] : [])
      setStatusMessage(result.changedCount > 0 ? 'Kurumsal Ürünler CMS ve public çıktıyla doğrulanarak kaydedildi' : 'Kaydedilecek değişiklik bulunamadı')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Kurumsal Ürünler kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlogSave = async () => {
    if (!selectedPage) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedBlogPosts = await Promise.all(blogPosts.map(async (post) => ({ ...post, image: await materializeImageUrl(post.image) })))
      setBlogPosts(savedBlogPosts)
      const blogSection = selectedPage.sections.find((section) => section.sectionKey === 'blog.list')
      const result = await saveCmsSectionsVerified(blogSection ? [{
        sectionKey: 'blog.list',
        requestBody: {
          sectionType: blogSection.sectionType,
          title: blogSection.title || '',
          subtitle: blogSection.subtitle || '',
          body: blogSection.body || '',
          contentJson: buildBlogContentJson(savedBlogPosts),
          sortOrder: blogSection.sortOrder,
          enabled: blogSection.enabled,
        },
      }] : [])
      setStatusMessage(result.changedCount > 0 ? 'Blog CMS ve public çıktıyla doğrulanarak kaydedildi' : 'Kaydedilecek değişiklik bulunamadı')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Blog kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductGallerySave = async () => {
    if (!selectedPage || !authHeader) return

    const pageAtSave = selectedPage
    let savedGalleryImages = productGalleryImages
    try {
      savedGalleryImages = await Promise.all(productGalleryImages.map(async (image) => ({ ...image, src: await materializeImageUrl(image.src) })))
      setProductGalleryImages(savedGalleryImages)
    } catch (error) {
      setProductGallerySaveResult({
        state: 'error', message: error instanceof Error ? error.message : 'Görseller yüklenemedi',
        savedParts: [], failedParts: ['Görseller'], technicalDetails: [],
      })
      return
    }
    const pageChanges = {
      ...(pageTitleDirty ? { title: pageForm.title } : {}),
      ...(seoDirty ? { seoTitle: draftSeoTitle, seoDescription: draftSeoDescription } : {}),
    }
    const gallerySection = pageAtSave.sections.find((section) => section.sectionKey === 'product.gallery')
    const galleryRequest = gallerySection ? {
      sectionKey: 'product.gallery',
      requestBody: {
        sectionType: gallerySection.sectionType,
        title: gallerySection.title || '',
        subtitle: gallerySection.subtitle || '',
        body: gallerySection.body || '',
        contentJson: buildProductGalleryContentJson(savedGalleryImages, productGalleryHeroCopy, productGalleryVideo),
        sortOrder: gallerySection.sortOrder,
        enabled: gallerySection.enabled,
      },
    } : null
    const shouldSavePage = pageTitleDirty || seoDirty
    const shouldSaveGallery = Boolean(galleryRequest && !sectionMatchesRequest(gallerySection, galleryRequest.requestBody))

    if (!shouldSavePage && !shouldSaveGallery) return

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)
    setProductGallerySaveResult({ state: 'idle', message: '', savedParts: [], failedParts: [], technicalDetails: [] })
    setProductGalleryTechnicalDetailsOpen(false)

    let verifiedPage = pageAtSave
    const savedParts: string[] = []
    const failedParts: string[] = []
    const technicalDetails: ProductGalleryTechnicalDetail[] = []
    const pageEndpoint = `/api/admin/cms/pages/${pageAtSave.id}`
    const galleryEndpoint = `${pageEndpoint}/sections/${encodeURIComponent('product.gallery')}`

    if (shouldSavePage) {
      try {
        const result = await runVerifiedSave({
          write: async () => {
            await request<CmsPageDetail>(`/api/admin/cms/pages/${pageAtSave.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                slug: pageAtSave.slug,
                title: pageTitleDirty ? pageForm.title : pageAtSave.title,
                seoTitle: seoDirty ? draftSeoTitle : pageAtSave.seoTitle,
                seoDescription: seoDirty ? draftSeoDescription : pageAtSave.seoDescription,
                status: pageAtSave.status,
              }),
            })
          },
          readBack: () => readCmsPage(pageAtSave.id),
          cmsMatches: (actual) => pageMatchesIsolatedChanges(actual, verifiedPage, pageChanges),
        })
        verifiedPage = result.cmsValue
        setSelectedPage(result.cmsValue)
        setPageForm({ slug: result.cmsValue.slug, title: result.cmsValue.title, status: result.cmsValue.status })
        setSavedSeoTitle(result.cmsValue.seoTitle || '')
        setSavedSeoDescription(result.cmsValue.seoDescription || '')
        setDraftSeoTitle(result.cmsValue.seoTitle || '')
        setDraftSeoDescription(result.cmsValue.seoDescription || '')
        setSeoPreviewOpen(false)
        savedParts.push(pageTitleDirty && seoDirty ? 'Sayfa adı ve Google bilgileri' : pageTitleDirty ? 'Sayfa adı' : 'Google bilgileri')
      } catch (error) {
        failedParts.push(`Sayfa/Google: ${error instanceof Error ? error.message : 'Kaydedilemedi'}`)
        technicalDetails.push(toProductGalleryTechnicalDetail(error, 'Sayfa/Google bilgileri', pageEndpoint, false))
      }
    }

    if (shouldSaveGallery && galleryRequest) {
      const galleryBaseline = verifiedPage
      try {
        const result = await runVerifiedSave({
          write: () => saveSection(galleryRequest.sectionKey, galleryRequest.requestBody),
          readBack: () => readCmsPage(pageAtSave.id),
          cmsMatches: (actual) => pageMatchesIsolatedChanges(actual, galleryBaseline, {}, [galleryRequest]),
        })
        verifiedPage = result.cmsValue
        applySectionReadback(result.cmsValue, [galleryRequest.sectionKey])
        savedParts.push('Galeri, hero ve video')
      } catch (error) {
        failedParts.push(`Galeri/hero/video: ${error instanceof Error ? error.message : 'Kaydedilemedi'}`)
        technicalDetails.push(toProductGalleryTechnicalDetail(error, 'Hero/Video/Galeri', galleryEndpoint, false))
      }
    }

    let publicPending = false
    if (savedParts.length > 0) {
      const finalCmsPage = verifiedPage
      try {
        const verification = await runVerifiedSave({
          write: async () => {},
          readBack: () => readCmsPage(pageAtSave.id),
          cmsMatches: (actual) => pageMatchesIsolatedChanges(actual, finalCmsPage),
          revalidate: () => revalidateCmsPage(pageAtSave.pageKey, pageAtSave.slug),
          readPublic: () => readPublicCmsPage(pageAtSave.pageKey),
          publicMatches: (actual) => pageMatchesIsolatedChanges(actual, finalCmsPage),
          publicMismatchIsError: false,
        })
        publicPending = verification.publicVerified !== true
      } catch (error) {
        failedParts.push(`Genel doğrulama: ${error instanceof Error ? error.message : 'Tamamlanamadı'}`)
        technicalDetails.push(toProductGalleryTechnicalDetail(
          error,
          'Public doğrulama',
          `/api/public/cms/pages/${encodeURIComponent(pageAtSave.pageKey)}`,
          true,
        ))
      }
    }

    if (failedParts.length > 0) {
      const state = savedParts.length > 0 ? 'partial' : 'error'
      const prefix = savedParts.length > 0
        ? `Kısmi kayıt: ${savedParts.join(', ')} kaydedildi. `
        : 'Kayıt başarısız. '
      setProductGallerySaveResult({
        state,
        message: `${prefix}${failedParts.join(' | ')}`,
        savedParts,
        failedParts,
        technicalDetails,
      })
      setErrorMessage(`${prefix}${failedParts.join(' | ')}`)
    } else {
      setProductGallerySaveResult({
        state: 'saved',
        message: 'Kaydedildi',
        note: publicPending ? 'Yayına yansıması bekleniyor' : undefined,
        savedParts,
        failedParts: [],
        technicalDetails: [],
      })
      setStatusMessage('Kaydedildi')
    }

    setIsLoading(false)
  }

  const handleMechanizedSave = async () => {
    if (!selectedPage) {
      return
    }

    setIsLoading(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const savedMechanizedForm = {
        ...mechanizedForm,
        categories: await Promise.all(mechanizedForm.categories.map(async (item) => ({ ...item, image: await materializeImageUrl(item.image) }))),
      }
      setMechanizedForm(savedMechanizedForm)
      const detailSection = selectedPage.sections.find((section) => section.sectionKey === 'product.detail')
      const result = await saveCmsSectionsVerified(detailSection ? [{
        sectionKey: 'product.detail',
        requestBody: {
          sectionType: detailSection.sectionType,
          title: savedMechanizedForm.heroTitle,
          subtitle: savedMechanizedForm.heroEyebrow,
          body: savedMechanizedForm.heroDescription,
          contentJson: buildProductDetailContentJson(savedMechanizedForm),
          sortOrder: detailSection.sortOrder,
          enabled: detailSection.enabled,
        },
      }] : [])
      setStatusMessage(result.changedCount > 0 ? `${activeProductDetailPage?.label || 'Ürün detay'} CMS ve public çıktıyla doğrulanarak kaydedildi` : 'Kaydedilecek değişiklik bulunamadı')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : `${activeProductDetailPage?.label || 'Ürün detay'} kaydedilemedi`)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProductItem = (itemId: number, updates: Partial<CatalogItem>) => {
    setProductItems((current) =>
      current.map((item) => item.id === itemId ? { ...item, ...updates } : item)
    )
  }

  const addProductItem = () => {
    setProductItems((current) => [
      ...current,
      {
        id: getNextNumericId(current),
        title: 'Yeni Urun',
        image: mediaAssets[0]?.publicUrl || fallbackCardImage,
        href: '/urunler/yeni-urun',
        description: 'Yeni urun aciklamasi',
        enabled: true,
      },
    ])
  }

  const removeProductItem = (itemId: number) => {
    if (window.confirm('Bu urun karti silinsin mi?')) {
      setProductItems((current) => current.filter((item) => item.id !== itemId))
    }
  }

  const moveProductItem = (itemId: number, direction: 'up' | 'down') => {
    setProductItems((current) => moveItemById(current, itemId, direction))
  }

  const updateModelItem = (itemId: number, updates: Partial<CatalogItem>) => {
    setModelItems((current) =>
      current.map((item) => item.id === itemId ? { ...item, ...updates } : item)
    )
  }

  const addModelItem = () => {
    setModelItems((current) => [
      ...current,
      {
        id: getNextNumericId(current),
        title: 'Yeni Model',
        image: mediaAssets[0]?.publicUrl || fallbackCardImage,
        href: '/model-perdeler/yeni-model',
        description: 'Yeni model aciklamasi',
        enabled: true,
      },
    ])
  }

  const removeModelItem = (itemId: number) => {
    if (window.confirm('Bu model karti silinsin mi?')) {
      setModelItems((current) => current.filter((item) => item.id !== itemId))
    }
  }

  const moveModelItem = (itemId: number, direction: 'up' | 'down') => {
    setModelItems((current) => moveItemById(current, itemId, direction))
  }

  const updateCorporateItem = (itemId: number, updates: Partial<CatalogItem>) => {
    setCorporateItems((current) =>
      current.map((item) => item.id === itemId ? { ...item, ...updates } : item)
    )
  }

  const addCorporateItem = () => {
    setCorporateItems((current) => [
      ...current,
      {
        id: getNextNumericId(current),
        title: 'Yeni Kurumsal Urun',
        image: mediaAssets[0]?.publicUrl || fallbackCardImage,
        href: '/kurumsal-urunler/yeni-kurumsal-urun',
        description: 'Yeni kurumsal urun aciklamasi',
        badge: 'Yeni',
        enabled: true,
      },
    ])
  }

  const removeCorporateItem = (itemId: number) => {
    if (window.confirm('Bu kurumsal urun karti silinsin mi?')) {
      setCorporateItems((current) => current.filter((item) => item.id !== itemId))
    }
  }

  const moveCorporateItem = (itemId: number, direction: 'up' | 'down') => {
    setCorporateItems((current) => moveItemById(current, itemId, direction))
  }

  const updateBlogPost = (postId: number, updates: Partial<BlogPost>) => {
    setBlogPosts((current) =>
      current.map((post) => post.id === postId ? { ...post, ...updates } : post)
    )
  }

  const updateProductGalleryImage = (imageId: number, updates: Partial<ProductGalleryImage>) => {
    setProductGalleryImages((current) =>
      current.map((image) => image.id === imageId ? { ...image, ...updates } : image)
    )
  }

  const addProductGalleryImage = () => {
    setProductGalleryImages((current) => [
      ...current,
      {
        id: current.reduce((maxId, image) => Math.max(maxId, image.id), 0) + 1,
        src: '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
        alt: `${activeProductGalleryPage.label} görseli`,
        title: `${activeProductGalleryPage.label} görseli`,
        enabled: true,
      },
    ])
  }

  const removeProductGalleryImage = (imageId: number) => {
    setProductGalleryImages((current) => current.filter((image) => image.id !== imageId))
  }

  const moveProductGalleryImage = (imageId: number, direction: 'up' | 'down') => {
    setProductGalleryImages((current) => {
      const index = current.findIndex((image) => image.id === imageId)
      const targetIndex = direction === 'up' ? index - 1 : index + 1

      if (index < 0 || targetIndex < 0 || targetIndex >= current.length) {
        return current
      }

      const nextImages = [...current]
      const currentImage = nextImages[index]
      nextImages[index] = nextImages[targetIndex]
      nextImages[targetIndex] = currentImage
      return nextImages
    })
  }

  const openCategoryGallery = (galleryPage: ProductGalleryAdminPage) => {
    setSelectedProductGalleryPageKey(galleryPage.pageKey)
    setActivePanel('productGalleries')
    void loadPageByKey(galleryPage.pageKey, authHeader, galleryPage)
  }

  const renderMediaPickerLimitToggle = (pickerKey: string) => {
    if (mediaAssets.length <= 16) {
      return null
    }

    const isExpanded = expandedMediaPickerKey === pickerKey

    return (
      <button
        type="button"
        onClick={() => setExpandedMediaPickerKey((current) => current === pickerKey ? null : pickerKey)}
        className="mb-2 rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] hover:text-[#3a342c]"
      >
        {isExpanded ? 'Daha az goster' : `Tumunu goruntule (${mediaAssets.length})`}
      </button>
    )
  }

  const updateBlogPostTitle = (postId: number, title: string) => {
    setBlogPosts((current) =>
      current.map((post) => {
        if (post.id !== postId) {
          return post
        }

        const previousGeneratedSlug = slugifyBlogTitle(post.title)
        const nextGeneratedSlug = makeUniqueBlogSlug(slugifyBlogTitle(title), current, postId)
        const shouldSyncSlug = !post.slug || post.slug === previousGeneratedSlug
        const nextSlug = shouldSyncSlug ? nextGeneratedSlug : post.slug
        const shouldSyncHref = !post.href || post.href === buildBlogHref(post.slug) || (shouldSyncSlug && post.href === buildBlogHref(previousGeneratedSlug))

        return {
          ...post,
          title,
          slug: nextSlug,
          href: shouldSyncHref ? buildBlogHref(nextSlug) : post.href,
        }
      })
    )
  }

  const updateBlogPostSlug = (postId: number, value: string) => {
    setBlogPosts((current) =>
      current.map((post) => {
        if (post.id !== postId) {
          return post
        }

        const nextSlug = makeUniqueBlogSlug(slugifyBlogTitle(value), current, postId)
        return {
          ...post,
          slug: nextSlug,
          href: buildBlogHref(nextSlug),
        }
      })
    )
  }

  const addBlogPost = () => {
    setBlogPosts((current) => {
      const nextId = current.reduce((maxId, post) => Math.max(maxId, post.id), 0) + 1
      const nextSlug = makeUniqueBlogSlug('yeni-blog-yazisi', current)

      return [
        {
          id: nextId,
          title: 'Yeni blog yazisi',
          excerpt: '',
          content: '<p>Yeni blog yazisi icerigi.</p>',
          category: 'Blog',
          date: new Date().toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          image: '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
          readTime: '1 dk okuma',
          href: buildBlogHref(nextSlug),
          slug: nextSlug,
          enabled: false,
        },
        ...current,
      ]
    })
  }

  const removeBlogPost = (postId: number) => {
    const post = blogPosts.find((item) => item.id === postId)
    const confirmed = window.confirm(`${post?.title || 'Bu yazi'} kaldirilsin mi?`)
    if (!confirmed) {
      return
    }

    setBlogPosts((current) => current.filter((item) => item.id !== postId))
  }

  const updateBlogContentBlocks = (postId: number, blocks: BlogContentBlock[]) => {
    updateBlogPost(postId, { content: buildBlogArticleContent(blocks) })
  }

  const updateBlogContentBlock = (
    postId: number,
    blockIndex: number,
    updates: Partial<BlogContentBlock>,
  ) => {
    const post = blogPosts.find((item) => item.id === postId)
    if (!post) {
      return
    }

    const blocks = parseBlogContentBlocks(post.content)
    blocks[blockIndex] = { ...blocks[blockIndex], ...updates }
    updateBlogContentBlocks(postId, blocks)
  }

  const addBlogContentBlock = (postId: number, type: BlogContentBlock['type']) => {
    const post = blogPosts.find((item) => item.id === postId)
    if (!post) {
      return
    }

    const blocks = parseBlogContentBlocks(post.content)
    updateBlogContentBlocks(postId, [
      ...blocks,
      {
        id: blocks.reduce((maxId, block) => Math.max(maxId, block.id), 0) + 1,
        type,
        text: type === 'heading' ? 'Yeni baslik' : type === 'list' ? 'Liste maddesi' : 'Yeni paragraf',
      },
    ])
  }

  const removeBlogContentBlock = (postId: number, blockIndex: number) => {
    const post = blogPosts.find((item) => item.id === postId)
    if (!post) {
      return
    }

    const blocks = parseBlogContentBlocks(post.content)
    const nextBlocks = blocks.filter((_, index) => index !== blockIndex)
    updateBlogContentBlocks(postId, nextBlocks.length > 0 ? nextBlocks : [{ id: 1, type: 'paragraph', text: '' }])
  }

  const updateMechanizedCategory = (itemId: number, updates: Partial<ProductCategoryItem>) => {
    setMechanizedForm((current) => ({
      ...current,
      categories: current.categories.map((item) => item.id === itemId ? { ...item, ...updates } : item),
    }))
  }

  const addMechanizedCategory = () => {
    setMechanizedForm((current) => ({
      ...current,
      categories: [
        ...current.categories,
        {
          id: getNextNumericId(current.categories),
          title: 'Yeni Kategori',
          description: 'Yeni kategori aciklamasi',
          image: mediaAssets[0]?.publicUrl || fallbackCardImage,
          href: `${pageForm.slug || '/urunler'}/yeni-kategori`.replace(/\/+/g, '/'),
          enabled: true,
        },
      ],
    }))
  }

  const removeMechanizedCategory = (itemId: number) => {
    if (!window.confirm('Bu kategori karti silinsin mi?')) {
      return
    }

    setMechanizedForm((current) => ({
      ...current,
      categories: current.categories.filter((item) => item.id !== itemId),
    }))
  }

  const moveMechanizedCategory = (itemId: number, direction: 'up' | 'down') => {
    setMechanizedForm((current) => ({
      ...current,
      categories: moveItemById(current.categories, itemId, direction),
    }))
  }

  const updateAboutTab = (index: number, updates: Partial<AboutTabForm>) => {
    setAboutForm((current) => ({
      ...current,
      tabs: current.tabs.map((tab, tabIndex) => tabIndex === index ? { ...tab, ...updates } : tab),
    }))
  }

  const updateAboutStat = (index: number, updates: Partial<AboutStatForm>) => {
    setAboutForm((current) => ({
      ...current,
      stats: current.stats.map((stat, statIndex) => statIndex === index ? { ...stat, ...updates } : stat),
    }))
  }

  const updateHeroStat = (index: number, updates: Partial<HeroStatForm>) => {
    setHeroStats((current) =>
      current.map((stat, statIndex) => statIndex === index ? { ...stat, ...updates } : stat)
    )
  }

  const updateAboutService = (index: number, value: string) => {
    setAboutForm((current) => ({
      ...current,
      services: current.services.map((service, serviceIndex) => serviceIndex === index ? value : service),
    }))
  }

  const seoDirty = Boolean(selectedPage) && (
    draftSeoTitle !== savedSeoTitle
    || draftSeoDescription !== savedSeoDescription
  )
  const pageTitleDirty = Boolean(selectedPage) && pageForm.title !== (selectedPage?.title || '')
  const pageStatusPreviewDirty = Boolean(selectedPage) && pageForm.status !== (selectedPage?.status || '')
  const activeContentDirty = (() => {
    if (!selectedPage) return false
    const differs = (sectionKey: string, requestBody: CmsSectionForm) => !sectionMatchesRequest(
      selectedPage.sections.find((section) => section.sectionKey === sectionKey),
      requestBody,
    )
    const section = (sectionKey: string) => selectedPage.sections.find((item) => item.sectionKey === sectionKey)
    const requestFrom = (current: CmsSection, updates: Partial<CmsSectionForm>): CmsSectionForm => ({
      sectionType: current.sectionType,
      title: current.title || '',
      subtitle: current.subtitle || '',
      body: current.body || '',
      contentJson: current.contentJson || '',
      sortOrder: current.sortOrder,
      enabled: current.enabled,
      ...updates,
    })

    if (activePanel === 'home') {
      const current = section('home.hero')
      return current ? differs('home.hero', requestFrom(current, { contentJson: buildHeroContentJson(heroSlides, heroStats) })) : false
    }
    if (activePanel === 'about') {
      const current = section('about.main')
      return current ? differs('about.main', requestFrom(current, {
        title: aboutForm.title,
        subtitle: aboutForm.eyebrow,
        body: aboutForm.lead,
        contentJson: buildAboutContentJson(aboutForm),
      })) : false
    }
    if (activePanel === 'products') {
      const hero = section('products.hero')
      const grid = section('products.grid')
      return Boolean(
        hero && differs('products.hero', requestFrom(hero, { title: productsPageCopy.heroTitle, body: productsPageCopy.heroSubtitle }))
        || grid && differs('products.grid', requestFrom(grid, {
          title: productsPageCopy.sectionTitle,
          subtitle: productsPageCopy.sectionEyebrow,
          body: productsPageCopy.sectionDescription,
          contentJson: buildCatalogContentJson(productItems),
        }))
      )
    }
    if (activePanel === 'curtainModels') {
      const hero = section('models.hero')
      const grid = section('models.grid')
      return Boolean(
        hero && differs('models.hero', requestFrom(hero, { title: modelsPageCopy.heroTitle, body: modelsPageCopy.heroSubtitle }))
        || grid && differs('models.grid', requestFrom(grid, { contentJson: buildCatalogContentJson(modelItems) }))
      )
    }
    if (activePanel === 'corporateProducts') {
      const current = section('corporate.grid')
      return current ? differs('corporate.grid', requestFrom(current, { contentJson: buildCatalogContentJson(corporateItems) })) : false
    }
    if (activePanel === 'blog') {
      const current = section('blog.list')
      return current ? differs('blog.list', requestFrom(current, { contentJson: buildBlogContentJson(blogPosts) })) : false
    }
    if (activePanel === 'productGalleries') {
      const current = section('product.gallery')
      return current ? differs('product.gallery', requestFrom(current, {
        contentJson: buildProductGalleryContentJson(productGalleryImages, productGalleryHeroCopy, productGalleryVideo),
      })) : false
    }
    if (productDetailPanels.includes(activePanel)) {
      const current = section('product.detail')
      return current ? differs('product.detail', requestFrom(current, {
        title: mechanizedForm.heroTitle,
        subtitle: mechanizedForm.heroEyebrow,
        body: mechanizedForm.heroDescription,
        contentJson: buildProductDetailContentJson(mechanizedForm),
      })) : false
    }
    return false
  })()
  const settingsDirty = editableSettingKeys.some((settingKey) => {
    const saved = settings.find((setting) => setting.settingKey === settingKey)?.settingValue
    return saved !== undefined && (settingsForm[settingKey] || '') !== saved
  })
  const contactRequestDirty = Boolean(selectedContactRequest) && (
    contactRequestForm.status !== selectedContactRequest?.status
    || contactRequestForm.adminNote !== (selectedContactRequest?.adminNote || '')
  )
  const productGalleryDirty = activePanel === 'productGalleries' && (pageTitleDirty || seoDirty || activeContentDirty)
  const previewDirty = Boolean(selectedPage) && (pageTitleDirty || pageStatusPreviewDirty || seoDirty || activeContentDirty)
  const isLocalEnvironment = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)

  const handleLocalPreview = () => {
    if (!selectedPage || !isLocalEnvironment) return

    const sections = selectedPage.sections.map((section) => ({ ...section }))
    const patchSection = (sectionKey: string, updates: Partial<CmsSection>) => {
      const index = sections.findIndex((section) => section.sectionKey === sectionKey)
      if (index >= 0) sections[index] = { ...sections[index], ...updates }
    }

    if (activePanel === 'home') patchSection('home.hero', { contentJson: buildHeroContentJson(heroSlides, heroStats) })
    if (activePanel === 'about') patchSection('about.main', {
      title: aboutForm.title, subtitle: aboutForm.eyebrow, body: aboutForm.lead,
      contentJson: buildAboutContentJson(aboutForm),
    })
    if (activePanel === 'products') {
      patchSection('products.hero', { title: productsPageCopy.heroTitle, body: productsPageCopy.heroSubtitle })
      patchSection('products.grid', {
        title: productsPageCopy.sectionTitle, subtitle: productsPageCopy.sectionEyebrow,
        body: productsPageCopy.sectionDescription, contentJson: buildCatalogContentJson(productItems),
      })
    }
    if (activePanel === 'curtainModels') {
      patchSection('models.hero', { title: modelsPageCopy.heroTitle, body: modelsPageCopy.heroSubtitle })
      patchSection('models.grid', { contentJson: buildCatalogContentJson(modelItems) })
    }
    if (activePanel === 'corporateProducts') patchSection('corporate.grid', { contentJson: buildCatalogContentJson(corporateItems) })
    if (activePanel === 'blog') patchSection('blog.list', { contentJson: buildBlogContentJson(blogPosts) })
    if (activePanel === 'productGalleries') patchSection('product.gallery', {
      contentJson: buildProductGalleryContentJson(productGalleryImages, productGalleryHeroCopy, productGalleryVideo),
    })
    if (productDetailPanels.includes(activePanel)) patchSection('product.detail', {
      title: mechanizedForm.heroTitle, subtitle: mechanizedForm.heroEyebrow,
      body: mechanizedForm.heroDescription, contentJson: buildProductDetailContentJson(mechanizedForm),
    })

    const token = createLocalPreview({
      localPreview: true,
      pageKey: selectedPage.pageKey,
      slug: selectedPage.slug,
      title: pageForm.title,
      status: pageForm.status,
      seoTitle: draftSeoTitle,
      seoDescription: draftSeoDescription,
      sections,
    })
    if (!token) return
    const separator = selectedPage.slug.includes('?') ? '&' : '?'
    window.open(`${selectedPage.slug}${separator}__cmsPreview=${encodeURIComponent(token)}`, '_blank', 'noopener')
  }
  const selectedSeoResult = selectedPage ? publicSeoResults[selectedPage.pageKey] : undefined
  const selectedSeoState = seoDirty ? 'dirty' : (selectedSeoResult?.state || 'pending')
  const seoStatusIcon = (pageKey: string) => {
    if (selectedPage?.pageKey === pageKey && seoDirty) return '🟡'
    const state = publicSeoResults[pageKey]?.state
    if (state === 'same') return '🟢'
    if (state === 'different') return '🔴'
    if (state === 'error') return '🟠'
    return '⚪'
  }

  const renderPageSearchFields = () => (
    <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Google bilgileri</h2>
        {activePanel !== 'productGalleries' && !isLocalEnvironment && <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
          selectedSeoState === 'same' ? 'bg-green-100 text-green-800'
            : selectedSeoState === 'dirty' ? 'bg-amber-100 text-amber-800'
              : selectedSeoState === 'different' ? 'bg-red-100 text-red-800'
                : selectedSeoState === 'error' ? 'bg-orange-100 text-orange-800'
                  : 'bg-slate-100 text-slate-700'
        }`}>
          {selectedSeoState === 'same' && '🟢 Kaydedildi ve Public ile Aynı'}
          {selectedSeoState === 'dirty' && '🟡 Değiştirildi fakat henüz Kaydedilmedi'}
          {selectedSeoState === 'different' && '🔴 CMS ile Public farklı'}
          {selectedSeoState === 'error' && '🟠 Public kontrolü tamamlanamadı'}
          {selectedSeoState === 'pending' && '⚪ Public kontrolü bekleniyor'}
        </span>}
      </div>
      <p className="mt-1 text-sm text-[#6f6960]">
        Bu alanlar sayfanın tarayıcı başlığı ve arama motoru açıklaması için kullanılır.
      </p>
      {activePanel !== 'productGalleries' && !isLocalEnvironment && selectedSeoState === 'error' && selectedSeoResult && (
        <p className="mt-2 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-xs text-orange-800">
          Public kontrolü içerik hatası anlamına gelmez. {selectedSeoResult.errorMessage || 'Kontrol isteği tamamlanamadı.'}
          {selectedSeoResult.httpStatus ? ` HTTP ${selectedSeoResult.httpStatus}.` : ''}
        </p>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-[#3a342c]">
          <span className="flex items-center justify-between gap-2">
            <span>Sayfa adı</span>
            {activePanel !== 'productGalleries' && pageTitleDirty && <span className="text-xs font-semibold text-amber-700">Kaydedilmemiş taslak</span>}
          </span>
          <input
            value={pageForm.title}
            onChange={(event) => setPageForm({ ...pageForm, title: event.target.value })}
            className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
          />
          {activePanel !== 'productGalleries' && <button
            type="button"
            disabled={!pageTitleDirty || isLoading || !pageForm.title}
            onClick={() => void handlePageTitleSave()}
            className="mt-2 rounded-md border border-[#9d7b46] px-3 py-1.5 text-xs font-semibold text-[#6f512b] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Yalnızca Sayfa Adını Kaydet
          </button>}
        </label>

        <label className="text-sm font-medium text-[#3a342c]">
          Google başlığı
          <input
            value={draftSeoTitle}
            onChange={(event) => {
              setSeoPreviewOpen(false)
              setDraftSeoTitle(event.target.value)
            }}
            className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
          />
        </label>

        <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
          Google açıklaması
          <textarea
            value={draftSeoDescription}
            onChange={(event) => {
              setSeoPreviewOpen(false)
              setDraftSeoDescription(event.target.value)
            }}
            rows={3}
            className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
          />
        </label>

        {isLocalEnvironment && (
          <label className="text-sm font-medium text-[#3a342c]">
            Lokal ön izleme yayın durumu
            <select
              value={pageForm.status}
              onChange={(event) => setPageForm({ ...pageForm, status: event.target.value as CmsPageStatus })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            >
              <option value="PUBLISHED">Yayında</option>
              <option value="DRAFT">Yayında değil (lokal taslak)</option>
            </select>
            <span className="mt-1 block text-xs font-normal text-[#6f6960]">Yalnızca kayıtsız lokal ön izlemeyi etkiler.</span>
          </label>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#eee7dc] pt-4">
        <p className="text-xs text-[#6f6960]">
          Başlık: {Array.from(draftSeoTitle).length} karakter · Açıklama: {Array.from(draftSeoDescription).length} karakter
        </p>
        <button
          type="button"
          disabled={!previewDirty || isLoading || !isLocalEnvironment}
          onClick={handleLocalPreview}
          className="rounded-md bg-[#3a342c] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Kaydetmeden Önce Ön İzle
        </button>
      </div>

      {false && activePanel !== 'productGalleries' && seoPreviewOpen && selectedPage && (
        <div className="mt-5 rounded-lg border-2 border-amber-300 bg-amber-50 p-4 text-sm text-[#3a342c]">
          <h3 className="font-semibold">SEO kaydetme ön izlemesi</h3>
          <dl className="mt-3 grid gap-3">
            <div><dt className="font-semibold">Sayfa adı</dt><dd>{selectedPage.title}</dd></div>
            <div><dt className="font-semibold">PageKey</dt><dd className="break-all">{selectedPage.pageKey}</dd></div>
            <div><dt className="font-semibold">URL</dt><dd>{selectedPage.slug}</dd></div>
            <div><dt className="font-semibold">CMS’den doğrulanan Google başlığı</dt><dd>{savedSeoTitle}</dd></div>
            <div><dt className="font-semibold">Yeni Google başlığı ({Array.from(draftSeoTitle).length} karakter)</dt><dd>{draftSeoTitle}</dd></div>
            <div><dt className="font-semibold">CMS’den doğrulanan Google açıklaması</dt><dd>{savedSeoDescription}</dd></div>
            <div><dt className="font-semibold">Yeni Google açıklaması ({Array.from(draftSeoDescription).length} karakter)</dt><dd>{draftSeoDescription}</dd></div>
          </dl>
          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setSeoPreviewOpen(false)} className="rounded-md border border-[#d8d0c3] px-4 py-2">İptal</button>
            <button
              type="button"
              disabled={isLoading || !draftSeoTitle || !draftSeoDescription}
              onClick={() => void handleSeoConfirmSave()}
              className="rounded-md bg-green-700 px-4 py-2 font-semibold text-white disabled:opacity-40"
            >
              Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderHeroSlideEditor = () => (
    <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Hero slider</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Ana sayfanın en üstündeki kayan görseller.</p>
        </div>
        <button
          type="button"
          onClick={addHeroSlide}
          className="rounded-md border border-[#d8d0c3] px-3 py-2 text-xs font-medium text-[#3a342c] transition hover:bg-[#f6f3ee]"
        >
          Slide ekle
        </button>
      </div>

      <div className="space-y-4">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#3a342c]">Slide {index + 1}</p>
              <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                <input
                  type="checkbox"
                  checked={slide.enabled}
                  onChange={(event) => updateHeroSlide(slide.id, { enabled: event.target.checked })}
                  className="h-4 w-4 rounded border-[#d8d0c3]"
                />
                Yayında
              </label>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm font-medium text-[#3a342c]">
                Başlık
                <input
                  value={slide.title}
                  onChange={(event) => updateHeroSlide(slide.id, { title: event.target.value })}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>

              <label className="text-sm font-medium text-[#3a342c]">
                Alt başlık
                <input
                  value={slide.subtitle}
                  onChange={(event) => updateHeroSlide(slide.id, { subtitle: event.target.value })}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>

              <label className="text-sm font-medium text-[#3a342c]">
                Görsel
                <input
                  value={slide.image}
                  onChange={(event) => updateHeroSlide(slide.id, { image: event.target.value })}
                  placeholder="/api/public/media/images/2ec18b59-7848-4fcf-9b14-e72e00850a47/file"
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>

              <label className="text-sm font-medium text-[#3a342c]">
                Buton linki
                <input
                  value={slide.link}
                  onChange={(event) => updateHeroSlide(slide.id, { link: event.target.value })}
                  placeholder="/iletisim"
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>

              <div className="md:col-span-2">
                <div className="grid gap-3 md:grid-cols-[180px_1fr]">
                  <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                    <Image
                      src={slide.image}
                      alt={slide.title || 'Hero slide'}
                      width={360}
                      height={224}
                      className="h-28 w-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#3a342c]">
                      Görsel yükle
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        disabled={uploadingSlideId === slide.id}
                        onChange={(event) => {
                          void uploadHeroSlideImage(slide.id, event.target.files?.[0] || null)
                          event.currentTarget.value = ''
                        }}
                        className="mt-2 block w-full text-sm text-[#6f6960] file:mr-3 file:rounded-md file:border-0 file:bg-[#191714] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
                      />
                    </label>

                    {mediaAssets.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                          Yüklenenlerden seç
                        </p>
                        {renderMediaPickerLimitToggle(`hero-${slide.id}`)}
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                          {getMediaPickerAssets(`hero-${slide.id}`).map((asset) => (
                            <button
                              type="button"
                              key={asset.id}
                              onClick={() => updateHeroSlide(slide.id, { image: asset.publicUrl })}
                              className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                                slide.image === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                              }`}
                              title={asset.fileName}
                            >
                              <Image
                                src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                                alt={asset.altText || asset.fileName}
                                width={112}
                                height={56}
                                className="h-14 w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                Açıklama
                <textarea
                  value={slide.description}
                  onChange={(event) => updateHeroSlide(slide.id, { description: event.target.value })}
                  rows={3}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHeroStatsEditor = () => (
    <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
      <h2 className="text-lg font-semibold">Ana sayfa istatistikleri</h2>
      <p className="mt-1 text-sm text-[#6f6960]">
        Ana sayfanın üst bölümünde görünen proje, deneyim ve memnuniyet değerleri.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {heroStats.slice(0, 3).map((stat, index) => (
          <div key={index} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
            <label className="text-sm font-medium text-[#3a342c]">
              Sayı
              <input
                value={stat.number}
                onChange={(event) => updateHeroStat(index, { number: event.target.value })}
                className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
              />
            </label>
            <label className="mt-3 block text-sm font-medium text-[#3a342c]">
              Ek
              <input
                value={stat.suffix}
                onChange={(event) => updateHeroStat(index, { suffix: event.target.value })}
                placeholder="+, %, K+"
                className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
              />
            </label>
            <label className="mt-3 block text-sm font-medium text-[#3a342c]">
              Açıklama
              <input
                value={stat.label}
                onChange={(event) => updateHeroStat(index, { label: event.target.value })}
                className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHomePanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Ana sayfa</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Ana sayfanın Google bilgileri ve hero slider içeriği.</p>
        </div>
        <button
          type="button"
          onClick={() => void handleHomeSave()}
          disabled={isLoading || !selectedPage}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
        >
          Kaydet
        </button>
      </div>
      {renderPageSearchFields()}
      {renderHeroStatsEditor()}
      {renderHeroSlideEditor()}
    </div>
  )

  const renderProductsPanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Ürünler</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Ana sayfa ve Ürünler sayfasında görünen ürün kartları.</p>
        </div>
        <button
          type="button"
          onClick={() => void handleProductsSave()}
          disabled={isLoading || !selectedPage}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
        >
          Kaydet
        </button>
      </div>

      {renderPageSearchFields()}

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Sayfa üst alanı</h2>
        <p className="mt-1 text-sm text-[#6f6960]">
          /urunler sayfasının en üstünde görünen başlık ve kısa açıklama.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Başlık
            <input
              value={productsPageCopy.heroTitle}
              onChange={(event) => setProductsPageCopy({ ...productsPageCopy, heroTitle: event.target.value })}
              placeholder="Ürünlerimiz"
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Açıklama
            <input
              value={productsPageCopy.heroSubtitle}
              onChange={(event) => setProductsPageCopy({ ...productsPageCopy, heroSubtitle: event.target.value })}
              placeholder="Kaliteli perde çözümleri"
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Ürünler bölüm başlığı</h2>
        <p className="mt-1 text-sm text-[#6f6960]">
          Ürün kartlarının üstünde görünen küçük etiket, başlık ve açıklama.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Küçük etiket
            <input
              value={productsPageCopy.sectionEyebrow}
              onChange={(event) => setProductsPageCopy({ ...productsPageCopy, sectionEyebrow: event.target.value })}
              placeholder="ÜRÜNLERİMİZ"
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Başlık
            <input
              value={productsPageCopy.sectionTitle}
              onChange={(event) => setProductsPageCopy({ ...productsPageCopy, sectionTitle: event.target.value })}
              placeholder="Geniş Ürün Yelpazemiz"
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Açıklama
            <textarea
              value={productsPageCopy.sectionDescription}
              onChange={(event) => setProductsPageCopy({ ...productsPageCopy, sectionDescription: event.target.value })}
              rows={3}
              placeholder="En yeni teknoloji ve trendlere uygun, kaliteli perde ve dekorasyon ürünleri"
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Ürün kartları</h2>
        <p className="mt-1 text-sm text-[#6f6960]">
          Bu kartlar public sitedeki Ürünler alanında aynı sırayla gösterilir.
        </p>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addProductItem}
            className="rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]"
          >
            Kart ekle
          </button>
        </div>
        <div className="mt-5 space-y-4">
          {productItems.map((item, index) => (
            <div key={item.id} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#3a342c]">Ürün {index + 1}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveProductItem(item.id, 'up')}
                    disabled={index === 0}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Yukari
                  </button>
                  <button
                    type="button"
                    onClick={() => moveProductItem(item.id, 'down')}
                    disabled={index === productItems.length - 1}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Asagi
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProductItem(item.id)}
                    className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50"
                  >
                    Sil
                  </button>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={(event) => updateProductItem(item.id, { enabled: event.target.checked })}
                      className="h-4 w-4 rounded border-[#d8d0c3]"
                    />
                    Yayinda
                  </label>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-medium text-[#3a342c]">
                  Başlık
                  <input
                    value={item.title}
                    onChange={(event) => updateProductItem(item.id, { title: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Link
                  <input
                    value={item.href}
                    onChange={(event) => updateProductItem(item.id, { href: event.target.value })}
                    placeholder="/urunler/mekanizmali-perdeler"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Açıklama
                  <textarea
                    value={item.description}
                    onChange={(event) => updateProductItem(item.id, { description: event.target.value })}
                    rows={2}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Görsel
                  <input
                    value={item.image}
                    onChange={(event) => updateProductItem(item.id, { image: event.target.value })}
                    placeholder="/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <div className="md:col-span-2">
                  <label className="inline-flex cursor-pointer items-center rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]">
                    {uploadingCardImageKey === `product-${item.id}` ? 'Yukleniyor' : 'Bilgisayardan gorsel yukle'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingCardImageKey === `product-${item.id}`}
                      onChange={(event) => {
                        void uploadCardImage(`product-${item.id}`, event.target.files?.[0] || null, (publicUrl) => updateProductItem(item.id, { image: publicUrl }))
                        event.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <div className="md:col-span-2">
                  <div className="grid gap-3 md:grid-cols-[180px_1fr]">
                    <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                      <Image
                        src={item.image}
                        alt={item.title || 'Ürün görseli'}
                        width={360}
                        height={224}
                        className="h-28 w-full object-cover"
                      />
                    </div>

                    {mediaAssets.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                          Yüklenenlerden seç
                        </p>
                        {renderMediaPickerLimitToggle(`product-${item.id}`)}
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                          {getMediaPickerAssets(`product-${item.id}`).map((asset) => (
                            <button
                              type="button"
                              key={asset.id}
                              onClick={() => updateProductItem(item.id, { image: asset.publicUrl })}
                              className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                                item.image === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                              }`}
                              title={asset.fileName}
                            >
                              <Image
                                src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                                alt={asset.altText || asset.fileName}
                                width={112}
                                height={56}
                                className="h-14 w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderModelsPanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Perde Modelleri</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Public sitedeki Perde Modelleri kartları.</p>
        </div>
        <button
          type="button"
          onClick={() => void handleModelsSave()}
          disabled={isLoading || !selectedPage}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
        >
          Kaydet
        </button>
      </div>

      {renderPageSearchFields()}

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Sayfa üst alanı</h2>
        <p className="mt-1 text-sm text-[#6f6960]">
          /perde-modelleri sayfasının en üstünde görünen başlık ve kısa açıklama.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Başlık
            <input
              value={modelsPageCopy.heroTitle}
              onChange={(event) => setModelsPageCopy({ ...modelsPageCopy, heroTitle: event.target.value })}
              placeholder="Perde Modelleri"
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Açıklama
            <input
              value={modelsPageCopy.heroSubtitle}
              onChange={(event) => setModelsPageCopy({ ...modelsPageCopy, heroSubtitle: event.target.value })}
              placeholder="Mekanınıza uygun perde modellerimiz"
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Model kartları</h2>
        <p className="mt-1 text-sm text-[#6f6960]">
          Bu kartlar public sitedeki Perde Modelleri alanında aynı sırayla gösterilir.
        </p>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addModelItem}
            className="rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]"
          >
            Kart ekle
          </button>
        </div>
        <div className="mt-5 space-y-4">
          {modelItems.map((item, index) => (
            <div key={item.id} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#3a342c]">Model {index + 1}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveModelItem(item.id, 'up')}
                    disabled={index === 0}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Yukari
                  </button>
                  <button
                    type="button"
                    onClick={() => moveModelItem(item.id, 'down')}
                    disabled={index === modelItems.length - 1}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Asagi
                  </button>
                  <button
                    type="button"
                    onClick={() => removeModelItem(item.id)}
                    className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50"
                  >
                    Sil
                  </button>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={(event) => updateModelItem(item.id, { enabled: event.target.checked })}
                      className="h-4 w-4 rounded border-[#d8d0c3]"
                    />
                    Yayinda
                  </label>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-medium text-[#3a342c]">
                  Başlık
                  <input
                    value={item.title}
                    onChange={(event) => updateModelItem(item.id, { title: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Link
                  <input
                    value={item.href}
                    onChange={(event) => updateModelItem(item.id, { href: event.target.value })}
                    placeholder="/model-perdeler/modern-perde"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Açıklama
                  <textarea
                    value={item.description}
                    onChange={(event) => updateModelItem(item.id, { description: event.target.value })}
                    rows={2}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Görsel
                  <input
                    value={item.image}
                    onChange={(event) => updateModelItem(item.id, { image: event.target.value })}
                    placeholder="/api/public/media/images/d70ef178-4553-4734-b023-80b297f1e695/file"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <div className="md:col-span-2">
                  <label className="inline-flex cursor-pointer items-center rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]">
                    {uploadingCardImageKey === `model-${item.id}` ? 'Yukleniyor' : 'Bilgisayardan gorsel yukle'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingCardImageKey === `model-${item.id}`}
                      onChange={(event) => {
                        void uploadCardImage(`model-${item.id}`, event.target.files?.[0] || null, (publicUrl) => updateModelItem(item.id, { image: publicUrl }))
                        event.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <div className="md:col-span-2">
                  <div className="grid gap-3 md:grid-cols-[180px_1fr]">
                    <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                      <Image
                        src={item.image}
                        alt={item.title || 'Model görseli'}
                        width={360}
                        height={224}
                        className="h-28 w-full object-cover"
                      />
                    </div>

                    {mediaAssets.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                          Yüklenenlerden seç
                        </p>
                        {renderMediaPickerLimitToggle(`model-${item.id}`)}
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                          {getMediaPickerAssets(`model-${item.id}`).map((asset) => (
                            <button
                              type="button"
                              key={asset.id}
                              onClick={() => updateModelItem(item.id, { image: asset.publicUrl })}
                              className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                                item.image === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                              }`}
                              title={asset.fileName}
                            >
                              <Image
                                src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                                alt={asset.altText || asset.fileName}
                                width={112}
                                height={56}
                                className="h-14 w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCorporatePanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Kurumsal Ürünler</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Public sitedeki Kurumsal Ürünler kartları.</p>
        </div>
        <button
          type="button"
          onClick={() => void handleCorporateSave()}
          disabled={isLoading || !selectedPage}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
        >
          Kaydet
        </button>
      </div>

      {renderPageSearchFields()}

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Kurumsal ürün kartları</h2>
        <p className="mt-1 text-sm text-[#6f6960]">
          Bu kartlar public sitedeki Kurumsal Ürünler alanında aynı sırayla gösterilir.
        </p>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addCorporateItem}
            className="rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]"
          >
            Kart ekle
          </button>
        </div>
        <div className="mt-5 space-y-4">
          {corporateItems.map((item, index) => (
            <div key={item.id} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#3a342c]">Kurumsal ürün {index + 1}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveCorporateItem(item.id, 'up')}
                    disabled={index === 0}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Yukari
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCorporateItem(item.id, 'down')}
                    disabled={index === corporateItems.length - 1}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Asagi
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCorporateItem(item.id)}
                    className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50"
                  >
                    Sil
                  </button>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={(event) => updateCorporateItem(item.id, { enabled: event.target.checked })}
                      className="h-4 w-4 rounded border-[#d8d0c3]"
                    />
                    Yayinda
                  </label>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-medium text-[#3a342c]">
                  Başlık
                  <input
                    value={item.title}
                    onChange={(event) => updateCorporateItem(item.id, { title: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Link
                  <input
                    value={item.href}
                    onChange={(event) => updateCorporateItem(item.id, { href: event.target.value })}
                    placeholder="/kurumsal-urunler/ofis-perdeleri"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Açıklama
                  <textarea
                    value={item.description}
                    onChange={(event) => updateCorporateItem(item.id, { description: event.target.value })}
                    rows={2}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Görsel
                  <input
                    value={item.image}
                    onChange={(event) => updateCorporateItem(item.id, { image: event.target.value })}
                    placeholder="/api/public/media/images/47ff2c4b-2644-4628-8934-8e55b67c721e/file"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <div className="md:col-span-2">
                  <label className="inline-flex cursor-pointer items-center rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]">
                    {uploadingCardImageKey === `corporate-${item.id}` ? 'Yukleniyor' : 'Bilgisayardan gorsel yukle'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingCardImageKey === `corporate-${item.id}`}
                      onChange={(event) => {
                        void uploadCardImage(`corporate-${item.id}`, event.target.files?.[0] || null, (publicUrl) => updateCorporateItem(item.id, { image: publicUrl }))
                        event.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <div className="md:col-span-2">
                  <div className="grid gap-3 md:grid-cols-[180px_1fr]">
                    <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                      <Image
                        src={item.image}
                        alt={item.title || 'Kurumsal ürün görseli'}
                        width={360}
                        height={224}
                        className="h-28 w-full object-cover"
                      />
                    </div>

                    {mediaAssets.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                          Yüklenenlerden seç
                        </p>
                        {renderMediaPickerLimitToggle(`corporate-${item.id}`)}
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                          {getMediaPickerAssets(`corporate-${item.id}`).map((asset) => (
                            <button
                              type="button"
                              key={asset.id}
                              onClick={() => updateCorporateItem(item.id, { image: asset.publicUrl })}
                              className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                                item.image === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                              }`}
                              title={asset.fileName}
                            >
                              <Image
                                src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                                alt={asset.altText || asset.fileName}
                                width={112}
                                height={56}
                                className="h-14 w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBlogContentEditor = (post: BlogPost) => {
    const blocks = parseBlogContentBlocks(post.content)

    return (
      <div className="md:col-span-2">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[#3a342c]">Yazı içeriği</h3>
            <p className="mt-1 text-xs text-[#6f6960]">
              Başlık, paragraf ve liste olarak düzenle; public sayfada yazı akışı otomatik oluşur.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => addBlogContentBlock(post.id, 'heading')}
              className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#3a342c] transition hover:border-[#9d7b46]"
            >
              Başlık ekle
            </button>
            <button
              type="button"
              onClick={() => addBlogContentBlock(post.id, 'paragraph')}
              className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#3a342c] transition hover:border-[#9d7b46]"
            >
              Paragraf ekle
            </button>
            <button
              type="button"
              onClick={() => addBlogContentBlock(post.id, 'list')}
              className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#3a342c] transition hover:border-[#9d7b46]"
            >
              Liste ekle
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {blocks.map((block, blockIndex) => (
            <div key={`${post.id}-${block.id}-${blockIndex}`} className="rounded-md border border-[#e4dccf] bg-white p-3">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <select
                  value={block.type}
                  onChange={(event) =>
                    updateBlogContentBlock(post.id, blockIndex, {
                      type: event.target.value as BlogContentBlock['type'],
                    })
                  }
                  className="rounded-md border border-[#d8d0c3] bg-white px-2 py-1 text-xs font-medium text-[#3a342c] outline-none focus:border-[#9d7b46]"
                >
                  <option value="heading">Başlık</option>
                  <option value="paragraph">Paragraf</option>
                  <option value="list">Liste</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeBlogContentBlock(post.id, blockIndex)}
                  className="rounded-md border border-[#ead5c9] px-2 py-1 text-xs font-medium text-[#7b3f2e] transition hover:bg-[#f8eee8]"
                >
                  Kaldır
                </button>
              </div>

              <textarea
                value={block.text}
                onChange={(event) => updateBlogContentBlock(post.id, blockIndex, { text: event.target.value })}
                rows={block.type === 'list' ? 4 : 3}
                placeholder={block.type === 'list' ? 'Her satıra bir madde yaz' : 'Metni yaz'}
                className="w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderProductGalleryPanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Ürün Galerileri</h2>
          <p className="mt-1 text-sm text-[#6f6960]">
            Ürün detay sayfalarında görünen fotoğraflar. Yüklenen görseller backend medya URL&apos;siyle yayınlanır.
          </p>
          <p className={`mt-2 text-sm font-medium ${
            isLoading ? 'text-blue-700'
              : productGallerySaveResult.state === 'partial' ? 'text-orange-700'
                : productGallerySaveResult.state === 'error' ? 'text-red-700'
                  : productGalleryDirty ? 'text-amber-700'
                    : productGallerySaveResult.state === 'saved' ? 'text-green-700'
                      : 'text-[#6f6960]'
          }`}>
            {isLoading ? 'Kaydediliyor'
              : productGallerySaveResult.state === 'partial' ? 'Kısmi kayıt'
                : productGallerySaveResult.state === 'error' ? 'Kayıt başarısız'
                  : productGalleryDirty ? 'Kaydedilmemiş değişiklik var'
                    : productGallerySaveResult.state === 'saved' ? 'Kaydedildi'
                      : 'Değişiklik yok'}
          </p>
          {productGallerySaveResult.state === 'saved' && productGallerySaveResult.note && (
            <p className="mt-1 text-xs text-[#6f6960]">{productGallerySaveResult.note}</p>
          )}
          {(productGallerySaveResult.state === 'partial' || productGallerySaveResult.state === 'error')
            && productGallerySaveResult.technicalDetails.length > 0 && (
            <button
              type="button"
              onClick={() => setProductGalleryTechnicalDetailsOpen((current) => !current)}
              className="mt-2 text-xs font-semibold text-[#6b4f1d] underline underline-offset-2"
            >
              {productGalleryTechnicalDetailsOpen ? 'Teknik ayrıntıları gizle' : 'Teknik ayrıntıları göster'}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => void handleProductGallerySave()}
          disabled={isLoading || !selectedPage || !productGalleryDirty}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Kaydet
        </button>
      </div>

      {productGalleryTechnicalDetailsOpen
        && (productGallerySaveResult.state === 'partial' || productGallerySaveResult.state === 'error') && (
        <div className="rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] p-4 text-sm text-[#3a342c]">
          <h3 className="font-semibold">Teknik ayrıntılar</h3>
          {productGallerySaveResult.savedParts.length > 0 && (
            <p className="mt-2"><strong>Kaydedilen bölümler:</strong> {productGallerySaveResult.savedParts.join(', ')}</p>
          )}
          {productGallerySaveResult.failedParts.length > 0 && (
            <p className="mt-1"><strong>Başarısız bölümler:</strong> {productGallerySaveResult.failedParts.join(' | ')}</p>
          )}
          <div className="mt-3 space-y-3">
            {productGallerySaveResult.technicalDetails.map((detail, index) => (
              <dl key={`${detail.section}-${detail.endpoint}-${index}`} className="grid gap-1 rounded-md border border-[#e4dccf] bg-white p-3 text-xs">
                <div><dt className="font-semibold">Bölüm</dt><dd>{detail.section}</dd></div>
                <div><dt className="font-semibold">HTTP durumu</dt><dd>{detail.httpStatus ?? 'Yok'}</dd></div>
                <div><dt className="font-semibold">errorReason</dt><dd>{detail.errorReason}</dd></div>
                <div><dt className="font-semibold">errorMessage</dt><dd>{detail.errorMessage}</dd></div>
                <div><dt className="font-semibold">Başarısız endpoint</dt><dd className="break-all">{detail.endpoint}</dd></div>
                <div><dt className="font-semibold">CMS kaydı başarılı mı?</dt><dd>{detail.cmsSaved === null ? 'Doğrulanamadı' : detail.cmsSaved ? 'Evet' : 'Hayır'}</dd></div>
                <div><dt className="font-semibold">Public doğrulama başarılı mı?</dt><dd>{detail.publicVerified ? 'Evet' : 'Hayır'}</dd></div>
                <div><dt className="font-semibold">Başarısız deneme</dt><dd>{detail.failedAttempt ?? 'Bilinmiyor'}</dd></div>
              </dl>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <label className="text-sm font-medium text-[#3a342c]">
          Düzenlenecek sayfa
          <select
            value={selectedProductGalleryPageKey}
            onChange={(event) => {
              const nextGalleryPage = productGalleryPages.find((item) => item.pageKey === event.target.value)
              setSelectedProductGalleryPageKey(event.target.value)
              void loadPageByKey(event.target.value, authHeader, nextGalleryPage)
            }}
            className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
          >
            {productGalleryPages.map((item) => (
              <option key={item.pageKey} value={item.pageKey}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {renderPageSearchFields()}

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <div>
          <h2 className="text-lg font-semibold">Sayfa üst alanı</h2>
          <p className="mt-1 text-sm text-[#6f6960]">
            Public detay sayfasının en üstündeki breadcrumb, rozet, başlık ve açıklama metinleri.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Breadcrumb son metin
            <input
              value={productGalleryHeroCopy.breadcrumbLabel}
              onChange={(event) => setProductGalleryHeroCopy((current) => ({ ...current, breadcrumbLabel: event.target.value }))}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c]">
            Rozet metni
            <input
              value={productGalleryHeroCopy.eyebrow}
              onChange={(event) => setProductGalleryHeroCopy((current) => ({ ...current, eyebrow: event.target.value }))}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c]">
            Başlık ilk satır
            <input
              value={productGalleryHeroCopy.title}
              onChange={(event) => setProductGalleryHeroCopy((current) => ({ ...current, title: event.target.value }))}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c]">
            Başlık ikinci satır
            <input
              value={productGalleryHeroCopy.highlightedTitle}
              onChange={(event) => setProductGalleryHeroCopy((current) => ({ ...current, highlightedTitle: event.target.value }))}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Açıklama
            <textarea
              value={productGalleryHeroCopy.description}
              onChange={(event) => setProductGalleryHeroCopy((current) => ({ ...current, description: event.target.value }))}
              rows={4}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Video anlatım</h2>
            <p className="mt-1 text-sm text-[#6f6960]">
              Public ürün sayfasında galeri öncesinde görünen tek YouTube videosu.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#3a342c]">
            <input
              type="checkbox"
              checked={productGalleryVideo.enabled !== false}
              onChange={(event) => setProductGalleryVideo((current) => ({ ...current, enabled: event.target.checked }))}
              className="h-4 w-4 rounded border-[#d8d0c3]"
            />
            Yayında
          </label>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Video başlığı
            <input
              value={productGalleryVideo.title}
              onChange={(event) => setProductGalleryVideo((current) => ({ ...current, title: event.target.value }))}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c]">
            YouTube URL
            <input
              value={productGalleryVideo.youtubeUrl}
              onChange={(event) => setProductGalleryVideo((current) => ({ ...current, youtubeUrl: event.target.value }))}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Video açıklaması
            <textarea
              value={productGalleryVideo.description}
              onChange={(event) => setProductGalleryVideo((current) => ({ ...current, description: event.target.value }))}
              rows={3}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{activeProductGalleryPage.label} görselleri</h2>
            <p className="mt-1 text-sm text-[#6f6960]">
              Public ürün sayfasındaki galeri sırası burada belirlenir.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center rounded-md bg-[#191714] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f]">
              {isGalleryBulkUploading ? 'Yukleniyor' : 'Toplu gorsel yukle'}
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={isGalleryBulkUploading}
                onChange={(event) => {
                  void uploadProductGalleryImages(event.target.files)
                  event.target.value = ''
                }}
                className="hidden"
              />
            </label>
          <button
            type="button"
            onClick={addProductGalleryImage}
            className="rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]"
          >
            Görsel ekle
          </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          {productGalleryImages.map((image, index) => (
            <div key={image.id} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#3a342c]">Görsel {index + 1}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                    <input
                      type="checkbox"
                      checked={image.enabled !== false}
                      onChange={(event) => updateProductGalleryImage(image.id, { enabled: event.target.checked })}
                      className="h-4 w-4 rounded border-[#d8d0c3]"
                    />
                    Yayında
                  </label>
                  <button
                    type="button"
                    onClick={() => moveProductGalleryImage(image.id, 'up')}
                    disabled={index === 0}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#3a342c] transition hover:bg-[#f6f3ee] disabled:opacity-40"
                  >
                    Yukari
                  </button>
                  <button
                    type="button"
                    onClick={() => moveProductGalleryImage(image.id, 'down')}
                    disabled={index === productGalleryImages.length - 1}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#3a342c] transition hover:bg-[#f6f3ee] disabled:opacity-40"
                  >
                    Asagi
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProductGalleryImage(image.id)}
                    className="rounded-md border border-[#c9beb0] px-2 py-1 text-xs font-medium text-[#7b3f2e] transition hover:bg-[#f8eee8]"
                  >
                    Kaldır
                  </button>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-[180px_1fr]">
                <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                  <Image
                    src={getPreviewImageUrl(image.src, image.id)}
                    alt={image.alt || image.title}
                    width={360}
                    height={240}
                    className="h-32 w-full object-cover"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                    Görsel URL
                    <input
                      value={image.src}
                      onChange={(event) => updateProductGalleryImage(image.id, { src: event.target.value })}
                      className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                    />
                  </label>
                  <label className="text-sm font-medium text-[#3a342c]">
                    Başlık
                    <input
                      value={image.title}
                      onChange={(event) => updateProductGalleryImage(image.id, { title: event.target.value })}
                      className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                    />
                  </label>
                  <label className="text-sm font-medium text-[#3a342c]">
                    Görsel açıklaması
                    <input
                      value={image.alt}
                      onChange={(event) => updateProductGalleryImage(image.id, { alt: event.target.value })}
                      className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                    />
                  </label>

                  <div className="flex flex-wrap gap-2 md:col-span-2">
                    <label className="inline-flex cursor-pointer items-center rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]">
                      {uploadingGalleryImageId === image.id ? 'Yükleniyor' : 'Bilgisayardan yükle'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingGalleryImageId === image.id}
                        onChange={(event) => {
                          void uploadProductGalleryImage(image.id, event.target.files?.[0] || null)
                          event.target.value = ''
                        }}
                      />
                    </label>
                  </div>

                  {mediaAssets.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                        Yüklenenlerden seç
                      </p>
                      {renderMediaPickerLimitToggle(`gallery-${image.id}`)}
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                        {getMediaPickerAssets(`gallery-${image.id}`).map((asset) => (
                          <button
                            type="button"
                            key={asset.id}
                            onClick={() => updateProductGalleryImage(image.id, {
                              src: asset.publicUrl,
                              alt: asset.altText || asset.fileName,
                              title: asset.title || asset.fileName,
                            })}
                            className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                              image.src === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                            }`}
                            title={asset.fileName}
                          >
                            <Image
                              src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                              alt={asset.altText || asset.fileName}
                              width={112}
                              height={56}
                              className="h-14 w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBlogPanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Blog</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Public sitedeki blog yazıları ve blog sayfası Google bilgileri.</p>
        </div>
        <button
          type="button"
          onClick={() => void handleBlogSave()}
          disabled={isLoading || !selectedPage}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
        >
          Kaydet
        </button>
      </div>

      {renderPageSearchFields()}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addBlogPost}
          className="rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]"
        >
          Yeni yazı ekle
        </button>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Blog yazıları</h2>
        <p className="mt-1 text-sm text-[#6f6960]">
          Yayında olan yazılar blog sayfasında ve ana sayfadaki Blog alanında gösterilir.
        </p>

        <div className="mt-5 space-y-4">
          {blogPosts.map((post, index) => (
            <div key={post.id} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#3a342c]">Yazı {index + 1}</p>
                <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                  <input
                    type="checkbox"
                    checked={post.enabled !== false}
                    onChange={(event) => updateBlogPost(post.id, { enabled: event.target.checked })}
                    className="h-4 w-4 rounded border-[#d8d0c3]"
                  />
                  Yayında
                </label>
                <button
                  type="button"
                  onClick={() => removeBlogPost(post.id)}
                  className="rounded-md border border-[#c9beb0] px-2 py-1 text-xs font-medium text-[#7b3f2e] transition hover:bg-[#f8eee8]"
                >
                  Yazıyı kaldır
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-medium text-[#3a342c]">
                  Başlık
                  <input
                    value={post.title}
                    onChange={(event) => updateBlogPostTitle(post.id, event.target.value)}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Link
                  <input
                    value={post.href}
                    onChange={(event) => updateBlogPost(post.id, { href: event.target.value })}
                    placeholder="/blog/yazi-linki"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Kategori
                  <input
                    value={post.category}
                    onChange={(event) => updateBlogPost(post.id, { category: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Tarih
                  <input
                    value={post.date}
                    onChange={(event) => updateBlogPost(post.id, { date: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Okuma süresi
                  <input
                    value={post.readTime}
                    onChange={(event) => updateBlogPost(post.id, { readTime: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Slug
                  <input
                    value={post.slug}
                    onChange={(event) => updateBlogPostSlug(post.id, event.target.value)}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Kısa açıklama
                  <textarea
                    value={post.excerpt}
                    onChange={(event) => updateBlogPost(post.id, { excerpt: event.target.value })}
                    rows={2}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Görsel
                  <input
                    value={post.image}
                    onChange={(event) => updateBlogPost(post.id, { image: event.target.value })}
                    placeholder="/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <div className="md:col-span-2">
                  <label className="inline-flex cursor-pointer items-center rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]">
                    {uploadingBlogPostId === post.id ? 'Yükleniyor' : 'Bilgisayardan görsel yükle'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingBlogPostId === post.id}
                      onChange={(event) => {
                        void uploadBlogImage(post.id, event.target.files?.[0] || null)
                        event.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <div className="md:col-span-2">
                  <div className="grid gap-3 md:grid-cols-[180px_1fr]">
                    <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                      <Image
                        src={post.image}
                        alt={post.title || 'Blog görseli'}
                        width={360}
                        height={224}
                        className="h-28 w-full object-cover"
                      />
                    </div>

                    {mediaAssets.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                          Yüklenenlerden seç
                        </p>
                        {renderMediaPickerLimitToggle(`blog-${post.id}`)}
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                          {getMediaPickerAssets(`blog-${post.id}`).map((asset) => (
                            <button
                              type="button"
                              key={asset.id}
                              onClick={() => updateBlogPost(post.id, { image: asset.publicUrl })}
                              className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                                post.image === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                              }`}
                              title={asset.fileName}
                            >
                              <Image
                                src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                                alt={asset.altText || asset.fileName}
                                width={112}
                                height={56}
                                className="h-14 w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {renderBlogContentEditor(post)}

                <label className="hidden">
                  Yazı içeriği
                  <textarea
                    value={post.content}
                    onChange={(event) => updateBlogPost(post.id, { content: event.target.value })}
                    rows={8}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 font-mono text-xs outline-none focus:border-[#9d7b46]"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMechanizedPanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{activeProductDetailPage?.label || 'Ürün detayı'}</h2>
          <p className="mt-1 text-sm text-[#6f6960]">
            Bu sayfadaki üst alan, görsel kartları ve teklif çağrısı.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleMechanizedSave()}
          disabled={isLoading || !selectedPage}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
        >
          Kaydet
        </button>
      </div>

      {renderPageSearchFields()}

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Üst alan</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Küçük başlık
            <input
              value={mechanizedForm.heroEyebrow}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, heroEyebrow: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Büyük başlık
            <input
              value={mechanizedForm.heroTitle}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, heroTitle: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Vurgulu başlık
            <input
              value={mechanizedForm.heroHighlight}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, heroHighlight: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Kategori üst yazısı
            <input
              value={mechanizedForm.categoryEyebrow}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, categoryEyebrow: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Açıklama
            <textarea
              value={mechanizedForm.heroDescription}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, heroDescription: event.target.value })}
              rows={3}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Kategori başlığı
            <input
              value={mechanizedForm.categoryTitle}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, categoryTitle: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Kategori kartları</h2>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addMechanizedCategory}
            className="rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]"
          >
            Kart ekle
          </button>
        </div>
        <div className="mt-5 space-y-4">
          {mechanizedForm.categories.map((item, index) => (
            <div key={item.id} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#3a342c]">Kategori {index + 1}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveMechanizedCategory(item.id, 'up')}
                    disabled={index === 0}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Yukari
                  </button>
                  <button
                    type="button"
                    onClick={() => moveMechanizedCategory(item.id, 'down')}
                    disabled={index === mechanizedForm.categories.length - 1}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#6f6960] transition hover:border-[#9d7b46] disabled:opacity-40"
                  >
                    Asagi
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMechanizedCategory(item.id)}
                    className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50"
                  >
                    Sil
                  </button>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={(event) => updateMechanizedCategory(item.id, { enabled: event.target.checked })}
                      className="h-4 w-4 rounded border-[#d8d0c3]"
                    />
                    Yayinda
                  </label>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm font-medium text-[#3a342c]">
                  Başlık
                  <input
                    value={item.title}
                    onChange={(event) => updateMechanizedCategory(item.id, { title: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c]">
                  Link
                  <input
                    value={item.href}
                    onChange={(event) => updateMechanizedCategory(item.id, { href: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                {(() => {
                  const mappedGalleryPageKey = activeProductDetailPage
                    ? productDetailCategoryGalleryPages[activeProductDetailPage.pageKey]?.[item.title]
                    : null
                  const galleryPage = mappedGalleryPageKey
                    ? productGalleryPages.find((page) => page.pageKey === mappedGalleryPageKey) || getGalleryPageFromCatalogItem(item)
                    : getGalleryPageFromCatalogItem(item)

                  if (!galleryPage) {
                    return null
                  }

                  return (
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={() => openCategoryGallery(galleryPage)}
                      className="rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]"
                    >
                      Galeriye git
                    </button>
                  </div>
                  )
                })()}

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Açıklama
                  <textarea
                    value={item.description}
                    onChange={(event) => updateMechanizedCategory(item.id, { description: event.target.value })}
                    rows={2}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Görsel
                  <input
                    value={item.image}
                    onChange={(event) => updateMechanizedCategory(item.id, { image: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <div className="md:col-span-2">
                  <label className="inline-flex cursor-pointer items-center rounded-md border border-[#9d7b46] px-3 py-2 text-sm font-medium text-[#6b4f1d] transition hover:bg-[#f6efe4]">
                    {uploadingCardImageKey === `category-${item.id}` ? 'Yukleniyor' : 'Bilgisayardan gorsel yukle'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingCardImageKey === `category-${item.id}`}
                      onChange={(event) => {
                        void uploadCardImage(`category-${item.id}`, event.target.files?.[0] || null, (publicUrl) => updateMechanizedCategory(item.id, { image: publicUrl }))
                        event.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <div className="md:col-span-2">
                  <div className="grid gap-3 md:grid-cols-[180px_1fr]">
                    <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                      <Image
                        src={item.image}
                        alt={item.title || 'Kategori görseli'}
                        width={360}
                        height={224}
                        className="h-28 w-full object-cover"
                      />
                    </div>

                    {mediaAssets.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                          Yüklenenlerden seç
                        </p>
                        {renderMediaPickerLimitToggle(`category-${item.id}`)}
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                          {getMediaPickerAssets(`category-${item.id}`).map((asset) => (
                            <button
                              type="button"
                              key={asset.id}
                              onClick={() => updateMechanizedCategory(item.id, { image: asset.publicUrl })}
                              className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                                item.image === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                              }`}
                              title={asset.fileName}
                            >
                              <Image
                                src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                                alt={asset.altText || asset.fileName}
                                width={112}
                                height={56}
                                className="h-14 w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Teklif çağrısı</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Başlık
            <input
              value={mechanizedForm.ctaTitle}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, ctaTitle: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Ana buton
            <input
              value={mechanizedForm.primaryCtaLabel}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, primaryCtaLabel: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            Ana buton linki
            <input
              value={mechanizedForm.primaryCtaHref}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, primaryCtaHref: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            İkinci buton
            <input
              value={mechanizedForm.secondaryCtaLabel}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, secondaryCtaLabel: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c]">
            İkinci buton linki
            <input
              value={mechanizedForm.secondaryCtaHref}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, secondaryCtaHref: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>

          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Açıklama
            <textarea
              value={mechanizedForm.ctaDescription}
              onChange={(event) => setMechanizedForm({ ...mechanizedForm, ctaDescription: event.target.value })}
              rows={3}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>
    </div>
  )

  const renderAboutPanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Hakkımızda</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Hakkımızda sayfası ve ana sayfadaki Hakkımızda bölümü.</p>
        </div>
        <button
          type="button"
          onClick={() => void handleAboutSave()}
          disabled={isLoading || !selectedPage}
          className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
        >
          Kaydet
        </button>
      </div>

      {renderPageSearchFields()}

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Üst başlık</h2>
        <p className="mt-1 text-sm text-[#6f6960]">Hakkımızda sayfasının en üstündeki başlık alanı.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Küçük başlık
            <input
              value={aboutForm.heroEyebrow}
              onChange={(event) => setAboutForm({ ...aboutForm, heroEyebrow: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c]">
            Büyük başlık
            <input
              value={aboutForm.heroTitle}
              onChange={(event) => setAboutForm({ ...aboutForm, heroTitle: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Açıklama
            <input
              value={aboutForm.heroDescription}
              onChange={(event) => setAboutForm({ ...aboutForm, heroDescription: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Ana içerik</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#3a342c]">
            Küçük başlık
            <input
              value={aboutForm.eyebrow}
              onChange={(event) => setAboutForm({ ...aboutForm, eyebrow: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c]">
            Ana başlık
            <input
              value={aboutForm.title}
              onChange={(event) => setAboutForm({ ...aboutForm, title: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
            Ana metin
            <textarea
              value={aboutForm.lead}
              onChange={(event) => setAboutForm({ ...aboutForm, lead: event.target.value })}
              rows={4}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <label className="text-sm font-medium text-[#3a342c]">
            Görsel açıklaması
            <input
              value={aboutForm.imageAlt}
              onChange={(event) => setAboutForm({ ...aboutForm, imageAlt: event.target.value })}
              className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
            />
          </label>
          <div className="md:col-span-2">
            <div className="grid gap-3 md:grid-cols-[180px_1fr]">
              <div className="overflow-hidden rounded-md border border-[#d8d0c3] bg-white">
                <Image
                  src={aboutForm.image}
                  alt={aboutForm.imageAlt || 'Hakkımızda görseli'}
                  width={360}
                  height={224}
                  className="h-32 w-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#3a342c]">
                  Görsel URL
                  <input
                    value={aboutForm.image}
                    onChange={(event) => setAboutForm({ ...aboutForm, image: event.target.value })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>

                <label className="block text-sm font-medium text-[#3a342c]">
                  Bilgisayardan yükle
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    disabled={isAboutImageUploading}
                    onChange={(event) => {
                      void uploadAboutImage(event.target.files?.[0] || null)
                      event.currentTarget.value = ''
                    }}
                    className="mt-2 block w-full text-sm text-[#6f6960] file:mr-3 file:rounded-md file:border-0 file:bg-[#191714] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
                  />
                </label>

                {mediaAssets.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6960]">
                      Yüklenenlerden seç
                    </p>
                    {renderMediaPickerLimitToggle('about-main')}
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                      {getMediaPickerAssets('about-main').map((asset) => (
                        <button
                          type="button"
                          key={asset.id}
                          onClick={() => setAboutForm((current) => ({
                            ...current,
                            image: asset.publicUrl,
                            imageAlt: current.imageAlt || asset.altText || asset.fileName,
                          }))}
                          className={`overflow-hidden rounded-md border bg-white transition hover:border-[#9d7b46] ${
                            aboutForm.image === asset.publicUrl ? 'border-[#191714]' : 'border-[#d8d0c3]'
                          }`}
                          title={asset.fileName}
                        >
                          <Image
                            src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                            alt={asset.altText || asset.fileName}
                            width={112}
                            height={56}
                            className="h-14 w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Misyon, vizyon ve değerler</h2>
        <div className="mt-5 space-y-4">
          {aboutForm.tabs.map((tab, index) => (
            <div key={tab.key} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <label className="text-sm font-medium text-[#3a342c]">
                Başlık
                <input
                  value={tab.title}
                  onChange={(event) => updateAboutTab(index, { title: event.target.value })}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>
              <label className="mt-3 block text-sm font-medium text-[#3a342c]">
                Metin
                <textarea
                  value={tab.content}
                  onChange={(event) => updateAboutTab(index, { content: event.target.value })}
                  rows={3}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">Hizmet maddeleri</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {aboutForm.services.map((service, index) => (
            <label key={index} className="text-sm font-medium text-[#3a342c]">
              Madde {index + 1}
              <input
                value={service}
                onChange={(event) => updateAboutService(index, event.target.value)}
                className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
        <h2 className="text-lg font-semibold">İstatistikler</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {aboutForm.stats.map((stat, index) => (
            <div key={index} className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4">
              <label className="text-sm font-medium text-[#3a342c]">
                Sayı
                <input
                  value={stat.number}
                  onChange={(event) => updateAboutStat(index, { number: event.target.value })}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>
              <label className="mt-3 block text-sm font-medium text-[#3a342c]">
                Ek
                <input
                  value={stat.suffix}
                  onChange={(event) => updateAboutStat(index, { suffix: event.target.value })}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>
              <label className="mt-3 block text-sm font-medium text-[#3a342c]">
                Açıklama
                <input
                  value={stat.label}
                  onChange={(event) => updateAboutStat(index, { label: event.target.value })}
                  className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLeadsPanel = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">İletişim/Talepler</h2>
          <p className="mt-1 text-sm text-[#6f6960]">Siteden gelen keşif, iletişim ve teklif talepleri.</p>
        </div>
        <button
          type="button"
          onClick={() => void loadContactRequests()}
          disabled={isLoading}
          className="rounded-md border border-[#d8d0c3] px-4 py-2 text-sm font-medium text-[#3a342c] transition hover:bg-[#f6f3ee] disabled:opacity-60"
        >
          Yenile
        </button>
      </div>

      {contactRequests.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <div className="space-y-3">
            {contactRequests.map((requestItem) => (
              <button
                type="button"
                key={requestItem.id}
                onClick={() => selectContactRequest(requestItem)}
                className={`w-full rounded-lg border p-4 text-left transition ${
                  selectedContactRequestId === requestItem.id
                    ? 'border-[#191714] bg-white shadow-sm'
                    : 'border-[#ded5c7] bg-white hover:border-[#9d7b46]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#191714]">{requestItem.name}</h3>
                    <p className="mt-1 text-xs text-[#6f6960]">{requestItem.phone}</p>
                  </div>
                  <span className="rounded-full bg-[#f6f3ee] px-2.5 py-1 text-xs font-medium text-[#3a342c]">
                    {contactStatusLabels[requestItem.status]}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-[#6f6960]">{requestItem.message}</p>
                <p className="mt-3 text-xs text-[#9d7b46]">{formatDateTime(requestItem.createdAt)}</p>
              </button>
            ))}
          </div>

          {selectedContactRequest && (
            <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selectedContactRequest.name}</h2>
                  <p className="mt-1 text-sm text-[#6f6960]">
                    {formatDateTime(selectedContactRequest.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleContactRequestSave()}
                  disabled={isLoading}
                  className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
                >
                  Kaydet
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md bg-[#f8f5ef] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#9d7b46]">Telefon</p>
                  <a href={`tel:${selectedContactRequest.phone}`} className="mt-2 block text-sm font-semibold text-[#191714]">
                    {selectedContactRequest.phone}
                  </a>
                </div>

                <div className="rounded-md bg-[#f8f5ef] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#9d7b46]">E-posta</p>
                  {selectedContactRequest.email ? (
                    <a href={`mailto:${selectedContactRequest.email}`} className="mt-2 block text-sm font-semibold text-[#191714]">
                      {selectedContactRequest.email}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-[#6f6960]">Belirtilmedi</p>
                  )}
                </div>

                <div className="rounded-md bg-[#f8f5ef] p-4 md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#9d7b46]">Mesaj</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#3a342c]">
                    {selectedContactRequest.message}
                  </p>
                </div>

                <div className="rounded-md bg-[#f8f5ef] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#9d7b46]">Geldiği sayfa</p>
                  <p className="mt-2 text-sm text-[#3a342c]">{selectedContactRequest.sourcePage || '-'}</p>
                </div>

                <label className="text-sm font-medium text-[#3a342c]">
                  Durum
                  <select
                    value={contactRequestForm.status}
                    onChange={(event) => setContactRequestForm({
                      ...contactRequestForm,
                      status: event.target.value as ContactRequestStatus,
                    })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  >
                    {contactStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {contactStatusLabels[status]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Not
                  <textarea
                    value={contactRequestForm.adminNote}
                    onChange={(event) => setContactRequestForm({
                      ...contactRequestForm,
                      adminNote: event.target.value,
                    })}
                    rows={5}
                    placeholder="Görüşme notu, ölçü randevusu veya sonuç bilgisi"
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
          Henüz talep gelmedi.
        </div>
      )}
    </div>
  )

  if (!authToken) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] text-[#191714]">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#9d7b46]">Pile Perde</p>
            <h1 className="mt-3 text-3xl font-semibold">Admin panel</h1>
            <p className="mt-3 text-sm text-[#6f6960]">
              Site iceriklerini yonetmek icin admin hesabinla giris yap.
            </p>
          </div>

          <form onSubmit={handleLogin} className="rounded-lg border border-[#ded5c7] bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-[#3a342c]">
              E-posta
              <input
                type="email"
                value={credentials.email}
                onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                required
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-[#3a342c]">
              Sifre
              <input
                type="password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                required
              />
            </label>

            {errorMessage && (
              <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#191714] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2b261f]"
            >
              Giris yap
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#191714]">
      <div className="border-b border-[#ddd3c3] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9d7b46]">Pile Perde</p>
            <h1 className="text-xl font-semibold">Admin panel</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-[#d8d0c3] px-4 py-2 text-sm text-[#3a342c] transition hover:bg-[#f6f3ee]"
          >
            Cikis
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-[#ded5c7] bg-white p-4">
          <div className="mb-5 space-y-2">
            <button
              type="button"
              onClick={() => {
                setActivePanel('home')
                void loadPageByKey('home')
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'home'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              {seoStatusIcon('home')} Ana sayfa
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel('about')
                void loadPageByKey('about')
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'about'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              {seoStatusIcon('about')} Hakkımızda
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel('curtainModels')
                void loadPageByKey('curtain-models')
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'curtainModels'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              {seoStatusIcon('curtain-models')} Perde Modelleri
            </button>
            <div className="rounded-lg border border-[#e4dccf] bg-[#fbfaf7] p-2">
              <div className="px-2 pb-2 pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7b46]">Ürünler</p>
                <p className="mt-1 text-xs text-[#6f6960]">Public sitedeki ürün menüsüyle aynı sıra.</p>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setActivePanel('products')
                    void loadPageByKey('products')
                  }}
                  className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                    activePanel === 'products'
                      ? 'bg-[#191714] text-white'
                      : 'bg-white text-[#3a342c] hover:bg-[#efe8dc]'
                  }`}
                >
                  {seoStatusIcon('products')} Ürünler ana sayfası
                </button>
                {productDetailAdminPages.map((item) => (
                  <button
                    type="button"
                    key={item.panel}
                    onClick={() => {
                      setActivePanel(item.panel)
                      void loadPageByKey(item.pageKey)
                    }}
                    className={`w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition ${
                      activePanel === item.panel
                        ? 'bg-[#191714] text-white'
                        : 'bg-white text-[#3a342c] hover:bg-[#efe8dc]'
                    }`}
                  >
                    {seoStatusIcon(item.pageKey)} {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setActivePanel('productGalleries')
                    void loadPageByKey(selectedProductGalleryPageKey)
                  }}
                  className={`w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition ${
                    activePanel === 'productGalleries'
                      ? 'bg-[#191714] text-white'
                      : 'bg-white text-[#3a342c] hover:bg-[#efe8dc]'
                  }`}
                >
                  Ürün galerileri
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActivePanel('corporateProducts')
                void loadPageByKey('corporate-products')
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'corporateProducts'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              {seoStatusIcon('corporate-products')} Kurumsal Ürünler
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel('blog')
                void loadPageByKey('blog')
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'blog'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              {seoStatusIcon('blog')} Blog
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel('media')
                void loadMediaAssets()
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'media'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              Medya
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel('leads')
                void loadContactRequests()
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'leads'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              İletişim/Talepler
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel('settings')
                void loadSettings()
              }}
              className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                activePanel === 'settings'
                  ? 'bg-[#191714] text-white'
                  : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
              }`}
            >
              Ayarlar
            </button>
          </div>

          {(activePanel === 'home' || activePanel === 'about' || activePanel === 'curtainModels' || activePanel === 'corporateProducts' || activePanel === 'blog' || activePanel === 'products' || activePanel === 'productGalleries' || productDetailPanels.includes(activePanel)) && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6f6960]">İçerik özeti</h2>
                {isLoading && <span className="text-xs text-[#9d7b46]">Yukleniyor</span>}
              </div>

              <div className="hidden space-y-2">
                {pages
                  .filter((page) => page.pageKey === (activePanel === 'home' ? 'home' : activePanel === 'about' ? 'about' : activePanel === 'curtainModels' ? 'curtain-models' : activePanel === 'corporateProducts' ? 'corporate-products' : activePanel === 'blog' ? 'blog' : activePanel === 'products' ? 'products' : activePanel === 'productGalleries' ? selectedProductGalleryPageKey : activeProductDetailPage?.pageKey || 'product-mekanizmali-perdeler'))
                  .map((page) => (
                  <button
                    type="button"
                    key={page.id}
                    onClick={() => void loadPage(page.id)}
                    className={`w-full rounded-md px-3 py-3 text-left text-sm transition ${
                      selectedPage?.id === page.id
                        ? 'bg-[#191714] text-white'
                        : 'bg-[#f8f5ef] text-[#3a342c] hover:bg-[#efe8dc]'
                    }`}
                  >
                    <span className="block font-medium">{page.title}</span>
                    <span className="mt-1 block text-xs opacity-70">{page.pageKey} · {page.status}</span>
                  </button>
                ))}
              </div>
              <div className="rounded-md bg-[#f8f5ef] px-3 py-3 text-sm text-[#6f6960]">
                {activeProductDetailPage
                  ? 'Üst alan, kategori kartları ve teklif çağrısı'
                  : activePanel === 'productGalleries'
                  ? 'Ürün detay fotoğrafları ve medya seçimi'
                  : activePanel === 'products'
                  ? 'Ürün kartları ve Google bilgileri'
                  : activePanel === 'corporateProducts'
                  ? 'Kurumsal ürün kartları ve Google bilgileri'
                  : activePanel === 'blog'
                  ? 'Blog yazıları ve Google bilgileri'
                  : activePanel === 'curtainModels'
                  ? 'Model kartları ve Google bilgileri'
                  : activePanel === 'home'
                  ? 'Hero slider ve Google bilgileri'
                  : 'Üst başlık, ana metin ve istatistikler'}
              </div>
            </>
          )}

          {activePanel === 'media' && (
            <div className="rounded-md bg-[#f8f5ef] px-3 py-3 text-sm text-[#6f6960]">
              {mediaAssets.length} gorsel yuklu
            </div>
          )}

          {activePanel === 'leads' && (
            <div className="rounded-md bg-[#f8f5ef] px-3 py-3 text-sm text-[#6f6960]">
              {contactRequests.length} talep kaydı
            </div>
          )}

          {activePanel === 'settings' && (
            <div className="rounded-md bg-[#f8f5ef] px-3 py-3 text-sm text-[#6f6960]">
              Telefon, WhatsApp, e-posta ve adres
            </div>
          )}
        </aside>

        <section className="space-y-6">
          {statusMessage && activePanel !== 'productGalleries' && (
            <p className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {statusMessage}
            </p>
          )}

          {errorMessage && activePanel !== 'productGalleries' && (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {errorMessage}
            </p>
          )}

          {(activePanel !== 'productGalleries' && activeContentDirty || settingsDirty && activePanel === 'settings' || contactRequestDirty && activePanel === 'leads') && (
            <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
              Kaydedilmemiş taslak var. Bu değerler CMS’den geri okunup doğrulanana kadar kayıtlı kabul edilmez.
            </p>
          )}

          {activePanel === 'home' ? (
            selectedPage ? renderHomePanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Ana sayfa kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activePanel === 'about' ? (
            selectedPage ? renderAboutPanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Hakkımızda kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activePanel === 'curtainModels' ? (
            selectedPage ? renderModelsPanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Perde Modelleri kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activePanel === 'corporateProducts' ? (
            selectedPage ? renderCorporatePanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Kurumsal Ürünler kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activePanel === 'blog' ? (
            selectedPage ? renderBlogPanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Blog kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activePanel === 'productGalleries' ? (
            selectedPage ? renderProductGalleryPanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Ürün galerisi kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activePanel === 'products' ? (
            selectedPage ? renderProductsPanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Ürünler kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activeProductDetailPage ? (
            selectedPage ? renderMechanizedPanel() : (
              <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                Mekanizmalı Perdeler kaydı yüklenemedi. Backend migration ve bağlantısını kontrol et.
              </div>
            )
          ) : activePanel === 'leads' ? (
            renderLeadsPanel()
          ) : activePanel === 'media' ? (
            <div className="space-y-6">
              <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Medya kutuphanesi</h2>
                    <p className="mt-1 text-sm text-[#6f6960]">
                      S3 uzerinden yuklenen site gorselleri.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f]">
                    {isMediaUploading ? 'Yukleniyor' : 'Gorsel yukle'}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      disabled={isMediaUploading}
                      onChange={(event) => {
                        void uploadMediaLibraryImage(event.target.files?.[0] || null)
                        event.currentTarget.value = ''
                      }}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {mediaAssets.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {mediaAssets.map((asset) => (
                    <div key={asset.id} className="overflow-hidden rounded-lg border border-[#ded5c7] bg-white">
                      <div className="relative aspect-[4/3] bg-[#f8f5ef]">
                        <Image
                          src={getPreviewImageUrl(asset.publicUrl, asset.id)}
                          alt={asset.altText || asset.fileName}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-3 p-4">
                        <div>
                          <h3 className="truncate text-sm font-semibold text-[#3a342c]" title={asset.fileName}>
                            {asset.title || asset.fileName}
                          </h3>
                          <p className="mt-1 truncate text-xs text-[#6f6960]" title={asset.fileName}>
                            {asset.fileName}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-[#6f6960]">
                          <span>{formatBytes(asset.sizeBytes)}</span>
                          <span className="text-right">
                            {asset.width && asset.height ? `${asset.width}x${asset.height}` : 'Olcu yok'}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => void copyMediaUrl(asset.publicUrl)}
                            className="flex-1 rounded-md border border-[#d8d0c3] px-3 py-2 text-xs font-medium text-[#3a342c] transition hover:bg-[#f6f3ee]"
                          >
                            URL kopyala
                          </button>
                          <button
                            type="button"
                            onClick={() => void archiveMediaAsset(asset.id)}
                            disabled={deletingMediaId === asset.id}
                            className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                          >
                            Arsivle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-[#ded5c7] bg-white p-8 text-sm text-[#6f6960]">
                  Henuz gorsel yuklenmedi.
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-[#ded5c7] bg-white p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Site ayarlari</h2>
                  <p className="mt-1 text-sm text-[#6f6960]">
                    Public sitede gorunen iletisim bilgileri.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleSettingsSave()}
                  disabled={isLoading || settings.length === 0}
                  className="rounded-md bg-[#191714] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f] disabled:opacity-60"
                >
                  Kaydet
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {editableSettingKeys.map((settingKey) => {
                  const isLongText = settingKey === 'company.address.showroom'
                  const isMissing = settings.length > 0 && !settings.some((setting) => setting.settingKey === settingKey)

                  return (
                    <label
                      key={settingKey}
                      className={`text-sm font-medium text-[#3a342c] ${isLongText ? 'md:col-span-2' : ''}`}
                    >
                      {settingLabels[settingKey]}
                      {isLongText ? (
                        <textarea
                          value={settingsForm[settingKey] || ''}
                          onChange={(event) => setSettingsForm({ ...settingsForm, [settingKey]: event.target.value })}
                          rows={4}
                          disabled={isMissing}
                          className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46] disabled:bg-[#f6f3ee]"
                        />
                      ) : (
                        <input
                          value={settingsForm[settingKey] || ''}
                          onChange={(event) => setSettingsForm({ ...settingsForm, [settingKey]: event.target.value })}
                          disabled={isMissing}
                          className="mt-2 w-full rounded-md border border-[#d8d0c3] px-3 py-2 text-sm outline-none focus:border-[#9d7b46] disabled:bg-[#f6f3ee]"
                        />
                      )}
                      {isMissing && (
                        <span className="mt-1 block text-xs font-normal text-red-700">
                          Bu ayar backend seed&apos;inde yok. Migration calistiktan sonra duzenlenebilir.
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default AdminPage

