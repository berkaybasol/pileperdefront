import { describe, expect, it } from 'vitest'
import { buildProductGalleryAdminPages } from '@/lib/productGalleryAdminPages'
import { productVideoGalleryEnabledPageKeys } from '@/lib/productVideoGalleryPilot'

describe('dynamic product gallery admin pages', () => {
  it('adds a new source product without a manual mapping and preserves filters and Turkish sorting', () => {
    const pages = buildProductGalleryAdminPages({
      pages: [
        {
          pageKey: 'product-gallery-model-perdeler-deney',
          slug: '/model-perdeler/deney',
          title: 'deney',
        },
        {
          pageKey: 'product-gallery-urunler-metal-zincir-perde-pro-collection',
          slug: '/urunler/metal-zincir-perde/pro-collection',
          title: 'Pro Collection Galerisi',
        },
        {
          pageKey: 'product-gallery-urunler-motorlu-tul-ve-kumas-perdeler',
          slug: '/urunler-motorlu-tul-ve-kumas-perdeler',
          title: 'Motorlu Tül ve Kumaş Perdeler',
        },
        {
          pageKey: 'product-gallery-model-perdeler-motorlu-tul-ve-kumas-perde',
          slug: '/model-perdeler/motorlu-tul-ve-kumas-perde',
          title: 'Motorlu Tül ve Kumaş Perde',
        },
      ],
      productItems: [{
        title: 'İğne Perde',
        href: '/urunler/mekanizmali-perdeler/igne-perde',
      }],
      modelItems: [{
        title: 'Ahşap Jaluzi Perde',
        href: '/model-perdeler/ahsap-jaluzi-perde',
      }],
      corporateItems: [],
      mechanizedCategories: [],
    })

    expect(pages.map((page) => page.label)).toEqual([
      'Ahşap Jaluzi Perde',
      'İğne Perde',
      'Motorlu Tül ve Kumaş Perdeler',
    ])
    expect(pages).toContainEqual({
      pageKey: 'product-gallery-urunler-mekanizmali-perdeler-igne-perde',
      label: 'İğne Perde',
      displayLabel: 'İğne Perde',
      href: '/urunler/mekanizmali-perdeler/igne-perde',
    })
  })

  it('keeps the real CMS title visible when a catalog label targets the same gallery record', () => {
    const pages = buildProductGalleryAdminPages({
      pages: [{
        pageKey: 'product-gallery-model-perdeler-modern-perde',
        slug: '/model-perdeler/modern-perde',
        title: 'Modern Perde Modelleri',
      }],
      productItems: [],
      modelItems: [{
        title: 'Modern Perde',
        href: '/model-perdeler/modern-perde',
      }],
      corporateItems: [],
      mechanizedCategories: [],
    })

    expect(pages).toEqual([{
      pageKey: 'product-gallery-model-perdeler-modern-perde',
      label: 'Modern Perde',
      displayLabel: 'Modern Perde Modelleri',
      href: '/model-perdeler/modern-perde',
    }])
  })

  it('keeps every enabled motorized gallery page exactly once when CMS and catalog sources overlap', () => {
    const cmsPages = [
      {
        pageKey: 'product-gallery-urunler-motorlu-tul-ve-kumas-perdeler',
        slug: '/urunler-motorlu-tul-ve-kumas-perdeler',
        title: 'Motorlu Tül ve Kumaş Perdeler',
      },
      {
        pageKey: 'product-gallery-urunler-motorlu-perdeler-ahsap-jaluzi',
        slug: '/urunler/motorlu-perdeler/ahsap-jaluzi',
        title: 'Motorlu Ahşap Jaluziler',
      },
      {
        pageKey: 'product-gallery-urunler-motorlu-perdeler-motorlu-stor-perdeler',
        slug: '/urunler/motorlu-perdeler/motorlu-stor-perdeler',
        title: 'Motorlu Stor Perdeler',
      },
      {
        pageKey: 'product-gallery-urunler-motorlu-perdeler-motorlu-dikey-perdeler',
        slug: '/urunler/motorlu-perdeler/motorlu-dikey-perdeler',
        title: 'Motorlu Dikey Perdeler',
      },
      {
        pageKey: 'product-gallery-urunler-motorlu-perdeler-zip-perde',
        slug: '/urunler/motorlu-perdeler/zip-perde',
        title: 'Zip Perde',
      },
      {
        pageKey: 'product-gallery-urunler-motorlu-perdeler-dis-cephe-jaluzi',
        slug: '/urunler/motorlu-perdeler/dis-cephe-jaluzi',
        title: 'Dış Cephe Jaluzi',
      },
    ]
    const pages = buildProductGalleryAdminPages({
      pages: cmsPages,
      productItems: cmsPages.slice(1).map((page) => ({
        title: page.title,
        href: page.slug,
      })),
      modelItems: [],
      corporateItems: [],
      mechanizedCategories: [],
    })

    productVideoGalleryEnabledPageKeys.forEach((pageKey) => {
      expect(pages.filter((page) => page.pageKey === pageKey)).toHaveLength(1)
    })
  })
})
