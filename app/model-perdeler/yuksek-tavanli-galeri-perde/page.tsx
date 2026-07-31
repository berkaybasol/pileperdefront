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
import ProductEditorialSections from '@/components/ProductEditorialSections'

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-yuksek-tavanli-galeri-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/yuksek-tavanli-galeri-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'Yüksek Tavanlı Galeri Perde', url: '/model-perdeler/yuksek-tavanli-galeri-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/334ad8c7-98e2-411c-98e9-d3c74c5a8973/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 1' },
  { id: 2, src: '/api/public/media/images/5aa3ec0e-2345-42af-8995-8f75bef6aa38/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 2' },
  { id: 3, src: '/api/public/media/images/a0fe2cf3-e260-403e-8719-8e07f0b53efe/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 3' },
  { id: 4, src: '/api/public/media/images/91052388-fe8b-4954-92dd-4bac673f3180/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 4' },
  { id: 5, src: '/api/public/media/images/e0c4a8fb-b40f-40da-992f-015e96e1a63f/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 5' },
  { id: 6, src: '/api/public/media/images/c0593653-5dc6-4a5c-93d5-58d55ae8010a/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 6' },
  { id: 7, src: '/api/public/media/images/16dbd58c-079c-49ed-9892-3efbe1154c6f/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 7' },
  { id: 8, src: '/api/public/media/images/99d1bc83-6999-48ab-b5c2-a6dc04c4c5a9/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 8' },
  { id: 9, src: '/api/public/media/images/bccd676e-9182-4a8f-9af6-7485cfb16160/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 9' },
  { id: 10, src: '/api/public/media/images/8172fab4-8043-45c4-bb4b-911a134f8a64/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 10' },
  { id: 11, src: '/api/public/media/images/cb72ed79-7b89-4417-af0e-d0d9a18f54fa/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 11' },
  { id: 12, src: '/api/public/media/images/f1755949-695c-4648-8a3b-46663346e849/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 12' },
  { id: 13, src: '/api/public/media/images/5dd1903f-aed1-4007-ab22-9f036b8f7f9b/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 13' },
  { id: 14, src: '/api/public/media/images/2a954223-bc7b-438e-bded-f05aac65a9ed/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 14' },
  { id: 15, src: '/api/public/media/images/27ac6e71-b4ba-48fa-b13f-d59c23d03512/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 15' },
  { id: 16, src: '/api/public/media/images/79d2e414-6fbe-431a-9192-67b0f604d1f6/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 16' },
  { id: 17, src: '/api/public/media/images/cb7f60ad-44a8-4021-b40f-401d5c060cac/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 17' },
  { id: 18, src: '/api/public/media/images/de7668ad-8034-4d60-a444-796376190ffa/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 18' },
  { id: 19, src: '/api/public/media/images/ef3a47cc-93f5-4289-ba30-820c8924db12/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 19' },
  { id: 20, src: '/api/public/media/images/ed46ab63-38db-4f7e-9c1d-9547de771093/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 20' },
  { id: 21, src: '/api/public/media/images/8f8e3373-8818-4e27-982e-2b0ed3f382e0/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 21' },
  { id: 22, src: '/api/public/media/images/454b66a5-0970-4c53-bbf4-444d9710399a/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 22' },
  { id: 23, src: '/api/public/media/images/abcef93f-e250-4bbd-936d-961c45ee3cbd/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 23' },
  { id: 24, src: '/api/public/media/images/a09cabee-c69a-417e-90b8-d58cb3fc62a9/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 24' },
  { id: 25, src: '/api/public/media/images/fbf794db-4fca-44ca-b1c1-51f7e617fe82/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 25' },
  { id: 26, src: '/api/public/media/images/3de3107d-4cf7-4ad6-98f5-531f94634183/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 26' },
  { id: 27, src: '/api/public/media/images/100165be-5da1-4f83-ae02-03617332a70c/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 27' },
  { id: 28, src: '/api/public/media/images/1b201122-c92a-43b7-802b-80954bf8dbd0/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 28' },
  { id: 29, src: '/api/public/media/images/67514cdf-fbba-4e29-89d5-41aefc8e222d/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 29' },
  { id: 30, src: '/api/public/media/images/741ce4e7-146f-4207-afea-bb57fcfc8bcf/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 30' },
  { id: 31, src: '/api/public/media/images/d42dd441-ebd7-4e95-ae10-ce01cd305213/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 31' },
  { id: 32, src: '/api/public/media/images/97308084-b5c2-42c9-975c-b50bcd13b3ea/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 32' },
  { id: 33, src: '/api/public/media/images/b2ad349e-b24d-42d4-8c68-51f37dad052e/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 33' },
  { id: 34, src: '/api/public/media/images/d070f0e0-132f-4f35-a906-b3fc4477ba01/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 34' },
  { id: 35, src: '/api/public/media/images/1a4c5a97-5e74-4f43-8dfa-6a23cacd3505/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 35' },
  { id: 36, src: '/api/public/media/images/7acc44f3-3c76-4691-a419-625d2e3ced13/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 36' },
  { id: 37, src: '/api/public/media/images/2178030c-f22f-469c-aeb1-b7170390af33/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 37' },
  { id: 38, src: '/api/public/media/images/d71e70f7-7f06-4cc7-a8ba-28009de72190/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 38' },
  { id: 39, src: '/api/public/media/images/fdcff8e6-f36d-4a64-8627-da4420414a24/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 39' },
  { id: 40, src: '/api/public/media/images/ea15ff26-b020-43c1-a013-dfea409b7b69/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 40' },
  { id: 41, src: '/api/public/media/images/6cc87159-bdc1-430b-976d-aed9b73099aa/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 41' },
  { id: 42, src: '/api/public/media/images/b6fa8293-e51e-4649-b57c-feeea0ab7c4e/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 42' },
  { id: 43, src: '/api/public/media/images/9e10d6b4-91b5-4b9d-9473-85faf7646de8/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 43' },
  { id: 44, src: '/api/public/media/images/67227d8b-b658-4e99-b3e2-73a35ec0fc35/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 44' },
  { id: 45, src: '/api/public/media/images/9de792d2-d038-47f2-8ad4-b4b501da8461/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 45' },
  { id: 46, src: '/api/public/media/images/27c8b308-80d1-4aba-908c-74addb078d40/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 46' },
  { id: 47, src: '/api/public/media/images/1e8b995a-2acb-4575-85bb-987b54afcbc1/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 47' },
  { id: 48, src: '/api/public/media/images/58528cb9-38e5-4ef5-b7bf-166643e58ba3/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 48' },
  { id: 49, src: '/api/public/media/images/7d50227b-ac8d-4026-aa2f-dda57fd850f8/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 49' },
  { id: 50, src: '/api/public/media/images/bbdf03d9-4ecc-4c39-a437-e8afdb57c9a9/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 50' },
  { id: 51, src: '/api/public/media/images/66fca13f-e43d-417d-863f-88d63e1e3498/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 51' },
  { id: 52, src: '/api/public/media/images/a47c31d1-21c8-4415-a163-250af828a36c/file', alt: 'Yüksek tavanlı galeri perde modelleri Ankara', title: 'Yüksek Tavanlı Galeri Perde 52' }
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
      <main className="bg-black overflow-x-clip">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <section className="relative overflow-hidden pt-8 pb-6 sm:pt-12 sm:pb-8">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} canonicalUrl={canonicalUrl} className="mb-6" />

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">{heroCopy.eyebrow}</span>
            </div>

            <h1 className="text-4xl md:text-[2.7rem] lg:text-[3.375rem] leading-[1.08] font-extralight text-white mb-3 sm:mb-4">
              {heroCopy.title}
              <span className="block font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                {heroCopy.highlightedTitle}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              {heroCopy.description}
            </p>
          </div>
        </div>
      </section>

      <ProductContactCta />

      <section className="relative py-8 sm:py-10 border-t border-white/5 bg-gradient-to-b from-white/[0.0125] to-transparent">
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Yüksek Tavanlı Galeri Perde Modelleri"
            className="text-center mb-5 sm:mb-6"
            eyebrowClassName="text-sm text-gray-500 uppercase tracking-[0.3em]"
            eyebrowTitleSpacingClassName="mb-1.5"
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
                    loading={image.id === galleryImages[0]?.id ? 'eager' : 'lazy'}
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
