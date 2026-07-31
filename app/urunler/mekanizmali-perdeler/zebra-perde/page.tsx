'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/zebra-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Zebra Perde', url: '/urunler/mekanizmali-perdeler/zebra-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/c4d60335-5722-40f0-92c7-24f193d8b287/file', alt: 'Banyo zebra perde', title: 'Banyo Zebra Perde' },
  { id: 2, src: '/api/public/media/images/b0fc4001-e056-48fe-a311-3cada55b3dce/file', alt: 'Zebra perde mutfak', title: 'Zebra Perde Mutfak' },
  { id: 3, src: '/api/public/media/images/c4acc29d-c4cf-49ac-93dd-f5ec43994747/file', alt: 'Zebra perde momentum', title: 'Zebra Perde Momentum' },
  { id: 4, src: '/api/public/media/images/07706ab4-be23-4b4d-b9ef-dd2f028b676a/file', alt: 'Momentum zebra perde', title: 'Momentum Zebra Perde' },
  { id: 5, src: '/api/public/media/images/e141276c-0f21-43ce-a624-7d93c067c29d/file', alt: 'Zebra perde fon kumaş', title: 'Zebra Perde Fon Kumaş' },
  { id: 6, src: '/api/public/media/images/28b63f54-b604-4f28-a3fc-80d98e8f72d9/file', alt: 'Momentum zebra perde model', title: 'Momentum Zebra Perde Model' },
  { id: 7, src: '/api/public/media/images/32670519-f88a-4abb-98b0-600f2d004cee/file', alt: 'Beyaz zebra perde', title: 'Beyaz Zebra Perde' },
  { id: 8, src: '/api/public/media/images/1bc551ad-f3c8-4016-8af1-363474b9e8a0/file', alt: 'Zebra perde modeli', title: 'Zebra Perde Modeli' },
  { id: 9, src: '/api/public/media/images/bb5e6c34-7252-4a63-a4f4-a7eb7df6010b/file', alt: 'Altın gümüş siyah zebra perde', title: 'Altın Gümüş Siyah Zebra Perde' },
  { id: 10, src: '/api/public/media/images/918050d6-43ab-4216-9672-28ba68a87659/file', alt: 'Kış bahçesi zebra', title: 'Kış Bahçesi Zebra' },
  { id: 11, src: '/api/public/media/images/52c54cae-e82c-4b6c-8858-72489f78ddd6/file', alt: 'Zebra geniş pileli', title: 'Zebra Geniş Pileli' },
  { id: 12, src: '/api/public/media/images/581e8722-e046-419b-b251-6a8642a9c148/file', alt: 'Geniş pileli zebra', title: 'Geniş Pileli Zebra' },
  { id: 13, src: '/api/public/media/images/2d97d88d-638f-4182-9689-b38e63955b56/file', alt: 'Balkon zebra perde', title: 'Balkon Zebra Perde' },
  { id: 14, src: '/api/public/media/images/2d03ca07-2a20-444c-afd1-c74f9ba0589e/file', alt: 'Zebra perde fonlu', title: 'Zebra Perde Fonlu' },
  { id: 15, src: '/api/public/media/images/d6f73025-2988-43fe-83aa-aaefe0c4754d/file', alt: 'Zebra perde kış bahçesi', title: 'Zebra Perde Kış Bahçesi' },
  { id: 16, src: '/api/public/media/images/c40695d0-7a5c-4059-9732-9dda5b6430c3/file', alt: 'Kış bahçesi zebra perde', title: 'Kış Bahçesi Zebra Perde' },
  { id: 17, src: '/api/public/media/images/c5c9ba8e-7556-4580-908a-d215e366ed98/file', alt: 'Bej pileli zebra perde', title: 'Bej Pileli Zebra Perde' },
  { id: 18, src: '/api/public/media/images/c65fbb65-a5b0-49fe-8e02-b38f02373572/file', alt: 'Bej zebra perde', title: 'Bej Zebra Perde' },
  { id: 19, src: '/api/public/media/images/fd2e3d7d-5047-4038-bc6b-2e2d5f93687f/file', alt: 'Krem zebra perde', title: 'Krem Zebra Perde' },
  { id: 20, src: '/api/public/media/images/6014195f-b5f3-4201-8d46-0b5034cbc9cf/file', alt: 'Bambu zebra perde', title: 'Bambu Zebra Perde' },
  { id: 21, src: '/api/public/media/images/d0835a31-825a-4a29-842d-7cd0df3b8cac/file', alt: 'Krem bambu perde', title: 'Krem Bambu Perde' },
  { id: 22, src: '/api/public/media/images/a9def4ba-7edf-4fe0-a2cf-ce6197362c90/file', alt: 'Zebra perde bambu', title: 'Zebra Perde Bambu' },
  { id: 23, src: '/api/public/media/images/5da0c75d-d8d0-4e4f-ad80-c806b50ac7fc/file', alt: 'Zebra perde', title: 'Zebra Perde' },
  { id: 24, src: '/api/public/media/images/51cc3c86-03f0-4168-a60f-b7834f2894a8/file', alt: 'Beyaz zebra perde model', title: 'Beyaz Zebra Perde Model' },
  { id: 25, src: '/api/public/media/images/ea8e2f1e-5cf3-4524-86b2-fa685d18f983/file', alt: 'Mutfak zebra perde', title: 'Mutfak Zebra Perde' },
  { id: 26, src: '/api/public/media/images/e5676285-22a2-431d-b344-0422577c2023/file', alt: 'Zebra stor perde mutfak', title: 'Zebra Stor Perde Mutfak' },
  { id: 27, src: '/api/public/media/images/45f6c7b4-e864-472a-b106-7256681ea9e6/file', alt: 'Zebra perde salon', title: 'Zebra Perde Salon' },
  { id: 28, src: '/api/public/media/images/20f1cb06-a28d-4043-9c64-2260af2b29e1/file', alt: 'Zebra perde yatak odası', title: 'Zebra Perde Yatak Odası' },
  { id: 29, src: '/api/public/media/images/437f3ac0-1745-4929-a77f-7347b812d249/file', alt: 'Zebra perde Ankara', title: 'Zebra Perde Ankara' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-zebra-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Zebra Perde",
  eyebrow: "Zebra Perde Koleksiyonu",
  title: "Zebra",
  highlightedTitle: "Perde",
  description: "Zebra perde akıllıca tasarlanmış stor perde türüdür. Yatay çizgili, sık dokunmuş kumaş ve tül şeritlerden oluşan mekanizma zinciri çekildiğinde, şeritlerin birbiriyle senkronize hareket etmesini sağlayan bir stor perde sistemidir.",
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

export default function ZebraPerdePage() {
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
            fallbackTitle="Zebra Perde Modelleri"
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
