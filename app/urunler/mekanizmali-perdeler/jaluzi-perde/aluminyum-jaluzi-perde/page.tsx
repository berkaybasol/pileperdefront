'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Jaluzi Perde', url: '/urunler/mekanizmali-perdeler/jaluzi-perde' },
  { name: 'Alüminyum Jaluzi Perde', url: '/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/5b85af2f-2127-4028-9eab-cc9c75005ba4/file',
    alt: 'Beyaz Jaluzi',
    title: 'Beyaz Jaluzi'
  },
  {
    id: 2,
    src: '/api/public/media/images/0d18bbee-01cd-4305-816e-9126d75d6b87/file',
    alt: 'Beyaz metal jaluzi perde 25mm',
    title: 'Beyaz Metal Jaluzi Perde 25mm'
  },
  {
    id: 3,
    src: '/api/public/media/images/0dc02852-2307-474c-a35e-24cab557c1a7/file',
    alt: 'Beyaz metal jaluzi perde',
    title: 'Beyaz Metal Jaluzi Perde'
  },
  {
    id: 4,
    src: '/api/public/media/images/0eabd25f-a866-4b05-b6fa-c612a62cc696/file',
    alt: 'Metal jaluzi perde ankara',
    title: 'Metal Jaluzi Perde Ankara'
  },
  {
    id: 5,
    src: '/api/public/media/images/a9720970-cf60-490a-9bf6-d5f04e9ba909/file',
    alt: 'Kaliteli jaluzi perde',
    title: 'Kaliteli Jaluzi Perde'
  },
  {
    id: 6,
    src: '/api/public/media/images/7a6cdb97-7654-4391-8232-e45b1e031df3/file',
    alt: 'Alüminyum jaluzi perde ankara',
    title: 'Alüminyum Jaluzi Perde Ankara'
  },
  {
    id: 7,
    src: '/api/public/media/images/c651e834-92b6-4840-ae16-17997d67b1c5/file',
    alt: 'Jaluzi perde ankara',
    title: 'Jaluzi Perde Ankara'
  },
  {
    id: 8,
    src: '/api/public/media/images/db647e56-be4a-4ec5-a572-ae5398cf377a/file',
    alt: 'Metal jaluzi perde ankara',
    title: 'Metal Jaluzi Perde Ankara'
  },
  {
    id: 9,
    src: '/api/public/media/images/69d291e6-41d5-4b32-9106-ce9b4582419d/file',
    alt: 'Jaluzi perde üretici',
    title: 'Jaluzi Perde Üretici'
  },
  {
    id: 10,
    src: '/api/public/media/images/5f2e4c30-3b06-481c-8255-1f11ee87a642/file',
    alt: 'Jaluzi perde giyinme odası',
    title: 'Jaluzi Perde Giyinme Odası'
  },
  {
    id: 11,
    src: '/api/public/media/images/d2bcd9a1-b395-4875-bd7a-6b80371e9872/file',
    alt: 'Jaluzi perde imalatçı',
    title: 'Jaluzi Perde İmalatçı'
  },
  {
    id: 12,
    src: '/api/public/media/images/1d5259ad-015f-4a7f-b174-b33e82e07fe9/file',
    alt: 'Jaluzi perde banyo',
    title: 'Jaluzi Perde Banyo'
  },
  {
    id: 13,
    src: '/api/public/media/images/13c0ff69-464a-4a4d-bbb0-a84fb419f6e6/file',
    alt: 'Alüminyum jaluzi perde Ankara',
    title: 'Alüminyum Jaluzi Perde Ankara'
  },
  {
    id: 14,
    src: '/api/public/media/images/ce50b2ee-06a0-425c-9f0a-45dbcda354fd/file',
    alt: 'Alüminyum jaluzi perde Ankara ofis',
    title: 'Alüminyum Jaluzi Perde Ankara Ofis'
  },
  {
    id: 15,
    src: '/api/public/media/images/2478e6c2-68fd-4edc-abf0-8e69a2f8aae4/file',
    alt: 'Alüminyum jaluzi perde Ankara modern',
    title: 'Alüminyum Jaluzi Perde Ankara Modern'
  },
  {
    id: 16,
    src: '/api/public/media/images/e066470e-b60d-4536-a6ae-8ab926189cf6/file',
    alt: 'Alüminyum jaluzi perde Ankara beyaz',
    title: 'Alüminyum Jaluzi Perde Ankara Beyaz'
  },
  {
    id: 17,
    src: '/api/public/media/images/6ffc9b16-a06b-47ac-9e84-8bfaf64533bb/file',
    alt: 'Alüminyum jaluzi perde Ankara gri',
    title: 'Alüminyum Jaluzi Perde Ankara Gri'
  },
  {
    id: 18,
    src: '/api/public/media/images/824407b5-87ab-4c67-8ceb-045ba09004ee/file',
    alt: 'Alüminyum jaluzi perde banyo',
    title: 'Alüminyum Jaluzi Perde Banyo'
  },
  {
    id: 19,
    src: '/api/public/media/images/0a492def-de09-43f0-be58-0d7de64e122b/file',
    alt: 'Alüminyum jaluzi perde giyinme odası',
    title: 'Alüminyum Jaluzi Perde Giyinme Odası'
  },
  {
    id: 20,
    src: '/api/public/media/images/85114cfd-26cb-4b0e-be22-dd6a65336ff5/file',
    alt: 'Alüminyum jaluzi perde sistemi',
    title: 'Alüminyum Jaluzi Perde Sistemi'
  }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-aluminyum-jaluzi-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Alüminyum Jaluzi Perde",
  eyebrow: "Alüminyum Jaluzi Koleksiyonu",
  title: "Alüminyum",
  highlightedTitle: "Jaluzi Perde",
  description: "Alüminyum Jaluzi Perde, ince şerit bantlarından oluşan ve şeritlerin birbiriyle senkronize hareket etmesini sağlayan bir perde sistemidir. 16 mm, 25 mm ve 50 mm olarak üretilmektedir. Diğer Jaluzi sistemleri arasında en ekonomik olanıdır.",
}

export default function AluminyumJaluziPerdePage() {
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
    <main className="bg-black">
      <BreadcrumbListJsonLd items={breadcrumbItems} canonicalUrl={canonicalUrl} />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div
            className="text-center max-w-4xl mx-auto"
          >
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
            fallbackTitle="Alüminyum Jaluzi Modelleri"
            className="text-center mb-16"
            eyebrowClassName="text-sm text-gray-500 uppercase tracking-[0.3em]"
            eyebrowTitleSpacingClassName="mb-4"
            titleClassName="text-3xl md:text-4xl font-extralight text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group"
              >
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
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
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
  )
}
