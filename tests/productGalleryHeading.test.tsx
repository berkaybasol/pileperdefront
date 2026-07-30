import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { CmsPageProvider, type ClientCmsPage } from '@/components/CmsPageProvider'
import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import {
  getStoredProductGalleryHeading,
  mergeProductGalleryHeadingLocale,
  parseProductGalleryHeading,
} from '@/lib/productGalleryContent'

const fallbackHeading = {
  galleryEyebrow: 'Ürün Galerisi',
  galleryTitle: 'Alüminyum Jaluzi Modelleri',
}

const renderHeading = (content: Record<string, unknown>) => {
  const page: ClientCmsPage = {
    pageKey: 'product-gallery-test',
    slug: '/urunler/test',
    seoTitle: null,
    seoDescription: null,
    sections: [{
      sectionKey: 'product.gallery',
      title: null,
      subtitle: null,
      body: null,
      contentJson: JSON.stringify(content),
      enabled: true,
    }],
  }

  return renderToStaticMarkup(
    <CmsPageProvider page={page}>
      <ProductGalleryHeading
        fallbackEyebrow={fallbackHeading.galleryEyebrow}
        fallbackTitle={fallbackHeading.galleryTitle}
      />
    </CmsPageProvider>,
  )
}

describe('product gallery heading contract', () => {
  it('uses the legacy fallback when locale fields are missing', () => {
    expect(parseProductGalleryHeading('{}', fallbackHeading, 'tr')).toEqual(fallbackHeading)
  })

  it('treats an explicitly stored empty string as a value and blocks fallback', () => {
    expect(parseProductGalleryHeading(JSON.stringify({
      galleryEyebrow: { tr: '' },
      galleryTitle: { tr: '' },
    }), fallbackHeading, 'tr')).toEqual({
      galleryEyebrow: '',
      galleryTitle: '',
    })
  })

  it('renders only the main title when the eyebrow is empty', () => {
    const html = renderHeading({
      galleryEyebrow: { tr: '' },
      galleryTitle: { tr: 'Ana Başlık' },
    })

    expect(html).toContain('data-product-gallery-heading')
    expect(html).not.toContain('<p')
    expect(html).toContain('<h2')
    expect(html).toContain('Ana Başlık')
  })

  it('renders only the eyebrow when the main title is empty', () => {
    const html = renderHeading({
      galleryEyebrow: { tr: 'Küçük Etiket' },
      galleryTitle: { tr: '' },
    })

    expect(html).toContain('data-product-gallery-heading')
    expect(html).toContain('<p')
    expect(html).not.toContain('<h2')
    expect(html).toContain('Küçük Etiket')
  })

  it('does not render a heading container when both fields are empty', () => {
    const html = renderHeading({
      galleryEyebrow: { tr: '' },
      galleryTitle: { tr: '' },
    })

    expect(html).not.toContain('data-product-gallery-heading')
  })

  it('preserves other locale values when one locale is updated', () => {
    const stored = {
      galleryEyebrow: { tr: 'Türkçe', en: 'English' },
      galleryTitle: { tr: 'Türkçe Başlık', de: 'Deutscher Titel' },
    }

    expect(mergeProductGalleryHeadingLocale(stored, 'tr', {
      galleryEyebrow: 'Yeni Türkçe',
      galleryTitle: '',
    })).toEqual({
      galleryEyebrow: { tr: 'Yeni Türkçe', en: 'English' },
      galleryTitle: { tr: '', de: 'Deutscher Titel' },
    })
  })

  it('does not leak another locale into a deliberately empty Turkish value', () => {
    expect(parseProductGalleryHeading(JSON.stringify({
      galleryEyebrow: { tr: '', en: 'Product Gallery' },
      galleryTitle: { tr: '', de: 'Deutsche Modelle' },
    }), fallbackHeading, 'tr')).toEqual({
      galleryEyebrow: '',
      galleryTitle: '',
    })
  })

  it('reads legacy flat strings as Turkish locale values', () => {
    expect(getStoredProductGalleryHeading(JSON.stringify({
      galleryEyebrow: 'Ürün Galerisi',
      galleryTitle: 'Legacy Başlık',
    }))).toEqual({
      galleryEyebrow: { tr: 'Ürün Galerisi' },
      galleryTitle: { tr: 'Legacy Başlık' },
    })
  })
})
