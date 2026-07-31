'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/plise-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Plise Perde', url: '/urunler/mekanizmali-perdeler/plise-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/bf718b82-6626-4ffd-b4c5-109b496c9c34/file', alt: 'Plise Perde - Çatı Penceresi', title: 'Plise Perde - Çatı Penceresi' },
  { id: 2, src: '/api/public/media/images/c68277fa-be92-47dd-bd0e-2af35813ab2c/file', alt: 'Plise Perde - Tavan Sistemi', title: 'Plise Perde - Tavan Sistemi' },
  { id: 3, src: '/api/public/media/images/62aa55ea-b44c-44ee-a09e-3da39c3676b9/file', alt: 'Plise Perde - Eğik Pencere', title: 'Plise Perde - Eğik Pencere' },
  { id: 4, src: '/api/public/media/images/0650099d-5a67-45a2-8e5a-f0a8dfa86050/file', alt: 'Plise Perde - Kış Bahçesi', title: 'Plise Perde - Kış Bahçesi' },
  { id: 5, src: '/api/public/media/images/840628fc-aee7-4b32-ad94-0a9fef158451/file', alt: 'Plise Perde - Tavan Uygulaması', title: 'Plise Perde - Tavan Uygulaması' },
  { id: 6, src: '/api/public/media/images/7b6fea88-38cc-4a54-963e-4c53f574cf03/file', alt: 'Plise Perde - Çatı Uygulaması', title: 'Plise Perde - Çatı Uygulaması' },
  { id: 7, src: '/api/public/media/images/adee2e83-7f4a-497c-a2e9-a974f9e564c1/file', alt: 'Plise Perde - Modern Tasarım', title: 'Plise Perde - Modern Tasarım' },
  { id: 8, src: '/api/public/media/images/f0b8bd44-6257-4276-9a69-57209f2e6d07/file', alt: 'Plise Perde - Balkon', title: 'Plise Perde - Balkon' },
  { id: 9, src: '/api/public/media/images/d43b715f-ddbd-45e5-b882-d09ff455ea22/file', alt: 'Plise Perde - Renkli Model', title: 'Plise Perde - Renkli Model' },
  { id: 10, src: '/api/public/media/images/ab18bdff-a013-4a6c-bb7c-bc1c66f39a6e/file', alt: 'Plise Perde - Tül', title: 'Plise Perde - Tül' },
  { id: 11, src: '/api/public/media/images/4aa7113f-e519-4aaa-9095-34e92e061be8/file', alt: 'Plise Perde - Dekoratif', title: 'Plise Perde - Dekoratif' },
  { id: 12, src: '/api/public/media/images/bc65329c-a20f-4d5f-9802-58f04e37e17b/file', alt: 'Plise Perde - Şık Tasarım', title: 'Plise Perde - Şık Tasarım' },
  { id: 13, src: '/api/public/media/images/d0666842-8cf7-482b-b1f4-b5743d1de30b/file', alt: 'Plise Perde - Çatı Çözümü', title: 'Plise Perde - Çatı Çözümü' },
  { id: 14, src: '/api/public/media/images/8e07047a-5be0-4691-b0ec-c73666199162/file', alt: 'Plise Perde - Eğik Sistem', title: 'Plise Perde - Eğik Sistem' },
  { id: 15, src: '/api/public/media/images/2373eac3-b67b-45ce-9f56-cfb01b1ad4ee/file', alt: 'Plise Perde - Tavan Modeli', title: 'Plise Perde - Tavan Modeli' },
  { id: 16, src: '/api/public/media/images/1ea061a4-cd29-4ca6-acfd-7a791d7b465f/file', alt: 'Plise Perde - Modern', title: 'Plise Perde - Modern' },
  { id: 17, src: '/api/public/media/images/7fc2b58f-367d-492f-a818-66cf5d444a9e/file', alt: 'Plise Perde - Zarif', title: 'Plise Perde - Zarif' },
  { id: 18, src: '/api/public/media/images/d6addf45-de0b-459a-8a0a-a894b782e4f4/file', alt: 'Plise Perde - Şık', title: 'Plise Perde - Şık' },
  { id: 19, src: '/api/public/media/images/4f529daf-ab76-4510-9fe0-92621529cc80/file', alt: 'Plise Perde - Beyaz', title: 'Plise Perde - Beyaz' },
  { id: 20, src: '/api/public/media/images/fd51e3c0-bc32-4ae1-9293-4fb147993b6a/file', alt: 'Plise Perde - Gri', title: 'Plise Perde - Gri' },
  { id: 21, src: '/api/public/media/images/c266ffd6-323d-43fa-8ebb-1da89f81eb78/file', alt: 'Plise Perde - Krem', title: 'Plise Perde - Krem' },
  { id: 22, src: '/api/public/media/images/539956ec-5039-4a38-a6a3-1f8a81e0de6a/file', alt: 'Plise Perde - Renkli', title: 'Plise Perde - Renkli' },
  { id: 23, src: '/api/public/media/images/38db9960-a424-4561-9e51-752b4260ff25/file', alt: 'Plise Perde - Çatı Pencere', title: 'Plise Perde - Çatı Pencere' },
  { id: 24, src: '/api/public/media/images/2095ca61-84b6-4e43-ade1-3ae0771510f9/file', alt: 'Plise Perde - Eğik', title: 'Plise Perde - Eğik' },
  { id: 25, src: '/api/public/media/images/7ecddddd-db11-4bc0-8b12-33a6a2a34212/file', alt: 'Plise Perde - Tavan', title: 'Plise Perde - Tavan' },
  { id: 26, src: '/api/public/media/images/845be148-bea5-4bb7-b4f8-1e4e9ca197ef/file', alt: 'Plise Perde - Balkon Sistemi', title: 'Plise Perde - Balkon Sistemi' },
  { id: 27, src: '/api/public/media/images/18e285ca-900a-4dd0-94b2-4b2b825c2748/file', alt: 'Plise Perde - Kış Bahçe', title: 'Plise Perde - Kış Bahçe' },
  { id: 28, src: '/api/public/media/images/6a990425-fd3c-4784-a98e-e9daa7457943/file', alt: 'Plise Perde - Özel Tasarım', title: 'Plise Perde - Özel Tasarım' },
  { id: 29, src: '/api/public/media/images/219f42d9-0f1b-4980-ab42-3f72b47b3080/file', alt: 'Plise Perde - Dekoratif Model', title: 'Plise Perde - Dekoratif Model' },
  { id: 30, src: '/api/public/media/images/3a44cf0a-8088-4cec-ba6a-696605ae1883/file', alt: 'Plise Perde - Şık Model', title: 'Plise Perde - Şık Model' },
  { id: 31, src: '/api/public/media/images/9658f784-fed6-46d6-a3d1-a4447c169a39/file', alt: 'Plise Perde - Modern Model', title: 'Plise Perde - Modern Model' },
  { id: 32, src: '/api/public/media/images/a9e7a9f6-2bd1-4cb7-8fb2-1ab1cec2cf3a/file', alt: 'Plise Perde - Zarif Model', title: 'Plise Perde - Zarif Model' },
  { id: 33, src: '/api/public/media/images/ef2587f3-e144-48b0-b4c3-53110d317c93/file', alt: 'Plise Perde - Beyaz Model', title: 'Plise Perde - Beyaz Model' },
  { id: 34, src: '/api/public/media/images/c76d4bd1-b15d-410d-a8b7-6023eca31648/file', alt: 'Plise Perde - Gri Model', title: 'Plise Perde - Gri Model' },
  { id: 35, src: '/api/public/media/images/4ef205a5-8957-43a4-a4e1-3581370656b5/file', alt: 'Plise Perde - Krem Model', title: 'Plise Perde - Krem Model' },
  { id: 36, src: '/api/public/media/images/0a6f12c1-8d62-421d-bd89-d3f048f91583/file', alt: 'Plise Perde - Renkli Model', title: 'Plise Perde - Renkli Model' },
  { id: 37, src: '/api/public/media/images/30f52e85-4f4d-40e2-bd60-c8ed813c0f28/file', alt: 'Plise Perde - Çatı Model', title: 'Plise Perde - Çatı Model' },
  { id: 38, src: '/api/public/media/images/ed5a699d-1f14-4ec6-aac1-34ad8bda913d/file', alt: 'Plise Perde - Eğik Model', title: 'Plise Perde - Eğik Model' },
  { id: 39, src: '/api/public/media/images/c42c680b-1eb5-4a47-ad76-9db43a81ebbc/file', alt: 'Plise Perde - Tavan Model', title: 'Plise Perde - Tavan Model' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-plise-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Plise Perde",
  eyebrow: "Plise Perde Koleksiyonu",
  title: "Plise",
  highlightedTitle: "Perde",
  description: "Plise perde özel olarak tasarlanmış olup, çatı, tavan ve eğik pencerelerde kullanılır. İster yukardan aşağı, ister aşağıdan yukarı, isterseniz her iki yönden de açabilirsiniz. Bu haliyle çatı ve tavanlarınızda gün ışığından en üst düzeyde faydalanmanızı sağlar.",
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

export default function PlisePerdePage() {
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
            fallbackTitle="Plise Perde Modelleri"
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
