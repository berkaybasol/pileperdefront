'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  getLocalizedProductGalleryText,
  getYouTubeNoCookieEmbedUrl,
  getYouTubeVideoId,
  type ProductGalleryLocale,
  type ProductVideoGallery as ProductVideoGalleryData,
} from '@/lib/productGalleryContent'
import styles from './ProductVideoGallery.module.css'

type ProductVideoGalleryProps = {
  gallery: ProductVideoGalleryData
  locale?: ProductGalleryLocale
}

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 3
  if (window.matchMedia('(min-width: 1024px)').matches) return 3
  if (window.matchMedia('(min-width: 640px)').matches) return 2
  return 1
}

export default function ProductVideoGallery({
  gallery,
  locale = 'tr',
}: ProductVideoGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadedVideoIds, setLoadedVideoIds] = useState<Set<string>>(() => new Set())

  const videos = useMemo(() => gallery.videos
    .filter((video) => video.enabled && Boolean(getYouTubeVideoId(video.youtubeUrl)))
    .sort((a, b) => a.sortOrder - b.sortOrder), [gallery.videos])
  const eyebrow = getLocalizedProductGalleryText(gallery.eyebrow, locale)
  const title = getLocalizedProductGalleryText(gallery.title, locale)
  const maxIndex = Math.max(0, videos.length - visibleCount)
  const showControls = videos.length > visibleCount

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount())
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  const scrollToIndex = useCallback((nextIndex: number) => {
    const resolvedIndex = Math.max(0, Math.min(nextIndex, maxIndex))
    const scroller = scrollerRef.current
    const card = cardRefs.current[resolvedIndex]
    if (!scroller || !card) return

    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: 'smooth',
    })
    setActiveIndex(resolvedIndex)
  }, [maxIndex])

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const nearestIndex = cardRefs.current.reduce((nearest, card, index) => {
      if (!card) return nearest
      const distance = Math.abs(card.offsetLeft - scroller.offsetLeft - scroller.scrollLeft)
      const nearestCard = cardRefs.current[nearest]
      const nearestDistance = nearestCard
        ? Math.abs(nearestCard.offsetLeft - scroller.offsetLeft - scroller.scrollLeft)
        : Number.POSITIVE_INFINITY
      return distance < nearestDistance ? index : nearest
    }, 0)
    setActiveIndex(Math.min(nearestIndex, maxIndex))
  }, [maxIndex])

  if (videos.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-labelledby={title ? 'product-video-gallery-title' : undefined}>
      <div className={styles.container}>
        {(eyebrow || title) && (
          <div className={styles.heading}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2 id="product-video-gallery-title" className={styles.title}>{title}</h2>}
          </div>
        )}

        <div className={styles.carousel}>
          {showControls && (
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Önceki videoyu göster"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex >= maxIndex}
                aria-label="Sonraki videoyu göster"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          )}

          <div
            ref={scrollerRef}
            className={styles.scroller}
            tabIndex={0}
            role="region"
            aria-label="Video galerisi"
            onScroll={handleScroll}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                scrollToIndex(activeIndex - 1)
              } else if (event.key === 'ArrowRight') {
                event.preventDefault()
                scrollToIndex(activeIndex + 1)
              }
            }}
          >
            {videos.map((video, index) => {
              const videoId = getYouTubeVideoId(video.youtubeUrl)
              const embedUrl = getYouTubeNoCookieEmbedUrl(video.youtubeUrl)
              const videoTitle = getLocalizedProductGalleryText(video.title, locale)
              const description = getLocalizedProductGalleryText(video.description, locale)
              const isLoaded = loadedVideoIds.has(video.id)
              const accessibleTitle = videoTitle || `Video ${index + 1}`

              return (
                <article
                  key={video.id}
                  ref={(element) => {
                    cardRefs.current[index] = element
                  }}
                  className={styles.card}
                  data-video-card
                >
                  <div className={styles.media}>
                    {isLoaded ? (
                      <iframe
                        src={embedUrl}
                        title={accessibleTitle}
                        className={styles.iframe}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        className={styles.facade}
                        onClick={() => setLoadedVideoIds((current) => new Set(current).add(video.id))}
                        aria-label={`${accessibleTitle} videosunu oynat`}
                      >
                        <Image
                          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 42vw, 88vw"
                          className={styles.thumbnail}
                        />
                        <span className={styles.mediaShade} />
                        <span className={styles.playButton} aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="m9 7 8 5-8 5V7Z" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>

                  {(videoTitle || description) && (
                    <div className={styles.copy}>
                      {videoTitle && <h3>{videoTitle}</h3>}
                      {description && <p>{description}</p>}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
