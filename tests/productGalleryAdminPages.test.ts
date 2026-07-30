import { describe, expect, it } from 'vitest'
import { buildProductGalleryAdminPages } from '@/lib/productGalleryAdminPages'

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
})
