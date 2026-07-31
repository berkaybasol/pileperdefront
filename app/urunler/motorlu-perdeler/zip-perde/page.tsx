'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import ManagedProductVideoGallery from '@/components/ManagedProductVideoGallery'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/motorlu-perdeler/zip-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Motorlu Perdeler', url: '/urunler/motorlu-perdeler' },
  { name: 'Zip Perde', url: '/urunler/motorlu-perdeler/zip-perde' },
]
import {
  defaultProductGalleryVideo,
  getPublicProductGallery,
  getPublicProductGalleryHeroCopy,
  getPublicProductGalleryVideo,
  getYouTubeEmbedUrl,
  type ProductGalleryImage,
  type ProductGalleryVideo,
} from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/41fdb3a5-0351-4c47-8342-d522b1dcf7b2/file', alt: 'Zip perde motoru', title: 'Zip Perde Motoru' },
  { id: 2, src: '/api/public/media/images/ee00a558-d569-4e4e-9984-8006cf85793c/file', alt: 'Dış mekan zip perde', title: 'Dış Mekan Zip Perde' },
  { id: 3, src: '/api/public/media/images/dc194721-9efa-4441-89f0-70a29e05c8fd/file', alt: 'Dış cephe stor perde', title: 'Dış Cephe Stor Perde' },
  { id: 4, src: '/api/public/media/images/7d46cedc-56dd-4dfb-8b7b-24cb9a8881b2/file', alt: 'Zip perde Ankara', title: 'Zip Perde Ankara' },
  { id: 5, src: '/api/public/media/images/ac6fe17a-cf67-414a-bd65-f25dd090fedd/file', alt: 'Zip perde motoru sistemi', title: 'Zip Perde Motoru Sistemi' },
  { id: 6, src: '/api/public/media/images/0903a86d-0c79-465c-8e99-eb277ab9d6ae/file', alt: 'Dış cephe zip perde', title: 'Dış Cephe Zip Perde' },
  { id: 7, src: '/api/public/media/images/514c032b-345d-4727-a835-f3049afe547d/file', alt: 'Zip perde imalatı', title: 'Zip Perde İmalatı' },
  { id: 8, src: '/api/public/media/images/840cbde5-088b-408f-8cb9-428a422fd181/file', alt: 'Zip perde sistemi', title: 'Zip Perde Sistemi' },
  { id: 9, src: '/api/public/media/images/a3501930-acd5-4d2c-8225-2b9fe4f1ea37/file', alt: 'Sun zip perdeler', title: 'Sun Zip Perdeler' },
  { id: 10, src: '/api/public/media/images/0df33fc3-7425-48b4-bbfd-08c36291cc13/file', alt: 'Zip perde modelleri', title: 'Zip Perde Modelleri' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-motorlu-perdeler-zip-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Zip Perde",
  eyebrow: "Fermuarlı Perde Sistemleri",
  title: "Zip",
  highlightedTitle: "Perde",
  description: "Fermuarlı zip perde sistemleri ile dış mekan alanlarınızda maksimum koruma. Yan raylarda kilitli kumaş sistemi sayesinde rüzgar, yağmur ve güneşe karşı üstün performans sunan motorlu perde çözümleri.",
}

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

export default function ProksiyonPerdePage() {
  const [galleryImages, setGalleryImages] = useState<ProductGalleryImage[]>(productImages)
  const [selectedImage, setSelectedImage] = useState<ProductGalleryImage | null>(productImages[0] || null)
  const initialContentJson = useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery')
  const initialHeroCopy = parseProductGalleryHeroCopy(
    initialContentJson,
    defaultHeroCopy,
  )
  const [heroCopy, setHeroCopy] = useState(initialHeroCopy)
  const [productVideo, setProductVideo] = useState<ProductGalleryVideo>(defaultProductGalleryVideo)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fallbackVideo = {
      title: 'Nasıl Çalışır?',
      description: 'Zip perde sisteminin çalışma prensibini ve kullanım detaylarını videomuzda izleyebilirsiniz.',
      youtubeUrl: '',
      enabled: false,
    }

    getPublicProductGallery(PRODUCT_GALLERY_PAGE_KEY, productImages, true).then((images) => {
      if (isMounted) {
        setGalleryImages(images)
        setSelectedImage((current) => (
          images.find((image) => image.id === current?.id) || images[0] || null
        ))
      }
    })

    getPublicProductGalleryHeroCopy(PRODUCT_GALLERY_PAGE_KEY, defaultHeroCopy).then((copy) => {
      if (!isMounted) {
        return
      }

      setHeroCopy(copy)
    })

    getPublicProductGalleryVideo(PRODUCT_GALLERY_PAGE_KEY, fallbackVideo).then((video) => {
      if (!isMounted) {
        return
      }

      setProductVideo(video)
    })

    return () => {
      isMounted = false
    }
  }, [])
  
  // Lightbox navigation functions
  const currentImageIndex = selectedImage
    ? galleryImages.findIndex(img => img.id === selectedImage.id)
    : -1
  const videoEmbedUrl = getYouTubeEmbedUrl(productVideo.youtubeUrl)

  const goToPrevious = () => {
    if (galleryImages.length === 0) return
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
    setSelectedImage(galleryImages[prevIndex])
  }

  const goToNext = () => {
    if (galleryImages.length === 0) return
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

      <ManagedProductVideoGallery
        pageKey={PRODUCT_GALLERY_PAGE_KEY}
        initialContentJson={initialContentJson}
      />

      {/* Full Product Gallery - Dark Glassmorphism Grid */}
      {galleryImages.length > 0 && <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Zip Perde Modelleri"
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
      </section>}

      {/* Compact Product Info Section */}
      <ProductEditorialSections pageKey={PRODUCT_GALLERY_PAGE_KEY} />


      {/* Product Features - Dark Glassmorphism Cards */}


      {/* Contact CTA */}


      {productVideo.enabled !== false && videoEmbedUrl && (
        <section className="relative py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Anlatım</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-6">
                {productVideo.title}
              </h2>
              {productVideo.description && (
                <p className="text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                  {productVideo.description}
                </p>
              )}
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 shadow-2xl">
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          <motion.div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
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
