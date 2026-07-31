'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/silhouette-vision-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Silhouette Vision Perde', url: '/urunler/mekanizmali-perdeler/silhouette-vision-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/8ba7bdbe-2498-4e41-99ef-4c17f05c9877/file', alt: 'Vision Perde', title: 'Vision Perde' },
  { id: 2, src: '/api/public/media/images/663b989e-eda6-4ca3-9b15-05b9b5fcebd9/file', alt: 'Silhouette Vision Perde', title: 'Silhouette Vision Perde' },
  { id: 3, src: '/api/public/media/images/a1f78594-a761-4c14-bb8b-ca444cc75397/file', alt: 'Silüet Perde', title: 'Silüet Perde' },
  { id: 4, src: '/api/public/media/images/a4bf9717-0552-4fb0-8148-6f10f8e895dc/file', alt: 'Krem Silüet Perde', title: 'Krem Silüet Perde' },
  { id: 5, src: '/api/public/media/images/cdc0be69-9a21-4acc-8763-18ffc3bae3c6/file', alt: 'Silüet Stor Perde', title: 'Silüet Stor Perde' },
  { id: 6, src: '/api/public/media/images/f149ce18-8580-4bfb-b777-42fd769d61b8/file', alt: 'Vision Perde Model', title: 'Vision Perde Model' },
  { id: 7, src: '/api/public/media/images/c90e74b0-4ad9-49c5-824f-14820e6c8ee4/file', alt: 'Silhouette Stor Perde Vision', title: 'Silhouette Stor Perde Vision' },
  { id: 8, src: '/api/public/media/images/74f03185-3738-42f8-a5bf-bc5fa164c670/file', alt: 'Silhouette Stor Krem', title: 'Silhouette Stor Krem' },
  { id: 9, src: '/api/public/media/images/52608bd0-dd92-4b4b-a7c2-1505f12e31d2/file', alt: 'Silhouette Perde', title: 'Silhouette Perde' },
  { id: 10, src: '/api/public/media/images/21535a18-b9bc-41cd-869e-d5356704a54d/file', alt: 'Silhouette Perde Vision', title: 'Silhouette Perde Vision' },
  { id: 11, src: '/api/public/media/images/34e2bad7-8aa6-43f4-a5c0-52b3fe20ff21/file', alt: 'Silhouette Vision Perde', title: 'Silhouette Vision Perde' },
  { id: 12, src: '/api/public/media/images/c799046e-6a7c-4451-a6fb-e36db1b41fa9/file', alt: 'Krem Silhouette Perde Vision', title: 'Krem Silhouette Perde Vision' },
  { id: 13, src: '/api/public/media/images/1e674bbd-37e2-45da-9af7-9aa5b6560a38/file', alt: 'Silhouette ve Vision Perde', title: 'Silhouette ve Vision Perde' },
  { id: 14, src: '/api/public/media/images/cd1c5213-8d46-416e-9e3b-fe5780effb55/file', alt: 'Farklı Stor Perde', title: 'Farklı Stor Perde' },
  { id: 15, src: '/api/public/media/images/5e036151-3840-4a36-a0d1-ffdbaad18031/file', alt: 'Sıradışı Stor Perde', title: 'Sıradışı Stor Perde' },
  { id: 16, src: '/api/public/media/images/b89501ea-9b54-47db-917c-7ce1dd817b79/file', alt: 'Değişik Stor Perde', title: 'Değişik Stor Perde' },
  { id: 17, src: '/api/public/media/images/db1677f6-d6ca-4575-9615-a9230da276c5/file', alt: 'Farklı Stor Perde Model', title: 'Farklı Stor Perde Model' },
  { id: 18, src: '/api/public/media/images/753cb240-d69f-493a-a00c-1c3f288b5d27/file', alt: 'Farklı Stor Perde', title: 'Farklı Stor Perde' },
  { id: 19, src: '/api/public/media/images/becd9920-b53a-49da-ba81-12175b31924d/file', alt: 'VIP Ofis Perdesi', title: 'VIP Ofis Perdesi' },
  { id: 20, src: '/api/public/media/images/47febbf2-51eb-4c0d-ba6d-2c393da7068e/file', alt: 'Makam Odası Perde Model', title: 'Makam Odası Perde Model' },
  { id: 21, src: '/api/public/media/images/3b8f5a32-3de6-462b-afa3-84372b2ccabd/file', alt: 'Makam Odası Perdesi', title: 'Makam Odası Perdesi' },
  { id: 22, src: '/api/public/media/images/c84b5dc5-42a8-4390-9efa-2b4d5c22ac13/file', alt: 'Makam Odası Perde', title: 'Makam Odası Perde' },
  { id: 23, src: '/api/public/media/images/7500f0cd-7b0b-4c98-bd89-fef06e0ddb43/file', alt: 'Stor Çeşitleri', title: 'Stor Çeşitleri' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-silhouette-vision-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Silhouette & Vision Perde",
  eyebrow: "WIP Technical Perde Koleksiyonu",
  title: "Silhouette & Vision",
  highlightedTitle: "Perde",
  description: "Pile Perde garantisiyle satışa sunduğumuz Silhouette & Vision perdeler, alışılmış mekanizmalı sistemlere alternatif, dekoratif ve fonksiyonel mekanizmalı stor perde türüdür. 1.sınıf kumaş ve mekanizmalardan üretilmektedir.",
}

