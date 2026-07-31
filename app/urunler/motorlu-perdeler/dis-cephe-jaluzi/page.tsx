'use client'

import ProductGalleryHeading from '@/components/ProductGalleryHeading'
import ManagedProductVideoGallery from '@/components/ManagedProductVideoGallery'

import { useCmsSectionJson } from '@/components/CmsPageProvider'
import { parseProductGalleryHeroCopy } from '@/lib/productGalleryContent'

import Image from 'next/image'
import { BreadcrumbListJsonLd } from '@/components/BreadcrumbListJsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbItem } from '@/lib/breadcrumbs'
import ProductNavigationPilot from '@/components/ProductNavigationPilot'

const canonicalUrl = 'https://pileperde.com.tr/urunler/motorlu-perdeler/dis-cephe-jaluzi'
const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Motorlu Perdeler', url: '/urunler/motorlu-perdeler' },
  { name: 'Dış Cephe Jaluzi', url: '/urunler/motorlu-perdeler/dis-cephe-jaluzi' },
]
import {
  defaultProductGalleryVideo,
  getPublicProductGallery,
  getPublicProductGalleryHeroCopy,
  getPublicProductGalleryVideo,
  getYouTubeEmbedUrl,
  type ProductGalleryImage,
  type ProductGalleryVideo,
} from '@/lib/productGalleryContent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductEditorialSections from '@/components/ProductEditorialSections'

const productImages: ProductGalleryImage[] = [
  { id: 1, src: "/api/public/media/images/f271f700-1801-4b4c-b25c-554ccf65cbb1/file", alt: "Dış jaluzi perde", title: "Dış Jaluzi Perde" },
  { id: 2, src: "/api/public/media/images/c8294ecb-ebbd-4ef4-a184-3b9f8ffd5060/file", alt: "Brisoley dış cephe perde", title: "Brisoley Dış Cephe Perde" },
  { id: 3, src: "/api/public/media/images/5718fd0a-a396-4134-ac23-20666d16c1b0/file", alt: "Brisoley Ankara", title: "Brisoley Ankara" },
  { id: 4, src: "/api/public/media/images/b990d6b1-02ef-4528-a738-95372507e5af/file", alt: "Brisoley dış cephe perde Ankara", title: "Brisoley Dış Cephe Perde Ankara" },
  { id: 5, src: "/api/public/media/images/49e58a92-7eb9-473b-b949-8ae22a018218/file", alt: "Dış cephe jaluzi perde", title: "Dış Cephe Jaluzi Perde" },
  { id: 6, src: "/api/public/media/images/ef618faf-e9f5-4684-8fbc-c0f5ae095c7a/file", alt: "Dış mekan güneşlik perde", title: "Dış Mekan Güneşlik Perde" },
  { id: 7, src: "/api/public/media/images/5fee40fc-3575-4a94-933b-e8ca92706cc8/file", alt: "Dış cephe güneş kırıcı", title: "Dış Cephe Güneş Kırıcı" },
  { id: 8, src: "/api/public/media/images/90948877-27ca-49fe-b863-d55cdf417c8a/file", alt: "Jaluzi perde dış cephe", title: "Jaluzi Perde Dış Cephe" },
  { id: 9, src: "/api/public/media/images/c3a67296-a8a5-401a-a7fb-785f47839b28/file", alt: "Dış mekan jaluzi perde", title: "Dış Mekan Jaluzi Perde" },
  { id: 10, src: "/api/public/media/images/423260ad-69a2-4a6c-9ad2-f9ac8c4c40f1/file", alt: "Güneş kırıcı paneller", title: "Güneş Kırıcı Paneller" },
  { id: 11, src: "/api/public/media/images/cb9483c2-e4db-4ed0-ac85-8854730164fd/file", alt: "Dış cephe stor perde", title: "Dış Cephe Stor Perde" },
  { id: 12, src: "/api/public/media/images/9613ef2e-e3f8-4f13-ac19-0afdc2cf9a9b/file", alt: "Dış mekan perde sistemleri", title: "Dış Mekan Perde Sistemleri" },
  { id: 13, src: "/api/public/media/images/82b3064e-90e6-4aa2-966d-144770cd362a/file", alt: "Dış mekan zip perde", title: "Dış Mekan Zip Perde" },
  { id: 14, src: "/api/public/media/images/197d526f-884d-4af1-9958-59c59a4a1281/file", alt: "Dış cephe jaluzi perdeler", title: "Dış Cephe Jaluzi Perdeler" },
  { id: 15, src: "/api/public/media/images/59f06624-3895-48a1-a687-2bb41d1eef43/file", alt: "Brisoley dış jaluzi perde", title: "Brisoley Dış Jaluzi Perde" },
  { id: 16, src: "/api/public/media/images/9d6afa62-d534-4dc4-aadb-b3e7e031a26f/file", alt: "Dış jaluzi perde sistemi", title: "Dış Jaluzi Perde Sistemi" },
  { id: 17, src: "/api/public/media/images/72621797-0d97-431a-9fe0-9f0b8f97553d/file", alt: "Alüminyum güneş kırıcı detay", title: "Alüminyum Güneş Kırıcı Detay" },
  { id: 18, src: "/api/public/media/images/df75320d-74e5-4821-bfaf-cbf7e6fa6828/file", alt: "Dış mekan perdesi", title: "Dış Mekan Perdesi" },
  { id: 19, src: "/api/public/media/images/b7f50ee9-4a9b-4d0f-91fa-a711b10b6635/file", alt: "Dış cephe jaluzi", title: "Dış Cephe Jaluzi" },
  { id: 20, src: "/api/public/media/images/0f7d0bca-5748-4010-b388-98e6df70f77f/file", alt: "Jaluzi dış cephe", title: "Jaluzi Dış Cephe" }
]

