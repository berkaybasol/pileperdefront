'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import ProductContactCta from '@/components/ProductContactCta'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy, parseProductGalleryImages } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import styles from './page.module.css'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-balon-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/balon-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Balon Perde', url: '/model-perdeler/balon-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/0d960ab5-7767-41f7-86e2-674315fa8cfd/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 1' },
  { id: 2, src: '/api/public/media/images/db1df766-470c-4606-943b-4a42b862c0e8/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 2' },
  { id: 3, src: '/api/public/media/images/6d75c47d-35df-4afe-a8ec-d6a6e635ca85/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 3' },
  { id: 4, src: '/api/public/media/images/afa9b71d-da9d-471d-a414-e8fd83c215bd/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 4' },
  { id: 5, src: '/api/public/media/images/9c35f249-f5d1-451d-a67a-89cbe8388fde/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 5' },
  { id: 6, src: '/api/public/media/images/f57ba073-b2a9-4ce1-98b1-2d1c3c3fe832/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 6' },
  { id: 7, src: '/api/public/media/images/03bd6509-2674-4c1a-81bc-014d86687bab/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 7' },
  { id: 8, src: '/api/public/media/images/52bed66c-846f-4607-8d46-d92f510ad49d/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 8' },
  { id: 9, src: '/api/public/media/images/917becbd-5f35-467d-bdc7-e764fb44956c/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 9' },
  { id: 10, src: '/api/public/media/images/55eee81f-6743-4501-b734-0aed13b80e15/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 10' },
  { id: 11, src: '/api/public/media/images/a044fc78-10be-4868-ad48-ddc7c140df2b/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 11' },
  { id: 12, src: '/api/public/media/images/26d8bfdf-4b8e-494f-a0c5-5d9694be3989/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 12' },
  { id: 13, src: '/api/public/media/images/56228863-f0ec-4668-9a8c-1f3628100d75/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 13' },
  { id: 14, src: '/api/public/media/images/1ea63f2e-729a-425b-a023-0948f3ad5a3b/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 14' },
  { id: 15, src: '/api/public/media/images/29f64c36-0eb2-43a6-a6d3-da2903b6948f/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 15' },
  { id: 16, src: '/api/public/media/images/b7f089c2-756f-4cfa-a628-a414e83c6781/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 16' },
  { id: 17, src: '/api/public/media/images/4cf63c24-b8d7-4e83-a366-c9c84a6667b9/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 17' },
  { id: 18, src: '/api/public/media/images/334714b1-2710-417d-844f-82d8ba2c45ce/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 18' },
  { id: 19, src: '/api/public/media/images/510a563f-71dd-439d-8f70-94215be8b42c/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 19' },
  { id: 20, src: '/api/public/media/images/d6267bd5-75df-4efc-8384-d216d6653bcd/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 20' },
  { id: 21, src: '/api/public/media/images/e13e1c01-d18d-4552-a506-5dde7b25c51f/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 21' },
  { id: 22, src: '/api/public/media/images/ce1388d3-3ba5-49c5-9c92-fb87930becc6/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 22' },
  { id: 23, src: '/api/public/media/images/c14d8ac9-d002-49d4-a3a5-3041385b55c7/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 23' },
  { id: 24, src: '/api/public/media/images/3be21a4c-1940-4c09-926f-77102b4c57f6/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 24' },
  { id: 25, src: '/api/public/media/images/cfe87cd3-75b7-45a1-b949-e572d38b4d73/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 25' },
  { id: 26, src: '/api/public/media/images/a48a3b4f-9767-4b8a-957e-3cb78546f9f0/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 26' },
  { id: 27, src: '/api/public/media/images/45970ba1-cb7f-4a28-a54c-73fa5045dd50/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 27' },
  { id: 28, src: '/api/public/media/images/bc1591c3-fa23-4d65-b9a4-13882822221d/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 28' },
  { id: 29, src: '/api/public/media/images/6fd47049-9d6c-48ff-b2dc-43077c4cac0b/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 29' },
  { id: 30, src: '/api/public/media/images/d1218dfc-1b1c-4ee9-8414-7bc3f0d4ace9/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 30' },
  { id: 31, src: '/api/public/media/images/b7d05154-34f7-4bf0-b451-42143cee10ea/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 31' },
  { id: 32, src: '/api/public/media/images/9a36b317-4016-42a8-87d3-e2816db0ad46/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 32' },
  { id: 33, src: '/api/public/media/images/766a7c5c-4474-43c1-8dc1-ec1ce75cdc80/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 33' },
  { id: 34, src: '/api/public/media/images/3bb884e2-5929-45cd-b263-12eb3ccbecba/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 34' },
  { id: 35, src: '/api/public/media/images/faca658d-44e4-440d-88a8-32c8642157a9/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 35' },
  { id: 36, src: '/api/public/media/images/9c17b3e4-2fb8-43bf-8fcf-dd409dabdaba/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 36' },
  { id: 37, src: '/api/public/media/images/1a1133d9-4ea1-4172-8bab-4f57511414c6/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 37' },
  { id: 38, src: '/api/public/media/images/22ddb918-4fc9-452b-b326-7e5b094f5411/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 38' },
  { id: 39, src: '/api/public/media/images/3f837984-78ca-4a4e-872e-c5264958822d/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 39' },
  { id: 40, src: '/api/public/media/images/865dd43e-cf2b-4a98-9ec0-4b2afa5c31fe/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 40' },
  { id: 41, src: '/api/public/media/images/3e63cbad-73f9-45dc-80d8-6e57715d31c0/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 41' },
  { id: 42, src: '/api/public/media/images/e5a491c1-6906-4e9c-9358-986d2cd0fad5/file', alt: 'Balon perde modelleri Ankara', title: 'Balon Perde 42' }
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

