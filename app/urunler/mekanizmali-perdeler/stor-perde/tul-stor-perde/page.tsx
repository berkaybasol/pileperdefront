'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Stor Perde', url: '/urunler/mekanizmali-perdeler/stor-perde' },
  { name: 'Tül Stor Perde', url: '/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/f7e4e8a9-159e-40ab-a96d-11c0ffbc9119/file', alt: 'Çalışma odası perde', title: 'Çalışma Odası Perde' },
  { id: 2, src: '/api/public/media/images/323dc45f-74b1-4318-ad3b-a3a30878134d/file', alt: 'Tül stor perde', title: 'Tül Stor Perde' },
  { id: 3, src: '/api/public/media/images/1a9d54d5-4aeb-49a7-babc-5a711ee4cafb/file', alt: 'Kanepe tül stor', title: 'Kanepe Tül Stor' },
  { id: 4, src: '/api/public/media/images/d01bdd17-10bd-4fa3-bd05-af2c5df8eb80/file', alt: 'Salon tül stor', title: 'Salon Tül Stor' },
  { id: 5, src: '/api/public/media/images/6561542d-a695-4a7e-8ea1-660fd6b81a32/file', alt: 'Tül stor yakın', title: 'Tül Stor Yakın' },
  { id: 6, src: '/api/public/media/images/636d9dac-10bc-4cca-abf9-8dd1a1dada82/file', alt: 'Beyaz tül stor', title: 'Beyaz Tül Stor' },
  { id: 7, src: '/api/public/media/images/1ca7a7a2-92b0-44a2-a554-36e5386ba501/file', alt: 'Tül stor yemek odası', title: 'Tül Stor Yemek Odası' },
  { id: 8, src: '/api/public/media/images/57a3356a-436c-41e9-90d7-0ab49d31ac06/file', alt: 'Mutfak tül stor', title: 'Mutfak Tül Stor' },
  { id: 9, src: '/api/public/media/images/e3e4578b-d5cf-489d-b1cc-54fb6b481e7b/file', alt: 'Kumandalı ofis perde', title: 'Kumandalı Ofis Perde' },
  { id: 10, src: '/api/public/media/images/d284e146-e14c-4fc8-a3ff-9aa4063c5f52/file', alt: 'Motorlu perde', title: 'Motorlu Perde' },
  { id: 11, src: '/api/public/media/images/9ee28e4c-1d94-4c76-8c56-40b32119ca4a/file', alt: 'Ofis gri tül stor perde', title: 'Ofis Gri Tül Stor Perde' },
  { id: 12, src: '/api/public/media/images/33629c79-b72c-4a2e-9012-3c28a6a67d50/file', alt: 'Ofis perde', title: 'Ofis Perde' },
  { id: 13, src: '/api/public/media/images/baea04eb-f875-488b-afb9-71be481424a4/file', alt: 'Ofis perdesi', title: 'Ofis Perdesi' },
  { id: 14, src: '/api/public/media/images/858dcd5a-40d7-4168-9bfc-e985035fd213/file', alt: 'Ofis tül stor perde', title: 'Ofis Tül Stor Perde' },
  { id: 15, src: '/api/public/media/images/d3d2d8fd-b2f6-4840-a77c-ab02c2eca464/file', alt: 'Tül stor perde görsel', title: 'Tül Stor Perde Görsel' },
  { id: 16, src: '/api/public/media/images/1f7582c8-26df-48c2-bf4b-1b47212872ef/file', alt: 'Tül stor model', title: 'Tül Stor Model' },
  { id: 17, src: '/api/public/media/images/d835676c-9b4f-47c7-acdd-b3cc0ce5c2d7/file', alt: 'Siyah tül stor', title: 'Siyah Tül Stor' },
  { id: 18, src: '/api/public/media/images/6a6e59f8-cc2e-4f77-b1fa-a093f8b223d7/file', alt: 'Tekli tül stor perde Çayyolu', title: 'Tekli Tül Stor Perde Çayyolu' },
  { id: 19, src: '/api/public/media/images/85360f67-d05f-43d3-abce-e283e031f62d/file', alt: 'Tekli tül stor perde', title: 'Tekli Tül Stor Perde' },
  { id: 20, src: '/api/public/media/images/63980241-d76f-460d-8d6b-23e3b4ca7c01/file', alt: 'Tül stor Ankara', title: 'Tül Stor Ankara' },
  { id: 21, src: '/api/public/media/images/be317b2c-063c-46b5-b1a2-9755ceb8151d/file', alt: 'Tül stor perde kasetli', title: 'Tül Stor Perde Kasetli' },
  { id: 22, src: '/api/public/media/images/bfa4cb33-ebcb-47b2-9b5a-d885f71f116a/file', alt: 'Tül stor perde modeli', title: 'Tül Stor Perde Modeli' },
  { id: 23, src: '/api/public/media/images/46ea2021-09e3-4934-bf02-1bd8f6c221c4/file', alt: 'Tül stor perdeler', title: 'Tül Stor Perdeler' },
  { id: 24, src: '/api/public/media/images/403baa1b-69d4-4453-82d8-11c6ca7841aa/file', alt: 'Tül stor perde İncek', title: 'Tül Stor Perde İncek' },
  { id: 25, src: '/api/public/media/images/3ea7a2b0-f44a-4ca1-b5bf-02d13baba858/file', alt: 'Modern tül stor', title: 'Modern Tül Stor' },
  { id: 26, src: '/api/public/media/images/29993d43-2383-4c52-8cd4-f9826a9619ec/file', alt: 'Ev tül stor perde', title: 'Ev Tül Stor Perde' },
  { id: 27, src: '/api/public/media/images/3f61949a-5685-4eb5-b7e7-4840b017c268/file', alt: 'Tül stor perde sistemi', title: 'Tül Stor Perde Sistemi' },
  { id: 28, src: '/api/public/media/images/555e1e4a-2402-473d-9a30-bb118aa758de/file', alt: 'Tül stor perde detay', title: 'Tül Stor Perde Detay' },
  { id: 29, src: '/api/public/media/images/aeccb26a-f573-49ce-a946-432cb9eb42d1/file', alt: 'Transparan tül stor', title: 'Transparan Tül Stor' },
  { id: 30, src: '/api/public/media/images/e3ff3f5c-4ec2-470b-ac51-1e6c523f7e12/file', alt: 'Tül stor perde motorlu', title: 'Tül Stor Perde Motorlu' },
  { id: 31, src: '/api/public/media/images/617f8cde-6dd3-4371-b288-d750017f9b36/file', alt: 'Zarif tül stor perde', title: 'Zarif Tül Stor Perde' },
  { id: 32, src: '/api/public/media/images/6244428e-cc0d-49d6-a1a0-f90a0bf13a8b/file', alt: 'İkili tül stor perde', title: 'İkili Tül Stor Perde' },
  { id: 33, src: '/api/public/media/images/e24a94df-66b8-4d62-ad81-54107dfaaf55/file', alt: 'Mutfak tül stor perde', title: 'Mutfak Tül Stor Perde' },
  { id: 34, src: '/api/public/media/images/1755b92f-2a9f-4bc9-ab0f-d6ef40941b40/file', alt: 'Siyah tül stor perde', title: 'Siyah Tül Stor Perde' },
  { id: 35, src: '/api/public/media/images/5b725082-a2cd-4491-9bf1-6ed412bbafa0/file', alt: 'Kumandalı ofis perde sistemi', title: 'Kumandalı Ofis Perde Sistemi' },
  { id: 36, src: '/api/public/media/images/e9982ea8-c68e-4994-8314-645185a3adf6/file', alt: 'Motorlu perde sistemi', title: 'Motorlu Perde Sistemi' },
  { id: 37, src: '/api/public/media/images/8878f92b-415a-4b6f-891e-447175b4cb25/file', alt: 'Ofis gri tül stor', title: 'Ofis Gri Tül Stor' },
  { id: 38, src: '/api/public/media/images/a89c2311-94ef-42e2-ac1c-774a5e05dcc8/file', alt: 'Ofis perde modeli', title: 'Ofis Perde Modeli' },
  { id: 39, src: '/api/public/media/images/2f52fb99-551c-41a2-86b2-eedf6bca47a9/file', alt: 'Ofis perdesi model', title: 'Ofis Perdesi Model' },
  { id: 40, src: '/api/public/media/images/04d45119-35ba-422f-87fe-7f288356351e/file', alt: 'Ofis tül stor', title: 'Ofis Tül Stor' },
  { id: 41, src: '/api/public/media/images/3e65be10-7400-4de3-87c3-52f44229c3d4/file', alt: 'Tül stor perde uygulaması', title: 'Tül Stor Perde Uygulaması' },
  { id: 42, src: '/api/public/media/images/97e3928f-3142-4f6b-9033-c7b7d5ddd361/file', alt: 'Tül stor perde kasetli sistem', title: 'Tül Stor Perde Kasetli Sistem' },
  { id: 43, src: '/api/public/media/images/bb357b48-9e92-4774-9ce5-dde4e91f648c/file', alt: 'Çalışma oda stor perde', title: 'Çalışma Oda Stor Perde' },
  { id: 44, src: '/api/public/media/images/4b2c8ef3-6f1e-4e3b-ade7-8b5d6a126642/file', alt: 'Çalışma odası perde modeli', title: 'Çalışma Odası Perde Modeli' },
  { id: 45, src: '/api/public/media/images/fd900bd5-b60a-41e9-800c-f1de8117a724/file', alt: 'Krem tül stor perde', title: 'Krem Tül Stor Perde' },
  { id: 46, src: '/api/public/media/images/6354c397-ac85-4124-b915-f9596fba26e8/file', alt: 'Krem tül stor', title: 'Krem Tül Stor' },
  { id: 47, src: '/api/public/media/images/ba19f384-77b6-4b8f-9070-24f70844051f/file', alt: 'İkili tül stor', title: 'İkili Tül Stor' },
  { id: 48, src: '/api/public/media/images/72030cec-bcbd-4c43-a028-8ad9267e9f44/file', alt: 'Tül stor kasetli', title: 'Tül Stor Kasetli' },
  { id: 49, src: '/api/public/media/images/fe2d6ee9-6bd0-4cb2-8295-fbaefaee9867/file', alt: 'Şık tül stor perde', title: 'Şık Tül Stor Perde' },
  { id: 50, src: '/api/public/media/images/0dde938f-4dd0-4896-a5ae-9b34eba797e1/file', alt: 'Dekoratif tül stor', title: 'Dekoratif Tül Stor' },
  { id: 51, src: '/api/public/media/images/82a046bb-eab8-422a-84b5-c7fb6231f6d4/file', alt: 'İnce tül stor perde', title: 'İnce Tül Stor Perde' },
  { id: 52, src: '/api/public/media/images/844fa8b1-1cc0-4a72-a455-7012a8bc408d/file', alt: 'Şeffaf tül stor', title: 'Şeffaf Tül Stor' },
  { id: 53, src: '/api/public/media/images/77e8cd21-800e-475c-b21a-a325d51f3bb5/file', alt: 'Tül stor perde Ankara', title: 'Tül Stor Perde Ankara' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-stor-perde-tul-stor-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Tül Stor Perde",
  eyebrow: "Stor Perde Koleksiyonu",
  title: "Tül Stor",
  highlightedTitle: "Perde",
  description: "Tül Stor Perdeler, Pile Perde garantisiyle kanserojen madde içermeyen 1.sınıf kumaş ve malzemelerden üretilmektedir. Tül Stor Perde, transparan yapısıyla iç mekanlarınızda rahatça kullanabileceğiniz bir stor perde türüdür.",
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

export default function TulStorPerdePage() {
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
            fallbackTitle="Tül Stor Perde Modelleri"
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