const PRODUCT_GALLERY_PAGE_KEY = 'product-gallery-urunler-motorlu-perdeler-dis-cephe-jaluzi'

const defaultHeroCopy = {
  breadcrumbLabel: "Dış Cephe Jaluzi",
  eyebrow: "Güneş Kontrol Sistemleri",
  title: "Dış Cephe",
  highlightedTitle: "Jaluzi",
  description: "Otomatik dış cephe jaluzi sistemleri ile binanızda enerji tasarrufu ve güneş kontrolü sağlayın. Alüminyum lamelli brisoley sistemler ile estetik ve fonksiyonel çözümler.",
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

export default function ProksiyonPerdePage() {
  const [galleryImages, setGalleryImages] = useState<ProductGalleryImage[]>(productImages)
  const [selectedImage, setSelectedImage] = useState<ProductGalleryImage | null>(productImages[0] || null)
  const initialContentJson = useCmsSectionJson(PRODUCT_GALLERY_PAGE_KEY, 'product.gallery')
  const initialHeroCopy = parseProductGalleryHeroCopy(
    initialContentJson,
    defaultHeroCopy,
  )
  const [heroCopy, setHeroCopy] = useState(initialHeroCopy)
  const [productVideo, setProductVideo] = useState<ProductGalleryVideo>(defaultProductGalleryVideo)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fallbackVideo = {
      title: 'Nasıl Çalışır?',
      description: 'Dış cephe jaluzi sisteminin çalışma prensibini ve kullanım detaylarını videomuzda izleyebilirsiniz.',
      youtubeUrl: '',
      enabled: false,
    }

    getPublicProductGallery(PRODUCT_GALLERY_PAGE_KEY, productImages, true).then((images) => {
      if (isMounted) {
        setGalleryImages(images)
        setSelectedImage((current) => (
          images.find((image) => image.id === current?.id) || images[0] || null
        ))
      }
    })

    getPublicProductGalleryHeroCopy(PRODUCT_GALLERY_PAGE_KEY, defaultHeroCopy).then((copy) => {
      if (!isMounted) {
        return
      }

      setHeroCopy(copy)
    })

    getPublicProductGalleryVideo(PRODUCT_GALLERY_PAGE_KEY, fallbackVideo).then((video) => {
      if (!isMounted) {
        return
      }

      setProductVideo(video)
    })

    return () => {
      isMounted = false
    }
  }, [])
  
  // Lightbox navigation functions
  const currentImageIndex = selectedImage
    ? galleryImages.findIndex(img => img.id === selectedImage.id)
    : -1
  const videoEmbedUrl = getYouTubeEmbedUrl(productVideo.youtubeUrl)

  const goToPrevious = () => {
    if (galleryImages.length === 0) return
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
    setSelectedImage(galleryImages[prevIndex])
  }

  const goToNext = () => {
    if (galleryImages.length === 0) return
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

      <ManagedProductVideoGallery
        pageKey={PRODUCT_GALLERY_PAGE_KEY}
        initialContentJson={initialContentJson}
      />

      {/* Full Product Gallery - Dark Glassmorphism Grid */}
      {galleryImages.length > 0 && <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <ProductGalleryHeading
            fallbackEyebrow="Ürün Galerisi"
            fallbackTitle="Dış Cephe Jaluzi Modelleri"
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
      </section>}

      {/* Compact Product Info Section */}
      <ProductEditorialSections pageKey={PRODUCT_GALLERY_PAGE_KEY} />


      {/* Product Features - Dark Glassmorphism Cards */}


      {/* Contact CTA */}


      {productVideo.enabled !== false && videoEmbedUrl && (
        <section className="relative py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Video Anlatım</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-6">
                {productVideo.title}
              </h2>
              {productVideo.description && (
                <p className="text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                  {productVideo.description}
                </p>
              )}
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 shadow-2xl">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={videoEmbedUrl}
                    title={productVideo.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
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
