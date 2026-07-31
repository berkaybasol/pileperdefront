'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/screen-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Stor Perde', url: '/urunler/mekanizmali-perdeler/stor-perde' },
  { name: 'Screen Perde', url: '/urunler/mekanizmali-perdeler/stor-perde/screen-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/dc2a2786-1a14-4a03-9fff-e2ffc5820b46/file', alt: 'Screen perde modelleri', title: 'Screen Perde Modelleri' },
  { id: 2, src: '/api/public/media/images/2aebd723-c0a1-41d9-b5fc-c75834f1b8e1/file', alt: 'Stor perde Ankara', title: 'Stor Perde Ankara' },
  { id: 3, src: '/api/public/media/images/5370da64-6be5-4c5c-bbb8-bf8e430fe92c/file', alt: 'Desenli screen perde', title: 'Desenli Screen Perde' },
  { id: 4, src: '/api/public/media/images/bcc54456-ca7f-492e-abd2-e341c3089ebd/file', alt: 'Beyaz screen perde', title: 'Beyaz Screen Perde' },
  { id: 5, src: '/api/public/media/images/cedf065c-45cb-4cf9-89d8-be61cee4dd36/file', alt: 'Beyaz sun screen perde', title: 'Beyaz Sun Screen Perde' },
  { id: 6, src: '/api/public/media/images/5aa3b91f-8ba8-44db-87b0-cc482a84a05e/file', alt: 'Pile perde Ankara', title: 'Pile Perde Ankara' },
  { id: 7, src: '/api/public/media/images/86785b24-4a64-499d-bfc3-196857bb3f4b/file', alt: 'Salon stor tül fon', title: 'Salon Stor Tül Fon' },
  { id: 8, src: '/api/public/media/images/73fdce4f-2655-4e0d-ae06-51f054baddf6/file', alt: 'Modern screen perde', title: 'Modern Screen Perde' },
  { id: 9, src: '/api/public/media/images/db42a9bc-d2af-4f9f-9817-5341dea584be/file', alt: 'Makam odası perde', title: 'Makam Odası Perde' },
  { id: 10, src: '/api/public/media/images/13351f44-0cb6-44b0-84b9-20eca03ddadb/file', alt: 'Büro stor perde', title: 'Büro Stor Perde' },
  { id: 11, src: '/api/public/media/images/09fe73b0-65ab-4bbb-a8dc-2537c3c9e569/file', alt: 'Büro perde Ankara', title: 'Büro Perde Ankara' },
  { id: 12, src: '/api/public/media/images/6c50ccce-91e9-40f9-b0b4-805b3bb47834/file', alt: 'Ofis screen perde', title: 'Ofis Screen Perde' },
  { id: 13, src: '/api/public/media/images/eda90fa2-f352-4259-920d-a0a172333fd6/file', alt: 'Screen perde desenleri', title: 'Screen Perde Desenleri' },
  { id: 14, src: '/api/public/media/images/211bd722-fd8a-48f9-bbf7-fd31b5dffa15/file', alt: 'Mutfak screen stor', title: 'Mutfak Screen Stor' },
  { id: 15, src: '/api/public/media/images/8527a0c5-56ae-4f9a-8547-554ae1ad983a/file', alt: 'Duble stor perde', title: 'Duble Stor Perde' },
  { id: 16, src: '/api/public/media/images/d4bae03f-0f48-4ab9-855f-042825ceb61b/file', alt: 'Çift mekanizmalı stor', title: 'Çift Mekanizmalı Stor' },
  { id: 17, src: '/api/public/media/images/cb5d0f0c-d8a2-4c7e-a3ec-1926db9d2c44/file', alt: 'Büro perdeleri', title: 'Büro Perdeleri' },
  { id: 18, src: '/api/public/media/images/1539bb07-4fa0-4cae-b7d1-91d5ec848db9/file', alt: 'Sun screen stor perde', title: 'Sun Screen Stor Perde' },
  { id: 19, src: '/api/public/media/images/7be61591-d8a0-422e-b07a-5c04f4735ed2/file', alt: 'Kahve screen stor perde', title: 'Kahve Screen Stor Perde' },
  { id: 20, src: '/api/public/media/images/6e7b63fb-7f0e-438c-bb47-c8b67e96d436/file', alt: 'Screen perde', title: 'Screen Perde' },
  { id: 21, src: '/api/public/media/images/08fd204d-0a47-4180-9e4b-6e8f419efd91/file', alt: 'Krem screen stor perde', title: 'Krem Screen Stor Perde' },
  { id: 22, src: '/api/public/media/images/76ff9c36-1e89-4faf-a7dc-5fc7f6264e33/file', alt: 'Krem sun screen stor perde', title: 'Krem Sun Screen Stor Perde' },
  { id: 23, src: '/api/public/media/images/43f40c7d-723e-4d22-8d36-d547d4a13039/file', alt: 'Screen stor perde ofis', title: 'Screen Stor Perde Ofis' },
  { id: 24, src: '/api/public/media/images/d0de17e0-5f61-449d-98bc-80cad6465a3a/file', alt: 'Gri screen stor', title: 'Gri Screen Stor' },
  { id: 25, src: '/api/public/media/images/473932ea-48a5-4bc5-b68b-dcb439b21985/file', alt: 'Gri screen stor perde', title: 'Gri Screen Stor Perde' },
  { id: 26, src: '/api/public/media/images/8752157d-221d-4a54-bd89-842c6d7fd7dd/file', alt: 'Screen stor perde', title: 'Screen Stor Perde' },
  { id: 27, src: '/api/public/media/images/85f280c7-9d52-4ce4-873c-76655a0fb47e/file', alt: 'Sun screen perde Ankara', title: 'Sun Screen Perde Ankara' },
  { id: 28, src: '/api/public/media/images/cdd99362-2f2e-4bf3-836e-16a2c5347e50/file', alt: 'Gri screen stor model', title: 'Gri Screen Stor Model' },
  { id: 29, src: '/api/public/media/images/592e43d7-6620-47a6-89dc-4cd2398e155f/file', alt: 'Krem sun screen perde', title: 'Krem Sun Screen Perde' },
  { id: 30, src: '/api/public/media/images/694c8435-99b8-471e-988f-229ee5e482db/file', alt: 'Sun screen sayfa resmi', title: 'Sun Screen Sayfa Resmi' },
  { id: 31, src: '/api/public/media/images/b05682a3-894b-48d1-9c2e-6426e9ff0193/file', alt: 'Beyaz sun screen perde model', title: 'Beyaz Sun Screen Perde Model' },
  { id: 32, src: '/api/public/media/images/2a599b6c-553c-43a8-91dc-7bb5ddcc3893/file', alt: 'Sun screen perde görsel', title: 'Sun Screen Perde Görsel' },
  { id: 33, src: '/api/public/media/images/faedbbd7-df68-446e-ac8c-29b3b15e7c75/file', alt: 'PES screen perde', title: 'PES Screen Perde' },
  { id: 34, src: '/api/public/media/images/6e5c0949-ce5c-4c80-a59c-7ab427f6a7d6/file', alt: 'Screen perde detay', title: 'Screen Perde Detay' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-screen-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Screen Perde",
  eyebrow: "Stor Perde Koleksiyonu",
  title: "Screen",
  highlightedTitle: "Perde",
  description: "Sun Screen Stor Perde iki farklı kumaş türünden üretilmektedir. Birinci kumaş türü cam elyaf üzerine PVC kaplamadır. İkinci kumaş türü ise PES screen stor perdedir ve Polyester kumaşlardan üretilir.",
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

export default function ScreenPerdePage() {
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
            fallbackTitle="Screen Perde Modelleri"
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


      {/* YouTube Video Section - Motorlu Screen Perde */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div
            className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Anlatım</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">
                Motorlu Screen Perde
              </h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">
                Stor perdelerde tercih edilen motorlu mekanizmalar nasıl çalışır?
              </p>
            </div>

            {/* YouTube Video Embed */}
            <div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10"
              style={{ paddingBottom: '56.25%' }} // 16:9 Aspect Ratio}}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/W8rh9V6R7Cw"
                title="Motorlu Screen Perde"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
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