export default function ModernPerdePage() {
  const initialContentJson = useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery')
  const initialGalleryImages = parseProductGalleryImages(initialContentJson, productImages)
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages)
  const [selectedImage, setSelectedImage] = useState(initialGalleryImages[0])
  const initialHeroCopy = parseProductGalleryHeroCopy(
    initialContentJson,
    defaultHeroCopy,
  )
  const [heroCopy, setHeroCopy] = useState(initialHeroCopy)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

  useEffect(() => {
    let mounted = true

    getPublicProductGallery(PRODUCT_GALLERY_PAGE_KEY, productImages).then((images) => {
      if (!mounted) {
        return
      }

      setGalleryImages(images)
      setSelectedImage((current) => images.find((image) => image.id === current.id) || images[0] || current)
    })

    getPublicProductGalleryHeroCopy(PRODUCT_GALLERY_PAGE_KEY, defaultHeroCopy).then((copy) => {
      if (!mounted) {
        return
      }

      setHeroCopy(copy)
    })

    return () => {
      mounted = false
    }
  }, [])

  const goToPrevious = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
    setSelectedImage(galleryImages[prevIndex])
  }

  const goToNext = () => {
    const nextIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0
    setSelectedImage(galleryImages[nextIndex])
  }

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
      <main className={`bg-black ${styles.realPremiumPage}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className={`relative overflow-hidden py-20 ${styles.heroSection}`}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-8" />

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">{heroCopy.eyebrow}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6">
              {heroCopy.title}
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                {heroCopy.highlightedTitle}
              </span>
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              {heroCopy.description}
            </p>
          </div>
        </div>
      </section>

      <ProductContactCta />

      <section className={`relative py-20 border-t border-white/5 ${styles.gallerySection}`}>
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Balon Perde Modelleri"
            className="text-center mb-16"
            eyebrowClassName="text-sm text-gray-500 uppercase tracking-[0.3em]"
            eyebrowTitleSpacingClassName="mb-4"
            titleClassName="text-3xl md:text-4xl font-extralight text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="group">
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
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div />
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 flex-shrink-0 ml-4">
                        <svg className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductEditorialSections pageKey={PRODUCT_GALLERY_PAGE_KEY} />





      <AnimatePresence>
        {lightboxOpen && (
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
              <button
                aria-label="Galeriyi kapat"
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                aria-label="Önceki görsel"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                aria-label="Sonraki görsel"
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

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {galleryImages.length}
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
