import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  buildProductGalleryContentJson,
  defaultProductVideoGallery,
  getLocalizedProductGalleryText,
  getYouTubeNoCookieEmbedUrl,
  getYouTubeVideoId,
  parseProductGalleryImages,
  parseProductVideoGallery,
  setLocalizedProductGalleryText,
  type ProductGalleryVideo,
  type ProductVideoGallery,
} from '@/lib/productGalleryContent'
import {
  isProductVideoGalleryAdminEnabled,
  isProductVideoGalleryEnabled,
  isProductVideoGalleryPilot,
  productVideoGalleryEnabledPageKeys,
  productVideoGalleryPilotPageKey,
} from '@/lib/productVideoGalleryPilot'

describe('product video gallery content', () => {
  it('uses the shared motorized gallery fallback headings without writing CMS data', () => {
    expect(defaultProductVideoGallery.eyebrow).toEqual({ tr: 'VİDEO GALERİSİ' })
    expect(defaultProductVideoGallery.title).toEqual({ tr: 'Motorlu Perde Uygulamaları' })
    expect(defaultProductVideoGallery.videos).toEqual([])
  })

  it.each([
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://youtu.be/dQw4w9WgXcQ?t=2', 'dQw4w9WgXcQ'],
    ['https://youtube.com/shorts/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['youtube.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://youtube.com/live/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ])('parses supported YouTube URL %s', (url, expectedId) => {
    expect(getYouTubeVideoId(url)).toBe(expectedId)
  })

  it.each([
    'https://example.com/watch?v=dQw4w9WgXcQ',
    'https://youtube.com/watch?v=too-short',
    'javascript:alert(1)',
    '',
  ])('rejects invalid YouTube URL %s', (url) => {
    expect(getYouTubeVideoId(url)).toBe('')
  })

  it('uses the privacy-enhanced embed host without autoplay', () => {
    const embedUrl = getYouTubeNoCookieEmbedUrl('https://youtu.be/dQw4w9WgXcQ')
    expect(embedUrl).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ')
    expect(embedUrl).not.toContain('autoplay')
  })

  it('sorts videos and preserves locale blanks', () => {
    const gallery = parseProductVideoGallery(JSON.stringify({
      videoGallery: {
        eyebrow: { tr: '', en: 'VIDEO GALLERY' },
        title: { tr: 'Motorlu Perde Videoları' },
        videos: [
          {
            id: 'second',
            title: { tr: 'İkinci' },
            description: { tr: '' },
            youtubeUrl: 'not-a-youtube-url',
            enabled: false,
            sortOrder: 2,
          },
          {
            id: 'first',
            title: { tr: 'Birinci' },
            description: { tr: 'Açıklama' },
            youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ',
            enabled: true,
            sortOrder: 1,
          },
        ],
      },
    }))

    expect(gallery.videos.map((video) => video.id)).toEqual(['first', 'second'])
    expect(gallery.videos[1].enabled).toBe(false)
    expect(getLocalizedProductGalleryText(gallery.eyebrow, 'tr', 'fallback')).toBe('')
    expect(getLocalizedProductGalleryText(gallery.eyebrow, 'en')).toBe('VIDEO GALLERY')
  })

  it('updates one locale without overwriting another locale', () => {
    expect(setLocalizedProductGalleryText({ tr: 'Türkçe', en: 'English' }, 'tr', '')).toEqual({
      tr: '',
      en: 'English',
    })
  })

  it('keeps the legacy single video and the new gallery as separate JSON keys', () => {
    const legacyVideo: ProductGalleryVideo = {
      title: 'Nasıl Çalışır?',
      description: 'Eski alan',
      youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ',
      enabled: true,
    }
    const videoGallery: ProductVideoGallery = {
      ...defaultProductVideoGallery,
      videos: [{
        id: 'gallery-video',
        title: { tr: 'Galeri videosu' },
        description: { tr: '' },
        youtubeUrl: 'https://youtu.be/aqz-KE-bpKQ',
        enabled: true,
        sortOrder: 0,
      }],
    }

    const parsed = JSON.parse(buildProductGalleryContentJson(
      [],
      undefined,
      legacyVideo,
      undefined,
      videoGallery,
    ))

    expect(parsed.video).toEqual(legacyVideo)
    expect(parsed.videoGallery).toEqual(videoGallery)
  })

  it('treats a deliberately empty image array as an empty photo gallery', () => {
    const fallbackImages = [{
      id: 1,
      src: '/fallback.jpg',
      alt: 'Fallback',
      title: 'Fallback',
    }]
    expect(parseProductGalleryImages('{"images":[]}', fallbackImages, true)).toEqual([])
    expect(parseProductGalleryImages('{"images":[]}', fallbackImages)).toEqual(fallbackImages)
  })

  it('enables the feature only for the approved product pageKeys', () => {
    expect(new Set(productVideoGalleryEnabledPageKeys).size).toBe(7)
    expect(isProductVideoGalleryPilot(productVideoGalleryPilotPageKey)).toBe(true)
    productVideoGalleryEnabledPageKeys.forEach((pageKey) => {
      expect(isProductVideoGalleryEnabled(pageKey)).toBe(true)
    })
    expect(isProductVideoGalleryEnabled(
      'product-gallery-model-perdeler-kis-bahcesi-perde',
    )).toBe(true)
    expect(isProductVideoGalleryEnabled(
      'product-gallery-urunler-motorlu-perdeler-projeksiyon-perde',
    )).toBe(false)
    expect(isProductVideoGalleryEnabled(
      'product-gallery-urunler-mekanizmali-perdeler-stor-perde',
    )).toBe(false)
  })

  it('renders the admin section from the loaded CMS pageKey when catalog selection state is stale', () => {
    productVideoGalleryEnabledPageKeys.forEach((pageKey) => {
      expect(isProductVideoGalleryAdminEnabled(
        'product-gallery-urunler-mekanizmali-perdeler-stor-perde',
        pageKey,
      )).toBe(true)
    })

    expect(isProductVideoGalleryAdminEnabled(
      productVideoGalleryPilotPageKey,
      'product-gallery-urunler-motorlu-perdeler-projeksiyon-perde',
    )).toBe(false)
  })

  it('keeps the shared empty-state and click-to-load iframe guards intact', () => {
    const componentSource = readFileSync(
      resolve(process.cwd(), 'components/ProductVideoGallery.tsx'),
      'utf8',
    )

    expect(componentSource).toContain('if (videos.length === 0)')
    expect(componentSource).toContain('return null')
    expect(componentSource.indexOf('{isLoaded ? (')).toBeLessThan(
      componentSource.indexOf('<iframe'),
    )
  })

  it('places the shared video gallery before the existing winter garden photo gallery', () => {
    const pageSource = readFileSync(
      resolve(process.cwd(), 'app/model-perdeler/kis-bahcesi-perde/page.tsx'),
      'utf8',
    )
    const videoGalleryIndex = pageSource.indexOf('<ManagedProductVideoGallery')
    const photoGalleryIndex = pageSource.indexOf('<ProductGalleryHeading')

    expect(videoGalleryIndex).toBeGreaterThan(-1)
    expect(photoGalleryIndex).toBeGreaterThan(videoGalleryIndex)
    expect(pageSource.match(/<ManagedProductVideoGallery/g)).toHaveLength(1)
  })
})
