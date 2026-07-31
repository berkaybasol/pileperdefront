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

const canonicalUrl = 'https://pileperde.com.tr/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Mekanizmalı Perdeler', url: '/urunler/mekanizmali-perdeler' },
  { name: 'Jaluzi Perde', url: '/urunler/mekanizmali-perdeler/jaluzi-perde' },
  { name: 'Ahşap Jaluzi Perde', url: '/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde' },
]
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  {
    id: 1,
    src: '/api/public/media/images/e1446473-f10c-449c-8e90-98f44fa11966/file',
    alt: 'Ceviz renk ahşap jaluzi perde',
    title: 'Ceviz Renk Ahşap Jaluzi Perde'
  },
  {
    id: 2,
    src: '/api/public/media/images/d42b9d4a-80bc-42e6-a100-649431cd2862/file',
    alt: 'Beyaz ahşap jaluzi perde',
    title: 'Beyaz Ahşap Jaluzi Perde'
  },
  {
    id: 3,
    src: '/api/public/media/images/088dbb11-2a93-4ef7-8a32-cf61c880b00b/file',
    alt: 'Ahşap jaluzi perde 50mm',
    title: 'Ahşap Jaluzi Perde 50mm'
  },
  {
    id: 4,
    src: '/api/public/media/images/2da07056-eac2-4419-8361-942de39ec457/file',
    alt: 'Ahşap jaluzi perde',
    title: 'Ahşap Jaluzi Perde'
  },
  {
    id: 5,
    src: '/api/public/media/images/c033ef94-6cba-43b4-8364-b73aef8883e3/file',
    alt: 'Mutfak ahşap jaluzi perde',
    title: 'Mutfak Ahşap Jaluzi Perde'
  },
  {
    id: 6,
    src: '/api/public/media/images/0b7a06c5-5964-4449-948a-967fbf9bd3cb/file',
    alt: 'Amerikan ahşap jaluzi',
    title: 'Amerikan Ahşap Jaluzi'
  },
  {
    id: 7,
    src: '/api/public/media/images/1fc3f30d-440c-4151-b6c1-9c649792d001/file',
    alt: 'Antrasit ahşap jaluzi',
    title: 'Antrasit Ahşap Jaluzi'
  },
  {
    id: 8,
    src: '/api/public/media/images/c928eb26-72df-454b-82cf-0778387db499/file',
    alt: 'Beyaz ahşap jaluzi',
    title: 'Beyaz Ahşap Jaluzi'
  },
  {
    id: 9,
    src: '/api/public/media/images/e7033a2b-8d20-4a88-800c-f77e6c645ffa/file',
    alt: 'Beyaz ahşap jaluzi perde modeli',
    title: 'Beyaz Ahşap Jaluzi Perde Modeli'
  },
  {
    id: 10,
    src: '/api/public/media/images/b9849236-6dda-4246-8b25-71f181815bed/file',
    alt: 'Ceviz renk ahşap jaluzi perde',
    title: 'Ceviz Renk Ahşap Jaluzi Perde'
  },
  {
    id: 11,
    src: '/api/public/media/images/69c969f9-3809-4379-bf3f-b1a1102e9f8b/file',
    alt: 'Ceviz ahşap jaluzi',
    title: 'Ceviz Ahşap Jaluzi'
  },
  {
    id: 12,
    src: '/api/public/media/images/1a373b26-4ffd-4f0a-a5a3-97dfb939ffa4/file',
    alt: 'Ceviz jaluzi perde',
    title: 'Ceviz Jaluzi Perde'
  },
  {
    id: 13,
    src: '/api/public/media/images/94af03a1-87c8-4586-a19f-bf88dfa48297/file',
    alt: 'Kumandalı jaluzi perde',
    title: 'Kumandalı Jaluzi Perde'
  },
  {
    id: 14,
    src: '/api/public/media/images/373a5ce4-d604-4929-94d6-afd712c5e055/file',
    alt: 'Motorlu jaluzi perde',
    title: 'Motorlu Jaluzi Perde'
  },
  {
    id: 15,
    src: '/api/public/media/images/cb90f973-70ed-4104-b434-b0fc833cdb21/file',
    alt: 'Uzaktan kumandalı perde',
    title: 'Uzaktan Kumandalı Perde'
  },
  {
    id: 16,
    src: '/api/public/media/images/1e636166-fc16-4bba-b3c1-a3e3c51e2db7/file',
    alt: 'Ahşap jaluzi perde 50mm model',
    title: 'Ahşap Jaluzi Perde 50mm Model'
  },
  {
    id: 17,
    src: '/api/public/media/images/56859958-4df0-4c08-9b68-c44794452287/file',
    alt: 'Ahşap jaluzi perde çeşitleri',
    title: 'Ahşap Jaluzi Perde Çeşitleri'
  },
  {
    id: 18,
    src: '/api/public/media/images/329dc922-99f8-4d0e-9a32-fb24e28952b2/file',
    alt: 'Ahşap jaluzi fon perde',
    title: 'Ahşap Jaluzi Fon Perde'
  },
  {
    id: 19,
    src: '/api/public/media/images/015224a3-defa-435d-8215-f5dd590bfe9a/file',
    alt: 'Ofis ahşap jaluzi perde',
    title: 'Ofis Ahşap Jaluzi Perde'
  },
  {
    id: 20,
    src: '/api/public/media/images/e75058ae-c5dd-469b-ae33-615819da348d/file',
    alt: 'Yatak odası ahşap jaluzi',
    title: 'Yatak Odası Ahşap Jaluzi'
  },
  {
    id: 21,
    src: '/api/public/media/images/0baca4e2-0e0c-494c-87cb-d916e341445f/file',
    alt: 'Ahşap jaluzi perde Ankara Ostim',
    title: 'Ahşap Jaluzi Perde Ankara Ostim'
  },
  {
    id: 22,
    src: '/api/public/media/images/7361778d-4c6a-4def-9c25-262e002052a2/file',
    alt: 'Ahşap jaluzi perde Ankara',
    title: 'Ahşap Jaluzi Perde Ankara'
  },
  {
    id: 23,
    src: '/api/public/media/images/c0bc71e8-4146-4900-a1fb-bb3d700f2b01/file',
    alt: 'Beyaz ahşap jaluzi perde model',
    title: 'Beyaz Ahşap Jaluzi Perde Model'
  },
  {
    id: 24,
    src: '/api/public/media/images/ff74ace2-41f9-4db7-8286-7e241e310487/file',
    alt: 'Ahşap jaluzi perde Bilkent',
    title: 'Ahşap Jaluzi Perde Bilkent'
  },
  {
    id: 25,
    src: '/api/public/media/images/90578183-9141-4373-a0c8-92c08edda8ad/file',
    alt: 'Ahşap jaluzi perde Çayyolu',
    title: 'Ahşap Jaluzi Perde Çayyolu'
  },
  {
    id: 26,
    src: '/api/public/media/images/5d81a5f6-5b2a-42d5-8059-26c2c4f1a010/file',
    alt: 'Çocuk odası ahşap jaluzi',
    title: 'Çocuk Odası Ahşap Jaluzi'
  },
  {
    id: 27,
    src: '/api/public/media/images/95a1c095-280e-4cdf-bcf7-d6d8e9010e95/file',
    alt: 'Ahşap jaluzi sistemi',
    title: 'Ahşap Jaluzi Sistemi'
  },
  {
    id: 28,
    src: '/api/public/media/images/216b6572-0571-4d09-b2c9-c8b0efc1e0ef/file',
    alt: 'Ahşap jaluzi perde model',
    title: 'Ahşap Jaluzi Perde Model'
  },
  {
    id: 29,
    src: '/api/public/media/images/484a9a1e-7621-4287-b402-3eb89248c26b/file',
    alt: 'Motorlu ahşap jaluzi perde',
    title: 'Motorlu Ahşap Jaluzi Perde'
  },
  {
    id: 30,
    src: '/api/public/media/images/17123504-b7e2-4290-83b9-35143c4433b6/file',
    alt: 'Ahşap jaluzi ofis Ankara',
    title: 'Ahşap Jaluzi Ofis Ankara'
  },
  {
    id: 31,
    src: '/api/public/media/images/c222a99d-5cbe-40ca-859b-7c2af284b947/file',
    alt: 'Ofis ahşap jaluzi model',
    title: 'Ofis Ahşap Jaluzi Model'
  },
  {
    id: 32,
    src: '/api/public/media/images/3ba1c693-4373-4de4-ad1e-c271a986d31a/file',
    alt: 'Ahşap jaluzi ölçüleri',
    title: 'Ahşap Jaluzi Ölçüleri'
  },
  {
    id: 33,
    src: '/api/public/media/images/df724c77-e492-4eb0-931f-626d5abc36d8/file',
    alt: 'Ahşap jaluzi perde Ankara model',
    title: 'Ahşap Jaluzi Perde Ankara Model'
  },
  {
    id: 34,
    src: '/api/public/media/images/e86de83d-c262-40dc-81b0-551a8d97428a/file',
    alt: 'Ahşap jaluzi perde Ümitköy',
    title: 'Ahşap Jaluzi Perde Ümitköy'
  },
  {
    id: 35,
    src: '/api/public/media/images/08010395-5e7a-4f60-94c0-50fcebd87887/file',
    alt: 'Ahşap jaluzi üreticiler',
    title: 'Ahşap Jaluzi Üreticiler'
  },
  {
    id: 36,
    src: '/api/public/media/images/c0454896-212f-4fde-a6e0-aa2585cc2a65/file',
    alt: 'Ahşap jaluzi perde Yaşamkent',
    title: 'Ahşap Jaluzi Perde Yaşamkent'
  },
  {
    id: 36,
    src: '/api/public/media/images/a8dc4b7a-d96c-4b98-be61-04eb9f00c660/file',
    alt: 'Ahşap jaluzi yorumlar',
    title: 'Ahşap Jaluzi Yorumlar'
  }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-mekanizmali-perdeler-jaluzi-perde-ahsap-jaluzi-perde'

const defaultHeroCopy = {
  breadcrumbLabel: "Ahşap Jaluzi Perde",
  eyebrow: "Ahşap Jaluzi Koleksiyonu",
  title: "Ahşap",
  highlightedTitle: "Jaluzi Perde",
  description: "Ahşap Jaluzi Perde, ince şerit bantlarından oluşan ve şeritlerin birbiriyle senkronize hareket etmesini sağlayan bir perde sistemidir. 25 mm, 35 mm, 50 mm ve 63 mm olarak üretilmektedir. 60 adet değişik renk ve dokuda geniş ürün yelpazesine sahiptir.",
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
            fallbackTitle="Ahşap Jaluzi Modelleri"
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


      {/* YouTube Video Section - How It Works */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Anlatım</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">
                Ahşap jaluzi perde sistemimizin çalışma prensibini ve montaj detaylarını videomuzda izleyebilirsiniz.
              </p>
            </div>

            {/* YouTube Video Embed */}
            <div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10"
              style={{ paddingBottom: '56.25%' }} // 16:9 Aspect Ratio
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/VTjS0mSOoQ8"
                title="Ahşap Jaluzi Perde - Nasıl Çalışır?"
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
