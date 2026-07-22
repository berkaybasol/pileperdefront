'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useCmsSectionJson } from '@/components/CmsPageProvider'
import type { BreadcrumbItem as SeoBreadcrumbItem } from '@/lib/breadcrumbs'
import {
  defaultProductGalleryVideo,
  getPublicProductGallery,
  getPublicProductGalleryHeroCopy,
  getPublicProductGalleryVideo,
  getYouTubeEmbedUrl,
  parseProductGalleryHeroCopy,
  parseProductGalleryImages,
  parseProductGalleryVideo,
  type ProductGalleryHeroCopy,
  type ProductGalleryImage,
  type ProductGalleryVideo,
} from '@/lib/productGalleryContent'

type BreadcrumbItem = {
  label: string
  href?: string
}

type ManagedProductGalleryPageProps = {
  pageKey: string
  title: string
  description: string
  fallbackImages: ProductGalleryImage[]
  breadcrumbItems?: BreadcrumbItem[]
  eyebrow?: string
  galleryTitle?: string
  seoBreadcrumbItems?: SeoBreadcrumbItem[]
  breadcrumbCanonicalUrl?: string
  fallbackHeroCopy?: ProductGalleryHeroCopy
}

export default function ManagedProductGalleryPage({
  pageKey,
  title,
  description,
  fallbackImages,
  breadcrumbItems,
  eyebrow,
  galleryTitle = `${title} Modelleri`,
  seoBreadcrumbItems,
  breadcrumbCanonicalUrl,
  fallbackHeroCopy,
}: ManagedProductGalleryPageProps) {
  const resolvedBreadcrumbItems = useMemo(() => breadcrumbItems || [
    { label: '\u00dcr\u00fcnler', href: '/urunler' },
    { label: 'T\u00fcl & Fon Perde', href: '/urunler/tul-fon-perde' },
    { label: title },
  ], [breadcrumbItems, title])
  const resolvedFallbackHeroCopy = useMemo<ProductGalleryHeroCopy>(() => fallbackHeroCopy || ({
    breadcrumbLabel: resolvedBreadcrumbItems[resolvedBreadcrumbItems.length - 1]?.label || title,
    eyebrow: eyebrow || `${title} Koleksiyonu`,
    title,
    highlightedTitle: '',
    description,
  }), [description, eyebrow, fallbackHeroCopy, resolvedBreadcrumbItems, title])
  const initialContentJson = useCmsSectionJson(pageKey, 'product.gallery')
  const initialImages = useMemo(
    () => parseProductGalleryImages(initialContentJson, fallbackImages),
    [fallbackImages, initialContentJson],
  )
  const initialHeroCopy = useMemo(
    () => parseProductGalleryHeroCopy(initialContentJson, resolvedFallbackHeroCopy),
    [initialContentJson, resolvedFallbackHeroCopy],
  )
  const initialVideo = useMemo(
    () => parseProductGalleryVideo(initialContentJson, defaultProductGalleryVideo),
    [initialContentJson],
  )
  const [images, setImages] = useState<ProductGalleryImage[]>(initialImages)
  const [selectedImage, setSelectedImage] = useState<ProductGalleryImage>(initialImages[0])
  const [heroCopy, setHeroCopy] = useState<ProductGalleryHeroCopy>(initialHeroCopy)
  const [productVideo, setProductVideo] = useState<ProductGalleryVideo>(initialVideo)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fallbackVideo = {
      title: 'Nasıl Çalışır?',
      description: `${title} sisteminin çalışma prensibini ve kullanım detaylarını videomuzda izleyebilirsiniz.`,
      youtubeUrl: '',
      enabled: false,
    }

    getPublicProductGallery(pageKey, fallbackImages).then((nextImages) => {
      if (isMounted && nextImages.length > 0) {
        setImages(nextImages)
        setSelectedImage((current) => nextImages.find((image) => image.id === current.id) || nextImages[0])
      }
    })

    getPublicProductGalleryHeroCopy(pageKey, resolvedFallbackHeroCopy).then((nextHeroCopy) => {
      if (isMounted) {
        setHeroCopy(nextHeroCopy)
      }
    })

    getPublicProductGalleryVideo(pageKey, fallbackVideo).then((nextVideo) => {
      if (isMounted) {
        setProductVideo(nextVideo)
      }
    })

    return () => {
      isMounted = false
    }
  }, [fallbackImages, pageKey, resolvedFallbackHeroCopy, title])

  const currentImageIndex = images.findIndex((image) => image.id === selectedImage.id)
  const videoEmbedUrl = getYouTubeEmbedUrl(productVideo.youtubeUrl)

  const goToPrevious = () => {
    const previousIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
    setSelectedImage(images[previousIndex])
  }

  const goToNext = () => {
    const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
    setSelectedImage(images[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false)
      }

      if (lightboxOpen) {
        if (event.key === 'ArrowLeft') {
          goToPrevious()
        }
        if (event.key === 'ArrowRight') {
          goToNext()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentImageIndex, lightboxOpen])

  return (
    <>
    {seoBreadcrumbItems && breadcrumbCanonicalUrl && (
      <BreadcrumbListJsonLd items={seoBreadcrumbItems} canonicalUrl={breadcrumbCanonicalUrl} />
    )}
    <main className="bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            {seoBreadcrumbItems && breadcrumbCanonicalUrl ? (
              <Breadcrumbs items={seoBreadcrumbItems} canonicalUrl={breadcrumbCanonicalUrl} className="mb-8" />
            ) : <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
              {resolvedBreadcrumbItems.map((item, index) => {
                const label = index === resolvedBreadcrumbItems.length - 1 ? heroCopy.breadcrumbLabel : item.label
                return (
                <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {item.href ? (
                    <Link href={item.href} className="text-sm text-gray-500 transition-colors hover:text-gray-300">
                      {label}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">{label}</span>
                  )}
                  {index < resolvedBreadcrumbItems.length - 1 && (
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              )})}
            </div>}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              <span className="text-xs uppercase tracking-wider text-gray-400">{heroCopy.eyebrow}</span>
            </div>

            <h1 className="mb-6 text-4xl font-extralight text-white md:text-5xl lg:text-6xl">
              {heroCopy.title}
              {heroCopy.highlightedTitle && (
                <>{' '}<span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                    {heroCopy.highlightedTitle}
                  </span></>
              )}
            </h1>

            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-gray-400">
              {heroCopy.description}
            </p>
          </div>
        </div>
      </section>

      {productVideo.enabled !== false && videoEmbedUrl && (
        <section className="relative border-t border-white/5 py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">Video Anlatım</p>
              <h2 className="mb-6 text-3xl font-extralight text-white md:text-4xl">
                {productVideo.title}
              </h2>
              {productVideo.description && (
                <p className="mx-auto mb-12 max-w-2xl font-light leading-relaxed text-gray-400">
                  {productVideo.description}
                </p>
              )}
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-2xl">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={videoEmbedUrl}
                    title={productVideo.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative border-t border-white/5 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">Ürün Galerisi</p>
            <h2 className="text-3xl font-extralight text-white md:text-4xl">
              {galleryTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <div key={image.id} className="group">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(image)
                    setLightboxOpen(true)
                  }}
                  className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 transition-all duration-500 hover:border-white/20"
                >
                  <Image
                    src={image.src}
                    alt={image.alt || image.title}
                    fill
                    className="object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-end">
                      <div className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:bg-white">
                        <svg
                          className="h-4 w-4 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="mb-4 text-2xl font-extralight text-white md:text-3xl">
            {heroCopy.breadcrumbLabel} hakkında sorularınız mı var?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl font-light text-gray-400">
            Dilerseniz hemen <strong>0312 241 72 72</strong> no&apos;lu telefondan bize ulaşarak uygulamak istediğiniz
            alanın ölçülerini bizimle paylaşabilir ve fiyat konusunda bilgi talep edebilirsiniz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="tel:+903122417272"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-8 py-4 text-black transition-all duration-300 hover:gap-4"
            >
              <span className="relative z-10 font-medium">0312 241 72 72</span>
              <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="absolute inset-0 translate-x-full bg-gradient-to-r from-gray-100 to-gray-200 transition-transform duration-300 group-hover:translate-x-0" />
            </Link>

            <Link
              href="https://wa.me/905335127272"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-white transition-all duration-300 hover:bg-[#20BA5A]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="font-medium">WhatsApp ile İletişim</span>
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-h-[90vh] w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
                aria-label="Galeriyi kapat"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
                aria-label="Önceki görsel"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
                aria-label="Sonraki görsel"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt || selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-end">
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </>
  )
}