const youtubeVideos = [
  { id: 1, videoId: 'IBxhaBcp1cM', title: 'Silhouette Perde Tanıtım' },
  { id: 2, videoId: 'bpLsYfnAQdM', title: 'Vision Perde Uygulaması' },
  { id: 3, videoId: 'ozhHWcCPSNg', title: 'Silhouette & Vision Özellikler' }
]

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function SilhouetteVisionPerdePage() {
  const [galleryImages, setGalleryImages] = useState<ProductGalleryImage[]>(productImages)
  const [selectedImage, setSelectedImage] = useState<ProductGalleryImage>(productImages[0])
  const initialHeroCopy = parseProductGalleryHeroCopy(
    useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery'),
    defaultHeroCopy,
  )
  const [heroCopy, setHeroCopy] = useState(initialHeroCopy)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    getPublicProductGallery(PRODUCT_GALLERY_PAGE_KEY, productImages).then((images) => {
      if (isMounted && images.length > 0) {
        setGalleryImages(images)
        setSelectedImage(images[0])
      }
    })

    getPublicProductGalleryHeroCopy(PRODUCT_GALLERY_PAGE_KEY, defaultHeroCopy).then((copy) => {
      if (!isMounted) {
        return
      }

      setHeroCopy(copy)
    })

    return () => {
      isMounted = false
    }
  }, [])
  
  // Lightbox navigation functions
  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

  const goToPrevious = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
    setSelectedImage(galleryImages[prevIndex])
  }

  const goToNext = () => {
    const nextIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0
    setSelectedImage(galleryImages[nextIndex])
  }

  // ESC tuşu ile modal kapatma + arrow keys ile navigasyon
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
        }
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          goToPrevious()
        }
        if (e.key === 'ArrowRight') {
          goToNext()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentImageIndex])

  return (
    <>
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      <main className="bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">{heroCopy.eyebrow}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6">
              {heroCopy.title}
              {heroCopy.highlightedTitle && (
                <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                  {heroCopy.highlightedTitle}
                </span>
              )}
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              {heroCopy.description}
            </p>
          </div>
        </div>
      </section>
      <ProductNavigationPilot>

      {/* Full Product Gallery - Dark Glassmorphism Grid */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Silhouette & Vision Perde Modelleri"
            className="text-center mb-16"
            eyebrowClassName="text-sm text-gray-500 uppercase tracking-[0.3em]"
            eyebrowTitleSpacingClassName="mb-4"
            titleClassName="text-3xl md:text-4xl font-extralight text-white"
          />

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group">
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image)
                    setLightboxOpen(true)
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        {/* Title hidden for UI but kept for SEO */}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 flex-shrink-0 ml-4">
                        <svg
                          className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Product Info Section */}
      <ProductEditorialSections pageKey={PRODUCT_GALLERY_PAGE_KEY} />


      {/* Product Features - Dark Glassmorphism Cards */}


      {/* Contact CTA */}


      {/* YouTube Videos Section */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Galerisi</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">
              Ürün Tanıtım Videoları
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="group"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            exit={{ opacity: 0 }}
          >
          <motion.div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            exit={{ opacity: 0, scale: 0.95 }}
          >
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative h-[80vh] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  {/* Title hidden for UI but kept for SEO */}
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      </ProductNavigationPilot>
      </main>
    </>
  )
}
