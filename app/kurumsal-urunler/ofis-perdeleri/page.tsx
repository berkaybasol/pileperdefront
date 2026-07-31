'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import ProductContactCta from '@/components/ProductContactCta'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { getPublicProductGallery, getPublicProductGalleryHeroCopy, type ProductGalleryImage } from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const canonicalUrl = 'https://pileperde.com.tr/kurumsal-urunler/ofis-perdeleri'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Kurumsal Ürünler', url: '/kurumsal-urunler' },
  { name: 'Ofis Perdeleri', url: '/kurumsal-urunler/ofis-perdeleri' },
]

const productImages: ProductGalleryImage[] = [
  { id: 1, src: '/api/public/media/images/e6a92fda-f300-41ce-a547-47cf59cc6359/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 1' },
  { id: 2, src: '/api/public/media/images/96547de3-0b0c-49cb-8de4-e0c0964df2bf/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 2' },
  { id: 3, src: '/api/public/media/images/16097673-ac1f-4407-aa3c-aee2eb461a29/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 3' },
  { id: 4, src: '/api/public/media/images/a84ea713-782c-45fe-81e5-ff40a6c58719/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 4' },
  { id: 5, src: '/api/public/media/images/b6382ade-0230-46d8-a86b-317538b87ea9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 5' },
  { id: 6, src: '/api/public/media/images/be0c5d67-5d67-46d2-be47-4388ffa040e2/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 6' },
  { id: 7, src: '/api/public/media/images/c5baaa1b-9846-4cfe-9d4d-22d8c4453570/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 7' },
  { id: 8, src: '/api/public/media/images/0854e426-61de-4b77-b6cf-98037d2ecad3/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 8' },
  { id: 9, src: '/api/public/media/images/eedee2c3-a096-4422-ac0e-997e0fa6b407/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 9' },
  { id: 10, src: '/api/public/media/images/0570c5c9-568b-4377-9c9a-0a73ab46e83c/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 10' },
  { id: 11, src: '/api/public/media/images/047318b6-9547-43a2-b4ff-9037e2e1956b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 11' },
  { id: 12, src: '/api/public/media/images/fc5ed7ce-eb4f-4543-b25a-6c64f53a821e/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 12' },
  { id: 13, src: '/api/public/media/images/c8e94c11-5286-428f-95fb-6e0a4a99a7e9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 13' },
  { id: 14, src: '/api/public/media/images/d4d61389-6b99-44b6-a6fe-948a0a8d031a/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 14' },
  { id: 15, src: '/api/public/media/images/5c8be43e-75ac-4364-a338-a44e41467dfd/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 15' },
  { id: 16, src: '/api/public/media/images/e9ebea6f-3b3a-4d5a-bc8c-6146a1feacbc/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 16' },
  { id: 17, src: '/api/public/media/images/febc4132-cb38-4eb6-89ff-de7cf12fcf55/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 17' },
  { id: 18, src: '/api/public/media/images/cc1196d2-dea9-4075-b2b4-6ddd113b0062/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 18' },
  { id: 19, src: '/api/public/media/images/15d2bb89-b40e-426d-ad0f-5afced355af9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 19' },
  { id: 20, src: '/api/public/media/images/e4c33338-5516-4c4d-9dc1-29ffcf5ac7bd/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 20' },
  { id: 21, src: '/api/public/media/images/3d0aec37-6ec5-4ce3-b697-73c459ebed10/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 21' },
  { id: 22, src: '/api/public/media/images/955e857d-4377-47e8-9f85-2d3695b138eb/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 22' },
  { id: 23, src: '/api/public/media/images/de71f671-1cad-4d32-9b67-0efc1f68e1b6/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 23' },
  { id: 24, src: '/api/public/media/images/2fcae45b-a1d1-497f-b93b-76f340471baa/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 24' },
  { id: 25, src: '/api/public/media/images/bf615641-9d3e-4168-8538-20638e03c672/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 25' },
  { id: 26, src: '/api/public/media/images/713e349a-1560-4ec8-bf26-0233c0fc2f90/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 26' },
  { id: 27, src: '/api/public/media/images/0027dd76-c362-43a2-b464-019a87f1c80a/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 27' },
  { id: 28, src: '/api/public/media/images/1f4bfff7-26d3-483f-bb86-e7a4695d69a9/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 28' },
  { id: 29, src: '/api/public/media/images/6bc298c9-dc16-4208-a8b2-fd549bfa049b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 29' },
  { id: 30, src: '/api/public/media/images/4b439fad-8b2c-42e6-9ed3-e1f50a9bbe85/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 30' },
  { id: 31, src: '/api/public/media/images/c16cf6cc-818e-4d46-a756-c87c9e72b7c8/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 31' },
  { id: 32, src: '/api/public/media/images/6bba7df3-f479-490e-a746-29a98f117600/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 32' },
  { id: 33, src: '/api/public/media/images/1b5e4367-c9e3-4cf1-9cbb-c689939b41cf/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 33' },
  { id: 34, src: '/api/public/media/images/841de610-b7b8-489f-9185-92b7ee3f64e4/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 34' },
  { id: 35, src: '/api/public/media/images/7579479d-5efb-44cb-9041-c818f7a9dd35/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 35' },
  { id: 36, src: '/api/public/media/images/787d9310-1efe-4543-8058-e524c68b7100/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 36' },
  { id: 37, src: '/api/public/media/images/04650b30-f0c3-4faa-b955-baa105d5ce29/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 37' },
  { id: 38, src: '/api/public/media/images/1ab11f65-d7e5-4bbd-a833-2f35f97ae944/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 38' },
  { id: 39, src: '/api/public/media/images/dd1ef69a-a1d0-41fc-b724-83621bcc84a7/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 39' },
  { id: 40, src: '/api/public/media/images/5d52c023-439d-4246-8eec-5083f0975beb/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 40' },
  { id: 41, src: '/api/public/media/images/28ee80f4-98b3-43a6-892c-5471fc0f002b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 41' },
  { id: 42, src: '/api/public/media/images/a0b0595a-77a4-4b30-b4c3-df206fc9443e/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 42' },
  { id: 43, src: '/api/public/media/images/b94bb474-311b-4f24-8339-a396cc2a3f45/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 43' },
  { id: 44, src: '/api/public/media/images/86b0be14-f058-4f75-aa1e-19eaedce2d56/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 44' },
  { id: 45, src: '/api/public/media/images/9f0f8bb5-4650-4e84-93a4-b546ea3280d0/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 45' },
  { id: 46, src: '/api/public/media/images/541dfdbe-1f40-4938-997d-b7e04c53fcf1/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 46' },
  { id: 47, src: '/api/public/media/images/8cf58311-cfd5-45f9-a257-d8a479e8fd69/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 47' },
  { id: 48, src: '/api/public/media/images/2735093d-0bdd-4306-a1bf-263668d8087f/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 48' },
  { id: 49, src: '/api/public/media/images/9b221f3e-1e0e-44d6-a9a8-c1ef503ea89a/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 49' },
  { id: 50, src: '/api/public/media/images/3f54a9ca-90ca-4d7a-9afb-fb12f883a4ee/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 50' },
  { id: 51, src: '/api/public/media/images/5a97b4d5-951d-4024-95be-589201e2f41b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 51' },
  { id: 52, src: '/api/public/media/images/2beb9afa-0342-4e81-81bf-124ffd287f8d/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 52' },
  { id: 53, src: '/api/public/media/images/d34f4aab-72de-44aa-9910-4cd7fdcc749b/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 53' },
  { id: 54, src: '/api/public/media/images/6c1986a7-8435-4930-b77a-e13ed767daa8/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 54' },
  { id: 55, src: '/api/public/media/images/ac80b751-6570-488e-ab18-46350273ba44/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 55' },
  { id: 56, src: '/api/public/media/images/93cb20a4-4337-4ce3-98bb-6a084b36c18d/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 56' },
  { id: 57, src: '/api/public/media/images/4ec91e60-ad50-4233-9278-098e97d49e30/file', alt: 'Ofis Perde modelleri Ankara', title: 'Ofis Perde 57' }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-kurumsal-urunler-ofis-perdeleri'

const defaultHeroCopy = {
  breadcrumbLabel: "Ofis Perdeleri",
  eyebrow: "Kurumsal Çözümler",
  title: "Ofis",
  highlightedTitle: "Perdeleri",
  description: "Ofisler ve iş merkezleri için profesyonel perde çözümleri. Işık kontrolü, gürültü azaltma ve estetik tasarım ile çalışma verimliliğini artıran, makam odası ve bürolara özel perde sistemleri.",
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

export default function ModernPerdePage() {
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

  const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id)

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
      <main className="bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

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

      <ProductContactCta />

      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Ofis Perde Modelleri"
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
