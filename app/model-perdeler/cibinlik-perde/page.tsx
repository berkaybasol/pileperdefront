'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import ProductContactCta from '@/components/ProductContactCta'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, getProductGalleryDefaultHeroCopy } from '@/lib/productGalleryContent'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import styles from './page.module.css'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-cibinlik-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/cibinlik-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Cibinlik Perde', url: '/model-perdeler/cibinlik-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/66a8d307-6542-437e-9781-8626f3f2067e/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 1' },
  { id: 2, src: '/api/public/media/images/62d4c3e0-b15d-47f4-8d92-56cd069924c3/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 2' },
  { id: 3, src: '/api/public/media/images/b7904393-2049-43e4-ac34-189254616760/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 3' },
  { id: 4, src: '/api/public/media/images/069719f2-f86a-466b-90f5-a3d029013b07/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 4' },
  { id: 5, src: '/api/public/media/images/faf053d3-8b89-430c-b0a7-ea6c87beb381/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 5' },
  { id: 6, src: '/api/public/media/images/be86190a-0e1f-47a3-8f0d-8b2359344642/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 6' },
  { id: 7, src: '/api/public/media/images/bf1e8ede-334b-4c77-a833-d3692df67d7a/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 7' },
  { id: 8, src: '/api/public/media/images/3ee3559e-b09f-4328-a6ec-540d49444262/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 8' },
  { id: 9, src: '/api/public/media/images/b66b9177-79d1-4552-90ab-295ba593b0ad/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 9' },
  { id: 10, src: '/api/public/media/images/5baab339-03ba-4286-886f-ba7d161b0629/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 10' },
  { id: 11, src: '/api/public/media/images/8956c657-dd23-4c51-b652-174889bdd768/file', alt: 'Cibinlik perde modelleri Ankara', title: 'Cibinlik Perde 11' }
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
  const [galleryImages, setGalleryImages] = useState(productImages)
  const [selectedImage, setSelectedImage] = useState(productImages[0])
  const initialHeroCopy = parseProductGalleryHeroCopy(
    useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery'),
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
      <main className={`bg-black ${styles.responsivePage}`}>
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

      <section className={`relative border-t border-white/5 ${styles.gallerySection}`}>
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Cibinlik Perde Modelleri"
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

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div></div>
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
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

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
