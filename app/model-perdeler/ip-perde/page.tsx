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

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-model-perdeler-ip-perde'

const defaultHeroCopy = getProductGalleryDefaultHeroCopy(PRODUCT_GALLERY_PAGE_KEY)

const canonicalUrl = 'https://pileperde.com.tr/model-perdeler/ip-perde'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Perde Modelleri', url: '/perde-modelleri' },
  { name: 'İp Perde', url: '/model-perdeler/ip-perde' },
]

const productImages = [
  { id: 1, src: '/api/public/media/images/2e807ac8-7507-4d23-94d9-6ac4d56705af/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 1' },
  { id: 2, src: '/api/public/media/images/cdf70084-bc1c-4232-9c85-588a0cab6b80/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 2' },
  { id: 3, src: '/api/public/media/images/89af138e-202e-409a-85ee-f95838534b54/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 3' },
  { id: 4, src: '/api/public/media/images/eb420d70-978a-4ec4-ad7d-c0ebd6c18085/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 4' },
  { id: 5, src: '/api/public/media/images/c9b28040-877b-4eaa-aaf0-da2a4c184f45/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 5' },
  { id: 6, src: '/api/public/media/images/d691de17-a227-4939-8948-a2592f32d638/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 6' },
  { id: 7, src: '/api/public/media/images/2e482be4-862e-4cba-b8a8-042afd802ecc/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 7' },
  { id: 8, src: '/api/public/media/images/e0bb48e5-2438-411c-8aed-c00e6104a36b/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 8' },
  { id: 9, src: '/api/public/media/images/8fc2d5ef-0b9d-4082-87d0-0ba357cd4325/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 9' },
  { id: 10, src: '/api/public/media/images/a8c0ce71-044d-4e1c-aa5c-f42e34a5b4b9/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 10' },
  { id: 11, src: '/api/public/media/images/d078c249-b1d2-413e-b6e5-f6d122f4810c/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 11' },
  { id: 12, src: '/api/public/media/images/17929324-e233-4829-bc5e-dd544696c47b/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 12' },
  { id: 13, src: '/api/public/media/images/67223951-6181-4656-b091-dc119d4ddbbb/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 13' },
  { id: 14, src: '/api/public/media/images/ac9d2915-baa5-4185-ba74-973d472dc414/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 14' },
  { id: 15, src: '/api/public/media/images/76863270-1940-4288-901e-45488a62362c/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 15' },
  { id: 16, src: '/api/public/media/images/f25ab7e0-e98e-4798-b944-bdd893654d80/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 16' },
  { id: 17, src: '/api/public/media/images/2def8037-74b9-4b19-a499-3378639c7ec0/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 17' },
  { id: 18, src: '/api/public/media/images/e6ff7b3f-0e96-433b-b86e-51737d6ae207/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 18' },
  { id: 19, src: '/api/public/media/images/43bf2719-b3f0-44ce-ad49-d81c8a183391/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 19' },
  { id: 20, src: '/api/public/media/images/d96e833c-00dd-4c7d-a9b8-136862973908/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 20' },
  { id: 21, src: '/api/public/media/images/0d53e9e3-83b5-4b47-8c19-7b41c70189bd/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 21' },
  { id: 22, src: '/api/public/media/images/3b46d913-e88b-4bd5-b21b-435767381852/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 22' },
  { id: 23, src: '/api/public/media/images/6be9aef1-aa11-42c8-8080-090bc05d102a/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 23' },
  { id: 24, src: '/api/public/media/images/8ad4cbcc-fe32-42bc-b083-ac78efb4bf0c/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 24' },
  { id: 25, src: '/api/public/media/images/5f21cb1c-01ff-4728-b782-ffd70c36e107/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 25' },
  { id: 26, src: '/api/public/media/images/dee545a2-6236-48b3-aa81-54a56a4324db/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 26' },
  { id: 27, src: '/api/public/media/images/9d646447-4d9e-4a10-b1e5-293681402348/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 27' },
  { id: 28, src: '/api/public/media/images/10c446e9-acdc-487b-8f12-2f962c3b5e37/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 28' },
  { id: 29, src: '/api/public/media/images/0901acee-91f3-48c9-9d8d-118108ed2d0e/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 29' },
  { id: 30, src: '/api/public/media/images/d526c752-e947-449c-9861-e3a58271d486/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 30' },
  { id: 31, src: '/api/public/media/images/c041e89e-329c-4b08-a7f6-ccd899eccddd/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 31' },
  { id: 32, src: '/api/public/media/images/1ff13560-2c9b-45f1-ac63-311934627ea4/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 32' },
  { id: 33, src: '/api/public/media/images/49040be6-6285-4648-806e-50c124d324d3/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 33' },
  { id: 34, src: '/api/public/media/images/567907d4-c335-48aa-9ccc-93dd48a19011/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 34' },
  { id: 35, src: '/api/public/media/images/5b9fb0a4-e0f5-4de6-b6bb-fbfd959a2612/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 35' },
  { id: 36, src: '/api/public/media/images/b51938e7-dc0b-4eb0-819d-4f79c17190fa/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 36' },
  { id: 37, src: '/api/public/media/images/5b31d942-284d-494f-a816-034db874340d/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 37' },
  { id: 38, src: '/api/public/media/images/9ace273e-65f4-4a7e-8633-01590f5d7514/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 38' },
  { id: 39, src: '/api/public/media/images/442491e9-2092-4543-9413-302ead3ce66a/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 39' },
  { id: 40, src: '/api/public/media/images/76a40f95-cac4-4170-93c6-6c91b6472a6f/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 40' },
  { id: 41, src: '/api/public/media/images/d6c1f530-15ed-4039-8cce-bd44edb5405f/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 41' },
  { id: 42, src: '/api/public/media/images/b5ab3f91-db60-47af-92a2-2fce7a6d6591/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 42' },
  { id: 43, src: '/api/public/media/images/993652ce-a852-4ae1-a78e-9959446ab403/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 43' },
  { id: 44, src: '/api/public/media/images/0a43fe16-168c-4b50-915a-66c958ea4cef/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 44' },
  { id: 45, src: '/api/public/media/images/c50ad314-1d12-463c-a19d-404924766908/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 45' },
  { id: 46, src: '/api/public/media/images/bb99cea7-2e07-4642-acc8-b3862bc20296/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 46' },
  { id: 47, src: '/api/public/media/images/3d535ef6-7968-4ef0-80a8-bc8156021dba/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 47' },
  { id: 48, src: '/api/public/media/images/abe4adfc-d17e-4a38-9846-a34a8494d04a/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 48' },
  { id: 49, src: '/api/public/media/images/2b7671c5-ea4c-4487-a65c-d8e02c4b160e/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 49' },
  { id: 50, src: '/api/public/media/images/c4145199-31f2-4eb4-b02d-710977613b06/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 50' },
  { id: 51, src: '/api/public/media/images/b6a210b9-9385-4f66-bdbc-484c226ec01b/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 51' },
  { id: 52, src: '/api/public/media/images/78449920-a96d-479e-96bc-26fe23abcbcc/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 52' },
  { id: 53, src: '/api/public/media/images/a4f7daac-2104-4d19-baa5-846f00f5170f/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 53' },
  { id: 54, src: '/api/public/media/images/f6156a04-f2c2-44bb-ae19-5f7ffee3e9f9/file', alt: 'İp perde modelleri Ankara', title: 'İp Perde 54' }
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
            fallbackTitle="İp Perde Modelleri"
            className="text-center mb-5 sm:mb-6"
            eyebrowClassName="text-sm text-gray-500 uppercase tracking-[0.3em]"
            eyebrowTitleSpacingClassName="mb-1.5"
            titleClassName="text-3xl md:text-4xl font-extralight text-white"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="group">
                <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer" onClick={() => { setSelectedImage(image); setLightboxOpen(true) }}>
                  <Image src={image.src} alt={image.alt} fill loading={index < 3 ? 'eager' : 'lazy'} className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between">
                      <div />
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 flex-shrink-0 ml-4">
                        <svg className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" /></div>
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
